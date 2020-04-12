const connection = require('../connection');
const fs = require('fs');

exports.createMMPost = (req, res, next) => {
    let today = new Date();
    const url = req.protocol + '://' + req.get('host');
    let mmpost;
    if (req.body.mmPost === 'null') {
        req.body.mmPost = null;
    }
    if (req.file && req.body.embed === 'false') {
        mmpost = {
            'userId': req.session.userId,
            'postMMField': url + '/images/' + req.file.filename,
            'embed': false,
            'timeCreated': today,
            'postText': req.body.mmPost,
        }
    } else if (req.body.embed === 'true') {
        mmpost = {
            'userId': req.session.userId,
            'postMMField': req.body.embedLink,
            'embed': true,
            'timeCreated': today,
            'postText': req.body.mmPost,
        }
    } else {
        mmpost = {
            'userId': req.session.userId,
            'postMMField': null,
            'embed': false,
            'timeCreated': today,
            'postText': req.body.mmPost,
        }
    }
    connection.query('INSERT INTO mmpost SET ?', mmpost, (error) => {
        if (!error) {
            console.log("mmPost added to the db")
            res.status(201).json({ message: 'Post created!' })
        } else {
            res.status(401).json({ message: error })
        }
    });
}

exports.getAllMMPosts = (req, res, next) => {
    console.log('4')
    console.log(req.body);
    console.log(req.params.id)
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