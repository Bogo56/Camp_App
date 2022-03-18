const mongoose = require("mongoose");
const express = require("express");
const engine = require("ejs-mate");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const destRoute = require("./routes/destinations");
const reviewRoute = require("./routes/reviews");
const userRoute = require("./routes/users");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./auth/passport-config");

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });

conn()
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Connection Failed"));

async function conn() {
  await mongoose.connect(process.env.DB_URL);
}

mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//This Middleware creates local variables available on every request
// This way flash messages are displayed if there are any
//curUser variable is used to controll some menu('Login','Logout') visibility
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  res.locals.clusterMap = false;
  next();
});

app.use("/destinations", destRoute);
app.use("/destinations/:id", reviewRoute);
app.use("/user", userRoute);

// Home page
app.get("/", (req, res, next) => {
  res.render("home.ejs");
});

// 404 page
app.all("*", (req, res, next) => {
  res.render("404.ejs");
});

//Error handling route. Catches all thrown Errors
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong";
  res.status(statusCode).render("errors", { err });
});

app.listen(7000);
