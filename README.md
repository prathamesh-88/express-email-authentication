# ExpressJS  Authentication System with Session Management using  Express-Session and Redis for storing session details.

### An ExpressJS API Gateway that takes care of the following:

- Accept User Information
- Check User Information
- Save user in the MongoDB database
- Login user by verifying credentials
- Manages sessions using Express Session and Server's local cache
- Return appropriate response

### Requirements
- NodeJS >= 16.13.x
- NPM >= 8.13.x
- MongoDB URI. [Click here](https://www.mongodb.com/docs/guides/atlas/connection-string/) for the instruction to setup a free online MongoDB Atlas account. You can use local MongoDB as well.
- Redis Server.

### Setup
1. Browse to the directory `express-session-with-redis` and open the `.env` file in any text editor. Make the following changes. Replace `<Paste your MongoDB URI>` with MongoDB URI 

> MONGODB_URI=\<Paste your MongoDB URI here> 

2. In the same `.env` file change the `SESSION_SECRET`. This key is used for sign your session cookies which enables it to check if the cookie has been altered. Set one similar to the sample already provided. 
3. Add `REDIS_HOST` to the `.env` file or set as environment variable if it is anything other than localhost.
4. Open command line (Cmd/Powershell/Terminal).
5. Navigate to your current workspace. i.e. express-session-with-redis folder.
6. Enter the following commands:
> npm install
> npm start
6. Now you have an ExpressJS application running at port 3000 by default unless you have specified any other port in the `.env` file.


### Endpoints

**Default BaseURL on localhost**:`http://localhost:3000`

1. **POST /signup**

    Input Fields:
    - fname : string,
    - lname : string,
    - email : string,
    - password: string
    
    Output format:
    {
        status: 'sucess'/'failed',
        _id/error: Return objectID of user if successful and error details if it fails
    }


2. **POST /login**
    
    Input Fields:
    - email : string,
    - password: string
    
    Output format:
    {
        status: 'sucess'/'failed',
        _id/error: Return objectID of user if successful and error details if it fails
    }

3. **POST /logout**
    - Terminates existing session.


### Middleware

Certain middleware functions are provided for managing sessions and routes better. Can be found in the `middleware/authentication.js` file.

#### Postman Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/11043007-85fcff50-ec5f-4ab0-8102-41e18ac2c3c0?action=collection%2Ffork&collection-url=entityId%3D11043007-85fcff50-ec5f-4ab0-8102-41e18ac2c3c0%26entityType%3Dcollection%26workspaceId%3D2d9beaf4-8093-416d-98fb-e5b8bffe85ce)

