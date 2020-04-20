const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.session.token //req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'I23QLDc9mUczzZSxCYndC6SGrSPeX543lHjaAsWNrvgCBaXaVB80JYdKyP36');
        const userId = decodedToken.userId;
        if (req.session.userId && req.session.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch{
        res.status(401).json({
            error: new Error('Invalid request'),
            message: 'You are not authenticated'
        });
    }
};