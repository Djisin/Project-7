const connection = require('../connection');
const fs = require('fs');

exports.createMMPost = (req, res, next) => {
    console.log('1')
    console.log(req.body);
    console.log(req.file) 
}
exports.modifyMMPost = (req, res, next) => {
    console.log('2')
    console.log(req.body);
    console.log(req.params.id) 
}
exports.getOneMMPost = (req, res, next) => {
    console.log('3')
    console.log(req.body);
    console.log(req.params.id)
}
exports.getAllMMPosts = (req, res, next) => {
    console.log('4')
    console.log(req.body); 
    console.log(req.params.id) 
}
exports.deleteMMPost = (req, res, next) => {
    console.log('5')
    console.log(req.body);
    console.log(req.params.id)
}
exports.likeMMPost = (req, res, next) => {
    console.log('6')
    console.log(req.body);
    console.log(req.params.id)
}
exports.searchMM = (req, res, next) => {
    console.log('7')
    console.log(req.body);
    console.log(req.params.id)
}