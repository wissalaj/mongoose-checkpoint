const express = require('express')
const router = express.Router()
const Person = require('../models/Person')


//create new person Wissal
router.post('/newperson',(req,res) =>{
    const{ name, age, favoriteFoods} = req.body
    let newPerson = new Person({name, age, favoriteFoods}) 
    //console.log(newPerson)
})
//create manyPerson  use  arrayOfPeople
const arrayOfPeople = [
    {
        name: "dhouha",
        age: 26,
        favoriteFoods: ["sandwich","spaguetti"]
    },
    {
        name: "Ines",
        age: 26 ,
        favoriteFoods: ["Panini","crepe"]
    },
    {
        name: "Nawres",
        age: 24 ,
        favoriteFoods: ["humburger","lasagne"]
    },
    {
        name: "Jihen",
        age: 31 ,
        favoriteFoods: ["gauffre","salade"]
    },
    {
        name: "Sonia",
        age: 25 ,
        favoriteFoods: ["crepe","pasta"]
    },
]
router.post('/newperson',(req,res) =>{
Person.insertMany(arrayOfPeople)
.then(() => res.json({msg:'Person Created'}))
.catch(err => console.log(err.message))
newPerson.save()
.then(() => res.json({msg:'Person Created'}))
.catch(err => console.log(err.message))
})
// get all person 
router.get('/allPerson', (req, res) => {
    Person.find()
    .then (person => res.json(person))
    .catch(err => console.error(err.message))
}) 
//find person with given name
router.get('/person/:name',(req,res) =>{
   Person.find({name : req.params.name})
    .then (person => res.json(person))
    .catch(err => console.error(err.message))
})

//model.findOne() with given food
router.get('/person/:favoriteFoods',(req,res) =>{
    Person.find({favoriteFoods : req.params.favoriteFoods})
    .then (person => res.json(person))
    .catch(err => console.error(err.message))
})
//model.findById()
router.get('/person/:id',(req,res) =>{
    Person.findById(req.params.id)
    .then (person => res.json(person))
    .catch(err => console.error(err.message))
})
//update by running Find,Edit then Save findById    Add"hamburger" use Array.push
router.put('/editPerson/:id',(req,res) =>{
   Person.findById(req.params.id,(err,data)=>{
       if(err){console.log(err)}
        else {data.favoriteFoods.push("hamburger")};
        data.save((err,data)=>{
            if(err){console.log(err)}
    
           else {console.log(data),res.send(data)}
     })   
   })
})
// New Updates on a Document Using model.findOneAndUpdate() -->To do that you need to pass the options document { new: true } 

router.put("/editOnePerson/:name",(req,res)=>{
        Person.findOneAndUpdate({name:req.params.name},{age:24},{new:true},(err,doc)=>{
            if (err) console.log(err)
            console.log(doc); })
        })


//Delete One Document Using model.findByIdAndRemove
router.delete("/deleteperson/:id" , (req ,res) => {
    Person.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg : 'Person deleted'}))
    .catch(err => console.error(err.message))
})
// MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/removeperson" , (req ,res) => {
    Person.remove({name:"sonia"})
    .then(() => res.json({ msg : 'Person deleted'}))
    .catch(err => console.error(err.message))
})
//Chain Search Query Helpers to Narrow Search Results -->Chain .find(), .sort(), .limit(), .select(), and then .exec()
router.get('/searchperson', (req, res) => {
    Person.find({favoriteFoods:"Pasta"})
           .sort({name:1})
           .limit(2)
           .select({name:true})
           .exec() 
           .then(docs => {
            res.send(docs)
          })
           .catch(err => {
            console.error(err)
    })
    })
module.exports = router
