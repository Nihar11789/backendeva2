const express = require('express');
const bcyrpt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {UserModel} = require("../model/user.model")

const user_route = express.Router();

user_route.post("/signup",async(req,res)=>{
    const {name,email,pass,role} = req.body;
    try {
        bcyrpt.hash(pass,3,async(err,sec_pass)=>{
            if(err){
                console.log(err);
                res.send("wrong in signup")
            } else {
                const user = new UserModel({name,email,pass:sec_pass,role});
                await user.save();
                res.send("signup successfull");
            }
        })
    } catch (error) {
        console.log(error);
        res.send("error having signing in")
    }
})

user_route.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user){
            res.send("please signup first")
        }else{
            const hash_pass = user.pass
            bcrypt.compare(pass,hash_pass,(err,result)=>{
                if(result){
                    const normal_token = jwt.sign({userID:user._ID, role:user.role},"N_token",{expiresIn:60});
                    const refresh_token = jwt.sign({userID:user._ID, role:user.role},"R_token",{expiresIn:300});
                    res.send({msg:"login successfull",normal_token,refresh_token})
                } else {
                    res.send("some error in login")
                }
            }) 
        }
    } catch (error) {
        res.send("error in login the user");
        console.log(error);
    }
})

user_route.get("/getnewtoken",(req,res)=>{
    const refresh_token = req.headers.authorization?.split(" ")[1]
    if(!refresh_token){
        refresh_token.send("login again")
    } else {
        jwt.verify(refresh_token,"R_token",function(err,decode){
            if(decode){
                const normal_token = jwt.dign({userID:decode._ID,role:decode.role},"N_token",{expiresIn:60})
                res.send({msg:"login successfull",normal_token})
            } else {
                res.send({msg:"please login again",err})
            }
        })
    }
})

module.exports = {user_route};