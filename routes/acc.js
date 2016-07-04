var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;


var sqlaccstatics = 'select  * from (select c_yearmonthday,round(h_p_change,3) h_p_change,round(h_p_acc,3) h_p_acc from acc2 order by c_yearmonthday desc limit 1) a,(select round(max(h_p_acc),3) as max_h_p_acc,round(min(h_p_acc),3) as min_h_p_acc,round(max(h_p_change),3) as max_h_p_change,round(min(h_p_change),3) as min_h_p_change from acc2) b';
var accstas = '';
dbselect(sqlaccstatics, function(result) {
    accstas = result.rows[0];
});
var sqlacc = 'select c_yearmonthday,round(h_p_acc,3) h_p_acc,round(h_p_change,3) h_p_change from acc2 order by c_yearmonthday';
// var c_yearmonthday = new Array();
var h_p_change = new Array();
var h_p_acc = new Array();
var c_yearmonthday = new Array();
dbselect(sqlacc, function(result) {
    var accrows = result.rows;
    for (var i = 0; i < accrows.length; i++) {
        c_yearmonthday = new Array();
        h_p_change = new Array();
        h_p_acc = new Array();
        c_yearmonthday.push(accrows[i].c_yearmonthday);
        h_p_change.push(accrows[i].h_p_change);
        h_p_acc.push(accrows[i].h_p_acc);
    }
});
router.get('/', function(req, res, next) {
    res.render('acc', {
        accstas: accstas,
      c_yearmonthday: c_yearmonthday,
      h_p_acc: h_p_acc,
      h_p_change:h_p_change
    });
});

module.exports = router;
