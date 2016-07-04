var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;

/* GET recommend page. */
var sqlrecommendh = 'select substr(c_yearmonthday,6,5) as c_yearmonthday,code,name,round(predict,4) as predict,round(p_change,4) p_change,round(acc,4)  acc from acc1 order by c_yearmonthday desc,predict desc limit 20';
var res_h = '';
dbselect(sqlrecommendh, function(result) {
    res_h = result.rows;
});

router.get('/', function(req, res, next) {
    res.render('recommendh', {
        res_h: res_h
    });
});

module.exports = router;
