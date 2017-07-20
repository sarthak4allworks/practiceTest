var express = require('express');
var router = express.Router();
var control = require('../apiController/controller.js');

/* GET home page. */

router.post('/register',control.register);

router.post('/login', control.login);

router.get('/findSelectData', control.findSelectData);

router.get('/findSelectTypesData/:xy', control.findSelectTypesData);

router.get('/findSelectSubTypesData/:ab', control.findSelectSubTypesData);

router.get('/showQuestions/:abc', control.showQuestions);

router.get('/myProfile/:bcd', control.myProfile);

router.get('/editProfile/:rolln', control.editProfile);

router.post('/profileEdit', control.profileEdit);

router.get('/showTestId/:sub', control.showTestId);

router.get('/testQuestions/:testq/:roll', control.testQuestions);

router.post('/showResult', control.showResult);

router.post('/instructions', control.instructions);

router.post('/viewRankings', control.viewRankings);

module.exports = router;
