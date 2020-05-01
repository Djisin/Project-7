const connection = require('../connection');
const fs = require('fs')

exports.createPost = (req, res, next) => {
    let today = new Date();
    req.body.post = JSON.parse(req.body.post)
    const url = req.protocol + '://' + req.get('host');
    let post;
    if (req.file) {
        post = {
            'userId': req.session.userId,
            'postTitle': req.body.post.postTitle,
            'postText': req.body.post.postText,
            'postPicture': url + '/images/' + req.file.filename,
            'postLikes': '0',
            'postDislikes': '0',
            'postTimeCreated': today,
            'edited': false,
            'timeEdited': null,
        };
    } else {
        post = {
            'userId': req.session.userId,
            'postTitle': req.body.post.postTitle,
            'postText': req.body.post.postText,
            'postPicture': '',
            'postLikes': '0',
            'postDislikes': '0',
            'postTimeCreated': today,
            'edited': false,
            'timeEdited': null,
        };
    }
    connection.query('INSERT INTO post SET ?', post, (error, result) => {
        if (!error) {
            res.status(201).json({ message: 'Post created!' })
        } else {
            res.status(401).json({ message: error })
        }
    });
}

exports.getOnePost = (req, res, next) => {
    let userId = req.session.userId;
    connection.query(`SELECT postId FROM post WHERE postId = ?`, req.params.id, (error, dbresp) => {
        if (!error) {
            if (dbresp.length !== 0) {
                connection.query('SELECT firstName, lastName, userId FROM user WHERE userId = ?', userId, (error, userInfo) => {
                    if (!error) {
                        let postId = { postId: req.params.id }
                        connection.query(`
                        SELECT post.*, user.username, user.userId, COUNT(comment.commentId) as numberOfComments
                        FROM post 
                        INNER JOIN user 
                        ON post.userId = user.userId
                        LEFT JOIN comment
                        ON post.postId = comment.postId
                        WHERE post. ?
                        GROUP BY postId
                        ORDER BY comTimeCreated DESC`, postId,
                            (error, post) => {
                                if (!error) {
                                    if (req.session.userId === post[0].userId) {
                                        res.status(200).json({
                                            'post': post,
                                            'userCreatedThisPost': true,
                                            'userInfo': userInfo
                                        });
                                    } else {
                                        res.status(200).json({
                                            'post': post,
                                            'userInfo': userInfo
                                        });
                                    }
                                    connection.query('SELECT userId, postsSeen FROM user WHERE userId = ?', req.session.userId, (error, user) => {
                                        let postsSeen = JSON.parse(user[0].postsSeen);
                                        if (!error) {
                                            if (!postsSeen.seen.includes(JSON.parse(req.params.id))) {
                                                postsSeen.seen.push(post[0].postId)
                                                postsSeen = JSON.stringify(postsSeen)
                                                postsSeen = { 'postsSeen': postsSeen }
                                                connection.query('UPDATE user SET ? WHERE userId = ' + req.session.userId, postsSeen, (error) => {
                                                    if (!error) {
                                                        console.log('Posts seen updated')
                                                    } else {
                                                        console.log(error)
                                                    }
                                                });
                                            } else {
                                                console.log('Already seen')
                                            };
                                        } else {
                                            console.log('No user can be found')
                                        }
                                    });
                                } else {
                                    res.status(404).json({ error })
                                }
                            });
                    } else {
                        res.status(404).json({ error })
                    }
                });
            } else {
                res.status(404).json({
                    message: 'Post Not found'
                })
            }
        } else {
            res.status(404).json({ error })
        }
    });
}

exports.getAllPosts = (req, res, next) => {
    let userId = req.session.userId;
    connection.query('SELECT firstName, lastName, postsSeen FROM user WHERE userId = ?', userId, (error, userInfo) => {
        let postsSeen = JSON.parse(userInfo[0].postsSeen)
        postsSeen = postsSeen.seen;
        if (!error) {
            connection.query(`
            SELECT post.postId, post.postTitle, post.postPicture, post.postText, post.postLikes, post.postDislikes, post.postTimeCreated, user.username
            FROM post 
            INNER JOIN user 
            ON post.userId = user.userId 
            ORDER BY postTimeCreated DESC`,
                (error, posts) => {
                    if (!error) {
                        res.status(200).json({ userInfo, postsSeen, posts })
                    } else {
                        res.status(404).json({ error })
                    }
                })
        } else {
            res.status(404).json({ error });
        }
    });
};

