const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Profile = require('./profile')

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    avatar : {
        type : String
    },
    tokens: [{
        token : {
            type : String,
            requied : true
        }
    }],
},{
    timestamps : true
})

// tạo liên kết ảo với Task
UserSchema.virtual('userProfile',{
    ref : 'profile', // liên kết với profile model
    localField : '_id', // khóa liên kết là id
    foreignField : 'user' // khóa ngoại của liên kết kia là user
})

// Delete user task when delete user
UserSchema.pre('remove', async function(next) {
    const user = this
    await Profile.deleteMany({user : user._id})
    next()
})

//  choice show res user
UserSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject() // gán all object trong user vào userObject với toObject của mongoose

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// hash password pre save
UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// create token. Sử dụng this làm function thì methods
UserSchema.methods.SignJWT = async function() {
    const user = this
    const token = await jwt.sign({ _id : user._id.toString() }, process.env.SECRECT_KEY, {expiresIn : '1h' })
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}




const User = mongoose.model('users', UserSchema)

module.exports = User