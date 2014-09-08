
function R4 () {
	this._ = this; // R4 linked list
	this.$ = null; // helper (or preserved)
	this.num = null;
	this.str = null;
	this.arr = null;
	this.obj = null;
	this.map = null;
	this.fun = null;
}

R4.prototype = function reuse (factory) {
	var origin = reuse.prototype,
		recur = origin.obj,
		fun = null;

	if (recur === origin) {
		recur = null;
	}

	if (recur) {
		origin.obj = recur._;
	} else {
		recur = new origin.fun();
		// recycle
		recur.$ = origin.$;

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
	var origin = repool.prototype,
		recur = this;

	if (recur._) {
		return null;
	} else {
		recur._ = origin.obj;
		origin.obj = recur;
		// preserved
		r4.$ = fun || null;

		// unpool
		return r4.obj.$;
	}
};

// recycle and reuse share the same R4 (origin)
R4.prototype.prototype.$.prototype = R4.prototype.prototype;







/*

R4.prototype(function plant (str) {
	var fun = this.$;
	this.num = 0;
	this.str = str;
	return fun || function thrice () {
		var r4 = thrice.prototype,
			next = null;
		console.log(r4.str);
		console.log(r4.num++);
		if (r4.num > 2) {
			// unpool
			next = r4.fun(r4.str + r4.str);
			r4.$(thrice);
			return next;
		}
		return thrice;
	};
}) ("yo") ()()()()()()()()()

*/



