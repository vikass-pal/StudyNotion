const Subsection = require("../models/Subsection");
const section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// create subsection
exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req body
        const {sectionId, title, timeDuration, description} = req.body;

        // extract file/video
        const video = req.files.videoFile;
        // validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        // create a subSection
        const SubSectionDetails = await Subsection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        // update section with this subsection objectId
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        );
        // return response
        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: 'SubSection created successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}

// update subsection
exports.updateSubSection = async (req, res) => {
    try {
        // get data
        const { subSectionId, title, timeDuration, description } = req.body;

        // validate data
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'Subsection ID is required',
            });
        }

        // update the subsection
        const updatedSubsection = await Subsection.findByIdAndUpdate(
            subSectionId,
            { title, timeDuration, description },
            { new: true }
        );

        // check if the subsection was found and updated
        if (!updatedSubsection) {
            return res.status(404).json({
                success: false,
                message: 'Subsection not found',
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: 'Subsection updated successfully',
            updatedSubsection,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


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
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        // delete from DB
        const subSection = await Subsection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate('subSection')

        // In frontned we have to take care - when subsection is deleted we are sending ,
        // only section data not full course details as we do in others 

        // success response
        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,

            error: error.message,
            message: "An error occurred while deleting the SubSection",
        })
    }
}