connection = require('../connection');
let today = new Date();

exports.createMMComment = (req, res, next) => {
    /*console.log('1');
    console.log(req.body);
    console.log(req.params.id);*/
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
    console.log('2');
    console.log(req.body);
    console.log(req.params.id);
}

exports.deleteMMComment = (req, res, next) => {
    console.log('3');
    console.log(req.body);
    console.log(req.params.id);
}

exports.likeMMComment = (req, res, next) => {
    console.log('4');
    console.log(req.body);
    console.log(req.params.id);
}