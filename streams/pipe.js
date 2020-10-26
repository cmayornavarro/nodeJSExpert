var fs = require('fs');
var readableStream = fs.createReadStream('file.txt');
var writableStream = fs.createWriteStream('file2.txt');

readableStream.pipe(writableStream);

/*
The above snippet makes use of the pipe() function to write the content of file1 to file2. 
As pipe() manages the data flow for you, you should not worry about slow or fast data flow. 
This makes pipe() a neat tool to read and write data. You should also note that pipe() returns 
the destination stream. So, you can easily utilize this to chain multiple streams together. 

*/