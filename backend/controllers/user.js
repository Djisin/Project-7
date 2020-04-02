const connection = require('../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.index = (req, res, next) => {
    if (!req.session.userId && !req.session.token) {
        res.status(404).json({
            loggedIn: false
        });
    }
    else {
        res.status(200).json({
            loggedIn: true
        })
    }
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            let today = new Date();
            let users = {
                'email': req.body.email,
                'username': req.body.username,
                'password': hash,
                'firstName': req.body.firstName,
                'lastName': req.body.lastName,
                'timeCreated': today,
                'postsSeen': '{"seen":[]}'
            };
            connection.query('INSERT INTO user SET ?', users, (error, result) => {
                if (!error) {
                    connection.query('INSERT INTO moreuserinfo SET userId = ?', result.insertId, (error) => {
                        if (!error) {
                            connection.query('INSERT INTO usersocnetws SET userId = ?', result.insertId, (error) => {
                                if (!error) {
                                    console.log("Added to the db")
                                    res.clearCookie('Groupomania')
                                    res.status(200).json({ message: 'User created!' })
                                } else if (error) {
                                    if (error.code === "ER_DUP_ENTRY") {
                                        res.status(401).json({ message: 'User already exists' })
                                    } else {
                                        res.status(400).json({
                                            error: error
                                        })
                                    }
                                }
                            });
                        } else {
                            res.status(400).json({
                                error: error
                            })
                        }
                    });
                } else {
                    res.status(400).json({
                        error: error
                    });
                }
            });
        }
    )
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    //req.headers.authorization = true;
    connection.query('SELECT * FROM user WHERE ?', { email },
        (error, result, fields) => {
            if (result.length === 0) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }
            bcrypt.compare(req.body.password, result[0].password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            message: 'Incorrect password!'
                        });
                    }
                    const token = jwt.sign(
                        { userId: result[0].userId },
                        'I23QLDc9mUczzZSxCYndC6SGrSPeX543lHjaAsWNrvgCBaXaVB80JYdKyP36',
                        { expiresIn: '24h' });
                    req.session.userId = result[0].userId
                    req.session.token = token
                    //console.log(req)
                    //req.session.save()
                    //res.redirect('http://127.0.0.1:5500/frontend/home.html')
                    res.status(200).json({
                        userId: result[0].userId,
                        token: token,
                        loggedIn: true
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};

exports.logout = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).json({ message: 'problem kod logout' })
            console.log('error na log out:' + error
            )
        } else {
            res.clearCookie('Groupomania')
            return res.status(200).json({
                loggedOut: true
            })
        }
    })
}

exports.profile = (req, res, next) => {
    userId = req.session.userId;
    connection.query('SELECT firstName, lastName, userId FROM user WHERE userId = ?', userId, (error, userInfo) => {
        if (!error) {
            connection.query(`
                SELECT user.userId, user.firstName, user.lastName, user.username, user.userPicture, user.timeCreated, moreuserinfo.personalLine, usersocnetws.userWebSite, usersocnetws.facebook, usersocnetws.linkendIn, usersocnetws.twitter
                FROM user
                INNER JOIN moreuserinfo
                ON user.userId = moreuserinfo.userId
                INNER JOIN usersocnetws
                ON user.userId = usersocnetws.userId
                WHERE user.userId = ?`, userId,
                (error, userData) => {
                    if (!error) {
                        connection.query(`SELECT COUNT(postId) AS number FROM post WHERE userId = ?`, userData[0].userId, (error, numberOfPosts) => {
                            if (!error) {
                                connection.query(`SELECT post.postTitle, post.postId, user.username FROM post INNER JOIN user ON user.userId = post.userId ORDER BY postTimeCreated DESC LIMIT 3`, (error, recentPosts) => {
                                    if (!error) {
                                        userData[0]['numberOfPosts'] = numberOfPosts[0].number;
                                        res.status(200).json({
                                            userInfo: userInfo,
                                            userData: userData,
                                            recentPosts: recentPosts
                                        });
                                    } else {
                                        res.status(404).json({
                                            message: "Can't get last 3 posts",
                                            message: error
                                        });
                                    }
                                });
                            } else {
                                res.status(404).json({
                                    message: 'Counting posts problem',
                                    message: error
                                });
                            }
                        });
                    } else {
                        res.status(404).json({
                            message: 'User not found'
                        });
                    }
                });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    });
}

exports.editProfile = (req, res, next) => {
    //console.log(req)
}