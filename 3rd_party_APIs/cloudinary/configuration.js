const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer")
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}


// This module is using the Cloudinary API to store media files on it's servers

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_SERVER,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure:true
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"CampProject",
        allowedFormats:["jpeg","png","jpg"]
    }
})


module.exports = multer({storage:storage})

