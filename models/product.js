const con=require('../connection.js')

product_model={
  "AddProduct":(ProductData,onAdd,onErr)=>{//model to add product in the database
    // query to insert data in the products table
    var AddProductQuery=`INSERT INTO products (title,descrip,price,price_currency,totalquantity,category_id,user_id) VALUES('${ProductData.title}','${ProductData.desc}',${ProductData.price},'${ProductData.pricecurrency}',${ProductData.quantity},${ProductData.categoryid},${ProductData.userid})`
    // sql function to execute add product query
    con.query(AddProductQuery,(err,result)=>{
      if (err) {
        onErr([],500);
      }else{
        onAdd(result,200);
      }

    })
  },
  "EditProduct":(ProductData,res)=>{//model to edit product in the database
    // query to edit data in the products table
    var EditProductQuery=`UPDATE products SET title='${ProductData['title']}',descrip='${ProductData['desc']}',price=${ProductData['price']},price_currency='${ProductData['pricecurrency']}',totalquantity=${ProductData['quantity']},Product_id=${ProductData['Product_id']} WHERE product_id=${ProductData['productid']}`
    // sql function to execute add product query
    con.query(EditProductQuery,(err,result)=>{
      if (err) {
        res.status(500).send([]);
      }
      res.status(200).send(result);
    })
  },
  "DeleteProduct":(DeleteID,res)=>{//model to delete product
    // query to delete product
    var DeleteProductQuery=`DELETE FROM products WHERE product_id=${DeleteID}`;
    con.query(DeleteProductQuery,(err,result)=>{
      if (err) {
        res.status(500).send([]);
      }else {
        res.status(200).send(result);
      }
    })
  },
  "GetAllProduct":(res)=>{//called from Product controller to get all Product
    // query to get all Product
    var GetAllQuery=`SELECT * FROM products`;
    // sql function to execute Product
    con.query(GetAllQuery,(err,result)=>{
      if (err) {
        res.status(500).send([]);
      }
      res.status(200).send(result);
    })
  },
  "GetProductById":(productid,onRes)=>{//called from Product controller to get Product by id
    // query to get get Product by id
    var GetByIdQuery=`SELECT * FROM products WHERE product_id=${productid}`;
    // sql function to execute Product
    con.query(GetByIdQuery,(err,result)=>{
      if (err) {
        onRes([],500);
      }
      onRes(result,200);
    })
  }
}

module.exports = product_model;
