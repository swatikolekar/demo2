const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

mongoose.connect('mongodb+srv://swati:1mfFJKnAQB6LB8OJ@cluster0.pvnnjsi.mongodb.net/test123?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//list data
app.get('/users', function (req, res) {
    User.find().then((data) => {
        res.json(data);
    })
})

//Insert data
app.post('/user', jsonParser, function (req, res) {
    //User.find().select('email')
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    })
    data.save().then((result) => {
        res.status(201).json(result)
    })
        .catch((error) => {
            console.warn(error)
        });

})

//deleteAPI
app.delete('/user/:id', function (req, res) {
    User.deleteOne({
        _id: req.params.id
    }).then((result) => {
        res.status(200).json(result)

    }).catch((error) => {
        console.warn(error)
    });

})


///Update data

app.put('/user/:id', jsonParser, function (req, res) {
    User.updateOne(
        { _id: req.params.id },
        {
            $set:
            {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address

            }
        }
    ).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        console.warn(error)
    });
})


app.get('/search/:name', function (req, res) {
    var regex = new RegExp(req.params.name, 'i');
    User.find({
        name: regex
    }).then((result)=>{
        res.status(200).json(result);
    }).catch((error) => {
        console.warn(error)
    });
})
app.listen(4000);

// const data =new User({
//     _id:new mongoose.Types.ObjectId(),
//     name:"swati",
//     email:'swati@gmail.com',
//     address:'pune'
// });
// data.save().then((result)=>{
//     console.warn(result)
// }).catch(err=>console.warn(err))



