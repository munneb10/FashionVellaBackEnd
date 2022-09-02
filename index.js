const express = require('express');
const cors=require('cors')
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const userroute=require('./routes/users.js');
const productroute=require('./routes/products.js')
const categoryroute=require('./routes/category.js')
const fileroute=require('./routes/fileupload.js')
const path = require('path')
// app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// user route
app.use('/user',userroute);
// category route
app.use('/category',categoryroute)
// products route
app.use('/product',productroute);
// file upload route
app.use('/fileupload',fileroute);

// listen for server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
