const ProductModel=require('../mongoSchema/Product')
product_controller={
  "AddProduct":(req,res,next)=>{
    onAdd=(productId)=>{
      res.status(200).send({message:"Product Inserted",productId:productId})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to upload product"});
    }
    ProductModel.addProductData(req.body,onAdd,onFailed);
  },
  "UpdateProduct":(req,res,next)=>{
    onUpdate=(count)=>{
      res.status(200).send({message:"Product Updated",count:count})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to update product"});
    }
    ProductModel.updateProduct(req.body['productId'],req.body['productData'],onUpdate,onFailed)
  },
  "DeleteProduct":(req,res,next)=>{
    onDelete=(count)=>{
      res.status(200).send({message:"Product Deleted",count:count})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to delete product"});
    }
    ProductModel.removeProduct(req.body['productId'],onDelete,onFailed)
  },
  'GetProduct':(req,res,next)=>{//call to get all product if will have id then will get by id otherwise show all
    onGet=(products)=>{
      res.status(200).send({message:"All Products",products:products})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to get all product"});
    }
    ProductModel.getAllProduct(onGet,onFailed);
  },
  'GetProductById':(req,res,next)=>{//call to get all product if will have id then will get by id otherwise show all
    onGet=(product)=>{
      res.status(200).send({message:"Product",product:product})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to get product"});
    }
    ProductModel.getOneProduct(req.query['productId'],onGet,onFailed);
  },
  'GetProductByPagination':(req,res,next)=>{//call to get all product if will have id then will get by id otherwise show all
    onGet=(products)=>{
      res.status(200).send({message:"Product",products:products})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to get product from "+req.query['offset']});
    }
    ProductModel.getProductByPagination(req.query['offset'],req.query['length'],req.query['sortKey'],onGet,onFailed);
  },
  'searchproduct':(req,res,next)=>{
    onGet=(products)=>{
      res.status(200).send({message:"Searched Products",products:products})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to search products"});
    }
    ProductModel.searchProduct(req.query['searchstr'],onGet,onFailed);
  },
  'GetProductByUserId':(req,res,next)=>{//call to get all product if will have id then will get by id otherwise show all
    onGet=(product)=>{
      res.status(200).send({message:"User Product",product:product})
    }
    onFailed=()=>{
      res.status(500).send({message:"Failed to get User product"});
    }
    ProductModel.getUserProduct(req.query['userId'],onGet,onFailed);
  }
}

module.exports = product_controller;
