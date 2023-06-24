const Contact = require("../models/contactModel")

exports.createContactInfo = async(req, res) => {
    try{
        const newContact = await Contact.create(req.body)

        res.status(201).send(newContact)
    }catch(err){
        res.status(400).json({
            status: 'fail'
        })
    }
}