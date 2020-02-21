// Get all jobs assigned to {uid} for {companyId}
// Endpoint: /companies/{companyId}/users/{uid}/jobs

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
  pool.getConnection(function (error, connection) {
    let sqlquery = 'SELECT j.* FROM Company_Users cu NATURAL JOIN Jobs j NATURAL JOIN Users_Have_Jobs uj WHERE companyId=' + event['pathParameters']['companyId'] + ' AND userId=' + event['pathParameters']['uid'] + ';';
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

