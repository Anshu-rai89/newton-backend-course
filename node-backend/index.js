

// How we can create a server in Nodejs 
// We are going to use a server framework that is present in nodejs 
// Express

const express = require('express');
const dotEnv = require('dotenv');
dotEnv.config();
const {
  getHello, 
  getName, 
  getPosts, 
  getNameFromPath, 
  registerUser,
  updateUser,
  patchUser,
  deleteUser,
  getUser
} = require('./controllers');
const app = express();
const port = process.env.PORT;
const USER_SECRET = process.env.USER_SECRET;

console.log("Port and User secret", port, USER_SECRET,process.env.NAME);

// H


// No APIs are defined yet
app.use(express.urlencoded())
// Get requests are used to get some data from server or backend
app.get('/api/v1/hello', getHello)
app.get('/api/v1/name', getName)
app.get('/api/v1/posts', getPosts)
app.get('/api/v1/user/:name/descritption', getNameFromPath)

// Http post request 
// Post request are made to send some data to the backend
app.post('/api/v1/user/register', registerUser)
app.put('/api/v1/user/update',  updateUser)
app.patch('/api/v1/user/update',  patchUser)
app.delete('/api/v1/user/delete', deleteUser)
app.get('/api/v1/user' , getUser);
// to start a server we have function listen 
app.listen(port, ()=> {
  console.log('Server is up and running on port',port );
});

