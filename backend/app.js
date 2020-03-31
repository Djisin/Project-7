const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')

//const connection = require('./connection');

const commentRoutes = require('./routes/comment')
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images',express.static(path.join(__dirname, 'images'))); 

app.use(cors({
    origin:'http://127.0.0.1:5500',
    //credentials:true
}))
app.use(session({
    path:'/',
    name: 'Groupomania',
    resave: false,
    saveUninitialized: false,
    secret: 'some_session_secret',
    unset:'destroy',
    cookie: {
        maxAge: 3.6e+6,//1h
        sameSite: true,
        secure: false //kad se zavrsi aplikacija treba da sa promeni u true
    }
}))

app.use('/', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/posts', commentRoutes)

module.exports = app;