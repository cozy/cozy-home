/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "/home.js"
/******/ 	}
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
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([9,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+tca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataAccessFacade; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _adapters_CozyStackAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2hsQ");
/* harmony import */ var _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("jPoV");




/* global cozy, PouchDB */

 // const isOnline = () =>
//   typeof navigator !== 'undefined' ? navigator.onLine : true

var DataAccessFacade =
/*#__PURE__*/
function () {
  function DataAccessFacade() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DataAccessFacade);

    this.stackAdapter = new _adapters_CozyStackAdapter__WEBPACK_IMPORTED_MODULE_3__["default"]();

    if (typeof PouchDB !== 'undefined') {
      this.pouchAdapter = new _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["default"](); // TODO: strategy injection

      this.strategy = new PouchFirstStrategy();
    } else {
      this.strategy = new StackOnlyStrategy();
    }
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DataAccessFacade, [{
    key: "setup",
    value: function setup(cozyUrl, options) {
      var config = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({
        cozyURL: cozyUrl
      }, options);

      cozy.client.init(config); // TODO: For now we let cozy-client-js creates PouchDB instances

      this.stackAdapter.init(config);

      if (config.offline) {
        this.pouchAdapter.registerDoctypes(config.offline.doctypes);
      }
    }
  }, {
    key: "getAdapter",
    value: function getAdapter(doctype) {
      return this.strategy.getAdapter(doctype, this.stackAdapter, this.pouchAdapter);
    }
  }, {
    key: "startSync",
    value: function startSync(dispatch) {
      return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["SYNC_BIDIRECTIONAL"]);
    }
  }, {
    key: "startReplicationTo",
    value: function startReplicationTo(dispatch) {
      return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["SYNC_TO"]);
    }
  }, {
    key: "startReplicationFrom",
    value: function startReplicationFrom(dispatch) {
      return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["SYNC_FROM"]);
    }
  }]);

  return DataAccessFacade;
}();



var PouchFirstStrategy =
/*#__PURE__*/
function () {
  function PouchFirstStrategy() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PouchFirstStrategy);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PouchFirstStrategy, [{
    key: "getAdapter",
    value: function getAdapter(doctype, stackAdapter, pouchAdapter) {
      if (pouchAdapter.getDatabase(doctype) === undefined) {
        return stackAdapter;
      }

      return pouchAdapter;
    }
  }]);

  return PouchFirstStrategy;
}();

var StackOnlyStrategy =
/*#__PURE__*/
function () {
  function StackOnlyStrategy() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, StackOnlyStrategy);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(StackOnlyStrategy, [{
    key: "getAdapter",
    value: function getAdapter(doctype, stackAdapter) {
      return stackAdapter;
    }
  }]);

  return StackOnlyStrategy;
}();

/***/ }),

/***/ "/SIK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("67rm");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("B/vO");
/* harmony import */ var hooks_useRegistryInformation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("fl/O");
/* harmony import */ var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("iDCe");











var CandidateServiceTile = function CandidateServiceTile(_ref) {
  var t = _ref.t,
      client = _ref.client,
      konnector = _ref.konnector;
  var slug = konnector.slug;
  var registryData = Object(hooks_useRegistryInformation__WEBPACK_IMPORTED_MODULE_8__["default"])(client, slug);
  var name = registryData ? lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(registryData, 'latest_version.manifest.name', slug) : '';

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      isModalDisplayed = _useState2[0],
      setModalDisplayed = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, isModalDisplayed && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_9__["KonnectorSuggestionModal"], {
    konnectorAppSuggestion: konnector,
    konnectorManifest: lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(registryData, 'latest_version.manifest', {}),
    onClose: function onClose() {
      setModalDisplayed(false);
    },
    onSilence: function onSilence() {
      setModalDisplayed(false);
      cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_5__["default"].success(t('connector.silenced', {
        name: name
      }));
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "item item--ghost",
    onClick: function onClick() {
      return setModalDisplayed(true);
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "item-icon"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_7__["default"], {
    alt: t('app.logo.alt', {
      name: name
    }),
    app: slug
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "item-title"
  }, name)));
};

CandidateServiceTile.propTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  client: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,
  konnector: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    slug: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
  }).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_6__["withClient"])(CandidateServiceTile)));

/***/ }),

/***/ "/kYV":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-debug":"u-debug--339vn","u-shake":"u-shake--R7aZx","shake":"shake--ZcmO4","u-o-100":"u-o-100--mPHO6","u-o-90":"u-o-90--2kd9N","u-o-80":"u-o-80--tJtcx","u-o-70":"u-o-70--1J1Xb","u-o-60":"u-o-60--1PJea","u-o-50":"u-o-50--Es7HO","u-o-40":"u-o-40--1jR-E","u-o-30":"u-o-30--2NXXP","u-o-20":"u-o-20--cVH7R","u-o-10":"u-o-10--3tZZw","u-o-05":"u-o-05--1Rdg-","u-o-025":"u-o-025--SAP0E","u-o-0":"u-o-0--3WE75","spin":"spin--2iFLV"};

/***/ }),

/***/ "/n/j":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveApps", function() { return receiveApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApp", function() { return getApp; });
var RECEIVE_APPS = 'RECEIVE_APPS';

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_APPS:
      return action.apps || state;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer); // Action creators

var receiveApps = function receiveApps(apps) {
  return {
    type: RECEIVE_APPS,
    apps: apps
  };
}; // Selectors

var getApp = function getApp() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var slug = arguments.length > 1 ? arguments[1] : undefined;
  return state.find(function (app) {
    return app.slug === slug;
  });
};

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1HPX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Services", function() { return Services; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("xweI");
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
/* harmony import */ var lodash_keyBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("QVEU");
/* harmony import */ var lodash_keyBy__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_keyBy__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("OFL0");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("56YH");
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_flow__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var components_AddServiceTile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("9a/K");
/* harmony import */ var components_KonnectorTile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("EoZk");
/* harmony import */ var components_CandidateCategoryTile__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("Cz6i");
/* harmony import */ var components_CandidateServiceTile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("/SIK");
/* harmony import */ var components_FallbackCandidateServiceTile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("J+FN");
/* harmony import */ var components_EmptyServicesListTip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("59PL");
/* harmony import */ var reducers_index__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("cokx");
/* harmony import */ var hooks_withAppsInMaintenance__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("ZV27");
/* harmony import */ var config_candidates__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("Gyt3");
var config_candidates__WEBPACK_IMPORTED_MODULE_18___namespace = /*#__PURE__*/__webpack_require__.t("Gyt3", 1);




















var Services = function Services(_ref) {
  var t = _ref.t,
      installedKonnectors = _ref.installedKonnectors,
      suggestedKonnectorsQuery = _ref.suggestedKonnectorsQuery,
      client = _ref.client;
  var appsInMaintenance = Object(hooks_withAppsInMaintenance__WEBPACK_IMPORTED_MODULE_17__["default"])(client);
  var appsInMaintenanceBySlug = lodash_keyBy__WEBPACK_IMPORTED_MODULE_7___default()(appsInMaintenance, 'slug');
  var candidatesSlugBlacklist = appsInMaintenance.map(function (_ref2) {
    var slug = _ref2.slug;
    return slug;
  }).concat(installedKonnectors.map(function (_ref3) {
    var slug = _ref3.slug;
    return slug;
  }));
  var suggestedKonnectors = suggestedKonnectorsQuery.data.filter(function (_ref4) {
    var slug = _ref4.slug;
    return !candidatesSlugBlacklist.includes(slug);
  });
  var fallbackKonnectorSuggestions = config_candidates__WEBPACK_IMPORTED_MODULE_18__.konnectors.filter(function (_ref5) {
    var slug = _ref5.slug;
    return !candidatesSlugBlacklist.includes(slug);
  });
  var categorySuggestions = Object.entries(config_candidates__WEBPACK_IMPORTED_MODULE_18__.categories);
  var hasZeroInstalledKonnectors = !installedKonnectors.length;
  var displayFallbackSuggestions = hasZeroInstalledKonnectors && suggestedKonnectors.length === 0;
  var displayTutorialTip = hasZeroInstalledKonnectors && (suggestedKonnectors.length >= 1 || fallbackKonnectorSuggestions.length >= 1);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: 'services-list'
  }, installedKonnectors.map(function (konnector, index) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_KonnectorTile__WEBPACK_IMPORTED_MODULE_11__["default"], {
      key: index,
      konnector: konnector,
      route: "connected/".concat(konnector.slug),
      isInMaintenance: lodash_has__WEBPACK_IMPORTED_MODULE_8___default()(appsInMaintenanceBySlug, konnector.slug)
    });
  }), suggestedKonnectors.map(function (suggestion) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_CandidateServiceTile__WEBPACK_IMPORTED_MODULE_13__["default"], {
      key: suggestion.slug,
      konnector: suggestion
    });
  }), displayFallbackSuggestions && fallbackKonnectorSuggestions.map(function (candidate) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_FallbackCandidateServiceTile__WEBPACK_IMPORTED_MODULE_14__["default"], {
      key: candidate.slug,
      slug: candidate.slug
    });
  }), hasZeroInstalledKonnectors && categorySuggestions.map(function (_ref6) {
    var _ref7 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref6, 2),
        category = _ref7[0],
        slugs = _ref7[1];

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_CandidateCategoryTile__WEBPACK_IMPORTED_MODULE_12__["default"], {
      key: category,
      slugs: slugs,
      category: category
    });
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_AddServiceTile__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: t('add_service')
  })), displayTutorialTip && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_EmptyServicesListTip__WEBPACK_IMPORTED_MODULE_15__["default"], null));
};
Services.propTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  installedKonnectors: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    slug: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
  })).isRequired,
  suggestedKonnectorsQuery: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    data: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired
  }).isRequired,
  client: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};

var query = function query(client) {
  return client.find('io.cozy.apps.suggestions').where({
    silenced: false
  }).sortBy([{
    silenced: 'asc'
  }, {
    slug: 'asc'
  }]).indexFields(['silenced', 'slug']);
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    installedKonnectors: lodash_sortBy__WEBPACK_IMPORTED_MODULE_3___default()(Object(reducers_index__WEBPACK_IMPORTED_MODULE_16__["getInstalledKonnectors"])(state), function (konnector) {
      return konnector.name.toLowerCase();
    })
  };
};

/* harmony default export */ __webpack_exports__["default"] = (lodash_flow__WEBPACK_IMPORTED_MODULE_9___default()(Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps), Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["translate"])(), Object(cozy_client__WEBPACK_IMPORTED_MODULE_5__["queryConnect"])({
  suggestedKonnectorsQuery: {
    query: query
  }
}), cozy_client__WEBPACK_IMPORTED_MODULE_5__["withClient"])(Services));

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2gMI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Failure", function() { return Failure; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("X+Uv");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var assets_icons_color_default_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vBg4");








var reload = function reload() {
  window.location.reload();
};

var Failure = function Failure(_ref) {
  var t = _ref.t,
      errorType = _ref.errorType;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "u-flex u-flex-column u-flex-items-center"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    icon: assets_icons_color_default_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
    size: 64
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["MainTitle"], {
    tag: "h2",
    className: "u-ta-center"
  }, t("error.".concat(errorType))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: t('error.button.reload'),
    onClick: reload
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(Failure));

/***/ }),

/***/ "2hsQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_BY_LINK", function() { return SHARED_BY_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_WITH_ME", function() { return SHARED_WITH_ME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_WITH_OTHERS", function() { return SHARED_WITH_OTHERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyStackAdapter; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);








/* global cozy */
var FILES_DOCTYPE = 'io.cozy.files';
var FETCH_LIMIT = 50;
var SHARED_BY_LINK = 'sharedByLink';
var SHARED_WITH_ME = 'sharedWithMe';
var SHARED_WITH_OTHERS = 'sharedWithOthers';

var CozyStackAdapter =
/*#__PURE__*/
function () {
  function CozyStackAdapter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, CozyStackAdapter);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(CozyStackAdapter, [{
    key: "fetchApps",
    value: function () {
      var _fetchApps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee() {
        var skip,
            _ref,
            data,
            meta,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                skip = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
                _context.next = 3;
                return cozy.client.fetchJSON('GET', '/apps/', null, {
                  processJSONAPI: false
                });

              case 3:
                _ref = _context.sent;
                data = _ref.data;
                meta = _ref.meta;
                return _context.abrupt("return", {
                  data: data || [],
                  meta: meta,
                  skip: skip,
                  next: !!meta && meta.count > skip + FETCH_LIMIT
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fetchApps() {
        return _fetchApps.apply(this, arguments);
      }

      return fetchApps;
    }()
  }, {
    key: "fetchDocuments",
    value: function () {
      var _fetchDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2(doctype) {
        var resp, rows, docs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return cozy.client.fetchJSON('GET', "/data/".concat(doctype, "/_all_docs?include_docs=true"));

              case 3:
                resp = _context2.sent;
                // WARN: the JSON response from the stack is not homogenous with other routes (offset? rows? total_rows?)
                // see https://github.com/cozy/cozy-stack/blob/master/docs/data-system.md#list-all-the-documents
                // WARN: looks like this route returns something looking like a couchDB design doc, we need to filter it:
                rows = resp.rows.filter(function (row) {
                  return !row.doc.hasOwnProperty('views');
                }); // we normalize the data (note that we add _type so that cozy.client.data.listReferencedFiles works...)

                docs = rows.map(function (row) {
                  return Object.assign({}, row.doc, {
                    id: row.id,
                    _type: doctype
                  });
                }); // we forge a correct JSONAPI response:

                return _context2.abrupt("return", {
                  data: docs,
                  meta: {
                    count: resp.total_rows
                  },
                  skip: resp.offset,
                  next: false
                });

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);

                if (!_context2.t0.message.match(/not_found/)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", {
                  data: [],
                  meta: {
                    count: 0
                  },
                  skip: 0,
                  next: false
                });

              case 13:
                throw _context2.t0;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function fetchDocuments(_x) {
        return _fetchDocuments.apply(this, arguments);
      }

      return fetchDocuments;
    }()
  }, {
    key: "queryDocuments",
    value: function () {
      var _queryDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3(doctype, index, options) {
        var fields, skip, sort, queryOptions, data, meta, next, response, _response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fields = options.fields;
                skip = options.skip || 0; // Mango wants an array of single-property-objects...

                sort = options.sort ? index.fields.map(function (f) {
                  return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, f, options.sort[f] || 'desc');
                }) : undefined;
                queryOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
                  limit: FETCH_LIMIT,
                  wholeResponse: true
                }, options, {
                  // TODO: type and class should not be necessary, it's just a temp fix for a stack bug
                  fields: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(fields), ['_id', '_type', 'class']),
                  skip: skip,
                  sort: sort
                }); // abstract away the format differences between query replies on the VFS versus the data API

                if (!(doctype === FILES_DOCTYPE)) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 7;
                return cozy.client.files.query(index, queryOptions);

              case 7:
                response = _context3.sent;
                data = response.data.map(function (doc) {
                  return Object.assign({
                    _id: doc.id,
                    _type: doctype
                  }, doc, doc.attributes);
                });
                meta = response.meta;
                next = meta.count > skip + FETCH_LIMIT;
                _context3.next = 19;
                break;

              case 13:
                _context3.next = 15;
                return cozy.client.data.query(index, queryOptions);

              case 15:
                _response = _context3.sent;
                data = _response.docs.map(function (doc) {
                  return Object.assign({
                    id: doc._id,
                    _type: doctype
                  }, doc);
                });
                meta = {};
                next = _response.next;

              case 19:
                return _context3.abrupt("return", {
                  data: data,
                  meta: meta,
                  next: next
                });

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function queryDocuments(_x2, _x3, _x4) {
        return _queryDocuments.apply(this, arguments);
      }

      return queryDocuments;
    }()
  }, {
    key: "fetchDocument",
    value: function () {
      var _fetchDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee4(doctype, id) {
        var doc, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return cozy.client.data.find(doctype, id);

              case 2:
                doc = _context4.sent;
                // we normalize again...
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                  id: doc._id,
                  _type: doc._type
                });
                return _context4.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function fetchDocument(_x5, _x6) {
        return _fetchDocument.apply(this, arguments);
      }

      return fetchDocument;
    }()
  }, {
    key: "init",
    value: function init(config) {
      this.config = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, config);
    }
  }, {
    key: "createDocument",
    value: function () {
      var _createDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee5(doctype, doc) {
        var created, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return cozy.client.data.create(doctype, doc);

              case 2:
                created = _context5.sent;
                // we forge a standard response with a 'data' property
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, created, {
                  id: created._id,
                  _type: doctype
                });
                return _context5.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function createDocument(_x7, _x8) {
        return _createDocument.apply(this, arguments);
      }

      return createDocument;
    }()
  }, {
    key: "createTrigger",
    value: function () {
      var _createTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee6(doc) {
        var created, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return cozy.client.fetchJSON('POST', '/jobs/triggers', {
                  data: doc
                });

              case 2:
                created = _context6.sent;
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, created, created.attributes, {
                  id: created._id
                });
                return _context6.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function createTrigger(_x9) {
        return _createTrigger.apply(this, arguments);
      }

      return createTrigger;
    }()
  }, {
    key: "launchTrigger",
    value: function () {
      var _launchTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee7(doc) {
        var job, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return cozy.client.fetchJSON('POST', "/jobs/triggers/".concat(doc._id, "/launch"));

              case 2:
                job = _context7.sent;
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, job, job.attributes, {
                  id: job._id
                });
                return _context7.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function launchTrigger(_x10) {
        return _launchTrigger.apply(this, arguments);
      }

      return launchTrigger;
    }()
  }, {
    key: "updateDocument",
    value: function () {
      var _updateDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee8(doc) {
        var updated;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return cozy.client.data.updateAttributes(doc._type, doc.id, doc);

              case 2:
                updated = _context8.sent;
                return _context8.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                    _rev: updated._rev
                  })]
                });

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function updateDocument(_x11) {
        return _updateDocument.apply(this, arguments);
      }

      return updateDocument;
    }()
  }, {
    key: "deleteDocument",
    value: function () {
      var _deleteDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee9(doc) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return cozy.client.data.delete(doc._type, doc);

              case 2:
                return _context9.abrupt("return", {
                  data: [doc]
                });

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function deleteDocument(_x12) {
        return _deleteDocument.apply(this, arguments);
      }

      return deleteDocument;
    }()
  }, {
    key: "deleteTrigger",
    value: function () {
      var _deleteTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee10(doc) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return cozy.client.fetchJSON('DELETE', "/jobs/triggers/".concat(doc._id));

              case 2:
                return _context10.abrupt("return", {
                  data: [doc]
                });

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function deleteTrigger(_x13) {
        return _deleteTrigger.apply(this, arguments);
      }

      return deleteTrigger;
    }()
  }, {
    key: "createIndex",
    value: function createIndex(doctype, fields) {
      return cozy.client.data.defineIndex(doctype, fields);
    }
  }, {
    key: "fetchFileByPath",
    value: function () {
      var _fetchFileByPath = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee11(path) {
        var file;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return cozy.client.files.statByPath(path);

              case 3:
                file = _context11.sent;
                return _context11.abrupt("return", {
                  data: [normalizeFile(file)]
                });

              case 7:
                _context11.prev = 7;
                _context11.t0 = _context11["catch"](0);
                return _context11.abrupt("return", null);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 7]]);
      }));

      function fetchFileByPath(_x14) {
        return _fetchFileByPath.apply(this, arguments);
      }

      return fetchFileByPath;
    }()
  }, {
    key: "createFile",
    value: function () {
      var _createFile = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee12(file, dirID) {
        var created;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return cozy.client.files.create(file, {
                  dirID: dirID
                });

              case 2:
                created = _context12.sent;
                return _context12.abrupt("return", {
                  data: [normalizeFile(created)]
                });

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function createFile(_x15, _x16) {
        return _createFile.apply(this, arguments);
      }

      return createFile;
    }()
  }, {
    key: "trashFile",
    value: function () {
      var _trashFile = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee13(file) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                /* const trashed = */
                cozy.client.files.trashById(file.id); // we forge a standard response with a 'data' property

                return _context13.abrupt("return", {
                  data: [file]
                });

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function trashFile(_x17) {
        return _trashFile.apply(this, arguments);
      }

      return trashFile;
    }()
  }, {
    key: "fetchReferencedFiles",
    value: function () {
      var _fetchReferencedFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee14(doc) {
        var skip,
            normalized,
            _ref3,
            included,
            meta,
            _args14 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                skip = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 0;
                // WARN: _type and _id are needed by cozy.client.data.fetchReferencedFiles
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                  _id: doc.id
                }); // WARN: the stack API is probably not ideal here: referencedFiles are in the 'included' property
                // (that should be used when fetching an entity AND its relations) and the 'data' property
                // only contains uplets { id, type }

                _context14.next = 4;
                return cozy.client.data.fetchReferencedFiles(normalized, {
                  skip: skip,
                  limit: FETCH_LIMIT
                });

              case 4:
                _ref3 = _context14.sent;
                included = _ref3.included;
                meta = _ref3.meta;
                return _context14.abrupt("return", {
                  data: !included ? [] : included.map(function (file) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, file, file.attributes, {
                      _type: 'io.cozy.files'
                    });
                  }),
                  meta: meta,
                  next: meta.count > skip + FETCH_LIMIT,
                  skip: skip
                });

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function fetchReferencedFiles(_x18) {
        return _fetchReferencedFiles.apply(this, arguments);
      }

      return fetchReferencedFiles;
    }()
  }, {
    key: "fetchKonnectors",
    value: function () {
      var _fetchKonnectors = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee15() {
        var skip,
            _ref4,
            data,
            meta,
            _args15 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                skip = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : 0;
                _context15.next = 3;
                return cozy.client.fetchJSON('GET', "/konnectors/", null, {
                  processJSONAPI: false
                });

              case 3:
                _ref4 = _context15.sent;
                data = _ref4.data;
                meta = _ref4.meta;
                return _context15.abrupt("return", {
                  data: data ? data.map(function (konnector) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, konnector, konnector.attributes, {
                      _type: 'io.cozy.konnectors'
                    });
                  }) : [],
                  meta: meta,
                  skip: skip,
                  next: !!meta && meta.count > skip + FETCH_LIMIT
                });

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function fetchKonnectors() {
        return _fetchKonnectors.apply(this, arguments);
      }

      return fetchKonnectors;
    }()
  }, {
    key: "fetchTriggers",
    value: function () {
      var _fetchTriggers = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee16(worker) {
        var skip,
            _ref5,
            data,
            meta,
            _args16 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                skip = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 0;
                _context16.next = 3;
                return cozy.client.fetchJSON('GET', "/jobs/triggers?Worker=".concat(worker), null, {
                  processJSONAPI: false
                });

              case 3:
                _ref5 = _context16.sent;
                data = _ref5.data;
                meta = _ref5.meta;
                return _context16.abrupt("return", {
                  data: data ? data.map(function (trigger) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, trigger, trigger.attributes, {
                      _type: 'io.cozy.triggers'
                    });
                  }) : [],
                  meta: meta,
                  skip: skip,
                  next: !!meta && meta.count > skip + FETCH_LIMIT
                });

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function fetchTriggers(_x19) {
        return _fetchTriggers.apply(this, arguments);
      }

      return fetchTriggers;
    }()
  }, {
    key: "addReferencedFiles",
    value: function () {
      var _addReferencedFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee17(doc, ids) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return cozy.client.data.addReferencedFiles(doc, ids);

              case 2:
                return _context17.abrupt("return", ids);

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function addReferencedFiles(_x20, _x21) {
        return _addReferencedFiles.apply(this, arguments);
      }

      return addReferencedFiles;
    }()
  }, {
    key: "removeReferencedFiles",
    value: function () {
      var _removeReferencedFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee18(doc, ids) {
        var normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                // WARN: _type and _id are needed by cozy.client.data.removeReferencedFiles
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                  _id: doc.id
                });
                _context18.next = 3;
                return cozy.client.data.removeReferencedFiles(normalized, ids);

              case 3:
                return _context18.abrupt("return", ids);

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function removeReferencedFiles(_x22, _x23) {
        return _removeReferencedFiles.apply(this, arguments);
      }

      return removeReferencedFiles;
    }()
  }, {
    key: "fetchSharingPermissions",
    value: function () {
      var _fetchSharingPermissions = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee19(doctype) {
        var fetchPermissions, byMe, byLink, withMe;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                fetchPermissions = function fetchPermissions(doctype, sharingType) {
                  return cozy.client.fetchJSON('GET', "/permissions/doctype/".concat(doctype, "/").concat(sharingType));
                };

                _context19.next = 3;
                return fetchPermissions(doctype, SHARED_WITH_OTHERS);

              case 3:
                byMe = _context19.sent;
                _context19.next = 6;
                return fetchPermissions(doctype, SHARED_BY_LINK);

              case 6:
                byLink = _context19.sent;
                _context19.next = 9;
                return fetchPermissions(doctype, SHARED_WITH_ME);

              case 9:
                withMe = _context19.sent;
                return _context19.abrupt("return", {
                  byMe: byMe,
                  byLink: byLink,
                  withMe: withMe
                });

              case 11:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));

      function fetchSharingPermissions(_x24) {
        return _fetchSharingPermissions.apply(this, arguments);
      }

      return fetchSharingPermissions;
    }()
  }, {
    key: "fetchSharing",
    value: function fetchSharing(id) {
      return cozy.client.fetchJSON('GET', "/sharings/".concat(id));
    }
  }, {
    key: "createSharing",
    value: function createSharing(permissions, contactIds, sharingType, description) {
      return cozy.client.fetchJSON('POST', '/sharings/', {
        desc: description,
        permissions: permissions,
        recipients: contactIds.map(function (contactId) {
          return {
            recipient: {
              id: contactId,
              type: 'io.cozy.contacts'
            }
          };
        }),
        sharing_type: sharingType
      });
    }
  }, {
    key: "revokeSharing",
    value: function revokeSharing(sharingId) {
      return cozy.client.fetchJSON('DELETE', "/sharings/".concat(sharingId));
    }
  }, {
    key: "revokeSharingForClient",
    value: function revokeSharingForClient(sharingId, clientId) {
      return cozy.client.fetchJSON('DELETE', "/sharings/".concat(sharingId, "/recipient/").concat(clientId));
    }
  }, {
    key: "createSharingLink",
    value: function createSharingLink(permissions) {
      return cozy.client.fetchJSON('POST', "/permissions?codes=email", {
        data: {
          type: 'io.cozy.permissions',
          attributes: {
            permissions: permissions
          }
        }
      });
    }
  }, {
    key: "revokeSharingLink",
    value: function revokeSharingLink(permission) {
      return cozy.client.fetchJSON('DELETE', "/permissions/".concat(permission._id));
    }
  }]);

  return CozyStackAdapter;
}();



var normalizeFile = function normalizeFile(file) {
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, file, file.attributes, {
    id: file._id
  });
};

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3dAU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCTYPE", function() { return DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAccounts", function() { return fetchAccounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccount", function() { return getAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIds", function() { return getIds; });
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m+TH");

var DOCTYPE = 'io.cozy.accounts';
var accountCollectionKey = 'accounts';
var fetchAccounts = function fetchAccounts() {
  return Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["fetchCollection"])(accountCollectionKey, DOCTYPE);
}; // selectors

var getAccount = function getAccount(state, id) {
  if (!state.documents || !state.documents[DOCTYPE]) {
    return null;
  }

  return state.documents[DOCTYPE][id];
};
var getIds = function getIds(state) {
  return (// state.collection is bugged, it does not update correctly id list on
    // RECEIVE_DATA
    // (state.collections &&
    //   state.collections[accountCollectionKey] &&
    //   state.collections[accountCollectionKey].ids) ||
    // []
    state.documents && state.documents[DOCTYPE] && Object.keys(state.documents[DOCTYPE]) || []
  );
};

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "4DAK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactMarkdownRendererOptions", function() { return reactMarkdownRendererOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactMarkdownWrapper", function() { return ReactMarkdownWrapper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6x+I");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_1__);


