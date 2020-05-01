connection = require('../connection');

exports.submitReport = (req, res, next) => {
    if (req.body.level === 'top') {
        connection.query(`
            SELECT COUNT(userId) AS thisUserReports
            FROM mmreports 
            WHERE userId = ? AND mmPostId = ?`,
            [req.session.userId, req.body.postId], (error, usersReported) => {
                if (!error) {
                    if (usersReported[0].thisUserReports === 0) {
                        connection.query(`
                            SELECT COUNT(mmPostId) AS countPosts
                            FROM mmreports 
                            WHERE mmPostId = ?`,
                            req.body.postId, (error, rows) => {
                                if (!error) {
                                    if (rows[0].countPosts >= 1) {
                                        connection.query(`DELETE FROM mmreports WHERE mmPostId = ?`, req.body.postId, (error) => {
                                            if (!error) {
                                                connection.query(`DELETE FROM mmpost WHERE mmPostId = ?`, req.body.postId, (error) => {
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
                                            'mmComSecLevId': null,
                                            'mmCommentId': null,
                                            'mmPostId': req.body.postId,
                                            'reportReason': req.body.reportReason,
                                            'whoCreatedPost': req.body.whoCreatedPost,
                                        }
                                        connection.query(`INSERT INTO mmreports SET ?`, report, (error) => {
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
        FROM mmreports 
        WHERE userId = ? AND mmCommentId = ?`,
            [req.session.userId, req.body.commentId], (error, usersReported) => {
                if (!error) {
                    if (usersReported[0].thisUserReports === 0) {
                        connection.query(`
                        SELECT COUNT(mmCommentId) AS countPosts
                        FROM mmreports 
                        WHERE mmCommentId = ?`,
                            req.body.commentId, (error, rows) => {
                                if (!error) {
                                    if (rows[0].countPosts >= 1) {
                                        connection.query(`DELETE FROM mmreports WHERE mmCommentId = ?`, req.body.commentId, (error) => {
                                            if (!error) {
                                                connection.query(`DELETE FROM mmcomment WHERE mmCommentId = ?`, req.body.commentId, (error) => {
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
                                            'mmComSecLevId': null,
                                            'mmCommentId': req.body.commentId,
                                            'mmPostId': req.body.postId,
                                            'reportReason': req.body.reportReason,
                                            'whoCreatedPost': req.body.whoCreatedPost,
                                        }
                                        connection.query(`INSERT INTO mmreports SET ?`, report, (error) => {
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
        FROM mmreports 
        WHERE userId = ? AND mmComSecLevId = ?`,
            [req.session.userId, req.body.commentId2nd], (error, usersReported) => {
                if (!error) {
                    if (usersReported[0].thisUserReports === 0) {
                        connection.query(`
                        SELECT COUNT(mmComSecLevId) AS countPosts
                        FROM mmreports 
                        WHERE mmComSecLevId = ?`, req.body.commentId2nd,
                            (error, rows) => {
                                if (!error) {
                                    if (rows[0].countPosts >= 1) {
                                        connection.query(`DELETE FROM mmreports WHERE mmComSecLevId = ?`, req.body.commentId2nd, (error) => {
                                            if (!error) {
                                                connection.query(`DELETE FROM mmcomseclevel WHERE mmComSecLevId = ?`, req.body.commentId2nd, (error) => {
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
                                        connection.query(`SELECT mmPostId, mmCommentId FROM mmcomseclevel WHERE mmComSecLevId = ?`, req.body.commentId2nd, (error, rows) => {
                                            if (!error) {
                                                let report = {
                                                    'userId': req.session.userId,
                                                    'mmComSecLevId': req.body.commentId2nd,
                                                    'mmCommentId': rows[0].mmCommentId,
                                                    'mmPostId': rows[0].mmPostId,
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