exports.getAllComments = (req, res, next) => {
    connection.query(` 
        SELECT comment.*, user.username, user.userPicture, COUNT(comseclevel.comSecLevId) AS numberOfSubComments
        FROM comment
        INNER JOIN user
        ON comment.userId = user.userId
        LEFT JOIN comseclevel
        ON comment.commentId = comseclevel.commentId
        WHERE comment.postId = ?
        GROUP BY comment.commentId
        ORDER BY comTimeCreated DESC`, req.params.id,
        (error, rows) => {
            if (!error) {
                res.status(200).json({
                    'postComments': rows
                });
            } else {
                res.status(404).json({
                    error: error,
                    message: 'No comments found'
                });
            }
        });
}

exports.modifyPost = (req, res, next) => {
    let today = new Date();
    let post;
    req.body.post = JSON.parse(req.body.post)
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        connection.query('SELECT postPicture FROM post WHERE postId = ' + req.params.id, (error, rows) => {
            if (!error) {
                if (rows[0].postPicture !== null) {
                    const filename = rows[0].postPicture.split('/images/')[1];
                    fs.unlink('images/' + filename, (error) => {
                        if (!error) {
                            console.log('Picture replaced successfully.');
                        } else {
                            console.log('Previous picture not found, picture saved.');
                        }
                    });
                }
            } else {
                console.log('Error on picture update');
            }
        })
        post = {
            'postTitle': req.body.post.postTitleModified,
            'postText': req.body.post.postTextModified,
            'postPicture': url + '/images/' + req.file.filename,
            'edited': true,
            'timeEdited': today,
        };
    } else if (JSON.parse(req.body.prevPic) === false) {
        connection.query('SELECT postPicture FROM post WHERE postId = ' + req.params.id, (error, rows) => {
            if (!error) {
                if (rows[0].postPicture !== null) {
                    const filename = rows[0].postPicture.split('/images/')[1];
                    fs.unlink('images/' + filename, (error) => {
                        if (!error) {
                            console.log('Picture replaced successfully.');
                        } else {
                            console.log('Previous picture not found, picture saved.');
                        }
                    });
                }
            } else {
                console.log('Error on picture update');
            }
        })
        post = {
            'postTitle': req.body.post.postTitleModified,
            'postText': req.body.post.postTextModified,
            'postPicture': null,
            'edited': true,
            'timeEdited': today,
        };
    } else {
        post = {
            'postTitle': req.body.post.postTitleModified,
            'postText': req.body.post.postTextModified,
            'edited': true,
            'timeEdited': today,
        };
    }
    connection.query('UPDATE post SET ? WHERE postId=' + req.params.id, post, (error) => {
        if (!error) {
            res.status(200).json({ message: 'Post successfully updated' })
        } else {
            res.status(404).json({ error })
        }
    });
}

