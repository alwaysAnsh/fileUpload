const express = require("express");
const app = express();
// const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT|| 3000 ;


app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));



//cloudinary and DB ko connect krna hai
const dbconnect = require("./config/database");
dbconnect.connect();
require("./config/cloudinary").cloudinaryConnect();

//routes ko import krwaocv
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);


app.listen(PORT, () => {
    console.log(`Application successfully started at port ${PORT}`);
})

