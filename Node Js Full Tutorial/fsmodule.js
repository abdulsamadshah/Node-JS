//******************** Path File Read ******************* */
const fs=require('fs');

// fs.readFile('file.txt','utf8',(error,data)=>{
//     console.log(error,data);
// })
// console.log("Reading file finished");


//******************** Path File Write ************* */
fs.writeFile("file2.text","This is a data",()=>{
    console.log("written to the file")
})