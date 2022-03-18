const express = require("express");
const destModel = require("../model/destinationModel");
const AsyncCatch = require("../utils/AsyncCatch");
const ExpressError = require("../utils/ExpressError");
const { schemaDestination } = require("../schemas");
const { isLoggedin, isDestAuthor } = require("../utils/middlewares");
const router = express.Router({ mergeParams: "true" });
const upload = require("../3rd_party_APIs/cloudinary/configuration");
const mapDestination = require("../3rd_party_APIs/mapBox/maps");

// Syncronous Code errors are handled by express automatically
// No need for catch()
//This Middleware checks if the request body has all parameters before submitting
//This is the server-side validation of data
const validateDestinations = (req, res, next) => {
  const { error } = schemaDestination.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// AsyncCatch() is just wrapper around the (req,res) callback function
// Because it is asynchronous, express requires that those functions errors get handled manually
// This is exctly what this wrapper does
router.get(
  "",
  AsyncCatch(async (req, res) => {
    let destinations = await destModel.find({});
    res.render("destinations.ejs", {
      destinations,
      clusterMap: true,
    });
  })
);

router.get(
  "/new",
  isLoggedin,
  AsyncCatch(async (req, res) => {
    res.render("new");
  })
);

// upload.array is a Multer object for parsing files submited in forms
//it's being used with the Cloudinary SDK to upload on their cloud server directly
router.put(
  "/new",
  isLoggedin,
  upload.array("images"),
  validateDestinations,
  AsyncCatch(async (req, res) => {
    if (!req.body.formData)
      throw new ExpressError("Invalid Destination Info", 400);
    const { formData } = req.body;
    let destination = new destModel(formData);
    destination.author = req.session.passport.user;
    destination.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    // Converting the location to geoData using geoBox module to display it on the map
    destination.geometry = await mapDestination(
      req.body.formData.location
    );
    await destination.save();
    // using 'connect-flash' for easier message and warning displays
    req.flash("success", "Successfully created destination");
    res.redirect(`/destinations/${destination.id}`);
  })
);

router.get(
  "/:id",
  AsyncCatch(async (req, res) => {
    try {
      const id = req.params.id;
      let destination = await destModel
        .findById(id)
        .populate("author")
        .populate({
          path: "reviews",
          populate: { path: "author", model: "User" },
        });
      res.render("destination", { destination });
    } catch {
      throw new ExpressError("No such Destination ID", 400);
    }
  })
);

router.put(
  "/:id",
  isDestAuthor,
  upload.array("images"),
  validateDestinations,
  AsyncCatch(async (req, res) => {
    const id = req.params.id;
    if (!req.body.formData)
      throw new ExpressError(" Invalid Destination Info", 400);
    const updateInfo = req.body.formData;
    new_images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    let destination = await destModel.findByIdAndUpdate(
      id,
      updateInfo,
      { new: true }
    );
    // Deleting images
    if (req.body.imgsToDelete) {
      await destModel.findByIdAndUpdate(id, {
        $pull: {
          images: { filename: { $in: [req.body.imgsToDelete] } },
        },
      });
    }
    // Adding the new images to the currently existing ones
    destination.images.push(...new_images);
    await destination.save();
    req.flash("success", "Successfully updated destination");
    res.redirect(`/destinations/${destination.id}`);
  })
);

router.get(
  "/:id/edit",
  isLoggedin,
  AsyncCatch(async (req, res) => {
    const id = req.params.id;
    try {
      let destination = await destModel.findById(id);
      res.render("update", { destination });
    } catch {
      throw new ExpressError("No such Destination ID", 400);
    }
  })
);

router.delete(
  "/:id",
  isLoggedin,
  isDestAuthor,
  AsyncCatch(async (req, res) => {
    try {
      await destModel.findByIdAndDelete(req.params.id);
    } catch {
      throw new ExpressError("No such Destination ID", 400);
    }
    req.flash("error", "Destination Deleted");
    res.redirect("/destinations");
  })
);

module.exports = router;
