const express = require('express');
const router = express.Router();
const planController =require('../controller/plan');
router.get('/',planController.getList);
router.post('/create',planController.createAcction);
router.put('/update/:id',planController.updateAcction);
router.delete('/delete/:id',planController.deleteAcction);
router.get('/list',planController.getListExcel);
module.exports = router;