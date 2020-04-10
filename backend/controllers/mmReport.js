connection = require('../connection');

exports.submitReport = (req, res, next) => {
    console.log('report');
    console.log(req.body)
    console.log(req.params.id)
}