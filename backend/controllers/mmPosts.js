const connection = require('../connection');
const fs = require('fs');
let today = new Date();

exports.createMMPost = (req, res, next) => {
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
    console.log(req.file)
    const url = req.protocol + '://' + req.get('host');
    let mmPost;
    if (req.body.mmPost === 'null') {
        req.body.mmPost = null;
    }
    if (req.file && req.body.embed === 'false' && (req.body.checkBox === 'false' || req.body.checkBox === 'true')) {
        connection.query(`SELECT postMMField FROM mmpost WHERE mmPostId = ?`, req.params.id, (error, rows) => {
            if (!error) {
                if (rows[0].postMMField !== null) {
                    let possExtensions = ['.jpg', '.png', 'apng', '.bmp', '.gif', '.svg', 'webp', '.flv', '.mp4', '.ts', '.3gp', '.mov', '.avi', '.wmv']
                    let extension = rows[0].postMMField.substring(rows[0].postMMField.length - 4);
                    if (possExtensions.includes(extension)) {
                        const filename = rows[0].postMMField.split('/images/')[1];
                        fs.unlinkSync('images/' + filename);
                    }
                }
            } else {
                res.status(404).json({ erorr })
            }
        });
        mmPost = {
            'postMMField': url + '/images/' + req.file.filename,
            'embed': false,
            'timeEdited': today,
            'edited': true,
            'postText': req.body.mmPost,
        }
    } else if (req.body.embed === 'true' && (req.body.checkBox === 'false' || req.body.checkBox === 'true')) {
        connection.query(`SELECT postMMField FROM mmpost WHERE mmPostId = ?`, req.params.id, (error, rows) => {
            if (!error) {
                if (rows[0].postMMField !== null) {
                    let possExtensions = ['.jpg', '.png', 'apng', '.bmp', '.gif', '.svg', 'webp', '.flv', '.mp4', '.ts', '.3gp', '.mov', '.avi', '.wmv']
                    let extension = rows[0].postMMField.toLowerCase().substring(rows[0].postMMField.length - 4);
                    if (possExtensions.includes(extension)) {
                        const filename = rows[0].postMMField.split('/images/')[1];
                        fs.unlinkSync('images/' + filename);
                    }
                }
            } else {
                res.status(404).json({ erorr })
            }
        });
        mmPost = {
            'postMMField': req.body.embedLink,
            'embed': true,
            'timeEdited': today,
            'edited': true,
            'postText': req.body.mmPost,
        }
    } else if (req.body.checkBox === 'true' && req.body.onlyText === 'true') {
        connection.query(`SELECT postMMField FROM mmpost WHERE mmPostId = ?`, req.params.id, (error, rows) => {
            if (!error) {
                if (rows[0].postMMField !== null) {
                    let possExtensions = ['.jpg', '.png', 'apng', '.bmp', '.gif', '.svg', 'webp', '.flv', '.mp4', '.ts', '.3gp', '.mov', '.avi', '.wmv']
                    let extension = rows[0].postMMField.substring(rows[0].postMMField.length - 4);
                    console.log(extension)
                    if (possExtensions.includes(extension)) {
                        const filename = rows[0].postMMField.split('/images/')[1];
                        fs.unlinkSync('images/' + filename);
                    }
                }
            } else {
                res.status(404).json({ erorr })
            }
        });
        mmPost = {
            'postMMField': null,
            'embed': false,
            'timeEdited': today,
            'edited': true,
            'postText': req.body.mmPost,
        }
    } else if (req.body.checkBox === 'false' && req.body.onlyText === 'true') {
        mmPost = {
            'embed': false,
            'timeEdited': today,
            'edited': true,
            'postText': req.body.mmPost,
        }
    } else {
        console.log('Error on input, check')
    }
    connection.query(`UPDATE mmpost SET ? WHERE mmPostId = ` + req.params.id, mmPost, (error) => {
        if (!error) {
            res.status(204).json({
                message: 'Media post updated scuccessfully.'
            });
        } else {
            res.status(400).json({
                message: error
            });
        }
    });
}
exports.getOneMMPostComments = (req, res, next) => {
    connection.query(`SELECT mmcomment.*, user.userPicture, user.username, COUNT(mmcomseclevel.mmComSecLevId) AS numberOfSubComments
        FROM mmcomment 
        INNER JOIN user 
        ON mmcomment.userId = user.userId
        LEFT JOIN mmcomseclevel
        ON mmcomment.mmCommentId = mmcomseclevel.mmCommentId
        WHERE mmcomment.mmPostId = ?
        GROUP BY mmCommentId
        ORDER BY comTimeCreated DESC  `, req.params.id, (error, rows) => {
        if (!error) {
            res.status(200).json({
                'postComments': rows
            });
        } else {
            res.status(404).json({
                message: 'No comments found'
            });
        }
    });
}

