const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'users'
    },
    text : {
        type : String,
        required : true
    },
    name : {
        type : String,
    },
    avatar : {
        type : String
    },
    likes : [
        {
            user :{
                type : mongoose.Types.ObjectId,
                ref : 'users'
            }
        }
    ],
    comments : [
        {
            user :{
                type : mongoose.Types.ObjectId,
                ref : 'users'
            },
            text : {
                type : String,
                required : true
            },
            name : {
                type : String,
            },
            avatar : {
                type : String
            },
            date : {
                type : Date,
                default : Date.now
            }
        }
    ]
},{
    timestamps : true
})

const Post = mongoose.model('posts', postSchema)

module.exports = Post