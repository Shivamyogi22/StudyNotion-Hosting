const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser:true,
        // UseUnifiedTopology:true,
    })
    .then(() => console.log("DB Connection Successful"))
    .catch((error)=>{
        console.log("Problem in DB Connection");
        console.log(error);
        process.exit(1);
    })
    
}