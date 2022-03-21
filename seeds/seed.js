const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./locations");
const destModel = require("../model/destinationModel");
const reviewModel = require("../model/reviewsModel");
const userModel = require("../model/userModel");
const { getMaxListeners } = require("../model/destinationModel");
const { resolveInclude } = require("ejs");

// This Module is used for seeding the database with the scraped data

connection().then(() => console.log("Connected to Database"));

async function connection() {
  await mongoose.connect("mongodb://localhost:27017/yelpAPP");
}

mongoose.connection.on("error", (err) => {
  logError(err);
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const price = () => {
  return Math.floor(Math.random() * 50);
};

const seedDB = async (user_id) => {
  await destModel.deleteMany({});
  await reviewModel.deleteMany({});
  for (let i = 0; i < 100; i++) {
    let index = Math.floor(Math.random() * 1000);
    let loc = new destModel({
      location: cities[index].city,
      geometry: {
        type: "Point",
        coordinates: [
          cities[index].longitude,
          cities[index].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dawb3psft/image/upload/v1636088424/CampProject/u0sljfrzo7qmjnjbrqsp.jpg",
          filename: "CampProject/u0sljfrzo7qmjnjbrqsp",
        },
        {
          url: "https://res.cloudinary.com/dawb3psft/image/upload/v1636088424/CampProject/aupr0rksyksyixavct0i.jpg",
          filename: "CampProject/aupr0rksyksyixavct0i",
        },
      ],
      price: price(),
      reviews: [],
      author: user_id,
    });
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