exports.deletePost = (req, res, next) => {
    connection.query(`SELECT postPicture FROM post WHERE postId = ?`, req.params.id, (error, dbpicture) => {
        if (!error) {
            const filename = dbpicture[0].postPicture.split('/images/')[1];
            fs.unlink('images/' + filename, (error) => {
                if (!error) {
                    console.log('Picture replaced successfully.');
                } else {
                    console.log('Previous picture not found, picture saved.');
                }
            });
            connection.query('DELETE FROM post WHERE postId = ?', req.params.id, (error) => {
                if (!error) {
                    connection.query('DELETE FROM comment WHERE postId = ?', req.params.id, (error) => {
                        if (!error) {
                            connection.query('SELECT postsSeen, userId FROM user', (error, rows) => {
                                if (!error) {
                                    for (let i = 0; i < rows.length; i++) {
                                        rows[i].postsSeen = JSON.parse(rows[i].postsSeen)
                                        if (rows[i].postsSeen.seen.includes(JSON.parse(req.params.id))) {
                                            rows[i].postsSeen.seen.splice(rows[i].postsSeen.seen.indexOf(JSON.parse(req.params.id)), 1)
                                            rows[i].postsSeen = JSON.stringify(rows[i].postsSeen)
                                            connection.query('UPDATE user SET postsSeen=? WHERE userId=' + rows[i].userId, rows[i].postsSeen, (error) => {
                                                if (!error) {
                                                    res.status(200).json({
                                                        message: 'Post is successfully deleted with its comments, and user updated',
                                                        deleted: true
                                                    })
                                                } else {
                                                    res.status(404).json({ error })
                                                }
                                            });
                                        }
                                    }
                                } else {
                                    res.status(404).json({ error })
                                }
                            });
                        } else {
                            res.status(400).json({ error })
                        }
                    });
                } else {
                    res.status(400).json({ error });
                }
            });

        } else {
            res.status(404).json({
                message: error
            })
        }
    });
}

exports.likesPost = (req, res, next) => {
    let postId = req.params.id;
    let userId = req.session.userId;
    if (req.body.like === 1) {
        connection.query(`SELECT postUserLiked, postUserDisliked FROM post WHERE postId = ?`, postId, (error, postUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(postUsersLiked[0].postUserLiked);
                let usersDisliked = JSON.parse(postUsersLiked[0].postUserDisliked);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersLiked.usersLiked.push(userId);
                    usersLiked = JSON.stringify(usersLiked)
                    usersLiked = { 'postUserLiked': usersLiked }
                    connection.query(`UPDATE post SET postLikes = postLikes + 1, ? WHERE postId = ?`, [usersLiked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Liked',
                                like: true,
                                dislike: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Like can not be saved',
                                message: error
                            });
                        }
                    });
                } else if (!usersLiked.usersLiked.includes(userId) && usersDisliked.usersDisliked.includes(userId)) {
                    res.status(200).json({
                        message: 'Remove your dislike before liking'
                    })
                } else {
                    usersLiked.usersLiked.splice(usersLiked.usersLiked.indexOf(userId), 1)
                    usersLiked = JSON.stringify(usersLiked)
                    usersLiked = { 'postUserLiked': usersLiked }
                    connection.query(`UPDATE post SET postLikes = postLikes - 1, ? WHERE postId = ?`, [usersLiked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Liked removed',
                                like: false,
                                dislike: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Like can not be saved',
                                message: error
                            });
                        }
                    });
                }
            } else {
                res.status(404).json({
                    error
                })
            }
        })
    } else if (req.body.like === -1) {
        connection.query(`SELECT postUserLiked, postUserDisliked FROM post WHERE postId = ?`, postId, (error, postUsersDisliked) => {
            if (!error) {
                let usersLiked = JSON.parse(postUsersDisliked[0].postUserLiked);
                let usersDisliked = JSON.parse(postUsersDisliked[0].postUserDisliked);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersDisliked.usersDisliked.push(userId);
                    usersDisliked = JSON.stringify(usersDisliked)
                    usersDisliked = { 'postUserDisliked': usersDisliked }
                    connection.query(`UPDATE post SET postDislikes= postDislikes + 1, ? WHERE postId = ?`, [usersDisliked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Disliked',
                                dislike: true,
                                like: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Dislike can not be saved',
                                message: error
                            });
                        }
                    });
                } else if (usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    res.status(200).json({
                        message: 'Remove your like before disliking'
                    })
                } else {
                    usersDisliked.usersDisliked.splice(usersDisliked.usersDisliked.indexOf(userId), 1)
                    usersDisliked = JSON.stringify(usersDisliked)
                    usersDisliked = { 'postUserDisliked': usersDisliked }
                    connection.query(`UPDATE post SET postDislikes= postDislikes - 1, ? WHERE postId = ?`, [usersDisliked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Dislike removed',
                                dislike: false,
                                like: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Dislike can not be saved',
                                error: error
                            });
                        }
                    });
                }
            } else {
                res.status(404).json({
                    error:error
                })
            }
        })
    }
}