
var argv = require('minimist')(process.argv.slice(2));
var options = {
		"socket": 		"socket" 		in argv ? argv.socket : 8081,
		"socket-path": 	"socket-path" 	in argv ? argv["socket-path"] : "/",
		"port": 		"port" 			in argv ? argv.port : 8080,
		"static": 		"static" 		in argv ? argv.static : "./public",
		"showDir": 		"showDir" 		in argv || argv._.indexOf("showDir") !== -1,
	};

var fs = require('fs');
var url = require('url');
var path = require('path');
var static = require('node-static');
var showDir = require('ecstatic').showDir({
		root:process.cwd(),
		baseDir:options.static,
	});





var file = new static.Server(options.static);

require('http').createServer(function (request, response) {
	var pathname = url.parse(request.url).pathname;
	var fullpath = path.join(process.cwd(), options.static , pathname);
	
	fs.stat(fullpath, function (err, stat) {
		
		if (err) {
			console.log("fnf: "+pathname);
			response.end("File not found.");
			return;
		}

		console.log("path: "+pathname);

		if (options.showDir && stat.isDirectory()) {
			fs.exists(path.join(fullpath, "index.html"), function (exists) {
				if (!exists) {
					showDir(request, response);
				} else {
					request.addListener('end', function () {
						file.serve(request, response);
					}).resume();
				}
			});
			
			return;
		}

		request.addListener('end', function () {
			file.serve(request, response);
		}).resume();
	})
}).listen(process.env.PORT || options.port);


