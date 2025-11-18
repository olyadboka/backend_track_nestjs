
#1. HTTP STATUS CODES
- HTTP status codes are 3-digit numbers sent by the server to indicate the result of a request.
| Category | Range   | Meaning                             |
| -------- | ------- | ----------------------------------- |
| **1xx**  | 100–199 | Informational (rarely used in APIs) |
| **2xx**  | 200–299 | Success responses                   |
| **3xx**  | 300–399 | Redirection responses (rarely used)               |
| **4xx**  | 400–499 | Client-side errors                  |
| **5xx**  | 500–599 | Server-side errors                  |

## 2xx - Success codes
- 200  - OK - Standard success response
- 201  - CREATED - Used when creating a new resource.
- 202  - ACCEPTED - Request received but not fully processed (often for background jobs)
- 204  - No Content - Operation succeeded, but no content to return. - DELETE

## 4xx - Client Error Codes
- 400 - BAD REQUEST - The request has invalid data.
- 401 - UNAUTHORIZED - Client is not authenticated.
- 403 - FORBIDDEN - Client is authenticated but not allowed to access the resource.
- 404 - NOT FOUND - The requested resource doesn't exist.

## 5xx - Server Error Codes
- 500 - INTERNAL SERVER ERROR - The server crashed or an unexpected error happened.
- 502 - BAD GATEWAY - The server received an invalid response from another server (service-to-service issue).
- 503 - SERVICE UNAVAILABLE - Server is down, overloaded, or under maintenance.
- 504 - GATEWAY TIMEOUT - One service waited too long for another service to respond.


Concepts:
What is ExpressJS:
    - A minimal and flexible Node.js framework for building web servers and APIs.
    - It simplifies handling routes, requests, responses and middleware. 
    
Why we use express.js:
    - Easier routing (app.get(), app.post())
    - Cleaner code and middleware support
    - Easier to scale and organize
    
Installing Express:
    npm init -y  - It initializes a new Node.js project — meaning it creates a package.json file in your project folder
    npm install express
    
    package.json: contains important info about your project (name, scripts, dependencies...)
    
    package-lock.json:  When you install packages using npm (like npm install express), Node automatically creates or updates a file called package-lock.json. This file locks the exact versions of all installed packages — including their sub-dependencies — to make sure your project behaves exactly the same on every computer.
    

Setting up basic server:
    const express = require('express');
    const app = express();
    const PORT = 3000;

    app.get('/', (req, res) => {
        res.json({ message: "Welcome to Express.js!" });
    });

    app.listen(PORT, () => {
        console.log(` Server running at http://localhost:${PORT}`);
    });
    
Practical test: 
    - / → returns a welcome message
    - /user → returns a user info
    
    
### Controllers and CRUD API with dummy data
- routes
    - defines endpoints
    - manages http requests coming
    - syntax:  app.METHOD(PATH, HANDLER)
    - 
- Controllers
    - Functions that handle logic for each route
    
- Req and Resp
    - req: Request object (data from client)
    - res: Response object (data sent back)
    
    
