const express = require('express');
const _router = express.Router();
const multer = require('multer');



///define diskStorage ..
const store = multer.diskStorage({
  destination : function(req, file, cb){
      cb(null,'./server/uploads');
  },
  filename : function(req, file, cb){
      cb(null, Date.now()+'.'+file.originalname);
  }
});

var upload = multer({storage : store});


_router.post('/upload', upload.single('file') ,function(req, res, next){
  
        try{
            
            return res.json({
                originalname :req.file.originalname,
                uploadname : req.file.filename
            }); 
        }catch(err){
           return res.json();
        }
});

module.exports = _router;