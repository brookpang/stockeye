var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;

var sqlaccstatics = 'select  * from (select c_yearmonthday,round(h_p_change,4) h_p_change,round(h_p_acc,4) h_p_acc from acc2 order by c_yearmonthday desc limit 1) a,(select round(max(h_p_acc),4) as max_h_p_acc,round(min(h_p_acc),4) as min_h_p_acc,round(max(h_p_change),4) as max_h_p_change,round(min(h_p_change),4) as min_h_p_change from acc2) b';
var accstas = '';
dbselect(sqlaccstatics, function(result) {
    accstas = result.rows[0];
});

router.get('/', function(req, res, next) {
    res.render('acc', {
        accstas: accstas
    });
});

module.exports = router;