var reactMarkdownRendererOptions = {
  // eslint-disable-next-line react/display-name
  Link: function Link(props) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: props.href,
      rel: "noopener noreferrer",
      target: "_blank"
    }, props.children);
  }
};
var ReactMarkdownWrapper = function ReactMarkdownWrapper(_ref) {
  var source = _ref.source;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1___default.a, {
    source: source,
    renderers: reactMarkdownRendererOptions
  });
};
/* harmony default export */ __webpack_exports__["default"] = (ReactMarkdownWrapper);

/***/ }),

/***/ "4YEU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENQUEUE_CONNECTION", function() { return ENQUEUE_CONNECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LAUNCH_TRIGGER", function() { return LAUNCH_TRIGGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PURGE_QUEUE", function() { return PURGE_QUEUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_DATA", function() { return RECEIVE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_NEW_DOCUMENT", function() { return RECEIVE_NEW_DOCUMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_DELETED_DOCUMENT", function() { return RECEIVE_DELETED_DOCUMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_CONNECTION_RUNNING_STATUS", function() { return UPDATE_CONNECTION_RUNNING_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_CONNECTION_ERROR", function() { return UPDATE_CONNECTION_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_CONNECTION_CREATION", function() { return START_CONNECTION_CREATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "END_CONNECTION_CREATION", function() { return END_CONNECTION_CREATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueueConnection", function() { return enqueueConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purgeQueue", function() { return purgeQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateConnectionError", function() { return updateConnectionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startConnectionCreation", function() { return startConnectionCreation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endConnectionCreation", function() { return endConnectionCreation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsByKonnector", function() { return getConnectionsByKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstError", function() { return getFirstError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstUserError", function() { return getFirstUserError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLastSyncDate", function() { return getLastSyncDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueue", function() { return getQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionError", function() { return getConnectionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCreatedAccount", function() { return getCreatedAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerIdByKonnectorAndAccount", function() { return getTriggerIdByKonnectorAndAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerLastSuccess", function() { return getTriggerLastSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCreatingConnection", function() { return isCreatingConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConnectionConnected", function() { return isConnectionConnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConnectionEnqueued", function() { return isConnectionEnqueued; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConnectionRunning", function() { return isConnectionRunning; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fvjX");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Puqe");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lib_konnectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("8CvS");
/* harmony import */ var ducks_jobs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("sR/t");







 // constant

var ACCOUNT_DOCTYPE = 'io.cozy.accounts';
var TRIGGERS_DOCTYPE = 'io.cozy.triggers';
var JOBS_DOCTYPE = 'io.cozy.jobs';
var ENQUEUE_CONNECTION = 'ENQUEUE_CONNECTION';
var LAUNCH_TRIGGER = 'LAUNCH_TRIGGER';
var PURGE_QUEUE = 'PURGE_QUEUE';
var RECEIVE_DATA = 'RECEIVE_DATA';
var RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT';
var RECEIVE_DELETED_DOCUMENT = 'RECEIVE_DELETED_DOCUMENT';
var UPDATE_CONNECTION_RUNNING_STATUS = 'UPDATE_CONNECTION_RUNNING_STATUS';
var UPDATE_CONNECTION_ERROR = 'UPDATE_CONNECTION_ERROR';
var START_CONNECTION_CREATION = 'START_CONNECTION_CREATION';
var END_CONNECTION_CREATION = 'END_CONNECTION_CREATION'; // Helpers

var getTriggerKonnectorSlug = function getTriggerKonnectorSlug(trigger) {
  return trigger && trigger.message && trigger.message.konnector || null;
};

var isKonnectorTrigger = function isKonnectorTrigger(doc) {
  return doc._type === TRIGGERS_DOCTYPE && !!doc.message && !!doc.message.konnector;
};

var isKonnectorJob = function isKonnectorJob(doc) {
  return doc._type === JOBS_DOCTYPE && doc.worker === 'konnector';
}; // reducers


var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
    case LAUNCH_TRIGGER:
      // Trigger is launched, connection should be running.
      if (!action.trigger || !action.trigger._id) throw new Error('Missing trigger id');
      if (!action.trigger.message || !action.trigger.message.konnector) throw new Error('Malformed trigger message');
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, getTriggerKonnectorSlug(action.trigger), konnectorReducer(state[getTriggerKonnectorSlug(action.trigger)], action)));

    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      if (!action.response || !action.response.data || !action.response.data.length) {
        return state;
      }

      return action.response.data.reduce(function (newState, doc) {
        var isTrigger = isKonnectorTrigger(doc);
        var isJob = isKonnectorJob(doc); // Ignore non triggers or non jobs

        if (!isTrigger && !isJob) return newState;
        var konnectorSlug = doc.message.konnector;
        var triggerId = isTrigger && doc._id || isJob && doc.trigger_id;
        if (!triggerId) return newState;
        var account = isTrigger && !!doc.message && doc.message.account;
        var currentStatus = isTrigger && doc.current_state && doc.current_state.status || isJob && doc.state;
        var error = isTrigger && !!doc.current_state && doc.current_state.status !== 'done' && !!doc.current_state.last_error && Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_6__["buildKonnectorError"])(doc.current_state.last_error) || isJob && !!doc.error && Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_6__["buildKonnectorError"])(doc.error) || null;
        var lastSyncDate = isTrigger && !!doc.current_state && doc.current_state.last_execution || isJob && doc.queued_at;
        var existingTriggers = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers', 'data'], []);
        var rawTriggers = existingTriggers;

        if (isTrigger) {
          rawTriggers = existingTriggers.filter(function (_ref) {
            var _id = _ref._id;
            return _id !== doc._id;
          });
          rawTriggers.push(doc);
        }

        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, newState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, konnectorSlug, {
          triggers: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers'], []), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
            data: rawTriggers
          }, triggerId, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers', triggerId], {}), {
            account: account || lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers', triggerId, 'account']),
            error: error,
            hasError: !!error || currentStatus === 'errored',
            isRunning: ['queued', 'running'].includes(currentStatus),
            isConnected: !error && currentStatus === 'done',
            lastSyncDate: lastSyncDate
          })))
        }));
      }, state);

    case PURGE_QUEUE:
    case RECEIVE_DELETED_DOCUMENT:
      return Object.keys(state).reduce(function (konnectors, slug) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, konnectors, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, slug, konnectorReducer(state[slug], action)));
      }, state);

    default:
      return state;
  }
};

var creation = function creation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      {
        if (!state) return null;

        if (!action.response || !action.response.data || action.response.data.length !== 1) {
          return state;
        }

        var doc = action.response.data[0];
        var isAccount = doc._type === ACCOUNT_DOCTYPE;
        if (isAccount) return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, {
          account: doc._id
        });
        var isTrigger = isKonnectorTrigger(doc);
        if (isTrigger) return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, {
          trigger: doc._id
        });
        return state;
      }

    case START_CONNECTION_CREATION:
      // Store all data related to the creation of a new connection in then
      // property `creation`
      // While a new connection is being configured, new trigger and account
      // are store here
      return {};

    case END_CONNECTION_CREATION:
      return null;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])({
  creation: creation,
  konnectors: reducer
})); // sub(?) reducers

var konnectorReducer = function konnectorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ENQUEUE_CONNECTION:
    case LAUNCH_TRIGGER:
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_DELETED_DOCUMENT:
    case PURGE_QUEUE:
      // We assume that document being a trigger has already been validated.
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, {
        triggers: triggersReducer(state.triggers, action)
      });

    default:
      return state;
  }
};

var triggersReducer = function triggersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ENQUEUE_CONNECTION:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, action.trigger._id, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state[action.trigger._id], {
        isEnqueued: true
      })));

    case LAUNCH_TRIGGER:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, action.trigger._id, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state[action.trigger._id], {
        account: action.trigger.message.account,
        isRunning: true
      })));

    case PURGE_QUEUE:
      return state ? Object.keys(state).reduce(function (newState, triggerId) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, newState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, triggerId, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, newState[triggerId], {
          isEnqueued: false
        })));
      }, state) : state;

    case RECEIVE_DELETED_DOCUMENT:
      {
        var data = action.response.data;
        var _data$ = data[0],
            _id = _data$._id,
            _type = _data$._type;

        if (_type === TRIGGERS_DOCTYPE) {
          return lodash_omit__WEBPACK_IMPORTED_MODULE_4___default()(state, _id);
        } else return state;
      }

    default:
      return state;
  }
}; // action creators sync


var enqueueConnection = function enqueueConnection(trigger) {
  return {
    type: ENQUEUE_CONNECTION,
    trigger: trigger
  };
};
var purgeQueue = function purgeQueue() {
  return {
    type: PURGE_QUEUE
  };
};
var updateConnectionError = function updateConnectionError(konnector, account, error) {
  return {
    type: UPDATE_CONNECTION_ERROR,
    konnector: konnector,
    account: account,
    error: error
  };
};
var startConnectionCreation = function startConnectionCreation(konnector) {
  return {
    type: START_CONNECTION_CREATION,
    konnector: konnector
  };
};
var endConnectionCreation = function endConnectionCreation() {
  return {
    type: END_CONNECTION_CREATION
  };
}; // selectors

var getConnectionsByKonnector = function getConnectionsByKonnector(state, konnectorSlug) {
  var validAccounts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var validKonnectors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var konnectorIsValid = !validKonnectors.length || validKonnectors.includes(konnectorSlug);
  var konnectorHasConnections = state.konnectors[konnectorSlug] && Object.keys(state.konnectors[konnectorSlug].triggers).length;
  if (!konnectorIsValid || !konnectorHasConnections) return [];
  return Object.values(state.konnectors[konnectorSlug].triggers).filter(function (trigger) {
    return validAccounts.includes(trigger.account);
  });
};
var getFirstError = function getFirstError(state, konnectorSlug) {
  var firstTriggerHavingError = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).find(function (trigger) {
    return !!trigger.error;
  });
  return firstTriggerHavingError ? firstTriggerHavingError.error : null;
};
var getFirstUserError = function getFirstUserError(state, konnectorSlug) {
  var firstTriggerHavingUserError = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).find(function (trigger) {
    return Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_6__["isKonnectorUserError"])(trigger.error);
  });
  return firstTriggerHavingUserError ? firstTriggerHavingUserError.error : null;
};
var getLastSyncDate = function getLastSyncDate(state, konnectorSlug) {
  var lastExecutions = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).map(function (trigger) {
    return trigger.lastSyncDate;
  }).sort(function (dateA, dateB) {
    var momentA = moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(dateA);
    var momentB = moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(dateB);
    return momentA.isAfter(momentB) ? -1 : momentA.isBefore(momentB) ? 1 : 0;
  });
  return lastExecutions.length && lastExecutions[0];
}; // Map the trigger status to a status compatible with queue

var getTriggerQueueStatus = function getTriggerQueueStatus(trigger) {
  if (trigger.isRunning) return 'ongoing';
  if (trigger.hasError) return 'error';
  if (trigger.isConnected) return 'done';
  return 'pending';
};

var getQueue = function getQueue(state, konnectors) {
  return (// state is state.connections
    state.konnectors ? Object.keys(state.konnectors).reduce(function (queuedConnections, konnectorSlug) {
      var triggers = state.konnectors[konnectorSlug].triggers;
      if (!triggers) return queuedConnections;
      var konnector = konnectors[konnectorSlug];
      return queuedConnections.concat(Object.keys(triggers).reduce(function (queuedTriggers, triggerId) {
        if (triggers[triggerId].isEnqueued) {
          var label = konnector.name;
          var status = getTriggerQueueStatus(triggers[triggerId]);
          return queuedTriggers.concat({
            konnector: konnector,
            label: label,
            status: status,
            triggerId: triggerId
          });
        }

        return queuedTriggers;
      }, []));
    }, []) : []
  );
};
var getConnectionError = function getConnectionError(state, trigger) {
  return getTriggerState(state, trigger).error;
};
var getCreatedAccount = function getCreatedAccount(state) {
  return !!state.creation && state.creation.account;
};
var getTriggerIdByKonnectorAndAccount = function getTriggerIdByKonnectorAndAccount(state, konnector, account) {
  var validAccounts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return !!konnector && !!account && validAccounts.includes(account._id) && !!state.konnectors[konnector.slug] && Object.keys(state.konnectors[konnector.slug].triggers).find(function (triggerId) {
    return state.konnectors[konnector.slug].triggers[triggerId].account === account._id;
  });
};
var getTriggerLastSuccess = function getTriggerLastSuccess(state, trigger) {
  var lastJob = Object(ducks_jobs__WEBPACK_IMPORTED_MODULE_7__["getTriggerLastJob"])(state, trigger);
  var lastJobIsSuccess = lastJob && lastJob.state === 'done';
  if (lastJobIsSuccess) return lastJob.started_at;
  return !!trigger && !!trigger.current_state && trigger.current_state.last_success;
}; // get trigger from state, in state.konnectors[konnectorSlug].triggers[triggerId]

var getTriggerState = function getTriggerState(state, trigger) {
  var konnectorSlug = getTriggerKonnectorSlug(trigger);
  if (!konnectorSlug || !state.konnectors || !state.konnectors[konnectorSlug]) return false;
  var triggers = state.konnectors[konnectorSlug].triggers;
  if (!triggers) return false;
  return !!triggers && !!triggers[trigger._id] && triggers[trigger._id] || {};
};

var isCreatingConnection = function isCreatingConnection(state) {
  return !!state.creation;
};
var isConnectionConnected = function isConnectionConnected(state, trigger) {
  return getTriggerState(state, trigger).isConnected;
};
var isConnectionEnqueued = function isConnectionEnqueued(state, trigger) {
  return getTriggerState(state, trigger).isEnqueued;
};
var isConnectionRunning = function isConnectionRunning(state, trigger) {
  return getTriggerState(state, trigger).isRunning;
};

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "59PL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyServicesListTip", function() { return EmptyServicesListTip; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_transpiled_react_Media__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("PYF2");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var assets_images_drawing_arrow_up_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("8Nns");
/* harmony import */ var assets_images_drawing_arrow_up_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_images_drawing_arrow_up_svg__WEBPACK_IMPORTED_MODULE_4__);





