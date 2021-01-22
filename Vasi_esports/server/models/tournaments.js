const mongoose = require('mongoose');

//create Schema for tournaments

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
   tournamentName : {
       type : String,
       required : true,
       unique : true
       
   },
   tournamentType : {
       type : String,
       required : true
   },
   tournamentDate : {
       type : String,
       required : true
   },
   tournamentTime : {
        type : String,
        required : true
   },
   entryFees : {
       type : String,
       required : true
   },
   prizeMoney : {
       type : String,
       required : true
   },
   registrationstatus :{
       type : Boolean,
       default:true
   },
   resultstatus :{
       type : Boolean,
       default : false
   },
   roomId:{
       type:String,
       default:null
   },
   password:{
       type:String,
       default:null
   },
   status :{
       type: Boolean,
       default:false
   }

}); 
// model contain three parameter.... first one is Model name
// Second one is Schema name
// collection name...
module.exports = mongoose.model('Tournament', tournamentSchema,'Tournaments');