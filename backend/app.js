const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comment');
const comment2ndRoutes = require('./routes/comment2nd');
const reportRoutes = require('./routes/report');

const searchRoute =require('./routes/search');

const mmPostsRoutes = require('./routes/mmPosts');
const mmCommentRoutes = require('./routes/mmComment');
const mmComment2ndRoutes = require('./routes/mmComment2nd');
const mmReportRoutes = require('./routes/mmReport');

const app = express();

app.use(
    bodyParser.json()
);

app.use(
    bodyParser.urlencoded({ extended: true })
);

app.use(
    express.json()
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(
    '/images',
    express.static(path.join(__dirname, 'images'))
);

app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        /*credentials:true*/
    })
); 

app.use(
    session({
        path: '/',
        name: 'Groupomania',
        resave: false,
        saveUninitialized: false,
        secret: 'some_session_secret',
        unset: 'destroy',
        cookie: {
            maxAge: 3.6e+6,//1h
            sameSite: true,
            secure: false //kad se zavrsi aplikacija treba da sa promeni u true
        }
    })
);

app.use('/', userRoutes);

app.use('/api/posts', postsRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/posts', comment2ndRoutes);
app.use('/api/posts', reportRoutes);

app.use('/api/posts', searchRoute);

app.use('/api/mmposts', mmPostsRoutes);
app.use('/api/mmposts', mmCommentRoutes);
app.use('/api/mmposts', mmComment2ndRoutes);
app.use('/api/mmposts', mmReportRoutes);

app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

module.exports = app;