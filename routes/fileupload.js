const express=require('express');
const router=express.Router();
const multer=require('multer')
const path = require('path');
const storage = multer.diskStorage({
  destination:"./public/uploads",
  onError : function(err, next) {
      console.log('error', err);
      next(err);
    },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + (Math.round(Math.random() * 1E9)+path.extname(file.originalname))
    console.log("got ");
    cb(null,uniqueSuffix)
  }
})
const upload = multer({ storage: storage })

router.post('/addfile',upload.single('image'),(req, res,next)=>{
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any
   res.status(200).send(req.file.filename);
});

module.exports=router;
