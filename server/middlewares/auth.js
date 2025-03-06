const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
    try {
            // extract token
            const token = req.body?.token || req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

            // if token is missing
            if(!token) {
                return res.status(401).json({
                    success:false,
                    message:'token is missing',

                });

            }

            // verify the token
            try{
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decode);
                req.user = decode;
            } 
            catch(err){
                return res.status(401).json({
                    success:false,
                    message:'invalid token',
                })
            }
            next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        })

    }
}

// isStudent

exports.isStudent = async (req, res, next) => {
    try{
        if(req.user?.accountType !==  "Student") {
            return res.status(401).json({
                success:false,
                message:'this is protected route for studdents only',
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, Please try again '
        })
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user?.accountType !==  "Instructor") {
            return res.status(401).json({
                success:false,
                message:'this is protected route for instructor only',
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, Please try again '
        })
    }
}

// isAdmin

exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !==  "Admin") {
            return res.status(401).json({
                success:false,
                message:'this is protected route for admin only',
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, Please try again '
        })
    }
}