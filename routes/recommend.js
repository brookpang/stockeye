var express = require('express');
var router = express.Router();
var dbselect = require('../db/db').dbselect;
var async = require('async');
/* GET recommend page. */
var recomstas = function(callback1) {
    var sqlstatics = 'select round(p_mean,4) p_mean,round(p_std,4) p_std,round(p_min,4) p_min,round(p25,4) p25,round(p50,4) p50,round(p75,4) p75,round(p_max,4) p_max from predict_statics order by c_yearmonthday desc limit 1';

    dbselect(sqlstatics, function(result) {
        var stas = result.rows[0];
        callback1(null, stas);
    });

};

var recom = function(stas, callback2) {
    var sqlrecommend = 'select c_yearmonthday,code,name,round(predict,4) as predict from predict_head order by c_yearmonthday desc,predict desc limit 2';
    dbselect(sqlrecommend, function(result) {
        var rec = result.rows;
        callback2(null, stas, rec);
    });

};

router.get('/', function(req, res, next) {
    var getrender = function(stas, rec, callback3) {
        callback3(stas, rec);
        res.render('recommend', {
            stas: stas,
            rec: rec
        });
    };

    async.waterfall([
        recomstas,
        recom,
        getrender
    ]);
});

module.exports = router;
