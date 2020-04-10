connection = require('../connection');
let today = new Date();

exports.commentOnComment = (req, res, next) => {
    console.log('1');
    console.log(req.body);
    console.log(req.params.id);
}

exports.modifyComment2nd = (req, res, next) => {
    console.log('2');
    console.log(req.body);
    console.log(req.params.id);
}

exports.deleteComment2nd = (req, res, next) => {
    console.log('3');
    console.log(req.body);
    console.log(req.params.id);
}

exports.likeComment2nd = (req, res, next) => {
    console.log('4');
    console.log(req.body);
    console.log(req.params.id);
}