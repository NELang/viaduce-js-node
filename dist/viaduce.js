
!({
	gname: "Viaduce",
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
}).call(null, [
	[ "peerjs", typeof Peer !== "undefined" ? Peer : null ],
	[ "r4", typeof R4 !== "undefined" ? R4 : null ],
], function exporter (_Peer, _R4) {

	var _Array = this.Array;
	var _Object = this.Object;
	var _String = this.String;
	var _Number = this.Number;

	var Viaduce = function Viaduce (custom, config) {
		var __ = Viaduce.prototype;
		var api = __.api;

		var id = custom.id || api.unique();
		var peer = new __.Peer(id, config);
		var join = ({
				type: "viaduce",
				viaduce: "join",
				mesh: custom.mesh,
			});

		this.id = id;
		this.peer = peer;
		this.conn = null;
		this.isArbiter = false;
		this.conns = null;

		this.onmessage = null;
		this.onmessage = api.onmessage(this);
		this._onmessage = null;
		this._onmessage = api._onmessage(this);

		this.onconnection = null;
		this.onconnection = api.onconnection(this);
		this._onconnection = null;
		this._onconnection = api._onconnection(this);

		this.ondataFactory = null;
		this.ondataFactory = custom.ondataFactory;

		peer.on('connection', this.onconnection);

		peer.socket.on("message", this.onmessage);

		if (peer.socket._wsOpen()) {
			peer.socket.send(join);
		} else {
			peer.socket.id = null;
			peer.socket.send(join);
			peer.socket.id = peer.id;
		}
	};

	Viaduce.prototype.Peer = _Peer;
	Viaduce.prototype.api = {

		unique: function b(a){
			return a?
				(a^Math.random()*16>>a/4).toString(16):
				([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
		},

		onmessage: _R4.prototype(null, function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope () {
				var r4 = scope.prototype;
				var viaduce = r4.obj;

				return viaduce._onmessage.apply(this, arguments);
			};
		}),

		_onmessage: _R4.prototype({
			String: _String,
		}, function factory (viaduce) {
			var $$ = factory.prototype;

			this.obj = this.obj || {};
			this.obj.viaduce = viaduce;
			this.obj.String = null;
			this.obj.String = $$.String;
			return this.$ || function scope (msg) {
				var r4 = scope.prototype;
				var __ = r4.obj;
				var viaduce = __.viaduce;

				var type = msg && msg.type;
				var action;
				var id;
				var ondata;
				var onopen;
				if (type === "viaduce") {
					console.log("socket: "+JSON.stringify(msg));
					action = __.String(msg.viaduce);
					if (action === "join") {
						id = __.String(msg.arbiter);
						if (id !== this.id) {
							viaduce.conn = viaduce.peer.connect(id);
							ondata = viaduce.ondataFactory(viaduce.conn, viaduce);
							viaduce.conn.on('data', ondata);
							onopen = viaduce.api.onopen(viaduce);
							viaduce.conn.on('open', onopen);
						} else {
							viaduce.isArbiter = true;
							viaduce.conns = [];
						}
					}
				}
			};
		}),

		onconnection: _R4.prototype(null, function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope () {
				var r4 = scope.prototype;
				var viaduce = r4.obj;

				return viaduce._onconnection.apply(this, arguments);
			};
		}),

		_onconnection: _R4.prototype(null, function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope (conn) {
				var r4 = scope.prototype;
				var viaduce = r4.obj;
				var ondata;

				if (!viaduce.isArbiter) {
					conn.close();
				} else {
					viaduce.conns.push(conn);
					ondata = viaduce.ondataFactory(conn, viaduce);
					conn.on("data", ondata);
				}
			};
		}),

		onopen: _R4.prototype(null, function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope (conn) {
				var r4 = scope.prototype;
				var viaduce = r4.obj;

				viaduce.peer.disconnect();
			};
		}),

	};

	return Viaduce;

}));


