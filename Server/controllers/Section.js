const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

//Create section
exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;

        console.log(req.body);

        //data Validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            });
        }
        //create section
        const newSection = await Section.create({ sectionName });

        //update course with section ObjectID
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        //How to use populate so that we can update section and subsection

        //Return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create section, please try again",
            error: error.message,
        });
    }
};

//Update section:
exports.updateSection = async (req, res) => {
    try {
        //Data input
        const { sectionName, sectionId, courseId } = req.body;

        //update data
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        //return response
        return res.status(200).json({
            success: true,
            message: section,
            data: course,
        });
    } catch (error) {
        console.log("Error in updating the section", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update section, please try again",
        });
    }
};

//Delete Section
exports.deleteSection = async (req, res) => {
    try {
        //get id --assuming that we are semding ID in params

        const { sectionId, courseId } = req.body;
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            },
        });
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            });
        }

        //delete sub section
        await SubSection.deleteMany({
            _id: {
                $in: section.subSection,
            },
        });

        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course,
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
