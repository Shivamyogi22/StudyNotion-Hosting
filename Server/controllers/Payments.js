const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
    courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const {
    paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
// const { error } = require("console");

//Inititate the razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    console.log("USERID-->", userId);
    console.log("COURSES-->", courses);

    if (courses.length === 0) {
        return res.json({
            success: false,
            message: "Please provide the Course Id",
        });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find the Course",
                });
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled",
                });
            }
            // Total amount
            totalAmount += course.price;
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log("paymentResponse --->", paymentResponse);
        res.json({
            success: true,
            message: paymentResponse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Could not initiate order",
        });
    }
};

//payment verification
exports.verifyPayment = async (req, res) => {
    const databody = req.body;
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    console.log(databody);
    console.log(razorpay_order_id);
    console.log(razorpay_payment_id);
    console.log(razorpay_signature);
    console.log(courses);
    console.log(userId);

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        //Enroll karwao student ko
        await enrollStudents(courses, userId, res);

        //return res
        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        });
    }
    return res.status(200).json({
        sucess: true,
        message: "Payment failed",
    });
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields",
        });
    }

    try {
        //Student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );
    } catch (error) {
        console.log("Error in sending mail");
        return res.status(500).json({
            success: false,
            message: "Could not send the email",
        });
    }
};

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: true,
            message: "Please provide data for courses or userId",
        });
    }
    for (const courseId of courses) {
        try {
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );
            if (!enrolledCourse) {
                return res.status.json({
                    sucess: false,
                    message: "Course not Found",
                });
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            //find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            //Bachhe ko mail send kardo
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName}  ${enrolledStudent.lastName}`
                )
            );
            console.log("Email Sent Successfully", emailResponse.response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
};

// //capture the payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {
//     //get courseId and userId
//     const { course_id } = req.body;
//     const userId = req.user.id;

//     //validation
//     //valid CourseId
//     if (!course_id) {
//         return res.json({
//             success: false,
//             message: "Please provide valid course ID",
//         });
//     }

//     //Valid courseDetails
//     let course;
//     try {
//         course = await Course.findById(course_id);

//         //validation
//         if (!course_id) {
//             return res.json({
//                 success: false,
//                 message: "Could not find the course",
//             });
//         }

//         //user already paid for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Student is already enrolled",
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }

//     //* THIS IS MAIN PART OF RAZORPAY INTEGRATION *\\

//     //order Create and payment
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         //Used for varification of signature
//         notes: {
//             courseId: course_id,
//             userId,
//         },
//     };

//     try {
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         //return response
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.orderId,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false,
//             message: "Could not inititate order",
//         });
//     }
//     //return response
// };

// //verify signature of Razorpay and server
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers("x-razorpay-signature");

//     // AISA HI HOTA H bs Jyda dimag nhi lgna
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment is Authorised");

//         //Ab aage ky hoga course k bare m kse pta chlega
//         const { courseId, userId } = req.body.payload.payment.entity.notes;

//         try {
//             //Fullfil the action

//             //find the course and enroll the student in it
//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 { _id: courseId },
//                 {
//                     push: { studentsEnrolled: userId },
//                 },
//                 { new: true }
//             );

//             //verify the response
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }
//             console.log(enrolledCourse);

//             //Find the course and add the course to the list of enrolled courses for students
//             const enrolledStudent = await User.findOneAndUpdate(
//                 { _id: userId },
//                 {
//                     push: { course: courseId },
//                 },
//                 { new: true }
//             )

//             console.log(enrolledCourse);

//             //Congratualations mail
//             //Mail send krdo
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation from CodeHelp",
//                 "Congratuation , you are onboarded into new codehelp course",
//             );
//             console.log(emailResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verified and course added"
//             })

//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }
//     }

//     else{
//         return res.status(500).json({
//             success:false,
//             message:"Invalid request",
//         })
//     }
// };
