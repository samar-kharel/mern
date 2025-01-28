const bcrypt = require('bcrypt');
const User = require('../models/user-model')


// const User = require('./models/user-model')
const login = async(req, res) => {
    const user_name = req.body.username;
    const pass_word = req.body.password;
    const Email = req.body.email;

//validation for username and password
if (!user_name || !pass_word) {
    return res.status(400).send("Pass the username and password.")
}

const existingUser= await User.findOne({username: user_name});
console.log("existing user = ",existingUser)

if(!existingUser){
    return res.status(400).send("Username does not exist in the server.")

}
const existingEmail= await User.findOne({email: Email});
console.log("existing email = ",existingEmail)

if(!existingEmail){
    return res.status(400).send("Email does not exist in the server.")

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

    //validation for username and password
    if (!user_name || !pass_word || !Email) {
    return res.status(400).send("Pass the username and password.")
    }

    const existingUser= await User.findOne({username: user_name});
    console.log("existing user = ",existingUser)

    if(existingUser){
        console.log("User already exists");
        return res.status(400).send("User already exists")
    }

    const existingEmail= await User.findOne({email: Email});
    console.log("existing email = ",existingEmail)

    if(existingEmail){
        console.log("Email already exists");
        return res.status(400).send("Email already exists")
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


const profile = async(req, res) =>
        {
        try{
            const username = req.params.username;
            //check if the username exists in the database
            const existingUser = await User.findOne({username: username}).select('username phone');
            if(!existingUser){
                return res.status(400).send("User not found");
            }
            res.status(200).json(existingUser);
        
            // res.status(200).json({
            //     username : "Samar12",
            //     password: "sam12",
            //     phone : "9803453251"

            // });
        }
        catch(error){
            res.status(500).json({
                message: "Internal server error"


            });
        }
        }





//delete user api
const deleteuser = async(req,res) => {
    const username = req.params.username;
    const existingUser = await User.findOne({ username: username});
    if (!existingUser){
        return res.status(400).send("User not found");
    }
    else{
        await User.deleteOne(existingUser)
        return res.status(204).send("User has been deleted")
    }
}

//edit api
const edit_profile = async(req,res) => {
    const username = req.params.username;
    const Email = req.body.email;
    const phone_number = req.body.phone;

    if (!Email && !phone_number){
        return res.send("Please enter an email address or phone number.")
    }

    const existingUser = await User.findOne({ username: username});
    if (!existingUser){
        return res.status(400).send("User not found");
    }
    else{
        console.log("phone number = ", phone_number)
        if (phone_number){
        existingUser.phone = req.body.phone;
        }
        if (Email){
            console.log(Email)
            const existingEmail= await User.findOne({email: Email});
            if (existingEmail) {
                return res.send("Email already exists.")
            }
            else{
                existingUser.email = req.body.email;

            }
    }
    }

    await existingUser.save();
    return res.send("User updated succesfully.")
}




module.exports = {signup, login, profile,listUsers,deleteuser,edit_profile};
