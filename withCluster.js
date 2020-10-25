

const port = 3000;
const os = require("os");
const cluster = require("cluster");
let workers = [];

if (cluster.isMaster) {
	//master process
	const n_cpus = os.cpus().length;
	console.log(`Forking ${n_cpus} CPUs`);
	for (let i = 0; i < n_cpus; i++) {
        // creating workers and pushing reference in an array
        // these references can be used to receive messages from workers
        workers.push(cluster.fork());

       // to receive messages from worker process
        workers[i].on('message', function(message) {
            console.log(message);
        });        
	}


    // if any of the worker process dies then start a new one by simply forking another one
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
        workers.push(cluster.fork());
        // to receive messages from worker process
        workers[workers.length-1].on('message', function(message) {
            console.log(message);
        });
    });
    	
} else {
	//workerProcess
	const express = require("express");
	const app = express();
	const {spawn } = require('child_process');
	const pid = process.pid;

	const server = app.listen(port, () => {
		console.log(`Server:process ${pid} is listening at http://localhost:${port}`);
	});

	app.get("/", (req, res, next) => {
		for (var i = 0; i < 2e6; i++) {}
		res.send("Server says hi!");
	});
}
