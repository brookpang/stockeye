var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;
var async = require('async');

/* GET recommend page. */
var recomh = function(callback1) {
    var sqlrecommendh = 'select substr(c_yearmonthday,6,5) as c_yearmonthday,code,name,round(predict,4) as predict,round(p_change,2) p_change,round(acc,0 )  acc from acc1 order by c_yearmonthday desc,predict desc limit 20';
    dbselect(sqlrecommendh, function(result) {
        var res_h = result.rows;
        callback1(null, res_h);
    });

};


router.get('/', function(req, res, next) {
    var getrender = function(res_h, callback2) {
        callback2(res_h);
        res.render('recommendh', {
            res_h: res_h
        });
    };
    async.waterfall([recomh, getrender]);
});

module.exports = router;