var EmptyServicesListTip = function EmptyServicesListTip(_ref) {
  var t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Media__WEBPACK_IMPORTED_MODULE_2__["Media"], {
    align: "top",
    className: "EmptyServicesListTip"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Media__WEBPACK_IMPORTED_MODULE_2__["Img"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: assets_images_drawing_arrow_up_svg__WEBPACK_IMPORTED_MODULE_4___default.a
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Media__WEBPACK_IMPORTED_MODULE_2__["Bd"], {
    className: "EmptyServicesListTip-text"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_1__["Title"], null, t('connector.empty.title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_1__["Text"], {
    tag: "p",
    className: "u-mv-half"
  }, t('connector.empty.text'))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(EmptyServicesListTip));

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "7dT6":
/***/ (function(module) {

module.exports = {"app":{"logo":{"alt":"%{name} logo"},"logout":"Log out"},"date":{"format":"MM/DD/YYYY","placeholder":"mm/dd/yyyy"},"manifest":{"name":"Home","short_description":"Cozy Collect is the application that help you gather all your personal data inside Cozy.","long_description":"With Cozy Collect, you can easily:\n * Downloads documents from all your suppliers\n * Set how often Cozy will collect your bills\n * Access directly to the documents gathered by your Cozy","changes":"You haven't missed it, the Store arrived in your Cozy!\nWe took advantage of it to improve Collect:\n * Store adaptation.\n * Tile merge: when you have several accounts for a single supplier, the former are now merged under the supplier tile.\n * Improvement of some Connectors pages."},"add_service":"Add","fix_konnector_error":"Fix now","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Optional)","title":"Connect your %{name} account","data":{"title":"Collected data:","service":{"description":"Service description:"}},"tabs":{"sync":"synchronization","account":"account","data":"collected data"}},"disconnect":{"title":"Disconnection","description":"Your will be disconnected from this account, but imported data will be kept"},"form":{"title":"Account","label":{"firstname":"Firstname","lastname":"Lastname","login":"Login","consumerKey":"Consumer Key","consumerSecret":"Consumer Secret","appKey":"Application Key","appSecret":"Application Secret","tricountUrl":"Tricount URL","cardNumber":"Card Number","dob":"Date of birth","password":"Password","email":"Email","bank_identifier":"Bank identifier (optional)","profileName":"Profile Name","identifier":"Identifier","new_identifier":"Identifier","secret":"Password","answer":"Secret Answer","access_token":"Access token","accessTokenSecret":"Access token secret","apikey":"Api key","phoneNumber":"Phone number","folderPath":"Folder path","namePath":"Folder name","authCode":"Auth code","accountName":"Account name","loginUrl":"Login URL","token":"Token","agreement":"I agree","refreshToken":"Refresh Token","timeout":"Delay (ms)","branchName":"Branch","code":"Confidential code"},"placeholder":{"password":"The password you use to connect to the service","update_password":"Update the password","accountName":"Example: Personal account","namePath":"Example: Camille bills. Default name path is your login."},"button":{"connect":"Connect","cancel":"Cancel","save":"Save","disconnect":"Disconnect this account","delete":"Delete this account","advanced":"Advanced options","synchronize":"Synchronize now"}},"folder":{"title":"Related folder settings","withoutSettings":{"title":"Related folder"},"link":"Open the folder in Cozy Drive","changePath":"change the path","error":"Oops, something went wrong. Don't panic, your files are still there, please try again later","close":"close","warning":"You're changing your folder path","oldFiles":"All your olds bills will be moved in your new path.","newFiles":"Your news bills will be downloaded in your new path.","newPath":"Everything went well, the new path for your %{name} account is:","placeholder":{"administrative":"Administrative","photos":"Photos"}},"success":{"title":{"connect":"Successful configuration!","update":"Your %{name} account is updated!"},"banksLinkText":"See my accounts in %{appName}","driveLinkText":"Open the folder in Cozy Drive","button":"Close"},"message":{"folder":{"title":"Folder","link":"Open folder on cozy drive"},"success":{"connect":"Your data will be available in your Cozy in a few minutes and the next ones will follow automatically.","update":"Your %{name} account has been updated successfully.","delete":"Account removed succesfully."},"syncing":{"bill":"Your bills are syncing and will be available in the following path:"},"synced":{"title":"Your data synchronization","cron":"Synchronization frequency: %{frequency}","cron_hourly":"each hour","cron_daily":"once a day","cron_weekly":"once a week","cron_monthly":"once a month","cron_undefined":"manually","syncing":"running…","unknown":"unknown","last_sync":"Last synchronization: **%{date}**","date_format":"MMMM D[,] YYYY [at] HH[:]mm","bill":"Find your datas in the Drive app at this location:"},"error":{"server":"Apologies, our server had an hiccup, do you mind starting again?","bad_credentials":"Sorry, you entered an incorrect login or password.","delete":"Apologies, our server had an hiccup, do you mind starting again?"}},"forceConnection":"Run again now","editor_detail":"Service developed by %{editor}"},"account_picker":{"add_account_button":{"label":"Add an account"}},"apps":{"title":"My apps"},"connection":{"CTA":{"twofa_failed":"Run again now"},"error":{"default":{"title":"An error occured","description":"Unfortunately, something went wrong when trying to connect to %{name}. Please check again your account informations, visit our online help or contact us at contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Cozy Storage full","description":"This service cannot fetch your documents now. Please remove some files or go to **Settings > Storage** to get more free space."},"CHALLENGE_ASKED":{"title":"Challenge required","description":"It seems that the website requires a second authentification factor that we don’t support yet. You may try to settle the issue on the [%{name}](%{link}) website before a retry."},"LOGIN_FAILED":{"title":"Bad credentials","description":"Bad credentials. Check the konnector fields and run the connection again."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Needs secret","description":"An additional field must be filled in before checking your credentials."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporarily blocked","description":"Too many attempts occured. Please update your credentials on [%{name}](%{link}) website and update the konnector later on."},"MAINTENANCE":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable or the konnector must be updated. Please rerun the connector later or visit our online help."},"NOT_EXISTING_DIRECTORY":{"title":"Missing destination folder","description":"It seems that this account's destination folder has been deleted. Please restore it by disconnecting this account and then reconnect again."},"UNKNOWN_ERROR":{"title":"Connection error","description":"An unknown error has occurred."},"USER_ACTION_NEEDED":{"title":"Action needed on the provider","description":"It seems that the [%{name}](%{link}) website requires you to log in and to do a specific action. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Access refresh required","description":"The [%{name}](%{link}) service requires you to allow your access again. Please disconnect and reconnect your account %{name} to this application. No data will be lost."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Unavailable account","description":"It seems that your account is no longer active. Please check your account on [%{name}](%{link}) before retry."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Password update required","description":"It seems that the [%{name}](%{link}) website requires you to log in and update your password. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"New permissions validation needed","description":"You connector was updated and the permissions changed. Please validate them before launching the connector again."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relaunch the connexion to the service to fetch your data","description":"The last connexion to the service failed; please launch it again. You may have to provide a validation code."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Wrong two-factore code provided","description":"The two-factor code provided is wrong, please start again."},"VENDOR_DOWN":{"title":"Unavailable service","description":"It seems that the [%{name}](%{link}) service is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.BANK_DOWN":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Unavailable service","description":"It seems that we are experiencing overload with our bank konnectors at the moment. Please rerun the connector later."}}},"intent":{"konnector":{"install":{"error":{"message":"The konnector cannot be installed"}}},"service":{"return":"Back to connectors list","success":{"button":{"label":"Close"}},"error":{"initialization":"Service failed to initialize. Sorry for the inconvenience.","creation":"Unable to create account, an error occurred.","cause":"Cause: %{error}"},"cancel":"Cancel","terminate":"Terminate"}},"field":{"password":{"visibility":{"hide":"Hide","show":"Show","title":{"hide":"Hide password","show":"Show password"}}}},"nav":{"services":"My services"},"category":{"all":"All","banking":"Banks","health":"Health","insurance":"Insurance","transport":"Transportation","social":"Social","isp":"ISP","telecom":"Telecom","energy":"Energy","host_provider":"Host","productivity":"Productivity","shopping":"Shopping","public_service":"Public Services","other":"Others"},"loading":{"initial":"Loading accounts...","working":"Loading"},"validation":{"exact_length":"It's must be made up of %{length} characters exactly.","max_length":"The length maximum is %{length} characters.","min_length":"It should contain at least %{length} characters.","pattern":"The value must match a specific pattern: %{pattern}"},"update":{"title":"An update is available for this service.","regular":"Perform this update to keep fetching your data and to have the latest features","blocking":"Update it to keep fetching your data","CTA":"Update"},"error":{"initial":"Something went wrong when fetching your connectors and informations. Please refresh the page.","LOGIN_FAILED":"Bad credentials. Check the konnector fields and run the connection again.","UNKNOWN_ERROR":"Something unexpected happened while running the connector","JOB_TIMEOUT":"The connector execution was too long","button":{"reload":"Refresh now"}},"tutorial":{"cozy_collect":{"title":"Automate your data gathering","text":"They will be stored in your Cozy, you won't have to look for them anymore.","button":"Next"},"home":{"apps":{"button":"Next","text":"Easily manage your digital life (files, pictures, bank accounts, ...)","title":"Access to all your Cozy applications"},"services":{"button":"Let's configure my accounts","text":"They will be stored in your Cozy, you won't have to look for them anymore.","title":"Automate your data gathering"}},"menu_apps":{"title":"Your Cozy is so much more than a simple data aggregator","text":"Open the Applications menu to discover all the features your Cozy has to offer.","button":"Discover my Apps"}},"maintenance":{"icon":"This connector is under maintenance","service":"Service interrupted","problem":"%{konnectorName} doesn't allow your Cozy to access your data","title":"What is going on ?"},"connector":{"debug":{"successMessage":"This konnector is for debug purpose only, this is an additionnal custom success message."},"empty":{"title":"Start gathering your data!","text":"Synchronise your brands with your Cozy to automatically retrieve your data (bills, reimbursements, expenses…)"},"silenced":"%{name} won't be suggested anymore. You can always find a provider by clicking the \"Add\" button.","noAccount":"No account","add":"Add a service","update":"Update available","logo":{"alt":"%{name} logo"},"enedis":{"description":{"service":"Recover your Linky data by connecting your Enedis account. You must have a Linky meter and have first created your Enedis account (on the [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). This connector is provided by Fing for the MesInfos project. It retrieves the data from your electricity contract and downloads your electricity consumption the day before. This connector is running on your Cozy and the Fing will have no access to this data."}},"orange":{"message":{"delay":"Once connected, a demand to extract your data will be sent to Orange information system. These data will be available within 15 days. You data will be updated automatically, every 15 days."}},"orangemobile":{"description":{"connector":"In the context of 'MesInfos', Orange allows you to localize your phone regularly.\n\n**Data collection needs your express agreement**\n\nThis agreement may be revoked at any time by this data connector.\n\nBy clicking on \"Agree\", you give your consent to collect your phone's position, every 30 minutes. Information gathered will on be : \n<ul><li>Date and time of this location.</li><li>Location data of the closest radio antenna at the time of collect.</li></ul>Collected data by Orange after you agreement will be available only in your Cozy that you have been assigned in context of  « Mes Infos ». They will be added to location data already stored in call logs.","service":"This connector will download data from your Orange account on your Cozy. It will automatically download the call logs from your phone. Thus call logs include your phone number, your corresponding's phone number, date and time of this call and location data of the closest radio antenna at the time of collect.\n\nYou will be able to use these data in different apps in your Cozy, for example \"Mapping My Life\" (available soon on the Cozy Store).","field":{"agreement":"Do you agree that Orange localizes regularly your phone in context of  « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"This connector will download data from your Orange account on your Cozy. It will automatically download the list of movies you downloaded in free (TV Replay) or paid VOD from 01/01/2015 (adult contents are not included).\n\nYou will be able to use these data in different apps in your Cozy, for example \"My Movies Music\" (available soon on the Cozy Store)."}},"axabanque102":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo).","connector":"The secret answer is [asked by HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) when you connect without double authentication. Example: what is the name of your pet?"}},"ingdirect95":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Syncing accounts:","header_mobile":"%{done} of %{total}","header_done":"Synced %{done} out of %{total}","item":{"pending":"Pending"},"close":"Close"},"services":{"title":"My services"},"status":{"interrupted":"INTERRUPTED SERVICE","edf":{"maintenance":"EDF's information system has changed and the related data access doesn't work anymore. This konnector is not currently able to get back your data from EDF. We are trying to restore the situation and we will notice you when it will be fixed. [Learn more](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"MMM DD"}}}};

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "8CvS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_TYPES", function() { return ERROR_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_NEEDED_ERRORS_TYPES", function() { return UPDATE_NEEDED_ERRORS_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TWO_FA_ERRORS", function() { return TWO_FA_ERRORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFolderPermission", function() { return addFolderPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorLoginError", function() { return isKonnectorLoginError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorTwoFAError", function() { return isKonnectorTwoFAError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorUserError", function() { return isKonnectorUserError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorKnownError", function() { return isKonnectorKnownError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorUpdateNeededError", function() { return isKonnectorUpdateNeededError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildKonnectorError", function() { return buildKonnectorError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasPendingUpdate", function() { return hasPendingUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMostAccurateErrorKey", function() { return getMostAccurateErrorKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnectorMessage", function() { return getKonnectorMessage; });
/* konnector lib ready to be added to cozy-client-js */
var ERROR_TYPES = {
  CHALLENGE_ASKED: 'CHALLENGE_ASKED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  MAINTENANCE: 'MAINTENANCE',
  NOT_EXISTING_DIRECTORY: 'NOT_EXISTING_DIRECTORY',
  USER_ACTION_NEEDED: 'USER_ACTION_NEEDED',
  VENDOR_DOWN: 'VENDOR_DOWN',
  DISK_QUOTA_EXCEEDED: 'DISK_QUOTA_EXCEEDED'
};
var UPDATE_NEEDED_ERRORS_TYPES = {
  TERMS_VERSION_MISMATCH: 'TERMS_VERSION_MISMATCH'
};
var TWO_FA_ERRORS = ['USER_ACTION_NEEDED.TWOFA_EXPIRED', 'USER_ACTION_NEEDED.WRONG_TWOFA_CODE'];

function patchFolderPermission(cozy, konnector) {
  var folderId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var slug = konnector.attributes ? konnector.attributes.slug : konnector.slug;
  var saveFolder = folderId ? {
    type: 'io.cozy.files',
    values: [folderId]
  } : {};
  return cozy.fetchJSON('PATCH', "/permissions/konnectors/".concat(encodeURIComponent(slug)), {
    data: {
      attributes: {
        permissions: {
          saveFolder: saveFolder
        }
      }
    }
  });
}

function addFolderPermission(cozy, konnector, folderId) {
  return patchFolderPermission(cozy, konnector, folderId);
}
function isKonnectorLoginError(error) {
  return error && error.type && error.type === ERROR_TYPES.LOGIN_FAILED;
}
function isKonnectorTwoFAError(error) {
  return error && error.type && TWO_FA_ERRORS.includes(error.code);
}
function isKonnectorUserError(error) {
  return error && error.type && [ERROR_TYPES.CHALLENGE_ASKED, ERROR_TYPES.DISK_QUOTA_EXCEEDED, ERROR_TYPES.LOGIN_FAILED, ERROR_TYPES.NOT_EXISTING_DIRECTORY, ERROR_TYPES.USER_ACTION_NEEDED].includes(error.type);
}
function isKonnectorKnownError(error) {
  return error && error.type && Object.keys(ERROR_TYPES).includes(error.type);
}
function isKonnectorUpdateNeededError(error) {
  return error && error.type && Object.keys(UPDATE_NEEDED_ERRORS_TYPES).includes(error.type);
}
function buildKonnectorError(message) {
  var error = new Error(message);
  error.type = message.split('.')[0];
  error.code = message;
  return error;
}

var checkLocale = function checkLocale(t, key) {
  return t(key) !== key;
};

var hasPendingUpdate = function hasPendingUpdate(konnector) {
  return !!konnector.available_version;
};
var getMostAccurateErrorKey = function getMostAccurateErrorKey(t, error) {
  var getKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (key) {
    return key;
  };
  // Legacy. Kind of.
  if (!error.code) return error.message;
  var errorSegments = error.code.split('.');
  var tested = errorSegments;
  var fullKey = getKey(tested.join('.'));

  while (tested.length && !checkLocale(t, fullKey)) {
    tested = tested.slice(0, tested.length - 1);
    fullKey = getKey(tested.join('.'));
  }

  return tested.length ? fullKey : getKey('UNKNOWN_ERROR');
};
var legacyMessages = {
  terms: 'connector'
};
var getKonnectorMessage = function getKonnectorMessage(t, konnector, message) {
  var messages = konnector.messages,
      hasDescriptions = konnector.hasDescriptions;
  var providesMessage = messages && messages.length && messages.includes(message);
  if (providesMessage) return t("".concat(konnector.slug, ".messages.").concat(message));
  var providesLegacyMessage = hasDescriptions && hasDescriptions[legacyMessages[message] || message];
  if (providesLegacyMessage) return t("connector.".concat(konnector.slug, ".description.").concat(legacyMessages[message] || message));
  return null;
};

/***/ }),

/***/ "8Nns":
/***/ (function(module, exports) {

module.exports = "/img/drawing-arrow-up.svg";

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("201c");
__webpack_require__("7NIr");
module.exports = __webpack_require__("LiWt");


/***/ }),

/***/ "9a/K":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("sCMN");
/* harmony import */ var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("yoMi");
var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t("yoMi", 1);






var AddServiceTile = function AddServiceTile(_ref) {
  var label = _ref.label,
      client = _ref.client;
  var nativePath = '/discover/?type=konnector';
  var slug = 'store';
  var cozyURL = new URL(client.getStackClient().uri);

  var _client$getInstanceOp = client.getInstanceOptions(),
      subDomainType = _client$getInstanceOp.cozySubdomainType;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__["default"], {
    slug: 'store',
    nativePath: nativePath,
    href: Object(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__["generateWebLink"])({
      cozyUrl: cozyURL.origin,
      slug: slug,
      nativePath: nativePath,
      subDomainType: subDomainType
    })
  }, function (_ref2) {
    var onClick = _ref2.onClick,
        href = _ref2.href;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      onClick: onClick,
      href: href,
      className: "item item--ghost item--add-service"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "item-icon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      icon: "plus",
      size: 16,
      color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_4__['dodgerBlue']
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "item-title"
    }, label));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_1__["withClient"])(AddServiceTile));

/***/ }),

/***/ "9pOX":
/***/ (function(module) {

module.exports = {"app":{"logo":{"alt":"Logo de %{name}"},"logout":"Déconnexion"},"date":{"format":"DD/MM/YYYY","placeholder":"dd/mm/yyyy"},"manifest":{"name":"Accueil","short_description":"Cozy Collect est l'application de récupération de vos données personnelles disponible sur Cozy.","long_description":"Avec Cozy Collect, vous pouvez facilement :\n\n * Télécharger les documents de tous vos fournisseurs\n * Configurer la fréquence à laquelle Cozy va récupérer vos factures\n * Accéder directement aux documents récupérés par votre Cozy","changes":"Cela ne vous aura pas échappé, le Store est arrivé dans Cozy !\nNous en avons profité pour améliorer Collect :\n\n * Adaptation au Store.\n * Fusion des tuiles : lorsque vous avez plusieurs comptes pour un même fournisseur ces derniers sont désormais réunis sous la tuile de ce fournisseur.\n * Amélioration des pages des connecteurs."},"add_service":"Ajouter","fix_konnector_error":"Corriger maintenant","account":{"config":{"default_folder":"/Administratif/%{name}","optional":"(Optionnel)","title":"Connectez votre compte %{name}","data":{"title":"Données collectées :","service":{"description":"Description du service :"}},"tabs":{"sync":"Synchronisation","account":"Compte","data":"Données collectées"}},"disconnect":{"title":"Déconnexion","description":"Vous serez déconnecté de ce compte, mais les données importées seront conservées"},"form":{"title":"Compte","label":{"firstname":"Prénom","lastname":"Nom","login":"Identifiant","consumerKey":"Clé client","consumerSecret":"Secret client","appKey":"Clé de l'application","appSecret":"Secret de l'application","tricountUrl":"URL Tricount","cardNumber":"Numéro de carte","dob":"Date de naissance","password":"Mot de passe","email":"Mail","bank_identifier":"Identifiant bancaire (optionnel)","profileName":"Nom de Profil","identifier":"Identifiant","new_identifier":"Identifiant","secret":"Mot de passe","answer":"Réponse secrète","access_token":"Jeton d'accès","accessTokenSecret":"Secret du jeton d'accès","apikey":"Clé d'API","phoneNumber":"Numéro de téléphone","folderPath":"Emplacement du dossier","namePath":"Nom du dossier","authCode":"Code d'authentification","accountName":"Nom du compte","loginUrl":"URL d'authentification","token":"Jeton","agreement":"J'accepte","refreshToken":"Mettre à jour le jeton","timeout":"Délai (ms)","branchName":"Agence","code":"Code confidentiel"},"placeholder":{"password":"Le mot de passe utilisé pour vous connecter au service","update_password":"Mettre à jour le mot de passe","accountName":"Exemple: Compte personnel","namePath":"Example : Factures de Camille. Le dossier par défaut sera votre identifiant."},"button":{"connect":"Se connecter","cancel":"Annuler","save":"Sauvegarder","disconnect":"Déconnecter ce compte","delete":"Supprimer ce compte","advanced":"Configuration avancée","synchronize":"Mettre à jour maintenant"}},"folder":{"title":"Paramètres du dossier associé","withoutSettings":{"title":"Dossier associé"},"link":"Ouvrir le dossier dans Cozy Drive","changePath":"Changer le dossier","error":"Mince, quelque chose c'est mal passé. Ne vous inquiétez pas, vos fichiers sont toujours là.","close":"fermer","warning":"Vous êtes en train de modifier le dossier de votre connecteur","oldFiles":"Toutes vos anciennes factures seront déplacées dans votre nouveau dossier.","newFiles":"Toutes vos nouvelles factures seront téléchargées dans votre nouveau dossier.","newPath":"Tout s'est bien passé, le nouveau dossier de votre compte %{name} est :","placeholder":{"administrative":"Administratif","photos":"Photos"}},"success":{"title":{"connect":"Configuration réussie !","update":"Votre compte %{name} est mis à jour !"},"banksLinkText":"Voir mes comptes dans %{appName}","driveLinkText":"Ouvrir le dossier dans Cozy Drive","button":"Fermer"},"message":{"folder":{"title":"Dossier","link":"Ouvrir le dossier dans Cozy Drive"},"success":{"connect":"Vos données existantes seront disponibles dans votre Cozy dans quelques minutes et les prochaines suivront automatiquement.","update":"Votre compte %{name} a été mis à jour avec succès.","delete":"Compte supprimé avec succès."},"syncing":{"bill":"Vos factures sont en cours de synchronisation et seront disponibles au chemin suivant :"},"synced":{"title":"Mise à jour de vos données","cron":"Fréquence de mise à jour : %{frequency}","cron_hourly":"une fois par heure","cron_daily":"une fois par jour","cron_weekly":"hebdomadaire","cron_monthly":"une fois par mois","cron_undefined":"manuellement","syncing":"en cours…","unknown":"indéterminée","last_sync":"Dernière mise à jour : **%{date}**","date_format":"Le D MMMM YYYY [à] HH[:]mm","bill":"Retrouvez vos données dans l'application Cozy Drive à l'emplacement :"},"error":{"server":"Une erreur est survenue, vos identifiants n'ont pas pu être enregistrés. Pouvez-vous recommencer ?","bad_credentials":"Votre identifiant et/ou mot de passe ne sont pas corrects.","delete":"Une erreur est survenue, vos identifiants n'ont pas pu être enregistrés. Pouvez-vous recommencer ?"}},"forceConnection":"Relancer maintenant","editor_detail":"Service développé par %{editor}"},"account_picker":{"add_account_button":{"label":"Ajouter un compte"}},"apps":{"title":"Mes applications"},"connection":{"CTA":{"twofa_failed":"Relancer maintenant"},"error":{"default":{"title":"Une erreur est survenue","description":"Un problème semble s'être produit pendant la tentative de connexion à %{name}. Merci de revérifier vos informations de compte, de consulter notre aide en ligne ou de nous contacter à contact@cozycloud.cc"},"DISK_QUOTA_EXCEEDED":{"title":"Espace Cozy plein","description":"Actuellement, le service ne peut plus récupérer vos documents.\nLibérez de l'espace en supprimant des fichiers ou rendez-vous dans **Paramètres > Stockage** pour augmenter l'espace de stockage de votre Cozy"},"CHALLENGE_ASKED":{"title":"Second facteur d’authentification demandé","description":"Un second facteur d’authentification que nous ne gérons pas encore est demandé. Vous pouvez essayer de vous connecter directement sur le site [%{name}](%{link}) avant de réessayer."},"LOGIN_FAILED":{"title":"Mauvais identifiants","description":"Données de connexion incorrectes. Vérifiez les données de connexion dans le connecteur et relancez la connexion."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Informations requise","description":"Un champ additionnel doit être rempli pour vérifier vos identifiants."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporairement bloqué","description":"Trop de tentatives erronées ont eu lieu. Merci de modifier votre mot de passe sur le site [%{name}](%{link}) et de mettre à jour le connecteur ensuite."},"MAINTENANCE":{"title":"Site non disponible","description":"Il semble que le site [%{name}](%{link}) soit indisponible. Merci de relancer ultérieurement ou de consulter notre aide en ligne."},"NOT_EXISTING_DIRECTORY":{"title":"Dossier de destination manquant","description":"Il semble que le dossier de destination pour ce compte ait été supprimé. Merci de le restaurer en déconnectant ce compte puis en le reconnectant à nouveau."},"UNKNOWN_ERROR":{"title":"Erreur de Connexion","description":"Une erreur inconnue est survenue"},"USER_ACTION_NEEDED":{"title":"Action nécessaire chez le fournisseur","description":"Il semble que le site [%{name}](%{link}) ait besoin que vous vous y authentifiiez pour faire une action spécifique. Merci de relancer le connecteur une fois cette action effectuée."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Actualisation de l'accès requis","description":"Il semble que le site [%{name}](%{link}) demande d'autoriser à nouveau le connecteur. Merci de déconnecter puis reconnecter votre compte %{name}. Aucune donnée ne sera perdue."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Compte client non accessible","description":"Il semble que votre compte ne soit plus actif. Merci de vérifier son statut sur le site [%{name}](%{link}) avant de réessayer."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Renouvellement de mot de passe demandé","description":"Il semble que le site [%{name}](%{link}) ait besoin que vous vous y authentifiiez pour renouveler votre mot de passe. Merci de relancer le connecteur une fois cette action effectuée."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Validation des nouvelles permissions nécessaire","description":"Votre connecteur a été mis à jour et les permissions nécessaires ont changé. Merci de valider les nouvelles permissions avant de relancer le connecteur."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relancez la connexion au service pour récupérer vos données.","description":"La dernière connexion au service a échoué; merci de la relancer.\nIl vous faudra peut-être renseigner un code de validation."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Le code fournis ne semble pas correct","description":"Le code de deux facteurs est incorrect, veuillez recommencer."},"VENDOR_DOWN":{"title":"Service non disponible","description":"Il semble que le service [%{name}](%{link}) ne nous réponde pas dans les temps actuellement. Merci de relancer ultérieurement."},"VENDOR_DOWN.BANK_DOWN":{"title":"Site non disponible","description":"Site non disponible"},"VENDOR_DOWN.LINXO_DOWN":{"title":"Service non disponible","description":"Il semble que le site [%{name}](%{link}) ne nous réponde pas dans les temps actuellement. Merci de relancer ultérieurement."}}},"intent":{"konnector":{"install":{"error":{"message":"Le connecteur ne peut pas être installé"}}},"service":{"return":"Revenir à la liste des connecteurs","success":{"button":{"label":"Fermer"}},"error":{"initialization":"L'initialisation du service a échoué.","creation":"Impossible de créer le compte, il y a eu une erreur.","cause":"Raison : %{error}"},"cancel":"Annuler","terminate":"Terminer"}},"field":{"password":{"visibility":{"hide":"Masquer","show":"Afficher","title":{"hide":"Masquer le mot de passe","show":"Afficher le mot de passe"}}}},"nav":{"services":"Services installés"},"category":{"all":"Tous","banking":"Banques","health":"Santé","insurance":"Assurance","transport":"Voyage et transport","social":"Social","isp":"Internet","telecom":"Mobile","energy":"Énergie","host_provider":"Hébergeur","productivity":"Productivité","shopping":"Shopping","public_service":"Services publics","other":"Autres"},"loading":{"initial":"Chargement des comptes…","working":"Chargement"},"validation":{"exact_length":"La valeur doit faire exactement %{length} caractères.","max_length":"La longueur maximum est de %{length} caractères.","min_length":"La valeur doit contenir au moins %{length} caractères.","pattern":"La valeur doit respecter un format spécifique : %{pattern}"},"update":{"title":"Une mise à jour est disponible pour ce service.","regular":"Effectuez la mise à jour pour continuer à récupérer vos données et profiter des dernières fonctionnalités","blocking":"Mettez-le à jour pour continuer à récupérer vos données","CTA":"Mettre à jour"},"error":{"initial":"Quelque chose s’est mal passé pendant la récupération de vos connecteurs et de vos informations. Merci de recharger la page.","LOGIN_FAILED":"Données de connexion incorrectes. Vérifiez les données de connexion dans le connecteur et relancez la connexion.","UNKNOWN_ERROR":"Quelque-chose d’inattendu s‘est produit pendant l’exécution du connecteur","JOB_TIMEOUT":"L’exécution du connecteur a pris trop de temps","button":{"reload":"Rechargez la page maintenant"}},"tutorial":{"cozy_collect":{"title":"Automatisez la récupération de vos données","text":"Elles seront conservées dans votre Cozy pour que vous n'ayez plus à les chercher.","button":"Suivant"},"home":{"apps":{"button":"Suivant","text":"Gérez facilement toute votre vie numérique (photos, fichiers, compte bancaires, …)","title":"Retrouvez toutes les applications de votre Cozy"},"services":{"button":"Je connecte mes comptes","text":"Elles seront conservées dans votre Cozy pour que vous n'ayez plus à les chercher.","title":"Automatisez la récupération de vos données"}},"menu_apps":{"title":"Votre Cozy est bien plus qu’un simple agrégateur de données","text":"Ouvrez le menu Applications pour découvrir toutes les possibilités offertes par votre Cozy.","button":"Je découvre mes Applications"}},"maintenance":{"icon":"Ce connecteur est en cours de maintenance","service":"Service interrompu","problem":"%{konnectorName} ne permet pas à votre Cozy d'accéder à vos données","title":"Que se passe-t-il ?"},"connector":{"debug":{"successMessage":"Ce konnecteur est utilisé uniquement pour déboguer l'application, ceci est un message de succès additionnel."},"empty":{"title":"Commencez à réunir vos données !","text":"Synchronisez vos marques avec votre Cozy pour récupérer automatiquement vos données (factures, remboursements, dépenses…)"},"silenced":"%{name} n’est plus proposé. Vous pourrez toujours retrouver un fournisseur en cliquant sur \"Ajouter\"","noAccount":"Aucun compte","add":"Ajouter un service","update":"Mise à jour dispo.","logo":{"alt":"Logo de %{name}"},"enedis":{"description":{"service":"Retrouvez vos données Linky en connectant votre compte Enedis. Vous devez avoir un compteur Linky et avoir préalablement créé votre compte Enedis (sur [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Ce connecteur est proposé par Fing pour le projet MesInfos. Il récupère les données de votre contrat d'électricité et télécharge vos consommations électriques de la veille. Ce connecteur fonctionne sur votre Cozy et Fing n'aura aucun accès à vos données."}},"orange":{"message":{"delay":"Une demande d’extraction de vos données a été émise vers le système d’information d’Orange. Ces données seront disponibles sous 7 jours. Par la suite, vos données seront mises à jour automatiquement dans votre espace Cozy Cloud, à intervalles de 7 jours."}},"orangemobile":{"description":{"connector":"**De manière optionnelle et dans le cadre du pilote « Mes Infos »**, Orange vous offre aussi la possibilité de localiser votre téléphone mobile de manière régulière.\n\n**Le recueil de ces données nécessite votre accord explicite.**\n\nCet accord pourra être révoqué à tout moment via ce même connecteur de données.\n\nEn cliquant sur « Accepter », vous donnerez votre accord pour qu’une localisation de votre téléphone mobile soit effectuée à compter de ce jour, deux fois par heure. Les informations recueillies contiendront uniquement :\n<ul><li>La date et l’heure de cette localisation.</li><li>Les coordonnées géographiques de l’antenne radio à laquelle le mobile est rattaché au moment de la localisation.</li></ul>Les données récoltées par Orange  seront accessibles, après votre accord, uniquement dans le Cozy Cloud qui vous a été attribué dans le cadre du pilote « Mes Infos ». Elles viendront compléter les informations de localisation déjà présentes dans les comptes rendus d’appels.","service":"Les données mises à disposition par Orange via ce connecteur contiennent les comptes rendus des appels émis et reçus depuis votre mobile à partir du 01/07/2016. Ces comptes rendus incluent votre numéro, celui de votre correspondant, l’heure et la durée de l’appel, ainsi que la localisation géographique de l’antenne radio à laquelle le mobile était rattaché au moment de l’appel.\n\nVous pourrez utiliser ces données dans différentes applications de votre Cozy Cloud, par exemple « Mapping My Life » (disponibilité prochaine sur le Cozy Store)","field":{"agreement":"Acceptez-vous qu’Orange localise régulièrement votre téléphone mobile dans le cadre du pilote « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"Les données mises à disposition par Orange via ce connecteur contiennent la liste des films que vous avez visionnés à partir du 01/01/2015 en VOD payante ou gratuite (Replay TV) à partir de votre Livebox (à l’exception des contenus « adulte »). \n\nVous pourrez utiliser ces données dans différentes applications de votre Cozy, par exemple « La Musique de mes Films » (disponibilité prochaine sur le Cozy Store) "}},"axabanque102":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo). "}},"bforbank97":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo).","connector":"La réponse secrète est [demandée par HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) lors d'une connexion sans double authentification. Exemple: quel est le nom de votre animal de compagnie? "}},"ingdirect95":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Synchronisation :","header_mobile":"%{done} sur %{total}","header_done":"Synchronisé %{done} sur %{total}","item":{"pending":"En cours"},"close":"Fermer"},"services":{"title":"Mes services"},"status":{"interrupted":"SERVICE INTERROMPU","edf":{"maintenance":"EDF a modifié son système d'information et son accès à vos données ne fonctionne plus. Ce connecteur n'est donc pas actuellement en mesure de récupérer vos données personnelles détenues par EDF. Nous tentons de rétablir la situation et vous informerons dès que le service sera rétabli. [En savoir plus](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"DD MMM"}}}};

/***/ }),

/***/ "AEoj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authenticateWithCordova", function() { return authenticateWithCordova; });
/* global prompt */
var hasCordovaPlugin = function hasCordovaPlugin() {
  return window.cordova !== undefined && window.cordova.InAppBrowser !== undefined;
};

var REGISTRATION_ABORT = 'REGISTRATION_ABORT';
var authenticateWithCordova = function authenticateWithCordova(url) {
  if (hasCordovaPlugin()) {
    return new Promise(function (resolve, reject) {
      var target = '_blank';
      var options = 'clearcache=yes,zoom=no';
      var inAppBrowser = window.cordova.InAppBrowser.open(url, target, options);

      var removeListener = function removeListener() {
        inAppBrowser.removeEventListener('loadstart', onLoadStart);
        inAppBrowser.removeEventListener('exit', onExit);
      };

      var onLoadStart = function onLoadStart(_ref) {
        var url = _ref.url;
        var accessCode = /\?access_code=(.+)$/.test(url);
        var state = /\?state=(.+)$/.test(url);

        if (accessCode || state) {
          resolve(url);
          removeListener();
          inAppBrowser.close();
        }
      };

      var onExit = function onExit() {
        reject(new Error(REGISTRATION_ABORT));
        removeListener();
        inAppBrowser.close();
      };

      inAppBrowser.addEventListener('loadstart', onLoadStart);
      inAppBrowser.addEventListener('exit', onExit);
    });
  } else {
    /**
     * for dev purpose:
     * In oauth workflow, the server displays an authorization page
     * User must accept to give permission then the server gives an url
     * with query parameters used by cozy-client-js to initialize itself.
     *
     * This hack let developers open the authorization page in a new tab
     * then get the "access_code" url and paste it in the prompt to let the
     * application initialize and redirect to other pages.
     */
    return new Promise(function (resolve) {
      setTimeout(function () {
        var token = prompt('Paste the url here:');
        resolve(token);
      }, 10000);
    });
  }
};

/***/ }),

/***/ "Al7w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyProvider; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);









var CozyProvider =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(CozyProvider, _Component);

  function CozyProvider() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CozyProvider);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(CozyProvider).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CozyProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        domain: this.props.domain,
        secure: this.props.secure,
        store: this.props.store || this.context.store,
        client: this.props.client
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return CozyProvider;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(CozyProvider, "propTypes", {
  domain: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  secure: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  store: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    subscribe: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired,
    dispatch: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired,
    getState: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired
  }),
  client: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.element.isRequired
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(CozyProvider, "childContextTypes", {
  domain: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  secure: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  store: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  client: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(CozyProvider, "contextTypes", {
  store: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
});



/***/ }),

/***/ "B/vO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_AppIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rvOC");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);




 // TODO Update the component in cozy-ui to handle secure and domain natively

var AppIcon = function AppIcon(_ref) {
  var client = _ref.client,
      otherProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["client"]);

  var cozyURL = new URL(client.getStackClient().uri);
  var domain = cozyURL.host;
  var secure = cozyURL.protocol === 'https:';
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_AppIcon__WEBPACK_IMPORTED_MODULE_3__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    domain: domain,
    secure: secure
  }, otherProps));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"])(AppIcon));

/***/ }),

/***/ "Cz6i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Labs_IconGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7HjR");
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("sCMN");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("B/vO");








var CandidateCategoryTile = function CandidateCategoryTile(_ref) {
  var t = _ref.t,
      slugs = _ref.slugs,
      category = _ref.category,
      client = _ref.client;
  var cozyURL = new URL(client.getStackClient().uri);
  var app = 'store';
  var nativePath = "/discover?type=konnector&category=".concat(category);

  var _client$getInstanceOp = client.getInstanceOptions(),
      subDomainType = _client$getInstanceOp.cozySubdomainType;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    slug: app,
    nativePath: nativePath,
    href: Object(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__["generateWebLink"])({
      cozyUrl: cozyURL.origin,
      slug: app,
      nativePath: nativePath,
      subDomainType: subDomainType
    })
  }, function (_ref2) {
    var onClick = _ref2.onClick,
        href = _ref2.href;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      onClick: onClick,
      href: href,
      className: "item item--ghost"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "item-icon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Labs_IconGrid__WEBPACK_IMPORTED_MODULE_3__["default"], null, slugs.map(function (slug) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
        alt: t('app.logo.alt', {
          name: category
        }),
        app: slug,
        key: slug,
        className: "item-grid-icon"
      });
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "item-title"
    }, t("category.".concat(category))));
  });
};

CandidateCategoryTile.propTypes = {
  slugs: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string).isRequired,
  category: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  client: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_5__["withClient"])(CandidateCategoryTile)));

/***/ }),

/***/ "EoZk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorTile", function() { return KonnectorTile; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("eO8H");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("yoMi");
var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_15___namespace = /*#__PURE__*/__webpack_require__.t("yoMi", 1);
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("B/vO");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("4YEU");
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("cokx");
/* harmony import */ var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("iDCe");





















var getKonnectorError = function getKonnectorError(_ref) {
  var error = _ref.error,
      lang = _ref.lang,
      konnector = _ref.konnector;

  if (!error || !error.message) {
    return null;
  }

  var konnError = new cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_19__["KonnectorJobError"](error.message);
  return Object(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_19__["getErrorLocaleBound"])(konnError, konnector, lang, 'title');
};

var STATUS = {
  OK: 0,
  UPDATE: 1,
  MAINTENANCE: 2,
  ERROR: 3,
  NO_ACCOUNT: 4
};

var getKonnectorStatus = function getKonnectorStatus(_ref2) {
  var konnector = _ref2.konnector,
      isInMaintenance = _ref2.isInMaintenance,
      error = _ref2.error,
      userError = _ref2.userError,
      accountsCount = _ref2.accountsCount;
  if (konnector.available_version) return STATUS.UPDATE;else if (isInMaintenance) return STATUS.MAINTENANCE;else if (error || userError) return STATUS.ERROR;else if (!accountsCount) return STATUS.NO_ACCOUNT;else return STATUS.OK;
};

var KonnectorTile =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(KonnectorTile, _Component);

  function KonnectorTile() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, KonnectorTile);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(KonnectorTile).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(KonnectorTile, [{
    key: "render",
    value: function render() {
      var _statusThemes;

      var _this$props = this.props,
          accountsCount = _this$props.accountsCount,
          error = _this$props.error,
          isInMaintenance = _this$props.isInMaintenance,
          userError = _this$props.userError,
          konnector = _this$props.konnector,
          route = _this$props.route,
          t = _this$props.t,
          lang = _this$props.lang;
      var statusThemes = (_statusThemes = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_statusThemes, STATUS.NO_ACCOUNT, {
        className: 'item--ghost',
        icon: null,
        color: null
      }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_statusThemes, STATUS.MAINTENANCE, {
        className: 'item--maintenance',
        icon: 'wrench-circle',
        color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_15__.coolGrey
      }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_statusThemes, STATUS.ERROR, {
        className: null,
        icon: 'warning-circle',
        color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_15__.pomegranate
      }), _statusThemes);
      var hideKonnectorErrors = cozy_flags__WEBPACK_IMPORTED_MODULE_12___default()('hide_konnector_errors'); // flag used for some demo instances where we want to ignore all konnector errors

      var status = hideKonnectorErrors ? STATUS.OK : getKonnectorStatus({
        konnector: konnector,
        isInMaintenance: isInMaintenance,
        error: error,
        userError: userError,
        accountsCount: accountsCount
      });

      var _get = lodash_get__WEBPACK_IMPORTED_MODULE_11___default()(statusThemes, status, {}),
          statusClassName = _get.className,
          icon = _get.icon,
          color = _get.color;

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["NavLink"], {
        className: classnames__WEBPACK_IMPORTED_MODULE_7___default()('item', statusClassName),
        to: route,
        title: getKonnectorError({
          error: error,
          lang: lang,
          konnector: konnector
        })
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "item-icon"
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_16__["default"], {
        alt: t('app.logo.alt', {
          name: konnector.name
        }),
        app: konnector
      }), icon && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_14__["default"], {
        icon: icon,
        className: "item-status",
        color: color
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h3", {
        className: "item-title"
      }, konnector.name));
    }
  }]);

  return KonnectorTile;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);
