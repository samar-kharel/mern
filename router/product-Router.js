const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controller/product-controller');

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

router.get("/add-products", async(req,res) => {
  res.render('product-form');
}
)

module.exports = router;