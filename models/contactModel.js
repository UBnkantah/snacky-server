const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email Address"],
  },
  phone: {
    type: Number,
    required: [true, "Please Enter your Phone Number"],
    minlength: 8,
    maxlength: 20,
  },
  message: {
    type: String,
    required: [true, "Please Enter your message"],
    minlength: 5,
    maxlength: 500,
  },
});

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