KonnectorTile.propTypes = {
  accountsCount: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number,
  error: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object,
  isInMaintenance: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool.isRequired,
  userError: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object,
  konnector: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object,
  route: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string.isRequired,
  t: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state, props) {
  var konnector = props.konnector;
  return {
    // /!\ error can also be a userError.
    error: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_17__["getFirstError"])(state.connections, konnector.slug),
    userError: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_17__["getFirstUserError"])(state.connections, konnector.slug),
    lastSyncDate: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_17__["getLastSyncDate"])(state.connections, konnector.slug),
    accountsCount: Object(reducers__WEBPACK_IMPORTED_MODULE_18__["getKonnectorTriggersCount"])(state, konnector)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_13__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps)(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["withRouter"])(KonnectorTile))));

/***/ }),

/***/ "FwS1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"queue":"queue--E5doD","queue--visible":"queue--visible--3kodM","queue-header":"queue-header--1xuYz","queue-header-inner":"queue-header-inner--2hQ34","btn-close":"btn-close--1_NjM","queue-progress":"queue-progress--3kjuG","queue-content":"queue-content--3aNvV","queue--collapsed":"queue--collapsed--aksIJ","queue-list":"queue-list--3gpgx","queue-item--error":"queue-item--error--11w-V","queue-item--done":"queue-item--done--fE0KV","queue-item":"queue-item--2nmo3","queue-item-progress-bar":"queue-item-progress-bar--2-yvo","item-label":"item-label--1Q26g","item-ext":"item-ext--3RUut","item-status":"item-status--qmrpq","item-icon":"item-icon--2Q7Zb","item-icon-img":"item-icon-img--7qiT6","item-pending":"item-pending--1lCQW"};

/***/ }),

/***/ "GbhZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_DOCUMENT", function() { return CREATE_DOCUMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchApps", function() { return fetchApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCollection", function() { return fetchCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchDocument", function() { return fetchDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReferencedFiles", function() { return fetchReferencedFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTriggers", function() { return fetchTriggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectors", function() { return fetchKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDocument", function() { return createDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTrigger", function() { return createTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "launchTrigger", function() { return launchTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDocument", function() { return updateDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDocument", function() { return deleteDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTrigger", function() { return deleteTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFile", function() { return createFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trashFile", function() { return trashFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addReferencedFiles", function() { return addReferencedFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeReferencedFiles", function() { return removeReferencedFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeActionCreator", function() { return makeActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeFetchMoreAction", function() { return makeFetchMoreAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applySelectorForAction", function() { return applySelectorForAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enhancePropsForActions", function() { return enhancePropsForActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCollection", function() { return getCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocument", function() { return getDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCollectionFetched", function() { return isCollectionFetched; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("fvjX");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("oMPT");
/* harmony import */ var _slices_sharings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("og8P");
/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("skrj");








var APPS_DOCTYPE = 'io.cozy.apps';
var FETCH_DOCUMENT = 'FETCH_DOCUMENT';
var FETCH_COLLECTION = 'FETCH_COLLECTION';
var LAUNCH_TRIGGER = 'LAUNCH_TRIGGER';
var RECEIVE_DATA = 'RECEIVE_DATA';
var RECEIVE_ERROR = 'RECEIVE_ERROR';
var CREATE_DOCUMENT = 'CREATE_DOCUMENT';
var UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
var DELETE_DOCUMENT = 'DELETE_DOCUMENT';
var RECEIVE_APP = 'RECEIVE_APP';
var RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT';
var RECEIVE_UPDATED_DOCUMENT = 'RECEIVE_UPDATED_DOCUMENT';
var RECEIVE_DELETED_DOCUMENT = 'RECEIVE_DELETED_DOCUMENT';
var FETCH_REFERENCED_FILES = 'FETCH_REFERENCED_FILES';
var ADD_REFERENCED_FILES = 'ADD_REFERENCED_FILES';
var REMOVE_REFERENCED_FILES = 'REMOVE_REFERENCED_FILES';

var documents = function documents() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_APP:
      {
        var apps = action.response && action.response.data;
        if (apps.length === 0) return state;
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, APPS_DOCTYPE, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[APPS_DOCTYPE], objectifyDocumentsArray(apps))));
      }

    case RECEIVE_DATA:
      {
        var data = action.response.data;
        if (data.length === 0) return state;
        var dataDoctype = getArrayDoctype(data);
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, dataDoctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[dataDoctype], objectifyDocumentsArray(data))));
      }

    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_UPDATED_DOCUMENT:
      {
        var doc = action.response.data[0];
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, doc._type, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[doc._type], _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, doc.id, doc))));
      }

    case RECEIVE_DELETED_DOCUMENT:
      {
        var deleted = action.response.data[0];
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, deleted._type, Object(_utils__WEBPACK_IMPORTED_MODULE_5__["removeObjectProperty"])(state[deleted._type], deleted.id)));
      }

    case ADD_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        'io.cozy.files': _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state['io.cozy.files'], updateFilesReferences(state['io.cozy.files'], action.ids, action.document))
      });

    case REMOVE_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        'io.cozy.files': _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state['io.cozy.files'], removeFilesReferences(state['io.cozy.files'], action.ids, action.document))
      });

    default:
      return state;
  }
};

var objectifyDocumentsArray = function objectifyDocumentsArray(documents) {
  return documents.reduce(function (obj, doc) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, obj, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, doc.id, doc));
  }, {});
};

var updateFileReference = function updateFileReference(
/* eslint-disable-next-line casecamelcase */
_ref, doc) {
  var _ref$relationships = _ref.relationships,
      referenced_by = _ref$relationships.referenced_by,
      relationships = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref$relationships, ["referenced_by"]),
      file = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["relationships"]);

  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, file, {
    relationships: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, relationships, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, referenced_by.data,
    /* eslint-disable-next-line casecamelcase */
    referenced_by.data === null ? [{
      id: doc.id,
      type: doc.type
    }] :
    /* eslint-disable-next-line casecamelcase */
    [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(referenced_by.data), [{
      id: doc.id,
      type: doc.type
    }])))
  });
};

var updateFilesReferences = function updateFilesReferences(files, newlyReferencedIds, doc) {
  return newlyReferencedIds.reduce(function (updated, id) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, updated, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, id, updateFileReference(files[id], doc)));
  }, {});
};

var removeFileReferences = function removeFileReferences(
/* eslint-disable-next-line casecamelcase */
_ref2, doc) {
  var _ref2$relationships = _ref2.relationships,
      referenced_by = _ref2$relationships.referenced_by,
      relationships = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref2$relationships, ["referenced_by"]),
      file = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref2, ["relationships"]);

  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, file, {
    relationships: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, relationships, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, referenced_by.data, referenced_by.data.filter(function (rel) {
      return rel.type !== doc.type && rel.id !== doc.id;
    })))
  });
};

var removeFilesReferences = function removeFilesReferences(files, removedIds, doc) {
  return removedIds.reduce(function (updated, id) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, updated, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, id, removeFileReferences(files[id], doc)));
  }, {});
};

var getDoctype = function getDoctype(_ref3) {
  var doctype = _ref3._type;

  // TODO: don't know why the stack returns 'file' here..
  if (doctype === 'file') {
    return 'io.cozy.files';
  }

  return doctype;
};

var getArrayDoctype = function getArrayDoctype(documents) {
  return getDoctype(documents[0]);
}; // collection reducers


var collectionInitialState = {
  type: null,
  options: {},
  fetchStatus: 'pending',
  lastFetch: null,
  hasMore: false,
  count: 0,
  ids: []
};

var collection = function collection() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : collectionInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        type: action.doctype || 'io.cozy.files',
        options: action.options,
        fetchStatus: action.skip > 0 ? 'loadingMore' : 'loading'
      });

    case RECEIVE_APP:
    case RECEIVE_DATA:
      {
        var response = action.response;
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
          fetchStatus: 'loaded',
          lastFetch: Date.now(),
          hasMore: response.next !== undefined ? response.next : state.hasMore,
          count: response.meta && response.meta.count ? response.meta.count : response.data.length,
          ids: !action.skip ? response.data.map(function (doc) {
            return doc.id;
          }) : [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(state.ids), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(response.data.map(function (doc) {
            return doc.id;
          })))
        });
      }

    case ADD_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        type: 'io.cozy.files',
        count: state.count + action.ids.length,
        ids: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(state.ids), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(action.ids))
      });

    case REMOVE_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        count: state.count - action.ids.length,
        ids: state.ids.filter(function (id) {
          return action.ids.indexOf(id) === -1;
        })
      });

    case RECEIVE_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        fetchStatus: 'failed'
      });

    case RECEIVE_NEW_DOCUMENT:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        ids: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(state.ids), [action.response.data[0].id])
      });

    case RECEIVE_DELETED_DOCUMENT:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        ids: state.ids.filter(function (id) {
          return id !== action.response.data[0].id;
        })
      });

    default:
      return state;
  }
};

var collections = function collections() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var applyUpdate = function applyUpdate(collections, updateAction) {
    return updateAction.updateCollections.reduce(function (updated, name) {
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, updated, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, name, collection(collections[name], action)));
    }, {});
  };

  switch (action.type) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
    case ADD_REFERENCED_FILES:
    case REMOVE_REFERENCED_FILES:
    case RECEIVE_APP:
    case RECEIVE_DATA:
    case RECEIVE_ERROR:
      if (!action.collection) {
        return state;
      }

      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.collection, collection(state[action.collection], action)));

    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_DELETED_DOCUMENT:
      if (!action.updateCollections) {
        return state;
      }

      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, applyUpdate(state, action));

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_4__["combineReducers"])({
  collections: collections,
  documents: documents,
  sharings: _slices_sharings__WEBPACK_IMPORTED_MODULE_6__["default"],
  synchronization: _slices_synchronization__WEBPACK_IMPORTED_MODULE_7__["default"]
}));
var fetchApps = function fetchApps(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_APP, RECEIVE_ERROR],
    collection: name,
    doctype: 'io.cozy.apps',
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchApps(name, options, skip);
    }
  };
};
var fetchCollection = function fetchCollection(name, doctype) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
    collection: name,
    doctype: doctype,
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchCollection(name, doctype, options, skip);
    }
  };
};
var fetchDocument = function fetchDocument(doctype, id) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    types: [FETCH_DOCUMENT, RECEIVE_DATA, RECEIVE_ERROR],
    doctype: doctype,
    id: id,
    options: options,
    promise: function promise(client) {
      return client.fetchDocument(doctype, id);
    }
  };
};
var fetchReferencedFiles = function fetchReferencedFiles(doc) {
  var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    types: [FETCH_REFERENCED_FILES, RECEIVE_DATA, RECEIVE_ERROR],
    collection: "".concat(doc._type, "/").concat(doc.id, "#files"),
    document: doc,
    options: {},
    skip: skip,
    promise: function promise(client) {
      return client.fetchReferencedFiles(doc, skip);
    }
  };
};
var fetchTriggers = function fetchTriggers(name, worker) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
    collection: name,
    doctype: 'io.cozy.triggers',
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchTriggers(name, worker, options, skip);
    }
  };
};
var fetchKonnectors = function fetchKonnectors(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
    collection: name,
    doctype: 'io.cozy.konnectors',
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchKonnectors(name, options, skip);
    }
  };
};
var createDocument = function createDocument(doctype, doc) {
  var actionOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    doctype: doctype,
    document: doc,
    promise: function promise(client) {
      return client.createDocument(doctype, doc);
    }
  }, actionOptions);
};
var createTrigger = function createTrigger(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.createTrigger(doc);
    }
  }, actionOptions);
};
var launchTrigger = function launchTrigger(trigger) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [LAUNCH_TRIGGER, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    trigger: trigger,
    promise: function promise(client) {
      return client.launchTrigger(trigger);
    }
  }, actionOptions);
};
var updateDocument = function updateDocument(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [UPDATE_DOCUMENT, RECEIVE_UPDATED_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.updateDocument(doc);
    }
  }, actionOptions);
};
var deleteDocument = function deleteDocument(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.deleteDocument(doc);
    }
  }, actionOptions);
};
var deleteTrigger = function deleteTrigger(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.deleteTrigger(doc);
    }
  }, actionOptions);
};
var createFile = function createFile(file, dirID) {
  var actionOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    doctype: 'io.cozy.files',
    promise: function promise(client) {
      return client.createFile(file, dirID);
    }
  }, actionOptions);
};
var trashFile = function trashFile(file) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
    document: file,
    promise: function promise(client) {
      return client.trashFile(file);
    }
  }, actionOptions);
};
var addReferencedFiles = function addReferencedFiles(doc, ids) {
  return {
    type: ADD_REFERENCED_FILES,
    collection: "".concat(doc._type, "/").concat(doc._id, "#files"),
    document: doc,
    ids: ids,
    promise: function promise(client) {
      return client.addReferencedFiles(doc, ids);
    }
  };
};
var removeReferencedFiles = function removeReferencedFiles(doc, ids) {
  return {
    type: REMOVE_REFERENCED_FILES,
    collection: "".concat(doc._type, "/").concat(doc._id, "#files"),
    document: doc,
    ids: ids,
    promise: function promise(client) {
      return client.removeReferencedFiles(doc, ids);
    }
  };
};
var makeActionCreator = function makeActionCreator(promise) {
  return {
    promise: promise
  };
};
var makeFetchMoreAction = function makeFetchMoreAction(_ref4, skip) {
  var types = _ref4.types,
      collection = _ref4.collection,
      document = _ref4.document,
      doctype = _ref4.doctype,
      options = _ref4.options;
  return types[0] === FETCH_REFERENCED_FILES ? fetchReferencedFiles(document, skip) : fetchCollection(collection, doctype, options, skip);
};
var applySelectorForAction = function applySelectorForAction(state, action) {
  switch (action.types[0]) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
      return getCollection(state, action.collection);

    case FETCH_DOCUMENT:
      return getDocument(state, action.doctype, action.id);

    case _slices_sharings__WEBPACK_IMPORTED_MODULE_6__["FETCH_SHARINGS"]:
      return action.id ? Object(_slices_sharings__WEBPACK_IMPORTED_MODULE_6__["getSharingDetails"])(state, action.doctype, action.id, action.options) : Object(_slices_sharings__WEBPACK_IMPORTED_MODULE_6__["getSharings"])(state, action.doctype, action.options);

    default:
      return null;
  }
};
var enhancePropsForActions = function enhancePropsForActions(props, fetchActions, dispatch) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_5__["mapValues"])(fetchActions, function (action, propName) {
    var dataObject = props[propName];

    switch (action.types[0]) {
      case FETCH_COLLECTION:
      case FETCH_REFERENCED_FILES:
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, dataObject, {
          fetchMore: dataObject.hasMore ? function () {
            return dispatch(makeFetchMoreAction(action, dataObject.data.length));
          } : null
        });

      default:
        return dataObject;
    }
  });
}; // selectors

var mapDocumentsToIds = function mapDocumentsToIds(documents, doctype, ids) {
  return ids.map(function (id) {
    return documents[doctype][id];
  });
};

var getCollection = function getCollection(state, name) {
  var collection = state.cozy.collections[name];

  if (!collection) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, collectionInitialState, {
      data: null
    });
  }

  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, collection, {
    data: mapDocumentsToIds(state.cozy.documents, collection.type, collection.ids)
  });
};
var getDocument = function getDocument(state, doctype, id) {
  var documents = state.cozy.documents[doctype];

  if (!documents) {
    return null;
  }

  return documents[id];
};
var isCollectionFetched = function isCollectionFetched(state, name) {
  return state.cozy.collections[name] && state.cozy.collections[name].fetchStatus === 'loaded';
};

/***/ }),

/***/ "GfxC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadArchive", function() { return downloadArchive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return downloadFile; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);



/* global cozy */
var slugify = function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w-]+/g, '') // Remove all non-word chars
  .replace(/--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '');
}; // Trim - from end of text


var forceFileDownload = function forceFileDownload(href, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', href);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}; // async helpers: they interact with the stack but not with the store


var downloadArchive =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(notSecureFilename, fileIds) {
    var filename, href, fullpath;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filename = slugify(notSecureFilename);
            _context.next = 3;
            return cozy.client.files.getArchiveLinkByIds(fileIds, filename);

          case 3:
            href = _context.sent;
            _context.next = 6;
            return cozy.client.fullpath(href);

          case 6:
            fullpath = _context.sent;
            forceFileDownload(fullpath, filename + '.zip');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadArchive(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var downloadFile =
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(file) {
    var response, blob;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return cozy.client.files.downloadById(file.id);

          case 2:
            response = _context2.sent;
            _context2.next = 5;
            return response.blob();

          case 5:
            blob = _context2.sent;
            forceFileDownload(window.URL.createObjectURL(blob), file.name);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadFile(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "Gyt3":
/***/ (function(module) {

module.exports = {"konnectors":[{"slug":"ameli","name":"Ameli"},{"slug":"impots","name":"Impôts.gouv.fr"}],"categories":{"banking":["hsbc119","caissedepargne1","ingdirect95","cic45"],"isp":["sfr","free","orange","bouyguestelecom"],"insurance":["maifecheancier","alan","harmonie","macif"],"energy":["engie","planeteoui","veoliaeau","ekwateur"]}};

/***/ }),

/***/ "IiGW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTile", function() { return AppTile; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("sCMN");
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("B/vO");











var applications = cozy_client__WEBPACK_IMPORTED_MODULE_7__["models"].applications;
var AppTile =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AppTile, _Component);

  function AppTile() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AppTile);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(AppTile).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AppTile, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          app = _this$props.app,
          t = _this$props.t,
          lang = _this$props.lang;
      var displayName = applications.getAppDisplayName(app, lang);
      var appHref = app.links && app.links.related;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_9__["default"], {
        slug: app.slug,
        href: appHref
      }, function (_ref) {
        var onClick = _ref.onClick,
            href = _ref.href;
        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
          onClick: onClick,
          href: href,
          className: "item"
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "item-icon"
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_10__["default"], {
          alt: t('app.logo.alt', {
            name: displayName
          }),
          app: app
        })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h3", {
          className: "item-title"
        }, displayName));
      });
    }
  }]);

  return AppTile;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
AppTile.propTypes = {
  app: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object.isRequired,
  t: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__["translate"])()(AppTile));

/***/ }),

/***/ "J+FN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("sCMN");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("B/vO");
/* harmony import */ var hooks_useRegistryInformation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("fl/O");









var FallbackCandidateServiceTile = function FallbackCandidateServiceTile(_ref) {
  var t = _ref.t,
      slug = _ref.slug,
      client = _ref.client;
  var cozyURL = new URL(client.getStackClient().uri);
  var app = 'store';
  var nativePath = "/discover/".concat(slug);

  var _client$getInstanceOp = client.getInstanceOptions(),
      subDomainType = _client$getInstanceOp.cozySubdomainType;

  var registryData = Object(hooks_useRegistryInformation__WEBPACK_IMPORTED_MODULE_7__["default"])(client, slug);
  var name = registryData ? lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(registryData, 'latest_version.manifest.name', slug) : '';
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    slug: app,
    nativePath: nativePath,
    href: Object(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__["generateWebLink"])({
      cozyUrl: cozyURL.origin,
      slug: app,
      nativePath: nativePath,
      subDomainType: subDomainType
    })
  }, function (_ref2) {
    var onClick = _ref2.onClick,
        href = _ref2.href;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      onClick: onClick,
      href: href,
      className: "item item--ghost"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "item-icon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
      alt: t('app.logo.alt', {
        name: name
      }),
      app: slug
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "item-title"
    }, name));
  });
};

FallbackCandidateServiceTile.propTypes = {
  slug: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  client: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_5__["withClient"])(FallbackCandidateServiceTile)));

/***/ }),

/***/ "KAKi":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": "7dT6",
	"./en.json": "7dT6",
	"./es": "oway",
	"./es.json": "oway",
	"./fr": "9pOX",
	"./fr.json": "9pOX"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "KAKi";

/***/ }),

/***/ "Lf2i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONNECTION_STATUS", function() { return CONNECTION_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CollectStore; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lib_triggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("WWPq");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("oBqo");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_realtime__WEBPACK_IMPORTED_MODULE_6__);






/* global cozy */


var CONNECTION_STATUS = {
  ERRORED: 'errored',
  RUNNING: 'running',
  CONNECTED: 'connected'
};
var ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
var JOBS_DOCTYPE = 'io.cozy.jobs';
var TRIGGERS_DOCTYPE = 'io.cozy.triggers';

var normalize = function normalize(dbObject, doctype) {
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, dbObject, dbObject.attributes, {
    id: dbObject._id,
    _type: doctype || dbObject._type
  });
};

var CollectStore =
/*#__PURE__*/
function () {
  function CollectStore(context, client) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, CollectStore);

    this.client = client;
    this.listener = null;
    this.options = options;
    this.categories = __webpack_require__("QxZi");
    this.updateUnfinishedJob = this.updateUnfinishedJob.bind(this);
    this.onAccountCreated = this.onAccountCreated.bind(this);
    this.onAccountUpdated = this.onAccountUpdated.bind(this);
    this.onAccountDeleted = this.onAccountDeleted.bind(this);
    this.onTriggerCreated = this.onTriggerCreated.bind(this);
    this.onTriggerDeleted = this.onTriggerDeleted.bind(this);
    this.initializeRealtime();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(CollectStore, [{
    key: "initializeRealtime",
    value: function initializeRealtime() {
      this.realtime = new cozy_realtime__WEBPACK_IMPORTED_MODULE_6___default.a({
        client: this.client
      });
      this.realtime.subscribe('created', JOBS_DOCTYPE, this.updateUnfinishedJob);
      this.realtime.subscribe('updated', JOBS_DOCTYPE, this.updateUnfinishedJob);
      this.realtime.subscribe('created', ACCOUNTS_DOCTYPE, this.onAccountCreated);
      this.realtime.subscribe('updated', ACCOUNTS_DOCTYPE, this.onAccountUpdated);
      this.realtime.subscribe('deleted', ACCOUNTS_DOCTYPE, this.onAccountDeleted);
      this.realtime.subscribe('created', TRIGGERS_DOCTYPE, this.onTriggerCreated);
      this.realtime.subscribe('deleted', TRIGGERS_DOCTYPE, this.onTriggerDeleted);
    }
  }, {
    key: "onAccountCreated",
    value: function () {
      var _onAccountCreated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(account) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_NEW_DOCUMENT',
                  response: {
                    data: [normalize(account, ACCOUNTS_DOCTYPE)]
                  },
                  updateCollections: ['accounts']
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onAccountCreated(_x) {
        return _onAccountCreated.apply(this, arguments);
      }

      return onAccountCreated;
    }()
  }, {
    key: "onAccountUpdated",
    value: function () {
      var _onAccountUpdated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(account) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_UPDATED_DOCUMENT',
                  response: {
                    data: [normalize(account, ACCOUNTS_DOCTYPE)]
                  },
                  updateCollections: ['accounts']
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onAccountUpdated(_x2) {
        return _onAccountUpdated.apply(this, arguments);
      }

      return onAccountUpdated;
    }()
  }, {
    key: "onAccountDeleted",
    value: function () {
      var _onAccountDeleted = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(account) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_DELETED_DOCUMENT',
                  response: {
                    data: [normalize(account, ACCOUNTS_DOCTYPE)]
                  },
                  updateCollections: ['accounts']
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onAccountDeleted(_x3) {
        return _onAccountDeleted.apply(this, arguments);
      }

      return onAccountDeleted;
    }()
  }, {
    key: "onTriggerCreated",
    value: function () {
      var _onTriggerCreated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(trigger) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_NEW_DOCUMENT',
                  response: {
                    data: [normalize(trigger, TRIGGERS_DOCTYPE)]
                  },
                  updateCollections: ['triggers']
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onTriggerCreated(_x4) {
        return _onTriggerCreated.apply(this, arguments);
      }

      return onTriggerCreated;
    }()
  }, {
    key: "onTriggerUpdated",
    value: function () {
      var _onTriggerUpdated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(trigger) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_UPDATED_DOCUMENT',
                  response: {
                    data: [normalize(trigger, TRIGGERS_DOCTYPE)]
                  },
                  updateCollections: ['triggers']
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onTriggerUpdated(_x5) {
        return _onTriggerUpdated.apply(this, arguments);
      }

      return onTriggerUpdated;
    }()
  }, {
    key: "onTriggerDeleted",
    value: function () {
      var _onTriggerDeleted = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(trigger) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_DELETED_DOCUMENT',
                  response: {
                    data: [normalize(trigger, TRIGGERS_DOCTYPE)]
                  },
                  updateCollections: ['triggers']
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onTriggerDeleted(_x6) {
        return _onTriggerDeleted.apply(this, arguments);
      }

      return onTriggerDeleted;
    }()
  }, {
    key: "updateUnfinishedJob",
    value: function () {
      var _updateUnfinishedJob = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(job) {
        var normalizedJob, isKonnectorJob, isDeletedAccountHookJob, trigger;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                normalizedJob = normalize(job, JOBS_DOCTYPE); // TODO Filter by worker on the WebSocket when it will be available in the
                // stack

                isKonnectorJob = normalizedJob.worker === 'konnector';
                isDeletedAccountHookJob = !!normalizedJob.account_deleted;

                if (!(!isKonnectorJob || isDeletedAccountHookJob)) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return");

              case 5:
                this.dispatch({
                  type: 'RECEIVE_NEW_DOCUMENT',
                  response: {
                    data: [normalizedJob]
                  },
                  updateCollections: ['jobs']
                });
                _context7.next = 8;
                return lib_triggers__WEBPACK_IMPORTED_MODULE_5__["fetch"](cozy.client, normalizedJob.trigger_id);

              case 8:
                trigger = _context7.sent;
                this.onTriggerUpdated(trigger);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function updateUnfinishedJob(_x7) {
        return _updateUnfinishedJob.apply(this, arguments);
      }

      return updateUnfinishedJob;
    }()
  }, {
    key: "createIntentService",
    value: function createIntentService(intent, window) {
      return cozy.client.intents.createService(intent, window);
    } // Get the drive and banks application url using the list of application

  }, {
    key: "fetchUrls",
    value: function fetchUrls() {
      var _this = this;

      return cozy.client.fetchJSON('GET', '/apps/').then(function (body) {
        body.forEach(function (item) {
          if (!item.attributes || !item.attributes.slug || !item.links) return;

          switch (item.attributes.slug) {
            case 'banks':
              _this.banksUrl = "".concat(item.links.related);
              break;

            default:
              break;
          }
        });
      }).catch(function (err) {
        // eslint-disable-next-line no-console
        console.warn(err.message);
        return false;
      });
    }
  }]);

  return CollectStore;
}();



