// Import the http module to create an HTTP server
import http from "http"

// Import the fs (file system) module to interact with the file system
import fs from "fs"

//The `url` npm package is a useful tool for parsing, formatting, and resolving URLs in Node.js. By leveraging the functionality provided by this package, you can handle URL operations efficiently and adhere to web standards.
import url from "url"


// Create an HTTP server
const myServer = http.createServer((req, res) => {

    // Create a log entry with the current timestamp and requested URL
    const log = `${Date.now()}: -> ${req.method} -> ${req.url} -> New req received\n`
   
    //parsing the url 
    const myUrl = url.parse(req.url, true)
   // console.log(myUrl)


    // Append the log entry to the log.txt file
    fs.appendFile("log.txt", log, (err) => {
        // If there is an error during the file operation, throw an error
        if(err) throw new Error
    })

    // Check the requested URL and respond accordingly
    switch(myUrl.pathname){
        // Respond with a message for the home page
        case '/': 
           if(res.method === "GET") res.end("You're in the home page")
            break
        // Respond with a message for the about page
        case '/about': 
           const username = myUrl.query.myName
            res.end(`Hi, ${username}`)
            break
        //Respond with a message for the sign up form
        case '/signup':
            if(req.method === "GET") res.end("This is a sign up form")
            else if( req.method === "POST"){
               //DB query
               res.end("success")
            }

        // Respond with a 404 message for any other URL
        default: 
            res.end("Not found: 404")
    }  
})

// Start the server and listen on port 8000
myServer.listen(8000, () => console.log("server has started"))
