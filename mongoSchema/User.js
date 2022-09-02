var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;
module.exports.addUser=(userData,onAdd,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myobj = userData;
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err){
            onFailed();
          }          
          onAdd(res.insertedId);
          console.log("User Inserted Successfully");
          db.close();
        });
      });
}

module.exports.removeUser=(userId,onDelete,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myquery = { _id: ObjectId(userId) };
        dbo.collection("users").deleteOne(myquery, function(err, obj) {
          if (err){
            onFailed();
          }
          onDelete(obj.deletedCount)
          console.log("User deleted successfully");
          db.close();
        });
      });
}

module.exports.getAllUser=(onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("users").find({}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("All users get successfully");
        db.close();
        });
      })
}

module.exports.getOneUser=(userId,onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("users").find({_id:ObjectId(userId)}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("USer get successfully");
        db.close();
        });
      })
}

module.exports.updateProduct=(userId,productData,onUpdate,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myquery = { _id: ObjectId(userId) };
        var newvalues = { $set: productData };
        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
          if (err)onFailed();
          onUpdate(res.modifiedCount);
          console.log("1 product updated");
          db.close();
        });
      });
}

module.exports.authUser=(username,password,onAuth,onAuthFailed,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("users").findOne({"username":username,"password":password},function (err,res) {
            
        if (err){
          onFailed();
        }
        console.log(res);
        if (res) {
            onAuth(res);
        }else{
            onAuthFailed();
        }
        
        db.close();
        })
      })
}

module.exports.updateUser=(userId,userData,onUpdate,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myquery = { _id: ObjectId(userId) };
        var newvalues = { $set: userData };
        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
          if (err)onFailed();
          onUpdate(res.modifiedCount);
          console.log("1 user updated");
          db.close();
        });
      });
}

module.exports.searchProduct=(searchstr,onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("products").find({"title":new RegExp(searchstr,'i')}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("Product searched successfully");
        db.close();
        });
      })
}