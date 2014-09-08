
(function (__Viaduce, __R4, __document, routine) {
	return routine.apply(this, arguments);
}.call(window, Viaduce, R4, document, function (__Viaduce, __R4, __document, routine) {

	(function (__) {

			var que = location.href.indexOf("?");

			__.alias.value = __.unique().slice(0, 10);

			__.message.addEventListener("keypress", __.onkeypress);

			__.connect.addEventListener("submit", __.onconnect);

			__.forget.addEventListener("click", __.onforget);


			__._ondataFactory.prototype = __;
			__.log.prototype = __;
			__.onkeypress.prototype = __;
			__.onconnect.prototype = __;
			__.onforget.prototype = __;

			__.ondataFactory = __R4.prototype(__._ondataFactory);
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

			document: __document,
			history: __document.querySelector("#history"),
			stream: __document.querySelector("#history>#stream"),
			message: __document.querySelector("#message"),
			alias: __document.querySelector("#alias"),
			mesh: __document.querySelector("#mesh"),
			connect: __document.querySelector("#connect"),
			forget: __document.querySelector("#forget"),
			log: function scope (message) {
				var __ = scope.prototype;

				var doc = __.document;
				var hist = __.history;
				var stream = __.stream;

				var id;
				var alias;
				var chat;
				var div;
				var now = "<span timestamp>("+Date().toString()+")</span><br>";

				id = message.id;
				alias = message.alias;
				chat = message.chat;

				div = doc.createElement("DIV");
				div.setAttribute("title", String(id));
				div.innerHTML = now+alias.slice(0, 16)+" : "+chat;

				stream.appendChild(div);

				__.history.scrollTop = __.history.clientHeight;

			},
			ondataFactory: null,
			_ondataFactory: function factory (connection, viad) {
				var _ = factory.prototype;

				var obj = this.obj = this.obj || {};
				
				obj.conn = connection;
				obj.viaduce = viad;
				obj.log = null;
				obj.log = _.log;

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

					try {
						var message = JSON.parse(data);
						var type = message && message.type;
						
						if (type === "viaduce") {

							if (!viaduce) {
								__.log(message);
							} else if (!viaduce.isArbiter) {
								__.log(message);
								if (own) {
									viaduce.conn.send(data);
								}
							} else if (own || (message.id === conn.peer)) {
								__.log(message);

								for (index = 0; index < count; index++) {
									c = conns[index];
									if (c !== conn) {
										c.send(data);
									}
								}
							}

						}

					} catch (e) {
						console.log("ondata error: "+data);
					}
				};
			},
			onkeypress: function scope (ev) {
				var __ = scope.prototype;
				var viaduce = __.viaduce;

				var chat;

				if (ev.keyCode == 13) {
					if (ev.shiftKey !== true) {
						ev.preventDefault();
						chat = (__.message.value || "").trim();
						__.message.value = "";

						chat && __.ondataSelf(JSON.stringify({
							type: "viaduce",
							id: String(viaduce ? viaduce.id : ""),
							alias: String(__.alias.value),
							chat: String(chat),
						}));
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
			},

			viaduce: null,
			Viaduce: __Viaduce,
			exports: this,
		}));

}));


