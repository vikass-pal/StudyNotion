const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImagesToCloudinary} = require("../utils/imageUploader");

// createCourse handler function
exports.createCourse = async(req, res) => {
    try{
        // fetch details
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:"All feilds are requied",
            })
        }
        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log(userId, instructorDetails);

        if(!instructorDetails) {
            return res.status(400).json({
                success:false,
                message:'Instructor details not found',
            })
        }

        // category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(400).json({
                success:false,
                message:'Categorydetails not found',

            })
        }
        // upload thumbnail image to cloudinary
        const thumbnailImage = await uploadImagesToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create a course',
            error:error.message,
        })
    }
} 

exports.showAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({})
        //     courseName:true,
        //     price:true,
        //     thumbnail:true,
        //     ratingAndReviews:true,
        //     studentsEnrolled:true,
           
        //
        .populate("instructor")
        .exec();

        return res.status(200).json({
            success:true,
            message:'Courses found successfully',
            data:allCourses,
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:'Failed to show all courses',
            error:error.message,
        })
    }
}

exports.getCourseDetails = async (req, res) => {
    try{
          // get id
          const {courseId} = req.body;

          // find course details
          const courseDetails = await Course.find(
              {_id:courseId}
          )
          .populate(
              {
                  path:'instructor',
                  populate:{
                      path:"additionalDetails",
                  },
              }
          )
          .populate("category")
        //   .populate("ratingAndreviews")
          .populate({
              path:"courseContent",
              populate:{
                  path:"subSection",
              },
          })
          .exec();

          if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course details of ${courseId},`
            })
          }
        //   return res
        return res.status(200).json({
            success:true,
            data:courseDetails,
            message:'Course details found successfully',
            
            })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
      

    }
}