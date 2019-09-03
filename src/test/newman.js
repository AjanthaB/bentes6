const newman = require('newman');
const fs = require('fs');

// read the current directory 
fs.readdir(__dirname, (err, files) => {
  if (err) { throw err; }

  // we filter all files with JSON file extension
  files = files.filter( (file) => {
    return (/^((?!(package(-lock)?))|.+)\.json/).test(file);
  });

  // now we iterate on each file name and call newman.run using each file name
  files.forEach( (file) => {
    newman.run({
      collection: require(`${__dirname}/${file}`),
      reporters: 'cli',
    }, function (err) {
      // finally, when the collection executes, print the status
      console.info(`${file}: ${err ? err.name : 'ok'}!`);
    });
  });
});