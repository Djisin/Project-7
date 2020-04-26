connection = require('../connection');

exports.submitReport = (req, res, next) => {
    console.log('report');
    console.log(req.body)
    console.log(req.params.id)
    if (req.body.level === 'top') {
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
                    message: 'Post reported successfully.'
                });
            } else {
                res.status(400).json({
                    message: 'Post can not be reported.'
                });
            }
        });
    } else if (req.body.level === 'mid') {
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
                    message: 'Comment reported successfully.'
                });
            } else {
                res.status(400).json({
                    message: 'Comment can not be reported.'
                });
            }
        });
    } else if (req.body.level === 'bottom') {
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
                            message: 'Sub comment reported successfully.'
                        });
                    } else {
                        res.status(400).json({
                            message: 'Sub comment can not be reported.'
                        });
                    }
                });
            } else {
                res.status(404).json({
                    message: "Sub comment can not be found."
                });
            }
        });
    }
}