/***/ }),

/***/ "LiWt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("m+TH");
/* harmony import */ var url_search_params_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dasq");
/* harmony import */ var url_search_params_polyfill__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(url_search_params_polyfill__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("Le8U");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("iDCe");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("buk/");
/* harmony import */ var config_collect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("qgiu");
var config_collect__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t("qgiu", 1);
/* harmony import */ var lib_PiwikHashRouter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("ygPf");
/* harmony import */ var store_configureStore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("cXEB");
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("/8/d");
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("M50D");
/* harmony import */ var cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var intro_js_fix_cozy_minified_introjs_min_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("MkRj");
/* harmony import */ var intro_js_fix_cozy_minified_introjs_min_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(intro_js_fix_cozy_minified_introjs_min_css__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var styles_index_styl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("/kYV");
/* harmony import */ var styles_index_styl__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(styles_index_styl__WEBPACK_IMPORTED_MODULE_15__);


/* global __DEVELOPMENT__ */















var lang = document.documentElement.getAttribute('lang') || 'en';
var context = window.context || 'cozy';
var ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
document.addEventListener('DOMContentLoaded', function () {
  if (Object(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_7__["handleOAuthResponse"])()) return;
  var root = document.querySelector('[role=application]');
  var data = root.dataset;
  var legacyClient = new redux_cozy_client__WEBPACK_IMPORTED_MODULE_3__["CozyClient"]({
    cozyURL: "//".concat(data.cozyDomain),
    token: data.cozyToken
  }); // New improvements must be done with CozyClient

  var cozyClient = new cozy_client__WEBPACK_IMPORTED_MODULE_5___default.a({
    uri: "".concat(window.location.protocol, "//").concat(data.cozyDomain),
    schema: {
      app: cozy_doctypes__WEBPACK_IMPORTED_MODULE_6__["Application"].schema,
      accounts: {
        doctype: ACCOUNTS_DOCTYPE,
        attributes: {},
        relationships: {
          master: {
            type: 'has-one',
            doctype: ACCOUNTS_DOCTYPE
          }
        }
      },
      permissions: {
        doctype: 'io.cozy.permissions',
        attributes: {}
      },
      triggers: {
        doctype: 'io.cozy.triggers'
      },
      jobs: {
        doctype: 'io.cozy.jobs'
      }
    },
    token: data.cozyToken
  }); // store

  var store = Object(store_configureStore__WEBPACK_IMPORTED_MODULE_11__["default"])(legacyClient, cozyClient, context, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({
    lang: lang
  }, config_collect__WEBPACK_IMPORTED_MODULE_9__));

  var dictRequire = function dictRequire(lang) {
    return __webpack_require__("KAKi")("./".concat(lang));
  };

  var App = __webpack_require__("bRzR").default;

  Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_5__["CozyProvider"], {
    client: cozyClient
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(redux_cozy_client__WEBPACK_IMPORTED_MODULE_3__["CozyProvider"], {
    store: store,
    client: cozyClient,
    domain: data.cozyDomain,
    secure: !true
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__["default"], {
    lang: lang,
    dictRequire: dictRequire,
    context: context
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(lib_PiwikHashRouter__WEBPACK_IMPORTED_MODULE_10__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(App, config_collect__WEBPACK_IMPORTED_MODULE_9__))))), document.querySelector('[role=application]'));
});

/***/ }),

/***/ "NfqR":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"coz-loading-placeholder":"coz-loading-placeholder--iKREi","placeHolderShimmer":"placeHolderShimmer--25Y66"};

/***/ }),

/***/ "Ntnw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorErrors", function() { return KonnectorErrors; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("eO8H");
/* harmony import */ var lodash_keyBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("QVEU");
/* harmony import */ var lodash_keyBy__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_keyBy__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("56YH");
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_flow__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cozy_ui_transpiled_react_Infos__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("M2p0");
/* harmony import */ var cozy_ui_transpiled_react_InfosCarrousel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("ski3");
/* harmony import */ var cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_transpiled_react_Text__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("H+Xc");
/* harmony import */ var reducers_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("cokx");
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("4DAK");
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("B/vO");
/* harmony import */ var config_collect__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("qgiu");
var config_collect__WEBPACK_IMPORTED_MODULE_18___namespace = /*#__PURE__*/__webpack_require__.t("qgiu", 1);
/* harmony import */ var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("iDCe");




















var _models$triggers = cozy_client__WEBPACK_IMPORTED_MODULE_4__["models"].triggers,
    triggersModel = _models$triggers.triggers,
    triggerStatesModel = _models$triggers.triggerStates,
    accountsModel = cozy_client__WEBPACK_IMPORTED_MODULE_4__["models"].accounts;

var muteTrigger =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(client, trigger, accountsById) {
    var accountId, initialAccount, errorType, account;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accountId = triggersModel.getAccountId(trigger);
            initialAccount = accountsById[accountId];
            errorType = triggerStatesModel.getLastErrorType(trigger);
            account = accountsModel.muteError(initialAccount, errorType);
            _context.next = 6;
            return client.save(account);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function muteTrigger(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getKonnectorSlug = function getKonnectorSlug(konnector) {
  return konnector.slug;
};

var KonnectorErrors = function KonnectorErrors(_ref2) {
  var t = _ref2.t,
      lang = _ref2.lang,
      triggersInError = _ref2.triggersInError,
      accountsWithErrors = _ref2.accountsWithErrors,
      installedKonnectors = _ref2.installedKonnectors,
      history = _ref2.history,
      client = _ref2.client,
      isMobile = _ref2.breakpoints.isMobile;
  var accountsWithErrorsById = lodash_keyBy__WEBPACK_IMPORTED_MODULE_7___default()(accountsWithErrors, '_id');
  var installedKonnectorsBySlug = lodash_keyBy__WEBPACK_IMPORTED_MODULE_7___default()(installedKonnectors, getKonnectorSlug);
  var nonMutedTriggerErrors = triggersInError.filter(function (trigger) {
    var errorType = triggerStatesModel.getLastErrorType(trigger);
    var accountId = triggersModel.getAccountId(trigger);
    var account = accountsWithErrorsById[accountId];
    var konnectorSlug = triggersModel.getKonnector(trigger);
    var hasInstalledKonnector = installedKonnectors.some(function (_ref3) {
      var slug = _ref3.slug;
      return slug === konnectorSlug;
    });
    return config_collect__WEBPACK_IMPORTED_MODULE_18__.displayedErrorTypes.includes(errorType) && hasInstalledKonnector && account && !triggersModel.isLatestErrorMuted(trigger, account);
  });
  return nonMutedTriggerErrors.length > 0 ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "KonnectorErrors"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_transpiled_react_InfosCarrousel__WEBPACK_IMPORTED_MODULE_10__["default"], {
    theme: "danger"
  }, nonMutedTriggerErrors.map(function (trigger, index) {
    var errorType = triggerStatesModel.getLastErrorType(trigger);
    var konnError = new cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_19__["KonnectorJobError"](errorType);
    var konnectorSlug = triggersModel.getKonnector(trigger);
    var konnectorAccount = triggersModel.getAccountId(trigger);
    var konnector = installedKonnectorsBySlug[konnectorSlug];
    var errorTitle = Object(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_19__["getErrorLocaleBound"])(konnError, konnector, lang, 'title');
    var errorDescription = Object(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_19__["getErrorLocaleBound"])(konnError, konnector, lang, 'description');
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_transpiled_react_Infos__WEBPACK_IMPORTED_MODULE_9__["default"], {
      key: trigger._id,
      description: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "u-pomegranate u-flex u-flex-row u-flex-items-center"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_17__["default"], {
        alt: t('app.logo.alt', {
          name: konnectorSlug
        }),
        app: konnectorSlug,
        className: "u-w-2 u-h-2 u-w-1-half-s u-h-1-half-s u-mr-1"
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "u-fz-tiny"
      }, konnector.name), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_transpiled_react_Text__WEBPACK_IMPORTED_MODULE_12__["SubTitle"], {
        className: "u-pomegranate u-fz-medium u-fz-small-m"
      }, nonMutedTriggerErrors.length > 1 ? "(".concat(index + 1, "/").concat(nonMutedTriggerErrors.length, ") ") : null, errorTitle))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_transpiled_react_Text__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: "u-fz-small-m"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_16__["default"], {
        source: errorDescription
      }))),
      action: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_11__["default"], {
        theme: "secondary",
        label: t('fix_konnector_error'),
        className: "u-mh-0",
        size: isMobile ? 'small' : 'normal',
        onClick: function onClick() {
          return history.push("/connected/".concat(konnectorSlug, "/accounts/").concat(konnectorAccount));
        }
      }),
      dismissAction: function dismissAction() {
        return muteTrigger(client, trigger, accountsWithErrorsById);
      }
    });
  }))) : null;
};
KonnectorErrors.propTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
  triggersInError: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array.isRequired,
  accountsWithErrors: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array.isRequired,
  installedKonnectors: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array.isRequired,
  history: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  client: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  breakpoints: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    isMobile: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool.isRequired
  }).isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    triggersInError: Object(reducers_index__WEBPACK_IMPORTED_MODULE_15__["getTriggersInError"])(state),
    accountsWithErrors: Object(reducers_index__WEBPACK_IMPORTED_MODULE_15__["getAccountsWithErrors"])(state),
    installedKonnectors: Object(reducers_index__WEBPACK_IMPORTED_MODULE_15__["getInstalledKonnectors"])(state)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (lodash_flow__WEBPACK_IMPORTED_MODULE_8___default()(Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps), react_router_dom__WEBPACK_IMPORTED_MODULE_6__["withRouter"], cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"], Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_13__["translate"])(), Object(cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_14__["withBreakpoints"])())(KonnectorErrors));

/***/ }),

/***/ "OiML":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyClient; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _DataAccessFacade__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("+tca");
/* harmony import */ var _authentication_mobile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("AEoj");









/* global cozy */


var APPS_DOCTYPE = 'io.cozy.apps';
var FILES_DOCTYPE = 'io.cozy.files';
var TRIGGERS_DOCTYPE = 'io.cozy.triggers';
var KONNECTORS_DOCTYPE = 'io.cozy.konnectors';
var SHARINGS_DOCTYPE = 'io.cozy.sharings';

var CozyClient =
/*#__PURE__*/
function () {
  function CozyClient(config) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, CozyClient);

    var cozyURL = config.cozyURL,
        options = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5___default()(config, ["cozyURL"]);

    this.options = options;
    this.indexes = {};
    this.specialDirectories = {};
    this.facade = new _DataAccessFacade__WEBPACK_IMPORTED_MODULE_8__["default"]();

    if (cozyURL) {
      this.facade.setup(cozyURL, options);
    }
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(CozyClient, [{
    key: "register",
    value: function register(cozyUrl) {
      this.facade.setup(cozyUrl, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, this.options, {
        oauth: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, this.options.oauth, {
          onRegistered: function onRegistered(client, url) {
            return Object(_authentication_mobile__WEBPACK_IMPORTED_MODULE_9__["authenticateWithCordova"])(url);
          }
        })
      }));
      return cozy.client.authorize(true);
    }
  }, {
    key: "isRegistered",
    value: function () {
      var _isRegistered = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(clientInfos) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (clientInfos) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return cozy.client.auth.getClient(clientInfos);

              case 5:
                return _context.abrupt("return", true);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);

                if (!(_context.t0.message === 'Failed to fetch')) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", true);

              case 14:
                console.warn(_context.t0); // eslint-disable-line no-console

                return _context.abrupt("return", false);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 8]]);
      }));

      function isRegistered(_x) {
        return _isRegistered.apply(this, arguments);
      }

      return isRegistered;
    }()
  }, {
    key: "startSync",
    value: function startSync(dispatch) {
      return this.facade.startSync(dispatch);
    }
  }, {
    key: "startReplicationTo",
    value: function startReplicationTo(dispatch) {
      return this.facade.startReplicationTo(dispatch);
    }
  }, {
    key: "startReplicationFrom",
    value: function startReplicationFrom(dispatch) {
      return this.facade.startReplicationFrom(dispatch);
    }
  }, {
    key: "getAdapter",
    value: function getAdapter(doctype) {
      return this.facade.getAdapter(doctype);
    }
  }, {
    key: "fetchApps",
    value: function () {
      var _fetchApps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.getAdapter(APPS_DOCTYPE).fetchApps());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchApps() {
        return _fetchApps.apply(this, arguments);
      }

      return fetchApps;
    }()
  }, {
    key: "fetchCollection",
    value: function () {
      var _fetchCollection = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3(name, doctype) {
        var options,
            skip,
            index,
            _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                skip = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : 0;

                if (!options.selector) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 5;
                return this.getCollectionIndex(name, doctype, options);

              case 5:
                index = _context3.sent;
                return _context3.abrupt("return", this.getAdapter(doctype).queryDocuments(doctype, index, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, options, {
                  skip: skip
                })));

              case 7:
                return _context3.abrupt("return", this.getAdapter(doctype).fetchDocuments(doctype));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchCollection(_x2, _x3) {
        return _fetchCollection.apply(this, arguments);
      }

      return fetchCollection;
    }()
  }, {
    key: "fetchDocument",
    value: function fetchDocument(doctype, id) {
      return this.getAdapter(doctype).fetchDocument(doctype, id);
    }
  }, {
    key: "fetchFile",
    value: function fetchFile(id) {
      return this.getAdapter(FILES_DOCTYPE).fetchFile(id);
    }
  }, {
    key: "fetchReferencedFiles",
    value: function fetchReferencedFiles(doc) {
      var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this.getAdapter(doc._type).fetchReferencedFiles(doc, skip);
    }
  }, {
    key: "fetchTriggers",
    value: function fetchTriggers(name, worker) {
      return this.getAdapter(TRIGGERS_DOCTYPE).fetchTriggers(worker);
    }
  }, {
    key: "fetchKonnectors",
    value: function fetchKonnectors() {
      return this.getAdapter(KONNECTORS_DOCTYPE).fetchKonnectors();
    }
  }, {
    key: "addReferencedFiles",
    value: function addReferencedFiles(doc, ids) {
      return this.getAdapter(doc._type).addReferencedFiles(doc, ids);
    }
  }, {
    key: "removeReferencedFiles",
    value: function removeReferencedFiles(doc, ids) {
      return this.getAdapter(doc._type).removeReferencedFiles(doc, ids);
    }
  }, {
    key: "createDocument",
    value: function createDocument(doctype, doc) {
      return this.getAdapter(doctype).createDocument(doctype, doc);
    }
  }, {
    key: "createTrigger",
    value: function createTrigger(doc) {
      return this.getAdapter(doc._type).createTrigger(doc);
    }
  }, {
    key: "launchTrigger",
    value: function launchTrigger(doc) {
      return this.getAdapter(doc._type).launchTrigger(doc);
    }
  }, {
    key: "updateDocument",
    value: function updateDocument(doc) {
      return this.getAdapter(doc._type).updateDocument(doc);
    }
  }, {
    key: "deleteDocument",
    value: function deleteDocument(doc) {
      return this.getAdapter(doc._type).deleteDocument(doc);
    }
  }, {
    key: "deleteTrigger",
    value: function deleteTrigger(doc) {
      return this.getAdapter(doc._type).deleteTrigger(doc);
    }
  }, {
    key: "fetchSharings",
    value: function () {
      var _fetchSharings = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4(doctype) {
        var _this = this;

        var permissions, sharingIds, sharings;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getAdapter(doctype).fetchSharingPermissions(doctype);

              case 2:
                permissions = _context4.sent;
                sharingIds = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(permissions.byMe.map(function (p) {
                  return p.attributes.source_id;
                })), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(permissions.withMe.map(function (p) {
                  return p.attributes.source_id;
                })));
                _context4.next = 6;
                return Promise.all(sharingIds.map(function (id) {
                  return _this.getAdapter(SHARINGS_DOCTYPE).fetchSharing(id);
                }));

              case 6:
                sharings = _context4.sent;
                return _context4.abrupt("return", {
                  permissions: permissions,
                  sharings: sharings
                });

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchSharings(_x4) {
        return _fetchSharings.apply(this, arguments);
      }

      return fetchSharings;
    }()
  }, {
    key: "createSharing",
    value: function createSharing(permissions, contactIds, sharingType, description) {
      return this.getAdapter(SHARINGS_DOCTYPE).createSharing(permissions, contactIds, sharingType, description);
    }
  }, {
    key: "revokeSharing",
    value: function revokeSharing(sharingId) {
      return this.getAdapter(SHARINGS_DOCTYPE).revokeSharing(sharingId);
    }
  }, {
    key: "revokeSharingForClient",
    value: function revokeSharingForClient(sharingId, clientId) {
      return this.getAdapter(SHARINGS_DOCTYPE).revokeSharingForClient(sharingId, clientId);
    }
  }, {
    key: "createSharingLink",
    value: function createSharingLink(permissions) {
      return this.getAdapter(SHARINGS_DOCTYPE).createSharingLink(permissions);
    }
  }, {
    key: "revokeSharingLink",
    value: function revokeSharingLink(permission) {
      return this.getAdapter(SHARINGS_DOCTYPE).revokeSharingLink(permission);
    }
  }, {
    key: "createFile",
    value: function createFile(file, dirID) {
      return this.getAdapter(FILES_DOCTYPE).createFile(file, dirID);
    }
  }, {
    key: "trashFile",
    value: function trashFile(file) {
      return this.getAdapter(FILES_DOCTYPE).trashFile(file);
    }
  }, {
    key: "ensureDirectoryExists",
    value: function () {
      var _ensureDirectoryExists = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5(path) {
        var dir;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.specialDirectories[path]) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 3;
                return cozy.client.files.createDirectoryByPath(path);

              case 3:
                dir = _context5.sent;
                this.specialDirectories[path] = dir._id;

              case 5:
                return _context5.abrupt("return", this.specialDirectories[path]);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function ensureDirectoryExists(_x5) {
        return _ensureDirectoryExists.apply(this, arguments);
      }

      return ensureDirectoryExists;
    }()
  }, {
    key: "checkUniquenessOf",
    value: function () {
      var _checkUniquenessOf = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6(doctype, property, value) {
        var index, existingDocs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getUniqueIndex(doctype, property);

              case 2:
                index = _context6.sent;
                _context6.next = 5;
                return cozy.client.data.query(index, {
                  selector: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, property, value),
                  fields: ['_id']
                });

              case 5:
                existingDocs = _context6.sent;
                return _context6.abrupt("return", existingDocs.length === 0);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkUniquenessOf(_x6, _x7, _x8) {
        return _checkUniquenessOf.apply(this, arguments);
      }

      return checkUniquenessOf;
    }()
  }, {
    key: "getCollectionIndex",
    value: function () {
      var _getCollectionIndex = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7(name, doctype, options) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.indexes[name]) {
                  _context7.next = 4;
                  break;
                }

                _context7.next = 3;
                return this.getAdapter(doctype).createIndex(doctype, this.getIndexFields(options));

              case 3:
                this.indexes[name] = _context7.sent;

              case 4:
                return _context7.abrupt("return", this.indexes[name]);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getCollectionIndex(_x9, _x10, _x11) {
        return _getCollectionIndex.apply(this, arguments);
      }

      return getCollectionIndex;
    }()
  }, {
    key: "getUniqueIndex",
    value: function () {
      var _getUniqueIndex = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee8(doctype, property) {
        var name;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                name = "".concat(doctype, "/").concat(property);

                if (this.indexes[name]) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 4;
                return this.getAdapter(doctype).createIndex(doctype, [property]);

              case 4:
                this.indexes[name] = _context8.sent;

              case 5:
                return _context8.abrupt("return", this.indexes[name]);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getUniqueIndex(_x12, _x13) {
        return _getUniqueIndex.apply(this, arguments);
      }

      return getUniqueIndex;
    }()
  }, {
    key: "getIndexFields",
    value: function getIndexFields(options) {
      var selector = options.selector,
          sort = options.sort;

      if (sort) {
        // We filter possible duplicated fields
        return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(Object.keys(selector)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(Object.keys(sort))).filter(function (f, i, arr) {
          return arr.indexOf(f) === i;
        });
      }

      return Object.keys(selector);
    }
  }]);

  return CozyClient;
}();



/***/ }),

/***/ "QxZi":
/***/ (function(module) {

module.exports = ["energy","insurance","isp","shopping","telecom","transport","banking","public_service"];

/***/ }),

/***/ "Uedh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("dtw8");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("Bh3+");
/* harmony import */ var components_Konnector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("tdiL");
/* harmony import */ var components_Applications__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("zvYt");
/* harmony import */ var components_ScrollToTopOnMount__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("YVnf");
/* harmony import */ var components_Services__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("1HPX");
/* harmony import */ var components_KonnectorErrors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("Ntnw");
/* harmony import */ var components_FooterLogo__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("mMfh");
















var Home =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Home, _Component);

  function Home() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Home);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Home).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Home, [{
    key: "render",
    value: function render() {
      var wrapper = this.props.wrapper;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_8__["Main"], {
        className: "main-content"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_ScrollToTopOnMount__WEBPACK_IMPORTED_MODULE_11__["default"], {
        target: wrapper
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_8__["Content"], {
        className: "lists-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_Applications__WEBPACK_IMPORTED_MODULE_10__["default"], null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_KonnectorErrors__WEBPACK_IMPORTED_MODULE_13__["default"], null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_Services__WEBPACK_IMPORTED_MODULE_12__["default"], null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_FooterLogo__WEBPACK_IMPORTED_MODULE_14__["default"], null)), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/connected/:konnectorSlug",
        component: components_Konnector__WEBPACK_IMPORTED_MODULE_9__["default"]
      }));
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_6__["withRouter"])(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__["translate"])()(Home)));

/***/ }),

/***/ "UufI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "konnectorsI18nMiddleware", function() { return konnectorsI18nMiddleware; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");


var KONNECTORS_DOCTYPE = 'io.cozy.konnectors';

var extendI18nWithKonnector = function extendI18nWithKonnector(lang) {
  return function (konnector) {
    var langs = konnector.langs,
        locales = konnector.locales;
    var hasLangs = langs && langs.length;

    if (!hasLangs) {
      // eslint-disable-next-line no-console
      console.warn("Konnector ".concat(konnector.name, " does not specify any lang"));
      return konnector;
    }

    var providesLang = hasLangs && langs.includes(lang);
    var actualLang = providesLang ? lang : langs[0];
    var localeKeys = locales && Object.keys(locales);
    var providesLocales = localeKeys && localeKeys.length && localeKeys.includes(actualLang);

    if (!providesLocales) {
      // eslint-disable-next-line no-console
      console.warn("Konnector ".concat(konnector.name, " does not specify any locale for lang ").concat(actualLang));
      return konnector;
    }

    Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["extend"])(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, konnector.slug, locales[actualLang]));
    return konnector;
  };
};

var konnectorsI18nMiddleware = function konnectorsI18nMiddleware(lang) {
  return function () {
    return function (next) {
      return function (action) {
        var response = action.response;

        switch (action.type) {
          case 'RECEIVE_DATA':
          case 'RECEIVE_NEW_DOCUMENT':
            if (response && action.doctype === KONNECTORS_DOCTYPE) {
              var konnectors = response.data;
              konnectors && konnectors.length && konnectors.forEach(extendI18nWithKonnector(lang));
            }

            break;
        }

        return next(action);
      };
    };
  };
};
/* harmony default export */ __webpack_exports__["default"] = (konnectorsI18nMiddleware);

/***/ }),

/***/ "WWPq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


function fetch(_x, _x2) {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(cozy, triggerId) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", cozy.fetchJSON('GET', "/jobs/triggers/".concat(triggerId)));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}

/***/ }),

/***/ "YAxW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("/MKj");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("m+TH");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("oMPT");













var connect = function connect(mapDocumentsToProps) {
  var mapActionsToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (WrappedComponent) {
    var Wrapper =
    /*#__PURE__*/
    function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Wrapper, _Component);

      function Wrapper() {
        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Wrapper);

        return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Wrapper).apply(this, arguments));
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var fetchActions = this.props.fetchActions;
          var dispatch = this.context.store.dispatch;

          for (var propName in fetchActions) {
            dispatch(fetchActions[propName]);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var store = this.context.store;
          var fetchActions = this.props.fetchActions;

          var props = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, Object(___WEBPACK_IMPORTED_MODULE_10__["enhancePropsForActions"])(this.props, fetchActions, store.dispatch));

          return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(WrappedComponent, props);
        }
      }]);

      return Wrapper;
    }(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(Wrapper, "contextTypes", {
      store: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object
    });

    var makeMapStateToProps = function makeMapStateToProps(initialState, initialOwnProps) {
      var initialProps = mapDocumentsToProps(initialOwnProps);

      var isAction = function isAction(action) {
        return action && action.types && action.promise;
      };

      var fetchActions = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["filterValues"])(initialProps, function (prop) {
        return isAction(prop);
      });
      var otherProps = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["filterValues"])(initialProps, function (prop) {
        return !isAction(prop);
      });

      var mapStateToProps = function mapStateToProps(state) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["mapValues"])(fetchActions, function (action) {
          return isAction(action) ? Object(___WEBPACK_IMPORTED_MODULE_10__["applySelectorForAction"])(state, action) : action;
        }), {
          fetchActions: fetchActions
        }, otherProps);
      };

      return mapStateToProps;
    };

    return Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(makeMapStateToProps, mapActionsToProps)(Wrapper);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (connect);

/***/ }),

/***/ "YVnf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollToTopOnMount", function() { return ScrollToTopOnMount; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);





 // a component to automatically reset the scroll
// on mount (see https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top)

var ScrollToTopOnMount =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ScrollToTopOnMount, _Component);

  function ScrollToTopOnMount() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ScrollToTopOnMount);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ScrollToTopOnMount).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ScrollToTopOnMount, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var target = this.props && this.props.target;
      target && typeof target.scrollTo === 'function' && target.scrollTo(0, 0);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return ScrollToTopOnMount;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (ScrollToTopOnMount);

/***/ }),

/***/ "ZV27":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);






var useAppsInMaintenance = function useAppsInMaintenance(client) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      appsInMaintenance = _useState2[0],
      setAppsInMaintenance = _useState2[1];

  var registry = new cozy_client__WEBPACK_IMPORTED_MODULE_4__["Registry"]({
    client: client
  });
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var newAppsInMaintenance;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return registry.fetchAppsInMaintenance();

              case 2:
                newAppsInMaintenance = _context.sent;
                setAppsInMaintenance(newAppsInMaintenance);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, []);
  return appsInMaintenance;
};

/* harmony default export */ __webpack_exports__["default"] = (useAppsInMaintenance);

/***/ }),

