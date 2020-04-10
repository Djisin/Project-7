connection = require('../connection');
let today = new Date();

exports.createMMComment = (req, res, next) => {
    console.log('1');
    console.log(req.body);
    console.log(req.params.id);
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