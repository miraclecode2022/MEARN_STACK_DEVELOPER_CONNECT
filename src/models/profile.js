const mongoose = require('mongoose')
const validator = require('validator')

const profileSchema = mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'users' // use populate to show what u want
    },
    handle : {
        type : String,
        required : [true, 'Handle is required'],
        min : 2,
        max : 40
    },
    company : {
        type : String
    },
    website : {
        type : String,
        validate(website){
            if(!validator.isURL(website)){
                throw new Error('Not a valid URL')
            }
        }
    },
    location : {
        type : String
    },
    status : {
        type : String,
        required : true
    },
    skills : [{
        type : String,
        required : true
    }],
    bio : {
        type : String
    },
    githubusername : {
        type : String
    },
    experience : [
        {   
            title : {
                type : String,
                required : true
            },
            company : {
                type : String,
                required : true
            },
            location : {
                type : String
            },
            from : {
                type : Date,
                required : true
            },
            to : {
                type : Date
            },
            current : {
                type : Boolean,
                default : false
            },
            description : {
                type : String
            }
        } 
    ],
    education : [
        {   
            school : {
                type : String,
                required : true
            },
            degree : {
                type : String,
                required : true
            },
            fieldofstudy : {
                type : String
            },
            from : {
                type : Date,
                required : true
            },
            to : {
                type : Date
            },
            current : {
                type : Boolean,
                default : false
            },
            description : {
                type : String
            }
        } 
    ],
    social : {
        youtube : {
            type : String,
            validate(youtube){
                if(!validator.isURL(youtube)){
                    throw new Error('Not a valid URL')
                }
            }
        },
        facebook : {
            type : String,
            validate(facebook){
                if(!validator.isURL(facebook)){
                    throw new Error('Not a valid URL')
                }
            }
        },
        instagram : {
            type : String,
            validate(instagram){
                if(!validator.isURL(instagram)){
                    throw new Error('Not a valid URL')
                }
            }
        },
        twitter : {
            type : String,
            validate(twitter){
                if(!validator.isURL(twitter)){
                    throw new Error('Not a valid URL')
                }
            }
        }
    },
},{
    timestamps : true
})

const Profile = mongoose.model('profile', profileSchema)
module.exports = Profile