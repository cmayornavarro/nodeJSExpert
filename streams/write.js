var fs = require('fs');
var readableStream = fs.createReadStream('file.txt');
var writableStream = fs.createWriteStream('file2.txt');

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
    writableStream.write(chunk);
});

/*
nd, .pipe() has backflow handling, something your code does not. 
When you call res.write() it returns a boolean. If that boolean is true,
 then the write buffer is full and you should not be calling res.write()
  again until the drain event occurs. Note, your code does not do that. So,
   .pipe() is more complete than what many people will typically write themselves.
*