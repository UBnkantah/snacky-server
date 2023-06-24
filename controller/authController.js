const User = require("../models/userModel")
const joi = require("joi")
const bcrypt = require("bcrypt")
const getAuthToken = require("../utils/getAuthToken")

exports.register = async(req, res) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().min(3).max(30).required().email(),
        password: joi.string().min(3).max(200).required()
    })

    const {error} = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})

    if (user) return res.status(400).send("User Already exist..")

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const token = getAuthToken(user)

    res.send(token)
}

exports.login = async(req, res) => {
    const schema = joi.object({
      email: joi.string().min(3).max(30).required().email(),
      password: joi.string().min(3).max(200).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invaid email or password..");
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if(!isValid) return res.status(400).send("Invalid email or password..")
    const token = getAuthToken(user)
    res.send(token)
}