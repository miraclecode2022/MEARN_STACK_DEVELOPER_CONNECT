const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

// Send Email
const {sendWelcomeEmail,sendRemoveEmail} = require('../email/sendEmail')

// Load Input validator 
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')


// Register User
router.post('/register', async (req,res) => {

    const { errors , isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).send(errors)
    }
    const hasEmail = await User.findOne({email : req.body.email})
    if(hasEmail){
        errors.email = "Email already exists"
        return res.status(400).send(errors)
    }
    try {
        const avatar = gravatar.url(req.body.email,{
            size : '200',
            rating : 'pg',
            default : 'mm'
        })
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            avatar,
        })
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

// Login user
router.post('/login', async(req,res) => {

    const { errors , isValid } = validateLoginInput(req.body);
    if(!isValid){
        return res.status(404).send(errors)
    }

    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({email})
        if(!user){
            errors.email = 'User not found!'
            return res.status(404).send(errors)
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            errors.password = 'Password is incorrect!'
            return res.status(404).send(errors)
        }
        const token = await user.SignJWT()
        res.send({user,token})
    }catch(err){
        res.status(400).send(err)
    }
})

// get info user
router.get('/current',auth, async(req,res) => {
    try{
        const user = req.user
        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
})

// logout delete all token
router.post('/logoutAll',auth, async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(err) {
        res.status(500).send(err)
    }
})

// delete user
router.delete('/delete', auth, async(req,res) => {
    try {
        await req.user.remove()
        sendRemoveEmail(req.user.email,req.user.name)
        res.send(req.user)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router