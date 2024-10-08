const express = require('express')
const router = express.Router();
const Users = require('../models/User')

router.get('/all', async (req, res) => {
    try {
        const fetchedusers = await Users.find()
        res.status(200).json(fetchedusers)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/register', async (req, res) => {
    try {
        const newuserdata = new Users(req.body)
        const { name, email, password, phone , location, role } = newuserdata
        const finduser = await Users.findOne({ email: email })
        if (finduser !== null) {
            res.status(400).json({ message: "Email Already Exists !" })
        }
        if (!name ||!email || !password ||!phone||!location|| !role) {
            res.status(400).json({ message: "All fields Required !" })

        }
        const savedata = await newuserdata.save()
        res.status(200).json(savedata)

    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/login', async (req, res) => {
    try {
        const userdata = new Users(req.body)
        const { email, password } = userdata
        if (!email || !password) {
            res.status(400).json({ message: "Invalid Credentials" })
        }
        const finduser = await Users.findOne({ email: email })
        if (finduser=== null) {
            res.status(404).json({ message: "Invalid Email !" })
        }
        if (finduser.email === email && finduser.password === password) {
            res.status(200).json(finduser.role)
        } else {
            res.status(404).json({ message: "Invalid Password !" })
        }

    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // const { id } = req.params;
        const currentrecord = await Users.findOne({ _id: id })
        if (!currentrecord) {
            res.status(404).json({ message: "User not found !" })
        }
        const updateUser = await Users.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const currentrecord = await Users.findOne({ _id: id })
        if (!currentrecord) {
            res.status(404).json({ message: "User not found !" })
        }
        await Users.findByIdAndDelete(id)
        res.status(200).json({ message: "User Deleted !" })
    } catch (e) {
        res.status(500).json(error)
    }
})

module.exports = router