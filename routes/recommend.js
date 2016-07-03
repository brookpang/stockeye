var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;

/* GET recommend page. */
var sqlrecommend = 'select c_yearmonthday,code,name,predict from predict_head order by c_yearmonthday desc';
router.get('/', function(req, res, next) {
    dbselect(sqlrecommend, function(result) {
        res.render('recommend', {
          rows:result.rows
        });
    });
});

module.exports = router;
