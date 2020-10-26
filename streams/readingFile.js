var fs = require("fs");
var readableStream = fs.createReadStream("file.txt");
var data = "";

/*
The function call fs.createReadStream() gives you a readable stream. Initially, 
the stream is in a static state. As soon as you listen to data event and attach a 
callback it starts flowing. After that, chunks of data are read and passed to your 
callback. The stream implementor decides how often data event is emitted. For example,
 an HTTP request may emit a data event once a few KB of data are read. When you are reading
  data from a file you may decide you emit data event once a line is read.

When there is no more data to read (end is reached), the stream emits an end event.
In the above snippet, we listen to this event to get notified when the end is reached.

*/
readableStream.on("data", function (chunk) {
	data += chunk;
});

readableStream.on("end", function () {
	console.log(data);
});
