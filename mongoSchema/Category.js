var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;
module.exports.addCategoryData=(CategoryData,onAdd,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myobj = CategoryData;
        dbo.collection("categories").insertOne(myobj, function(err, res) {
          if (err){
            onFailed();
          }          
          onAdd(res.insertedId);
          console.log("Category Inserted Successfully");
          db.close();
        });
      });
}

module.exports.removeCategory=(CategoryId,onDelete,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myquery = { _id: ObjectId(CategoryId) };
        dbo.collection("categories").deleteOne(myquery, function(err, obj) {
          if (err){
            onFailed();
          }
          onDelete(obj.deletedCount)
          console.log("Data deleted successfully");
          db.close();
        });
      });
}

module.exports.getAllCategory=(onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("categories").find({}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("All categories get successfully");
        db.close();
        });
      })
}

module.exports.getOneCategory=(CategoryId,onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("categories").find({_id:ObjectId(CategoryId)}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("Category get successfully");
        db.close();
        });
      })
}

module.exports.updateCategory=(CategoryId,CategoryData,onUpdate,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        var myquery = { _id: ObjectId(CategoryId) };
        var newvalues = { $set: CategoryData };
        dbo.collection("categories").updateOne(myquery, newvalues, function(err, res) {
          if (err)onFailed();
          onUpdate(res.modifiedCount);
          console.log("1 Category updated");
          db.close();
        });
      });
}

module.exports.searchCategory=(searchstr,onGet,onFailed)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FashionVella");
        dbo.collection("categories").find({"category":new RegExp(searchstr,'i')}).toArray(function(err, result) {
        if (err){
          onFailed();
        }
        onGet(result)
        console.log("categories searched successfully");
        db.close();
        });
      })
}