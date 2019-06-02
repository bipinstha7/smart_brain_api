const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// TODO: get host, user, password and database from config file
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'smart_brain_adv' 
  }
});


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.json(database.users));

/* TODO: make separate module for routers */
app.post("/signin", (req, res) => {signin.handleSignin(req, res,db,bcrypt)});

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get("/profile/:id", (req, res) => {profile.handleProfile(req, res , db)});

app.post("/profile/:id", (req, res) => {profile.handleProfileUpdate(req,res,db)});

app.put("/image", (req, res) => {image.handleImage(req, res, db)});
app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}...`);
});