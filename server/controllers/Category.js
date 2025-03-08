const { response } = require("express");
const Category = require("../models/Category");

// create category ka handler function 

exports.createCategory = async (req, res) => {
    try {
        // getting info
        const { name, description } = req.body;


        // validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:'All the credentials are required',
            })
        }
        // create entry in database
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);
        // return response

        return res.status(200).json({
            success:true,
            message:'category is created successfully',
           
        })



    } catch(error){
        res.status(500).json({
            success:false,
            message: error.message,})
    }
}

// get all category

exports.showAllcategory = async (req, res) => {
    try{
        const allCategory = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success:true,
            data: allCategory,
            message:'All Category returned successfully',
        })

    } catch(error){
        res.status(500).json({
            success:false,
            message: error.message,})
    }
}


// category page details

exports.categoryPageDetails = async (req, res) => {
    try{
        // get categoryid
        const { categoryId } = req.body;

        // get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId).populate("courses")

        .populate("courses")
        .exec();
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message: 'Category not found',
            })
        }
        // get coursesfor diff categories
        const differentCategories = await Category.find({ 

            _id: {$ne: categoryId},
        })
        .populate("courses")
        exec();
        // get top selling courses
        // HW write it on own
        // return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
            },
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })

    }
}
