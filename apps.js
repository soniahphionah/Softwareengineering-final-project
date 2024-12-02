const express = reqire('express');
const session = require('express-session');
const MYSQLStore = require('connect-mysql2')(session);
const bcrypt = require('bcrypt.js');
require('dotenv').config();

const app = express();
const PORT =8080;

//MySQL Session Store Configuration
const sessionStore = new MYSQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

//Example: Password Hashing and Comparison
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        //save 'username' and 'hashedPassword' to your database
        res.send('User registered successfully!');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        //Retrieve 'hashedPassword' from your database based on 'username'
        const hashedPassword = 'retrieved_from_db';

        const isMarch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            req.session.user = username; //save user is the session
            res.send('Login successful!');
        } else {
            res.status(401).send('invalid credentials');
        }
    }catch (err) {
        res.status(500).send('error logging in');
    }
});

//start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});