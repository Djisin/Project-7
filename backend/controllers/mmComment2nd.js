connection = require('../connection');
let today = new Date();

exports.commentOnComment = (req, res, next) => {
    console.log('komentar na komentar')
    console.log('1');
    console.log(req.body);
    console.log(req.params.id);
    let mmcomment = {
        'userId': req.session.userId,
        'mmPostId': req.body.postId,
        'mmCommentId': req.body.mmCommentId,
        'comSecLevText': req.body.comment,
        'timeCreated': today
    }
    connection.query('INSERT INTO mmcomseclevel SET ?', mmcomment, (error) => {
        if (!error) {
            res.status(201).json({
                message: 'Comment on comment saved successfully'
            });
        } else {
            res.status(401).json({
                message: error
            });
        }
    });
}

exports.modifyComment2nd = (req, res, next) => {
    console.log('modify 2nd comment');
    console.log('2');
    console.log(req.body);
    console.log(req.params.id);
    let comment = {
        'comSecLevText': req.body.comment,
        'edited': '1',
        'timeEdited': today
    }
    connection.query('UPDATE mmcomseclevel SET ? WHERE mmComSecLevId = ' + req.params.id, comment, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Sub comment edited successfully'
            });
        } else {
            res.status(404).json({ error })
        }
    });
}

exports.deleteComment2nd = (req, res, next) => {
    console.log('delete 2nd com')
    console.log('3');
    console.log(req.body);
    console.log(req.params.id);
    connection.query('DELETE FROM mmcomseclevel WHERE mmComSecLevId = ?', req.params.id, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Comment on second level deleted successfully.'
            })
        } else {
            res.status(400).json({
                message: error
            })
        }
    }); 
}

exports.likeComment2nd = (req, res, next) => {
    console.log('com 2nd likes')
    console.log('4');
    console.log(req.body);
    console.log(req.params.id);
    commentId = req.params.id;
    userId = req.session.userId;
    if (req.body.like === 1) {
        connection.query(`SELECT comUserLikes, comUserDislikes FROM mmcomseclevel WHERE mmComSecLevId = ?`, commentId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes)
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes)
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersLiked.usersLiked.push(userId);
                    usersLiked = JSON.stringify(usersLiked);
                    usersLiked = { 'comUserLikes': usersLiked };
                    connection.query(`UPDATE mmcomseclevel SET likes = likes + 1, ? WHERE mmComSecLevId = ?`, [usersLiked, commentId], (error) => {
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
                    connection.query(`UPDATE mmcomseclevel SET likes = likes - 1, ? WHERE mmComSecLevId = ?`, [usersLiked, commentId], (error) => {
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
        connection.query(`SELECT comUserLikes, comUserDislikes FROM mmcomseclevel WHERE mmComSecLevId = ?`, commentId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes);
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersDisliked.usersDisliked.push(userId);
                    usersDisliked = JSON.stringify(usersDisliked);
                    usersDisliked = { 'comUserDislikes': usersDisliked };
                    connection.query(`UPDATE mmcomseclevel SET dislikes = dislikes + 1, ? WHERE mmComSecLevId = ?`, [usersDisliked, commentId], (error) => {
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
                    connection.query(`UPDATE mmcomseclevel SET dislikes = dislikes - 1, ? WHERE mmComSecLevId = ?`, [usersDisliked, commentId], (error) => {
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