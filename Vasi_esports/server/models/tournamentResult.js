const mongoose = require('mongoose');

//create Schema for tournaments

const Schema = mongoose.Schema;

const tournamentResultSchema = new Schema({
     tournamentId : {
         type : String,
         required : true
     },
     name : {
         type : String ,
         required : true
     },
     email:{
        type : String,
        required : true
     },
     prize : {
         type : Number,
         default : 0
     },
     kill : {
         type : Number,
         required : true  
     },
     rank : {
         type : Number,
         required : true
     },
     status : {
         type : Boolean,
         default : false
     }

});

// model contain three parameter.... first one is Model name
// Second one is Schema name
// collection name...
module.exports = mongoose.model('TournamentResult',tournamentResultSchema,'TournamentResults');
