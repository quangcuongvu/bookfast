var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/dang-nhap', function(req, res, next) {
  res.render('signin');
});
router.get('/dang-ky', function(req, res, next) {
  res.render('signup');
});


module.exports = router;
