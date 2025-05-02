const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPassword Token
exports.resetPasswordToken = async (req, res) => {
    try {
        // Get email from request from req ki body
        const email = req.body.email;

        // Check user for this email, email verification
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }
        // Generate token
        //  const token = crypto.randomUUID();
        const token = crypto.randomBytes(20).toString("hex");

        // Update User by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            { new: true }
        );
        console.log("DETAILS", updatedDetails);

        // Create url
        const url = `http://localhost:3000/update-password/${token} `;

        // Send mail containing url
        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        // Return Response
        return res.json({
            success: true,
            message:
                "Email for password correction sent successfully, please check email and check password",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while sending reset password link, please try again",
        });
    }
};

//Reset Password
exports.resetPassword = async (req, res) => {
    try {
        //Data fetching
        const { password, confirmPassword, token } = req.body;

        //Validation
        // if (password !== confirmPassword) {
        //     return res.status(401).json({
        //         success: false,
        //         message:
        //             "Password is not matching, please fill both the entry correctly",
        //     });
        // }

        // Done this in frontend

        //Get user details form DB using token
        const userDetails = await User.findOne({ token: token });

        //if no entry, invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is Invalid",
            });
        }

        //token time check
        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            });
        }

        //password Update :=> hashing and updated
        const hashedPassword = await bcrypt.hash(password, 10);

        //Password update-
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );

        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfull",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Someerror went wrong while sending reset password mail",
        });
    }
};
