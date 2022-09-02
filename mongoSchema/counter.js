var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
module.exports.getNextSequenceValue= (sequenceName,onGet,onFailed)=>{
      MongoClient.connect(url, async function(err, db){
        if (err) throw err;
        var dbo = db.db("FashionVella");
        try {
            var doc=await dbo.collection('counter').findOne({_id:sequenceName});
        doc.sequence_value++;
        var sequenceDocument =await dbo.collection('counter').findOneAndUpdate({_id:"productid"},{$set:{"sequence_value":doc.sequence_value}})
        await onGet(sequenceDocument.value.sequence_value);
        } catch (error) {
            onFailed();
        }
      });
 }