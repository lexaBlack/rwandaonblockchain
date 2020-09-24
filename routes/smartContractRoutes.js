var express =require('express');
const SmartContract = require('../controller/smartContractsController');
var router =express.Router();


router.post('/transactions/new',SmartContract.addNewBlock);
router.get('/mine',SmartContract.Acknowledging);
router.get('/chain',SmartContract.Acknowledging);


module.exports = router;