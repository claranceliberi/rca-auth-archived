# rca-auth project 
 This is a project that helps Rwanda Coding Academy (RCA) related app's users to login with just only rca accounts just simple someone can relate this to google sign in auth where user with email can't have multiple accounts with its products.
 
 Just with only one account you can log everywhere in rca related products
 
 #### Technologies used
   - [Node js](https://nodejs.org/en/) as core language technology
   - [Mongo DB](https://www.mongodb.com/) as users credentials storage
   - [PostgresSql](https://www.postgresql.org/) as clients and app storage
   - [Docker](https://www.docker.com/) as app manager and package management 
   
 #### Frameworks
   - [Express ( in Typescript)](https://www.express.com/) as node framework
    
#### Useful libraries
   - [Mongoose](https://mongoosejs.com/) for simply working with mongodb
   - [Prisma](https://www.prisma.io/) for simple working with postgres


## Initiating Project

   Just before initiating project make sure you meet these requirements 
   - `node ^12.20.0` installed
   - `yarn` or `npm` package manager installed but i prefer `yarn`
   - `docker ` installed on your desktop or server
   
   Then go and run in terminal
   1. `docker-compose build` to build up all images and attache them to containers
   2. `docker-compose up` to run all 4 containers (`node app`, `mongo`, `postgress` and `postgress admin`) 
   
   just those command will make app stand but there are also other usefull commands
   
   - `yarn build` to build app from typescript to js app
   - `yarn debug` to run app in debug mode
   - `yarn dev` to start app in development mode
   - `yarn start` to start app in production mode
   
   Something which may be missing up there is initiating database and tables based on [prisma models](./src/prisma/schema.prisma)
   then run 
   `npx prisma migrate dev --name "init" --preview-feature` to create database models and create tables 
   