const mongoose = require('mongoose');

//create Schema for Join dual Players

const Schema = mongoose.Schema;

const joinSquadSchema = new Schema({
    tournamentId : {
        type: String,
        required : true
    },
    tournamentName :{
        type :String,
        default:"abc",
    },
    tournamentDate:{
     type:String,
     default :"abc",
    },
    tournamentTime:{
     type:String,
     default :"abc",
    },
    tournamentType:{
        type:String,
        default :"abc",
    },
    entryFees :{
        type : Number,
        default : 0
    },
    pubgName : {
        type : String,
        required : true
    },
    emailId: {
        type : String,
        required : true
    },
    subPlayer:{
       player1:{
        pubgName : {
            type : String,
            required : true
        },
        emailId: {
            type : String,
            required : true
        }
       },
       player2:{
        pubgName : {
            type : String,
            required : true
        },
        emailId: {
            type : String,
            required : true
        }
       },
       player3:{
        pubgName : {
            type : String,
            required : true
        },
        emailId: {
            type : String,
            required : true
        }
       }
       
    }
});

// model contain three parameter.... first one is Model name
// Second one is Schema name
// collection name...
module.exports = mongoose.model('JoinSquad',joinSquadSchema ,'JoinSquad');