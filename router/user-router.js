const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');
router.get("/signup",userController.signup);
router.get("/login",userController.login);
router.get("/profile",userController.profile);
// router.get('/profile',(req,res) => {
//     res.json({name: 'Samarr'})
// });


// router.post('/login',(req,res) => {
//     try{
//     res.json({message: 'Login succesful'})
//     }
//     catch(error) {w
//         res.json({message:'Login failed'})
//     }
//     res.json({name: 'Samarr'})
// });

module.exports = router;