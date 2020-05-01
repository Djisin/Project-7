exports.search = (req, res, next) => {
    if (req.body.searchAreaOption === 'articles') {
        searchTitle = '%' + req.body.searchInputVal + '%';
        connection.query(`SELECT postTitle, postId FROM post WHERE postTitle LIKE ? LIMIT 5`, searchTitle, (error, foundTitle) => {
            if (!error) {
                res.status(200).json({
                    'foundUser': null,
                    'foundTitle': foundTitle
                });
            } else {
                res.status(400).json({
                    error: error
                });
            }
        });
    } else if (req.body.searchAreaOption === 'users') {
        searchUsername = '%' + req.body.searchInputVal + '%';
        connection.query(`SELECT username, userId FROM user WHERE username LIKE ? LIMIT 5`, searchUsername, (error, foundUser) => {
            if (!error) {
                res.status(200).json({
                    'foundUser': foundUser,
                    'foundTitle': null
                });
            } else {
                res.status(400).json({
                    error: error
                });
            }
        });
    } else {
        res.status(400).json({
            message:'Wrong input'
        });
    }
}