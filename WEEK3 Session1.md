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
    
    
