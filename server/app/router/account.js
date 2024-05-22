const express = require('express');
const router = express.Router();
const staffController =require('../controller/staff');
router.post('/login',staffController.login);
router.post('/get-new-assettoken',staffController.getNewAssettoken);
router.post('/logout',staffController.logout);
module.exports = router;