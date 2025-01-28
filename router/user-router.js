const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');
router.post("/signup",userController.signup);
router.get("/login",userController.login);
router.get("/profile",userController.profile);
router.get("/users",userController.listUsers);
router.delete("/deleteuser/:username",userController.deleteuser);
router.put("/edit_profile/:username",userController.edit_profile);





module.exports = router;


















// router.get('/profile',(req,res) => {
//     res.json({name: 'Samarr'})
// });


// router.post('/login',(req,res) => {
//     try{
//     res.json({message: 'Login succesful'})
//     }df
//     catch(error) {w
//         res.json({message:'Login failed'})
//     }
//     res.json({name: 'Samarr'})
// });