/***/ "bRzR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toFlagNames", function() { return toFlagNames; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_proptypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("nlwj");
/* harmony import */ var react_proptypes__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_proptypes__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("eO8H");
/* harmony import */ var lodash_isObjectLike__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("ExA7");
/* harmony import */ var lodash_isObjectLike__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_isObjectLike__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("Z0cm");
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_isArray__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("7GkX");
/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash_keys__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("TYy9");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var minilog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("i9cR");
/* harmony import */ var minilog__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(minilog__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("67rm");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("Bh3+");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("V2U0");
/* harmony import */ var components_appEntryPoint__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("mD6Q");
/* harmony import */ var components_HeroHeader__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("g7jP");
/* harmony import */ var components_Failure__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("2gMI");
/* harmony import */ var components_Home__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("Uedh");
/* harmony import */ var components_IntentRedirect__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("e0eU");
/* harmony import */ var components_StoreRedirection__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("mLPk");
/* harmony import */ var ducks_connections_components_queue_index__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("rwEa");
/* harmony import */ var assets_images_timeline_png__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("zEKg");
/* harmony import */ var assets_images_timeline_png__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(assets_images_timeline_png__WEBPACK_IMPORTED_MODULE_29__);










/* global cozy */





















var IDLE = 'idle';
var FETCHING_CONTEXT = 'FETCHING_CONTEXT';
window.flag = window.flag || cozy_flags__WEBPACK_IMPORTED_MODULE_16___default.a;
window.minilog = minilog__WEBPACK_IMPORTED_MODULE_17___default.a; // TODO add this to cozy-flags ?

var toFlagNames = function toFlagNames(flagName) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (typeof flagName === 'string') return "".concat(prefix).concat(flagName);else if (lodash_isArray__WEBPACK_IMPORTED_MODULE_13___default()(flagName)) return lodash_flatten__WEBPACK_IMPORTED_MODULE_15___default()(flagName.map(function (flagName) {
    return toFlagNames(flagName, prefix);
  }));else if (lodash_isObjectLike__WEBPACK_IMPORTED_MODULE_12___default()(flagName)) return lodash_flatten__WEBPACK_IMPORTED_MODULE_15___default()(lodash_keys__WEBPACK_IMPORTED_MODULE_14___default()(flagName).map(function (key) {
    return toFlagNames(flagName[key], "".concat(prefix).concat(key, "."));
  }));
};

var App =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(App, _Component);

  function App(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, App);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(App).call(this, props, context));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      error: null,
      status: IDLE
    });

    _this.store = context.store;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchContext();
    }
  }, {
    key: "fetchContext",
    value: function () {
      var _fetchContext = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this2 = this;

        var context, flags;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({
                  status: FETCHING_CONTEXT
                });
                _context.next = 3;
                return cozy.client.fetchJSON('GET', '/settings/context').catch(function (error) {
                  _this2.setState({
                    error: error,
                    status: IDLE
                  });
                });

              case 3:
                context = _context.sent;

                if (context && context.attributes && context.attributes.features) {
                  flags = toFlagNames(context.attributes.features);
                  Object(cozy_flags__WEBPACK_IMPORTED_MODULE_16__["enable"])(flags);
                }

                this.setState({
                  status: IDLE
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchContext() {
        return _fetchContext.apply(this, arguments);
      }

      return fetchContext;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          accounts = _this$props.accounts,
          konnectors = _this$props.konnectors,
          triggers = _this$props.triggers;
      var isFetching = [accounts, konnectors, triggers].find(function (collection) {
        return ['pending', 'loading'].includes(collection.fetchStatus);
      });
      var hasError = [accounts, konnectors, triggers].find(function (collection) {
        return collection.fetchStatus === 'failed';
      });
      var status = this.state.status;
      var isFetchingContext = status === FETCHING_CONTEXT;
      var isReady = !hasError && !isFetching && !isFetchingContext;
      var showTimeline = cozy_flags__WEBPACK_IMPORTED_MODULE_16___default()('home_show_timeline'); // used in demo envs

      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "App"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "App-MainCol",
        ref: isReady ? function (div) {
          _this3.contentWrapper = div;
        } : null
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_18__["default"], null), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(components_HeroHeader__WEBPACK_IMPORTED_MODULE_23__["default"], null), hasError && react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_20__["Main"], {
        className: "main-loader"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(components_Failure__WEBPACK_IMPORTED_MODULE_24__["default"], {
        errorType: "initial"
      })), isFetching && react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_20__["Main"], {
        className: "main-loader"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_21__["default"], {
        size: "xxlarge"
      })), isReady && react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Route"], {
        path: "/redirect",
        component: components_IntentRedirect__WEBPACK_IMPORTED_MODULE_26__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Route"], {
        path: "/connected",
        render: function render() {
          return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(components_Home__WEBPACK_IMPORTED_MODULE_25__["default"], {
            base: "/connected",
            wrapper: _this3.contentWrapper
          });
        }
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Route"], {
        exact: true,
        path: "/providers",
        component: components_StoreRedirection__WEBPACK_IMPORTED_MODULE_27__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Route"], {
        path: "/providers/:category",
        component: components_StoreRedirection__WEBPACK_IMPORTED_MODULE_27__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Redirect"], {
        exact: true,
        from: "/",
        to: "/connected"
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Redirect"], {
        from: "*",
        to: "/connected"
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(ducks_connections_components_queue_index__WEBPACK_IMPORTED_MODULE_28__["default"], null), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_19__["Sprite"], null)), showTimeline && react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "Timeline"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: assets_images_timeline_png__WEBPACK_IMPORTED_MODULE_29___default.a,
        width: "420px"
      })));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

App.contextTypes = {
  store: react_proptypes__WEBPACK_IMPORTED_MODULE_10___default.a.object
};
/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["withRouter"])(Object(components_appEntryPoint__WEBPACK_IMPORTED_MODULE_22__["default"])(App)));

/***/ }),

/***/ "cXEB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fvjX");
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("m+TH");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("1mXj");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lib_middlewares_konnectorsI18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("UufI");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("sINF");
/* harmony import */ var lib_CollectStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Lf2i");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cokx");
var _this = undefined;










var configureStore = function configureStore(legacyClient, cozyClient, context) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // Enable Redux dev tools
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || redux__WEBPACK_IMPORTED_MODULE_0__["compose"];
  var reduxStore = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(Object(reducers__WEBPACK_IMPORTED_MODULE_7__["default"])(), composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(_this, [Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__["cozyMiddleware"])(legacyClient), Object(lib_middlewares_konnectorsI18n__WEBPACK_IMPORTED_MODULE_3__["default"])(options.lang), redux_thunk__WEBPACK_IMPORTED_MODULE_4__["default"], cozy_flags__WEBPACK_IMPORTED_MODULE_6___default()('redux-logger') ? Object(redux_logger__WEBPACK_IMPORTED_MODULE_2__["createLogger"])() : null].filter(Boolean))));
  return Object.assign(new lib_CollectStore__WEBPACK_IMPORTED_MODULE_5__["default"](context, cozyClient, options), reduxStore);
};

/* harmony default export */ __webpack_exports__["default"] = (configureStore);

/***/ }),

/***/ "cokx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstalledKonnectors", function() { return getInstalledKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsByKonnector", function() { return getConnectionsByKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsQueue", function() { return getConnectionsQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCreatedConnectionAccount", function() { return getCreatedConnectionAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnectorTriggersCount", function() { return getKonnectorTriggersCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerByKonnectorAndAccount", function() { return getTriggerByKonnectorAndAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggersByKonnector", function() { return getTriggersByKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggersInError", function() { return getTriggersInError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccountsWithErrors", function() { return getAccountsWithErrors; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fvjX");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("m+TH");
/* harmony import */ var ducks_apps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("/n/j");
/* harmony import */ var ducks_accounts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("3dAU");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("uZd2");
/* harmony import */ var ducks_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("rGvZ");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4YEU");








/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    apps: ducks_apps__WEBPACK_IMPORTED_MODULE_3__["default"],
    connections: ducks_connections__WEBPACK_IMPORTED_MODULE_7__["default"],
    cozy: redux_cozy_client__WEBPACK_IMPORTED_MODULE_2__["reducer"]
  });
}); // selectors

var getInstalledKonnectors = function getInstalledKonnectors(state) {
  return ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getInstalledKonnectors"](state.cozy);
};
var getConnectionsByKonnector = function getConnectionsByKonnector(state, konnectorSlug) {
  return ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getConnectionsByKonnector"](state.connections, konnectorSlug, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy), ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getSlugs"](state.cozy));
};
var getConnectionsQueue = function getConnectionsQueue(state) {
  return ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getQueue"](state.connections, ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getIndexedKonnectors"](state.cozy));
};
var getCreatedConnectionAccount = function getCreatedConnectionAccount(state) {
  return ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getAccount"](state.cozy, ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getCreatedAccount"](state.connections));
};
var getKonnectorTriggersCount = function getKonnectorTriggersCount(state, konnector) {
  return ducks_triggers__WEBPACK_IMPORTED_MODULE_6__["getKonnectorTriggers"](state.cozy, konnector, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy)).length;
};
var getTriggerByKonnectorAndAccount = function getTriggerByKonnectorAndAccount(state, konnector, account) {
  var triggerId = ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getTriggerIdByKonnectorAndAccount"](state.connections, konnector, account, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy));
  return ducks_triggers__WEBPACK_IMPORTED_MODULE_6__["getTrigger"](state.cozy, triggerId);
};
var getTriggersByKonnector = function getTriggersByKonnector(state, konnectorSlug) {
  var triggersInState = state.cozy.documents['io.cozy.triggers'] || {};
  var triggers = Object.keys(triggersInState).reduce(function (acc, key) {
    var document = state.cozy.documents['io.cozy.triggers'][key];

    if (document.worker === 'konnector' && lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(document, 'message.konnector') === konnectorSlug) {
      acc.push(document);
    }

    return acc;
  }, []);
  return triggers;
};
var getTriggersInError = function getTriggersInError(state) {
  var triggers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(state, ['cozy', 'documents', 'io.cozy.triggers'], {});
  return Object.values(triggers).filter(function (trigger) {
    var isInError = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(trigger, 'current_state.status') === 'errored';
    return isInError;
  });
};
var getAccountsWithErrors = function getAccountsWithErrors(state) {
  var accountsWithErrorsIds = getTriggersInError(state).map(function (trigger) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(trigger, 'message.account');
  });
  var accounts = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(state, ['cozy', 'documents', 'io.cozy.accounts'], {});
  return Object.values(accounts).filter(function (_ref) {
    var _id = _ref._id;
    return accountsWithErrorsIds.includes(_id);
  });
};

/***/ }),

/***/ "e0eU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("eO8H");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("/MKj");
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cokx");
/* global cozy */





var IntentRedirect = function IntentRedirect(_ref) {
  var installedKonnectors = _ref.installedKonnectors,
      location = _ref.location;
  var queryString = !!location && location.search;
  var query = queryString && queryString.substring(1).split('&').reduce(function (accumulator, keyValue) {
    var splitted = keyValue.split('=');
    accumulator[splitted[0]] = splitted[1] || true;
    return accumulator;
  }, {});

  if (!query.konnector) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
      to: "/connected"
    });
  }

  if (!installedKonnectors.find(function (konnector) {
    return konnector.slug === query.konnector;
  })) {
    return cozy.client.intents.redirect('io.cozy.apps', {
      slug: query.konnector
    });
  }

  var redirectRoute = "/connected/".concat(query.konnector);

  if (query.account) {
    redirectRoute = "".concat(redirectRoute, "/accounts/").concat(query.account);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: redirectRoute
  });
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    installedKonnectors: Object(reducers__WEBPACK_IMPORTED_MODULE_3__["getInstalledKonnectors"])(state)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(IntentRedirect));

/***/ }),

/***/ "fl/O":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);






var useRegistryInformation = function useRegistryInformation(client, slug) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      appData = _useState2[0],
      setAppData = _useState2[1];

  var registry = new cozy_client__WEBPACK_IMPORTED_MODULE_4__["Registry"]({
    client: client
  });
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var app;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return registry.fetchApp(slug);

              case 2:
                app = _context.sent;
                setAppData(app);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, [slug]);
  return appData;
};

/* harmony default export */ __webpack_exports__["default"] = (useRegistryInformation);

/***/ }),

/***/ "g7jP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KXWi");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("buk/");
/* harmony import */ var hooks_useInstanceSettings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("ppHT");
/* harmony import */ var hooks_useCustomWallpaper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("heYj");












var HeroHeader = function HeroHeader(_ref) {
  var t = _ref.t,
      client = _ref.client,
      isMobile = _ref.breakpoints.isMobile;

  var _useCustomWallpaper = Object(hooks_useCustomWallpaper__WEBPACK_IMPORTED_MODULE_10__["default"])(client),
      fetchStatus = _useCustomWallpaper.fetchStatus,
      wallpaperLink = _useCustomWallpaper.data.wallpaperLink;

  var rootURL = client.getStackClient().uri;

  var _ref2 = new URL(rootURL),
      host = _ref2.host;

  var _client$getInstanceOp = client.getInstanceOptions(),
      cozyDefaultWallpaper = _client$getInstanceOp.cozyDefaultWallpaper;

  var backgroundURL = null;
  if (fetchStatus !== 'loading') backgroundURL = wallpaperLink || cozyDefaultWallpaper;

  var _useInstanceSettings = Object(hooks_useInstanceSettings__WEBPACK_IMPORTED_MODULE_9__["default"])(client),
      instanceSettings = _useInstanceSettings.data;

  var publicName = lodash_get__WEBPACK_IMPORTED_MODULE_6___default()(instanceSettings, 'public_name', '');
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("header", {
    className: "hero-header",
    style: {
      backgroundImage: "url(".concat(backgroundURL, ")")
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "corner"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: t('app.logout'),
    icon: "logout",
    size: "small",
    theme: "text",
    className: "corner-button",
    iconOnly: isMobile,
    extension: isMobile ? 'narrow' : null,
    onClick:
    /*#__PURE__*/
    _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return client.logout();

            case 2:
              window.location.reload();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    className: "hero-avatar",
    src: "".concat(rootURL, "/public/avatar")
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h1", {
    className: "hero-title"
  }, publicName), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
    className: "hero-subtitle"
  }, host));
};

HeroHeader.propTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
  client: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  breakpoints: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    isMobile: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
  }).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"])(Object(cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_7__["withBreakpoints"])()(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__["translate"])()(HeroHeader))));

/***/ }),

/***/ "gpBY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingPlaceholder", function() { return LoadingPlaceholder; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styles_placeholder_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("NfqR");
/* harmony import */ var styles_placeholder_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_placeholder_styl__WEBPACK_IMPORTED_MODULE_1__);


var LoadingPlaceholder = function LoadingPlaceholder() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: styles_placeholder_styl__WEBPACK_IMPORTED_MODULE_1___default.a['coz-loading-placeholder']
  });
};
/* harmony default export */ __webpack_exports__["default"] = (LoadingPlaceholder);

/***/ }),

/***/ "heYj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var config_collect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("qgiu");
var config_collect__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t("qgiu", 1);






var useCustomWallpaper = function useCustomWallpaper(client) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      wallpaperLink = _useState2[0],
      setWallpaperLink = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])('idle'),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      fetchStatus = _useState4[0],
      setFetchStatus = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                setFetchStatus('loading');
                _context.next = 4;
                return client.collection('io.cozy.files').getDownloadLinkByPath(config_collect__WEBPACK_IMPORTED_MODULE_4__.customWallpaperPath);

              case 4:
                response = _context.sent;
                setWallpaperLink(response);
                setFetchStatus('loaded');
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                setFetchStatus('failed');

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, []);
  return {
    data: {
      wallpaperLink: wallpaperLink
    },
    fetchStatus: fetchStatus
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useCustomWallpaper);

/***/ }),

/***/ "iUaz":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en-SG": "zavE",
	"./en-SG.js": "zavE",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "iUaz";

/***/ }),

/***/ "jPoV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_BIDIRECTIONAL", function() { return SYNC_BIDIRECTIONAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_TO", function() { return SYNC_TO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_FROM", function() { return SYNC_FROM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PouchdbAdapter; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("skrj");









/* global cozy, PouchDB, pouchdbFind */

var REPLICATION_INTERVAL = 30000;
var SYNC_BIDIRECTIONAL = 'SYNC_BIDIRECTIONAL';
var SYNC_TO = 'SYNC_TO';
var SYNC_FROM = 'SYNC_FROM';

var PouchdbAdapter =
/*#__PURE__*/
function () {
  function PouchdbAdapter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, PouchdbAdapter);

    PouchDB.plugin(pouchdbFind);
    this.instances = {};
    this.doctypes = [];
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(PouchdbAdapter, [{
    key: "registerDoctypes",
    value: function registerDoctypes(doctypes) {
      this.doctypes = doctypes;
    }
  }, {
    key: "getDatabase",
    value: function getDatabase(doctype) {
      return cozy.client.offline.getDatabase(doctype); // For now we let cozy-client-js creates PouchDB instances
    }
  }, {
    key: "getReplicationBaseUrl",
    value: function getReplicationBaseUrl() {
      return cozy.client.authorize().then(function (credentials) {
        var basic = credentials.token.toBasicAuth();
        return "".concat(cozy.client._url, "/data/").replace('//', "//".concat(basic));
      });
    }
  }, {
    key: "getSeqNumber",
    value: function getSeqNumber(doctype) {
      return this.getDatabase(doctype).info().then(function (result) {
        return result.update_seq;
      });
    }
  }, {
    key: "sync",
    value: function () {
      var _sync = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee(dispatch) {
        var direction,
            baseUrl,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            doctype,
            seqNumber,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                direction = _args.length > 1 && _args[1] !== undefined ? _args[1] : SYNC_BIDIRECTIONAL;
                _context.next = 3;
                return this.getReplicationBaseUrl();

              case 3:
                baseUrl = _context.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 7;
                _iterator = this.doctypes[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 20;
                  break;
                }

                doctype = _step.value;
                _context.next = 13;
                return this.getSeqNumber(doctype);

              case 13:
                seqNumber = _context.sent;
                _context.next = 16;
                return dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_8__["startDoctypeSync"])(doctype, seqNumber));

              case 16:
                this.syncDoctype(doctype, "".concat(baseUrl).concat(doctype), dispatch, direction);

              case 17:
                _iteratorNormalCompletion = true;
                _context.next = 9;
                break;

              case 20:
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](7);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 26:
                _context.prev = 26;
                _context.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 29:
                _context.prev = 29;

                if (!_didIteratorError) {
                  _context.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context.finish(29);

              case 33:
                return _context.finish(26);

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 22, 26, 34], [27,, 29, 33]]);
      }));

      function sync(_x) {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "syncDoctype",
    value: function syncDoctype(doctype, replicationUrl, dispatch) {
      var _this = this;

      var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : SYNC_BIDIRECTIONAL;
      return new Promise(function (resolve, reject) {
        var db = _this.getDatabase(doctype);

        var syncHandler;
        if (direction === SYNC_TO) syncHandler = db.replicate.to(replicationUrl);else if (direction === SYNC_FROM) syncHandler = db.replicate.from(replicationUrl);else syncHandler = db.sync(replicationUrl);
        syncHandler.on('complete', function (info) {
          dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_8__["syncDoctypeOk"])(doctype, info));

          _this.scheduleNextSync(doctype, replicationUrl, dispatch, direction);

          resolve(info);
        }).on('error', function (err) {
          if (err.error === 'code=400, message=Expired token') {
            return cozy.client.authorize().then(function (_ref) {
              var client = _ref.client,
                  token = _ref.token;
              cozy.client.auth.refreshToken(cozy, client, token).then(function (newToken) {
                return cozy.client.saveCredentials(client, newToken);
              }).then(function () {
                return _this.syncDoctype(doctype, replicationUrl);
              });
            });
          } else if (err.status !== 404) {
            // A 404 error on some doctypes is perfectly normal when there is no data
            dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_8__["syncDoctypeError"])(doctype, err));

            _this.scheduleNextSync(doctype, replicationUrl, dispatch);

            reject(err);
          }
        });
      });
    }
  }, {
    key: "scheduleNextSync",
    value: function scheduleNextSync(doctype, replicationUrl, dispatch, direction) {
      var _this2 = this;

      setTimeout(function () {
        _this2.syncDoctype(doctype, replicationUrl, dispatch, direction);
      }, REPLICATION_INTERVAL);
    }
  }, {
    key: "fetchDocuments",
    value: function () {
      var _fetchDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee2(doctype) {
        var resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getDatabase(doctype).allDocs({
                  include_docs: true
                });

              case 2:
                resp = _context2.sent;
                return _context2.abrupt("return", {
                  data: resp.rows.filter(function (row) {
                    return !row.doc.hasOwnProperty('views');
                  }).map(function (row) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, row.doc, {
                      id: row.id,
                      _type: doctype
                    });
                  }),
                  meta: {
                    count: resp.total_rows
                  },
                  skip: resp.offset,
                  next: false
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchDocuments(_x2) {
        return _fetchDocuments.apply(this, arguments);
      }

      return fetchDocuments;
    }()
  }, {
    key: "queryDocuments",
    value: function () {
      var _queryDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee3(doctype, index, options) {
        var queryOptions, resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, options, {
                  fields: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(options.fields), ['_id']),
                  sort: options.sort ? Object.keys(options.sort).map(function (k) {
                    return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, k, options.sort[k]);
                  }) : undefined
                });
                _context3.next = 3;
                return this.getDatabase(doctype).find(queryOptions);

              case 3:
                resp = _context3.sent;
                return _context3.abrupt("return", {
                  data: resp.docs.map(function (doc) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, doc, {
                      id: doc._id,
                      _type: doctype
                    });
                  }),
                  meta: {
                    count: resp.docs.length
                  },
                  skip: 0,
                  next: false
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function queryDocuments(_x3, _x4, _x5) {
        return _queryDocuments.apply(this, arguments);
      }

      return queryDocuments;
    }()
  }, {
    key: "fetchDocument",
    value: function () {
      var _fetchDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee4(doctype, id) {
        var resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getDatabase(doctype).get(id, {
                  revs_info: true
                });

              case 2:
                resp = _context4.sent;
                return _context4.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, resp, {
                    id: resp.id,
                    _id: resp.id,
                    _type: doctype
                  })]
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchDocument(_x6, _x7) {
        return _fetchDocument.apply(this, arguments);
      }

      return fetchDocument;
    }()
  }, {
    key: "createDocument",
    value: function () {
      var _createDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee5(doctype, doc) {
        var resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getDatabase(doctype).post(doc);

              case 2:
                resp = _context5.sent;
                return _context5.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, doc, {
                    id: resp.id,
                    _id: resp.id,
                    _type: doctype,
                    _rev: resp.rev
                  })]
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function createDocument(_x8, _x9) {
        return _createDocument.apply(this, arguments);
      }

      return createDocument;
    }()
  }, {
    key: "updateDocument",
    value: function () {
      var _updateDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee6(doc) {
        var _type, safeDoc, resp;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // TODO: _* properties are reserved by CouchDB, so we can't send the doc with its _type property...
                _type = doc._type, safeDoc = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default()(doc, ["_type"]);
                _context6.next = 3;
                return this.getDatabase(_type).put(safeDoc);

              case 3:
                resp = _context6.sent;
                return _context6.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, doc, {
                    _rev: resp.rev
                  })]
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateDocument(_x10) {
        return _updateDocument.apply(this, arguments);
      }

      return updateDocument;
    }()
  }, {
    key: "deleteDocument",
    value: function () {
      var _deleteDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee7(doc) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getDatabase(doc._type).remove(doc);

              case 2:
                return _context7.abrupt("return", {
                  data: [doc]
                });

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteDocument(_x11) {
        return _deleteDocument.apply(this, arguments);
      }

      return deleteDocument;
    }()
  }, {
    key: "createIndex",
    value: function createIndex(doctype, fields) {
      return this.getDatabase(doctype).createIndex({
        index: {
          fields: fields
        }
      });
    }
  }, {
    key: "fetchFileByPath",
    value: function fetchFileByPath() {
      throw new Error('Not implemented');
    }
  }, {
    key: "createFile",
    value: function createFile() {
      throw new Error('Not implemented');
    }
  }, {
    key: "trashFile",
    value: function trashFile() {
      throw new Error('Not implemented');
    }
  }, {
    key: "fetchReferencedFiles",
    value: function fetchReferencedFiles() {
      throw new Error('Not implemented');
    }
  }, {
    key: "addReferencedFiles",
    value: function addReferencedFiles() {
      throw new Error('Not implemented');
    }
  }, {
    key: "removeReferencedFiles",
    value: function removeReferencedFiles() {
      throw new Error('Not implemented');
    }
  }]);

  return PouchdbAdapter;
}();



/***/ }),

/***/ "kGy0":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en.json": "8WAw",
	"./fr.json": "H488"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "kGy0";

/***/ }),

/***/ "m+TH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CozyProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Al7w");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CozyProvider", function() { return _CozyProvider__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _CozyClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("OiML");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CozyClient", function() { return _CozyClient__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("YAxW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cozyConnect", function() { return _connect__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vwW3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cozyMiddleware", function() { return _middleware__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("GbhZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeActionCreator", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["makeActionCreator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchApps", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchApps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCollection", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchReferencedFiles", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchReferencedFiles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectors", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchKonnectors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTriggers", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchTriggers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addReferencedFiles", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["addReferencedFiles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeReferencedFiles", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["removeReferencedFiles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applySelectorForAction", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["applySelectorForAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enhancePropsForActions", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["enhancePropsForActions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCollection", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["getCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["getDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["createDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTrigger", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["createTrigger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "launchTrigger", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["launchTrigger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["updateDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["deleteDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteTrigger", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["deleteTrigger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFile", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["createFile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trashFile", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["trashFile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CREATE_DOCUMENT", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["CREATE_DOCUMENT"]; });

/* harmony import */ var _slices_sharings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("og8P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchSharings", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["fetchSharings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchContacts", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["fetchContacts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSharingDetails", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["getSharingDetails"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "share", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["share"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unshare", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["unshare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "leave", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["leave"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareByLink", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["shareByLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "revokeLink", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["revokeLink"]; });

/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("skrj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "startSync", function() { return _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__["startSync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFirstSync", function() { return _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__["isFirstSync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSynced", function() { return _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__["isSynced"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("GfxC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadArchive", function() { return _helpers__WEBPACK_IMPORTED_MODULE_7__["downloadArchive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return _helpers__WEBPACK_IMPORTED_MODULE_7__["downloadFile"]; });










/***/ }),

/***/ "mD6Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m+TH");
/* harmony import */ var ducks_accounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3dAU");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("uZd2");
/* harmony import */ var ducks_jobs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("sR/t");
/* harmony import */ var ducks_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rGvZ");






var mapDocumentsToProps = function mapDocumentsToProps() {
  return {
    accounts: Object(ducks_accounts__WEBPACK_IMPORTED_MODULE_1__["fetchAccounts"])(),
    jobs: Object(ducks_jobs__WEBPACK_IMPORTED_MODULE_3__["fetchKonnectorJobs"])(),
    konnectors: Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_2__["fetchKonnectors"])(),
    triggers: Object(ducks_triggers__WEBPACK_IMPORTED_MODULE_4__["fetchTriggers"])()
  };
};

var appEntryPoint = function appEntryPoint(WrappedComponent, selectData) {
  return Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["cozyConnect"])(mapDocumentsToProps)(WrappedComponent, selectData);
};

/* harmony default export */ __webpack_exports__["default"] = (appEntryPoint);

/***/ }),

/***/ "mLPk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreRedirection", function() { return StoreRedirection; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("V2U0");






/* global cozy */


var StoreRedirection =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(StoreRedirection, _Component);

  function StoreRedirection(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, StoreRedirection);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(StoreRedirection).call(this, props));
    var category = props.match && props.match.params.category;
    var options = {
      type: 'konnector'
    };

    if (category && category !== 'all') {
      options.category = props.match.params.category;
    }

    cozy.client.intents.redirect('io.cozy.apps', options);
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(StoreRedirection, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_6__["default"], {
        size: "xxlarge",
        middle: true
      });
    }
  }]);

  return StoreRedirection;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (StoreRedirection);

/***/ }),

/***/ "mMfh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterLogo", function() { return FooterLogo; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_13__);















var fetchHomeLogos =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_9___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee(client) {
    var rootURL, context, logos;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            rootURL = client.getStackClient().uri;
            _context.next = 4;
            return client.getStackClient().fetchJSON('GET', '/settings/context');

          case 4:
            context = _context.sent;
            logos = lodash_get__WEBPACK_IMPORTED_MODULE_12___default()(context, 'data.attributes.home_logos', {});
            return _context.abrupt("return", Object.keys(logos).reduce(function (acc, logoSrc) {
              acc["".concat(rootURL, "/assets").concat(logoSrc)] = logos[logoSrc];
              return acc;
            }, {}));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {});

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function fetchHomeLogos(_x) {
    return _ref.apply(this, arguments);
  };
}();

