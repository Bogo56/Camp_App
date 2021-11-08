const destModel = require("../model/destinationModel")
const reviewsModel = require("../model/reviewsModel")

// This Middleware checks if the user is logged in

const isLoggedin = (req,res,next) => {
    if(req.isAuthenticated()){
        next()
    }
    else{
        req.session.returnTo = req.originalUrl
        req.flash("error","You are not logged in")
        res.redirect("/user/login")
    }
}

module.exports.isLoggedin = isLoggedin



// This Middleware checks if the user has author rights

const isDestAuthor = async (req,res,next) =>{
    const id = req.params.id
    let destination = await destModel.findById(id).populate("author")
    if (req.isAuthenticated() && destination.author.id === req.session.passport.user){
        next()
    }
    else{
        req.flash("error","Only the author can edit this destination")
        res.redirect(`/destinations/${id}`)
    }
}

module.exports.isDestAuthor = isDestAuthor


const isReviewAuthor = async (req,res,next) =>{
    const destID = req.params.id
    const reviewID = req.params.reviewID
    let review = await reviewsModel.findById(reviewID).populate("author")
    if (req.isAuthenticated() && review.author.id === req.session.passport.user){
        next()
    }
    else{
        req.flash("error","Only the author of the review can delete it")
        res.redirect(`/destinations/${destID}`)
    }
}


module.exports.isReviewAuthor = isReviewAuthor