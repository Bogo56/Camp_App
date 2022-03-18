const mongoose = require("mongoose");
const destModel = require("./destinationModel");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  destRef: {
    type: mongoose.ObjectId,
    ref: "Location",
  },
  author: { type: mongoose.ObjectId, ref: "User" },
});

// Mongoose Middleware that deletes a review refrence in the 'Destinations' document after deleting
//the review itself. Something similar to Cascade Delete in an SQL database, so that no orphaned documents('review of nothing')
// are stored in the database.
reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await destModel.findByIdAndUpdate(doc.destRef, {
      $pull: { reviews: { $in: [doc.id] } },
    });
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
