var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;

/* GET recommend page. */
var sqlrecommend = 'select c_yearmonthday,code,name,round(predict,4) as predict from predict_head order by c_yearmonthday desc limit 2';
var sqlstatics = 'select round(p_mean,4) p_mean,round(p_std,4) p_std,round(p_min,4) p_min,round(p25,4) p25,round(p50,4) p50,round(p75,4) p75,round(p_max,4) p_max from predict_statics order by c_yearmonthday desc limit 1';
var stas = '';
var rec = '';
dbselect(sqlstatics, function(result) {
    stas = result.rows[0];
});
dbselect(sqlrecommend, function(result) {
    rec = result.rows;
});

router.get('/', function(req, res, next) {
    res.render('recommend', {
        stas: stas,
        rec: rec
    });
});

module.exports = router;
