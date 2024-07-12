# HTTP Server with Logging in Node.js

This project is a simple HTTP server implemented in Node.js using the built-in `http` and `fs` modules. The server listens for incoming requests, logs each request to a file, and responds with different messages based on the requested URL. The server handles three types of requests: the home page (`/`), the about page (`/about`), and any other URL (which returns a 404 Not Found message).

## Features

- Handles HTTP GET requests.
- Logs each request to a file named `log.txt` with a timestamp and requested URL.
- Responds with different messages for the home page, about page, and a 404 Not Found page.

## How to Run

1. Make sure you have Node.js installed on your machine.
2. Save the code in a file named `server.js`.
3. Open a terminal and navigate to the directory containing `server.js`.
4. Run the server using the command: `node server.js`.
5. The server will start listening on port 8000.

## Endpoints

- `/`: Responds with "You're in the home page".
- `/about`: Responds with "You're in the about page".
- Any other URL: Responds with "Not found: 404".

## Installing `url` npm package
- "npm i url"
- Its job is to parse the url in json form to leverage properties provided by the url 