
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


