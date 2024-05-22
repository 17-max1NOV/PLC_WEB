const express = require('express');
const router = express.Router();
const statisticalController =require('../controller/statistical');
router.post('/staticical',statisticalController.getdataValue);
router.get('/staticical-percent',statisticalController.getdataPercent);
router.get('/staticical-total',statisticalController.getdataPercent);
router.post('/staticical-plan-Reality',statisticalController.getPlanReality);
module.exports = router;