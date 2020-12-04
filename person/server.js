const express = require('express')
const mongoose = require('mongoose')
const mongoUrl = "mongodb+srv://wissal123:wissal123@contactlist.wxtjs.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true  }, (err) =>{
    if(err){
        throw err
    }
    console.log('Database is connecting...')
})
const app = express()
//init middleware to parse the body
app.use(express.json())
//defies routes
app.use('/api',require('./routes/person'))


app.listen(5000 , (err)=>{
    if (err){
        throw err
    }
    console.log('server is running on port 5000 ...')
})