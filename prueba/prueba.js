// En la var http requerimos el modulo http
const http = require('http');
const fs = require('fs');

const hostname = "127.0.0.1";
const port = 3000;

fs.readFile("prueba.html",(err,html) => {
	if(err) {
		throw err;
	}


	const server = http.createServer((req,res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','text/html');
		res.write(html);
		res.end("hello");
	});

	server.listen(port,hostname, () => {
		console.log("Server corriendo en el puerto " + port);
	});

});