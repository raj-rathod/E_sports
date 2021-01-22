const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userdata');
const Tournament = require('../models/tournaments');
const EntryFees = require('../models/entryFeesCheck');
const MoneyRequest = require('../models/moneyRequest');
const TournamentResult = require('../models/tournamentResult');
const JoinSolo = require('../models/joinsolo');
const JoinDual = require('../models/joindual');
const JoinSquad = require('../models/joinsquad');
const Admin = require('../models/admin');
const fs = require('fs');
const { asyncScheduler } = require('rxjs');
const { json } = require('body-parser');
const { send } = require('process');



//mongoDB connection...
const url = "mongodb://localhost:27017/test";
//const url = "mongodb+srv://rajesh:Rajesh@2020@cluster0.sfg3m.mongodb.net/vasiesport?retryWrites=true&w=majority";

mongoose.connect(url, {useUnifiedTopology: true,useNewUrlParser: true }, function(err){
    if(err){
        console.error(err);
    }else{
        console.log("Mongodb connected ...successfuly");
    }
});
mongoose.Promise = global.Promise;


///verification AuthToken....
function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token,'vasiRajeshKey');
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}

//all registered Users.....
router.get('/users', async function(req, res){
    
    try{
        const result= await User.find({ });
        res.json(result);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
    
});

//all registered Users.....
router.get('/userRank', async function(req, res){
    
    try{
        const result= await User.find().sort({"score":-1});
        res.json(result);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
    
});

/// authenticated user data api.....

router.get('/user/:id' ,async function(req,res){
   try {
       const data = await User.findOne({_id : req.params.id});
       res.json(data);
   } catch (err) {
    res.status(422).send(['Something Went Wrong Please Try Again Later']);
   }
});

 ////Redgistration New User api....
 router.post('/register', async function(req, res){
       let UserData = req.body;
       let user = new User(UserData);
       try{
           const data = await user.save();
           let payload = { subject : data._id};
           let authToken = jwt.sign(payload, 'vasiRajeshKey');
           let resData = {id:data._id,token:authToken };
           res.json(resData);
       }catch(err){
           if(err.code === 11000){
               res.status(401).send(['Email address already exist please try another one']);

           }else{
            res.status(422).send(['Something Went Wrong Please Try Again Later']);
           }
       }
      
 });

 ////social login api...,.
router.post('/sociallog', async function(req,res){
       let userdata = req.body;
       try {
           const data = await User.findOne({email:userdata.email});
           if(data){
            let payload = { subject : data._id};
            let authToken = jwt.sign(payload, 'vasiRajeshKey');
            let resData = {id:data._id,token:authToken };
            res.json(resData);
           }else{
              res.json(data) 
           }
        
        } catch (err) {
            res.status(422).send(['Something Went Wrong Please Try Again Later']);
       }
});

 ///log in api.......
 router.post('/login', function(req,res){
       let userData = req.body;
    User.findOne({email : userData.email}, (err,result) => {
             if(err){
                res.status(422).send(['Something Went Wrong Please Try Again Later']);
             }else{
                 if(!result){
                    res.status(401).send(['Invalid Email .. please Check your email id..']); 
                 }else if(result.password != userData.password){
                    res.status(401).send(['Password Incorrect....']); 
                 }else{
                     let payload = { subject : result._id};
                     let authToken = jwt.sign(payload, 'vasiRajeshKey');
                     let resData = {id:result._id,token:authToken };
                     res.json(resData);
                 }
             }
    });
 });

 /////admin login api//
 router.post('/adminregister',async function(req,res){
     let admindata = req.body;
     let admin =new Admin(admindata)
     try{
        const data = await admin.save();
       
        res.status(200).send(['Successfull admin create']);
    }catch(err){
        if(err.code === 11000){
            res.status(401).send(['Email address already exist please try another one']);

        }else{
         res.status(422).send(['Something Went Wrong Please Try Again Later']);
        }
    }

 })

  /// admin log in api.......
  router.post('/adminlogin', function(req,res){
    let adminData = req.body;
 Admin.findOne({email : adminData.email}, (err,result) => {
          if(err){
             res.status(422).send(['Something Went Wrong Please Try Again Later']);
          }else{
              if(!result){
                 res.status(401).send(['Invalid Email .. please Check your email id..']); 
              }else if(result.password != adminData.password){
                 res.status(401).send(['Password Incorrect....']); 
              }else{
                  let payload = { subject : result._id};
                  let authToken = jwt.sign(payload, 'vasiAdminKey');
                  let resData = {token:authToken };
                  res.json(resData);
              }
          }
 });
});

 //// user verification  api ....
 router.get('/verification/:id', async function(req,res){
    try {
        const data = await User.findOne({email:req.params.id});
         res.json(data);
     } catch (err) {
         res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///// user wallet update api....
router.put('/walletUpdate',async function(req, res){
    let reqdata = req.body;
    try {
        const data = await User.findOneAndUpdate({email : reqdata.email},{walletAmount : reqdata.amount},{useFindAndModify :false});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});
/// user result Update...
router.put('/userresult/:id',async function(req,res){
    try {
        const data = await User.findOneAndUpdate({email : req.params.id},req.body,{useFindAndModify :false});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});
/// Top user api...
router.get('/topUser', async function(req,res){
        try {
            const data = await User.findOne().sort({"score":-1});
            res.json(data);
        } catch (err) {
            console.log(err)
        }
});

///tournamentCreate api.....
router.post('/tournamentCreate', async function(req, res){
     let tournamentData = req.body;
     let tournament = new Tournament(tournamentData);
     try{
          const data = await tournament.save();
          res.json(data);
     }catch(err){
        
        if(err.code === 11000){
            res.status(401).send(['Tournaments Name already exist please try another one']);

        }else{
         res.status(422).send(['Something Went Wrong Please Try Again Later']);
        }
           
     }
});

////tournaments Fetch Api ....
router.get('/tournaments', async function(req, res){
    try{
        const result= await Tournament.find({$and:[{status:true},{registrationstatus : true}]});
        res.json(result);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']); 
    }
    
});

////tournaments Fetch Api ....
router.get('/tournamentfull', async function(req, res){
    try{
        const result= await Tournament.find({$and:[{status:true},{registrationstatus : false},{resultstatus :false}]});
        res.json(result);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']); 
    }
    
});
////tournaments result Fetch Api ....
router.get('/tournamentResult', async function(req, res){
    try{
        const result= await Tournament.find({$and:[{status:true},{registrationstatus : false},{resultstatus :true}]});
        res.json(result);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']); 
    }
    
});
///tournaments find by id api....
router.get('/tournament/:id' , async function(req, res){
    try {
        const data = await Tournament.findOne({_id:req.params.id});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);   
    }
})

////Created Tournaments Verification Api ....
router.get('/tournamentsCreated', async function(req, res){
    
   
    try{
        const result= await Tournament.find({ status : false});
        res.json(result);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']); 
    }
    
});
////Match public api....

router.put('/tournamentPublic/:id', async function(req, res){
    try {
        const data = await Tournament.findOneAndUpdate({_id:req.params.id},{status : true},{useFindAndModify :false});
        res.status(200).send(['Tournament Posted......']); 
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);  
    }
});

/////Registration  Closed and Room id and Password set api...
router.put('/registrationClosed/:id', async function(req, res){
    try {
        const data = await Tournament.findOneAndUpdate({_id:req.params.id},req.body,{useFindAndModify :false});
        res.status(200).send(['Tournament Posted......']); 
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);  
    }
});

////Wrong Tournament Delete Api.....
router.delete('/tournamentDelete/:id', async function(req,res){
   
    try{
        const data = await Tournament.deleteOne({_id : req.params.id},{useFindAndModify :false});
        res.status(200).send(['Tournament Deleted......']); 
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']); 
    }
});

////moneyRequest send api.....

router.post('/moneyRequest', async function(req,res){
    let moneyRequestData = req.body;
    
    let moneyRequest = new MoneyRequest(moneyRequestData);
   
        try{
            const  data = await moneyRequest.save();
            res.json(data)
        }catch(err){
            res.status(422).send(['Something Went Wrong Please Try Again Later']);  
        }
    

});

/// Money Request fetch by the admin api.....

router.get('/paymentRequest', async function(req, res){
    
   
    try{
        const result= await MoneyRequest.find({ });
        res.json(result);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
    
});

//// Payment Done By Admin api......

router.delete('/paymentCancle/:id', async function(req,res){
    
    try{
        const data = await MoneyRequest.deleteOne({_id : req.params.id});
        res.status(200).send(['Payment cancled successfully......']); 
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']); 
    }
});

////EntryFees Transactiont id filled api.....
router.post('/transactionId', async function(req, res){
    let transactionData = req.body;
    let entryFees = new EntryFees(transactionData);
    try{
          const data = await entryFees.save();
          res.json(data);
    }catch(err){
        if(err.code === 11000){
            res.status(422).send(['Transaction Id already exist......']);

        }else{
         res.status(422).send(['Something Went Wrong Please Try Again Later']);
        }
    }
});

/// Finding Transaction Id api...................
router.post('/transactionId/:id', async function(req,res){
    try{
            const data = await EntryFees.findOne({transactionId : req.params.id});
            res.json(data);
    }catch(err){
        res.status(422).send(['Something Went Wrong Please Try Again Later']);    
    }
});

/// Deleting Transaction History ............
router.delete('/clearHistory/:id', async function(req, res){
   if(req.params.id==="9148002717"){
       try {
           const data = await EntryFees.deleteMany({ });
           res.json(data);
       } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);  
       }
   }else{
    res.status(200).send('Go to hell.........');  
   }
});

/// All transaction api....
router.get('/all', async function(req,res){
   try {
       const data = await EntryFees.find({ });
       res.json(data);
   } catch (err) {
    res.status(422).send(['Something Went Wrong Please Try Again Later']); 
   }
});


/////solo tournament join api...
router.post('/solotournament', async function(req, res){
    let soloData = req.body;
    let soloTournament = new JoinSolo(soloData);
    try {
        const data = await soloTournament.save();
        res.json(data);
    } catch (err) {
       
        if(err.code === 11000){
            res.status(401).send(['Transaction Id already exist please try another one']);

        }else{
         res.status(422).send(['Something Went Wrong Please Try Again Later']);
        }
    }
});

///Solo tournament Participant api......
router.get('/soloparticipant/:id', async function(req, res){
    try {
        const data = await JoinSolo.find({ tournamentId : req.params.id});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///Solo tournament Participant delete api......
router.delete('/deletesoloparticipant/:id', async function(req, res){
    try {
        const data = await JoinSolo.deleteMany({ tournamentId : req.params.id});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///Solo tournament User Match api.....
router.get('/solomymatch/:id', async function(req, res){
    
    let email = req.params.id;
    try {
        const data = await JoinSolo.find({ emailId : email});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

/// Dual Tournament join api..........
router.post('/dualtournament', async function(req, res){
    let dualData = req.body;
    let dualTournament = new JoinDual(dualData);
    try {
        const data = await dualTournament.save();
        res.json(data);
    } catch (err) {
        if(err.code === 11000){
            res.status(401).send(['Transaction Id already exist please try another one']);

        }else{
         res.status(422).send(['Something Went Wrong Please Try Again Later']);
        }
    }
});

///Dual tournament Participant api......
router.get('/dualparticipant/:id', async function(req, res){
    try {
        const data = await JoinDual.find({ tournamentId : req.params.id});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///Dual tournament Participant delete api......
router.delete('/deletedualparticipant/:id', async function(req, res){
    try {
        const data = await JoinDual.deleteMany({ tournamentId : req.params.id});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///Dual tournament User Match api.....
router.get('/dualmymatch/:id', async function(req, res){
    let email = req.params.id;
 
    try {
        const data = await JoinDual.find({ emailId : email});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

/// Squad Tournament join api..........
router.post('/squadtournament', async function(req, res){
    let squadData = req.body;
    let squadTournament = new JoinSquad(squadData);
    try {
        const data = await squadTournament.save();
        res.json(data);
    } catch (err) {
       
        if(err.code === 11000){
            res.status(401).send(['Transaction Id already exist please try another one']);

        }else{
         res.status(422).send(['Something Went Wrong Please Try Again Later']);
        }
    }
});

///Squad tournament Participant api......
router.get('/squadparticipant/:id', async function(req, res){
    try {
        const data = await JoinSquad.find({ tournamentId : req.params.id});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///Squad tournament Participant Delete api......
router.delete('/deletesquadparticipant/:id', async function(req, res){
    try {
        const data = await JoinSquad.deleteMany({ tournamentId : req.params.id});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///Squad tournament User Match api.....
router.get('/squadmymatch/:id', async function(req, res){
    let email = req.params.id;
    try {
        const data = await JoinSquad.find({ emailId : email});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});


//// tournament Result api ....
router.post('/tournamentresult', async function(req, res){
    let resultData = req.body;
    let tournamentResult = new TournamentResult(resultData);
    try {
        const data = await tournamentResult.save();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

///tournament result Participant check api......

router.get('/playerresult', async function(req, res){
    let email = req.body.email;
    try {
        const data = await TournamentResult.find({ email: email, status :false});
        res.json(data);
    } catch (err) {
        res.status(422).send(['Something Went Wrong Please Try Again Later']);
    }
});

///Tournament Result Show........api..

router.get('/tournamentresultshow/:id', async function(req,res){
    try {
        const data = await TournamentResult.find({tournamentId : req.params.id}).sort({"rank" : 1});
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});


///Tournament Result Show delete........api..

router.delete('/deletetournamentresultshow/:id', async function(req,res){
    try {
        const data = await TournamentResult.deleteMany({tournamentId : req.params.id});
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});




     


module.exports= router;

