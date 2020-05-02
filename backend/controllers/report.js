connection = require('../connection');

exports.submitReport = (req, res, next) => {
    if (req.body.level === 'top') {
        connection.query(`
            SELECT COUNT(userId) AS thisUserReports
            FROM reports 
            WHERE userId = ? AND postId = ?`,
            [req.session.userId, req.body.postId], (error, usersReported) => {
                if (!error) {
                    if (usersReported[0].thisUserReports === 0) {
                        connection.query(`
                            SELECT COUNT(postId) AS countPosts
                            FROM reports 
                            WHERE postId = ?`,
                            req.body.postId, (error, rows) => {
                                if (!error) {
                                    if (rows[0].countPosts >= 1) {
                                        connection.query(`DELETE FROM reports WHERE postId = ?`, req.body.postId, (error) => {
                                            if (!error) {
                                                connection.query(`DELETE FROM post WHERE postId = ?`, req.body.postId, (error) => {
                                                    if (!error) {
                                                        res.status(200).json({
                                                            success: true,
                                                            message: 'Post deleted because of too many complains.'
                                                        });
                                                    } else {
                                                        res.status(400).json({
                                                            success: false,
                                                            error: error,
                                                            message: 'Post can not be deleted.'
                                                        });
                                                    }
                                                });
                                            } else {
                                                res.status(400).json({
                                                    success: false,
                                                    error: error,
                                                    message: 'Post can not be deleted.'     
                                                });
                                            }
                                        });
                                    } else {
                                        let report = {
                                            'userId': req.session.userId,
                                            'comSecLevId': null,
                                            'commentId': null,
                                            'postId': req.body.postId,
                                            'reportReason': req.body.reportReason,
                                            'whoCreatedPost': req.body.whoCreatedPost,
                                        }
                                        connection.query(`INSERT INTO reports SET ?`, report, (error) => {
                                            if (!error) {
                                                res.status(200).json({
                                                    success: true,
                                                    message: 'Post reported successfully.'
                                                });
                                            } else {
                                                res.status(400).json({
                                                    error: error,
                                                    message: 'Post can not be reported.'
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    res.status(400).json({
                                        success: false,
                                        error: error,
                                        message: 'Post can not be reported.'
                                    });
                                }
                            });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: 'You already reported this post'
                        });
                    }
                } else {
                    res.status(400).json({
                        success: false,
                        error: error,
                        message: 'Users reports can not be counted'
                    });
                }
            });
    } else if (req.body.level === 'mid') {
        connection.query(`
        SELECT COUNT(userId) AS thisUserReports
        FROM reports 
        WHERE userId = ? AND commentId = ?`,
            [req.session.userId, req.body.commentId], (error, usersReported) => {
                if (!error) {
                    if (usersReported[0].thisUserReports === 0) {
                        connection.query(`
                        SELECT COUNT(commentId) AS countPosts
                        FROM reports 
                        WHERE commentId = ?`,
                            req.body.commentId, (error, rows) => {
                                if (!error) {
                                    if (rows[0].countPosts >= 1) {
                                        connection.query(`DELETE FROM reports WHERE commentId = ?`, req.body.commentId, (error) => {
                                            if (!error) {
                                                connection.query(`DELETE FROM comment WHERE commentId = ?`, req.body.commentId, (error) => {
                                                    if (!error) {
                                                        res.status(200).json({
                                                            success: true,
                                                            message: 'Comment deleted because of too many complains.'
                                                        });
                                                    } else {
                                                        res.status(400).json({
                                                            success: false,
                                                            error: error,
                                                            message: 'Comment can not be deleted.'
                                                        });
                                                    }
                                                });
                                            } else {
                                                res.status(400).json({
                                                    success: false,
                                                    error: error,
                                                    message: 'Comment can not be deleted.'
                                                });
                                            }
                                        });
                                    } else {
                                        let report = {
                                            'userId': req.session.userId,
                                            'comSecLevId': null,
                                            'commentId': req.body.commentId,
                                            'postId': req.body.postId,
                                            'reportReason': req.body.reportReason,
                                            'whoCreatedPost': req.body.whoCreatedPost,
                                        }
                                        connection.query(`INSERT INTO reports SET ?`, report, (error) => {
                                            if (!error) {
                                                res.status(200).json({
                                                    success: true,
                                                    message: 'Comment reported successfully.'
                                                });
                                            } else {
                                                res.status(400).json({
                                                    success: false,
                                                    message: 'Comment can not be reported.'
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    res.status(400).json({
                                        success: false,
                                        error: error,
                                        message: 'Comment can not be reported.'
                                    });
                                }
                            });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: 'You already reported this post'
                        });
                    }
                } else {
                    res.status(400).json({
                        success: false,
                        error: error,
                        message: 'Users reports can not be counted'
                    });
                }
            });
    } else if (req.body.level === 'bottom') {
        connection.query(`
        SELECT COUNT(userId) AS thisUserReports
        FROM reports 
        WHERE userId = ? AND comSecLevId = ?`,
            [req.session.userId, req.body.commentId2nd], (error, usersReported) => {
                if (!error) {
                    if (usersReported[0].thisUserReports === 0) {
                        connection.query(`
                        SELECT COUNT(comSecLevId) AS countPosts
                        FROM reports 
                        WHERE comSecLevId = ?`, req.body.commentId2nd,
                            (error, rows) => {
                                if (!error) {
                                    if (rows[0].countPosts >= 1) {
                                        connection.query(`DELETE FROM reports WHERE comSecLevId = ?`, req.body.commentId2nd, (error) => {
                                            if (!error) {
                                                connection.query(`DELETE FROM comseclevel WHERE comSecLevId = ?`, req.body.commentId2nd, (error) => {
                                                    if (!error) {
                                                        res.status(200).json({
                                                            success: true,
                                                            message: 'Comment deleted because of too many complains.'
                                                        });
                                                    } else {
                                                        res.status(400).json({
                                                            success: false,
                                                            error: error,
                                                            message: 'Sub comment can not be deleted.'
                                                        });
                                                    }
                                                });
                                            } else {
                                                res.status(400).json({
                                                    success: false,
                                                    error: error,
                                                    message: 'Sub comment can not be deleted.'
                                                });
                                            }
                                        });
                                    } else {
                                        connection.query(`SELECT postId, commentId FROM comseclevel WHERE comSecLevId = ?`, req.body.commentId2nd, (error, rows) => {
                                            if (!error) {
                                                let report = {
                                                    'userId': req.session.userId,
                                                    'comSecLevId': req.body.commentId2nd,
                                                    'commentId': rows[0].mmCommentId,
                                                    'postId': rows[0].mmPostId,
                                                    'reportReason': req.body.reportReason,
                                                    'whoCreatedPost': req.body.whoCreatedPost,
                                                }
                                                connection.query(`INSERT INTO mmreports SET ?`, report, (error) => {
                                                    if (!error) {
                                                        res.status(200).json({
                                                            success: true,
                                                            message: 'Sub comment reported successfully.'
                                                        });
                                                    } else {
                                                        res.status(400).json({
                                                            success: false,
                                                            message: 'Sub comment can not be reported.'
                                                        });
                                                    }
                                                });
                                            } else {
                                                res.status(404).json({
                                                    success: false,
                                                    message: "Sub comment can not be found."
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    res.status(400).json({
                                        success: false,
                                        error: error,
                                        message: 'Sub comment can not be reported.'
                                    });
                                }
                            });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: 'You already reported this sub comment'
                        });
                    }
                } else {
                    res.status(400).json({
                        success: false,
                        error: error,
                        message: 'Users reports can not be counted'
                    });
                }
            });

    }
}

exports.hackReport = (req, res, next) => {
    connection.query(`SELECT COUNT(userId) AS reportedTimes FROM hackreports WHERE userId = ?`, req.session.userId, (error, rows) => {
        if (!error) {
            if (rows[0].reportedTimes >= 4) {
                connection.query(`DELETE FROM user WHERE userId = ?`, req.session.userId, (error) => {
                    if (!error) {
                        res.status(202).json({
                            message: 'Your profile is permanetly deleted for hacking.'
                        });
                        req.session.destroy();
                    } else {
                        res.status(400).json({ error: error })
                    }
                });
            } else {
                report = {
                    'userId': req.session.userId,
                    'fieldAttempt': req.body.fieldInput,
                    'fieldHTML': req.body.field,
                    'location': req.body.location,
                    'time': today
                }
                connection.query(`INSERT INTO hackreports SET ?`, report, (error) => {
                    if (!error) {
                        res.status(201).json({
                            message: 'Report successfull'
                        });
                    } else {
                        res.status(400).json({ error: error })
                    }
                });
            }

        } else {
            res.status(400).json({ error: error })
        }
    });
}