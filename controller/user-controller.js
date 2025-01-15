const bcrypt = require('bcrypt');
const User = require('../models/user-model')


// const User = require('./models/user-model')
const login = async(req, res) => {
    const user_name = req.body.username;
    const pass_word = req.body.password;

const existingUser= await User.findOne({username: user_name});
console.log("existing user = ",existingUser)

if(!existingUser){
    return res.status(400).send("Username does not exist in the server.")

}

    

hashedPassword = existingUser.password

matched = await bcrypt.compare(pass_word,hashedPassword)
if (matched){
    return res.status(200).send("Welcome!")
}
else{
    return res.status(400).send("Password error.")
}

}








// {
//     try{
//         res.status(200).send("LOGIN PAGE");
//     }
//     catch(error){
//         res.status(500).json({
//         message: "Internal server error"

//     });
    
// }
// }



const listUsers = async(req,res) => {
    allUsers = await User.find().select('username phone email')
    res.status(200).json(allUsers);
}





const signup = async(req, res) => {
    const user_name = req.body.username;
    const pass_word = req.body.password;
    const phone_number = req.body.phone;
    const Email = req.body.email;

    const existingUser= await User.findOne({username: user_name});
    console.log("existing user = ",existingUser)

    if(existingUser){
        console.log("User already exists");
        return res.status(400).send("User already exists")
    }

    const existingEmail= await User.findOne({email: Email});
    console.log("existing email = ",existingEmail)

    if(existingEmail){
        console.log("User already exists");
        return res.status(400).send("User already exists")
    }

    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(pass_word, saltrounds);
    console.log("Hashed password= ",hashedPassword);

   
    const user = new User({
        username: user_name,
        password: hashedPassword,
        phone: phone_number,
        email: Email,
    });
    user.save();
    res.send("CREATED SUCCESFULLY")


    //     try{
    //         res.status(201).send("SIGNUP PAGE");
    //     }
    //     catch(error){
    //         res.status(500).json({
    //         message: "Internal server error"
    
        };
    // }
    // }


const profile = (req, res) =>
        {
        try{
            res.status(200).json({
                name : "SAMAR",
                age : "19"

            });
        }
        catch(error){
            res.status(500).json({
                message: "Internal server error"


            });
        }
        }


module.exports = {signup, login, profile,listUsers};
