const express=require('express');
const router=express.Router();
const ProductController=require('../controllers/product.js')

router.get('/',ProductController.GetProduct);
router.get('/getbyid',ProductController.GetProductById);
router.get('/getbypagination',ProductController.GetProductByPagination);
router.get('/getuserproduct',ProductController.GetProductByUserId);
router.post('/addproduct',ProductController.AddProduct);
router.put('/updateproduct',ProductController.UpdateProduct);
router.delete('/deleteproduct',ProductController.DeleteProduct)
router.get('/searchproduct',ProductController.searchproduct);//for delete category host/category/deletecategory

module.exports = router;
 