const http=require('http');
//read file
const fs=require('fs');

const port =process.env.PORT || 3000;



const servere =http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html')
    console.log(req.url)
//http://localhost:3000/about this type url will be hit

    if(req.url=="/"){
        res.statusCode=200;
        res.end('<h1> This is  a Samad </h1> <p> Hey this is the way to rock the work </p>');
    }else if(req.url=="/about"){
        res.statusCode=200;
        res.end('<h1> This is my about page </h1> <p> Hey this is the way to rock the work </p>');
    }else if(req.url=="/home"){
        res.statusCode=200;
        const data=fs.readFileSync('index.html');
        res.end(data.toString());

       
        // res.end('<h1> No page Found </h1> <p> there are no page here </p>');

    }else{
        res.statusCode==404;
        res.end('<h1> No page Found </h1> <p> there are no page here </p>');
    }
   
})

//server listern

servere.listen(port,()=>{
console.log("server is listerning on port ${port}");
});