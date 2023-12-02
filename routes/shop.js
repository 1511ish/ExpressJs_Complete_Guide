// const express = require('express');
// const path = require('path');
// const rootDir = require('../util/path');

// const router = express.Router();

// router.get('/', (req, res, next) => {
//     // res.sendFile(path.join(__dirname,'../','views','shop.html'));
//     //                           OR
//     // res.sendFile(path.join(__dirname,'..','views','shop.html'));
//     //                           OR
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// })

// module.exports = router;





const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;