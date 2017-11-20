const express=require("express");
const path=require('path')
const app=new express();
app.use(express.static(path.resolve(__dirname,'css')));
app.use(express.static(path.resolve(__dirname,'image')));

// app.use(express.static(path.resolve(__dirname,'font')));

app.use('/index',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','index.html'));
})
app.use('/interview',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','interview-page.html'));
})
app.use('/reactKownledge',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','reactKownledge-page.html'));
})
app.use('/copy',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','copy-page.html'));
})
app.use('/es6',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','es6-page.html'));
})
app.use('/performance',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','performance-page.html'));
})
app.use('/divide',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','divide-page.html'));
})
app.use('/cross',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','crossOrigin-page.html'));
})
app.use('/css3',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','css3-page.html'));
})
app.use('/h5',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','h5-page.html'));
})
app.use('/hi',function(req,res){
    res.sendFile(path.resolve(__dirname,'views','hi.html'));
})
app.listen('3000',function(){
    console.log(111111111111);
})