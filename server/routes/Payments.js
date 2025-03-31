// import required modules

const express = require("express");
const router = express.Router();

const {capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../controllers/Payments");
const {auth, isInstructor, isAdmin, isStudent} = require("../middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
module.exports = router