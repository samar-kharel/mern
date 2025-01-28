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
    
    
    
    
module.exports = {products,newproduct,listproduct,deleteproduct,editproduct,upload_image};