const express = require('express')
const router = new express.Router()

// Authenicate
const auth = require('../middleware/auth')

// Load Profile and User
const Profile = require('../models/profile')
const User = require('../models/user')

// Load validate 
const validateProfileInput = require('../validation/profile')
const validateExperienceInput = require('../validation/experience')
const validateEducationInput = require('../validation/education')

// @router  GET /profile/
// @desc    GET current profile
// @access  Private
router.get('/',auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({ user : req.user._id }).populate('user', ['name','avatar'])
        if(!profile){
            return res.status(404).send({ error : "Profile not found" })
        }
        res.send(profile)
    } catch (err) {
        res.status(400).send({error : err.message})
    }
})

// @router  POST /profile/createProfile
// @desc    create new or edit profile
// @access  Private
router.post('/createProfile',auth,async(req,res) => {

    const { errors, isValid } = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).send(errors)
    }

    // Get fields
    const profileFields = {}
    profileFields.user = req.user._id
    if(req.body.handle)profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',')
    }

    // Social
    profileFields.social = {}
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    
     //
    const profileAlready = await Profile.findOne({user : req.user._id})
    if(profileAlready){
        // Have profile so Update
        const profileUpdate = await Profile.findOneAndUpdate(
            { user : req.user._id },
            { $set : profileFields},
            { new : true }
        )
        // await profileUpdate.save()
        res.send(profileUpdate)
    }
    // Create new profile
     // And Check if handle exists
    const handleExists = await Profile.findOne({handle : profileFields.handle})
    if(handleExists){
        errors.handle = 'Handle already exists'
        res.status(400).send(errors)
    }

    try{
        // Save profile
        const profile = await new Profile(profileFields).save()
        res.send(profile)
    } catch(err) {
        res.status(400).send({ error : err.message })
    }
    
})

// @router  POST /profile/experience
// @desc    Create experience for profile
// @access  Private
router.post('/experience',auth, async(req,res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(400).send(errors)
    }
    try{
        const profile = await Profile.findOne({ user : req.user._id })
        const newExp  = {
            title : req.body.title,
            company : req.body.company,
            location : req.body.location,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description
        }
        await profile.experience.unshift(newExp) // đẩy dữ liệu vào array profile experience
        const newPro = await profile.save()
        res.send(newPro)
    }catch (err) {
        res.status(400).send(err)
    }
})

// @router  POST /profile/education
// @desc    Create education for profile
// @access  Private
router.post('/education',auth, async(req,res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).send(errors)
    }
    try{
        const profile = await Profile.findOne({ user : req.user._id })
        const newEdu  = {
            school : req.body.school,
            degree : req.body.degree,
            fieldofstudy : req.body.fieldofstudy,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description
        }
        await profile.education.unshift(newEdu) // đẩy dữ liệu vào array profile education
        const newPro = await profile.save()
        res.send(newPro)
    }catch (err) {
        res.status(400).send(err)
    }
})

// @router  GET /profile/all
// @desc    GET all profile
// @access  Public
router.get('/all', async(req,res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name','avatar'])
        if(!profiles){
            errors.noprofile = "There are no profiles"
            res.status(404).send(errors)
        }
        res.send(profiles)
    }catch(err){
        res.status(404).send({profile : "There are no profiles"})
    }
})

// @router  GET /profile/handle/:handle
// @desc    GET profile by handle
// @access  Public
router.get('/handle/:handle', async(req,res) => {
    try {
        const profile = await Profile.findOne({ handle : req.params.handle }).populate('user', ['name','avatar'])
        if(!profile){
            errors.noprofile = "There is no profile for this user"
            return res.status(404).send(errors)
        }
        res.send(profile)
    } catch (err) {
        res.status(400).send({profile : "No Profile for this user"})
    }
    

})

// @router  GET /profile/user/:user_id
// @desc    GET profile by user id
// @access  Public
router.get('/user/:user_id', async(req,res) => {
    try {
        const profile = await Profile.findOne({ user : req.params.user_id }).populate('user', ['name','avatar'])
        if(!profile || profile == null){
            errors.noprofile = "There is no profile for this user"
            return res.status(404).send(errors)
        }
        res.send(profile)
    } catch (err) {
        res.status(400).send({profile : "No Profile for this user"})
    }
})

// @router  DELETE /profile/experience/:exp_id
// @desc    delete experience of profile
// @access  Private
router.delete('/experience/:exp_id',auth, async(req,res) => {
    try{
        const profile = await Profile.findOne({ user : req.user._id })
        // Get remove index
        const removeIndex = await profile.experience
            .map(index => index._id)
            .indexOf(req.body.exp_id)
        // Splice out of array
        await profile.experience.splice(removeIndex,1)
        await profile.save()
        res.send(profile)
    }catch (err) {
        res.status(400).send(err)
    }   
})

// @router  DELETE /profile/education/:edu_id
// @desc    delete education of profile
// @access  Private
router.delete('/education/:edu_id',auth, async(req,res) => {
    try{
        const profile = await Profile.findOne({ user : req.user._id })
        // Get remove index
        const removeIndex = await profile.education
            .map(index => index._id)
            .indexOf(req.body.edu_id)
        // Splice out of array
        await profile.education.splice(removeIndex,1)
        await profile.save()
        res.send(profile)
    }catch (err) {
        res.status(400).send(err)
    }   
})


module.exports = router