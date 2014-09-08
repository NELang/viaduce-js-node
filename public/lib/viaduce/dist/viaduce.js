
(function (__Peer, __R4, routine) {
	return routine.apply(this, arguments);
}.call(window, Peer, R4, function (__Peer, __R4, routine) {

	this.Viaduce = (function (_Peer) {

		this.Viaduce = function scope (custom, config) {
			var __ = scope.prototype;
			var api = __.api;

			var id = custom.id || api.unique();
			var peer = new __.Peer(id, config);
			var join = {
				type: "viaduce",
				viaduce: "join",
				mesh: custom.mesh,
			};

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

		this.Viaduce.prototype.api = this;
		this.Viaduce.prototype.Peer = _Peer;

		return this.Viaduce;

	}.call({

		unique: function b(a){
			return a?
				(a^Math.random()*16>>a/4).toString(16):
				([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
		},

		onmessage: __R4.prototype(function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope () {
				var r4 = scope.prototype;
				var viaduce = r4.obj;

				return viaduce._onmessage.apply(this, arguments);
			};
		}),

		_onmessage: __R4.prototype(function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope (msg) {
				var r4 = scope.prototype;
				var viaduce = r4.obj;

				var type = msg && msg.type;
				var action;
				var id;
				var ondata;
				var onopen;
				if (type === "viaduce") {
					console.log("socket: "+JSON.stringify(msg));
					action = String(msg.viaduce);
					if (action === "join") {
						id = String(msg.arbiter);
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

		onconnection: __R4.prototype(function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope () {
				var r4 = scope.prototype;
				var viaduce = r4.obj;

				return viaduce._onconnection.apply(this, arguments);
			};
		}),

		_onconnection: __R4.prototype(function factory (viaduce) {
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

		onopen: __R4.prototype(function factory (viaduce) {
			this.obj = viaduce;
			return this.$ || function scope (conn) {
				var r4 = scope.prototype;
				var viaduce = r4.obj;

				viaduce.peer.disconnect();
			};
		}),

	}, __Peer));

}));


