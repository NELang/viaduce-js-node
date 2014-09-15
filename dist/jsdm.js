
!({
	gname: "JSDM",
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

	var _Array = this.Array;
	var _Function = this.Function;
	var _Object = this.Object;
	var _String = this.String;
	var _Number = this.Number;

	var _JSON = this.JSON;

	var JSDM = {};

	JSDM.convert = function scope (pojo) {
		var __ = scope.prototype;

		var arr = null;
		var obj = null;

		if (pojo === void 0 ||
			pojo === null) {
			return pojo;
		} else if (__.Array.isArray(pojo)) {
			arr = pojo;
			arr = arr.map(__.convert);
			if (arr.length &&
				arr[0] === void 0) {
				arr[0] = {};
			}
			return arr;
		} else if (typeof pojo === "object") {
			obj = pojo;
			arr = __.Object.keys(obj);
			arr = arr.reduce(__._converter, [obj]);
			arr[0] = {};
			return arr;
		} else {
			return pojo;
		}
	};

	JSDM._converter = function scope (reduction, key) {
		var original = reduction[0];
		reduction.push(key, scope.prototype.convert(original[key]));
		return reduction;
	};

	JSDM.revert = function scope (jsdm) {
		var __ = scope.prototype;

		var arr = null;
		var obj = null;

		if (__.Array.isArray(jsdm)) {
			arr = jsdm;
			if (arr.length &&
				arr[0] !== null &&
				typeof arr[0] === "object") {
				obj = arr.reduce(__._reverter, {})
				return obj;
			} else {
				return arr.map(__.revert);
			}
		} else {
			return jsdm;
		}
	};

	JSDM._reverter = function scope (reduction, value, index, source) {
		if (index > 0) {
			reduction[source[index - 1]] = scope.prototype.revert(value);
		}
		return reduction;
	};

	JSDM.isJSDM = function scope (value) {
		var __ = scope.prototype;

		var arr = null;
		var obj = null;

		if (value === void 0 ||
			value === null) {
			return 0|true;
		} else if (__.Array.isArray(value)) {
			arr = value;
			if (arr.length &&
				arr[0] &&
				typeof arr[0] === "object") {
				return arr.every(__._validator);
			} else {
				return arr.every(__.isJSDM);
			}
		} else if (typeof value === "object") {
			return 0|false;
		} else {
			return 0|true;
		}
	};

	JSDM._validator = function scope (value, index, source) {
		if (index > 0) {
			if (index % 2) {
				if (value) {
					if (value instanceof __.Function ||
						typeof value === "object") {
						return 0|false;
					}
				}
			} else {
				return __.isJSDM(value);
			}
		}
		return 0|true;
	};

	_Object.keys(JSDM).forEach(function (key) {
		if (typeof this[key] === "function") {
			this[key].prototype = this;
		}
	}, JSDM);

	JSDM.Array = _Array;
	JSDM.Object = _Object;
	JSDM.Function = _Function;



	var Scanner = JSDM.Scanner = function Scanner () {
		this.flag = 0;
		this.begin = -1;
		this.end = -1;
	};

	var FLAG = Scanner.prototype.FLAG = {};
	FLAG.ARRAY = 1 << 0;
	FLAG.OBJECT = 1 << 1;
	FLAG.STRING = 1 << 2;
	FLAG.NUMBER = 1 << 3;
	FLAG.BOOLEAN = 1 << 4;
	FLAG.NULL = 1 << 5;
	FLAG.COMMA = 1 << 6;
	FLAG.COLON = 1 << 7;
	var TERMINAL = 8;
	FLAG.BRACKET = FLAG.ARRAY << TERMINAL;
	FLAG.BRACE = FLAG.OBJECT << TERMINAL;
	FLAG.QUOTE = (FLAG.STRING << TERMINAL) | FLAG.STRING;
	FLAG.TRUE = (FLAG.BOOLEAN << TERMINAL) | FLAG.BOOLEAN;
	FLAG.EVERY = 0;
	_Object.keys(FLAG).reduce(function (reduction, flag) {
		reduction.EVERY = reduction.EVERY | reduction[flag];
		return reduction;
	}, FLAG);
	FLAG.TERMINAL = TERMINAL;

	Scanner.prototype.start = function scope (flag, text, start, end, level) {
		var limit = end === void 0 ? text.length : 0|end;
		var index = 0|start;
		var depth = 0|level;
		var criteria = (0|flag) || this.FLAG.EVERY;
		var quoted = (0|flag) & (this.FLAG.STRING << this.FLAG.TERMINAL) ? 1 : 0;
		var backslashed = 0;
		var negated = 0;
		var c = 0;

		this.flag = 0;

		if (limit > text.length) {
			return text.length;
		}

		for (index; index < limit; index++) {
			c = text.charCodeAt(index);
			if (c === 0x22) { // "
				if (!backslashed) {
					quoted = 0x1 & (quoted + 1);
					if ((criteria & this.FLAG.QUOTE) && !depth) {
						this.flag = this.FLAG.QUOTE;
						break;
					}
				}
				backslashes = 0;
			} else if (c === 0x5C) { // \
				backslashes = 0x1 & (backslashed + 1);
			} else {
				backslashes = 0;
				if (quoted) {
					continue;
				} else if (c === 0x2C) { // ,
					if ((criteria & this.FLAG.COMMA) && !depth) {
						this.flag = this.FLAG.COMMA;
						break;
					}
				} else if (c === 0x5B) { // [
					if ((criteria & this.FLAG.ARRAY) && !depth) {
						this.flag = this.FLAG.ARRAY;
						break;
					}
					depth++;
				} else if (c === 0x5D) { // ]
					if ((criteria & this.FLAG.BRACKET) && !depth) {
						this.flag = this.FLAG.BRACKET;
						break;
					}
					depth--;
					if (depth < 0) {
						index = limit;
						this.flag = this.FLAG.BRACKET;
						break;
					}
				} else { // check for number
					
					if (!depth) {
						if (c === 0x2D) { // -
							if (!negated) {
								negated = 1;
							}
							continue;
						} else if (c > 0x2F && c < 0x3A) { // 0-9
							if ((criteria & this.FLAG.NUMBER)) {
								this.flag = this.FLAG.NUMBER;
								index -= negated;
								negated = 0;
								break;
							}
							continue;
						} else if (c === 0x3A) { // :
							if ((criteria & this.FLAG.COLON)) {
								this.flag = this.FLAG.COLON;
								break;
							}
							continue;
						} else if ((criteria & this.FLAG.NULL)) {
							if (!this.mismatch(text, index, "null")) {
								this.flag = this.FLAG.NULL;
								break;
							}
						} else if ((criteria & this.FLAG.BOOLEAN)) {
							if (!this.mismatch(text, index, "true")) {
								this.flag = this.FLAG.TRUE;
								break;
							} else if (!this.mismatch(text, index, "false")) {
								this.flag = this.FLAG.BOOLEAN;
								break;
							}
						}
					}

					if (c === 0x7B) { // {
						if ((criteria & this.FLAG.OBJECT) && !depth) {
							this.flag = this.FLAG.OBJECT;
							break;
						}
						depth++;
					} else if (c === 0x7D) { // }
						if ((criteria & this.FLAG.BRACE) && !depth) {
							this.flag = this.FLAG.BRACE;
							break;
						}
						depth--;
						if (depth < 0) {
							index = limit;
							this.flag = this.FLAG.BRACE;
							break;
						}
					}
				}
			}

			negated = 0;
		}

		return index;
	};

	Scanner.prototype.mismatch = function scope (text, pos, chars, offset, range) {
		var loc = 0|offset;
		var count = range === void 0 ? chars.length : 0|range;
		var index = 0;
		var t = 0;
		var c = 0;

		if (text.length > pos + count) {
			for (index; index < count; index++) {
				t = text.charCodeAt(pos + index);
				c = chars.charCodeAt(loc + index);
				if (t !== c) {
					break;
				}
			}
		}

		return count - index;
	};

	Scanner.prototype.finish = function (flag, text, start) {
		var index = -2;
		var limit = text.length;
		var place = 0|start;
		var c = 0;

		if (limit > place) {
			c = text.charCodeAt(place++);
			if (flag & this.FLAG.STRING) {
				if (c === 0x22) { // "
					index = this.start(this.FLAG.QUOTE, text, place);
				}
			} else if (flag & this.FLAG.ARRAY) {
				if (c === 0x5B) { // "["
					index = this.start(this.FLAG.BRACKET, text, place);
				}
			} else if (flag & this.FLAG.NULL) {
				if (!this.mismatch(text, start, "null")) {
					index = place + 2; // index of last "l"
				}
			} else if (flag & this.FLAG.BOOLEAN) {
				if (!this.mismatch(text, start, "true")) {
					index = place + 2; // index of "e"
				} else if (!this.mismatch(text, start, "false")) {
					index = place + 3; // index of "e"
				}
			} else if (flag & this.FLAG.NUMBER) {
				if (c === 0x2D) { // -
					c = (limit > place) ? text.charCodeAt(place++) : 0;
				}

				if (c > 0x2F && c < 0x3A) { // 0-9
					while (limit > place && (c = text.charCodeAt(place++))) {
						if (c < 0x30 && // 0
							c > 0x39 && // 9
							c !== 0x2E && // .
							c !== 0x2D && // -
							c !== 0x2B && // +
							c !== 0x45 && // E
							c !== 0x65) { // e
							break;
						}
					}
					index = place - 1; // index of last numerical character
				}
			} else if (flag & this.FLAG.OBJECT) {
				if (c === 0x5B) { // {
					index = this.start(this.FLAG.BRACE, text, place);
				}
			}
		}

		return 1 + index;
	};

	Scanner.prototype.collect = function scope (flag, text, start) {
		var __ = scope.prototype;

		var limit = text.length;
		var place = 0|start;
		var value = void 0;

		this.begin = -1;
		this.end = -1;

		if (limit > place) {
			if (flag & this.FLAG.STRING) {
				this.begin = this.start(this.FLAG.QUOTE, text, place);
				if (this.begin < limit) {
					this.end = this.finish(this.FLAG.QUOTE, text, this.begin);
				}
			} else if (flag & this.FLAG.ARRAY) {
				this.begin = this.start(this.FLAG.ARRAY, text, place);
				if (this.begin < limit) {
					this.end = this.finish(this.FLAG.ARRAY, text, this.begin);
				}
			} else if (flag & this.FLAG.NULL) {
				this.begin = this.start(this.FLAG.NULL, text, place);
				if (this.begin < limit) {
					this.end = this.begin + 4;
					value = null;
				}
			} else if (flag & this.FLAG.BOOLEAN) {
				this.begin = this.start(this.FLAG.BOOLEAN, text, place);
				if (this.begin < limit) {
					if (this.flag !== this.FLAG.TRUE) {
						this.end = this.begin + 5;
						value = false;
					} else {
						this.end = this.begin + 4;
						value = true;
					}
				}
			} else if (flag & this.FLAG.NUMBER) {
				this.begin = this.start(this.FLAG.NUMBER, text, place);
				if (this.begin < limit) {
					this.end = this.finish(this.FLAG.NUMBER, text, this.begin);
					if (this.end > limit) {
						this.end = -1;
					} else {
						value = __.Number(text.slice(this.begin, this.end));
					}
				}
			} else if (flag & this.FLAG.OBJECT) {
				this.begin = this.start(this.FLAG.OBJECT, text, place);
				if (this.begin < limit) {
					this.end = this.finish(this.FLAG.OBJECT, text, this.begin);
				}
			}
		}

		if (value === void 0 &&
			this.begin < this.end) {
			try {
				value = __.JSON.parse(text.slice(this.begin, this.end));
			} catch (e) {}
		}

		if (value !== void 0) {
			(place = this.start(0, text, this.end));
			if (this.flag === this.FLAG.COMMA) {
				(place < limit) && (this.end = 1 + place);
			}
		}

		return value;
	};

	Scanner.prototype.collect.prototype = {
		JSON: _JSON,
		Number: _Number,
	};

	Scanner.prototype.expect = function scope (text, start) {
		var __ = scope.prototype;

		var arr = null;
		var str = "";
		var num = 0;
		var obj = null;
		var bool = false;
		var value = null;
		var place = 0;
		var arg = scope.length;
		var count = arguments.length;
		var limit = text.length;
		var index = 0|start;
		var place = index;
		var offset = 0;
		var range = 0;

		this.flag = 0;

		for (arg; arg < count; arg++) {
			value = arguments[arg];

			if (value === void 0) {
				this.flag = this.FLAG.EVERY;
			} else if (__.Array.isArray(value)) {
				arr = value;
				range = arr.length - 1;
				place = this.start(0, text, index);
				if (this.flag !== this.FLAG.ARRAY) {
					index = -1;
				} else {
					(place < limit) && (index = 1 + place);
					for (offset = 0; offset < range; offset++) {
						index = this.expect(text, index, arr[offset]);
						if (this.flag === this.FLAG.EVERY ||
							index < 0) {
							break;
						}
					}
					if (offset === range) {
						index = this.expect(text, index, arr[offset]);
						if (this.flag !== this.FLAG.EVERY &&
							index > 0) {
							place = this.start(0, text, index);
							if (this.flag !== this.FLAG.BRACKET) {
								index = -1;
							}
							(place < limit) && (index = 1 + place);
						}
					}
				}
			} else if (typeof value === "string") {
				str = value;
				place = this.start(0, text, index);
				if (this.flag !== this.FLAG.QUOTE) {
					index = -1;
				} else {
					index = place;
					place = this.finish(this.FLAG.STRING, text, index);
					if (place > limit) {
						index = -1;
					} else if (!this.mismatch(text, index, str)) {
						index = place;
					} else {
						try {
							if (str === __.JSON.parse(text.slice(index, place))) {
								index = place;
							} else {
								index = -1;
							}
						} catch (e) {
							index = -1;
						}
					}
				}
			} else if (value === null) {
				place = this.start(0, text, index);
				if (this.flag !== this.FLAG.NULL) {
					index = -1;
				} else {
					index = place + 4;
				}
			} else if (typeof value === "boolean") {
				bool = value;
				place = this.start(0, text, index);
				if (this.flag & this.FLAG.BOOLEAN) {
					index = place + 4;
					if (this.flag !== this.FLAG.TRUE) { // was false literal
						index++; // length 5 total
						if (bool !== false) {
							index = -1;
						}
					} else {
						if (bool !== true) {
							index = -1;
						}
					}
				} else {
					index = -1;
				}
			} else if (typeof value === "number") {
				num = value;
				place = this.start(0, text, index);
				if (this.flag !== this.FLAG.NUMBER) {
					index = -1;
				} else {
					index = place;
					place = this.finish(this.FLAG.NUMBER, text, index);
					if (place > limit) {
						index = -1;
					} else {
						try {
							if (num === __.JSON.parse(text.slice(index, place))) {
								index = place;
							} else {
								index = -1;
							}
						} catch (e) {
							index = -1;
						}
					}
				}
			} else if (typeof value === "object") {
				obj = value;
				place = this.start(0, text, index);
				if (this.flag !== this.FLAG.OBJECT) {
					index = -1;
				} else {
					index = place;
					place = this.finish(this.FLAG.OBJECT, text, index);
					if (place > limit) {
						index = -1;
					} else {
						index = place;
					}
				}
			}



			if (index < 0) {
				return index;
			}

			if (this.flag === this.FLAG.EVERY) {
				break;
			}

			(place = this.start(0, text, index));
			if (this.flag === this.FLAG.COMMA) {
				(place < limit) && (index = 1 + place);
			}
		}

		//(place = this.start(0, text, index));
		//if (this.flag === this.FLAG.COMMA) {
		//	(place < limit) && (index = 1 + place);
		//}

		return index;

	};

	Scanner.prototype.expect.prototype = {
		Array: _Array,
		JSON: _JSON,
	};

	Scanner.prototype.indexOf = function scope (part, text, start, end) {
		var limit = end === void 0 ? text.length : 0|end;
		var index = 0|start;
		var mismatch = 0;
		// TODO: take part.length into consideration
		for (index; index < limit; index++) {
			mismatch = this.mismatch(text, index, part);
			if (!mismatch) {
				return index;
			}
		}

		return -1;
	};

	Scanner.prototype.lastIndexOf = function scope (part, text, start, end) {
		var index = end === void 0 ? text.length : 0|end;
		var limit = 0|start;
		var mismatch = 0;
		// TODO: take part.length into consideration
		for (index; index-- > limit;) {
			mismatch = this.mismatch(text, index, part);
			if (!mismatch) {
				return index;
			}
		}

		return -1;
	};

	Scanner.prototype.count = function scope (part, text, start, end) {
		var limit = end === void 0 ? text.length : 0|end;
		var index = 0|start;
		var count = 0;

		for (index; index < limit; index += part.length) {
			index = this.indexOf(part, text, index, limit);
			if (index < 0) {
				break;
			}
			count++;
		}

		return count;
	};

	return JSDM;

}));


