const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.register = async (req, res) => {
  try {
    //fetch data
    const { firstName, lastName, email, password, username } = req.body;

    //validation
    if (!email || !password || !username || !firstName || !lastName) {
      return res.status(400).json({
        sucess: false,
        message: "Fill all the details ",
      });
    }

    //check if the user is already registered
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        sucess: false,
        message: "user already registered",
      });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let newuserData = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    const token = await jwt.sign({_id:newuserData._id},process.env.JWT_SECRET)
    const newData = {...newuserData, token}
    console.log(newData.token);
    delete newData.password
    // await newUser.save();
    res.status(201).json({
      sucess: true,
      newData,
      token:newData.token
    });

  } catch (err) {
    return res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};


exports.login = async (req,res) => {
  try{
//data fetch

const {email,password} = req.body;
//check if all data present or not
if(!email || !password ){
  return  res.status(401).json({
      sucess: false,
      message: "fill all details "
  })
}
// match email

 let user = await User.findOne({email})
// console.log(user.password)
 if(!user){
  return  res.status(400).json({
      sucess: false,
      message: "user is not registered" 
  })
 } 
 console.log(user)
 const isMatch = await bcrypt.compare(password,user.password)
 console.log(isMatch)
 
 if(!isMatch) {
  return res.status(400).json({
    sucess: false,
    message: "Incorrect password"
  })
 }
let options= {
expires:new Date( Date.now() + 3*24*60*60*1000),
httpOnly: true,

}
      
const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET)
 return  res.status(200).cookie("token",token,options).json({
          sucess:true,
          token,
          user,
          message:"User log in sucessfully"
        })


        
  }catch(error){
      return  res.status(400).json({
          sucess: false,
         
          message:error.message
      })
  }

}
