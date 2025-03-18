const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const {uploadImagesToCloudinary} = require("../utils/imageUploader");

// create subsection
exports.createSubSection = async (req, res) => {
    try {
        // extract data
        const { title, description, sectionId } = req.body;

        // extract video file
        const videoFile = req.files.video
        console.log('videoFile ', videoFile)

        // validation
        if (!title || !description || !videoFile || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // upload video to cloudinary
        const videoFileDetails = await uploadImagesToCloudinary(videoFile, process.env.FOLDER_NAME);

        // create entry in DB
        const SubSectionDetails = await Subsection.create(
            { title, description, videoUrl: videoFileDetails.secure_url })

        // link subsection id to section
        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate("subSection")

        // return response
        res.status(200).json({
            success: true,
            data: updatedSection,
            message: 'SubSection created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating SubSection');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating SubSection',
            error:error.message,
        })
    }
}

// update subsection
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;

        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'subSection ID is required to update'
            });
        }

        // find in DB
        const subSection = await Subsection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        // add data
        if (title !== undefined) {
            subSection.title = title;
        }

        if (description !== undefined) {
            subSection.description = description;
        }

        // upload video to cloudinary
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration;
        }

        // save data to DB
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        });
    }
    catch (error) {
        console.error('Error while updating the section')
        console.error(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating the section",
        })
    }
}



// // delete subSection

// exports.deleteSubSection = async (req, res) => {
//     try{
//         const {subSectionId} = req.body;
//         if (!subSectionId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Subsection ID is required',
//             });
//         }
//         // delete the subsection
//         await Subsection.findByIdAndDelete(subSectionId);

//         return res.status(200).json({
//             success:true,
//             message:'Subsection deleted successfully'
//         })


//     } catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//         });
//     }
    
// }


// ================ Delete SubSection ================
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        // Validate Inputs
        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Both subSectionId and sectionId are required",
            });
        }

        // Ensure Subsection Exists
        const subSection = await Subsection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // Remove Subsection from Section
        await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } },
            { new: true }
        );

        // Delete Subsection from DB
        await Subsection.findByIdAndDelete(subSectionId);

        // Return updated section
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting subsection:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        });
    }
};
