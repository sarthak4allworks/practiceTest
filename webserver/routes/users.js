var express = require('express');
var router = express.Router();
var user = require('../controller/controller.js');

/* GET users listing. */
router.get('/login', user.login);

router.post('/login', user.chklogin);

router.get('/abc/:pqr/:stu/:xyz', user.showQuestions);

module.exports = router;
