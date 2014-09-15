
var argv = require('minimist')(process.argv.slice(2));
var options = {
		"socket": 	"socket" 	in argv ? argv.socket : "/",
		"port": 	"port" 		in argv ? argv.port : process.env.PORT || 8080,
		"static": 	"static" 	in argv ? argv.static : "./public",
		"showDir": 	"showDir" 	in argv || argv._.indexOf("showDir") !== -1,
	};

var fs = require('fs');
var url = require('url');
var path = require('path');
var static = require('node-static');
var showDir = require('ecstatic').showDir({
		root:process.cwd(),
		baseDir:options.static,
	});

var PeerServer = require('peer').PeerServer;

var server = new PeerServer({
		port: options.port,
		path: options.socket,
	});
var net = {
		work: {},
		play: {},
	};
var iter = {
		ator: null,
		atee: [],
	};

var protobind = function scope (prototype, callable) {
		callable.prototype = prototype;
		return callable;
	};

console.log("server online: " + JSON.stringify(argv));

server.on('connection', protobind({

	oncycle: protobind({
		timeout: 90000,
		delay: 250,
		server: server,
		net: net,
		iter: iter,
		console: console,
		Object: Object,
		Number: Number,
	}, function scope () {
		var __ = scope.prototype;

		var mesh = null;
		var tuple = null;
		var client = null;
		var delta = 0;

		if (__.iter.ator === null) {

			__.iter.atee = __.Object.keys(__.net.work);
			__.iter.ator = 0;
		}

		if (__.iter.atee.length > __.iter.ator) {
			mesh = __.iter.atee[__.iter.ator++];
			tuple = __.net.work[mesh];
			client = tuple && __.server._clients.peerjs[tuple.arbiter];
			delta = Date.now() - __.Number(tuple && tuple.timestamp);
			if (!client ||
				!client.socket) {
				__.console.log("missing: "+tuple.arbiter);
				__.net.work[mesh] = null;
				if (__.net.play[mesh]) {
					__.net.play[mesh] = null
				}
			} else if (delta > __.timeout) {
				__.console.log("timeout: "+tuple.arbiter+" ("+delta+")");
				client.socket.close();
				__.net.work[mesh] = null;
				if (__.net.play[mesh]) {
					__.net.play[mesh] = null
				}
			} else {
				__.net.play[mesh] = __.net.work[mesh];
			}
		} else {
			__.net.work = __.net.play;
			__.net.play = {};
			__.iter.ator = null;
		}

		if (__.iter.ator !== null ||
			__.iter.atee.length > 0) {
			setTimeout(scope, __.delay);
		}
	}),



	onmessage: protobind({

		server: server,
		net: net,
		iter: iter,
		String: String,
		JSON: JSON,
		console: console,

	}, function scope (data, id, oncycle) {
		var __ = scope.prototype;

		try {
			var message = JSON.parse(data);
			var type = message && message.type;
			var viaduce;
			var mesh;
			var tuple = null;
			var arbiter = null;
			var client;
			var sock;
			if (type === "viaduce") {
				__.console.log("viaduce");
				viaduce = message.viaduce;
				if (viaduce === "join") {
					mesh = __.String(message.mesh);
					if (tuple = __.net.work[mesh]) {
						__.net.play[mesh] = tuple;
						arbiter = tuple.arbiter;
						client = __.server._clients.peerjs[arbiter];
						if (!client || !client.socket) {
							arbiter = null;
						} else {
							tuple.timestamp = Date.now();
							__.console.log("arbiter: "+arbiter);
						}
					}

					this.send(JSON.stringify({
						type: "viaduce",
						viaduce: viaduce,
						mesh: mesh,
						arbiter: arbiter !== null ? arbiter : id,
					}));

					if (arbiter === null) {
						__.console.log("arbiter: null ("+__.iter.atee.length+")");
						tuple = {
							arbiter: id,
							timestamp: Date.now(),
						};
						__.net.work[mesh] = __.net.play[mesh] = tuple;
						if (__.iter.atee.length === 0) {
							oncycle();
						}
					}
				}
			}
		} catch (e) {
			__.console.log("message error: "+e);
		}
	}),



	console: console,
}, function scope (id) {
	var __ = scope.prototype;

	var socket = this._clients.peerjs[id].socket;

	socket.on("message", protobind({
		onmessage: __.onmessage,
		oncycle: __.oncycle,
		id: id,
	}, function scope (data) {
		var $$ = scope.prototype;

		return $$.onmessage.call(this, data, $$.id, $$.oncycle);
	}));

	__.console.log("found: "+id);
}));

server.on('disconnect', protobind({

	console: console,
}, function scope (id) {
	var __ = scope.prototype;

	__.console.log("lost: "+id);
}));



var file = new static.Server(options.static);

server._app.get(/.*/, function (request, response) {
	var pathname = url.parse(request.url).pathname;
	var fullpath = path.join(process.cwd(), options.static , pathname);

	fs.stat(fullpath, function (err, stat) {

		if (err) {
			console.log("fnf: "+pathname);
			response.end("File not found.");
			return;
		}

		//console.log("path: "+pathname);

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
});
server._app.listen(options.port);





