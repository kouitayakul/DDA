// Get all users for {companyId}
// Endpoint: /companies/{companyId}/users

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
    let sqlquery = 'SELECT u.* FROM Company_Users cu JOIN Users u ON cu.userId=u.code WHERE cu.companyId=' + event['pathParameters']['companyId']  +  ';';
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

