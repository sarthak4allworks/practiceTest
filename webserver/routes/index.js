var express = require('express');
var router = express.Router();
var control = require('../controller/controller.js');

/* GET home page. */
router.get('/', control.front);

router.get('/register_form', control.register);

router.post('/register', control.registration);

router.get('/after_login', control.after_login);

router.get('/after_practice' , control.after_practice);

router.get('/after_select_test', control.after_select_test);

router.get('/logout', control.logout);

router.get('/a/:xyz', control.select_types);

router.get('/select_subtypes/:ab/:abc', control.select_subtypes);

router.get('/myProfile', control.myProfile);

router.get('/editProfile', control.editProfile);

router.post('/profileEdit', control.profileEdit);

router.get('/test/instructions/:testId', control.instructions);

router.get('/after_start_test', control.after_start_test);

router.post('/showResult', control.show_result);

router.get('/viewRankings/:abcd', control.viewRankings);

module.exports = router;
