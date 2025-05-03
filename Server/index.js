const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

//Database
const database = require("./config/database");

//Other connections
const cookieParse = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

//Config file
dotenv.config();
const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//MIddleware
app.use(express.json());
app.use(cookieParse());

//frontend-backend middleware connection
// app.use(
//     cors({
//       origin: "https://study-notion-frontend-shivam-yogis-projects.vercel.app",
//       credentials: true,
//     })
//   );
  
const allowedOrigins = [
    "https://study-notion-frontend-shivam-yogis-projects.vercel.app",
    "https://study-notion-frontend-sooty.vercel.app",
    "https://study-notion-frontend-git-main-shivam-yogis-projects.vercel.app",
    "https://study-notion-frontend-kxt96hupx-shivam-yogis-projects.vercel.app",
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );
  

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//Cloudinary Connection
cloudinaryConnect(); 

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//default
app.get("/", (req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is up and running....",
    });
});

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})