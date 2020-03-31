connection = require('../connection');
let today = new Date();

exports.createComment = (req, res, next) => {
    console.log(req)
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
    connection.query('UPDATE comseclevel SET ? WHERE comSecLevId = ' + req.body.reqComId2nd, comment2nd, (error)=>{
        if(!error){
            res.status(200).json({
                message:'Comment on second level successfully updated'
            })
        }else{
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
                message: 'Report saved successfully'
            })
        } else {
            res.status(400).json({
                message: error
            })
        }
    })
}