const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
     email:{
         type :String,
         required :true,
         default :"vasiesport@2020#gmail.com"
     },
     password :{
         type:String,
         required:true,
         default:"Bsdk@vasi2020"
     }
});

module.exports = mongoose.model('Admin',adminSchema ,'Admin');