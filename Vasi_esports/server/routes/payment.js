const express = require('express');
const payment = express.Router();
const razorpay =require('razorpay');

let instance = new razorpay({
  key_id: 'rzp_test_WXv5T6A8qR6r2N',////key Id
  key_secret :'6ZQdzG1Ej3MXNQot1yaXKFq6' ///key secret
});


payment.post('/orderId',  function(req, res){
    let options = req.body
    if(options == null){
      res.send(["back to home page"]);
    }else{
      instance.orders.create(options, function(err, order) {
        if(err){
            res.json(err);
        }else{
            res.json(order);
        }
     });
    }
     
});

payment.post('/paymentverify',function(req,res){
  let data = req.body;
  var crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', '6ZQdzG1Ej3MXNQot1yaXKFq6');
   hmac.update(data.orderId + "|" + data.paymentId);
  let generatedSignature = hmac.digest('hex');
  let isSignatureValid = generatedSignature == data.signature;
  if(isSignatureValid){
    res.json({"status":true});
  }else{
    res.json({"status":false});
  }
})


module.exports = payment;