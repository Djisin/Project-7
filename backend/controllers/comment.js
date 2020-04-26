connection = require('../connection');
let today = new Date();

exports.createComment = (req, res, next) => {
    let comment = {
        'userId': req.session.userId,
        'postId': req.body.reqPostId,
        'commentText': req.body.comment,
        'comTimeCreated': today
    }
    connection.query('INSERT INTO comment SET ?', comment, (error) => {
        if (!error) {
            res.status(201).json({
                message: 'Comment saved successfully'
            });
        } else {
            res.status(401).json({
                message: error
            });
        }
    });
}

exports.modifyComment = (req, res, next) => {
    let comment = {
        'commentText': req.body.comment,
        'edited': '1',
        'timeEdited': today
    }
    connection.query('UPDATE comment SET ? WHERE commentId = ' + req.body.reqComId, comment, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Comment edited successfully'
            });
        } else {
            res.status(404).json({ error })
        }
    });
}

exports.deleteComment = (req, res, next) => {
    commentId = { 'commentId': req.body.reqComId }
    connection.query('DELETE FROM comment WHERE ?', commentId, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Comment is successfully deleted'
            });
        } else {
            res.status(404).json({
                error
            })
        }
    });
}

exports.likeComment = (req, res, next) => {
    commentId = req.params.id;
    userId = req.session.userId;
    if (req.body.like === 1) {
        connection.query(`SELECT comUserLikes, comUserDislikes FROM comment WHERE commentId = ?`, commentId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes)
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes)
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersLiked.usersLiked.push(userId);
                    usersLiked = JSON.stringify(usersLiked);
                    usersLiked = { 'comUserLikes': usersLiked };
                    connection.query(`UPDATE comment SET likes = likes + 1, ? WHERE commentId = ?`, [usersLiked, commentId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Liked',
                                comLike: true,
                                comDislike: false
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
                    usersLiked.usersLiked.splice(usersLiked.usersLiked.indexOf(userId), 1);
                    usersLiked = JSON.stringify(usersLiked);
                    usersLiked = { 'comUserLikes': usersLiked };
                    connection.query(`UPDATE comment SET likes = likes - 1, ? WHERE commentId = ?`, [usersLiked, commentId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Liked removed',
                                comLike: false,
                                comDislike: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Like can not be saved',
                                message: error
                            });
                        }
                    })
                }
            } else {
                res.status(404).json({
                    error
                })
            }
        });
    } else if (req.body.like === -1) {
        connection.query(`SELECT comUserLikes, comUserDislikes FROM comment WHERE commentId = ?`, commentId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes);
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersDisliked.usersDisliked.push(userId);
                    usersDisliked = JSON.stringify(usersDisliked);
                    usersDisliked = { 'comUserDislikes': usersDisliked };
                    connection.query(`UPDATE comment SET dislikes = dislikes + 1, ? WHERE commentId = ?`, [usersDisliked, commentId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Disliked',
                                comDislike: true,
                                comLike: false
                            });
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
                    });
                } else {
                    usersDisliked.usersDisliked.splice(usersDisliked.usersDisliked.indexOf(userId), 1)
                    usersDisliked = JSON.stringify(usersDisliked);
                    usersDisliked = { 'comUserDislikes': usersDisliked };
                    connection.query(`UPDATE comment SET dislikes = dislikes - 1, ? WHERE commentId = ?`, [usersDisliked, commentId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Dislike removed',
                                comDislike: false,
                                comLike: false
                            });
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
                });
            }
        });
    }
}