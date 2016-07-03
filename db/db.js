var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = require('../conf/conf.js')



var client = new pg.Client(config);
client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
client.connect();

var _select = function(sqlstring,callback ) {
   var cq= client.query(
      sqlstring
      ,
        function(err, result) {
            // console.log(result.rows[0].name) // output: brianc
            if (err) {
                console.error('error running query', err);
            }
          callback(result);
    }
  );
  // cq.on('row', function(row) {
  //   // assert.equal("brian@example.com", row.email);
  //   callback(row);
  // });
};

module.exports.dbselect = _select;
