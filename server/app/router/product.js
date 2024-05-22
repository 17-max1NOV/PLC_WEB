const express = require('express');
const router = express.Router();
const productController =require('../controller/product');
router.get('/',productController.getList);
router.get('/deatil-realtime',productController.getLatestRecord);
module.exports = router;