var pg = require('pg');

var config = require('../conf/conf.js');
var Pool = pg.Pool;
var pool = new Pool(config);


var _select = function(sqlstring, callback) {
    pool.query(sqlstring, function(err, result) {
        // handle an error from the query
        if (err) return onError(err);
      callback(result);
    });
};

// var client = new pg.Client(config);
// client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
// client.connect();

// var _select = function(sqlstring,callback ) {
//    var cq= client.query(
//       sqlstring
//       ,
//         function(err, result) {
//             // console.log(result.rows[0].name) // output: brianc
//             if (err) {
//                 console.error('error running query', err);
//             }
//           callback(result);
//     }
//   );
//   // cq.on('row', function(row) {
//   //   // assert.equal("brian@example.com", row.email);
//   //   callback(row);
//   // });
// };

module.exports.dbselect = _select;
