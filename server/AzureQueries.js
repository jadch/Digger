const sql = require('mssql');

// Function that returns the Electronic table length (the number of rows in the table)
function queryElectronicTableLength(pool) {
  return pool.request()
    .query(`SELECT COUNT(MasterId)
    FROM Electronic`)
    .then(result => parseInt(result.recordsets[0][0][''], 10));
}

// Function that gets an album from the Electronic table,
// at a specified row position
function queryAlbumAtRow(pool, row) {
  return pool.request()
    .input('row', sql.Int, row)
    .query(` SELECT * FROM Electronic
     ORDER BY MasterId
     OFFSET @row ROWS FETCH NEXT 1 ROWS ONLY`)
    .then(result => result.recordsets[0][0]);
}


module.exports = {
  queryAlbumAtRow,
  queryElectronicTableLength,
};
