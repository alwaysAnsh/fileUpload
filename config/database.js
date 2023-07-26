const mongoose = require("mongoose");

require("dotenv").config();    //{ path: '.env' }

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(() => {
        console.log("db connection successfull ");
    })
    // .then(console.log("DB connection successfull "))
    .catch((error) => {
        console.log("db connection issue ");
        console.error(error);
        process.exit(1);
    });
};