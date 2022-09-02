const express=require('express');
const router=express.Router();
const userController=require('../controllers/users.js');
// This route is for getting all the user data
router.get('/',userController.getUsers);//for geting all users and by id
router.get('/getuserbyid',userController.GetUserById);
router.delete('/deleteuser',userController.DeleteUser);
router.post('/adduser',userController.AddUser);//for adding user
router.get('/authuser',userController.authuser);//for user authentication
router.put('/updateuser',userController.UpdateUser);
module.exports=router;
