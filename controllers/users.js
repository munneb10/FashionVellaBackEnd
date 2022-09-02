const UserModel=require('../mongoSchema/User')
const users_controllers={
  "AddUser":(req,res,next)=>{//for adding user (route host/user/adduser?query)
    onAdd=(userId)=>{
      res.status(200).send({message:"User Inserted",userId:userId})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to add User"});
    }
    UserModel.addUser(req.body,onAdd,onFailed);
  }, 
  "getUsers":(req,res,next)=>{//for getting all user (route host/user & host/user?quer?)
    onGet=(users)=>{
      res.status(200).send({message:"All Users",users:users})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to get all user"});
    }
    UserModel.getAllUser(onGet,onFailed);
  },
  "authuser":(req,res,next)=>{
      //calls when model will get the result send data to api caller
        onAuth=(result)=>{
          res.status(200).send(result);
        }
        onAuthFailed=()=>{
          res.status(404).send({message:"User not found"});
        }
        onFailed=()=>{
          res.status(500).send({message:"Failed to authenticate user"});
        }
        // called user model function to get data
        UserModel.authUser(req.query['username'],req.query['password'],onAuth,onAuthFailed,onFailed);
  },
  "DeleteUser":(req,res,next)=>{
    onDelete=(count)=>{
      res.status(200).send({message:"User Deleted",count:count})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to delete User"});
    }
    UserModel.removeUser(req.body['userId'],onDelete,onFailed)
  },
  'GetUserById':(req,res,next)=>{//call to get all product if will have id then will get by id otherwise show all
    onGet=(user)=>{
      res.status(200).send({message:"User",user:user})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to get user"});
    }
    UserModel.getOneUser(req.body['userId'],onGet,onFailed);
  },
  "UpdateUser":(req,res,next)=>{
    onUpdate=(count)=>{
      res.status(200).send({message:"User Updated",count:count})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to update user",count:0});
    }
    UserModel.updateUser(req.body['userId'],req.body['userData'],onUpdate,onFailed)
  }

}

module.exports = users_controllers;
