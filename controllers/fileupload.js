const category_model=require('../models/fileupload.js')
const multer=require('multer')

file_controller={
  'AddFile':(req,res)=>{
    console.log("called");
    res.status(200).send("Uploaded");
  }
}

module.exports = file_controller;
