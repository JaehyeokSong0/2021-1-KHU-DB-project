var dbConnection = require('./connection');

function getPharmsInfo (callback){
    var queryString = 'SELECT * from pharm_info';
    dbConnection.query(queryString, (error,rows) => {
      if(error) throw error;
      callback(rows);
    });
}

module.exports = {
    getPharmsInfo
}