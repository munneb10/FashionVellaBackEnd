const con=require('../connection.js')

category_model={
"AddCategory":(CategoryData,onAdd)=>{//called from category controller to add category
  // query to add category
  var AddCategoryQuery=`INSERT INTO categories (category_name,total_products) VALUES('${CategoryData.categoryname}',0)`
  // sql function to execute category
  con.query(AddCategoryQuery,(err,result)=>{
    // if err then send null
    if (err) {
      // for duplicate
      if (err.errno==1062) {
          onAdd({},409);
      }else{
        // on other error
        onAdd({},204);
      }
    }else{
      // otherwise send result
      onAdd(result,200)
    }
  })
},
"EditCategory":(EditData,res)=>{//called from category controller to edit category
  // query to edit category
  var EditQuery=`UPDATE categories SET category_name='${EditData['categoryname']}' WHERE category_id=${EditData['categoryid']}`
  // sql function to execute category
  con.query(EditQuery,(err,result)=>{
    if (err){
      res.status(500).send([]);
    }
    res.status(200).send(result);
  })
},
"DeleteCategory":(categoryid,res)=>{//called from category controller to delete category
  // query to delete category
  var DeleteQuery=`DELETE FROM categories WHERE category_id=${categoryid}`;
  // sql function to execute category
  con.query(DeleteQuery,(err,result)=>{
    if (err) {
      res.status(500).send([]);
    }
    res.status(200).send(result);
  })
},
"GetAllCategory":(onResult)=>{//called from category controller to get all category
  // query to get all category
  console.log("getting");
  var GetAllQuery=`SELECT * FROM categories`;
  // sql function to execute category
  con.query(GetAllQuery,(err,result)=>{
    if (err) {
      console.log(err);
      onResult([],204);
    }else{
      console.log(result)
        onResult(result,200)
    }
  })
},
"GetCategoryById":(categoryid,onResult)=>{//called from category controller to get category by id
  // query to get get category by id
  var GetByIdQuery=`SELECT * FROM categories WHERE category_id=${categoryid}`;
  // sql function to execute category
  con.query(GetByIdQuery,(err,result)=>{
    if (err) {
      onResult([],204);
    }
    onResult(result,200);
  })
},
'SearchCategory':(tosearch,onResult)=>{
  // query to get get category by id
  var SearchQuery=`SELECT * FROM categories WHERE category_name LIKE '%${tosearch}%'`;
  // sql function to execute category
  con.query(SearchQuery,(err,result)=>{
    if (err) {
      onResult([],204);
    }
    onResult(result,200);
  })
}
}

module.exports = category_model;
