const connection = require('../connection');
const fs = require('fs')

exports.createPost = (req, res, next) => {
    let today = new Date();
    //console.log('*******************create post console')
    req.body.post = JSON.parse(req.body.post)
    const url = req.protocol + '://' + req.get('host');
    let post;
    //console.log(req)
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
            console.log("Post added to the db")
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
                        SELECT post.*, user.username, user.userId
                        FROM post 
                        INNER JOIN user 
                        ON post.userId = user.userId
                        WHERE ?`, postId,
                            (error, post) => {
                                if (!error) {
                                    connection.query(`
                                    SELECT comment.*, user.username, user.userPicture
                                    FROM comment 
                                    INNER JOIN user
                                    ON comment.userId = user.userId 
                                    LEFT JOIN reports
                                    ON comment.commentId = reports.commentId
                                    WHERE comment.?
                                    AND reports.comSecLevId IS NOT NULL
                                    UNION
                                    SELECT comment.*, user.username, user.userPicture
                                    FROM comment 
                                    INNER JOIN user
                                    ON comment.userId = user.userId 
                                    LEFT JOIN reports
                                    ON comment.commentId = reports.commentId
                                    WHERE comment.?
                                    AND reports.reportId IS NULL
                                    EXCEPT
                                    SELECT comment.*, user.username, user.userPicture
                                    FROM comment 
                                    INNER JOIN user
                                    ON comment.userId = user.userId 
                                    LEFT JOIN reports
                                    ON comment.commentId = reports.commentId
                                    WHERE comment.?
                                    AND reports.comSecLevId IS NULL
                                    AND reports.reportId IS NOT NULL
                                    ORDER BY comTimeCreated DESC`, [postId, postId, postId],
                                        (error, comment) => {
                                            if (!error) {
                                                let commentArray = new Array
                                                for (i = 0; i < comment.length; i++) {
                                                    commentArray.push(comment[i].commentId)
                                                }
                                                if (commentArray.length > 0) {
                                                    connection.query(`
                                                    SELECT comseclevel.*, user.username, user.userPicture
                                                    FROM comseclevel
                                                    INNER JOIN user
                                                    ON comseclevel.userId = user.userId
                                                    LEFT JOIN reports
                                                    ON comseclevel.comSecLevId = reports.comSecLevId
                                                    WHERE comseclevel.commentId IN (` + commentArray + `)
                                                    AND reports.reportId IS NULL
                                                    ORDER BY comseclevel.timeCreated DESC` ,
                                                        (error, commentOnComment) => {
                                                            if (!error) {
                                                                for (j = 0; j < comment.length; j++) {
                                                                    let storeComments = new Array
                                                                    for (k = 0; k < commentOnComment.length; k++) {
                                                                        if (comment[j].commentId === commentOnComment[k].commentId) {
                                                                            storeComments.push(commentOnComment[k])
                                                                        }
                                                                    }
                                                                    comment[j]['commentOnComment'] = storeComments
                                                                }
                                                                if (req.session.userId === post[0].userId) {
                                                                    res.status(200).json({
                                                                        'comment': comment,
                                                                        'post': post,
                                                                        'userCreatedThisPost': true,
                                                                        'userInfo': userInfo
                                                                    });
                                                                } else {
                                                                    res.status(200).json({
                                                                        'comment': comment,
                                                                        'post': post,
                                                                        'userInfo': userInfo
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                console.log('ovde')
                                                                console.log(error)
                                                            }
                                                        })
                                                } else {
                                                    if (req.session.userId === post[0].userId) {
                                                        res.status(200).json({
                                                            'comment': comment,
                                                            'post': post,
                                                            'userCreatedThisPost': true,
                                                            'userInfo': userInfo
                                                        });
                                                    } else {
                                                        res.status(200).json({
                                                            'comment': comment,
                                                            'post': post,
                                                            'userInfo': userInfo
                                                        });
                                                    }
                                                }
                                            } else {
                                                console.log(error)
                                            }
                                        });
                                    connection.query('SELECT userId, postsSeen FROM user WHERE userId = ?', req.session.userId, (error, user) => {
                                        let postsSeen = JSON.parse(user[0].postsSeen);
                                        if (!error) {
                                            //Check if array has the post id, if not add to the array
                                            //console.log(postsSeen.seen)
                                            //console.log(postsSeen.seen.length)
                                            if (!postsSeen.seen.includes(JSON.parse(req.params.id))) {
                                                postsSeen.seen.push(post[0].postId)
                                                postsSeen = JSON.stringify(postsSeen)
                                                //console.log(postsSeen);
                                                postsSeen = { 'postsSeen': postsSeen }
                                                connection.query('UPDATE user SET ? WHERE userId = ' + req.session.userId, postsSeen, (error) => {
                                                    if (!error) {
                                                        console.log('dodato u postsSeen')
                                                    } else {
                                                        console.log(error)
                                                    }
                                                });
                                            } else {
                                                console.log('ima, ne treba da se pise')
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
            LEFT JOIN reports
            ON post.postId = reports.postId
            WHERE  reports.commentId IS NULL
            AND reports.comSecLevId IS NULL
            AND reports.reportId IS NULL
            UNION
            SELECT post.postId, post.postTitle, post.postPicture, post.postText, post.postLikes, post.postDislikes, post.postTimeCreated, user.username 
            FROM post 
            INNER JOIN user 
            ON post.userId = user.userId 
            LEFT JOIN reports
            ON post.postId = reports.postId
            WHERE  reports.commentId IS NOT NULL
            OR reports.comSecLevId IS NULL
            AND reports.reportId IS NULL
            EXCEPT
            SELECT post.postId, post.postTitle, post.postPicture, post.postText, post.postLikes, post.postDislikes, post.postTimeCreated, user.username
            FROM post 
            INNER JOIN user 
            ON post.userId = user.userId 
            LEFT JOIN reports
            ON post.postId = reports.postId
            WHERE  reports.commentId IS NULL
            AND reports.comSecLevId IS NULL
            AND reports.reportId IS NOT NULL
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

exports.modifyPost = (req, res, next) => {
    let today = new Date();
    let post;
    req.body.post = JSON.parse(req.body.post)
    console.log(req.params);
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        connection.query('SELECT postPicture FROM post WHERE postId = ' + req.params.id, (error, rows) => {
            if (!error) {
                if (rows[0].postPicture !== null) {
                    /*const filename = rows[0].postPicture.split('/images/')[1];
                    fs.unlinkSync('images/' + filename);*/
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
        //req.body.prevPic = JSON.parse(req.body.prevPic)
    } else if (JSON.parse(req.body.prevPic) === false) {
        connection.query('SELECT postPicture FROM post WHERE postId = ' + req.params.id, (error, rows) => {
            if (!error) {
                if (rows[0].postPicture !== null) {
                    /* const filename = rows[0].postPicture.split('/images/')[1];
                     fs.unlinkSync('images/' + filename);*/
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
            /*let picture = dbpicture[0].postPicture.split('/images/')[1];
            if (picture !== undefined) {
                fs.unlinkSync('images/' + picture);
            }*/
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
                    res.status(403).json({
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
                    res.status(403).json({
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
    }
}
exports.search = (req, res, next) => {
    searchTitle = '%' + req.body.searchInputVal + '%';
    connection.query(`SELECT postTitle, postId FROM post WHERE postTitle LIKE ? LIMIT 5`, searchTitle, (error, foundTitle) => {
        if (!error) {
            res.status(200).json({
                'foundTitle': foundTitle
            });
        } else {
            res.status(400).json({
                message: error
            });
        }
    });
}     