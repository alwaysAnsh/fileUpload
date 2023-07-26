const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload --> handler function

exports.localFileUpload = async (req, res ) => {
    try {
        //fetch the file
        const file = req.files.file;
        console.log("file aa gyi --- ",file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1] }`;
        console.log("paath ye hai ---> ",path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success : true,
            message : "file uploaded succesfullly ",
        });
    }
    catch(err){
        console.error(err);
        console.log("Something went wrong, Please try again later");
    }
}

//image upload to cloudinary

function isSupportedType(type, supportedTypes )
{
    return supportedTypes.includes(type);
}

//upload file to cloudinary
async function uploadFileToCloudinary(file, folder )
{
    const options = {folder};
    options.resourse_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options );
}

exports.imageUpload = async (res, req ) => {
    try {
        //data fetch
        const {name, tags, email } = req.body;
        
        console.log(name, tags, email);

        //file recieve
        const file = req.files.imageFile;       //third parameter is "key" which is passed in postman 
        console.log("file " ,file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isSupportedType(file, supportedTypes)){
            res.status(400).json({
                success : false,
                message : "NOt a supported file type",
            });
            
            const response = await uploadFileToCloudinary(file, "Chintu");
        }
    }
    catch(err){
        console.error(err);
        console.log("something went wrong");
        
    }
}

//video upload --> same as image wala, just key wali value change ho jaegi
//image compress --> sab same hai bs cloudinary wala jo function tha usmein 'quality' wala ek parameter pass hoga baaki sab same hi rhega
