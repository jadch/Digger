const sql = require('mssql');

// Function that Gets an album from the Electronic table,
// at a specified row position
function queryAlbumAtRow(pool, row) {
  return pool.request()
    .input('row', sql.Int, row)
    .output('output_parameter', sql.VarChar(250))
    .query(` SELECT * FROM Electronic
     ORDER BY MasterId
     OFFSET @row ROWS FETCH NEXT 1 ROWS ONLY`)
    .then(result => result.recordsets[0][0]);
}


module.exports = {
  queryAlbumAtRow,
};
