const express = require('express')
const router = new express.Router()
var bodyParser = require('body-parser')
const User = require('../models/usersSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSignUp = require('../models/userSignup')

router.use(express.json());
router.use(express.urlencoded());

router.get('/', (req, res) => {
    res.send('Hello World!')
})

//SIGNUP USER API

router.post('/signup', async (req, res) => {
    const { email, password, confirmpassword } = req.body

    if (!confirmpassword || !email || !password) {
        return res.status(402).json({ error: "fill it" })
    }
    try {
        const user = new UserSignUp({ email: email, password: password, confirmpassword: confirmpassword, age: "" })
        // console.log(user)
        await user.save()
        const i = user._id;
        console.log(i)
        // window.alert('Succesful Registration')
        res.status(200).json({ message: "saved" })
    } catch (errror) {
        console.log(error)
    }

})


//LOGIN USER API

router.post('/login', async (req, res) => {
    const { email, password } = (req.body)
    if (!email || !password) {
        return res.status(402).json({ error: "fill it" })
    }
    try {
        const userExist = await User.findOne({ email })
        // const filter = { name: 'Jean-Luc Picard' };
        const update = { age: 59 };

        // `doc` is the document _before_ `update` was applied
        let doc = await Character.findOneAndUpdate(filter, update); 
        
        const isMatch = await bcrypt.compare(password, userExist.password)
        if (userExist) {
            // console.log(userExist)
            // if (!isMatch) {
            //     // token = await userExist.generateAuthToken()
            //     // // console.log(token)
            //     // res.cookie("jwt",token,{
            //     //     expires:new Date(Date.now()+25892000000),
            //     //     httpOnly:true
            //     // })
            //     res.status(200).json({ message: "u can login" })
            // }
            // else {
            //     res.status(400).json({ error: "Invalid Cred" })
            // }
            res.status(200).json({ message: "u can login" })
        }
        else {
            res.status(400).json({ error: "user not exist" })
        }
    } catch (error) {
        res.send(error)
    }
})


//Profile UPDATE API

// router.post('/editcustomerprofile', async (req, res) => {
//     const { fname,mname,lname,bdate,adhaarnum,addres,pincode,phonenum } = req.body

//     if (!fname|| !mname || !lname || !!bdate ||) {
//         return res.status(402).json({ error: "fill it" })
//     }
//     try {
//         const user = new UserSignUp({ email: email, password: password, confirmpassword: confirmpassword, age: "" })
//         // console.log(user)
//         await user.save()
//         const i = user._id;
//         console.log(i)
//         // window.alert('Succesful Registration')
//         res.status(200).json({ message: "saved" })
//     } catch (errror) {
//         console.log(error)
//     }

// })


module.exports = router