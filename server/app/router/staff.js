const express = require('express');
const router = express.Router();
const staffController =require('../controller/staff');
router.get('/',staffController.getList);
router.post('/create',staffController.createAcction);
router.put('/update/:id',staffController.updateAcction);
module.exports = router;