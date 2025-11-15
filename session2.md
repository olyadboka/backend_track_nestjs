### Backend Fundamentals & First API

1. FUndamentals
   client, server, db, request, response, api
   Concept - Every system has two main sides: - Client: The app or browser that requests something (e.g., Chrome, a mobile app, or Postman). - Server: The backend that processes the request, accesses databases, and sends back results.
   Api Definition: - API stands for Application Programming Interface. (software program interactions) - It’s a bridge that allows two different software systems to communicate with each other. - You can think of it as a messenger — it takes a request from one system, tells another system what to do, and brings the response back. - Technical def: An API is a set of rules and endpoints that define how software components talk to each other —
   what requests are allowed, what data format to use, and what responses to expect. - Used by frontend, mobile, or other servers to interact with your backend. - Most modern APIs use HTTP + JSON → called REST APIs.
2. Request & Response Flow

When the client interacts with the server, this happens behind the scenes:

- Request Structure

  - Method (GET, POST, etc.)
  - URL (what resource to access) we can call this as a API
  - Headers (metadata like content type or authorization)
  - Body (data sent, mostly in JSON for APIs)
  - Example (request from client):
    POST /api/users
    Content-Type: application/json

    {
    "name": "Olyad",
    "email": "olyadboka@gmail.com"
    }

- Response Structure

* Status Code (shows result)
* Headers
* Body (returned data)

  Example (response from server):

  Status: 201 Created
  Content-Type: application/json
  {
  "id": 1,
  "name": "Olyad",
  "email": "olyadboka@gmail.com"
  }

3. HTTP DEFINITIONS

- HTTP stands for HyperText Transfer Protocol.
- It is the communication system that defines how data is sent and received between a client (browser/app) and a server (backend) over the internet.
- HTTP is the language your browser and server use to talk to each other.

| Method     | Description                    | Example                                   |
| ---------- | ------------------------------ | ----------------------------------------- |
| **GET**    | Fetch data                     | `/api/users` – get all users              |
| **POST**   | Create new data                | `/api/users` – add a user                 |
| **PUT**    | Update existing data (replace) | `/api/users/1` – update user 1            |
| **PATCH**  | Partially update data          | `/api/users/1` – update user’s email only |
| **DELETE** | Remove data                    | `/api/users/1` – delete user 1            |

4. JSON Basics (JavaScript Object Notation)

- A lightweight data format used for communication between client and server.
- Easy to read by humans and machines.
- Follows simple key–value pairs.

Example
{
"id": 1,
"name": "olyad",
"email": "olyadboka@gmail.com",
"skills": ["Golang". "Node.js", "NestJS"]
}

✅ Rules:

- Keys must be in double quotes " "
- Strings must be in quotes
- Arrays are enclosed in [ ]
- Objects are enclosed in { }

5.  How All These Fit Together

When you test an API in Postman:

- You send a request →
  Method: POST
  URL: http://localhost:3000/api/users
  Body (JSON):

{ "name": "Olyad" }

- The server receives the request and processes it.
- The server responds with JSON data, e.g.
  { "id": 1, "name": "Olyad" }
- That is the full backend flow.

### Relationship Between JavaScript, Node.js, Express, and NestJS

1. JavaScript
   A programming language.
   Runs originally in the browser.
   Not a server technology by itself.

2. Node.js
   A runtime environment that allows JavaScript to run outside the browser (on the server).
   Enables server-side code.

3. Express
   A web framework built on top of Node.js.
   Helps build APIs easily.
   Minimalistic, lightweight.

4. NestJS
   A higher-level framework built on top of Node.js (and uses Express by default).
   Structured, modular, and uses decorators.
   Enterprise-grade framework for scalable apps.
   Can also use Fastify instead of Express.

GENERALLY
JavaScript is the language.
Node.js lets JavaScript run on the server.
Express is a tool built on Node to build APIs easily.
NestJS is a more advanced framework built on top of Express to create large, structured applications.

### Building a simple API (server)

- create server.js
  ...
- run server: node server.js
- GET http://localhost:3000 - test
