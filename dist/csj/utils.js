"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqueid = exports.normalizePath = exports.matchPath = exports.generateUniqueHash = exports.bezierEasing = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var generateUniqueHash = exports.generateUniqueHash = function generateUniqueHash() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  length = Math.max(4, Math.min(32, length));
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var timestamp = Date.now().toString(36); // Converta o timestamp para base36
  var hash = "";
  // Adicione parte do timestamp à hash
  hash += timestamp.slice(-4); // Use os últimos 4 caracteres do timestamp
  // Complete a hash com caracteres aleatórios
  for (var i = 0; i < length - 4; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    hash += characters.charAt(randomIndex);
  }
  return hash;
};
var uniqueid = exports.uniqueid = function uniqueid(length) {
  var _length;
  length = typeof length !== "number" ? 32 : Math.min(Math.max(5, (_length = length) !== null && _length !== void 0 ? _length : 32), 32);
  var idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
  do {
    var ascicode = Math.floor(Math.random() * 42 + 48);
    if (ascicode < 58 || ascicode > 64) {
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < length);
  return String(idstr).slice(0, length);
};
var normalizePath = exports.normalizePath = function normalizePath(path) {
  path = typeof path === "string" ? path.replace(/\/+/g, "/").replace(/\/+$/g, "") : path;
  var partes = path.split("/");
  var pilha = [];
  var _iterator = _createForOfIteratorHelper(partes),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var parte = _step.value;
      if (parte === "..") {
        pilha.pop();
      } else if (parte !== ".") {
        pilha.push(parte);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return pilha.join("/");
};
var matchPath = exports.matchPath = function matchPath(path, url) {
  var _urlParsed$pathname2, _urlParsed$search;
  path = typeof path === "string" ? normalizePath(path) : Array.isArray(path) ? path.map(function (p) {
    return typeof path === "string" ? normalizePath(path) : p;
  }) : path;
  url = normalizePath(url);
  var getLocation = function getLocation(href) {
    var match = href.match(/^((https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?))?([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
      href: href,
      protocol: match[2],
      host: match[3],
      hostname: match[4],
      port: match[5],
      pathname: match[6],
      search: match[7],
      hash: match[8]
    };
  };
  var pathToRegExp = function pathToRegExp(path) {
    return new RegExp(path.replace(/\./g, "\\.").replace(/\//g, "/").replace(/\?/g, "\\?").replace(/\/+$/, "").replace(/\*+/g, ".*").replace(/:([^\d|^\/][a-zA-Z0-9_]*(?=(?:\/|\\.)|$))/g, function (_, paramName) {
      return "(?<".concat(paramName, ">[^/]+?)");
    }).concat("(\\/|$)"), "gi");
  };
  var getQuery = function getQuery(url) {
    var _url$split$pop;
    return typeof url === "string" && url.search(/\?/) >= 0 ? JSON.parse('{"' + decodeURI(((_url$split$pop = url.split("?").pop()) !== null && _url$split$pop !== void 0 ? _url$split$pop : "").replace(/&/g, '","').replace(/=/g, '":"')) + '"}') : {};
  };
  var urlParsed = getLocation(url);
  var findPath = function findPath(path, url) {
    var list = Array.isArray(path) ? path : [path];
    var _iterator2 = _createForOfIteratorHelper(list),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _urlParsed$pathname;
        var p = _step2.value;
        var _expression = p instanceof RegExp ? p : pathToRegExp(p);
        var _match = _expression.exec((_urlParsed$pathname = urlParsed === null || urlParsed === void 0 ? void 0 : urlParsed.pathname) !== null && _urlParsed$pathname !== void 0 ? _urlParsed$pathname : "") || false;
        var _matches = p instanceof RegExp ? !!_match : !!_match && _match[0] === _match.input;
        if (_matches) {
          return p;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return undefined;
  };
  var pathValid = findPath(path, url);
  var expression = pathValid instanceof RegExp ? pathValid : pathToRegExp(pathValid !== null && pathValid !== void 0 ? pathValid : "");
  var match = expression.exec((_urlParsed$pathname2 = urlParsed === null || urlParsed === void 0 ? void 0 : urlParsed.pathname) !== null && _urlParsed$pathname2 !== void 0 ? _urlParsed$pathname2 : "") || false;
  var matches = pathValid instanceof RegExp ? !!match : !!match && match[0] === match.input;
  var params = match ? match.groups || {} : {};
  var search = getQuery((_urlParsed$search = urlParsed === null || urlParsed === void 0 ? void 0 : urlParsed.search) !== null && _urlParsed$search !== void 0 ? _urlParsed$search : "");
  return {
    exact: matches,
    search: search,
    params: params,
    query: Object.assign({}, params, search),
    path: matches ? urlParsed === null || urlParsed === void 0 ? void 0 : urlParsed.pathname : undefined,
    pathValid: pathValid
  };
};
/**
 * @function {@link https://github.com/gre/bezier-easing bezierEasing-Github}
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {Function}
 */
var bezierEasing = exports.bezierEasing = function bezierEasing(x1, y1, x2, y2) {
  if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
    throw new Error("bezier x values must be in [0, 1] range");
  }
  var kSplineTableSize = 11,
    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
  var A = function A(a, b) {
    return 1.0 - 3.0 * b + 3.0 * a;
  };
  var B = function B(a, b) {
    return 3.0 * b - 6.0 * a;
  };
  var C = function C(a) {
    return 3.0 * a;
  };
  var calcBezier = function calcBezier(a, b, c) {
    return ((A(b, c) * a + B(b, c)) * a + C(b)) * a;
  };
  var getSlope = function getSlope(a, b, c) {
    return 3.0 * A(b, c) * a * a + 2.0 * B(b, c) * a + C(b);
  };
  var binarySubdivide = function binarySubdivide(a, b, c, d, e) {
    var f,
      g,
      i = 0;
    do {
      g = b + (c - b) / 2.0;
      f = calcBezier(g, d, e) - a;
      if (f > 0.0) {
        c = g;
      } else {
        b = g;
      }
    } while (Math.abs(f) > 0.0000001 && ++i < 10);
    return g;
  };
  var newtonRaphsonIterate = function newtonRaphsonIterate(a, b, c, d) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(b, c, d);
      if (currentSlope === 0.0) {
        return b;
      }
      var currentX = calcBezier(b, c, d) - a;
      b -= currentX / currentSlope;
    }
    return b;
  };
  if (x1 === y1 && x2 === y2) {
    return function (x) {
      return x;
    };
  }
  var sampleValues = typeof Float32Array === "function" ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, x1, x2);
  }
  var getTForX = function getTForX(a) {
    var b = 0.0,
      c = 1,
      d = kSplineTableSize - 1;
    for (; c !== d && sampleValues[c] <= a; ++c) {
      b += kSampleStepSize;
    }
    --c;
    var e = (a - sampleValues[c]) / (sampleValues[c + 1] - sampleValues[c]),
      f = b + e * kSampleStepSize,
      g = getSlope(f, x1, x2);
    if (g >= 0.001) {
      return newtonRaphsonIterate(a, f, x1, x2);
    } else if (g === 0.0) {
      return f;
    } else {
      return binarySubdivide(a, b, b + kSampleStepSize, x1, x2);
    }
  };
  return function (x) {
    return x === 0 ? 0 : x === 1 ? 1 : calcBezier(getTForX(x), y1, y2);
  };
};