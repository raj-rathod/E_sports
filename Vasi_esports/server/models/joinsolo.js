const mongoose = require('mongoose');

//create Schema for Join Solo Player 

const Schema = mongoose.Schema;

const joinSoloSchema = new Schema({
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
    }
    
});

// model contain three parameter.... first one is Model name
// Second one is Schema name
// collection name...
module.exports = mongoose.model('JoinSolo',joinSoloSchema ,'JoinSolo');