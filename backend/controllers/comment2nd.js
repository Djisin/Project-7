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

exports.likeComment2nd = (req, res, next) => {
    console.log('2nd')
    console.log(req.body)
    console.log(req.params.id)
}