exports.deleteMMPost = (req, res, next) => {
    connection.query(`SELECT postMMField FROM mmpost WHERE mmPostId = ?`, req.params.id, (error, dbpicture) => {
        if (!error) {
            if (dbpicture[0].postMMField !== null) {
                let picture = dbpicture[0].postMMField.split('/images/')[1];
                if (picture !== undefined) {
                    fs.unlinkSync('images/' + picture);
                }
            }
            connection.query(`DELETE FROM mmpost WHERE mmPostId = ?`, req.params.id, (error) => {
                if (!error) {
                    res.status(200).json({
                        message: 'Post deleted successfully.'
                    });
                } else {
                    res.status(400).json({
                        message: error,
                        message: 'Problem with deleting post!'
                    })
                }
            })
        } else {
            res.status(404).json({
                message: error,
                message: 'Problem with finding the picture.'
            });
        }
    });
}
exports.likeMMPost = (req, res, next) => {
    console.log('6')
    console.log(req.body);
    console.log(req.params.id)
    let postId = req.params.id;
    let userId = req.session.userId;
    if (req.body.like === 1) {
        connection.query(`SELECT postUsersLiked, postUsersDisliked FROM mmpost WHERE mmPostId = ?`, postId, (error, postUsersLiked) => {
            if (!error) {
                let usersLiked = JSON.parse(postUsersLiked[0].postUsersLiked);
                let usersDisliked = JSON.parse(postUsersLiked[0].postUsersDisliked);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersLiked.usersLiked.push(userId);
                    usersLiked = JSON.stringify(usersLiked)
                    usersLiked = { 'postUsersLiked': usersLiked }
                    connection.query(`UPDATE mmpost SET postLikes = postLikes + 1, ? WHERE mmPostId = ?`, [usersLiked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Liked',
                                like: true,
                                dislike: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Like can not be saved',
                                message: error
                            });
                        }
                    });
                } else if (!usersLiked.usersLiked.includes(userId) && usersDisliked.usersDisliked.includes(userId)) {
                    res.status(200).json({
                        message: 'Remove your dislike before liking'
                    })
                } else {
                    usersLiked.usersLiked.splice(usersLiked.usersLiked.indexOf(userId), 1)
                    usersLiked = JSON.stringify(usersLiked)
                    usersLiked = { 'postUsersLiked': usersLiked }
                    connection.query(`UPDATE mmpost SET postLikes = postLikes - 1, ? WHERE mmPostId = ?`, [usersLiked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Liked removed',
                                like: false,
                                dislike: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Like can not be saved',
                                message: error
                            });
                        }
                    });
                }
            } else {
                res.status(404).json({
                    error
                })
            }
        })
    } else if (req.body.like === -1) {
        connection.query(`SELECT postUsersLiked, postUsersDisliked FROM mmpost WHERE mmPostId = ?`, postId, (error, postUsersDisliked) => {
            if (!error) {
                let usersLiked = JSON.parse(postUsersDisliked[0].postUsersLiked);
                let usersDisliked = JSON.parse(postUsersDisliked[0].postUsersDisliked);
                if (!usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    usersDisliked.usersDisliked.push(userId);
                    usersDisliked = JSON.stringify(usersDisliked)
                    usersDisliked = { 'postUsersDisliked': usersDisliked }
                    connection.query(`UPDATE mmpost SET postDislikes= postDislikes + 1, ? WHERE mmPostId = ?`, [usersDisliked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Disliked',
                                dislike: true,
                                like: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Dislike can not be saved',
                                message: error
                            });
                        }
                    });
                } else if (usersLiked.usersLiked.includes(userId) && !usersDisliked.usersDisliked.includes(userId)) {
                    res.status(200).json({
                        message: 'Remove your like before disliking'
                    })
                } else {
                    usersDisliked.usersDisliked.splice(usersDisliked.usersDisliked.indexOf(userId), 1)
                    usersDisliked = JSON.stringify(usersDisliked)
                    usersDisliked = { 'postUsersDisliked': usersDisliked }
                    connection.query(`UPDATE mmpost SET postDislikes= postDislikes - 1, ? WHERE mmPostId = ?`, [usersDisliked, postId], (error) => {
                        if (!error) {
                            res.status(202).json({
                                message: 'Dislike removed',
                                dislike: false,
                                like: false
                            })
                        } else {
                            res.status(400).json({
                                message: 'Dislike can not be saved',
                                message: error
                            });
                        }
                    });
                }
            } else {
                res.status(404).json({
                    error
                })
            }
        })
    }
}
exports.searchMM = (req, res, next) => {
    console.log('7')
    console.log(req.body);
    console.log(req.params.id)

}