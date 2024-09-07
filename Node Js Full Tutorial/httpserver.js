const http=require('http');

const port =process.env.PORT || 3000;

const servere =http.createServer((req,res)=>{
    console.log(req.url)
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1> This is  a Samad </h1> <p> Hey this is the way to rock the work </p>');
})

//server listern

servere.listen(port,()=>{
console.log("server is listerning on port ${port}");
});
