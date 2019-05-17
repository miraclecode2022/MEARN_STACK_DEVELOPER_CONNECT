const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL,{ 
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
}, (error) =>{
    if(error){
        return console.log("Cant connect to database!")
    }
    console.log("Database connected!!")
})

module.exports = mongoose