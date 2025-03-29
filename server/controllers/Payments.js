const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");




// exports.capturePayment = async (req, res) => {
     
//     const {courses} = req.body;
//     const userId = req.user.id;

//     // validation
//     if(courses === 0) {
//         return res.json({
//             success:false,
//             message :'PLease provide a vaild course ID',
//         })
//     }
//     let totalAmount = 0;
//     for(const course_id of courses) {
//         let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.status(200).json({
//                 success:false,
//                 message:"Could not find the course",
//             });

            
//         }
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             })
//         }
//         totalAmount += course.price;

//     } catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }

//     }
//      const options = {
//         amount: totalAmount * 100,
//         currency: "INR",
//         receipt:Math.random(Date.now()).toString(),

//      }
//      try{
//         const paymentResponse = await instance.orders.create(options);
//         res.json({
//             success:true,
//             message:paymentResponse,
//         })

//      } catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:'could not initiate order',
//         })

//      }

//     //  verify payments

   

// }
// exports.verifyPayment = async (req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const courses = req.body?.courses;
//     const userId = req.user.id;

//     if(!razorpay_order_id || 
//         !razorpay_payment_id ||
//         !razorpay_signature || !courses|| !userId
//     ) {
//         return res.status(200).json({
//             success:false,
//             message:'Payment failed',
//         })
//     }
// let body = razorpay_order_id + "|" + razorpay_payment_id;
// const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
// .update(body.toString())
// .digest("hex");

// if(expectedSignature === razorpay_signature) {
//     // enroll karwa student ko

//     // return res

//     return res.status(200).json({success:true,
//         message:"Payment verified"
//     });
   
// }
// return res.status(200).json({
//     success:false,
//     message:'Payment failed',
// })
// }



// const enrollStudents = async(courses, userId, res) => {
//     if(!courses || !userId) {
//         return res.status(400).json({
//             success:false,
//             message:'IPlease Provide valid data for Courses or UserID',
//         })
//     }
//     for (const courseId of courses) {
//        try {
//          // find the course and enroll student in it
//          const enrolledCourse = await Course.findOneAndUpdate(
//             {_id:courseId},
//             {$push:{studentsEnrolled:userId}},
//             {new:true},
//         )
//         if(!enrolledCourse) {
//             return res.status(500).json({
//                 success:false,
//                 message:'Could not find the Course'
//             })
//         }

//         // find the student and add the course to their enrolledCourses
//         const enrolledStudent = await User.findByIdAndUpdate(
//             userId,{$push:{courses: courseId,

//             }},
//             {new:true},

//             // send mail to student

            
//         )
//         const mailResponse = await mailSender(
//             enrollStudents.email,
//             `Successfully Enrolled into ${enrolledCourse.courseName}`,
//             courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
//     )
//     console.log("Email sent successfully", mailResponse);
//     } catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
//        }
// }


// capture the payment and initiate the razorpay
exports.capturePayment = async (req, res) => {
    // gey=t courseId and userID
    const {course_id} = req.body;
    const userId = req.user.id;
    // validation
    if(!course_id) {
        return res.json({
            success:false,
            message :'PLease provide a vaild course ID',
        })
    }
    // validate courseDetails
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course) {
            return res.json({
                success:false,
                message :'Course not found',
                })
        }
// user already paid for same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)) {
            return res.json({
                success:false,
                message: 'Student is already enrolled',
            })
        }



    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
  
    // order create
    const amount = course.price;
    const currency ="INR";
    const options = {
        amount: amount *100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId,
        }
    }

    try {
        // initiate the paymnet using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription : course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'could not initiate order'
        })

    }
    // rreturn response

}

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if(signature === digest) {
        console.log("Payment is authorized");

        const {courseId, userId} = req.body.payload.payment.entity.notes;
        try{
            // fulfill the action
            // enroll student into the course

            const enrolledCourse = await Course.findByIdAndUpdate(
                {
                    _id:courseId
                },
                {$push:{studentsEnrolled: userId}},
                {new:true},
            );
            if(!enrolledCourse) {
                return res.status(500).json({
                    success:true,
                    message:'could not find the course'
                })
            }
            console.log(enrolledCourse);

            const enrolledStudent = await User.findByIdAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true},
            )
            console.log(enrolledStudent);

            // send a confirmation email
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "congratulations from lernHelp",
                "congratulations youre enrolled into a new course by learnHelp",
            )
            console.log(emailResponse);
            // return response
            return res.status(200).json({
                success:true,
                message:'student enrolled successfully',
            })

        } catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })

        }

    }
    else{
        return res.status(400).json({
            success:false,
            message:'invalid request'
            })
    }
}