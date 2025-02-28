const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');


// createRating


exports.createRating = async = async(req, res) => {
    try{
        // get userid
        const userId = req.user.id;
        // fetchdata from req body
        const {rating, review, courseId} = req.body;
        // check if user is enrolled in a course
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentsEnrolled: {$elemMatch: {$eq:userId}},
            }
        );
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'students is not enrolled in the course',
            })
        }
        // check if user has already rated the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user',
            })
        }
        // create rating and review
        const ratingReview = await RatingAndReview.create(
            {
                    rating,review,
                    course:courseId,
                    user:userId,
                
            }
        )
        // update course with rating and review
        const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
            {
            $push: {
                RatingAndReview:ratingReview._id,
            }
        },
    {new:true})
    console.log(updatedCourseDetails);
        // return response
        return res.status(200).json({
            success:true,
            message:"review and rating updated successsfully",
            ratingReview,
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// get avg rating

exports.getAverageRating = async (req, res) => {
    try{
        // get course ID
        const courseId = req.body.courseId;
        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id: null,
                    averageRating: {$avg: "$rating"},
                }
            }
        ])
        // return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
        // if no rating exists
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating: 0,
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all rating/reviews

exports.getAllRatings= async(req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image",
        })
        .populate({
            path:"course",
            select:"courseName",
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:'All the reviews are fetched successfully',
            data:allReviews
        })


    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
}