
!({
	gname: null,
	fname: typeof __filename !== "undefined" ? __filename : "viaduce.js",
	dname: typeof __dirname !== "undefined" ? __dirname : "",
	nname: typeof nickname !== "undefined" ? nickname : null,
	require: typeof require !== "undefined" ? require : null,
	define: typeof define !== "undefined" ? define : null,
	module: typeof module !== "undefined" ? module : null,
	global: typeof global !== "undefined" ? global : null,
	window: typeof window !== "undefined" ? window : null,
	identity: function (it) { return it; },
	val: function (tuple) {
		if (tuple[1]) return tuple[1];
		else try { return this(tuple[0]); } catch (e) { return e; }
	},
	str: function (tuple) { return this(tuple[0]); },
	protobind: function (target) { return target.prototype = this, target; },
}.protobind(function publish (dependencies, exporter) {
	var __ = publish.prototype;
	var m = __.protobind.call(this, exporter);
	var c = __.global || __.window || this;
	var a = dependencies;
	var n = __.identity;
	if (typeof __.nname === "function") n = __.nname (__.dname, __.fname);
	else try { n = __.require("nickname") (__.dname, __.fname); } catch (e) {}
	if (__.define && __.define.amd) return __.define(a.map(__.str, n), m.bind(c));
	if (__.module) return __.module.exports = m.apply(c, a.map(__.val, n));
	var r = m.apply(c, a.map(__.val, n));
	return (__.gname && r) ? (c[__.gname] = r) : r;
}).call({
	console: typeof logger !== "undefined" ? logger : console,
	document: typeof document !== "undefined" ? document : null,
}, [
	[ "viaduce", typeof Viaduce !== "undefined" ? Viaduce : null ],
	[ "r4", typeof R4 !== "undefined" ? R4 : null ],
	[ "jsdm", typeof JSDM !== "undefined" ? JSDM : null ],
	[ "json", typeof JSON !== "undefined" ? JSON : null ],
], function exporter (_Viaduce, _R4, _JSDM, _JSON) {

	var _Array = this.Array;
	var _Object = this.Object;
	var _String = this.String;
	var _Number = this.Number;

	var _document = exporter.prototype.document;
	var _console = exporter.prototype.console;

	(function (__) {

		var que = location.href.indexOf("?");

		__.alias.value = __.unique().slice(0, 10);

		__.message.addEventListener("keypress", __.onkeypress);

		__.connect.addEventListener("submit", __.onconnect);

		__.forget.addEventListener("click", __.onforget);



		__.log.prototype = __;
		__.onkeypress.prototype = __;
		__.onconnect.prototype = __;
		__.onforget.prototype = __;

		__.ondataFactory.prototype.fun.prototype.log = __.log;
		__.ondataFactory.prototype.fun.prototype.unique = __.unique;

		__.ondataSelf = __.ondataFactory(null, null);

		if (que >= 0) {
			__.mesh.value = location.href.slice(que + 1);

			__.onconnect(null);
		}

		return __.ondataFactory;
	}({
		unique: function b(a){
			return a?
				(a^Math.random()*16>>a/4).toString(16):
				([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
		},

		document: _document,
		history: _document.querySelector("#history"),
		stream: _document.querySelector("#history>#stream"),
		message: _document.querySelector("#message"),
		alias: _document.querySelector("#alias"),
		mesh: _document.querySelector("#mesh"),
		connect: _document.querySelector("#connect"),
		forget: _document.querySelector("#forget"),
		tail: function scope (target) {
			target.scrollTop = target.scrollHeight - target.clientHeight;
		},
		log: function scope (chat, own) {
			var __ = scope.prototype;

			var doc = __.document;
			var hist = __.history;
			var stream = __.stream;

			var id;
			var alias;
			var message;
			var div;
			var now = "<span timestamp>("+Date().toString()+")</span><br>";
			var tail = true;

			if (stream.scrollHeight > stream.scrollTop + stream.clientHeight) {
				if (!own) {
					tail = false;
				}
			}

			id = chat.id;
			alias = chat.alias;
			message = chat.message;

			div = doc.createElement("DIV");
			div.setAttribute("title", __.String(id));
			div.innerHTML = now+alias.slice(0, 16)+" : "+message;

			stream.appendChild(div);

			if (tail) {
				__.tail(stream);
			}

		},
		ondataFactory: _R4.prototype({
			scanner: new _JSDM.Scanner(),
			log: null,
			unique: null,
			JSDM: _JSDM,
			JSON: _JSON,
			String: _String,
			console: _console,
		}, function factory (connection, viad) {
			var $$ = factory.prototype;

			var old = this.obj || null;
			var young = this.obj = old || {};
			
			young.conn = connection;
			young.viaduce = viad;
			young.header = old && old.header || ["viaduce", void 0];
			young.scanner = $$.scanner;
			young.log = $$.log;
			young.unique = $$.unique;
			young.JSDM = null;
			young.JSDM = $$.JSDM;
			young.JSON = null;
			young.JSON = $$.JSON;
			young.String = null;
			young.String = $$.String;
			young.console = null;
			young.console = $$.console;

			return this.$ ||function scope (data) {

				var r4 = scope.prototype;
				var __ = r4.obj;

				var conn = __.conn;
				var viaduce = __.viaduce;

				var own = conn === null;
				var conns = viaduce && viaduce.conns;
				var count =  conns ? conns.length : 0;
				var index = 0;
				var c = conn;

				var s = __.scanner;
				var F = __.scanner.FLAG;
				var invite;
				var action;
				var chat;
				var info;
				var start = 0;
				var place = start;

				place = s.expect(data, start = place, __.header);
				if (place > 0 &&
					place < data.length) {
					invite = __.JSDM.revert(s.collect(F.ARRAY, data, start = place));
					place = s.end;
					action = s.collect(F.STRING, data, start = place);
					place = s.end;

					if (action === "sync") {
						place = s.expect(data, start = place, __.header);
						if (place > 0 &&
							place < data.length) {
							invite = __.JSDM.revert(s.collect(F.ARRAY, data, start = place));
							place = s.end;
							action = s.collect(F.STRING, data, start = place);
							place = s.end;
							if (action === "chat") {
								chat = __.JSDM.revert(s.collect(F.ARRAY, data, start = place));
								__.log(chat, viaduce ? viaduce.id === chat.id : own);
							}
						}
					} else if (action === "chat") {
						chat = __.JSDM.revert(s.collect(F.ARRAY, data, start = place));

						if (!viaduce) {
							__.log(chat, own);
						} else if (!viaduce.isArbiter) {
							//__.log(chat, own); // done in "sync"
							if (own) {
								viaduce.conn.send(data);
							}
						} else if (own || (chat.id === conn.peer)) {
							info = '["viaduce",'+__.JSDM.convert({
								rsvp: __.unique(),
								outstanding: [],
							})+',"sync",'+data+']';
							__.log(chat, own);

							for (index = 0; index < count; index++) {
								c = conns[index];
								c.send(info);
							}
						}
					}
				}
			};
		}),
		onkeypress: function scope (ev) {
			var __ = scope.prototype;
			var viaduce = __.viaduce;

			var message;

			if (ev.keyCode == 13) {
				if (ev.shiftKey !== true) {
					ev.preventDefault();
					message = (__.message.value || "").trim();
					__.message.value = "";

					message && __.ondataSelf(__.JSON.stringify(__.JSDM.convert([
						"viaduce",
						{
							// should be returned in a later message from server
							// (so that the client knows it's copy can be released)
							rsvp: __.unique(),
							// bills still waiting to be dealt with
							outstanding: [], 
						},
						"chat",
						{
							id: __.String(viaduce ? viaduce.id : ""),
							alias: __.String(__.alias.value),
							message: __.String(message),
						},
					])));
				}
			}
		},

		onconnect: function scope (ev) {
			var __ = scope.prototype;
			var viaduce = __.viaduce;
			var mesh = (__.mesh.value || (__.mesh.value = __.unique()));
			var port = location.host.indexOf(":");
			var host = port < 0 ? location.host : location.host.slice(0, port);

			ev && ev.preventDefault();

			if (viaduce) {
				viaduce.peer.disconnect();
			}

			__.viaduce = new __.Viaduce({
				ondataFactory: __.ondataFactory,
				mesh: "viaduce:"+mesh,
			}, {
				host: host,
				port: location.port,
				path: '/',
			});

			__.ondataSelf.prototype.obj.viaduce = __.viaduce;

			__.exports.viaduce = __.viaduce;
		},

		onforget: function scope (ev) {
			var __ = scope.prototype;
			var children = __.stream.children;
			var count = children.length;
			var index = 0;
			
			__.stream.remove();
			__.stream = __.document.createElement("DIV");
			__.stream.setAttribute("id", "stream");

			for (index = 0|(count / 2); index < count; count--) {
				__.stream.appendChild(children[index]);
			}

			__.history.appendChild(__.stream);

			__.tail(__.stream);
		},

		viaduce: null,
		Viaduce: _Viaduce,
		JSDM: _JSDM,
		JSON: _JSON,
		String: _String,
		console: _console,

		exports: this,
	}));

}));


