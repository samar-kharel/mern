const Product = require('../models/product-model');
// const User = require('../models/product-model')
// res.status(200).send("New PAGE");
const products = async (req,res) => {
    res.send("WELCOME")
}
    
const newproduct = async(req,res) => {

        const Name = req.body.name;
        const Price = req.body.price;
        const Description = req.body.description;
        const stock_quantity = req.body.stockquantity;
        const Category = req.body.category;
        const Colour = req.body.colour;

    // console.log("Name = ", Name)

    if (!Name || !Price || !Description || !stock_quantity || !Category || !Colour) {
        return res.status(400).send("Pass the missing value")
        }

    

    const product = new Product({
        name: Name,
        price: Price,
        description : Description,
        stockquantity : stock_quantity,
        category: Category,
        colour: Colour
    });
    product.save();
    res.send("CREATED SUCCESFULLY")
}

const listproduct = async( req, res) => {
    allProducts = await Product.find().select(' name price description stockquantity category colour');
    res.status(200).json(allProducts)
}








//Delete API



const deleteproduct = async(req,res) => {
    const id = req.params.id;
    console.log("existing Id = ",id)
    const existingId= await Product.findOne({"_id":id});
    if (!existingId){
        return res.status(400).send("ID not found");
    }
    else{
            await Product.deleteOne(existingId)
            return res.status(204).send("Id has been deleted")
        }
        
    }
    
    
    
    //PUT API
    const editproduct = async(req,res) => {
        const id = req.params.id;
        const Name = req.params.name;
        const existingId = await Product.findOne({ _id: id  });

            if (!existingId){
                return res.status(400).send("Id not found");
            }
            else{
                console.log("Name = ", Name )
                if (req.body.name){
                existingId.name = req.body.name;
                }
            }
    
            await existingId.save();
            return res.send("Name updated succesfully.")

    }
    
//inserting image
        const upload_image = async(req,res) => {
        path = req.file.path;
        const id = req.params.id;
        
        const existingId = await Product.findOne({_id:id});
        existingId.picture = path;
        if (!existingId){
            return res.status(400).send("ID not found");
        }
        await existingId.save();
        return res.send("IMAGE UPLOADED SUCCESFULLY.")
        
        return res.send(req.file);
        
    }

//add products
const addproducts = async(req,res) => {

    if(req.method === "GET") {
      res.render('product-form');
    } else if (req.method === "POST") {
      const data = req.body;
      let message = null;
        const Name = data.name;
        const Price = data.price;
        const Description =  data.description;
        const stock_quantity = data.stockquantity;
        const Category = data.category;
        const Colour = data.colour;
         if (!Name || !Price || !Description || !stock_quantity || !Category || !Colour) {
          message = "Pass the missing value"
          }
          else{
                const product = new Product({
                    name: data.name,
                    price: data.price,
                    description : data.description,
                    stockquantity : data.stockquantity,
                    category: data.category,
                    colour: data.colour
                });
                await product.save();
                message = "Product added succesfully"

          }
          res.render('product-form', {message: message});

    
    }

  }

    const productlist = async(req,res) => {
    const allProducts = await Product.find().select('name price description stockquantity category colour picture')
    const base_url = "http://localhost:3000/"
    
    const newProduct = allProducts.map(val => {
        val.picture = base_url + val.picture;
        return val;  
    });
    
    const data = {
        products: newProduct    
    }
    

    console.log(data)
    res.render('product-list',data);
};

const deleteproducts = async(req,res) => {
    const id = req.params.id;
    console.log("id= ",id);
    const existingId= await Product.findOne({"_id":id});
            await Product.deleteOne(existingId)
    res.redirect("/product/product-list")
    // return res.send("<h1> Product Deleted </h1>");
}
    
    
    
module.exports = {products,newproduct,listproduct,deleteproduct,editproduct,upload_image,addproducts,productlist,deleteproducts};