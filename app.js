const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const crypto = require('crypto');

const password = 'password';
const key = crypto.scryptSync(password, 'salt', 32);

const iv = crypto.randomBytes(16);


const jwt = require('jsonwebtoken')
jwtkey = "jwt";

mongoose.connect('mongodb+srv://swati:1mfFJKnAQB6LB8OJ@cluster0.pvnnjsi.mongodb.net/jwt?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })



app.post('/register', jsonParser, function (req, res) {
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    var encrypted = cipher.update("Hello", 'utf8', 'hex') + cipher.final('hex');

    console.warn(encrypted)

    const data = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: encrypted,
    })
    data.save().then((result) => {
        jwt.sign({ result }, jwtkey, { expiresIn: '300s' }, (err, token) => {
            res.status(201).json({ token })
        })
    })
})


const keys = crypto.scryptSync(password, 'salt', 24);
// The IV is usually passed along with the ciphertext.
const ivv = Buffer.alloc(16, 0); // Initialization vector.{}


app.get('/users', verifyToken, function (req, res) {
    User.find().then((result) => {
        res.status(200).json(result);
    })
})
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];

        jwt.verify(req.token, jwtkey, (err, authData) => {
            if (err) {
                res.json({ result: err })
            } else {
                next();
            }
        })
    } else {
        res.send("not found");
    }

}
app.listen(2000);
