const express = require("express")
const destModel = require("../model/destinationModel")
const reviewModel = require("../model/reviewsModel")
const AsyncCatch = require("../utils/AsyncCatch")
const ExpressError = require("../utils/ExpressError")
const {schemaReview} = require("../schemas")
const router = express.Router({mergeParams:"true"})
const {isLoggedin,isReviewAuthor} = require("../utils/middlewares")


const validateReviews = (req,res,next) =>{
    const {error} = schemaReview.validate(req.body)
    if (error){
        const msg = error.details.map(  el => el.message).join(",")
        throw new ExpressError(msg,400)
    }
    else{
        next()
    }
}


// Creating a new 'review' document, and assigning it a refrence to the ID of the 'destination' document
// that it is connected to
router.post("/reviews",isLoggedin,validateReviews,AsyncCatch(async (req,res) => {
    const {reviewInfo} = req.body
    const destID = req.params.id
    reviewInfo.destRef = destID
    const newReview = reviewModel(reviewInfo)
    newReview.author = req.session.passport.user
    const destination = await destModel.findById(destID)
    // Adding the review to the reviews list in the destination document
    destination.reviews.push(newReview)
    await newReview.save()
    await destination.save()
    req.flash('success','Successfully added review')
    res.redirect(`/destinations/${destID}`)
}))

router.delete("/reviews/:reviewID",isReviewAuthor,AsyncCatch(async (req,res) => {
    await reviewModel.findByIdAndDelete(req.params.reviewID)
    req.flash("success",'Review Deleted')
    res.redirect(`/destinations/${req.params.id}`)
}))

module.exports = router