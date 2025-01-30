const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controller/product-controller');
const Product = require('../models/product-model');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })


// const upload = multer({ dest: 'uploads/'})
router.get("/products", productController.products);
router.post("/newproduct",productController.newproduct);
router.get("/listproduct",productController.listproduct);
router.delete("/deleteproduct/:id",productController.deleteproduct);
router.put("/editproduct/:id",productController.editproduct);
router.post("/upload_image/:id",upload.single('picture'),productController.upload_image);
router.all("/add-products",productController.addproducts);
router.get("/product-list",productController.productlist);
router.post("/deleteproducts/:id",productController.deleteproducts);


module.exports = router;








// // router.get("/add-products", async(req,res) => {
// //   res.render('product-form');
// // });

// // router.post("/submit",async (req,res) => {
// //   const data = req.body;
// //   console.log("data = ",data);
  
// //   const Name = data.name;
// //   const Price = data.price;
// //   const Description =  data.description;
// //   const stock_quantity = data.stockquantity;
// //   const Category = data.category;
// //   const Colour = data.colour;

// //   if (!Name || !Price || !Description || !stock_quantity || !Category || !Colour) {
// //     return res.status(400).send("Pass the missing value")
// //   }
  
// //   const product = new Product({
// //     name: Name,
// //     price: Price,
// //     description : Description,
// //     stockquantity : stock_quantity,
// //     category: Category,
// //     colour: Colour
// // });
// // product.save();
  
// //   res.send("<h1>Product added succesfully</h1>");


//   router.all("/add-products",async(req,res) => {
//     if(req.method === "GET") {
//       res.render('product-form');
//     } else if (req.method === "POST") {
//       const data = req.body;
//       let message = null;
//         const Name = data.name;
//         const Price = data.price;
//         const Description =  data.description;
//         const stock_quantity = data.stockquantity;
//          const Category = data.category;
//         const Colour = data.colour;
//          if (!Name || !Price || !Description || !stock_quantity || !Category || !Colour) {
//           message = "Pass the missing value"
//           }
//           else{
//                 const product = new Product({
//                     name: data.name,
//                     price: data.price,
//                     description : data.description,
//                     stockquantity : data.stock_quantity,
//                     category: data.category,
//                     colour: data.colour
//                 });
//                 await product.save();
//                 message = "Product added succesfully"

//           }
//           res.render('product-form', {message: message});

    
//     }

//   }

// );

// // });