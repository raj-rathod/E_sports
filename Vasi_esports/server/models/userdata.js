const mongoose = require('mongoose');

//create Schema for user

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    photoUrl:{
        type : String,
         default: ""
    },
    password :{
             type : String,
             required : true
             
    },
    rank: {
        type : Number,
        default :0
        
    },
    score : {
        type: Number,
        default :0
    },
    matches :{
        type : Number,
        default :0
    },
    walletAmount : {
        type :Number,
        default : 0
    },
    coins :{
        type : Number,
        default : 0
    },
    Date: {
        type: Date,
        default:Date.now()
    }

});
// model contain three parameter.... first one is Model name
// Second one is Schema name
// collection name...
module.exports = mongoose.model('User', userSchema,'Users');