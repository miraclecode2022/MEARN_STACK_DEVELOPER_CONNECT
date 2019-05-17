const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

//Load Model
const Post = require('../models/post')
const Profile = require('../models/profile')

// Load Validate
const validatePostInput = require('../validation/post')

// @router  POST /posts/
// @desc    Create new post
// @access  Private
router.post('/create',auth, async(req,res) => {

    const {errors,  isValid} = validatePostInput(req.body)
    if(!isValid){
        return res.status(400).send(errors)
    }

    const newPost = new Post({
        user : req.user._id,
        text : req.body.text,
        name : req.body.name,
        avatar : req.body.avatar
    })
    try {
        await newPost.save()
        res.status(201).send(newPost)
    } catch (err) {
        res.status(400).send(err)
    }
})

// @router  GET /posts/
// @desc    GET post
// @access  Public
router.get('/', async(req,res) => {
    try{
        const posts = await Post.find().sort({ createdAt : -1 })
        if(!posts){
            return res.status(404).send({errors : "No Post to Show"})
        }
        res.send(posts)
    }catch(err) {
        res.status(400).send(err)
    }
})

// @router  GET /posts/:id
// @desc    GET post by id
// @access  Public
router.get('/:id', async(req,res) => {
    try{
        const posts = await Post.findById(req.params.id)
        if(!posts){
            return res.status(404).send({errors : "No Post to Show"})
        }
        res.send(posts)
    }catch(err) {
        res.status(400).send(err)
    }
})

// @router  POST /posts/like/:id
// @desc    POST like post
// @access  Private
router.post('/like/:id',auth, async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        // Check already like post
        if(post.likes.filter(like => like.user.toString() == req.user._id).length > 0) {
            return res.status(400).send({ alreadyLike : "Already like this post" }) 
        } else {
            // add user id on likes post
            const like = { user : req.user._id }
            await post.likes.unshift(like)
            const newPost = await post.save()
            res.send(newPost)
        }
    }catch(err) {
        res.status(400).send(err)
    }
})

// @router  POST /posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id',auth,async(req,res) => {

    const {errors,  isValid} = validatePostInput(req.body)
    if(!isValid){
        return res.status(400).send(errors)
    }

    try {
        const post = await Post.findById(req.params.id)
        const newComment = {
            user : req.user._id,
            text : req.body.text,
            name : req.body.name,
            avatar : req.body.avatar
        }
        // Add to comment array
        await post.comments.unshift(newComment)
        const newpost = await post.save()
        res.send(newpost)
    } catch (err) {
        res.status(400).send(err)
    }
    
})

// @router  POST /posts/unlike/:id
// @desc    POST unlike post
// @access  Private
router.post('/unlike/:id',auth, async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        // Check already unlike post
        if(post.likes.filter(like => like.user.toString() == req.user._id).length == 0) {
            return res.status(400).send({ notLike : "You have not yet like this post" }) 
        } else {
            // get remove index and splice
            // const removeIndex = await post.likes.map(item => item.user.toString()).indexOf(req.user._id)
            let removeIndex = await post.likes.map(item => item.user.toString()).indexOf((req.user._id).toString())
            await post.likes.splice(removeIndex, 1)
            const newPost = await post.save()
            res.send(newPost)
        }
    }catch(err) {
        res.status(400).send(err)
    }
})

// @router  DELETE /posts/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:id/:comment_id',auth,async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        // Check commnet exists
        if(post.comments.filter(comment => comment._id.toString() == req.params.comment_id).length == 0) {
            return res.status(404).send({ commentnotExists : "Comment not exists "})
        }
        // find index remove and splice
        const removeIndex = post.comments.map(item => item.user.toString()).indexOf((req.user._id).toString())
        await post.comments.splice(removeIndex, 1)
        const newPost = await post.save()
        res.send(newPost)
    } catch (err) {
        res.status(400).send(err)
    }
    
})

// @router  DELETE /posts/:id
// @desc    DELETE post by id
// @access  Private
router.delete('/:id',auth, async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post.user.toString() != req.user._id){
            return res.status(401).send({errors : "You can't delete post not your own"})
        } else
        await post.remove()
        res.send(post)
    }catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router