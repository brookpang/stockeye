var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;
var async = require('async');



var getaccstats = function(callback) {

    var sqlaccstatics = 'select  * from (select c_yearmonthday,round(h_p_change,3) h_p_change,round(h_p_acc*100,1) h_p_acc from acc2 order by c_yearmonthday desc limit 1) a,(select round(max(h_p_acc*100),1) as max_h_p_acc,round(min(h_p_acc*100),1) as min_h_p_acc,round(max(h_p_change),3) as max_h_p_change,round(min(h_p_change),3) as min_h_p_change from acc2) b';
    // var accstas ='';
    dbselect(sqlaccstatics, function(result) {
        var accstas = result.rows[0];
        // console.log(accstas);
        callback(null, accstas);
    });

};
// h_p_change = new Array();
// h_p_acc = new Array();
// c_yearmonthday = new Array();

var getacc = function(accstas, callback2) {
    var sqlacc = 'select c_yearmonthday,round(h_p_acc*100,3) h_p_acc,round(h_p_change,3) h_p_change from acc2 order by c_yearmonthday';
    dbselect(sqlacc, function(result) {
        var accrows = result.rows;
        var c_yearmonthday = new Array(),
            h_p_change = new Array(),
            h_p_acc = new Array();
        for (var i = 0; i < accrows.length; i++) {
            c_yearmonthday.push(accrows[i].c_yearmonthday);
            h_p_change.push(accrows[i].h_p_change);
            h_p_acc.push(accrows[i].h_p_acc);
        }
        callback2(null, accstas, c_yearmonthday, h_p_change, h_p_acc);
    });
};



router.get('/', function(req, res, next) {
    var getrender = function(accstas, c_yearmonthday, h_p_change, h_p_acc, callback3) {
        callback3(accstas, c_yearmonthday, h_p_change, h_p_acc);
        res.render('acc', {
            accstas: accstas,
            c_yearmonthday: c_yearmonthday,
            h_p_acc: h_p_acc,
            h_p_change: h_p_change
        });


    };

    async.waterfall([
        getaccstats,
        getacc,
        getrender,
    ]);


});

module.exports = router;
