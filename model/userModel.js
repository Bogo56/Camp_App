const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Function that hashes the password using "bcrypt" library
const hashPass = async function (password) {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

// Creating a Middleware, that hashes every password before saving the new user to MongoDB
userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await hashPass(this.password);
  }
  next();
});

// Static method on the model for comparing the login password with the stored hashed password in MongoDB
userSchema.statics.validatePass = async function (password, hash) {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

module.exports = mongoose.model("User", userSchema);
