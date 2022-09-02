const CategoryModel=require('../mongoSchema/Category')

var category_controller_helper_func={
  "getcategorybyid":(catid,res)=>{//called from getcategory category_controller
    category_model.GetCategoryById(catid,res);
  },
  "getallcategory":(res)=>{//called from getcategory category_controller
      category_model.GetAllCategory(res);
  }
}

category_controller={
'addcategory':(req,res,next)=>{//call to add category by getting data from query parameters
  onAdd=(categoryId)=>{
    res.status(200).send({message:"Category Inserted",categoryId:categoryId})
  }
  onFailed=()=>{
    res.status(500).send({message:"Failed to upload category"});
  }
  CategoryModel.addCategoryData(req.body,onAdd,onFailed);
},
'editcategory':(req,res,next)=>{//call to edit category by getting data(id,categoryname) from query parameters
  onUpdate=(count)=>{
    res.status(200).send({message:"Category Updated",count:count})
  }
  onFailed=()=>{
    res.status(500).send({message:"Failed to update category"});
  }
  CategoryModel.updateCategory(req.body['categoryId'],req.body['categoryData'],onUpdate,onFailed)
},
'deletecategory':(req,res,next)=>{////call to delete category by getting categoryid from query parameters
  onDelete=(count)=>{
    res.status(200).send({message:"Cateory Deleted",count:count})
  }
  onFailed=()=>{
    res.status(500).send({message:"Failed to delete cateory"});
  }
  CategoryModel.removeCategory(req.body['categoryId'],onDelete,onFailed)
},
'searchcategory':(req,res,next)=>{
  onGet=(categories)=>{
    res.status(200).send({message:"Searched Categories",categories:categories})
  }
  onFailed=()=>{
    res.status(500).send({message:"Failed to search categories"});
  }
  CategoryModel.searchCategory(req.query['searchstr'],onGet,onFailed);
},
'getcategory':(req,res,next)=>{//call to get all category if will have id then will get by id otherwise show all
  onGet=(categories)=>{
    res.status(200).send({message:"All Categories",categories:categories})
  }
  onFailed=()=>{
    res.status(500).send({message:"Failed to get all categories"});
  }
  CategoryModel.getAllCategory(onGet,onFailed);
}
}

module.exports = category_controller;
