const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

// By default vituals are not included when getting the object from DB, we change that
// because we need it for the geoData that mapBox requires to display a cluster of locations
const opts = { toJSON: { virtuals: true } };

const locationSchema = new mongoose.Schema(
  {
    location: String,
    // We're storing the lon and lat as GeoJson data, because MongoDB supports
    // special operators for them(finding nearest location, calculating distance, etc.)
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    title: String,
    images: [imageSchema],
    price: Number,
    reviews: [{ type: mongoose.ObjectId, ref: "Review" }],
    author: { type: mongoose.ObjectId, ref: "User" },
  },
  opts
);

// Resizing the uploaded images before displaying them using Cloudinary API
imageSchema.virtual("resize").get(function () {
  return this.url.replace("/upload", "/upload/ar_1.2,c_crop");
});

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/h_160,w_160,ar_1.2");
});

// Creating a Custom Property on the Model, that acts as a hyperlink used in the cluster map
locationSchema.virtual("properties.popUpMarkup").get(function () {
  return `<h4>${this.title}<h4><strong><a href=/destinations/${this._id}>Check Destination</a></strong>`;
});

// This is acting the same as a Cascade Delete in a SQL Database. Deleting a Destination, deletes all reviews
// connected to it.
locationSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await mongoose.model("Review").deleteMany({ destRef: doc.id });
  }
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
