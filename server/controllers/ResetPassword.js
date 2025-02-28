const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// reset pass token

exports.resetPasswordToken = async (req, res) => {
        try{
            // get email fro req body
            const email = req.body.email;

            // check user for this email or validate this email
            const user = await User.findOne({email});
            if(!user){
                return res.json({success:false,
                    message:'Your email is not recognized'
                })
            }
            // generate token
        const token = crypto.randomUUID();
            // update user by adding token and expiration time and ensure token is unique

            const updatedDetails = await User.findOneAndUpdate(
                {email:email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new:true}
        )
            // create url and ensure it is valid

            const url = `http://localhost:3000/update-password/${token}`
            // send mail containing the url
            await mailSender(email,
                "Password reset link",
                `password resent link is here ${url}`,
            )
            // return response
            return res.json({
                success:true,
                message:'Email sent successfully, Please check email and change password'
            })
        } catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:'something went wrong while reseting the password',
            })
        }
}

exports.resetPassword = async (req, res) => {
   try{
     // data fetch
     const {password, confirmPassword, token} = req.body;

    // validation
    if(password !== confirmPassword) {
        return res.json({
            success:false,
            message:'Password not matching',
        })
    }
    // get userdetails from db using token
    const userDetails = await User.findOne({token: token});
    // if no entry - invalid token
    if(!userDetails) {
        return res.json({
            success:false,
            message:'token is invalid',
        })
    }
    // token time check and ensure it is not expired

    if(userDetails.resetPasswordExpires < Date.now()) {
        return res.json({
            success:false,
            message:'token is expired, please regenrate your token',

        })
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // password update
    await User.findByIdAndUpdate(
        userDetails._id,
        {password:hashedPassword},
        {new:true}
    );
    // return response
    return res.json({
        success:true,
        message:'password reset successfully',
    })

   } catch(error){
    console.log(error);
    return res.json({
        success:false,
        message:'Error while resetting password',
    })
   }
}
