const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.user_signup = (req, res, next) => {
    User.find({email  : req.body.email}).exec().then(user=>{
        if (user.length>=1){
            res.status(422).json({
                "Message" : "Mail Exists Already"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10 ,(err, hash)=>{
                if(err){
                    res.status(500).json({
                        Error : err
                    });
                }
                else {console.log(hash)
                    const user = new User({
                    _id : new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password : hash});
                    user.save().then(result=>{
                        res.status(201).json({
                            Message : "User Created"
                        });
                    }).catch(err=>{
                        res.status(500).json({
                            Error : err
                        });
                    });

                }
            });
        }
    });

}


exports.user_login = (req, res, next)=>{
    User.find({email  : req.body.email}).exec().then(user=>{
        if (user.length< 1){
            res.status(401).json({
                Message : "Auth Fail"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, respons)=>{
            if (err){
                res.status(401).json({
                    Message : "Auth Fail"
                })
            }
            if (respons){
                const token = jwt.sign({
                    email : user[0].email,
                    id : user[0]._id
                },"rizwan" ,
                {
                    expiresIn : "1h"
                } );
                return res.status(200).json({
                    message : "successfull",
                    token : token
                });
            }
            res.status(401).json({
                Message : "Auth Fail"
            });
        });
    }).catch(err=>{
        res.status(500).json({
            Error : err
        });
    });

}


exports.user_delete =  (req, res, next) => {
    const _id = req.params.userID;
    User.deleteOne({ id: _id }).exec().then(result => {
        res.status(200).json({
            result: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}