var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;

/* GET recommend page. */
var sqlrecommend = 'select c_yearmonthday,code,name,predict from predict_head order by c_yearmonthday desc';
router.get('/', function(req, res, next) {
  dbselect(sqlrecommend, function(result) {
        console.log(result.rows);
        var code = result.rows[0].code;
        var name = result.rows[0].name;
        console.log(code);
        res.render('recommend', {
            code: code,
            name: name
        });
  });






});

module.exports = router;
