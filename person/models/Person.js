const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    favoriteFoods:{
        type:[String],
        required:true
    }
})

const Person = mongoose.model('person',PersonSchema)
module.exports = Person