const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        // get userId
        const id = req.user.id;

        // validate 
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        // updateProfile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'invalid server error',
            error: error.message,
        });
    }
}

// delete account 
exports.deleteAccount = async (req, res) => {
    try {
        // get userId
        const id = req.user.id;

        // validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        // delete User
        await User.findByIdAndDelete({ _id: id });
        // TODO : hW unenroll user from all enrolled courses
        // return res
        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'invalid server error',
            error: error.message,
        });
    }
}


exports.getUserDetails = async (req, res) => {
    try {
        // extract userId
        const userId = req.user.id;
        console.log('id - ', userId);

        // get user details
        const userDetails = await User.findById(userId).populate('additionalDetails').exec();

        // return response
        res.status(200).json({
            success: true,
            data: userDetails,
            message: 'User data fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching user details');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while fetching user details'
        })
    }
}


exports.updateUserProfileImage = async (req, res) => {
    try {
        const profileImage = req.files?.profileImage;
        const userId = req.user.id;

        // validation
        // console.log('profileImage = ', profileImage)

        // upload imga eto cloudinary
        const image = await uploadImageToCloudinary(profileImage,
            process.env.FOLDER_NAME, 1000, 1000);

        // console.log('image url - ', image);

        // update in DB 
        const updatedUserDetails = await User.findByIdAndUpdate(userId,
            { image: image.secure_url },
            { new: true }
        )
            .populate({
                path: 'additionalDetails'

            })

        // success response
        res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: updatedUserDetails,
        })
    }
    catch (error) {
        console.log('Error while updating user profile image');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while updating user profile image',
        })
    }
}
