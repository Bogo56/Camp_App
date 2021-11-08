const express = require("express")
const AsyncCatch = require("../utils/AsyncCatch")
const {schemaUser} = require("../schemas")
const passport = require("../auth/passport-config")
const router = express.Router({mergeParams:"true"})
const userModel = require("../model/userModel")
const ExpressError = require("../utils/ExpressError")


const validateUserInfo = (req,res,next) => {
    const {error} = schemaUser.validate(req.body)
    if (error){
        const msg = error.details.map(  el => el.message).join(",")
        throw new ExpressError(msg,400)
    }
    else{
        next()
    }
}

router.get("/register",AsyncCatch(async (req,res) => {
    res.render("register")
}))

router.post("/register",validateUserInfo,AsyncCatch(async(req,res) => {
    try{
    const newUser = new userModel(req.body)
    const regUser = await newUser.save()
    req.login(regUser, err =>{
        if(err) return next(err)
    req.flash("success",`Welcome ${req.user.username}`)
    res.redirect("/destinations")
    })
    }
    catch{
        req.flash("error","Username/Email already exists")
        res.redirect("/user/register")
    }
}))

router.get("/login",(req,res) => {
    res.render("login")
})

router.post("/login",passport.authenticate("local",{failureRedirect: '/user/login',
failureFlash: true, }),(req,res) =>{
    req.flash("success",`Welcome back ${req.user.username}`)
    const returnTo = req.session.returnTo || "/destinations"
    delete req.session.returnTo
    res.redirect(returnTo)
})


router.get("/logout",(req,res) =>{
    req.logout()
    req.flash("success", "Bye-bye")
    res.redirect("/destinations")
})

module.exports = router