connection = require('../connection');
let today = new Date();

exports.createMMComment = (req, res, next) => {
    let mmcomment = {
        'userId': req.session.userId,
        'mmPostId': req.body.mmCommentId,
        'commentText': req.body.comment,
        'comTimeCreated': today
    }
    connection.query('INSERT INTO mmcomment SET ?', mmcomment, (error) => {
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

exports.modifyMMComment = (req, res, next) => {
    let comment = {
        'commentText': req.body.comment,
        'edited': '1',
        'timeEdited': today
    }
    connection.query('UPDATE mmcomment SET ? WHERE mmCommentId = ' + req.params.id, comment, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Comment edited successfully'
            });
        } else {
            res.status(404).json({ error })
        }
    })
}

exports.deleteMMComment = (req, res, next) => {
    connection.query('DELETE FROM mmcomment WHERE mmCommentId = ?', req.params.id, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Comment deleted successfully.'
            })
        } else {
            res.status(400).json({
                message: error
            })
        }
    });
}

exports.likeMMComment = (req, res, next) => {
    commentId = req.params.id;
    userId = req.session.userId;
    if (req.body.like === 1) {
        connection.query(`SELECT comUserLikes, comUserDislikes FROM mmcomment WHERE mmCommentId = ?`, commentId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes)
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes)
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersLiked.usersLiked.push(userId);
                    usersLiked = JSON.stringify(usersLiked);
                    usersLiked = { 'comUserLikes': usersLiked };
                    connection.query(`UPDATE mmcomment SET likes = likes + 1, ? WHERE mmCommentId = ?`, [usersLiked, commentId], (error) => {
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
                    usersLiked.usersLiked.splice(usersLiked.usersLiked.indexOf(userId), 1);
                    usersLiked = JSON.stringify(usersLiked);
                    usersLiked = { 'comUserLikes': usersLiked };
                    connection.query(`UPDATE mmcomment SET likes = likes - 1, ? WHERE mmCommentId = ?`, [usersLiked, commentId], (error) => {
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
                    })
                }
            } else {
                res.status(404).json({
                    error
                })
            }
        });
    } else if (req.body.like === -1) {
        connection.query(`SELECT comUserLikes, comUserDislikes FROM mmcomment WHERE mmCommentId = ?`, commentId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes);
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersDisliked.usersDisliked.push(userId);
                    usersDisliked = JSON.stringify(usersDisliked);
                    usersDisliked = { 'comUserDislikes': usersDisliked };
                    connection.query(`UPDATE mmcomment SET dislikes = dislikes + 1, ? WHERE mmCommentId = ?`, [usersDisliked, commentId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Disliked',
                                dislike: true,
                                like: false
                            });
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
                    });
                } else {
                    usersDisliked.usersDisliked.splice(usersDisliked.usersDisliked.indexOf(userId), 1)
                    usersDisliked = JSON.stringify(usersDisliked);
                    usersDisliked = { 'comUserDislikes': usersDisliked };
                    connection.query(`UPDATE mmcomment SET dislikes = dislikes - 1, ? WHERE mmCommentId = ?`, [usersDisliked, commentId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Dislike removed',
                                dislike: false,
                                like: false
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

exports.getAllSubComments = (req, res, next) => {
    connection.query(`SELECT mmcomseclevel.*, user.userPicture, user.username
        FROM mmcomseclevel 
        INNER JOIN user 
        ON mmcomseclevel.userId = user.userId
        WHERE mmcomseclevel.mmCommentId = ?
        ORDER BY timeCreated DESC  `, req.params.id, (error, rows) => {
        if (!error) {
            res.status(200).json({
                'postComments': rows
            });
        } else {
            res.status(404).json({
                message: 'No comments found'
            });
        }
    });
}