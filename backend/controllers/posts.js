const connection = require('../connection');

exports.createPost = (req, res, next) => {
    let today = new Date();
    console.log('*******************create post console')
    console.log(req.session.userId)
    let post = {
        'userId': req.session.userId,
        'postTitle': req.body.postTitle,
        'postText': req.body.postText,
        'postPicture': '',
        'postLikes': '0',
        'postDislikes': '0',
        'postUserLiked': JSON.stringify({}),
        'postUserDisliked': JSON.stringify({}),
        'postTimeCreated': today,
        'edited': false,
        'timeEdited': null,
    };
    connection.query('INSERT INTO post SET ?', post, (error, result) => {
        if (!error) {
            console.log("Post added to the db")
            res.status(200).json({ message: 'Post created!' })
        } else {
            res.status(401).json({ message: error })
        }
    })
}

exports.getOnePost = (req, res, next) => {
    let postId = {
        postId: req.params.id
    }
    connection.query('SELECT post.*, user.username FROM post INNER JOIN user ON post.userId=user.userId WHERE ?', postId, (error, post) => {
        if (!error) {
            if (req.session.userId && req.session.token) {// pogresan if, treba da se proveri da li pravi user, ne dali ga uopte ima
                res.status(200).json({
                    post: post,
                    userCreatedThisPost: true
                })
            } else {
                res.status(200).json({
                    post: post
                })
            }
        } else {
            res.status(404).json({ error })
        }
    });
}

exports.getAllPosts = (req, res, next) => {
    //console.log(req)
    connection.query('SELECT post.*, user.username FROM post INNER JOIN user ON post.userId=user.userId ORDER BY postTimeCreated DESC', (error, posts) => {
        if (!error) {
            res.status(200).json({ posts })
        } else {
            //console.log(posts)
            res.status(404).json({ error })
        }
    });
};

exports.modifyPost = (req, res, next) => {
    let today = new Date();
    let post = {
        'postTitle': req.body.postTitleModified,
        'postText': req.body.postTextModified,
        'postPicture': req.body.postPictureModified,
        'edited': true,
        'timeEdited': today,
    };
    connection.query('UPDATE post SET ? WHERE postId=' + req.params.id, post, (error) => {
        if (!error) {
            res.status(200).json({ message: 'Post successfully updated' })
        } else {
            res.status(404).json({ error })
        }
    });
}
exports.deletePost = (req, res, next) => {
    connection.query('DELETE FROM post WHERE postId=?', req.params.id, (error) => {
        if (!error) {
            res.status(200).json({ message: 'Post is successfully deleted' })
        } else {
            res.status(404).json({ error })
        }
    });
}
exports.likesPost = (req, res, next) => {
    let postId = {
        postId: req.params.id
    }
}
