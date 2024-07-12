import fs from "fs"

//Explanations: 
// `fs.readFile`
// The `fs.readFile`` method is used to read the contents of a 
// file asynchronously.

//`fs.writeFile`
// The `fs.writeFile` method is used to write data to a file, 
// replacing the file if it already exists.


// `fs.appendFile`
// The `fs.appendFile` method is used to append data to a file. 
// If the file does not exist, it will be created.



// `fs.cp`
// The `fs.cp` method (available since Node.js v16.7.0) is used
// to copy files and directories.



// `fs.unlink`
// The `fs.unlink` method is used to delete a file.




//Sync...
//fs.writeFileSync("./text.txt", "hello from sync file")


//Async...
// fs.writeFile("./text.txt", "Hello from async file",(err) => {})


//Sync...
//const result = fs.readFileSync("./contacts.txt","utf-8")
//console.log(result)


//Async...
// fs.readFile("./contacts.txt", "utf-8", ( err, res) => {
//     res ? console.log(res) : console.log("Error: ",err)
// })


//Sync...
// fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString())

//Sync...
//fs.cpSync("./text.txt", "./copy.txt")


//Sync...
//fs.unlinkSync("./copy.txt")

