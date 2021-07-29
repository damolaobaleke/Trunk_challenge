require('dotenv')
const express = require('express');
const app =  express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ENDPOINTS
let getPostsRoute = require('./routes/getPosts/getPosts');


app.use(getPostsRoute);

app.use(function(req,res){
    res.status(404).send({error:'error 404'})
})

app.listen(3002, ()=>{
    console.log("challenge listening on port 3002")
})

//for testing 
module.exports = app;