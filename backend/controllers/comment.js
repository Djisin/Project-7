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
            })
        }
    })
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
    })
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
    console.log('1st')
    console.log(req.body)
    console.log(req.params.id)
}
