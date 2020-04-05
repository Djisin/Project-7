connection = require('../connection');
let today = new Date();

exports.commentOnComment = (req, res, next) => {
    let comOnComent = {
        'userId': req.session.userId,
        'postId': req.body.postId,
        'commentId': req.body.commentId,
        'comSecLevText': req.body.comOnComText
    }
    connection.query('INSERT INTO comseclevel SET ?', comOnComent, (error) => {
        if (!error) {
            res.status(201).json({
                message: 'Successfully commented on the comment'
            });
        } else {
            res.status(401).json({
                message: error
            });
        }
    });
}

exports.modifyComment2nd = (req, res, next) => {
    let comment2nd = {
        'comSecLevText': req.body.comment2nd,
        'edited': '1',
        'timeEdited': today
    }
    connection.query('UPDATE comseclevel SET ? WHERE comSecLevId = ' + req.body.reqComId2nd, comment2nd, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Comment on second level successfully updated'
            })
        } else {
            res.status(404).json({
                message: error
            })
        }
    })
}

exports.deleteComment2nd = (req, res, next) => {
    let comSecLevId = { 'comSecLevId': req.body.reqComId2nd }
    connection.query('DELETE FROM comseclevel WHERE ?', comSecLevId, (error) => {
        if (!error) {
            res.status(200).json({
                message: 'Comment on second level deleted successfully'
            })
        } else {
            res.status(400).json({
                message: error
            })
        }
    });
}

exports.likeComment2nd = (req, res, next) => {
    let comSecLevId = req.params.id;
    let userId = req.session.userId;
    if (req.body.like === 1) {
        connection.query(`SELECT comUserLikes, comUserDislikes FROM comseclevel WHERE comSecLevId = ?`, comSecLevId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes)
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes)
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersLiked.usersLiked.push(userId);
                    usersLiked = JSON.stringify(usersLiked);
                    usersLiked = { 'comUserLikes': usersLiked };
                    connection.query(`UPDATE comseclevel SET likes = likes + 1, ? WHERE comsecLevId = ?`, [usersLiked, comSecLevId], (error) => {
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
                    usersLiked.usersLiked.splice(usersLiked.usersLiked.indexOf(userId), 1);
                    usersLiked = JSON.stringify(usersLiked);
                    usersLiked = { 'comUserLikes': usersLiked };
                    connection.query(`UPDATE comseclevel SET likes = likes - 1, ? WHERE comSecLevId = ?`, [usersLiked, comSecLevId], (error) => {
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
    }else if (req.body.like === -1) {
        connection.query(`SELECT comUserLikes, comUserDislikes FROM comseclevel WHERE comSecLevId = ?`, comSecLevId, (error, comUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(comUsersLiked[0].comUserLikes);
                let usersDisliked = JSON.parse(comUsersLiked[0].comUserDislikes);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersDisliked.usersDisliked.push(userId);
                    usersDisliked = JSON.stringify(usersDisliked);
                    usersDisliked = { 'comUserDislikes': usersDisliked };
                    connection.query(`UPDATE comseclevel SET dislikes = dislikes + 1, ? WHERE comSecLevId = ?`, [usersDisliked, comSecLevId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Disliked',
                                like: false,
                                dislike: true
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
                    connection.query(`UPDATE comseclevel SET dislikes = dislikes - 1, ? WHERE comSecLevId = ?`, [usersDisliked, comSecLevId], (error) => {
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