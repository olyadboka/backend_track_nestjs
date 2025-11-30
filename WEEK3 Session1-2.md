### WEEK3
### Session1
1. Project creation (new project)
    - Installing nestjs cli
        npm i -g @nestjs/cli
        The Nest CLI is a command-line interface tool that helps you to initialize, develop, and maintain your Nest applications.
    - creating a new project
        nest new project-name
        
2. File explanations
   ### the src folder
    - main.ts (the entry)
      the file that starts everything
      It contains the bootstrap() function which uses NestFactory.create(AppModule)
      
    - app.module.ts (The root module)
      It registers the controllers and services/providers so Nest knows they exist
      
    - app.controller.ts (The receiver)
      Handles incoming HTTP requests
      Doesn't do logic
      
    - app.service.ts (The logic)
      Contains actual business logics
      
    - app.controller.spec.ts (The test file)
      The unit test for the controller
      The extension .spec.ts is a convention for test files in the JavaScript/TypeScript world.
      
    ### The root configs (Infrastructure)
    - nest-cli.json
      Specific to NestJS. It tells the Nest CLI how to build your project (e.g., where the source files are, which directory to output to).
      
    - package.json 
      The standard Node.js file. It lists your dependencies and scripts (like npm run start:dev).
      
    - tsconfig.json & tsconfig.build.json 
       Since NestJS uses TS, these files tell the computer how to convert your TS code into JS so Node.js can run it.
       
    - .eslintrc.js (or eslint.config.mjs) & .prettierrc
      These are for code quality and formatting. They ensure your code looks clean and follows rules (like "don't leave unused variables").
      
  ### Generated Folders
    - dist 
      When you run the app, TypeScript is compiled into JavaScript. The result goes here.
      Never edit files in here. They are overwritten every time you save.
      Node.js actually runs the code inside this folder, not your src folder.
      
    - node_modules 
      Contains all the library code downloaded from the internet.
      
      
  ### API Documentation 
    - swagger 
    
### Understanding project and defining modules
- Concepts for defining modules 
    1. Domain Driver Design (DDD)
        - group by domain
        - A module should be based on features
        - each module - 1 business logic
        
    2. Single responsibility principle 
        - Handle one business responsibility 
        - contain everything related to that feature (Controller, service, dto, schema, ..)
        
    3. Encapsulation 
        - each module is isolated 
        - Unless you export sth, other modules cannot use it (this prevents tight coupling) 
        - prevents like: E.g.Tasks module directly using UserService without permission → messy dependencies.
        
    4. Use Naming That Reflects Business Logic

- checklist when defining modules
    - What single business capability does this module own?
    - Does it have everything to perform that capability?
    - Would this module still work if extracted as a microservice (as a single mini project)?
    - Does this module leak internal logic? (encapsulation)
    - Does it depend too much on another module? (tight coupling)
    - Is the module name business-meaningful?
    - Are imports/exports properly managed?
    
    
1. users module
    - handles signup and login
    - handles user profile and data
    
2. referrals module
    - manage referrals here
    - list referred users
    
3. tasks module
    - create tasks daily
    - make sure expired tasks are not appear again
    - handle task completion
    
4. transactions module
    - handles transfers and transactions history

5. exchange-rates module
    - handles currency fetch
    - handles currency exchange
    
    

### Creating modules and start working on them
1. create all modules
    - nest generate module module_name
    - create all folders (controllers, services, dtos, responses, schemas)
    - controllers:  where we put all of our controllers

### 0. list endpoints we are going to have
users
    POST /users/register  
    POST /users/login
    PATCH /users/update-profile
    GET /users/myreferral
    GET /users/myprofile
    
referrals 
    GET /referrals/my-referrals
    GET /referrals/my-referrer 
    
tasks
    POST /tasks/create
    PATCH /tasks/complete
    GET /tasks/daily-tasks
    
transactions
    POST /transactions/transfer
    GET /transactions/my-transactions
    
exchange-rates
    GET /rates/daily-rate
    POST /rates/convertion
    
  
### 1. Writing dtos
    - Where we define our validations
    - Where we set a rule for requests coming
    - to get full power of NestJS validation we need to install class-validator and class transformer
        npm install class-validator
        npm install class-transformer
    
###Decorator    
- A NestJS decorator is a special function that you place above a class, method, property, or parameter to attach metadata or change how NestJS treats that piece of code.
- It tells NestJS what this class or method is supposed to do. E.g: built in decorators
    @Controller() → “This class handles HTTP routes.”
    @Get() → “This method responds to GET requests.”
    @Injectable() → “This class can be injected as a dependency.”
    @Body() → “Take the request’s body and give it to this parameter.”
    

### 2. writing services
* What does async methods (services) do: e.g. async registerUser()
    The method automatically returns a Promise
    You can use await inside it
    The caller must handle it as an asynchronous operation

    When you should use async:
        DB operations
        External API calls
        Anything using await

* What does normal methods (services) do: e.g. registerUser()
    The method is synchronous (blocking)
    It returns a normal value (not a Promise)
    You cannot use await inside
    If you return something, it's immediately returned

    When you should use:
        Pure calculations
        No DB calls, no await, no async operations

* Normal response (synchronous):  A normal response means the function returns a value immediately, without waiting for anything.
* Promise response (asynchronous): 
    - A Promise represents a value that will be available later, not immediately.
    - It's just a current status of async job
        Promise { <pending> }    //pending
        Promise { "data" }       // fulfilled
        Promise { <rejected> }   // rejected

* Why Does This Matter in NestJS?
    Because most backend operations are asynchronous:
        DB queries
        HTTP requests
        Writing files
        Reading files


### 3. writing controllers
1. The constructor(...) runs when NestJS creates an instance of this controller.
    - It is saying like: “When UsersController is created, give it whatever services it needs.”
    - The constructor parameters are what NestJS uses to figure out what dependencies to inject.
    
2. The DI
    private readonly usersService: UsersService
    Declares a class property called usersService.
    Marks it read-only. means the value cannot be changed after constructor sets it once.
    NestJS automatically injects an instance of UsersService here using dependency injection.
    Why? So the controller can call methods in UsersService without creating a new instance manually.

       E.g. Think of usersService as a “helper” that contains what users service do. You don’t have to build it yourself — NestJS gives you one automatically.

3.  @Post('register') 
    - Route handler
    - Handles HTTP POST requests to this endpoint.
    
4. Parameter @Body()
    Extracts the request body from incoming HTTP request.
    createUserDto will contain the JSON data sent by the client.
    
