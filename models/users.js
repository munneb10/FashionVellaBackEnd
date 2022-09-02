const con=require('../connection.js')

user_model={
  "AddUser":(UserData,onAdd)=>{//called from controller to add user
    // query to insert data
    var AddUserQuery=`INSERT INTO users (user_name,user_password,user_role) VALUES('${UserData.username}','${UserData.password}',0)`
    // function to add users in the table
    con.query(AddUserQuery,(err,result)=>{
      // // if error call with the error code 409 with null object
      if(err){
        if (err.errno==1062) {
            onAdd({},409);
        }
      }else{
        // if ok then call with the success 200 with result having inserted id
          onAdd(result,200);
      }
    })
  },
  "GetAllUser":(onResult)=>{//called from controller to get all user data
    // query to get data
    var GetAllQuery="Select * From users";

    // function to get all user
    con.query(GetAllQuery,(err,result)=>{
      if (err) {
        // sending emty if err
        onResult([],204);
      }else{
        // if found then send result
        onResult(result,200);
      }
    });
  },
  "GetById":(id,onResult)=>{//called to get user by id
    // query to get user by id
    var GetByIdQuery=`SELECT * FROM users WHERE user_id=${id}`
    // function to get user by id
    con.query(GetByIdQuery,(err,result)=>{
      if (err) {
        // sending emty if err
        onResult([],204);
      }else{
        // if found then send result
        onResult(result,200);
      }
    })
  },
  "AuthenticateUser":(UserData,onAuth)=>{

  // query to check user exist
  var AuthUserQuery=`SELECT * FROM users WHERE user_name='${UserData['username']}' and user_password='${UserData['password']}'`
  con.query(AuthUserQuery,(err,result)=>{
    if (err) {//send null if have error
      onAuth({},404);//if error send empty object with error
    }else{
      onAuth(result,200);
    }
  })
  }

}

module.exports=user_model;
