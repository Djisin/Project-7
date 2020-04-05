connection = require('../connection');

exports.submitReport = (req, res, next) => {
    let reportData = {
        'userId': req.session.userId,
        'comSecLevId':req.body.comSecLevId,
        'commentId': req.body.commentId,
        'postId': req.body.postId,
        'reportReason': req.body.reportReason,
        'whoCreatedPost': req.body.whoCreatedPost,
    }
    connection.query('INSERT INTO reports SET ?', reportData, (error) => {
        if (!error) {
            res.status(201).json({
                message: 'Reported successfully'
            })
        } else {
            res.status(400).json({
                message: error
            });
        }
    });
}