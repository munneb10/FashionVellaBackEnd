const express=require('express');
const router=express.Router();
const categorycontroller=require('../controllers/category.js');

router.get('/',categorycontroller.getcategory);//for getting all category or by id route will host/category/
router.post('/addcategory',categorycontroller.addcategory);//for adding category route will host/category/addcategory
router.put('/updatecategory',categorycontroller.editcategory);//for edit query route will host/category/editcategory
router.delete('/deletecategory',categorycontroller.deletecategory);//for delete category host/category/deletecategory
router.get('/searchcategory',categorycontroller.searchcategory);//for delete category host/category/deletecategory

module.exports = router;
