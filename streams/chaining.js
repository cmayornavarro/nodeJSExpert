var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('test.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('output.txt'));

/*
First, we create a simple readable stream from the file input.txt.gz. 
Next, we pipe this stream into another stream zlib.createGunzip() to
 un-gzip the content. Lastly, as streams can be chained, we add a writable 
 stream in order to write the un-gzipped content to the file.

*/