var FooterLogo =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(FooterLogo, _React$Component);

  function FooterLogo() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, FooterLogo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(FooterLogo)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "state", {
      logos: {}
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(FooterLogo, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_9___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee2() {
        var logos;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetchHomeLogos(this.props.client);

              case 2:
                logos = _context2.sent;
                this.setState({
                  logos: logos
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var logos = this.state.logos;
      return Object.keys(logos).length === 0 ? false : react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "u-maw-7 u-mh-auto u-mt-1 u-pv-1 u-flex u-flex-row u-flex-items-center u-flex-justify-center u-flex-wrap"
      }, Object.entries(logos).map(function (_ref2) {
        var _ref3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, 2),
            logoSrc = _ref3[0],
            logoAlt = _ref3[1];

        return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("img", {
          key: logoSrc,
          src: logoSrc,
          alt: logoAlt,
          className: "u-ph-1 u-pv-half u-mah-5"
        });
      }));
    }
  }]);

  return FooterLogo;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);
prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.propTypes = {
  client: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_13__["withClient"])(FooterLogo));

/***/ }),

/***/ "oMPT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapValues", function() { return mapValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterValues", function() { return filterValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeObjectProperty", function() { return removeObjectProperty; });
var mapValues = function mapValues(object, transform) {
  var result = {};

  for (var key in object) {
    result[key] = transform(object[key], key);
  }

  return result;
};
var filterValues = function filterValues(object, filter) {
  var result = {};

  for (var key in object) {
    if (filter(object[key], key)) {
      result[key] = object[key];
    }
  }

  return result;
};
var removeObjectProperty = function removeObjectProperty(obj, prop) {
  return Object.keys(obj).reduce(function (result, key) {
    if (key !== prop) {
      result[key] = obj[key];
    }

    return result;
  }, {});
};

/***/ }),

/***/ "og8P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SHARINGS", function() { return FETCH_SHARINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSharings", function() { return fetchSharings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "share", function() { return share; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unshare", function() { return unshare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leave", function() { return leave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareByLink", function() { return shareByLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "revokeLink", function() { return revokeLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchContacts", function() { return fetchContacts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharings", function() { return getSharings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharingStatus", function() { return getSharingStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharingDetails", function() { return getSharingDetails; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("fvjX");
/* harmony import */ var cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("4kcP");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("GbhZ");








var FETCH_SHARINGS = 'FETCH_SHARINGS';
var RECEIVE_SHARINGS_DATA = 'RECEIVE_SHARINGS_DATA';
var RECEIVE_FETCH_SHARINGS_ERROR = 'RECEIVE_FETCH_SHARINGS_ERROR';
var CREATE_SHARING = 'CREATE_SHARING';
var RECEIVE_NEW_SHARING = 'RECEIVE_NEW_SHARING';
var CREATE_SHARING_LINK = 'CREATE_SHARING_LINK';
var RECEIVE_NEW_SHARING_LINK = 'RECEIVE_NEW_SHARING_LINK';
var REVOKE_SHARING_LINK = 'REVOKE_SHARING_LINK';
var RECEIVE_SHARING_LINK_REVOKE = 'RECEIVE_SHARING_LINK_REVOKE';
var REVOKE_SHARING = 'REVOKE_SHARING';
var RECEIVE_SHARING_REVOKE = 'RECEIVE_SHARING_REVOKE';
var RECEIVE_ERROR = 'RECEIVE_ERROR';

var removeRecipient = function removeRecipient(recipients, recipientId) {
  var idx = recipients.findIndex(function (r) {
    return r.recipient.id === recipientId;
  });
  return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(recipients.slice(0, idx)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(recipients.slice(idx + 1)));
};

var documents = function documents() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_SHARINGS_DATA:
      return action.response.sharings;

    case RECEIVE_NEW_SHARING:
      return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state), [action.response]);

    case RECEIVE_SHARING_REVOKE:
      {
        var idx = state.findIndex(function (s) {
          return s.attributes.sharing_id === action.sharingId;
        });
        if (idx === -1) return state;
        var sharing = state[idx];
        var loneRecipient = sharing.attributes.recipients === undefined || // for recipient-side revocation
        sharing.attributes.recipients.length === 1;
        var newState = loneRecipient ? _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing, {
          attributes: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing.attributes, {
            revoked: true
          })
        }) : _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing, {
          attributes: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing.attributes, {
            recipients: removeRecipient(sharing.attributes.recipients, action.recipientId)
          })
        });
        return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state.slice(0, idx)), [newState], _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state.slice(idx + 1)));
      }

    default:
      return state;
  }
};

var doctypePermsetInitialState = {
  fetchStatus: 'loading',
  byMe: [],
  byLink: [],
  withMe: []
};

var permissions = function permissions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var idx;

  switch (action.type) {
    case FETCH_SHARINGS:
      if (state[action.doctype]) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
          fetchStatus: 'loading'
        })));
      }

      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, doctypePermsetInitialState));

    case RECEIVE_SHARINGS_DATA:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
        fetchStatus: 'loaded'
      }, action.response.permissions)));

    case RECEIVE_FETCH_SHARINGS_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, {
        fetchStatus: 'error'
      }));

    case RECEIVE_NEW_SHARING:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
        byMe: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byMe), [{
          attributes: {
            permissions: {
              rule0: {
                type: action.doctype,
                values: [action.id]
              }
            },
            source_id: action.response.attributes.sharing_id,
            type: 'io.cozy.sharings'
          }
        }])
      })));

    case RECEIVE_NEW_SHARING_LINK:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
        byLink: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byLink), [action.response])
      })));

    case REVOKE_SHARING_LINK:
      idx = state[action.doctype].byLink.findIndex(function (p) {
        return action.permission._id === p._id;
      });
      if (idx === -1) return state;
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
        byLink: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byLink.slice(0, idx)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byLink.slice(idx + 1)))
      })));

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_5__["combineReducers"])({
  documents: documents,
  permissions: permissions
})); // actions

var fetchSharings = function fetchSharings(doctype) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    types: [FETCH_SHARINGS, RECEIVE_SHARINGS_DATA, RECEIVE_FETCH_SHARINGS_ERROR],
    doctype: doctype,
    id: id,
    options: options,
    promise: function promise(client) {
      return client.fetchSharings(doctype);
    }
  };
};
var share = function share(document, recipients, sharingType, sharingDesc) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        var recipientIds;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all(recipients.map(function (recipient) {
                  return recipient.id || dispatch(createContact(recipient)).then(function (c) {
                    return c.data[0].id;
                  });
                }));

              case 2:
                recipientIds = _context.sent;
                trackSharingByEmail(document);
                return _context.abrupt("return", dispatch(createSharing(document, recipientIds, sharingType, sharingDesc)));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var unshare = function unshare(document, recipient) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(dispatch, getState) {
        var sharing, loneRecipient;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sharing = getSharingForRecipient(getState(), document, recipient);
                loneRecipient = sharing.attributes.recipients.length === 1;
                return _context2.abrupt("return", dispatch({
                  types: [REVOKE_SHARING, RECEIVE_SHARING_REVOKE, RECEIVE_ERROR],
                  doctype: document._type,
                  id: document._id,
                  sharingId: sharing.attributes.sharing_id,
                  recipientId: recipient._id,
                  promise: function promise(client) {
                    return loneRecipient ? client.revokeSharing(sharing.attributes.sharing_id) : client.revokeSharingForClient(sharing.attributes.sharing_id, sharing.attributes.recipients.find(function (r) {
                      return r.recipient.id === recipient._id;
                    }).Client.client_id);
                  }
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
var leave = function leave(document) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(dispatch, getState) {
        var sharings, sharing;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sharings = getDocumentActiveSharings(getState(), document._type, document._id);
                sharing = sharings.find(function (s) {
                  return s.attributes.owner === false;
                });
                return _context3.abrupt("return", dispatch({
                  types: [REVOKE_SHARING, RECEIVE_SHARING_REVOKE, RECEIVE_ERROR],
                  doctype: document._type,
                  id: document._id,
                  sharingId: sharing.attributes.sharing_id,
                  promise: function promise(client) {
                    return client.revokeSharing(sharing.attributes.sharing_id);
                  }
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};
var shareByLink = function shareByLink(document) {
  trackSharingByLink(document);
  return createSharingLink(document);
};
var revokeLink = function revokeLink(document) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(dispatch, getState) {
        var perm;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                perm = getSharingLinkPermission(getState(), document._type, document._id);
                return _context4.abrupt("return", dispatch({
                  types: [REVOKE_SHARING_LINK, RECEIVE_SHARING_LINK_REVOKE, RECEIVE_ERROR],
                  doctype: document._type,
                  id: document._id,
                  permission: perm,
                  promise: function promise(client) {
                    return client.revokeSharingLink(perm);
                  }
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};

var createSharing = function createSharing(document, contactIds) {
  var sharingType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'master-slave';
  var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return {
    types: [CREATE_SHARING, RECEIVE_NEW_SHARING, RECEIVE_ERROR],
    doctype: document._type,
    id: document._id,
    promise: function promise(client) {
      return client.createSharing(getPermissionsFor(document), contactIds, sharingType, description);
    }
  };
};

var createSharingLink = function createSharingLink(document) {
  return {
    types: [CREATE_SHARING_LINK, RECEIVE_NEW_SHARING_LINK, RECEIVE_ERROR],
    doctype: document._type,
    id: document._id,
    promise: function promise(client) {
      return client.createSharingLink(getPermissionsFor(document, true));
    }
  };
}; // TODO: this is a poor man's migration in order to normalize contacts
// and should be removed after a few weeks in prod
// Note for future-self: If you have no idea of what it means, please, erase this code.
// Note for time-travelers: please travel a little more back in time in order to advise us
// to get contacts right the first time


var fetchContacts = function fetchContacts() {
  var action = Object(_reducer__WEBPACK_IMPORTED_MODULE_7__["fetchCollection"])('contacts', 'io.cozy.contacts');

  action.promise =
  /*#__PURE__*/
  function () {
    var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(client) {
      var response, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return client.fetchCollection('contacts', 'io.cozy.contacts');

            case 2:
              response = _context5.sent;
              _context5.next = 5;
              return Promise.all(response.data.map(function (contact) {
                return typeof contact.email !== 'string' ? contact : client.updateDocument(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, contact, {
                  email: [{
                    address: contact.email,
                    primary: true
                  }]
                })).then(function (resp) {
                  return resp.data[0];
                });
              }));

            case 5:
              data = _context5.sent;
              return _context5.abrupt("return", _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, response, {
                data: data
              }));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  return action;
};

var createContact = function createContact(_ref6) {
  var email = _ref6.email;
  return Object(_reducer__WEBPACK_IMPORTED_MODULE_7__["createDocument"])('io.cozy.contacts', {
    email: [{
      address: email,
      primary: true
    }]
  });
};

var getPermissionsFor = function getPermissionsFor(document) {
  var publicLink = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _id = document._id,
      _type = document._type;
  var verbs = publicLink ? ['GET'] : ['ALL']; // TODO: this works for albums, but it needs to be generalized and integrated
  // with cozy-client ; some sort of doctype "schema" will be needed here

  return isFile(document) ? {
    files: {
      type: 'io.cozy.files',
      verbs: verbs,
      values: [_id]
    }
  } : {
    collection: {
      type: _type,
      verbs: verbs,
      values: [_id]
    },
    files: {
      type: 'io.cozy.files',
      verbs: verbs,
      values: ["".concat(_type, "/").concat(_id)],
      selector: 'referenced_by'
    }
  };
}; // selectors


var getSharing = function getSharing(state, id) {
  return state.cozy.sharings.documents.find(function (s) {
    return s.attributes.sharing_id === id;
  });
};

var getContact = function getContact(state, id) {
  return Object(_reducer__WEBPACK_IMPORTED_MODULE_7__["getDocument"])(state, 'io.cozy.contacts', id);
};

var getDoctypePermissions = function getDoctypePermissions(state, doctype) {
  if (state.cozy.sharings.permissions[doctype]) {
    return state.cozy.sharings.permissions[doctype];
  }

  return doctypePermsetInitialState;
};

var getSharingLink = function getSharingLink(state, doctype, id) {
  var perm = getSharingLinkPermission(state, doctype, id);
  return perm ? buildSharingLink(id, doctype, perm.attributes.codes.email) : null;
};

var getSharingLinkPermission = function getSharingLinkPermission(state, doctype, id) {
  var perms = getDoctypePermissions(state, doctype);
  var type = isFile({
    _type: doctype
  }) ? 'files' : 'collection';
  return perms.byLink.find(function (p) {
    return p.attributes.permissions[type].values.indexOf(id) !== -1;
  });
};

var getSharingForRecipient = function getSharingForRecipient(state, document, recipient) {
  var sharings = getDocumentActiveSharings(state, document._type, document._id);
  return sharings.find(function (s) {
    return s.attributes.recipients.find(function (r) {
      return r.recipient.id === recipient._id;
    });
  });
};

var getDocumentActiveSharings = function getDocumentActiveSharings(state, doctype, id) {
  var perms = getDoctypePermissions(state, doctype);
  return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(perms.byMe.filter(function (perm) {
    return perm.attributes.permissions['rule0'].values.indexOf(id) !== -1;
  })), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(perms.withMe.filter(function (perm) {
    return perm.attributes.permissions['rule0'].values.indexOf(id) !== -1;
  }))).map(function (p) {
    return getSharing(state, p.attributes.source_id);
  }).filter(function (s) {
    return !s.attributes.revoked;
  });
};

var getSharings = function getSharings(state, doctype) {
  var perms = getDoctypePermissions(state, doctype);
  var type = doctype === 'io.cozy.files' ? 'files' : 'collection';
  return {
    byMe: perms.byMe.map(function (p) {
      return p.attributes.permissions['rule0'].values[0];
    }),
    withMe: perms.withMe.map(function (p) {
      return p.attributes.permissions['rule0'].values[0];
    }),
    byLink: perms.byLink.map(function (p) {
      return p.attributes.permissions[type].values[0];
    })
  };
};
var getSharingStatus = function getSharingStatus(state, doctype, id) {
  var sharings = getDocumentActiveSharings(state, doctype, id);
  return {
    shared: sharings.length !== 0,
    owner: sharings.length === 0 || sharings.some(function (s) {
      return s.attributes.owner === true;
    }),
    sharingType: sharings.some(function (s) {
      return s.attributes.sharing_type === 'master-master';
    }) ? 'master-master' : 'master-slave',
    sharings: sharings
  };
};
var getSharingDetails = function getSharingDetails(state, doctype, id) {
  var _getSharingStatus = getSharingStatus(state, doctype, id),
      shared = _getSharingStatus.shared,
      owner = _getSharingStatus.owner,
      sharingType = _getSharingStatus.sharingType,
      sharings = _getSharingStatus.sharings;

  var sharingLink = getSharingLink(state, doctype, id);
  return {
    shared: shared,
    owner: owner,
    sharingType: sharingType,
    sharingLink: sharingLink,
    sharer: shared && !owner ? {
      name: 'John Doe',
      url: sharings[0].attributes.sharer.url
    } : null,
    readOnly: !owner && sharingType === 'master-slave',
    recipients: shared && owner ? getSharingRecipients(state, sharings) : [],
    byMe: shared && owner === true,
    withMe: shared && !owner,
    byLink: !!sharingLink
  };
};

var getSharingRecipients = function getSharingRecipients(state, sharings) {
  return sharings.filter(function (sharing) {
    return sharing.attributes.recipients;
  }).map(function (sharing) {
    return sharing.attributes.recipients.map(function (info) {
      return {
        contact: getContact(state, info.recipient.id),
        status: info.status,
        type: sharing.attributes.sharing_type
      };
    });
  }).reduce(function (a, b) {
    return a.concat(b);
  }, []);
};

var buildSharingLink = function buildSharingLink(id, doctype, sharecode) {
  return "".concat(window.location.origin, "/public?sharecode=").concat(sharecode, "&id=").concat(id).concat(doctype === 'file' ? '&directdownload' : '');
}; // helpers


var isFile = function isFile(_ref7) {
  var _type = _ref7._type,
      type = _ref7.type;
  return _type === 'io.cozy.files' || type === 'directory' || type === 'file';
};

var track = function track(document, action) {
  var tracker = Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_6__["getTracker"])();

  if (!tracker) {
    return;
  }

  tracker.push(['trackEvent', isFile(document) ? 'Drive' : 'Photos', action, "".concat(action).concat(isFile(document) ? 'File' : 'Album')]);
};

var trackSharingByLink = function trackSharingByLink(document) {
  return track(document, 'shareByLink');
};

var trackSharingByEmail = function trackSharingByEmail(document) {
  return track(document, 'shareByEmail');
};

/***/ }),

/***/ "oway":
/***/ (function(module) {

module.exports = {"app":{"logo":{"alt":"%{name} logo"},"logout":"Desconexión"},"date":{"format":"DD/MM/YYYY","placeholder":"dd/mm/yyyy"},"manifest":{"name":"Inicio","short_description":"Cozy Collect es la aplicación que le ayuda a recopilar todos sus datos personales que están en Cozy.","long_description":"Con Cozy Collect, usted puede facilmente:\n* Descargar documentos de todos sus proveedores\n* Establecer la frecuencia con la que Cozy recopilará sus facturas\n* Acceder directoamente a los documentos recopilados por su Cozy","changes":"Seguro ya se ha dado cuenta, el Store ha llegado a su Cozy\nAprovechamos para mejorar Collect:\n*Adaptación a Store.\n*Fusión de fichas: cuando se tienen diversas cuentas en un proveedor, la primera se fusiona baja la ficha del proveedor.\n*Mejora de algunas páginas de Conectores."},"add_service":"Añadir","fix_konnector_error":"Fix now","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Opcional)","title":"Conecte su cuenta %{name} ","data":{"title":"Datos recopilados:","service":{"description":"Descripción del servicio:"}},"tabs":{"sync":"sincronización","account":"cuenta","data":"datos recopilados"}},"disconnect":{"title":"Desconexión","description":"Usted se desconectará de esta cuenta, pero se guardarán los datos importados"},"form":{"title":"Cuenta","label":{"firstname":"Nombre","lastname":"Apellido","login":"Login","consumerKey":"Clave del usuario","consumerSecret":"Secreto del usuario","appKey":"Clave de la aplicación","appSecret":"Secreto de la aplicación","tricountUrl":"URL Tricount","cardNumber":"Número de tarjeta","dob":"Fecha de nacimiento","password":"Contraseña","email":"Email","bank_identifier":"Identificante bancario (opcional)","profileName":"Nombre del perfil","identifier":"Identificador","new_identifier":"Identificador","secret":"Contraseña","answer":"Respuesta secreta","access_token":"Token de acceso","accessTokenSecret":"Token de acceso secreto","apikey":"Clave Api","phoneNumber":"Número de teléfono","folderPath":"Ruta de la carpeta","namePath":"Nombre de la carpeta","authCode":"Código de autorización","accountName":"Nombre de la cuenta","loginUrl":"URL de acceso","token":"Token","agreement":"Acepto","refreshToken":"Recargar el token","timeout":"Retardo (ms)","branchName":"Oficina","code":"Código confidencial"},"placeholder":{"password":"La contraseña que usted usa para acceder al servicio","update_password":"Actualizar la contraseña","accountName":"Ejemplo: Cuenta personal","namePath":"Ejemplo: Facturas de Camille. La ruta de nombre predeterminado es su login."},"button":{"connect":"Conectar","cancel":"Cancelar","save":"Guardar","disconnect":"Desconectar esta cuenta","delete":"Borrar esta cuenta","advanced":"Opciones avanzadas","synchronize":"Sincronizar ahora"}},"folder":{"title":"Configuración de carpetas relacionadas","withoutSettings":{"title":"Carpeta relacionada"},"link":"Abrir la carpeta en Cozy Drive","changePath":"cambiar la ruta de acceso","error":"Oops, algo salió mal. No se asuste, sus archivos siguen ahí, por favor vuelva a intentarlo más tarde.","close":"cerrar","warning":"Usted cambia su ruta de acceso","oldFiles":"Todas sus facturas serán trasladadas a su nueva ruta de acceso","newFiles":"Sus nuevas facturas serán descargadas a su nueva ruta de acceso","newPath":"Todo salió bien, el nuevo camino de acceso para su cuenta %{name} es:","placeholder":{"administrative":"Administrativa","photos":"Fotos"}},"success":{"title":{"connect":"Configuración correcta!","update":"¡Su cuenta %{name} ha sido actualizada!"},"banksLinkText":"Ver mis cuentas en %{appName}","driveLinkText":"Abrir la carpeta en Cozy Drive","button":"Cerrar"},"message":{"folder":{"title":"Carpeta","link":"Abrir la carpeta en Cozy Drive"},"success":{"connect":"Sus datos estarán disponibles en su Cozy en pocos minutos y a partir de ese momento, los siguientes lo estarán automáticamente.","update":"¡Su cuenta %{name} ha sido actualizada exitosamente.","delete":"Cuenta suprimida exitosamente."},"syncing":{"bill":"Sus facturas están sincronizándose y estarán disponibles en la siguiente dirección:"},"synced":{"title":"Sincronización de sus datos","cron":"Frecuencia de sincronización: %{frequency}","cron_hourly":"cada hora","cron_daily":"una vez por día","cron_weekly":"una vez por semana","cron_monthly":"una vez por mes","cron_undefined":"manualmente","syncing":"ejecutándose...","unknown":"desconocido","last_sync":"Última sincronización: **%{date}**","date_format":"MMMM D[,] YYYY [a las] HH[:]mm","bill":"Encuentre sus datos en la aplicación Drive en este sitio:"},"error":{"server":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?","bad_credentials":"Lo siento, uste ha escrito un login o una contraseña incorrectos.","delete":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?"}},"forceConnection":"Vuelva a ejecutar","editor_detail":"Servicio desarrolado por %{editor}"},"account_picker":{"add_account_button":{"label":"Añadir una cuenta"}},"apps":{"title":"Mis apps"},"connection":{"CTA":{"twofa_failed":"Vuelva a ejecutar"},"error":{"default":{"title":"Ha ocurrido un error","description":"Desafortunadamente, algo salió mal al intentar conectar con %{name}. Por favor, controle otra vez la información de su cuenta, visite nuestra ayuda en línea o contáctenos en contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"El amacenamiento de Cozy está lleno","description":"Este servicio no puede recuperar sus documentos ahora. Por favor, borre algunos archivos o vaya a \"Ajustes > Almacenamiento** para obtener más espacio libre."},"CHALLENGE_ASKED":{"title":"Se requiere Challenge","description":"Parece que el sitio web requiere un segundo factor de autenticación que aún no está disponible. Puede intentar resolver el problema en el sitio web[%{name}](%{link}) antes de volver a intentarlo."},"LOGIN_FAILED":{"title":"Malas credenciales","description":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Secreto exigido","description":"Se debe llenar un campo adicional antes de controlar sus credenciales."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Bloqueado temporalmente","description":"Se hicieron demasiados intentos. Por favor, actualice sus credenciales en el sitio web[%{name}](%{link}) y actualice el conector más tarde."},"MAINTENANCE":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible o que el konnector debe actualizarse. Vuelva a ejecutar el conector más tarde o visite nuestra ayuda en línea."},"NOT_EXISTING_DIRECTORY":{"title":"Falta la carpeta de destino","description":"Parece que la carpeta de destino de esta cuenta ha sido borrada. Por favor desconéctese de la cuenta, restáurela y vuelva a conectarse."},"UNKNOWN_ERROR":{"title":"Error de conexión","description":"Ha ocurrido un error no identificado."},"USER_ACTION_NEEDED":{"title":"Acción necesaria con el proveedor","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y realice una acción específica. Vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Se requiere volver a acceder","description":"El servicio [%{name}](%{link}) requiere que usted vuelva a acceder. Por favor desconecte y reconecte su cuenta %{name} a esta aplicación. No se perderá ningún dato."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Cuenta no disponible","description":"Parece que su cuenta no está activa. Compruebe su cuenta en[%{name}](%{link}) antes de volver a intentarlo."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Se requiere actualizar la contraseña","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y actualice su contraseña. Por favor, vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Se necesitan nuevos permisos de validación","description":"Su conector fue actualizado y los permisos cambiados. Por favor, valídelos antes de volver a lanzar el conector."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relanzar la conexión al servicio para recuperar sus datos","description":"La última conexión al servicio ha fallado; por favor, láncela de nuevo. Es posible que tenga que proporcionar un código de validación."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Código suministrado para dos factores es equivocado","description":"El código para dos factores suministrado esta errado, ensaye de nuevo por favor."},"VENDOR_DOWN":{"title":"Servicio no disponible","description":"Parece que el servicio[%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.BANK_DOWN":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Servicio no disponible","description":"Parece que en este momento estamos experimentando una sobrecarga con nuestros conectores bancarios. Por favor, vuelva a ejecutar el conector más tarde."}}},"intent":{"konnector":{"install":{"error":{"message":"Este conector no se puede instalar"}}},"service":{"return":"Volver a la lista de conectores","success":{"button":{"label":"Cerrar"}},"error":{"initialization":"El servicio ha fallado al inicializarse. Sentimos los inconvenientes.","creation":"Imposible crear una cuenta, ha ocurrido un error.","cause":"Causa: %{error}"},"cancel":"Cancelar","terminate":"Terminar"}},"field":{"password":{"visibility":{"hide":"Ocultar","show":"Mostrar","title":{"hide":"Ocultar la contraseña","show":"Mostrar la contraseña"}}}},"nav":{"services":"Servicios instalados"},"category":{"all":"Todo","banking":"Bancos","health":"Salud","insurance":"Seguros","transport":"Transporte","social":"Social","isp":"PSI","telecom":"Telecom","energy":"Energía","host_provider":"Huesped","productivity":"Productividad","shopping":"Compras","public_service":"Servicios Públicos","other":"Otros"},"loading":{"initial":"Cargando cuentas...","working":"Cargando"},"validation":{"exact_length":"Debe estar compuesto de %{length} caracteres exactamente.","max_length":"La longitud máxima es de %{length}  caracteres.","min_length":"Debe contener al menos %{length} caracteres.","pattern":"El valor debe coincidir con un patrón específico: %{pattern}.\n"},"update":{"title":"Está disponible una actualización de este servicio.","regular":"Actualice esta versión para seguir obteniendo sus datos y disponer de las últimas mejoras.","blocking":"Actualícela para seguir obteniendo sus datos","CTA":"Actualizar"},"error":{"initial":"Algo ocurrió al recolectar sus colectores y sus datos. por favor, vuelva a cargar la página.","LOGIN_FAILED":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo.","UNKNOWN_ERROR":"Algo inesperado ha ocurrido al ejecutar el conector","JOB_TIMEOUT":"La ejecución del conector ha tardado mucho","button":{"reload":"Volver a cargar la página ahora"}},"tutorial":{"cozy_collect":{"title":"Automatice la recolección de sus datos","text":"Ellos serán almacenados en su Cozy, usted no tendrá que buscarlos en parte alguna.","button":"Siguiente"},"home":{"apps":{"button":"Siguiente","text":"Organice facilmente su vida numérica (archivos, imágenes, cuentas de banco, ...)","title":"Acceda a todas sus aplicaciones Cozy"},"services":{"button":"Configurar mis cuentas","text":"Ellos serán almacenados en su Cozy, usted no tendrá que buscarlos en parte alguna.","title":"Automatice la recolección de sus datos"}},"menu_apps":{"title":"Su Cozy es mucho más que un simple agregador de datos","text":"Abra el menú de Aplicaciones para descubrir las características que Cozy puede ofrecerle.","button":"Descubrir mis aplicaciones"}},"maintenance":{"icon":"Este conector está en mantenimiento","service":"Servicio interrumpido","problem":"%{konnectorName} no permite que su Cozy acceda a sus datos","title":"¿Qué sucede?"},"connector":{"debug":{"successMessage":"Este konnector es sólo para fines de debug, este es un mensaje habitual adicional de éxito."},"empty":{"title":"¡Empiece a recopilar sus datos!","text":"Sincronice sus cuentas con su Cozy para recuperar automáticamente sus datos (facturas, reembolsos, gastos...)"},"silenced":"%{name} no se sugerirá más. Siempre puede encontrar un proveedor haciendo clic en el botón \"Añadir\".","noAccount":"Cuenta inexistente","add":"Añadir un servicio","update":"Actualización disponible","logo":{"alt":"%{name} logo\n"},"enedis":{"description":{"service":"Recupere sus datos de Linky conectandose a su cuenta de Enedis. Debe tener un medidor Linky y haber creado antes su cuenta de Enedis [en el sitio web de Enedis] (https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Fing proporciona este conector para el proyecto MesInfos. Recupera los datos de su contrato de electricidad y descarga su consumo de electricidad del día anterior. Este conector se ejecuta en su Cozy y Fing no tendrá acceso a estos datos."}},"orange":{"message":{"delay":"Una vez conectado, se envía al sistema de información de Orange una solicitud para extraer sus datos. Estos datos son válidos durante 15 días. Sus datos se actualizan automáticamente cada quince días."}},"orangemobile":{"description":{"connector":"En el contexto de 'MesInfos', Orange le permite localizar permanentemente su teléfono.\n\n**La recopilación de datos exige su acuerdo previo**\n\nHaciendo clic en \"Apruebo\", usted consiente que se recopile la posición de su teléfono, cada 30 minutos. La información recopilada será la siguiente:\nFecha y hora de la ubicación.\nDatos de la ubicación de la antena más cercana en el momento de la recopimación.\nLos datos recopilados por Orange después de su aceptación estarán disponibles sólo en el Cozy que usted ha asignado en el contexto de 'MesInfos'. Se añadirán a sus datos de ubicación almacenados en su registro de llamadas.","service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente los registros de llamadas de su teléfono. Estos registros de llamadas incluyen su número de teléfono, el número de teléfono de su corresponsal, fecha, duración de la llamada  y datos sobre la localización de la antena radio más cercana en el momento de la recopilación.\n\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \"Mapeando Mi Vida\" (pronto disponible en el Cozy Store).","field":{"agreement":"¿En el contexto de \"Mes infos\", aprueba usted que Orange localice regularmente su teléfono ?"}}},"orangevideos":{"description":{"service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente la lista de las películas que usted ha descargado gratis (TV Replay) o pagando VOD desde em 01/01/2015 (no se incluyen películos con contenido para adultos°.\\n\\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \"My Movies Music\" (pronto disponible en el Cozy Store)."}},"axabanque102":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo).","connector":"La respuesta secreta es [pregunta por HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) cuando usted se conecta sin doble autenticación. Ejemplo: ¿Cómo se llama su mascota?"}},"ingdirect95":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Sincronizando cuentas","header_mobile":"%{done} de %{total}","header_done":"Sincronizado %{done}  de %{total}","item":{"pending":"Pendiente"},"close":"Cerrar"},"services":{"title":"Servicios instalados"},"status":{"interrupted":"SEVICIO INTERRUMPIDO","edf":{"maintenance":"El sistema de información de EDF ha cambiado y el acceso a los datos relacionados no funciona. Este konnector no puede recuperar actualmente sus datos de EDF. Estamos tratando de restaurar la situación y le notificaremos cuando se arregle. [Más información en](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"DD MMM"}}}};

/***/ }),

/***/ "ppHT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_4__);






var useInstanceSettings = function useInstanceSettings(client) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({}),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      settings = _useState2[0],
      setSettings = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])('idle'),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      fetchStatus = _useState4[0],
      setFetchStatus = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                setFetchStatus('loading');
                _context.next = 4;
                return client.query(client.all('io.cozy.settings').getById('instance'));

              case 4:
                response = _context.sent;
                setSettings(lodash_get__WEBPACK_IMPORTED_MODULE_4___default()(response, 'data.attributes'), {});
                setFetchStatus('loaded');
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                setFetchStatus('failed');

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, []);
  return {
    data: settings,
    fetchStatus: fetchStatus
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useInstanceSettings);

/***/ }),

/***/ "qgiu":
/***/ (function(module) {

module.exports = {"defaultDateFormat":"MM/DD/YYYY","defaultTriggerTimeInterval":[0,5],"filteredApps":["home"],"displayedErrorTypes":["DISK_QUOTA_EXCEEDED","CHALLENGE_ASKED","LOGIN_FAILED","LOGIN_FAILED.NEEDS_SECRET","LOGIN_FAILED.TOO_MANY_ATTEMPTS","NOT_EXISTING_DIRECTORY","USER_ACTION_NEEDED","USER_ACTION_NEEDED.OAUTH_OUTDATED","USER_ACTION_NEEDED.ACCOUNT_REMOVED","USER_ACTION_NEEDED.CHANGE_PASSWORD","USER_ACTION_NEEDED.PERMISSIONS_CHANGED","USER_ACTION_NEEDED.TWOFA_EXPIRED","USER_ACTION_NEEDED.WRONG_TWOFA_CODE","USER_ACTION_NEEDED.SCA_REQUIRED","USER_ACTION_NEEDED.WEBAUTH_REQUIRED"],"customWallpaperPath":"/Photos/Settings/Wallpaper.jpg"};

/***/ }),

/***/ "rGvZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCTYPE", function() { return DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTriggers", function() { return fetchTriggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnectorTriggers", function() { return getKonnectorTriggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTrigger", function() { return getTrigger; });
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m+TH");

var DOCTYPE = 'io.cozy.triggers';
var triggersCollectionKey = 'triggers'; // CRUD action creators

var fetchTriggers = function fetchTriggers() {
  return redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["fetchTriggers"](triggersCollectionKey, 'konnector');
}; // selectors

var getKonnectorTriggers = function getKonnectorTriggers(state, konnector) {
  var existingAccountIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]).filter(function (trigger) {
    return trigger.worker === 'konnector' && trigger.message && trigger.message.konnector === konnector.slug && trigger.message.account && existingAccountIds.includes(trigger.message.account);
  }) || [];
};
var getTrigger = function getTrigger(state, id) {
  return !!state.documents && !!state.documents[DOCTYPE] && state.documents[DOCTYPE][id];
};

/***/ }),

