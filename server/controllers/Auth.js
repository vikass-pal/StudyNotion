const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Profile = require("../models/Profile");

// send otp
exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message: "User already exists",
            });
        }
        
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            specialChars:false,
            lowerCaseAlphabets:false,
        });
        console.log("Otp is here", otp);

        let result = await OTP.findOne({otp: otp});
        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                specialChars:false,
                lowerCaseAlphabets:false,
            });
            result = await OTP.findOne({otp: otp});
        }
        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message,
        });
    } 
}

exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success:false,
                message:"Please fill all the credentials"
            });
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match",
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please try a different email.",

            });
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        if(recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found. Please request a new OTP.",

            });
        } else if(otp !== recentOtp[0].otp) { // Corrected to access the first element
            return res.status(400).json({
                success: false,
                message: "Invalid OTP. Please check and try again.",

            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user,
        });

    } catch(error) {
        console.error("Signup Error: ", error); // Log the specific error for debugging
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later. Error: " + error.message,
        });

    }
}

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message:"All credentials are required, please try again",
            });
        }

        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first",
            });
        }

        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined; // Corrected variable name

            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            });
        } else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failed, please try again',
        });
    }
}

// Implementing changePassword function
// ================ CHANGE PASSWORD ================
exports.changePassword = async (req, res) => {
    try {
        // extract data
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: 'All fileds are required'
            });
        }

        // get user
        const userDetails = await User.findById(req.user.id);

        // validate old passowrd entered correct or not
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )

        // if old password not match 
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false, message: "Old password is Incorrect"
            });
        }

        // check both passwords are matched
        if (newPassword !== confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: 'The password and confirm password do not match'
            })
        }


        // hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update in DB
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
            { password: hashedPassword },
            { new: true });


        // send email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                'Password for your account has been updated',
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            // console.log("Email sent successfully:", emailResponse);
        }
        catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }


        // return success response
        res.status(200).json({
            success: true,
            mesage: 'Password changed successfully'
        });
    }

    catch (error) {
        console.log('Error while changing passowrd');
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while changing passowrd'
        })
    }
}
