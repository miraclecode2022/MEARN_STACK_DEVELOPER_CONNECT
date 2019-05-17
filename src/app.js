const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
require('./db/mongoose')
const app = express()

//
const usersRouter = require('./routers/users')
const profileRouter = require('./routers/profile')
const postsRouter = require('./routers/posts')

// 
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

// Use router
app.use('/users', usersRouter)
app.use('/profile', profileRouter)
app.use('/posts', postsRouter)

// set static
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    })
}
console.log(__dirname)


module.exports = app 