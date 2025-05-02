const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//Create SubSection:
exports.createSubSection = async (req, res) => {
    try {
        //Fetch data from req body
        const { sectionId, title, description } = req.body;
        console.log(req.body);
        //Extract file / video
        const video = req.files.video;

        //Validation
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //upload video to cloudinary-- to get secure url
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        console.log("Upload Details are:---", uploadDetails);
        //create subsection
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        console.log("Subsection details are--->", SubSectionDetails);

        //update section with this subsection ObjectID
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: SubSectionDetails._id,
                },
            },
            { new: true }
        ).populate("subSection");

        console.log("Updated Section is-->", updatedSection);

        //Return response
        return res.status(200).json({
            success: true,
            message: "Sub Section Created Successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.log("Error in creating the subSection", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

//Update subsection:
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;
        console.log("Request body:", req.body);
        const subSection = await SubSection.findById(subSectionId);

        console.log("SubSection in updateSubSection is---->>>", subSection);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Sub Section not Found",
            });
        }

        if (title !== undefined) {
            subSection.title = title;
        }
        if (description !== undefined) {
            subSection.description = description;
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        );
        console.log("SUBSECTION AFTER SAVING--->>>>", updatedSection);
        return res.json({
            success: true,
            message: "Section Updated Successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.log("Error in Updating the subSection", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update SubSection, please try again",
        });
    }
};

//Delete Section
exports.deleteSubSection = async (req, res) => {
    try {
        //get id --assuming that we are semding ID in params
        const { subSectionId, sectionId } = req.body;
        console.log("Ids from body",req.body)

        //use findByIdAndDelete
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        );

        //TODO { Testing }: Do we need to delete the entry form the course schema ???
        const subSection = await SubSection.findByIdAndDelete({
            _id: subSectionId,
        });
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Sub Section Not found",
            });
        }

        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        );

        //return response
        return res.status(200).json({
            success: true,
            message: "Sub Section Deleted Successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.log("Error in Deleating the subSection", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete section, please try again",
        });
    }
};
