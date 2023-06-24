const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email Address"],
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minlength: 8,
    maxlength: 100
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
