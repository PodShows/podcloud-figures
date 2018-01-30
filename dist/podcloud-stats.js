(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("podcloud-stats", [], factory);
	else if(typeof exports === 'object')
		exports["podcloud-stats"] = factory();
	else
		root["podcloud-stats"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mongo = exports.View = undefined;

var _Mongo = __webpack_require__(8);

var _Mongo2 = _interopRequireDefault(_Mongo);

var _View = __webpack_require__(11);

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.View = _View2.default;
exports.Mongo = _Mongo2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(12);

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

var _SignedPayload = __webpack_require__(13);

Object.defineProperty(exports, "SignedPayload", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_SignedPayload).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidPayloadError = undefined;

var _es6Error = __webpack_require__(18);

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InvalidPayloadError extends _es6Error2.default {}

exports.InvalidPayloadError = InvalidPayloadError;
exports.default = InvalidPayloadError;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Models = __webpack_require__(0);

Object.defineProperty(exports, "Mongo", {
  enumerable: true,
  get: function () {
    return _Models.Mongo;
  }
});

var _Utils = __webpack_require__(3);

Object.defineProperty(exports, "SignedPayload", {
  enumerable: true,
  get: function () {
    return _Utils.SignedPayload;
  }
});

var _Appeals = __webpack_require__(20);

Object.defineProperty(exports, "PodcastViewAppeal", {
  enumerable: true,
  get: function () {
    return _Appeals.PodcastViewAppeal;
  }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _process = __webpack_require__(9);

var _process2 = _interopRequireDefault(_process);

var _connectionstate = __webpack_require__(10);

var _connectionstate2 = _interopRequireDefault(_connectionstate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MONGOOSE_CONNECT_OPTIONS = { autoReconnect: true };

let lastConnStr = null;

const Mongo = {
  connect(conn_str) {
    if (lastConnStr == null) {
      // First time
      _mongoose2.default.Promise = global.Promise;

      _mongoose2.default.connection.on("connecting", function () {
        console.log("connecting to MongoDB...");
      });

      _mongoose2.default.connection.on("error", function (error) {
        console.error("Error in MongoDB connection: " + error);
        _mongoose2.default.disconnect();
      });

      _mongoose2.default.connection.on("connected", function () {
        console.log("MongoDB connected!");
      });

      _mongoose2.default.connection.once("open", function () {
        console.log("MongoDB connection opened!");
      });

      _mongoose2.default.connection.on("reconnected", function () {
        console.log("MongoDB reconnected!");
      });

      _mongoose2.default.connection.on("disconnected", function () {
        console.log("MongoDB disconnected!");
        if (!mongoClosingExiting && lastConnStr) {
          console.log("Reconnecting using last connection string !");
          console.log(lastConnStr);
          _mongoose2.default.connect(lastConnStr, MONGOOSE_CONNECT_OPTIONS);
        }
      });

      let mongoClosingExiting = false;
      const mongoCloseOnExit = function () {
        mongoClosingExiting = true;
        _mongoose2.default.connection.close(function () {
          console.log("Mongoose default connection disconnected through app termination");
        });
      };
      _process2.default.on("exit", mongoCloseOnExit);
      _process2.default.on("SIGINT", mongoCloseOnExit);
    }

    lastConnStr = conn_str;

    return new Promise((resolve, reject) => {
      _mongoose2.default.connect(conn_str).then(() => {
        resolve(_mongoose2.default.connection, MONGOOSE_CONNECT_OPTIONS);
      }, reject);
    });
  },
  getConnection() {
    return _mongoose2.default.connection;
  }
};

exports.default = Mongo;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("process");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongoose/lib/connectionstate");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _url = __webpack_require__(2);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = _mongoose2.default.Schema.Types.ObjectId;

const ViewSchema = new _mongoose2.default.Schema({
  source: String,

  country: String,
  city: String,
  ip: String,
  user_agent: String,
  referer: String,
  referer_host: String,

  daily_timecode: Number,
  monthly_timecode: Number,

  daily_timecode_with_ip: String,
  monthly_timecode_with_ip: String,

  feed_id: ObjectId,

  created_at: Date,
  updated_at: Date
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const View = _mongoose2.default.model("View", ViewSchema);
View.ObjectId = _mongoose2.default.Types.ObjectId;

exports.default = View;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const notEmpty = exports.notEmpty = function (obj) {
  return typeof obj === "string" && obj.trim().length > 0;
};

const empty = exports.empty = function (obj) {
  return !notEmpty(obj);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SignedPayload = __webpack_require__(14);

exports.default = _SignedPayload.SignedPayload;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignedPayload = undefined;

var _jsonwebtoken = __webpack_require__(15);

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(16);

var _fs2 = _interopRequireDefault(_fs);

var _Errors = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const ISSUERS_KEYS_PATH = _path2.default.resolve(__dirname, "./issuers_keys");

const decodePayload = payload => {
  const decoded = jwt.decode(payload);

  if (!decoded) throw new _Errors.InvalidPayloadError("Could not decode payload");
  if (!decoded.iss) throw new _Errors.InvalidIssuerPayloadError("No issuer found in payload");

  return decoded;
};

const checkAndGetIssuerKeyPath = payload => {
  const decoded = decodePayload(payload);

  const issuer_key_path = _path2.default.join(ISSUERS_KEYS_PATH, decoded.iss + ".pem");
  try {
    _fs2.default.accessSync(issuer_key_path, _fs2.default.constants.R_OK);
  } catch (err) {
    throw new _Errors.InvalidIssuerPayloadError("Could not find a readable issuer key at path: " + issuer_key_path);
  }
  return issuer_key_path;
};

const verifyPayload = payload => {
  const issuer_key_path = checkAndGetIssuerKeyPath(payload);
  const issuer_key = _fs2.default.readFileSync(issuer_key_path);

  try {
    return jwt.verify(payload, issuer_key, {
      sub: "stats",
      algorithms: ["RS256"]
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" && err.message.indexOf("subject invalid") >= 0) {
      throw new _Errors.InvalidPayloadError(err.message.replace("jwt subject", "Payload subject"));
    } else {
      throw new _Errors.InvalidPayloadError(err.message);
    }
  }
};

class SignedPayload {}
exports.SignedPayload = SignedPayload;
SignedPayload.decodeAndVerify = payload => {
  return new Promise((resolve, reject) => {
    try {
      const verified_payload = verifyPayload(payload);
      if (verified_payload && typeof verified_payload === "object") {
        resolve(verified_payload);
      } else {
        reject(verified_payload);
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.default = SignedPayload;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InvalidPayloadError = __webpack_require__(5);

Object.keys(_InvalidPayloadError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _InvalidPayloadError[key];
    }
  });
});

var _InvalidIssuerPayloadError = __webpack_require__(19);

Object.keys(_InvalidIssuerPayloadError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _InvalidIssuerPayloadError[key];
    }
  });
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("es6-error");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidIssuerPayloadError = undefined;

var _InvalidPayloadError = __webpack_require__(5);

var _InvalidPayloadError2 = _interopRequireDefault(_InvalidPayloadError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InvalidIssuerPayloadError extends _InvalidPayloadError2.default {}

exports.InvalidIssuerPayloadError = InvalidIssuerPayloadError;
exports.default = InvalidIssuerPayloadError;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PodcastViewAppeal = __webpack_require__(21);

Object.defineProperty(exports, "PodcastViewAppeal", {
  enumerable: true,
  get: function () {
    return _PodcastViewAppeal.PodcastViewAppeal;
  }
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PodcastViewAppeal = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(2);

var _url2 = _interopRequireDefault(_url);

var _Appeal = __webpack_require__(22);

var _Appeal2 = _interopRequireDefault(_Appeal);

var _index = __webpack_require__(3);

var _config = __webpack_require__(23);

var _config2 = _interopRequireDefault(_config);

var _Models = __webpack_require__(0);

var _maxmind = __webpack_require__(24);

var _maxmind2 = _interopRequireDefault(_maxmind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validIPOrDefault = (ip, defaultValue = "0.0.0.0") => {
  return _maxmind2.default.validate(ip) && ip || defaultValue;
};

const validUserAgentOrDefault = (user_agent, defaultValue = "Unknown") => {
  return (0, _index.notEmpty)(user_agent) ? user_agent : defaultValue;
};

const validRefererOrDefault = (referer, defaultValue = null) => {
  try {
    return (0, _index.notEmpty)(referer) ? _url2.default.parse(referer.trim()).href : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const validNotEmptyOrDefault = (value, defaultValue = "na") => (0, _index.notEmpty)(value) ? value : defaultValue;

class PodcastViewAppeal extends _Appeal2.default {}

exports.PodcastViewAppeal = PodcastViewAppeal;
const MAXMIND = Symbol.for("PodcastViewAppeal.maxmind");

let _GEOLITE_PATH = _path2.default.join(__dirname, ( true ? "../src/Appeals" : ".") + "/geoip/GeoLite2-City.mmdb");

Object.defineProperty(PodcastViewAppeal, "GEOLITE_PATH", {
  get: () => _GEOLITE_PATH,
  set: val => {
    _GEOLITE_PATH = val;
    PodcastViewAppeal[MAXMIND] = null;
  }
});

PodcastViewAppeal.process = payload => {
  return new Promise((resolve, reject) => {
    if (typeof PodcastViewAppeal[MAXMIND] !== "object") {
      PodcastViewAppeal[MAXMIND] = _maxmind2.default.openSync(_GEOLITE_PATH);
    }

    const feed_id = _Models.View.ObjectId(payload.fid);
    const ip = validIPOrDefault(payload.ip);
    const user_agent = validUserAgentOrDefault(payload.ua);
    const referer = validRefererOrDefault(payload.ref);

    const referer_host = (() => {
      try {
        return _url2.default.parse(referer).hostname;
      } catch (e) {}

      return null;
    })();

    const lookup = PodcastViewAppeal[MAXMIND].get(ip);
    const country = lookup && (lookup.represented_country && lookup.represented_country.iso_code || lookup.country && lookup.country.iso_code) || null;

    const city = lookup && lookup.city && lookup.city.names && JSON.stringify(lookup.city.names) || null;

    const now = new Date();

    const daily_timecode = +Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0);

    const monthly_timecode = +Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0, 0, 0, 0, 0);

    const registered_view = new _Models.View({
      source: "feed",
      feed_id,
      ip,
      user_agent,
      city,
      country,
      referer,
      referer_host,
      daily_timecode,
      daily_timecode_with_ip: daily_timecode + "_" + ip,
      monthly_timecode,
      monthly_timecode_with_ip: monthly_timecode + "_" + ip
    });

    registered_view.save().then(resolve, reject);
  });
};

exports.default = PodcastViewAppeal;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class Appeal {}
exports.default = Appeal;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("maxmind");

/***/ })
/******/ ]);
});