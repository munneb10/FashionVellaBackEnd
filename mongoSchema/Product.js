
var counterModel=require('../mongoSchema/counter')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;
module.exports.addProductData=(productData,onAdd,onFailed)=>{
    MongoClient.connect(url,async function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        onGet=async function(seqno){
          var myobj = productData;
          myobj['seqno']=seqno;
          dbo.collection("products").insertOne(myobj, function(err, res) {
            if (err){
              onFailed();
            }          
            onAdd(res.insertedId);
            
            console.log("Product Inserted Successfully");
            db.close();
          });
        }
        onFail=()=>{
            onFailed();
        }
        counterModel.getNextSequenceValue("productid",onGet,onFail);
        
      });
}

module.exports.removeProduct=(productId,onDelete,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myquery = { _id: ObjectId(productId) };
        dbo.collection("products").deleteOne(myquery, function(err, obj) {
          if (err){
            onFailed();
          }
          onDelete(obj.deletedCount)
          console.log("Data deleted successfully");
          db.close();
        });
      });
}

module.exports.getAllProduct=(onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("products").find({}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("All products get successfully");
        db.close();
        });
      })
}

module.exports.getOneProduct=(productId,onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("products").find({_id:ObjectId(productId)}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("Product get successfully");
        db.close();
        });
      })
}

module.exports.updateProduct=(productId,productData,onUpdate,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myquery = { _id: ObjectId(productId) };
        var newvalues = { $set: productData };
        dbo.collection("products").updateOne(myquery, newvalues, function(err, res) {
          if (err)onFailed();
          onUpdate(res.modifiedCount);
          console.log("1 product updated");
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
      console.log("categories searched successfully");
      db.close();
      });
    })
}

module.exports.getUserProduct=(userId,onGet,onFailed)=>{
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("FashionVella");
      console.log(userId);
      dbo.collection("products").find({user:parseInt(userId)}).toArray(function(err, result) {
      if (err){
        onFailed();
      }
      onGet(result)
      console.log("User Product get successfully");
      db.close();
      });
    })
}

module.exports.getProductByPagination=async(offset,length,sortKey,onGet,onFailed)=>{
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("FashionVella");
      var keys={};
      keys[`${sortKey}`]=1
      try {
        dbo.collection("products").find({}).sort( keys ).skip(parseInt(offset)).limit( parseInt(length) ).toArray().then((value)=>onGet(value))
        console.log("Found the product");
      } catch (error) {
        onFailed();
      }
    })
    
}