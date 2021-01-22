const mongoose = require('mongoose');

//create Schema for tournaments

const Schema = mongoose.Schema;

const entyFeesSchema = new Schema({
     transactionId : {
         type : String,
         required : true,
         unique:true
     },
     amount : {
         type : Number,
         required : true
     }
});

// model contain three parameter.... first one is Model name
// Second one is Schema name
// collection name...
module.exports = mongoose.model('EntryFees',entyFeesSchema,'EntryFees');