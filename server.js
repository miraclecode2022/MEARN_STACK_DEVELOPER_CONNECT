const http = require('http')
const port = process.env.PORT || 5000
const app = require('./src/app')
require('dotenv').config()

const server = http.createServer(app)

server.listen(port, (err) => {
    if(err){
        return console.log("Cant Open Server!!")
    }
    console.log("Server Opened On Port " + port)
})

