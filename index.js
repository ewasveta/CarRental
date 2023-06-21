// Step 1: npm init -y 
// Step 2: create script "start" with empty string in package.json.
// Step 3: npm install express 
// Step 4: add script for "dev" with empty string in package.json.
// Step 5: install nodemon in dev dependecies: npm i -D nodemon.
// Step 6: make start script "start" : "node index.js"
// Step 7: make dev script "dev" : "nodemon index.js"

// Server Side

const express = require('express')
const app = express()
const port = 3000 // nodejs port

let carsRouter = require('./api/cars')


// global middleware
app.use(express.static('client'))


app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// REST API 

app.use('/api',carsRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






// const path = require('path')

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,'client','index.html'))
// })


// app.get('/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname,'client','style.css'))
// })


// app.get('/script.js', (req, res) => {
//     res.sendFile(path.join(__dirname,'client','script.js'))
// })
