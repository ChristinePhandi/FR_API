//import from package.json
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//import from controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//connect to the database setup
const postgresDB = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234ab',
    database : 'smart-brain'
  }
});

// declare the app using express and add some function using #bodyParser(to read JSON from the request) & CORS
const app = express();
app.use(bodyParser.json());
app.use(cors());

//the route of the app
app.get('/', (req,res) => { res.send('it working !'))

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, postgresDB)})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, postgresDB, bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req, res, postgresDB, bcrypt)})

app.put('/image', (req,res) => {image.handleImage(req, res, postgresDB)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})

//app wait for a request from port 3000
app.listen(process.env.PORT || 3000, () => {
	console.log('app is running in port ${process.env.PORT}');
})