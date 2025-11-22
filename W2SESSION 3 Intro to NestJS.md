
### SESSION 3: Intro to NestJS and Its Fundamentals
✔ What is NestJS?
    - NestJS is a TypeScript-first backend framework for building scalable and maintainable server-side applications.
    - It is built on top of Express.js.
    - NestJS uses Express as its default HTTP platform — meaning Express is the engine that actually handles incoming HTTP requests behind the scenes.
    - Think of it like this:
            NestJS = Architecture + Structure
            Express = The request/response engine
    
    - NestJS uses express to handle things like:
        Creating the HTTP server
        Managing routes
        Handling middleware
        Handling responses

    - NestJS adds:
        Modules
        Controllers
        Services
        Dependency Injection
        Pipes
        Guards
        Filters
        Interceptors
        DTO validation

✔ NestJS Key Features
    TypeScript support
    Modular architecture
    Controllers & Services structure
    Built-in Dependency Injection (DI)
    Great for large enterprise applications
    Built-in tools: Pipes, Guards, Filters, Interceptors
    Works with REST, GraphQL, Microservices

====NestJS is like Express, but much more organized and powerful.
    
| Feature                | Express                  | NestJS                               |
| ---------------------- | ------------------------ | ------------------------------------ |
| **Structure**          | No structure             | Clear modules, controllers, services |
| **TypeScript Support** | Manual                   | Built-in                             |
| **Validation**         | Install + wire manually  | DTO + ValidationPipe built-in        |
| **DI**                 | No DI container          | Full DI system                       |
| **Error Handling**     | Manual                   | Exception filters                    |
| **Scalability**        | Difficult for large apps | Designed for large systems           |

    - Express = small, flexible.
    - NestJS = big, structured, enterprise-ready.
    
### Intro to TypeScript
- TypeScript (TS) is a programming language built on top of JavaScript.
- TypeScript = JavaScript + Types
- It adds types, better tools, and stronger structure to JavaScript.

✔ Why was TypeScript created?
    JavaScript is powerful but has weaknesses:
        No type checking  e.g.  let age = "hello"; 
        Errors appear only at runtime
        Hard to scale large projects
        Difficult collaboration in big teams

    TypeScript solves these problems by catching bugs before you run your code.

✔ Key Features of TypeScript
    - Types are checked during development, not just when the code runs.
      e.g. let age: number = "hello"; // ERROR 
    - TypeScript compiles into normal JavaScript.
    - TypeScript makes code: Easier to understand, Easier to maintain, Easier to scale, Less error

✔ How TypeScript Works
    1. You write .ts code
        const add = (a: number, b: number): number => {
          return a + b;
        }

    2. TypeScript compiler checks for errors
    3. Compiler converts TS → JS
        const add = (a, b) => {
          return a + b;
        };

    add("hello", 10); // "hello10" (bug!) -in JS
    add("hello", 10); // error    - in TS


### NestJS Project Structure and Concepts
✔ Modules
    Group features in your application
    Every resource (users, transactions, tasks) should be a module

✔ Controllers
    Receive requests (GET, POST, etc.)
    Return responses
    Should NOT contain business logic

✔ Services
    Handle logic (database, calculations)
    Injected into controllers using DI
    
✔ Dependency Injection (DI)
    DI is a design pattern where classes ask for their required dependencies instead of creating them.
    It is all about providing needed files for the current file - instead of recreating.
    
✔ DTO – Data Transfer Object
    Defines the shape of data coming from the client.
    
✔ Pipes
    Pipes transform or validate incoming data before it reaches the controller.

✔ Validation
    Defines validation rules.

✔ Guards
    Used for authentication & authorization

✔ Interceptors
    Modify request/response
    (e.g., response formatting)

✔ Middleware
    Works similarly to Express middleware
    
### INITIALIZING NestJS Project and understanding how it works
1. This is the flow when NestJS server is up:
main.ts  
   ↓
NestFactory.create(AppModule)
   ↓
app.module.ts (root module)
   ↓
Load controllers
   ↓
Load services/providers
   ↓
Run HTTP server (Express)
   
  
2. (Runtime Flow) - actual request response flow

      Request
         ↓
[ Middleware ]
         ↓
[   Guards   ]
         ↓
[ Interceptors (Pre) ]
         ↓
[     Pipes    ]
         ↓
[   Controller ]
         ↓
[    Service   ]  →  Gets Data
         ↓
-------------------------------------------
    TURNING POINT (Response Logic)  - here we have ready response
-------------------------------------------
         ↓
[   Controller ]  →  Returns Data
         ↓
[ Interceptors (Post) ] →  modifies response - if implemented
         ↓
[ Exception Filters ] →  (Only if something wrong/crashed)
         ↓
[ HTTP Server ]  →  res.json(...)
         ↓
      Client

