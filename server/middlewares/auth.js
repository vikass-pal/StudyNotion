const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    console.log("Auth middleware triggered"); // Debugging
    try {
        const token = req.body?.token || req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            console.log("No token found");
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decode); // Debugging
            req.user = decode;
        } catch (err) {
            console.log("Invalid token:", err.message);
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
        next();
    } catch (error) {
        console.log("Token validation error:", error.message);
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
};


// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user?.accountType?.toLowerCase() !== "student") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for students only',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        console.log("User Account Type:", req.user?.accountType); // Debugging
        if (req.user?.accountType?.toLowerCase() !== "instructor") {

            return res.status(401).json({
                success: false,
                message: 'This is a protected route for instructors only',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for admins only',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
}
