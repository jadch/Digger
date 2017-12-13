const { Request, TYPES } = require('tedious');

// Function that creates a Masters database
function createMastersDatabase(connection) {
  console.log('Creating Masters database...');

  // Read all rows from table
  const request = new Request(
    `CREATE TABLE Masters(
      MasterID int,
      MainReleaseID int,
      Year int,
      Title varchar(255),
      Blues BIT,
      BrassMilitary BIT,
      Childrens BIT,
      Classical BIT,
      Electronic BIT,
      FolkWorld BIT,
      FunkSoul BIT,
      HipHop BIT,
      Jazz BIT,
      Latin BIT,
      NonMusic BIT,
      Pop BIT,
      Reggae BIT,
      Rock BIT,
      StageScreen BIT,
    )`,
    ((err, res) => {
      if (err) { console.log(err); }
      console.log('Done! ', res);
      process.exit();
    }),
  );

  connection.execSql(request);
}

// Function that tests inserting a row in the Masters database
function testInsertRowInMasters(connection) {
  const request = new Request(`
    INSERT Masters
      (MasterID, MainReleaseID, Year, Title, Blues, BrassMilitary, Childrens, Classical, Electronic, FolkWorld, FunkSoul, HipHop, Jazz, Latin, NonMusic, Pop, Reggae, Rock, StageScreen)
    VALUES
      (@MasterID, @MainReleaseID, @Year, @Title,
      @Blues, @BrassMilitary, @Childrens, @Classical, @Electronic, @FolkWorld, @FunkSoul, @HipHop, @Jazz, @Latin, @NonMusic, @Pop, @Reggae, @Rock, @StageScreen);`, ((err) => {
      if (err) {
        console.log(err);
      }
    }));
  request.addParameter('MasterID', TYPES.Int, 16659);
  request.addParameter('MainReleaseID', TYPES.Int, 233544);
  request.addParameter('Title', TYPES.NVarChar, 'Finally Working - Hey');
  request.addParameter('Year', TYPES.Int, 2017);
  // Genres
  request.addParameter('Blues', TYPES.Int, 0);
  request.addParameter('BrassMilitary', TYPES.Int, 0);
  request.addParameter('Childrens', TYPES.Int, 0);
  request.addParameter('Classical', TYPES.Int, 0);
  request.addParameter('Electronic', TYPES.Int, 1);
  request.addParameter('FolkWorld', TYPES.Int, 0);
  request.addParameter('FunkSoul', TYPES.Int, 0);
  request.addParameter('HipHop', TYPES.Int, 0);
  request.addParameter('Jazz', TYPES.Int, 0);
  request.addParameter('Latin', TYPES.Int, 1);
  request.addParameter('NonMusic', TYPES.Int, 0);
  request.addParameter('Pop', TYPES.Int, 0);
  request.addParameter('Reggae', TYPES.Int, 0);
  request.addParameter('Rock', TYPES.Int, 0);
  request.addParameter('StageScreen', TYPES.Int, 0);

  connection.execSql(request);
}

module.exports = {
  createMastersDatabase,
  testInsertRowInMasters,
};
