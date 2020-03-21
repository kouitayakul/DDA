// Create a new company
// Endpoint: /companies

let mysql = require('mysql');
let config = require('./config.json');

let pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

exports.handler = (event, context, callback) => {
  console.log(event);
  context.callbackWaitsForEmptyEventLoop = false;
  let body = JSON.parse(event.body);

  pool.getConnection(function (error, connection) {
    let sqlquery = 'INSERT INTO Companies (name, address, empId) VALUES ("' + body.name + '","' + body.address + '","' + body.empId + '");';
    connection.query(sqlquery, function (error, results, fields) {
      connection.release();
      let response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {},
        "body": JSON.stringify(results)
      }
      if (error) {
        callback(error);
      } else {
        callback(null, response);
      }
    });
  });
};

