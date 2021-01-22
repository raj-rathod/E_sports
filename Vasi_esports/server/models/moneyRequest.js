const mongoose = require('mongoose');

//create Schema for Money withdraw Request

const Schema = mongoose.Schema;

const moneyRequestSchema = new Schema({
      email: {
          type : String,
          required : true
      },

      contact : {
          type : String,
          required : true
      },
      amount : {
          type : Number,
          required: true
      },
      paymentType : {
          type : String,
          required: true
      },
      upiId:{
          type: String,
          required : true
      }

});

// model contain three parameter.... first one is Model name
// Second one is Schema name
// collection name...
module.exports = mongoose.model('MoneyRequest',moneyRequestSchema,'MoneyRequest');