/***/ "rwEa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zAkM");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("/MKj");
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cokx");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4YEU");





var mapStateToProps = function mapStateToProps(state) {
  var queue = Object(reducers__WEBPACK_IMPORTED_MODULE_2__["getConnectionsQueue"])(state);
  return {
    queue: queue,
    visible: !!queue.length
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    purgeQueue: function purgeQueue() {
      return dispatch(Object(ducks_connections__WEBPACK_IMPORTED_MODULE_3__["purgeQueue"])());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(_queue__WEBPACK_IMPORTED_MODULE_0__["default"]));

/***/ }),

/***/ "sR/t":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectorJobs", function() { return fetchKonnectorJobs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerLastJob", function() { return getTriggerLastJob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isJobRunning", function() { return isJobRunning; });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("NAv5");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_0__);

var DOCTYPE = 'io.cozy.jobs'; // CRUD

var fetchKonnectorJobs = function fetchKonnectorJobs() {}; // selectors

var getTriggerLastJob = function getTriggerLastJob(state, trigger) {
  // state is state.cozy
  if (!state.documents || !state.documents[DOCTYPE] || !trigger) return null;
  return Object.values(state.documents[DOCTYPE]).reduce(function (lastestJob, currentJob) {
    if (currentJob.trigger_id !== trigger._id) return lastestJob;
    if (!lastestJob) return currentJob;
    return date_fns__WEBPACK_IMPORTED_MODULE_0___default.a.isAfter(currentJob.started_at, lastestJob.started_at) ? currentJob : lastestJob;
  }, null);
};
var isJobRunning = function isJobRunning(state, job) {
  return !!job && ['queued', 'running'].includes(job.state);
};

/***/ }),

/***/ "skrj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startSync", function() { return startSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startDoctypeSync", function() { return startDoctypeSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncDoctypeOk", function() { return syncDoctypeOk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncDoctypeError", function() { return syncDoctypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFirstSync", function() { return isFirstSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSynced", function() { return isSynced; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);




var START_SYNC = 'START_SYNC';
var START_DOCTYPE_SYNC = 'START_DOCTYPE_SYNC';
var SYNC_DOCTYPE_OK = 'SYNC_DOCTYPE_OK';
var SYNC_DOCTYPE_ERROR = 'SYNC_DOCTYPE_ERROR';
var doctypeSyncInitialState = {
  syncStatus: 'pending',
  lastSync: null,
  seqNumber: 0
};

var doctypeSync = function doctypeSync() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : doctypeSyncInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case START_DOCTYPE_SYNC:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        syncStatus: 'syncing',
        seqNumber: action.seqNumber
      });

    case SYNC_DOCTYPE_OK:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        syncStatus: 'done',
        lastSync: Date.now()
      });

    case SYNC_DOCTYPE_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        syncStatus: 'error',
        lastSync: Date.now()
      });

    default:
      return state;
  }
};

var synchronization = function synchronization() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case START_DOCTYPE_SYNC:
    case SYNC_DOCTYPE_OK:
    case SYNC_DOCTYPE_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, doctypeSync(state[action.doctype], action)));

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (synchronization);
var startSync = function startSync() {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", dispatch({
                  type: START_SYNC,
                  promise: function promise(client) {
                    return client.startSync(dispatch);
                  }
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var startDoctypeSync = function startDoctypeSync(doctype) {
  var seqNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    type: START_DOCTYPE_SYNC,
    doctype: doctype,
    seqNumber: seqNumber
  };
};
var syncDoctypeOk = function syncDoctypeOk(doctype, infos) {
  return {
    type: SYNC_DOCTYPE_OK,
    doctype: doctype,
    infos: infos
  };
};
var syncDoctypeError = function syncDoctypeError(doctype, error) {
  return {
    type: SYNC_DOCTYPE_ERROR,
    doctype: doctype,
    error: error
  };
};
var isFirstSync = function isFirstSync(state) {
  var seqNumbers = Object.keys(state.cozy.synchronization).map(function (doctype) {
    return state.cozy.synchronization[doctype].seqNumber;
  });
  return seqNumbers.every(function (number) {
    return number === 0;
  });
};
var isSynced = function isSynced(state) {
  var timestamps = Object.keys(state.cozy.synchronization).map(function (doctype) {
    return state.cozy.synchronization[doctype].lastSync;
  });
  return timestamps.every(function (ts) {
    return ts !== null;
  });
};

/***/ }),

/***/ "tdiL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("eO8H");
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("56YH");
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_flow__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("iDCe");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("uZd2");
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("cokx");
/* harmony import */ var cozy_client_dist_hoc__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("9FdZ");
/* harmony import */ var cozy_client_dist_hoc__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(cozy_client_dist_hoc__WEBPACK_IMPORTED_MODULE_13__);















var Konnector =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Konnector, _Component);

  function Konnector() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Konnector);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Konnector).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Konnector, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          konnector = _this$props.konnector,
          history = _this$props.history,
          triggers = _this$props.triggers;

      var konnectorWithtriggers = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, konnector, {
        triggers: {
          data: triggers
        }
      });

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_10__["Routes"], {
        konnectorRoot: "/connected/".concat(konnector.slug),
        konnector: konnectorWithtriggers,
        onDismiss: function onDismiss() {
          return history.push('/connected');
        }
      });
    }
  }]);

  return Konnector;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var konnectorSlug = ownProps.match.params.konnectorSlug;
  return {
    konnector: Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__["getKonnector"])(state.cozy, konnectorSlug),
    triggers: Object(reducers__WEBPACK_IMPORTED_MODULE_12__["getTriggersByKonnector"])(state, konnectorSlug)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (lodash_flow__WEBPACK_IMPORTED_MODULE_9___default()(Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps), cozy_client_dist_hoc__WEBPACK_IMPORTED_MODULE_13__["withClient"], react_router_dom__WEBPACK_IMPORTED_MODULE_8__["withRouter"])(Konnector));

/***/ }),

/***/ "uZd2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCTYPE", function() { return DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectors", function() { return fetchKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveInstalledKonnector", function() { return receiveInstalledKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnector", function() { return getKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstalledKonnectors", function() { return getInstalledKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIndexedKonnectors", function() { return getIndexedKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSlugs", function() { return getSlugs; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("m+TH");


var DOCTYPE = 'io.cozy.konnectors';
var konnectorsCollectionKey = 'konnectors'; // CRUD

var fetchKonnectors = function fetchKonnectors() {
  return redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__["fetchKonnectors"](konnectorsCollectionKey);
}; // Action creators

var receiveInstalledKonnector = function receiveInstalledKonnector(konnector) {
  var normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, konnector, konnector.attributes, {
    id: "".concat(DOCTYPE, "/").concat(konnector.slug),
    _type: DOCTYPE
  });

  return {
    doctype: DOCTYPE,
    type: 'RECEIVE_NEW_DOCUMENT',
    response: {
      data: [normalized]
    },
    updateCollections: ['konnectors']
  };
}; // Selectors

var getKonnector = function getKonnector(state, slug) {
  return !!state.documents && !!state.documents[DOCTYPE] && state.documents[DOCTYPE]["".concat(DOCTYPE, "/").concat(slug)];
};
var getInstalledKonnectors = function getInstalledKonnectors(state) {
  return !!state.documents && !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]);
};
var getIndexedKonnectors = function getIndexedKonnectors(state) {
  return !!state.documents && !!state.documents[DOCTYPE] && Object.keys(state.documents[DOCTYPE]).reduce(function (indexed, key) {
    var konnector = state.documents[DOCTYPE][key];
    indexed[konnector.slug] = konnector;
    return indexed;
  }, {});
};
var getSlugs = function getSlugs(state) {
  return !!state && !!state.documents && !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]).map(function (konnector) {
    return konnector.slug;
  });
};

/***/ }),

/***/ "vBg4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "default_e8acf04a531f51e2591973ab13ba63d7",
  "use": "default_e8acf04a531f51e2591973ab13ba63d7-usage",
  "viewBox": "0 0 64 64",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" id=\"default_e8acf04a531f51e2591973ab13ba63d7\">\n  <g fill=\"none\" fill-rule=\"evenodd\">\n    <path fill=\"#855CEA\" fill-rule=\"nonzero\" d=\"M32,17.3818748 C38.4788008,17.3818748 43.7310547,22.7384047 43.7310547,29.3455954 C43.7310547,35.9527861 38.4788008,41.3093161 32,41.3093161 C25.5211992,41.3093161 20.2689453,35.9527861 20.2689453,29.3455954 C20.2689453,22.7384047 25.5211992,17.3818748 32,17.3818748 Z M32,58.9450016 C24.97375,58.9450016 18.6050907,56.0787139 14,51.4547232 C17.8412687,47.7235961 24.4673594,45.2587711 32,45.2587711 C39.5326406,45.2587711 46.1587313,47.7235961 50,51.4547232 C45.3949093,56.0787139 39.02625,58.9450016 32,58.9450016 Z\" />\n    <g transform=\"translate(3)\">\n      <circle cx=\"29\" cy=\"32\" r=\"27\" stroke=\"#C2ADF4\" stroke-width=\"4\" />\n      <circle cx=\"29\" cy=\"6\" r=\"6\" fill=\"#C2ADF4\" />\n      <circle cx=\"29\" cy=\"58\" r=\"6\" fill=\"#C2ADF4\" />\n      <circle cx=\"52\" cy=\"47\" r=\"6\" fill=\"#C2ADF4\" />\n      <circle cx=\"6\" cy=\"47\" r=\"6\" fill=\"#C2ADF4\" />\n      <circle cx=\"52\" cy=\"18\" r=\"6\" fill=\"#C2ADF4\" />\n      <circle cx=\"6\" cy=\"18\" r=\"6\" fill=\"#C2ADF4\" />\n    </g>\n  </g>\n</symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "vwW3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);




var cozyMiddleware = function cozyMiddleware(client) {
  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        var promise = action.promise,
            type = action.type,
            types = action.types,
            rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(action, ["promise", "type", "types"]);

        if (!promise) {
          return next(action);
        }

        if (!type && !types) {
          return promise(client).then(function (action) {
            return dispatch(action);
          });
        }

        if (type) {
          return promise(client).then(function (response) {
            next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
              response: response,
              type: type
            }));
            return response;
          });
        }

        var _types = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(types, 3),
            REQUEST = _types[0],
            SUCCESS = _types[1],
            FAILURE = _types[2];

        next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
          type: REQUEST
        }));
        return promise(client).then(function (response) {
          next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
            response: response,
            type: SUCCESS
          }));
          return response;
        }, function (error) {
          console.log(error); // eslint-disable-line no-console

          next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
            error: error,
            type: FAILURE
          }));
        }).catch(function (error) {
          console.error('MIDDLEWARE ERROR:', error); // eslint-disable-line no-console

          next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
            error: error,
            type: FAILURE
          }));
        });
      };
    };
  };
};

/* harmony default export */ __webpack_exports__["default"] = (cozyMiddleware);

/***/ }),

/***/ "yMTE":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": "Us+F",
	"./en/": "Us+F",
	"./en/build_distance_in_words_locale": "LZbM",
	"./en/build_distance_in_words_locale/": "LZbM",
	"./en/build_distance_in_words_locale/index": "LZbM",
	"./en/build_distance_in_words_locale/index.js": "LZbM",
	"./en/build_format_locale": "6DAA",
	"./en/build_format_locale/": "6DAA",
	"./en/build_format_locale/index": "6DAA",
	"./en/build_format_locale/index.js": "6DAA",
	"./en/index": "Us+F",
	"./en/index.d.ts": "DYsx",
	"./en/index.js": "Us+F",
	"./en/package": "EJIZ",
	"./en/package.json": "EJIZ",
	"./es": "/S0t",
	"./es/": "/S0t",
	"./es/build_distance_in_words_locale": "GEfZ",
	"./es/build_distance_in_words_locale/": "GEfZ",
	"./es/build_distance_in_words_locale/index": "GEfZ",
	"./es/build_distance_in_words_locale/index.js": "GEfZ",
	"./es/build_format_locale": "O+zC",
	"./es/build_format_locale/": "O+zC",
	"./es/build_format_locale/index": "O+zC",
	"./es/build_format_locale/index.js": "O+zC",
	"./es/index": "/S0t",
	"./es/index.d.ts": "gbHe",
	"./es/index.js": "/S0t",
	"./es/package": "Vizl",
	"./es/package.json": "Vizl",
	"./fr": "LKA2",
	"./fr/": "LKA2",
	"./fr/build_distance_in_words_locale": "IzMR",
	"./fr/build_distance_in_words_locale/": "IzMR",
	"./fr/build_distance_in_words_locale/index": "IzMR",
	"./fr/build_distance_in_words_locale/index.js": "IzMR",
	"./fr/build_format_locale": "I3Zg",
	"./fr/build_format_locale/": "I3Zg",
	"./fr/build_format_locale/index": "I3Zg",
	"./fr/build_format_locale/index.js": "I3Zg",
	"./fr/index": "LKA2",
	"./fr/index.d.ts": "hE7Q",
	"./fr/index.js": "LKA2",
	"./fr/package": "herc",
	"./fr/package.json": "herc"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "yMTE";

/***/ }),

/***/ "ygPf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PiwikHashRouter; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("4kcP");







var addPiwik = function addPiwik(history) {
  if (Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_5__["shouldEnableTracking"])() && Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_5__["getTracker"])()) {
    var trackerInstance = Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_5__["getTracker"])();
    history = trackerInstance.connectToHistory(history); // when using a hash history, the initial visit is not tracked by piwik react router

    trackerInstance.track(history.location);
  }

  return history;
};

var PiwikHashRouter =
/*#__PURE__*/
function (_HashRouter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(PiwikHashRouter, _HashRouter);

  function PiwikHashRouter(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PiwikHashRouter);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(PiwikHashRouter).call(this, props));
    _this.history = addPiwik(_this.history);
    return _this;
  }

  return PiwikHashRouter;
}(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["HashRouter"]);



/***/ }),

/***/ "zAkM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queue", function() { return Queue; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cozy_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("yoMi");
var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t("yoMi", 1);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("buk/");
/* harmony import */ var ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("FwS1");
/* harmony import */ var ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("B/vO");














var Pending = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(function (props) {
  return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
    className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['item-pending']
  }, props.t('Queue.item.pending'));
});

var ProgressBar =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ProgressBar, _Component);

  function ProgressBar() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ProgressBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ProgressBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      progress: 0
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ProgressBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var elapsedTime = 0;
      this.progressInterval = setInterval(function () {
        elapsedTime += 10;
        var progress = Math.atan(elapsedTime / 3e3) / (Math.PI / 2) * 90;

        _this2.setState({
          progress: progress
        });
      }, 25);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.progressInterval);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var progress = this.state.progress;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        role: "progressbar",
        "aria-valuenow": progress,
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-item-progress-bar']),
        style: {
          width: "".concat(progress, "%")
        },
        ref: function ref(progressBar) {
          return _this3.progressBar = progressBar;
        }
      });
    }
  }]);

  return ProgressBar;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var Item =
/*#__PURE__*/
function (_Component2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Item, _Component2);

  function Item() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Item);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Item).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Item, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          konnector = _this$props.konnector,
          label = _this$props.label,
          status = _this$props.status,
          t = _this$props.t;
      var isOngoing = status === 'ongoing';
      var statusIcon;

      switch (status) {
        case 'ongoing':
          statusIcon = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_9__["Spinner"], {
            noMargin: true,
            className: "u-ml-half",
            color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_10__['dodgerBlue']
          });
          break;

        case 'canceled':
          statusIcon = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
            className: "u-ml-half",
            icon: "cross",
            color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_10__['monza']
          });
          break;

        case 'error':
        case 'conflict':
          statusIcon = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
            className: "u-ml-half",
            icon: "warning",
            color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_10__['monza']
          });
          break;

        case 'done':
          statusIcon = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
            className: "u-ml-half",
            icon: "check-circleless",
            color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_10__['emerald']
          });
          break;

        case 'pending':
        default:
          statusIcon = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Pending, null);
          break;
      }

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-item'], (_classNames = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_classNames, ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-item--done'], status === 'done'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_classNames, ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-item--error'], status === 'error'), _classNames))
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['item-icon'])
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_13__["default"], {
        alt: t('app.logo.alt', {
          name: konnector.name
        }),
        className: "c-",
        app: konnector
      })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['item-label'])
      }, label), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['item-status']
      }, statusIcon), isOngoing && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(ProgressBar, null));
    }
  }]);

  return Item;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var Queue =
/*#__PURE__*/
function (_Component3) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Queue, _Component3);

  function Queue() {
    var _getPrototypeOf3;

    var _this4;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Queue);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this4 = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf3 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Queue)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this4), "state", {
      collapsed: false
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this4), "toggleCollapsed", function () {
      _this4.setState(function (state) {
        return {
          collapsed: !state.collapsed
        };
      });
    });

    return _this4;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Queue, [{
    key: "render",
    value: function render() {
      var _classNames2;

      var _this$props2 = this.props,
          t = _this$props2.t,
          _this$props2$visible = _this$props2.visible,
          visible = _this$props2$visible === void 0 ? false : _this$props2$visible,
          _this$props2$queue = _this$props2.queue,
          queue = _this$props2$queue === void 0 ? [] : _this$props2$queue,
          purgeQueue = _this$props2.purgeQueue;
      var collapsed = this.state.collapsed;
      var doneCount = queue.filter(function (connection) {
        return connection.status !== 'ongoing';
      }).length;
      var successCount = queue.filter(function (connection) {
        return connection.status === 'done';
      }).length;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue'], (_classNames2 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_classNames2, ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue--visible'], visible), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_classNames2, ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue--collapsed'], collapsed), _classNames2))
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h4", {
        className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-header'],
        onDoubleClick: this.toggleCollapsed
      }, doneCount < queue.length && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-header-inner']
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
        className: "coz-desktop"
      }, t('Queue.header')), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
        className: "coz-mobile"
      }, t('Queue.header_mobile', {
        done: doneCount,
        total: queue.length
      }))), doneCount >= queue.length && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-header-inner']
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", null, t('Queue.header_done', {
        done: successCount,
        total: queue.length
      })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['btn-close']),
        onClick: purgeQueue
      }, t('Queue.close')))), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("progress", {
        className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-progress'],
        value: doneCount,
        max: queue.length
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-content']
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: ducks_connections_components_queue_styles_styl__WEBPACK_IMPORTED_MODULE_12___default.a['queue-list']
      }, queue.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Item, {
          key: item.triggerId,
          konnector: item.konnector,
          label: item.label,
          status: item.status,
          t: t
        });
      }))));
    }
  }]);

  return Queue;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(Queue));

/***/ }),

/***/ "zEKg":
/***/ (function(module, exports) {

module.exports = "/img/timeline.png";

/***/ }),

/***/ "zvYt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Applications", function() { return Applications; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("buk/");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var components_AppTile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("IiGW");
/* harmony import */ var components_LoadingPlaceholder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("gpBY");
/* harmony import */ var config_collect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("qgiu");
var config_collect__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t("qgiu", 1);
/* harmony import */ var ducks_apps__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("/n/j");















var LoadingAppTiles =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LoadingAppTiles, _PureComponent);

  function LoadingAppTiles() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LoadingAppTiles);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(LoadingAppTiles).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LoadingAppTiles, [{
    key: "render",
    value: function render() {
      var num = this.props.num;
      var tiles = [];

      for (var i = 0; i < num; i++) {
        tiles.push(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "item-wrapper",
          key: i
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("header", {
          className: "item-header"
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "item-icon"
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_LoadingPlaceholder__WEBPACK_IMPORTED_MODULE_11__["default"], null))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h3", {
          className: "item-title"
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_LoadingPlaceholder__WEBPACK_IMPORTED_MODULE_11__["default"], null))));
      }

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, tiles);
    }
  }]);

  return LoadingAppTiles;
}(react__WEBPACK_IMPORTED_MODULE_5__["PureComponent"]);

var Applications =
/*#__PURE__*/
function (_PureComponent2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Applications, _PureComponent2);

  function Applications() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Applications);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Applications).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Applications, [{
    key: "render",
    value: function render() {
      var receiveApps = this.props.receiveApps;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "app-list"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_7__["Query"], {
        query: function query(client) {
          return client.all('io.cozy.apps');
        }
      }, function (_ref) {
        var data = _ref.data,
            fetchStatus = _ref.fetchStatus;

        if (fetchStatus === 'loaded') {
          receiveApps(data);
        }

        return fetchStatus !== 'loaded' ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(LoadingAppTiles, {
          num: "3"
        }) : data.filter(function (app) {
          return app.state !== 'hidden' && !config_collect__WEBPACK_IMPORTED_MODULE_12__.filteredApps.includes(app.slug) && !cozy_flags__WEBPACK_IMPORTED_MODULE_9___default()("home_hidden_apps.".concat(app.slug.toLowerCase()));
        } // can be set in the context with `home_hidden_apps: - drive - banks`for example
        ).map(function (app, index) {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_AppTile__WEBPACK_IMPORTED_MODULE_10__["default"], {
            key: index,
            app: app
          });
        });
      }));
    }
  }]);

  return Applications;
}(react__WEBPACK_IMPORTED_MODULE_5__["PureComponent"]);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    receiveApps: function receiveApps(apps) {
      return dispatch(Object(ducks_apps__WEBPACK_IMPORTED_MODULE_13__["receiveApps"])(apps));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(null, mapDispatchToProps)(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__["translate"])()(Applications)));

/***/ })

/******/ });
//# sourceMappingURL=home.js.map