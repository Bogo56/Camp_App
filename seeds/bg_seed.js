const fs = require("fs");
const mongoose = require("mongoose");
const destModel = require("../model/destinationModel");
const userModel = require("../model/userModel");
const reviewModel = require("../model/reviewsModel");
const mapDestination = require("../3rd_party_APIs/mapBox/maps");

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// This module is seeding the database with the destinations

connection().then(() => console.log("Connected to Database"));

async function connection() {
  await mongoose.connect(process.env.DB_URL);
}

mongoose.connection.on("error", (err) => {
  logError(err);
});

let rawdata = fs.readFileSync("./bg_destinations.json");
let destinationsBG = JSON.parse(rawdata);

const seedDB = async (user_id) => {
  await destModel.deleteMany({});
  await reviewModel.deleteMany({});
  let i = 0;
  for (let dest of destinationsBG) {
    let loc = new destModel({
      location: dest.location,
      geometry: {
        type: "Point",
        coordinates: [27.91694, 43.20778],
      },
      title: dest.destination,
      images: [
        {
          url: `https://res.cloudinary.com/dawb3psft/image/upload/v1636315395/CampProject/dest_${i}_image_${1}.jpg`,
          filename: `CampProject/dest_${i}_image_${1}.jpg`,
        },
        {
          url: `https://res.cloudinary.com/dawb3psft/image/upload/v1636315395/CampProject/dest_${i}_image_${2}.jpg`,
          filename: `CampProject/dest_${i}_image_${2}.jpg`,
        },
        {
          url: `https://res.cloudinary.com/dawb3psft/image/upload/v1636315395/CampProject/dest_${i}_image_${3}.jpg`,
          filename: `CampProject/dest_${i}_image_${3}.jpg`,
        },
      ],
      reviews: [],
      author: user_id,
    });

    i++;
    loc.geometry = await mapDestination(dest.location);
    await loc.save();
  }
};

userModel
  .deleteMany({})
  .then(() => {
    let user = new userModel({
      username: "User1",
      email: "user1@gmail.com",
      password: "password",
    }).save();
    return user;
  })
  .then((user) => seedDB(user.id));
