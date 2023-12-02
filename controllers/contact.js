const rootDir = require('../util/path');

exports.getContactPage = (req, res, next) => {
    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
    //                           OR
    // res.sendFile(path.join(__dirname,'..','views','shop.html'));
    //                           OR
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
}

exports.getSuccessPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
}