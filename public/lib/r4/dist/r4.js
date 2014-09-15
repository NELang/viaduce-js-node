
!({
	gname: "R4",
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

], function exporter () {

	var R4 = function R4 () {
		this._ = this; // R4 linked list
		this.$ = null; // helper (or preserved)
		this.num = null;
		this.str = null;
		this.arr = null;
		this.obj = null;
		this.map = null;
		this.fun = null;
	}

	R4.prototype = function reuse (prototype, plant) {
		var origin = reuse.prototype,
			recur = origin.obj,
			fun = null,
			factory = plant || prototype;

		if (prototype) {
			factory.prototype = prototype;
		}

		if (recur === origin) {
			recur = null;
		}

		if (recur) {
			origin.obj = recur._;
		} else {
			// outer
			recur = new origin.fun();
			// recycle
			recur.$ = origin.$;
			// inner
			recur.obj = new origin.fun();
			// unpool
			recur.obj.$ = function unpool () {
				var outer = unpool.prototype,
					inner = outer.obj,
					r4 = inner._,
					routine = null;

				if (r4 === inner) {
					r4 = null;
				}

				if (r4) {
					// preserve on r4.$
					inner._ = r4._;
				} else {
					// new R4
					r4 = new inner.obj.fun();
				}

				// unpool
				r4.fun = inner.$;
				// factory
				routine = outer.fun.apply(r4, arguments);
				routine.prototype = r4;
				// repool
				r4.$ = inner.fun;
				r4._ = null;
				return routine;
			};

			recur.obj.fun = function repool (fun) {
				var outer = repool.prototype,
					inner = outer.obj,
					r4 = this;

				if (r4._) {
					return null;
				} else {
					r4._ = inner._;
					inner._ = r4;
					// preserved
					r4.$ = fun;

					// unpool
					return inner.$;
				}
			};

			// repool and unpool share the same orign R4 (recur/outer)
			recur.obj.fun.prototype = recur.obj.$.prototype = recur;
			recur.obj.obj = origin;
		}

		// unpool
		fun = recur.obj.$;
		recur.fun = factory;
		fun.prototype = recur;
		recur._ = null;
		return fun;
	};

	R4.prototype.prototype = new R4();
	R4.prototype.prototype.fun = R4;
	R4.prototype.prototype.obj = R4.prototype.prototype;
	// recycle
	R4.prototype.prototype.$ = function recycle (fun) {
		var origin = recycle.prototype,
			recur = this;

		if (recur._) {
			return null;
		} else {
			recur._ = origin.obj;
			origin.obj = recur;
			// preserved
			recur.$ = fun || null;

			// unpool
			return recur.obj.$;
		}
	};

	// recycle and reuse share the same R4 (origin)
	R4.prototype.prototype.$.prototype = R4.prototype.prototype;

	return R4;

}));


