const express = require('express');
const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/contactus', contactController.getContactPage);

router.get('/success', contactController.getSuccessPage);

module.exports = router;