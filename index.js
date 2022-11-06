
var http = require('http');
const express=require('express');
const app=express();

app.use('/assets',express.static('assets'))
const router=express.Router();

app.set('view engine','ejs');

app.get("/profile/:name",function(req,res){
    data={email:'swati@gmail.com',address:'pune',skills:['php','java','net']}
    console.warn(req.params.name)
    res.render('Profile',{name:req.params.name,data:data})
});

app.get('/login',function(req,res){
    console.log(req.query)
    res.render('Login')
})

app.get('/',function(req,res){
    res.render('Home')
})
app.listen(8080);