const express =require('express');
const app =express();
const mysql=require('mysql');


app.get("/",(req,res)=>{
    res.send("api is running");
});

app.listen(3000);