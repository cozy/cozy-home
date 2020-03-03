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
/******/ 		"intents": 0
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
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+NZW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorInstall", function() { return KonnectorInstall; });
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("iDCe");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("buk/");
/* harmony import */ var components_KonnectorSuccess__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("5Xzc");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("uZd2");
/* harmony import */ var styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("K4zY");
/* harmony import */ var styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12__);













var KonnectorInstall =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(KonnectorInstall, _Component);

  function KonnectorInstall(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KonnectorInstall);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(KonnectorInstall).call(this, props));
    _this.state = {
      trigger: null,
      success: false
    };
    _this.handleLoginSuccess = _this.handleLoginSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.handleSuccess = _this.handleSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(KonnectorInstall, [{
    key: "handleLoginSuccess",
    value: function handleLoginSuccess(trigger) {
      this.setState({
        trigger: trigger,
        success: true
      });
      this.props.onLoginSuccess(trigger);
    }
  }, {
    key: "handleSuccess",
    value: function handleSuccess(trigger) {
      this.setState({
        trigger: trigger,
        success: true
      });
      this.props.onSuccess(trigger);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          account = _this$props.account,
          konnector = _this$props.konnector,
          legacySuccess = _this$props.legacySuccess,
          onDone = _this$props.onDone,
          successMessage = _this$props.successMessage,
          successMessages = _this$props.successMessages,
          successButtonLabel = _this$props.successButtonLabel,
          t = _this$props.t;
      var _this$state = this.state,
          trigger = _this$state.trigger,
          success = _this$state.success;

      if (success || legacySuccess) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_KonnectorSuccess__WEBPACK_IMPORTED_MODULE_10__["default"], {
          account: account,
          connector: konnector,
          folderId: trigger && trigger.message.folder_to_save,
          onDone: onDone,
          title: successMessage,
          trigger: trigger,
          messages: successMessages,
          successButtonLabel: successButtonLabel
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-connection-content']
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-connection-form']
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", {
        className: "u-ta-center"
      }, t('account.config.title', {
        name: konnector.name
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_8__["TriggerManager"], {
        account: account,
        konnector: konnector,
        onLoginSuccess: this.handleLoginSuccess,
        onSuccess: this.handleSuccess,
        vaultClosable: false
      })));
    }
  }]);

  return KonnectorInstall;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    konnector: Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__["getKonnector"])(state.cozy, ownProps.connector.slug)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps)(KonnectorInstall)));

/***/ }),

/***/ "+tca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataAccessFacade; });
/* harmony import */ var _adapters_CozyStackAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2hsQ");
/* harmony import */ var _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("jPoV");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global cozy, PouchDB */

 // const isOnline = () =>
//   typeof navigator !== 'undefined' ? navigator.onLine : true

class DataAccessFacade {
  constructor() {
    this.stackAdapter = new _adapters_CozyStackAdapter__WEBPACK_IMPORTED_MODULE_0__["default"]();

    if (typeof PouchDB !== 'undefined') {
      this.pouchAdapter = new _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_1__["default"](); // TODO: strategy injection

      this.strategy = new PouchFirstStrategy();
    } else {
      this.strategy = new StackOnlyStrategy();
    }
  }

  setup(cozyUrl, options) {
    const config = _objectSpread({
      cozyURL: cozyUrl
    }, options);

    cozy.client.init(config); // TODO: For now we let cozy-client-js creates PouchDB instances

    this.stackAdapter.init(config);

    if (config.offline) {
      this.pouchAdapter.registerDoctypes(config.offline.doctypes);
    }
  }

  getAdapter(doctype) {
    return this.strategy.getAdapter(doctype, this.stackAdapter, this.pouchAdapter);
  }

  startSync(dispatch) {
    return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_1__["SYNC_BIDIRECTIONAL"]);
  }

  startReplicationTo(dispatch) {
    return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_1__["SYNC_TO"]);
  }

  startReplicationFrom(dispatch) {
    return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_1__["SYNC_FROM"]);
  }

}

class PouchFirstStrategy {
  getAdapter(doctype, stackAdapter, pouchAdapter) {
    if (pouchAdapter.getDatabase(doctype) === undefined) {
      return stackAdapter;
    }

    return pouchAdapter;
  }

}

class StackOnlyStrategy {
  getAdapter(doctype, stackAdapter) {
    return stackAdapter;
  }

}

/***/ }),

/***/ "/n/j":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveApps", function() { return receiveApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApp", function() { return getApp; });
const RECEIVE_APPS = 'RECEIVE_APPS';

const reducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_APPS:
      return action.apps || state;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer); // Action creators

const receiveApps = apps => ({
  type: RECEIVE_APPS,
  apps
}); // Selectors

const getApp = (state = [], slug) => state.find(app => app.slug === slug);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("201c");
__webpack_require__("7NIr");
module.exports = __webpack_require__("d/w2");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2hsQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_BY_LINK", function() { return SHARED_BY_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_WITH_ME", function() { return SHARED_WITH_ME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_WITH_OTHERS", function() { return SHARED_WITH_OTHERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyStackAdapter; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global cozy */
const FILES_DOCTYPE = 'io.cozy.files';
const FETCH_LIMIT = 50;
const SHARED_BY_LINK = 'sharedByLink';
const SHARED_WITH_ME = 'sharedWithMe';
const SHARED_WITH_OTHERS = 'sharedWithOthers';
class CozyStackAdapter {
  async fetchApps(skip = 0) {
    const {
      data,
      meta
    } = await cozy.client.fetchJSON('GET', '/apps/', null, {
      processJSONAPI: false
    });
    return {
      data: data || [],
      meta: meta,
      skip,
      next: !!meta && meta.count > skip + FETCH_LIMIT
    };
  }

  async fetchDocuments(doctype) {
    // WARN: cozy-client-js lacks a cozy.data.findAll method that uses this route
    try {
      // WARN: if no document of this doctype exist, this route will return a 404,
      // so we need to try/catch and return an empty response object in case of a 404
      const resp = await cozy.client.fetchJSON('GET', `/data/${doctype}/_all_docs?include_docs=true`); // WARN: the JSON response from the stack is not homogenous with other routes (offset? rows? total_rows?)
      // see https://github.com/cozy/cozy-stack/blob/master/docs/data-system.md#list-all-the-documents
      // WARN: looks like this route returns something looking like a couchDB design doc, we need to filter it:

      const rows = resp.rows.filter(row => !row.doc.hasOwnProperty('views')); // we normalize the data (note that we add _type so that cozy.client.data.listReferencedFiles works...)

      const docs = rows.map(row => Object.assign({}, row.doc, {
        id: row.id,
        _type: doctype
      })); // we forge a correct JSONAPI response:

      return {
        data: docs,
        meta: {
          count: resp.total_rows
        },
        skip: resp.offset,
        next: false
      };
    } catch (error) {
      if (error.message.match(/not_found/)) {
        return {
          data: [],
          meta: {
            count: 0
          },
          skip: 0,
          next: false
        };
      }

      throw error;
    }
  }

  async queryDocuments(doctype, index, options) {
    const fields = options.fields;
    const skip = options.skip || 0; // Mango wants an array of single-property-objects...

    const sort = options.sort ? index.fields.map(f => ({
      [f]: options.sort[f] || 'desc'
    })) : undefined;

    const queryOptions = _objectSpread({
      limit: FETCH_LIMIT,
      wholeResponse: true
    }, options, {
      // TODO: type and class should not be necessary, it's just a temp fix for a stack bug
      fields: [...fields, '_id', '_type', 'class'],
      skip,
      sort
    }); // abstract away the format differences between query replies on the VFS versus the data API


    let data, meta, next;

    if (doctype === FILES_DOCTYPE) {
      const response = await cozy.client.files.query(index, queryOptions);
      data = response.data.map(doc => Object.assign({
        _id: doc.id,
        _type: doctype
      }, doc, doc.attributes));
      meta = response.meta;
      next = meta.count > skip + FETCH_LIMIT;
    } else {
      const response = await cozy.client.data.query(index, queryOptions);
      data = response.docs.map(doc => Object.assign({
        id: doc._id,
        _type: doctype
      }, doc));
      meta = {};
      next = response.next;
    } // we forge a correct JSONAPI response:


    return {
      data,
      meta,
      next
    };
  }

  async fetchDocument(doctype, id) {
    const doc = await cozy.client.data.find(doctype, id); // we normalize again...

    const normalized = _objectSpread({}, doc, {
      id: doc._id,
      _type: doc._type
    });

    return {
      data: [normalized]
    };
  }

  init(config) {
    this.config = _objectSpread({}, config);
  }

  async createDocument(doctype, doc) {
    const created = await cozy.client.data.create(doctype, doc); // we forge a standard response with a 'data' property

    const normalized = _objectSpread({}, created, {
      id: created._id,
      _type: doctype
    });

    return {
      data: [normalized]
    };
  }

  async createTrigger(doc) {
    const created = await cozy.client.fetchJSON('POST', '/jobs/triggers', {
      data: doc
    });

    const normalized = _objectSpread({}, created, created.attributes, {
      id: created._id
    });

    return {
      data: [normalized]
    };
  }

  async launchTrigger(doc) {
    const job = await cozy.client.fetchJSON('POST', `/jobs/triggers/${doc._id}/launch`);

    const normalized = _objectSpread({}, job, job.attributes, {
      id: job._id
    });

    return {
      data: [normalized]
    };
  }

  async updateDocument(doc) {
    const updated = await cozy.client.data.updateAttributes(doc._type, doc.id, doc); // we forge a standard response with a 'data' property

    return {
      data: [_objectSpread({}, doc, {
        _rev: updated._rev
      })]
    };
  }

  async deleteDocument(doc) {
    /* const deleted = */
    await cozy.client.data.delete(doc._type, doc); // we forge a standard response with a 'data' property

    return {
      data: [doc]
    };
  }

  async deleteTrigger(doc) {
    await cozy.client.fetchJSON('DELETE', `/jobs/triggers/${doc._id}`);
    return {
      data: [doc]
    };
  }

  createIndex(doctype, fields) {
    return cozy.client.data.defineIndex(doctype, fields);
  }

  async fetchFileByPath(path) {
    try {
      const file = await cozy.client.files.statByPath(path); // we forge a standard response with a 'data' property

      return {
        data: [normalizeFile(file)]
      };
    } catch (err) {
      return null;
    }
  }

  async createFile(file, dirID) {
    const created = await cozy.client.files.create(file, {
      dirID
    }); // we forge a standard response with a 'data' property

    return {
      data: [normalizeFile(created)]
    };
  }

  async trashFile(file) {
    /* const trashed = */
    cozy.client.files.trashById(file.id); // we forge a standard response with a 'data' property

    return {
      data: [file]
    };
  }

  async fetchReferencedFiles(doc, skip = 0) {
    // WARN: _type and _id are needed by cozy.client.data.fetchReferencedFiles
    const normalized = _objectSpread({}, doc, {
      _id: doc.id
    }); // WARN: the stack API is probably not ideal here: referencedFiles are in the 'included' property
    // (that should be used when fetching an entity AND its relations) and the 'data' property
    // only contains uplets { id, type }


    const {
      included,
      meta
    } = await cozy.client.data.fetchReferencedFiles(normalized, {
      skip,
      limit: FETCH_LIMIT
    }); // we forge a standard response with a 'data' property

    return {
      data: !included ? [] : included.map(file => _objectSpread({}, file, file.attributes, {
        _type: 'io.cozy.files'
      })),
      meta,
      next: meta.count > skip + FETCH_LIMIT,
      skip
    };
  }

  async fetchKonnectors(skip = 0) {
    const {
      data,
      meta
    } = await cozy.client.fetchJSON('GET', `/konnectors/`, null, {
      processJSONAPI: false
    });
    return {
      data: data ? data.map(konnector => _objectSpread({}, konnector, konnector.attributes, {
        _type: 'io.cozy.konnectors'
      })) : [],
      meta: meta,
      skip,
      next: !!meta && meta.count > skip + FETCH_LIMIT
    };
  }

  async fetchTriggers(worker, skip = 0) {
    const {
      data,
      meta
    } = await cozy.client.fetchJSON('GET', `/jobs/triggers?Worker=${worker}`, null, {
      processJSONAPI: false
    });
    return {
      data: data ? data.map(trigger => _objectSpread({}, trigger, trigger.attributes, {
        _type: 'io.cozy.triggers'
      })) : [],
      meta: meta,
      skip,
      next: !!meta && meta.count > skip + FETCH_LIMIT
    };
  }

  async addReferencedFiles(doc, ids) {
    await cozy.client.data.addReferencedFiles(doc, ids);
    return ids;
  }

  async removeReferencedFiles(doc, ids) {
    // WARN: _type and _id are needed by cozy.client.data.removeReferencedFiles
    const normalized = _objectSpread({}, doc, {
      _id: doc.id
    });

    await cozy.client.data.removeReferencedFiles(normalized, ids);
    return ids;
  }

  async fetchSharingPermissions(doctype) {
    const fetchPermissions = (doctype, sharingType) => cozy.client.fetchJSON('GET', `/permissions/doctype/${doctype}/${sharingType}`);

    const byMe = await fetchPermissions(doctype, SHARED_WITH_OTHERS);
    const byLink = await fetchPermissions(doctype, SHARED_BY_LINK);
    const withMe = await fetchPermissions(doctype, SHARED_WITH_ME);
    return {
      byMe,
      byLink,
      withMe
    };
  }

  fetchSharing(id) {
    return cozy.client.fetchJSON('GET', `/sharings/${id}`);
  }

  createSharing(permissions, contactIds, sharingType, description) {
    return cozy.client.fetchJSON('POST', '/sharings/', {
      desc: description,
      permissions,
      recipients: contactIds.map(contactId => ({
        recipient: {
          id: contactId,
          type: 'io.cozy.contacts'
        }
      })),
      sharing_type: sharingType
    });
  }

  revokeSharing(sharingId) {
    return cozy.client.fetchJSON('DELETE', `/sharings/${sharingId}`);
  }

  revokeSharingForClient(sharingId, clientId) {
    return cozy.client.fetchJSON('DELETE', `/sharings/${sharingId}/recipient/${clientId}`);
  }

  createSharingLink(permissions) {
    return cozy.client.fetchJSON('POST', `/permissions?codes=email`, {
      data: {
        type: 'io.cozy.permissions',
        attributes: {
          permissions
        }
      }
    });
  }

  revokeSharingLink(permission) {
    return cozy.client.fetchJSON('DELETE', `/permissions/${permission._id}`);
  }

}

const normalizeFile = file => _objectSpread({}, file, file.attributes, {
  id: file._id
});

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

const DOCTYPE = 'io.cozy.accounts';
const accountCollectionKey = 'accounts';
const fetchAccounts = () => Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["fetchCollection"])(accountCollectionKey, DOCTYPE); // selectors

const getAccount = (state, id) => {
  if (!state.documents || !state.documents[DOCTYPE]) {
    return null;
  }

  return state.documents[DOCTYPE][id];
};
const getIds = state => // state.collection is bugged, it does not update correctly id list on
// RECEIVE_DATA
// (state.collections &&
//   state.collections[accountCollectionKey] &&
//   state.collections[accountCollectionKey].ids) ||
// []
state.documents && state.documents[DOCTYPE] && Object.keys(state.documents[DOCTYPE]) || [];

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

/***/ "4P+e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"coz-form-controls":"coz-form-controls--1gEYB","coz-form-controls-success":"coz-form-controls-success--1NQyf","coz-btn":"coz-btn--233oo","col-btn--regular":"col-btn--regular--2N744","col-account-form-success-buttons":"col-account-form-success-buttons--1J36i","account-form-login":"account-form-login--_w3tO","col-account-form-advanced-button":"col-account-form-advanced-button--niE6T","account-form-fieldset":"account-form-fieldset--3WD-X","col-account-success":"col-account-success--1NEI1","col-account-success-links":"col-account-success-links--15Ii5","col-account-success-link":"col-account-success-link--18QVL","col-account-success-illu":"col-account-success-illu--RvZfy"};

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
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fvjX");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Puqe");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lib_konnectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("8CvS");
/* harmony import */ var ducks_jobs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("sR/t");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // constant

const ACCOUNT_DOCTYPE = 'io.cozy.accounts';
const TRIGGERS_DOCTYPE = 'io.cozy.triggers';
const JOBS_DOCTYPE = 'io.cozy.jobs';
const ENQUEUE_CONNECTION = 'ENQUEUE_CONNECTION';
const LAUNCH_TRIGGER = 'LAUNCH_TRIGGER';
const PURGE_QUEUE = 'PURGE_QUEUE';
const RECEIVE_DATA = 'RECEIVE_DATA';
const RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT';
const RECEIVE_DELETED_DOCUMENT = 'RECEIVE_DELETED_DOCUMENT';
const UPDATE_CONNECTION_RUNNING_STATUS = 'UPDATE_CONNECTION_RUNNING_STATUS';
const UPDATE_CONNECTION_ERROR = 'UPDATE_CONNECTION_ERROR';
const START_CONNECTION_CREATION = 'START_CONNECTION_CREATION';
const END_CONNECTION_CREATION = 'END_CONNECTION_CREATION'; // Helpers

const getTriggerKonnectorSlug = trigger => trigger && trigger.message && trigger.message.konnector || null;

const isKonnectorTrigger = doc => doc._type === TRIGGERS_DOCTYPE && !!doc.message && !!doc.message.konnector;

const isKonnectorJob = doc => doc._type === JOBS_DOCTYPE && doc.worker === 'konnector'; // reducers


const reducer = (state = {}, action) => {
  switch (action.type) {
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
    case LAUNCH_TRIGGER:
      // Trigger is launched, connection should be running.
      if (!action.trigger || !action.trigger._id) throw new Error('Missing trigger id');
      if (!action.trigger.message || !action.trigger.message.konnector) throw new Error('Malformed trigger message');
      return _objectSpread({}, state, {
        [getTriggerKonnectorSlug(action.trigger)]: konnectorReducer(state[getTriggerKonnectorSlug(action.trigger)], action)
      });

    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      if (!action.response || !action.response.data || !action.response.data.length) {
        return state;
      }

      return action.response.data.reduce((newState, doc) => {
        const isTrigger = isKonnectorTrigger(doc);
        const isJob = isKonnectorJob(doc); // Ignore non triggers or non jobs

        if (!isTrigger && !isJob) return newState;
        const konnectorSlug = doc.message.konnector;
        const triggerId = isTrigger && doc._id || isJob && doc.trigger_id;
        if (!triggerId) return newState;
        const account = isTrigger && !!doc.message && doc.message.account;
        const currentStatus = isTrigger && doc.current_state && doc.current_state.status || isJob && doc.state;
        const error = isTrigger && !!doc.current_state && doc.current_state.status !== 'done' && !!doc.current_state.last_error && Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_4__["buildKonnectorError"])(doc.current_state.last_error) || isJob && !!doc.error && Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_4__["buildKonnectorError"])(doc.error) || null;
        const lastSyncDate = isTrigger && !!doc.current_state && doc.current_state.last_execution || isJob && doc.queued_at;
        const existingTriggers = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(newState, [konnectorSlug, 'triggers', 'data'], []);
        let rawTriggers = existingTriggers;

        if (isTrigger) {
          rawTriggers = existingTriggers.filter(({
            _id
          }) => _id !== doc._id);
          rawTriggers.push(doc);
        }

        return _objectSpread({}, newState, {
          [konnectorSlug]: {
            triggers: _objectSpread({}, lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(newState, [konnectorSlug, 'triggers'], []), {
              data: rawTriggers,
              [triggerId]: _objectSpread({}, lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(newState, [konnectorSlug, 'triggers', triggerId], {}), {
                account: account || lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(newState, [konnectorSlug, 'triggers', triggerId, 'account']),
                error,
                hasError: !!error || currentStatus === 'errored',
                isRunning: ['queued', 'running'].includes(currentStatus),
                isConnected: !error && currentStatus === 'done',
                lastSyncDate: lastSyncDate
              })
            })
          }
        });
      }, state);

    case PURGE_QUEUE:
    case RECEIVE_DELETED_DOCUMENT:
      return Object.keys(state).reduce((konnectors, slug) => {
        return _objectSpread({}, konnectors, {
          [slug]: konnectorReducer(state[slug], action)
        });
      }, state);

    default:
      return state;
  }
};

const creation = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      {
        if (!state) return null;

        if (!action.response || !action.response.data || action.response.data.length !== 1) {
          return state;
        }

        const doc = action.response.data[0];
        const isAccount = doc._type === ACCOUNT_DOCTYPE;
        if (isAccount) return _objectSpread({}, state, {
          account: doc._id
        });
        const isTrigger = isKonnectorTrigger(doc);
        if (isTrigger) return _objectSpread({}, state, {
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

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  creation,
  konnectors: reducer
})); // sub(?) reducers

const konnectorReducer = (state = {}, action) => {
  switch (action.type) {
    case ENQUEUE_CONNECTION:
    case LAUNCH_TRIGGER:
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_DELETED_DOCUMENT:
    case PURGE_QUEUE:
      // We assume that document being a trigger has already been validated.
      return _objectSpread({}, state, {
        triggers: triggersReducer(state.triggers, action)
      });

    default:
      return state;
  }
};

const triggersReducer = (state = {}, action) => {
  switch (action.type) {
    case ENQUEUE_CONNECTION:
      return _objectSpread({}, state, {
        [action.trigger._id]: _objectSpread({}, state[action.trigger._id], {
          isEnqueued: true
        })
      });

    case LAUNCH_TRIGGER:
      return _objectSpread({}, state, {
        [action.trigger._id]: _objectSpread({}, state[action.trigger._id], {
          account: action.trigger.message.account,
          isRunning: true
        })
      });

    case PURGE_QUEUE:
      return state ? Object.keys(state).reduce((newState, triggerId) => {
        return _objectSpread({}, newState, {
          [triggerId]: _objectSpread({}, newState[triggerId], {
            isEnqueued: false
          })
        });
      }, state) : state;

    case RECEIVE_DELETED_DOCUMENT:
      {
        const {
          data
        } = action.response;
        const {
          _id,
          _type
        } = data[0];

        if (_type === TRIGGERS_DOCTYPE) {
          return lodash_omit__WEBPACK_IMPORTED_MODULE_2___default()(state, _id);
        } else return state;
      }

    default:
      return state;
  }
}; // action creators sync


const enqueueConnection = trigger => ({
  type: ENQUEUE_CONNECTION,
  trigger
});
const purgeQueue = () => ({
  type: PURGE_QUEUE
});
const updateConnectionError = (konnector, account, error) => ({
  type: UPDATE_CONNECTION_ERROR,
  konnector,
  account,
  error
});
const startConnectionCreation = konnector => ({
  type: START_CONNECTION_CREATION,
  konnector
});
const endConnectionCreation = () => ({
  type: END_CONNECTION_CREATION
}); // selectors

const getConnectionsByKonnector = (state, konnectorSlug, validAccounts = [], validKonnectors = []) => {
  const konnectorIsValid = !validKonnectors.length || validKonnectors.includes(konnectorSlug);
  const konnectorHasConnections = state.konnectors[konnectorSlug] && Object.keys(state.konnectors[konnectorSlug].triggers).length;
  if (!konnectorIsValid || !konnectorHasConnections) return [];
  return Object.values(state.konnectors[konnectorSlug].triggers).filter(trigger => validAccounts.includes(trigger.account));
};
const getFirstError = (state, konnectorSlug) => {
  const firstTriggerHavingError = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).find(trigger => !!trigger.error);
  return firstTriggerHavingError ? firstTriggerHavingError.error : null;
};
const getFirstUserError = (state, konnectorSlug) => {
  const firstTriggerHavingUserError = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).find(trigger => Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_4__["isKonnectorUserError"])(trigger.error));
  return firstTriggerHavingUserError ? firstTriggerHavingUserError.error : null;
};
const getLastSyncDate = (state, konnectorSlug) => {
  const lastExecutions = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).map(trigger => trigger.lastSyncDate).sort((dateA, dateB) => {
    const momentA = moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(dateA);
    const momentB = moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(dateB);
    return momentA.isAfter(momentB) ? -1 : momentA.isBefore(momentB) ? 1 : 0;
  });
  return lastExecutions.length && lastExecutions[0];
}; // Map the trigger status to a status compatible with queue

const getTriggerQueueStatus = trigger => {
  if (trigger.isRunning) return 'ongoing';
  if (trigger.hasError) return 'error';
  if (trigger.isConnected) return 'done';
  return 'pending';
};

const getQueue = (state, konnectors) => // state is state.connections
state.konnectors ? Object.keys(state.konnectors).reduce((queuedConnections, konnectorSlug) => {
  const triggers = state.konnectors[konnectorSlug].triggers;
  if (!triggers) return queuedConnections;
  const konnector = konnectors[konnectorSlug];
  return queuedConnections.concat(Object.keys(triggers).reduce((queuedTriggers, triggerId) => {
    if (triggers[triggerId].isEnqueued) {
      const label = konnector.name;
      const status = getTriggerQueueStatus(triggers[triggerId]);
      return queuedTriggers.concat({
        konnector,
        label,
        status,
        triggerId
      });
    }

    return queuedTriggers;
  }, []));
}, []) : [];
const getConnectionError = (state, trigger) => getTriggerState(state, trigger).error;
const getCreatedAccount = state => !!state.creation && state.creation.account;
const getTriggerIdByKonnectorAndAccount = (state, konnector, account, validAccounts = []) => !!konnector && !!account && validAccounts.includes(account._id) && !!state.konnectors[konnector.slug] && Object.keys(state.konnectors[konnector.slug].triggers).find(triggerId => state.konnectors[konnector.slug].triggers[triggerId].account === account._id);
const getTriggerLastSuccess = (state, trigger) => {
  const lastJob = Object(ducks_jobs__WEBPACK_IMPORTED_MODULE_5__["getTriggerLastJob"])(state, trigger);
  const lastJobIsSuccess = lastJob && lastJob.state === 'done';
  if (lastJobIsSuccess) return lastJob.started_at;
  return !!trigger && !!trigger.current_state && trigger.current_state.last_success;
}; // get trigger from state, in state.konnectors[konnectorSlug].triggers[triggerId]

const getTriggerState = (state, trigger) => {
  const konnectorSlug = getTriggerKonnectorSlug(trigger);
  if (!konnectorSlug || !state.konnectors || !state.konnectors[konnectorSlug]) return false;
  const triggers = state.konnectors[konnectorSlug].triggers;
  if (!triggers) return false;
  return !!triggers && !!triggers[trigger._id] && triggers[trigger._id] || {};
};

const isCreatingConnection = state => !!state.creation;
const isConnectionConnected = (state, trigger) => getTriggerState(state, trigger).isConnected;
const isConnectionEnqueued = (state, trigger) => getTriggerState(state, trigger).isEnqueued;
const isConnectionRunning = (state, trigger) => getTriggerState(state, trigger).isRunning;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "5Xzc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorSuccess", function() { return KonnectorSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessImage", function() { return SuccessImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessLinks", function() { return SuccessLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriveLink", function() { return DriveLink; });
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
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("OFL0");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("xweI");
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("buk/");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("4P+e");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var components_DescriptionContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("CB1n");
/* harmony import */ var components_TriggerFolderLink__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("8MA2");
/* harmony import */ var components_BanksLink__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("u5EB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BanksLink", function() { return components_BanksLink__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("vL8P");
/* harmony import */ var assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16__);


















var SuccessImage = function SuccessImage() {
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success-illu-wrapper']
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("img", {
    src: assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16___default.a,
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success-illu']
  }));
};

var SuccessLinks = function SuccessLinks(_ref) {
  var children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success-links'], 'u-mv-half')
  }, children);
};

var DriveLink = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(function (_ref2) {
  var folderId = _ref2.folderId,
      t = _ref2.t;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_TriggerFolderLink__WEBPACK_IMPORTED_MODULE_14__["default"], {
    folderId: folderId,
    label: t('account.success.driveLinkText')
  });
});
var SuccessFooter = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(function (_ref3) {
  var children = _ref3.children;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['coz-form-controls-success']
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-form-success-buttons']
  }, children));
});
var KonnectorSuccess =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(KonnectorSuccess, _Component);

  function KonnectorSuccess() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KonnectorSuccess);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(KonnectorSuccess).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(KonnectorSuccess, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof this.props.handleConnectionSuccess === 'function') {
        this.props.handleConnectionSuccess();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          account = _this$props.account,
          error = _this$props.error,
          title = _this$props.title,
          messages = _this$props.messages;
      var relatedApps = lodash_sortBy__WEBPACK_IMPORTED_MODULE_7___default()(Object.values(KonnectorSuccess.apps).filter(function (app) {
        return app.predicate(_this.props);
      }), function (app) {
        return -app.priority;
      });
      var hasLinks = relatedApps.length > 0;
      return account && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success']
      }, !error && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(SuccessImage, null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_DescriptionContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
        title: !error && title,
        messages: !error && messages
      }, hasLinks && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(SuccessLinks, null, relatedApps.map(function (app, i) {
        return (// Should always pass context, since it's used for customisation
          app.successLink(_this.props, _this.context, i)
        );
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(SuccessFooter, null, relatedApps.length > 0 ? // Should always pass context, since it's used for customisation
      relatedApps[0].footerLink(this.props, this.context) : null));
    }
  }]);

  return KonnectorSuccess;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);
KonnectorSuccess.apps = {
  drive: {
    priority: 1,
    // eslint-disable-next-line react/display-name
    predicate: function predicate(props) {
      var trigger = props.trigger;
      var res = lodash_has__WEBPACK_IMPORTED_MODULE_6___default()(trigger, 'message.folder_to_save');
      return res;
    },
    // eslint-disable-next-line react/display-name
    successLink: function successLink(props, context, i) {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(DriveLink, {
        key: i,
        folderId: props.trigger.message.folder_to_save
      });
    },
    // eslint-disable-next-line react/display-name
    footerLink: function footerLink(props) {
      var t = props.t,
          onDone = props.onDone,
          account = props.account,
          successButtonLabel = props.successButtonLabel;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
        label: successButtonLabel || t('account.success.button'),
        onClick: function onClick(event) {
          event.preventDefault();
          onDone(account);
        }
      });
    }
  },
  banks: {
    priority: 0,
    // eslint-disable-next-line react/display-name
    predicate: function predicate(props) {
      var connector = props.connector;
      return Array.isArray(connector.data_types) && connector.data_types.includes('bankAccounts');
    },
    // eslint-disable-next-line react/display-name
    successLink: function successLink(props, context, i) {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_BanksLink__WEBPACK_IMPORTED_MODULE_15__["default"], {
        key: i,
        banksUrl: context.store.banksUrl
      });
    },
    footerLink: function footerLink() {
      return null;
    }
  }
};
KonnectorSuccess.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object
};
KonnectorSuccess.propTypes = {
  account: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object.isRequired,
  error: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  title: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string.isRequired,
  messages: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string),
  onDone: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  successButtonLabel: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  trigger: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(KonnectorSuccess));

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

module.exports = {"app":{"logo":{"alt":"%{name} logo"},"logout":"Log out"},"date":{"format":"MM/DD/YYYY","placeholder":"mm/dd/yyyy"},"manifest":{"name":"Home","short_description":"Cozy Collect is the application that help you gather all your personal data inside Cozy.","long_description":"With Cozy Collect, you can easily:\n * Downloads documents from all your suppliers\n * Set how often Cozy will collect your bills\n * Access directly to the documents gathered by your Cozy","changes":"You haven't missed it, the Store arrived in your Cozy!\nWe took advantage of it to improve Collect:\n * Store adaptation.\n * Tile merge: when you have several accounts for a single supplier, the former are now merged under the supplier tile.\n * Improvement of some Connectors pages."},"add_service":"Add","fix_konnector_error":"Fix now","magic_folder_path":"/Settings/Home","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Optional)","title":"Connect your %{name} account","data":{"title":"Collected data:","service":{"description":"Service description:"}},"tabs":{"sync":"synchronization","account":"account","data":"collected data"}},"disconnect":{"title":"Disconnection","description":"Your will be disconnected from this account, but imported data will be kept"},"form":{"title":"Account","label":{"firstname":"Firstname","lastname":"Lastname","login":"Login","consumerKey":"Consumer Key","consumerSecret":"Consumer Secret","appKey":"Application Key","appSecret":"Application Secret","tricountUrl":"Tricount URL","cardNumber":"Card Number","dob":"Date of birth","password":"Password","email":"Email","bank_identifier":"Bank identifier (optional)","profileName":"Profile Name","identifier":"Identifier","new_identifier":"Identifier","secret":"Password","answer":"Secret Answer","access_token":"Access token","accessTokenSecret":"Access token secret","apikey":"Api key","phoneNumber":"Phone number","folderPath":"Folder path","namePath":"Folder name","authCode":"Auth code","accountName":"Account name","loginUrl":"Login URL","token":"Token","agreement":"I agree","refreshToken":"Refresh Token","timeout":"Delay (ms)","branchName":"Branch","code":"Confidential code"},"placeholder":{"password":"The password you use to connect to the service","update_password":"Update the password","accountName":"Example: Personal account","namePath":"Example: Camille bills. Default name path is your login."},"button":{"connect":"Connect","cancel":"Cancel","save":"Save","disconnect":"Disconnect this account","delete":"Delete this account","advanced":"Advanced options","synchronize":"Synchronize now"}},"folder":{"title":"Related folder settings","withoutSettings":{"title":"Related folder"},"link":"Open the folder in Cozy Drive","changePath":"change the path","error":"Oops, something went wrong. Don't panic, your files are still there, please try again later","close":"close","warning":"You're changing your folder path","oldFiles":"All your olds bills will be moved in your new path.","newFiles":"Your news bills will be downloaded in your new path.","newPath":"Everything went well, the new path for your %{name} account is:","placeholder":{"administrative":"Administrative","photos":"Photos"}},"success":{"title":{"connect":"Successful configuration!","update":"Your %{name} account is updated!"},"banksLinkText":"See my accounts in %{appName}","driveLinkText":"Open the folder in Cozy Drive","button":"Close"},"message":{"folder":{"title":"Folder","link":"Open folder on cozy drive"},"success":{"connect":"Your data will be available in your Cozy in a few minutes and the next ones will follow automatically.","update":"Your %{name} account has been updated successfully.","delete":"Account removed succesfully."},"syncing":{"bill":"Your bills are syncing and will be available in the following path:"},"synced":{"title":"Your data synchronization","cron":"Synchronization frequency: %{frequency}","cron_hourly":"each hour","cron_daily":"once a day","cron_weekly":"once a week","cron_monthly":"once a month","cron_undefined":"manually","syncing":"running…","unknown":"unknown","last_sync":"Last synchronization: **%{date}**","date_format":"MMMM D[,] YYYY [at] HH[:]mm","bill":"Find your datas in the Drive app at this location:"},"error":{"server":"Apologies, our server had an hiccup, do you mind starting again?","bad_credentials":"Sorry, you entered an incorrect login or password.","delete":"Apologies, our server had an hiccup, do you mind starting again?"}},"forceConnection":"Run again now","editor_detail":"Service developed by %{editor}"},"account_picker":{"add_account_button":{"label":"Add an account"}},"apps":{"title":"My apps"},"connection":{"CTA":{"twofa_failed":"Run again now"},"error":{"default":{"title":"An error occured","description":"Unfortunately, something went wrong when trying to connect to %{name}. Please check again your account informations, visit our online help or contact us at contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Cozy Storage full","description":"This service cannot fetch your documents now. Please remove some files or go to **Settings > Storage** to get more free space."},"CHALLENGE_ASKED":{"title":"Challenge required","description":"It seems that the website requires a second authentification factor that we don’t support yet. You may try to settle the issue on the [%{name}](%{link}) website before a retry."},"LOGIN_FAILED":{"title":"Bad credentials","description":"Bad credentials. Check the konnector fields and run the connection again."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Needs secret","description":"An additional field must be filled in before checking your credentials."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporarily blocked","description":"Too many attempts occured. Please update your credentials on [%{name}](%{link}) website and update the konnector later on."},"MAINTENANCE":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable or the konnector must be updated. Please rerun the connector later or visit our online help."},"NOT_EXISTING_DIRECTORY":{"title":"Missing destination folder","description":"It seems that this account's destination folder has been deleted. Please restore it by disconnecting this account and then reconnect again."},"UNKNOWN_ERROR":{"title":"Connection error","description":"An unknown error has occurred."},"USER_ACTION_NEEDED":{"title":"Action needed on the provider","description":"It seems that the [%{name}](%{link}) website requires you to log in and to do a specific action. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Access refresh required","description":"The [%{name}](%{link}) service requires you to allow your access again. Please disconnect and reconnect your account %{name} to this application. No data will be lost."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Unavailable account","description":"It seems that your account is no longer active. Please check your account on [%{name}](%{link}) before retry."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Password update required","description":"It seems that the [%{name}](%{link}) website requires you to log in and update your password. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"New permissions validation needed","description":"You connector was updated and the permissions changed. Please validate them before launching the connector again."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relaunch the connexion to the service to fetch your data","description":"The last connexion to the service failed; please launch it again. You may have to provide a validation code."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Wrong two-factore code provided","description":"The two-factor code provided is wrong, please start again."},"VENDOR_DOWN":{"title":"Unavailable service","description":"It seems that the [%{name}](%{link}) service is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.BANK_DOWN":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Unavailable service","description":"It seems that we are experiencing overload with our bank konnectors at the moment. Please rerun the connector later."}}},"intent":{"konnector":{"install":{"error":{"message":"The konnector cannot be installed"}}},"service":{"return":"Back to connectors list","success":{"button":{"label":"Close"}},"error":{"initialization":"Service failed to initialize. Sorry for the inconvenience.","creation":"Unable to create account, an error occurred.","cause":"Cause: %{error}"},"cancel":"Cancel","terminate":"Terminate"}},"field":{"password":{"visibility":{"hide":"Hide","show":"Show","title":{"hide":"Hide password","show":"Show password"}}}},"nav":{"services":"My services"},"category":{"all":"All","banking":"Banks","health":"Health","insurance":"Insurance","transport":"Transportation","social":"Social","isp":"ISP","telecom":"Telecom","energy":"Energy","host_provider":"Host","productivity":"Productivity","shopping":"Shopping","public_service":"Public Services","other":"Others"},"loading":{"initial":"Loading accounts...","working":"Loading"},"validation":{"exact_length":"It's must be made up of %{length} characters exactly.","max_length":"The length maximum is %{length} characters.","min_length":"It should contain at least %{length} characters.","pattern":"The value must match a specific pattern: %{pattern}"},"update":{"title":"An update is available for this service.","regular":"Perform this update to keep fetching your data and to have the latest features","blocking":"Update it to keep fetching your data","CTA":"Update"},"error":{"initial":"Something went wrong when fetching your connectors and informations. Please refresh the page.","LOGIN_FAILED":"Bad credentials. Check the konnector fields and run the connection again.","UNKNOWN_ERROR":"Something unexpected happened while running the connector","JOB_TIMEOUT":"The connector execution was too long","button":{"reload":"Refresh now"}},"tutorial":{"cozy_collect":{"title":"Automate your data gathering","text":"They will be stored in your Cozy, you won't have to look for them anymore.","button":"Next"},"home":{"apps":{"button":"Next","text":"Easily manage your digital life (files, pictures, bank accounts, ...)","title":"Access to all your Cozy applications"},"services":{"button":"Let's configure my accounts","text":"They will be stored in your Cozy, you won't have to look for them anymore.","title":"Automate your data gathering"}},"menu_apps":{"title":"Your Cozy is so much more than a simple data aggregator","text":"Open the Applications menu to discover all the features your Cozy has to offer.","button":"Discover my Apps"}},"maintenance":{"icon":"This connector is under maintenance","service":"Service interrupted","problem":"%{konnectorName} doesn't allow your Cozy to access your data","title":"What is going on ?"},"connector":{"debug":{"successMessage":"This konnector is for debug purpose only, this is an additionnal custom success message."},"empty":{"title":"Start gathering your data!","text":"Synchronise your brands with your Cozy to automatically retrieve your data (bills, reimbursements, expenses…)"},"silenced":"%{name} won't be suggested anymore. You can always find a provider by clicking the \"Add\" button.","noAccount":"No account","add":"Add a service","update":"Update available","logo":{"alt":"%{name} logo"},"enedis":{"description":{"service":"Recover your Linky data by connecting your Enedis account. You must have a Linky meter and have first created your Enedis account (on the [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). This connector is provided by Fing for the MesInfos project. It retrieves the data from your electricity contract and downloads your electricity consumption the day before. This connector is running on your Cozy and the Fing will have no access to this data."}},"orange":{"message":{"delay":"Once connected, a demand to extract your data will be sent to Orange information system. These data will be available within 15 days. You data will be updated automatically, every 15 days."}},"orangemobile":{"description":{"connector":"In the context of 'MesInfos', Orange allows you to localize your phone regularly.\n\n**Data collection needs your express agreement**\n\nThis agreement may be revoked at any time by this data connector.\n\nBy clicking on \"Agree\", you give your consent to collect your phone's position, every 30 minutes. Information gathered will on be : \n<ul><li>Date and time of this location.</li><li>Location data of the closest radio antenna at the time of collect.</li></ul>Collected data by Orange after you agreement will be available only in your Cozy that you have been assigned in context of  « Mes Infos ». They will be added to location data already stored in call logs.","service":"This connector will download data from your Orange account on your Cozy. It will automatically download the call logs from your phone. Thus call logs include your phone number, your corresponding's phone number, date and time of this call and location data of the closest radio antenna at the time of collect.\n\nYou will be able to use these data in different apps in your Cozy, for example \"Mapping My Life\" (available soon on the Cozy Store).","field":{"agreement":"Do you agree that Orange localizes regularly your phone in context of  « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"This connector will download data from your Orange account on your Cozy. It will automatically download the list of movies you downloaded in free (TV Replay) or paid VOD from 01/01/2015 (adult contents are not included).\n\nYou will be able to use these data in different apps in your Cozy, for example \"My Movies Music\" (available soon on the Cozy Store)."}},"axabanque102":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo).","connector":"The secret answer is [asked by HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) when you connect without double authentication. Example: what is the name of your pet?"}},"ingdirect95":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Syncing accounts:","header_mobile":"%{done} of %{total}","header_done":"Synced %{done} out of %{total}","item":{"pending":"Pending"},"close":"Close"},"services":{"title":"My services"},"status":{"interrupted":"INTERRUPTED SERVICE","edf":{"maintenance":"EDF's information system has changed and the related data access doesn't work anymore. This konnector is not currently able to get back your data from EDF. We are trying to restore the situation and we will notice you when it will be fixed. [Learn more](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"MMM DD"}}}};

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
const ERROR_TYPES = {
  CHALLENGE_ASKED: 'CHALLENGE_ASKED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  MAINTENANCE: 'MAINTENANCE',
  NOT_EXISTING_DIRECTORY: 'NOT_EXISTING_DIRECTORY',
  USER_ACTION_NEEDED: 'USER_ACTION_NEEDED',
  VENDOR_DOWN: 'VENDOR_DOWN',
  DISK_QUOTA_EXCEEDED: 'DISK_QUOTA_EXCEEDED'
};
const UPDATE_NEEDED_ERRORS_TYPES = {
  TERMS_VERSION_MISMATCH: 'TERMS_VERSION_MISMATCH'
};
const TWO_FA_ERRORS = ['USER_ACTION_NEEDED.TWOFA_EXPIRED', 'USER_ACTION_NEEDED.WRONG_TWOFA_CODE'];

function patchFolderPermission(cozy, konnector, folderId = null) {
  const slug = konnector.attributes ? konnector.attributes.slug : konnector.slug;
  const saveFolder = folderId ? {
    type: 'io.cozy.files',
    values: [folderId]
  } : {};
  return cozy.fetchJSON('PATCH', `/permissions/konnectors/${encodeURIComponent(slug)}`, {
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

const checkLocale = (t, key) => {
  return t(key) !== key;
};

const hasPendingUpdate = konnector => {
  return !!konnector.available_version;
};
const getMostAccurateErrorKey = (t, error, getKey = key => key) => {
  // Legacy. Kind of.
  if (!error.code) return error.message;
  const errorSegments = error.code.split('.');
  let tested = errorSegments;
  let fullKey = getKey(tested.join('.'));

  while (tested.length && !checkLocale(t, fullKey)) {
    tested = tested.slice(0, tested.length - 1);
    fullKey = getKey(tested.join('.'));
  }

  return tested.length ? fullKey : getKey('UNKNOWN_ERROR');
};
const legacyMessages = {
  terms: 'connector'
};
const getKonnectorMessage = (t, konnector, message) => {
  const {
    messages,
    hasDescriptions
  } = konnector;
  const providesMessage = messages && messages.length && messages.includes(message);
  if (providesMessage) return t(`${konnector.slug}.messages.${message}`);
  const providesLegacyMessage = hasDescriptions && hasDescriptions[legacyMessages[message] || message];
  if (providesLegacyMessage) return t(`connector.${konnector.slug}.description.${legacyMessages[message] || message}`);
  return null;
};

/***/ }),

/***/ "8EAv":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"spin":"spin--1tM1P","shake":"shake--2XjZi"};

/***/ }),

/***/ "8MA2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggerFolderLink", function() { return TriggerFolderLink; });
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
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("y6ex");
/* harmony import */ var ducks_apps__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("/n/j");
/* harmony import */ var styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("ONtV");
/* harmony import */ var styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13__);














/**
 * Renders a link only if href prop is provided
 */

var MaybeLink =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(MaybeLink, _PureComponent);

  function MaybeLink() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MaybeLink);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(MaybeLink).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(MaybeLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          href = _this$props.href;
      return href ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
        className: className,
        href: href,
        target: "_parent"
      }, this.props.children) : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
        className: className
      }, this.props.children);
    }
  }]);

  return MaybeLink;
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);

var TriggerFolderLink =
/*#__PURE__*/
function (_PureComponent2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(TriggerFolderLink, _PureComponent2);

  function TriggerFolderLink() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, TriggerFolderLink);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(TriggerFolderLink).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(TriggerFolderLink, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this$props2, client, driveApp, receiveApps, _ref, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, client = _this$props2.client, driveApp = _this$props2.driveApp, receiveApps = _this$props2.receiveApps;

                if (driveApp) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return client.query(Object(cozy_client__WEBPACK_IMPORTED_MODULE_10__["Q"])('io.cozy.apps'));

              case 4:
                _ref = _context.sent;
                data = _ref.data;
                receiveApps(data);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          driveApp = _this$props3.driveApp,
          label = _this$props3.label,
          folderId = _this$props3.folderId;
      var disabled = !driveApp;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(MaybeLink, {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13___default.a['col-trigger-folder-link'], {
          'u-silver': disabled,
          'u-c-not-allowed': disabled
        }),
        href: driveApp && "".concat(driveApp.links.related, "#/files/").concat(folderId)
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "u-mr-half",
        icon: "openwith"
      }), label);
    }
  }]);

  return TriggerFolderLink;
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    driveApp: Object(ducks_apps__WEBPACK_IMPORTED_MODULE_12__["getApp"])(state.apps, 'drive')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    receiveApps: function receiveApps(apps) {
      return dispatch(Object(ducks_apps__WEBPACK_IMPORTED_MODULE_12__["receiveApps"])(apps));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps, mapDispatchToProps)(Object(cozy_client__WEBPACK_IMPORTED_MODULE_10__["withClient"])(TriggerFolderLink)));

/***/ }),

/***/ "91CF":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"maintenance-intro":"maintenance-intro--1-SbJ","maintenance-service":"maintenance-service--1ZZfz","maintenance-icon":"maintenance-icon--2QHy-"};

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
const hasCordovaPlugin = () => {
  return window.cordova !== undefined && window.cordova.InAppBrowser !== undefined;
};

const REGISTRATION_ABORT = 'REGISTRATION_ABORT';
const authenticateWithCordova = url => {
  if (hasCordovaPlugin()) {
    return new Promise((resolve, reject) => {
      const target = '_blank';
      const options = 'clearcache=yes,zoom=no';
      const inAppBrowser = window.cordova.InAppBrowser.open(url, target, options);

      const removeListener = () => {
        inAppBrowser.removeEventListener('loadstart', onLoadStart);
        inAppBrowser.removeEventListener('exit', onExit);
      };

      const onLoadStart = ({
        url
      }) => {
        const accessCode = /\?access_code=(.+)$/.test(url);
        const state = /\?state=(.+)$/.test(url);

        if (accessCode || state) {
          resolve(url);
          removeListener();
          inAppBrowser.close();
        }
      };

      const onExit = () => {
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
    return new Promise(resolve => {
      setTimeout(() => {
        const token = prompt('Paste the url here:');
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

/***/ "CB1n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescriptionContent", function() { return DescriptionContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4DAK");
/* harmony import */ var styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("N0Cd");
/* harmony import */ var styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3__);




var DescriptionContent = function DescriptionContent(_ref) {
  var cssClassesObject = _ref.cssClassesObject,
      title = _ref.title,
      messages = _ref.messages,
      children = _ref.children,
      hasError = _ref.hasError,
      centerTitle = _ref.centerTitle;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(cssClassesObject)
  }, title && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
    className: centerTitle ? styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default.a['col-account-description-title-centered'] : styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default.a['col-account-description-title']
  }, title), messages && messages.length > 0 && messages.map(function (m, i) {
    return m ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: i,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default.a['col-account-description-message'], hasError && 'errors')
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
      source: m
    })) : null;
  }), children);
};
/* harmony default export */ __webpack_exports__["default"] = (DescriptionContent);

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
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fvjX");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("oMPT");
/* harmony import */ var _slices_sharings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("og8P");
/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("skrj");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const APPS_DOCTYPE = 'io.cozy.apps';
const FETCH_DOCUMENT = 'FETCH_DOCUMENT';
const FETCH_COLLECTION = 'FETCH_COLLECTION';
const LAUNCH_TRIGGER = 'LAUNCH_TRIGGER';
const RECEIVE_DATA = 'RECEIVE_DATA';
const RECEIVE_ERROR = 'RECEIVE_ERROR';
const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
const RECEIVE_APP = 'RECEIVE_APP';
const RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT';
const RECEIVE_UPDATED_DOCUMENT = 'RECEIVE_UPDATED_DOCUMENT';
const RECEIVE_DELETED_DOCUMENT = 'RECEIVE_DELETED_DOCUMENT';
const FETCH_REFERENCED_FILES = 'FETCH_REFERENCED_FILES';
const ADD_REFERENCED_FILES = 'ADD_REFERENCED_FILES';
const REMOVE_REFERENCED_FILES = 'REMOVE_REFERENCED_FILES';

const documents = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_APP:
      {
        const apps = action.response && action.response.data;
        if (apps.length === 0) return state;
        return _objectSpread({}, state, {
          [APPS_DOCTYPE]: _objectSpread({}, state[APPS_DOCTYPE], objectifyDocumentsArray(apps))
        });
      }

    case RECEIVE_DATA:
      {
        const {
          data
        } = action.response;
        if (data.length === 0) return state;
        const dataDoctype = getArrayDoctype(data);
        return _objectSpread({}, state, {
          [dataDoctype]: _objectSpread({}, state[dataDoctype], objectifyDocumentsArray(data))
        });
      }

    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_UPDATED_DOCUMENT:
      {
        const doc = action.response.data[0];
        return _objectSpread({}, state, {
          [doc._type]: _objectSpread({}, state[doc._type], {
            [doc.id]: doc
          })
        });
      }

    case RECEIVE_DELETED_DOCUMENT:
      {
        const deleted = action.response.data[0];
        return _objectSpread({}, state, {
          [deleted._type]: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["removeObjectProperty"])(state[deleted._type], deleted.id)
        });
      }

    case ADD_REFERENCED_FILES:
      return _objectSpread({}, state, {
        'io.cozy.files': _objectSpread({}, state['io.cozy.files'], updateFilesReferences(state['io.cozy.files'], action.ids, action.document))
      });

    case REMOVE_REFERENCED_FILES:
      return _objectSpread({}, state, {
        'io.cozy.files': _objectSpread({}, state['io.cozy.files'], removeFilesReferences(state['io.cozy.files'], action.ids, action.document))
      });

    default:
      return state;
  }
};

const objectifyDocumentsArray = documents => documents.reduce((obj, doc) => _objectSpread({}, obj, {
  [doc.id]: doc
}), {});

const updateFileReference = (
/* eslint-disable-next-line casecamelcase */
_ref, doc) => {
  let {
    relationships: {
      referenced_by
    }
  } = _ref,
      relationships = _objectWithoutProperties(_ref.relationships, ["referenced_by"]),
      file = _objectWithoutProperties(_ref, ["relationships"]);

  return _objectSpread({}, file, {
    relationships: _objectSpread({}, relationships, {
      /* eslint-disable-next-line casecamelcase */
      [referenced_by.data]:
      /* eslint-disable-next-line casecamelcase */
      referenced_by.data === null ? [{
        id: doc.id,
        type: doc.type
      }] :
      /* eslint-disable-next-line casecamelcase */
      [...referenced_by.data, {
        id: doc.id,
        type: doc.type
      }]
    })
  });
};

const updateFilesReferences = (files, newlyReferencedIds, doc) => newlyReferencedIds.reduce((updated, id) => _objectSpread({}, updated, {
  [id]: updateFileReference(files[id], doc)
}), {});

const removeFileReferences = (
/* eslint-disable-next-line casecamelcase */
_ref2, doc) => {
  let {
    relationships: {
      referenced_by
    }
  } = _ref2,
      relationships = _objectWithoutProperties(_ref2.relationships, ["referenced_by"]),
      file = _objectWithoutProperties(_ref2, ["relationships"]);

  return _objectSpread({}, file, {
    relationships: _objectSpread({}, relationships, {
      /* eslint-disable-next-line casecamelcase */
      [referenced_by.data]: referenced_by.data.filter(rel => rel.type !== doc.type && rel.id !== doc.id)
    })
  });
};

const removeFilesReferences = (files, removedIds, doc) => removedIds.reduce((updated, id) => _objectSpread({}, updated, {
  [id]: removeFileReferences(files[id], doc)
}), {});

const getDoctype = ({
  _type: doctype
}) => {
  // TODO: don't know why the stack returns 'file' here..
  if (doctype === 'file') {
    return 'io.cozy.files';
  }

  return doctype;
};

const getArrayDoctype = documents => getDoctype(documents[0]); // collection reducers


const collectionInitialState = {
  type: null,
  options: {},
  fetchStatus: 'pending',
  lastFetch: null,
  hasMore: false,
  count: 0,
  ids: []
};

const collection = (state = collectionInitialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
      return _objectSpread({}, state, {
        type: action.doctype || 'io.cozy.files',
        options: action.options,
        fetchStatus: action.skip > 0 ? 'loadingMore' : 'loading'
      });

    case RECEIVE_APP:
    case RECEIVE_DATA:
      {
        const response = action.response;
        return _objectSpread({}, state, {
          fetchStatus: 'loaded',
          lastFetch: Date.now(),
          hasMore: response.next !== undefined ? response.next : state.hasMore,
          count: response.meta && response.meta.count ? response.meta.count : response.data.length,
          ids: !action.skip ? response.data.map(doc => doc.id) : [...state.ids, ...response.data.map(doc => doc.id)]
        });
      }

    case ADD_REFERENCED_FILES:
      return _objectSpread({}, state, {
        type: 'io.cozy.files',
        count: state.count + action.ids.length,
        ids: [...state.ids, ...action.ids]
      });

    case REMOVE_REFERENCED_FILES:
      return _objectSpread({}, state, {
        count: state.count - action.ids.length,
        ids: state.ids.filter(id => action.ids.indexOf(id) === -1)
      });

    case RECEIVE_ERROR:
      return _objectSpread({}, state, {
        fetchStatus: 'failed'
      });

    case RECEIVE_NEW_DOCUMENT:
      return _objectSpread({}, state, {
        ids: [...state.ids, action.response.data[0].id]
      });

    case RECEIVE_DELETED_DOCUMENT:
      return _objectSpread({}, state, {
        ids: state.ids.filter(id => id !== action.response.data[0].id)
      });

    default:
      return state;
  }
};

const collections = (state = {}, action) => {
  const applyUpdate = (collections, updateAction) => updateAction.updateCollections.reduce((updated, name) => _objectSpread({}, updated, {
    [name]: collection(collections[name], action)
  }), {});

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

      return _objectSpread({}, state, {
        [action.collection]: collection(state[action.collection], action)
      });

    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_DELETED_DOCUMENT:
      if (!action.updateCollections) {
        return state;
      }

      return _objectSpread({}, state, applyUpdate(state, action));

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  collections,
  documents,
  sharings: _slices_sharings__WEBPACK_IMPORTED_MODULE_2__["default"],
  synchronization: _slices_synchronization__WEBPACK_IMPORTED_MODULE_3__["default"]
}));
const fetchApps = (name, options = {}, skip = 0) => ({
  types: [FETCH_COLLECTION, RECEIVE_APP, RECEIVE_ERROR],
  collection: name,
  doctype: 'io.cozy.apps',
  options,
  skip,
  promise: client => client.fetchApps(name, options, skip)
});
const fetchCollection = (name, doctype, options = {}, skip = 0) => ({
  types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
  collection: name,
  doctype,
  options,
  skip,
  promise: client => client.fetchCollection(name, doctype, options, skip)
});
const fetchDocument = (doctype, id, options = {}) => ({
  types: [FETCH_DOCUMENT, RECEIVE_DATA, RECEIVE_ERROR],
  doctype,
  id,
  options,
  promise: client => client.fetchDocument(doctype, id)
});
const fetchReferencedFiles = (doc, skip = 0) => ({
  types: [FETCH_REFERENCED_FILES, RECEIVE_DATA, RECEIVE_ERROR],
  collection: `${doc._type}/${doc.id}#files`,
  document: doc,
  options: {},
  skip,
  promise: client => client.fetchReferencedFiles(doc, skip)
});
const fetchTriggers = (name, worker, options = {}, skip = 0) => ({
  types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
  collection: name,
  doctype: 'io.cozy.triggers',
  options,
  skip,
  promise: client => client.fetchTriggers(name, worker, options, skip)
});
const fetchKonnectors = (name, options = {}, skip = 0) => ({
  types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
  collection: name,
  doctype: 'io.cozy.konnectors',
  options,
  skip,
  promise: client => client.fetchKonnectors(name, options, skip)
});
const createDocument = (doctype, doc, actionOptions = {}) => _objectSpread({
  types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
  doctype,
  document: doc,
  promise: client => client.createDocument(doctype, doc)
}, actionOptions);
const createTrigger = (doc, actionOptions = {}) => _objectSpread({
  types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
  document: doc,
  promise: client => client.createTrigger(doc)
}, actionOptions);
const launchTrigger = (trigger, actionOptions = {}) => _objectSpread({
  types: [LAUNCH_TRIGGER, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
  trigger: trigger,
  promise: client => client.launchTrigger(trigger)
}, actionOptions);
const updateDocument = (doc, actionOptions = {}) => _objectSpread({
  types: [UPDATE_DOCUMENT, RECEIVE_UPDATED_DOCUMENT, RECEIVE_ERROR],
  document: doc,
  promise: client => client.updateDocument(doc)
}, actionOptions);
const deleteDocument = (doc, actionOptions = {}) => _objectSpread({
  types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
  document: doc,
  promise: client => client.deleteDocument(doc)
}, actionOptions);
const deleteTrigger = (doc, actionOptions = {}) => _objectSpread({
  types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
  document: doc,
  promise: client => client.deleteTrigger(doc)
}, actionOptions);
const createFile = (file, dirID, actionOptions = {}) => _objectSpread({
  types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
  doctype: 'io.cozy.files',
  promise: client => client.createFile(file, dirID)
}, actionOptions);
const trashFile = (file, actionOptions = {}) => _objectSpread({
  types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
  document: file,
  promise: client => client.trashFile(file)
}, actionOptions);
const addReferencedFiles = (doc, ids) => ({
  type: ADD_REFERENCED_FILES,
  collection: `${doc._type}/${doc._id}#files`,
  document: doc,
  ids,
  promise: client => client.addReferencedFiles(doc, ids)
});
const removeReferencedFiles = (doc, ids) => ({
  type: REMOVE_REFERENCED_FILES,
  collection: `${doc._type}/${doc._id}#files`,
  document: doc,
  ids,
  promise: client => client.removeReferencedFiles(doc, ids)
});
const makeActionCreator = promise => ({
  promise
});
const makeFetchMoreAction = ({
  types,
  collection,
  document,
  doctype,
  options
}, skip) => types[0] === FETCH_REFERENCED_FILES ? fetchReferencedFiles(document, skip) : fetchCollection(collection, doctype, options, skip);
const applySelectorForAction = (state, action) => {
  switch (action.types[0]) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
      return getCollection(state, action.collection);

    case FETCH_DOCUMENT:
      return getDocument(state, action.doctype, action.id);

    case _slices_sharings__WEBPACK_IMPORTED_MODULE_2__["FETCH_SHARINGS"]:
      return action.id ? Object(_slices_sharings__WEBPACK_IMPORTED_MODULE_2__["getSharingDetails"])(state, action.doctype, action.id, action.options) : Object(_slices_sharings__WEBPACK_IMPORTED_MODULE_2__["getSharings"])(state, action.doctype, action.options);

    default:
      return null;
  }
};
const enhancePropsForActions = (props, fetchActions, dispatch) => Object(_utils__WEBPACK_IMPORTED_MODULE_1__["mapValues"])(fetchActions, (action, propName) => {
  const dataObject = props[propName];

  switch (action.types[0]) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
      return _objectSpread({}, dataObject, {
        fetchMore: dataObject.hasMore ? () => dispatch(makeFetchMoreAction(action, dataObject.data.length)) : null
      });

    default:
      return dataObject;
  }
}); // selectors

const mapDocumentsToIds = (documents, doctype, ids) => ids.map(id => documents[doctype][id]);

const getCollection = (state, name) => {
  const collection = state.cozy.collections[name];

  if (!collection) {
    return _objectSpread({}, collectionInitialState, {
      data: null
    });
  }

  return _objectSpread({}, collection, {
    data: mapDocumentsToIds(state.cozy.documents, collection.type, collection.ids)
  });
};
const getDocument = (state, doctype, id) => {
  const documents = state.cozy.documents[doctype];

  if (!documents) {
    return null;
  }

  return documents[id];
};
const isCollectionFetched = (state, name) => state.cozy.collections[name] && state.cozy.collections[name].fetchStatus === 'loaded';

/***/ }),

/***/ "GfxC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadArchive", function() { return downloadArchive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return downloadFile; });
/* global cozy */
const slugify = text => text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
.replace(/[^\w-]+/g, '') // Remove all non-word chars
.replace(/--+/g, '-') // Replace multiple - with single -
.replace(/^-+/, '') // Trim - from start of text
.replace(/-+$/, ''); // Trim - from end of text


const forceFileDownload = (href, filename) => {
  const element = document.createElement('a');
  element.setAttribute('href', href);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}; // async helpers: they interact with the stack but not with the store


const downloadArchive = async (notSecureFilename, fileIds) => {
  const filename = slugify(notSecureFilename);
  const href = await cozy.client.files.getArchiveLinkByIds(fileIds, filename);
  const fullpath = await cozy.client.fullpath(href);
  forceFileDownload(fullpath, filename + '.zip');
};
const downloadFile = async file => {
  const response = await cozy.client.files.downloadById(file.id);
  const blob = await response.blob();
  forceFileDownload(window.URL.createObjectURL(blob), file.name);
};

/***/ }),

/***/ "Go3M":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("buk/");
/* harmony import */ var containers_AccountConnection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("wiYS");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("4YEU");
/* harmony import */ var reducers_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("cokx");















var CreateAccountService =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(CreateAccountService, _React$Component);

  function CreateAccountService(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CreateAccountService);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CreateAccountService).call(this, props, context));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onSuccess", function (account) {
      _this.props.endCreation();

      _this.props.onSuccess(account);
    });

    _this.props.startCreation(_this.props.konnector);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CreateAccountService, [{
    key: "render",
    value: function render() {
      var t = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "coz-service-content"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(containers_AccountConnection__WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        onDone: this.onSuccess,
        successButtonLabel: t('intent.service.success.button.label')
      }, this.props)));
    }
  }]);

  return CreateAccountService;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  // infos from route parameters
  var konnector = ownProps.konnector;
  var createdAccount = Object(reducers_index__WEBPACK_IMPORTED_MODULE_13__["getCreatedConnectionAccount"])(state);
  var trigger = Object(reducers_index__WEBPACK_IMPORTED_MODULE_13__["getTriggerByKonnectorAndAccount"])(state, konnector, createdAccount);
  return {
    createdAccount: createdAccount,
    isCreating: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["isCreatingConnection"])(state.connections),
    isRunning: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["isConnectionRunning"])(state.connections, trigger),
    trigger: trigger
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    startCreation: function startCreation() {
      return dispatch(Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["startConnectionCreation"])(ownProps.konnector));
    },
    endCreation: function endCreation() {
      return dispatch(Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["endConnectionCreation"])());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps, mapDispatchToProps)(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__["translate"])()(CreateAccountService)));

/***/ }),

/***/ "K4zY":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"col-account-connection-content":"col-account-connection-content--Jta1z","col-account-connection-fetching":"col-account-connection-fetching--3rtXV","col-account-connection-security":"col-account-connection-security--1I2Yb","col-account-connection-editor":"col-account-connection-editor--1sA6J"};

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
/* harmony import */ var lib_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("WWPq");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("oBqo");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cozy_realtime__WEBPACK_IMPORTED_MODULE_1__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global cozy */


const CONNECTION_STATUS = {
  ERRORED: 'errored',
  RUNNING: 'running',
  CONNECTED: 'connected'
};
const ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
const JOBS_DOCTYPE = 'io.cozy.jobs';
const TRIGGERS_DOCTYPE = 'io.cozy.triggers';

const normalize = (dbObject, doctype) => {
  return _objectSpread({}, dbObject, dbObject.attributes, {
    id: dbObject._id,
    _type: doctype || dbObject._type
  });
};

class CollectStore {
  constructor(context, client, options = {}) {
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

  initializeRealtime() {
    this.realtime = new cozy_realtime__WEBPACK_IMPORTED_MODULE_1___default.a({
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

  async onAccountCreated(account) {
    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: {
        data: [normalize(account, ACCOUNTS_DOCTYPE)]
      },
      updateCollections: ['accounts']
    });
  }

  async onAccountUpdated(account) {
    this.dispatch({
      type: 'RECEIVE_UPDATED_DOCUMENT',
      response: {
        data: [normalize(account, ACCOUNTS_DOCTYPE)]
      },
      updateCollections: ['accounts']
    });
  }

  async onAccountDeleted(account) {
    this.dispatch({
      type: 'RECEIVE_DELETED_DOCUMENT',
      response: {
        data: [normalize(account, ACCOUNTS_DOCTYPE)]
      },
      updateCollections: ['accounts']
    });
  }

  async onTriggerCreated(trigger) {
    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: {
        data: [normalize(trigger, TRIGGERS_DOCTYPE)]
      },
      updateCollections: ['triggers']
    });
  }

  async onTriggerUpdated(trigger) {
    this.dispatch({
      type: 'RECEIVE_UPDATED_DOCUMENT',
      response: {
        data: [normalize(trigger, TRIGGERS_DOCTYPE)]
      },
      updateCollections: ['triggers']
    });
  }

  async onTriggerDeleted(trigger) {
    this.dispatch({
      type: 'RECEIVE_DELETED_DOCUMENT',
      response: {
        data: [normalize(trigger, TRIGGERS_DOCTYPE)]
      },
      updateCollections: ['triggers']
    });
  }

  async updateUnfinishedJob(job) {
    const normalizedJob = normalize(job, JOBS_DOCTYPE); // TODO Filter by worker on the WebSocket when it will be available in the
    // stack

    const isKonnectorJob = normalizedJob.worker === 'konnector';
    const isDeletedAccountHookJob = !!normalizedJob.account_deleted;
    const isKonnectorJobWithoutTrigger = !normalizedJob.trigger_id;

    if (!isKonnectorJob || isDeletedAccountHookJob || isKonnectorJobWithoutTrigger) {
      return;
    }

    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: {
        data: [normalizedJob]
      },
      updateCollections: ['jobs']
    });
    const trigger = await lib_triggers__WEBPACK_IMPORTED_MODULE_0__["fetch"](cozy.client, normalizedJob.trigger_id);
    this.onTriggerUpdated(trigger);
  }

  createIntentService(intent, window) {
    return cozy.client.intents.createService(intent, window);
  } // Get the drive and banks application url using the list of application


  fetchUrls() {
    return cozy.client.fetchJSON('GET', '/apps/').then(body => {
      body.forEach(item => {
        if (!item.attributes || !item.attributes.slug || !item.links) return;

        switch (item.attributes.slug) {
          case 'banks':
            this.banksUrl = `${item.links.related}`;
            break;

          default:
            break;
        }
      });
    }).catch(err => {
      // eslint-disable-next-line no-console
      console.warn(err.message);
      return false;
    });
  }

}

/***/ }),

/***/ "Lo76":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4DAK");
/* harmony import */ var styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("91CF");
/* harmony import */ var styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3__);





var KonnectorMaintenance = function KonnectorMaintenance(_ref) {
  var t = _ref.t,
      maintenance = _ref.maintenance,
      lang = _ref.lang,
      konnectorName = _ref.konnectorName;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-intro']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-icon']
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-service']
  }, t('maintenance.service')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-problem']
  }, t('maintenance.problem', {
    konnectorName: konnectorName
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-title']
  }, t('maintenance.title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-message'],
    source: maintenance.message[lang] || maintenance.message['en']
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(KonnectorMaintenance));

/***/ }),

/***/ "N0Cd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"col-account-description-title":"col-account-description-title--vVTHU","col-account-description-title-centered":"col-account-description-title-centered--32S1O","col-account-description-message":"col-account-description-message--ZyZtK"};

/***/ }),

/***/ "ONtV":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"col-trigger-folder":"col-trigger-folder--3s1fX","col-trigger-folder-link":"col-trigger-folder-link--2Fkdb"};

/***/ }),

/***/ "OiML":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyClient; });
/* harmony import */ var _DataAccessFacade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("+tca");
/* harmony import */ var _authentication_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("AEoj");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* global cozy */


const APPS_DOCTYPE = 'io.cozy.apps';
const FILES_DOCTYPE = 'io.cozy.files';
const TRIGGERS_DOCTYPE = 'io.cozy.triggers';
const KONNECTORS_DOCTYPE = 'io.cozy.konnectors';
const SHARINGS_DOCTYPE = 'io.cozy.sharings';
class CozyClient {
  constructor(config) {
    const {
      cozyURL
    } = config,
          options = _objectWithoutProperties(config, ["cozyURL"]);

    this.options = options;
    this.indexes = {};
    this.specialDirectories = {};
    this.facade = new _DataAccessFacade__WEBPACK_IMPORTED_MODULE_0__["default"]();

    if (cozyURL) {
      this.facade.setup(cozyURL, options);
    }
  }

  register(cozyUrl) {
    this.facade.setup(cozyUrl, _objectSpread({}, this.options, {
      oauth: _objectSpread({}, this.options.oauth, {
        onRegistered: (client, url) => Object(_authentication_mobile__WEBPACK_IMPORTED_MODULE_1__["authenticateWithCordova"])(url)
      })
    }));
    return cozy.client.authorize(true);
  }

  async isRegistered(clientInfos) {
    if (!clientInfos) return false;

    try {
      await cozy.client.auth.getClient(clientInfos);
      return true;
    } catch (err) {
      // this is the error sent if we are offline
      if (err.message === 'Failed to fetch') {
        return true;
      } else {
        console.warn(err); // eslint-disable-line no-console

        return false;
      }
    }
  }

  startSync(dispatch) {
    return this.facade.startSync(dispatch);
  }

  startReplicationTo(dispatch) {
    return this.facade.startReplicationTo(dispatch);
  }

  startReplicationFrom(dispatch) {
    return this.facade.startReplicationFrom(dispatch);
  }

  getAdapter(doctype) {
    return this.facade.getAdapter(doctype);
  }

  async fetchApps() {
    return this.getAdapter(APPS_DOCTYPE).fetchApps();
  }

  async fetchCollection(name, doctype, options = {}, skip = 0) {
    if (options.selector) {
      const index = await this.getCollectionIndex(name, doctype, options);
      return this.getAdapter(doctype).queryDocuments(doctype, index, _objectSpread({}, options, {
        skip
      }));
    }

    return this.getAdapter(doctype).fetchDocuments(doctype);
  }

  fetchDocument(doctype, id) {
    return this.getAdapter(doctype).fetchDocument(doctype, id);
  }

  fetchFile(id) {
    return this.getAdapter(FILES_DOCTYPE).fetchFile(id);
  }

  fetchReferencedFiles(doc, skip = 0) {
    return this.getAdapter(doc._type).fetchReferencedFiles(doc, skip);
  }

  fetchTriggers(name, worker) {
    return this.getAdapter(TRIGGERS_DOCTYPE).fetchTriggers(worker);
  }

  fetchKonnectors() {
    return this.getAdapter(KONNECTORS_DOCTYPE).fetchKonnectors();
  }

  addReferencedFiles(doc, ids) {
    return this.getAdapter(doc._type).addReferencedFiles(doc, ids);
  }

  removeReferencedFiles(doc, ids) {
    return this.getAdapter(doc._type).removeReferencedFiles(doc, ids);
  }

  createDocument(doctype, doc) {
    return this.getAdapter(doctype).createDocument(doctype, doc);
  }

  createTrigger(doc) {
    return this.getAdapter(doc._type).createTrigger(doc);
  }

  launchTrigger(doc) {
    return this.getAdapter(doc._type).launchTrigger(doc);
  }

  updateDocument(doc) {
    return this.getAdapter(doc._type).updateDocument(doc);
  }

  deleteDocument(doc) {
    return this.getAdapter(doc._type).deleteDocument(doc);
  }

  deleteTrigger(doc) {
    return this.getAdapter(doc._type).deleteTrigger(doc);
  }

  async fetchSharings(doctype) {
    const permissions = await this.getAdapter(doctype).fetchSharingPermissions(doctype);
    const sharingIds = [...permissions.byMe.map(p => p.attributes.source_id), ...permissions.withMe.map(p => p.attributes.source_id)];
    const sharings = await Promise.all(sharingIds.map(id => this.getAdapter(SHARINGS_DOCTYPE).fetchSharing(id)));
    return {
      permissions,
      sharings
    };
  }

  createSharing(permissions, contactIds, sharingType, description) {
    return this.getAdapter(SHARINGS_DOCTYPE).createSharing(permissions, contactIds, sharingType, description);
  }

  revokeSharing(sharingId) {
    return this.getAdapter(SHARINGS_DOCTYPE).revokeSharing(sharingId);
  }

  revokeSharingForClient(sharingId, clientId) {
    return this.getAdapter(SHARINGS_DOCTYPE).revokeSharingForClient(sharingId, clientId);
  }

  createSharingLink(permissions) {
    return this.getAdapter(SHARINGS_DOCTYPE).createSharingLink(permissions);
  }

  revokeSharingLink(permission) {
    return this.getAdapter(SHARINGS_DOCTYPE).revokeSharingLink(permission);
  }

  createFile(file, dirID) {
    return this.getAdapter(FILES_DOCTYPE).createFile(file, dirID);
  }

  trashFile(file) {
    return this.getAdapter(FILES_DOCTYPE).trashFile(file);
  }

  async ensureDirectoryExists(path) {
    if (!this.specialDirectories[path]) {
      const dir = await cozy.client.files.createDirectoryByPath(path);
      this.specialDirectories[path] = dir._id;
    }

    return this.specialDirectories[path];
  }

  async checkUniquenessOf(doctype, property, value) {
    const index = await this.getUniqueIndex(doctype, property);
    const existingDocs = await cozy.client.data.query(index, {
      selector: {
        [property]: value
      },
      fields: ['_id']
    });
    return existingDocs.length === 0;
  }

  async getCollectionIndex(name, doctype, options) {
    if (!this.indexes[name]) {
      this.indexes[name] = await this.getAdapter(doctype).createIndex(doctype, this.getIndexFields(options));
    }

    return this.indexes[name];
  }

  async getUniqueIndex(doctype, property) {
    const name = `${doctype}/${property}`;

    if (!this.indexes[name]) {
      this.indexes[name] = await this.getAdapter(doctype).createIndex(doctype, [property]);
    }

    return this.indexes[name];
  }

  getIndexFields(options) {
    const {
      selector,
      sort
    } = options;

    if (sort) {
      // We filter possible duplicated fields
      return [...Object.keys(selector), ...Object.keys(sort)].filter((f, i, arr) => arr.indexOf(f) === i);
    }

    return Object.keys(selector);
  }

}

/***/ }),

/***/ "QxZi":
/***/ (function(module) {

module.exports = ["energy","insurance","isp","shopping","telecom","transport","banking","public_service"];

/***/ }),

/***/ "UufI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "konnectorsI18nMiddleware", function() { return konnectorsI18nMiddleware; });
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("buk/");

const KONNECTORS_DOCTYPE = 'io.cozy.konnectors';

const extendI18nWithKonnector = lang => konnector => {
  const {
    langs,
    locales
  } = konnector;
  const hasLangs = langs && langs.length;

  if (!hasLangs) {
    // eslint-disable-next-line no-console
    console.warn(`Konnector ${konnector.name} does not specify any lang`);
    return konnector;
  }

  const providesLang = hasLangs && langs.includes(lang);
  const actualLang = providesLang ? lang : langs[0];
  const localeKeys = locales && Object.keys(locales);
  const providesLocales = localeKeys && localeKeys.length && localeKeys.includes(actualLang);

  if (!providesLocales) {
    // eslint-disable-next-line no-console
    console.warn(`Konnector ${konnector.name} does not specify any locale for lang ${actualLang}`);
    return konnector;
  }

  Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_0__["extend"])({
    [konnector.slug]: locales[actualLang]
  });
  return konnector;
};

const konnectorsI18nMiddleware = lang => () => next => action => {
  const {
    response
  } = action;

  switch (action.type) {
    case 'RECEIVE_DATA':
    case 'RECEIVE_NEW_DOCUMENT':
      if (response && action.doctype === KONNECTORS_DOCTYPE) {
        const konnectors = response.data;
        konnectors && konnectors.length && konnectors.forEach(extendI18nWithKonnector(lang));
      }

      break;
  }

  return next(action);
};
/* harmony default export */ __webpack_exports__["default"] = (konnectorsI18nMiddleware);

/***/ }),

/***/ "WWPq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
async function fetch(cozy, triggerId) {
  return cozy.fetchJSON('GET', `/jobs/triggers/${triggerId}`);
}

/***/ }),

/***/ "XSRU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("buk/");
/* harmony import */ var components_intents_CreateAccountIntent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("zlKK");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("uZd2");













var IntentService =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(IntentService, _Component);

  function IntentService(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, IntentService);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(IntentService).call(this, props));
    _this.state = {
      error: null
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(IntentService, [{
    key: "handleInstallationSuccess",
    value: function handleInstallationSuccess(konnector) {
      this.props.receiveKonnector(konnector);
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this$props, data, konnector, receiveKonnector, service, installedKonnector;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, data = _this$props.data, konnector = _this$props.konnector, receiveKonnector = _this$props.receiveKonnector, service = _this$props.service;

                if (!(service && !konnector)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return service.compose('INSTALL', 'io.cozy.apps', data);

              case 4:
                installedKonnector = _context.sent;

                if (installedKonnector) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", service.cancel());

              case 7:
                receiveKonnector(installedKonnector);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "onError",
    value: function onError(error) {
      this.setState({
        error: error
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          appData = _this$props2.appData,
          konnector = _this$props2.konnector,
          onCancel = _this$props2.onCancel,
          service = _this$props2.service,
          t = _this$props2.t;
      var error = this.state.error;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-service"
      }, error && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-error coz-service-error"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, t(error.message)), error.reason && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, t('intent.service.error.cause', {
        error: error.reason
      }))), !error && konnector && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_intents_CreateAccountIntent__WEBPACK_IMPORTED_MODULE_10__["default"], {
        appData: appData,
        konnector: konnector,
        onCancel: onCancel,
        onTerminate: service.terminate
      }));
    }
  }]);

  return IntentService;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    receiveKonnector: function receiveKonnector(konnector) {
      return dispatch(Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__["receiveInstalledKonnector"])(konnector));
    }
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var data = ownProps.data;
  var slug = data.slug;
  return {
    konnector: slug && Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__["getKonnector"])(state.cozy, slug)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__["translate"])()(IntentService)));

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

/***/ "bECI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMessage", function() { return UpdateMessage; });
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Infos__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("M2p0");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);









/* global cozy */





var UpdateMessage =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(UpdateMessage, _Component);

  function UpdateMessage(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, UpdateMessage);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(UpdateMessage).call(this, props));
    _this.state = {
      isRedirecting: false
    };
    _this.redirectToStore = _this.redirectToStore.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(UpdateMessage, [{
    key: "redirectToStore",
    value: function () {
      var _redirectToStore = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var konnector;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({
                  isRedirecting: true
                });
                konnector = this.props.konnector;
                _context.prev = 2;
                _context.next = 5;
                return cozy.client.intents.redirect('io.cozy.apps', {
                  slug: konnector.slug,
                  step: 'update'
                });

              case 5:
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);

                /* eslint-disable-next-line no-console */
                console.error(_context.t0);
                this.setState({
                  isRedirecting: false
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 7]]);
      }));

      function redirectToStore() {
        return _redirectToStore.apply(this, arguments);
      }

      return redirectToStore;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          isBlocking = _this$props.isBlocking;
      var isRedirecting = this.state.isRedirecting;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_react_Infos__WEBPACK_IMPORTED_MODULE_11__["default"], {
        actionButton: react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          label: t('update.CTA'),
          theme: "danger",
          className: "u-m-0",
          onClick: this.redirectToStore,
          disabled: isRedirecting
        }),
        className: "u-maw-none",
        text: isBlocking ? t('update.blocking') : t('update.regular'),
        isImportant: isBlocking,
        title: t('update.title')
      });
    }
  }]);

  return UpdateMessage;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);
UpdateMessage.propTypes = {
  konnector: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object.isRequired,
  isBlocking: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool,
  t: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__["translate"])()(UpdateMessage));

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









const configureStore = (legacyClient, cozyClient, context, options = {}) => {
  // Enable Redux dev tools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || redux__WEBPACK_IMPORTED_MODULE_0__["compose"];
  const reduxStore = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(Object(reducers__WEBPACK_IMPORTED_MODULE_7__["default"])(), composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(undefined, [Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__["cozyMiddleware"])(legacyClient), Object(lib_middlewares_konnectorsI18n__WEBPACK_IMPORTED_MODULE_3__["default"])(options.lang), redux_thunk__WEBPACK_IMPORTED_MODULE_4__["default"], cozy_flags__WEBPACK_IMPORTED_MODULE_6___default()('redux-logger') ? Object(redux_logger__WEBPACK_IMPORTED_MODULE_2__["createLogger"])() : null].filter(Boolean))));
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








/* harmony default export */ __webpack_exports__["default"] = (() => Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  apps: ducks_apps__WEBPACK_IMPORTED_MODULE_3__["default"],
  connections: ducks_connections__WEBPACK_IMPORTED_MODULE_7__["default"],
  cozy: redux_cozy_client__WEBPACK_IMPORTED_MODULE_2__["reducer"]
})); // selectors

const getInstalledKonnectors = state => ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getInstalledKonnectors"](state.cozy);
const getConnectionsByKonnector = (state, konnectorSlug) => ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getConnectionsByKonnector"](state.connections, konnectorSlug, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy), ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getSlugs"](state.cozy));
const getConnectionsQueue = state => ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getQueue"](state.connections, ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getIndexedKonnectors"](state.cozy));
const getCreatedConnectionAccount = state => ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getAccount"](state.cozy, ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getCreatedAccount"](state.connections));
const getKonnectorTriggersCount = (state, konnector) => ducks_triggers__WEBPACK_IMPORTED_MODULE_6__["getKonnectorTriggers"](state.cozy, konnector, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy)).length;
const getTriggerByKonnectorAndAccount = (state, konnector, account) => {
  const triggerId = ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getTriggerIdByKonnectorAndAccount"](state.connections, konnector, account, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy));
  return ducks_triggers__WEBPACK_IMPORTED_MODULE_6__["getTrigger"](state.cozy, triggerId);
};
const getTriggersByKonnector = (state, konnectorSlug) => {
  const triggersInState = state.cozy.documents['io.cozy.triggers'] || {};
  const triggers = Object.keys(triggersInState).reduce((acc, key) => {
    const document = state.cozy.documents['io.cozy.triggers'][key];

    if (document.worker === 'konnector' && lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(document, 'message.konnector') === konnectorSlug) {
      acc.push(document);
    }

    return acc;
  }, []);
  return triggers;
};
const getTriggersInError = state => {
  const triggers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(state, ['cozy', 'documents', 'io.cozy.triggers'], {});
  return Object.values(triggers).filter(trigger => {
    const isInError = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(trigger, 'current_state.status') === 'errored';
    return isInError;
  });
};
const getAccountsWithErrors = state => {
  const accountsWithErrorsIds = getTriggersInError(state).map(trigger => lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(trigger, 'message.account'));
  const accounts = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(state, ['cozy', 'documents', 'io.cozy.accounts'], {});
  return Object.values(accounts).filter(({
    _id
  }) => accountsWithErrorsIds.includes(_id));
};

/***/ }),

/***/ "d/w2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("/8/d");
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("M50D");
/* harmony import */ var cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
/* harmony import */ var store_configureStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cXEB");
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("m+TH");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Le8U");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var containers_IntentHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("jpY6");
/* harmony import */ var styles_intents_styl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("8EAv");
/* harmony import */ var styles_intents_styl__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(styles_intents_styl__WEBPACK_IMPORTED_MODULE_11__);
/* global __DEVELOPMENT__ */












var lang = document.documentElement.getAttribute('lang') || 'en';
var context = window.context || 'cozy';
var ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('[role=application]');
  var appData = root.dataset;
  var legacyClient = new redux_cozy_client__WEBPACK_IMPORTED_MODULE_8__["CozyClient"]({
    cozyURL: "//".concat(appData.cozyDomain),
    token: appData.cozyToken
  }); // New improvements must be done with CozyClient

  var cozyClient = new cozy_client__WEBPACK_IMPORTED_MODULE_5___default.a({
    uri: "".concat(window.location.protocol, "//").concat(appData.cozyDomain),
    schema: {
      app: cozy_doctypes__WEBPACK_IMPORTED_MODULE_9__["Application"].schema,
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
      }
    },
    token: appData.cozyToken
  }); // store

  var store = Object(store_configureStore__WEBPACK_IMPORTED_MODULE_7__["default"])(legacyClient, cozyClient, context, {
    lang: lang
  });
  Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_5__["CozyProvider"], {
    client: cozyClient
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_cozy_client__WEBPACK_IMPORTED_MODULE_8__["CozyProvider"], {
    domain: appData.cozyDomain,
    store: store,
    client: cozyClient,
    secure: !true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["I18n"], {
    lang: lang,
    dictRequire: function dictRequire(lang) {
      return __webpack_require__("KAKi")("./".concat(lang));
    },
    context: context
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["HashRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(containers_IntentHandler__WEBPACK_IMPORTED_MODULE_10__["default"], {
    appData: appData
  }))))), document.querySelector('[role=application]'));
});

/***/ }),

/***/ "gAos":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorHeaderIcon", function() { return KonnectorHeaderIcon; });
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
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("B/vO");
/* harmony import */ var styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("gpME");
/* harmony import */ var styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9__);










var KonnectorHeaderIcon =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(KonnectorHeaderIcon, _Component);

  function KonnectorHeaderIcon() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KonnectorHeaderIcon);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(KonnectorHeaderIcon).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(KonnectorHeaderIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          center = _this$props.center,
          konnector = _this$props.konnector,
          t = _this$props.t;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9___default.a["col-konnector-header-icon-wrapper".concat(center ? '--center' : '')]
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_8__["default"], {
        alt: t('app.logo.alt', {
          name: konnector.name
        }),
        app: konnector,
        className: styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9___default.a["col-konnector-header-icon".concat(center ? '--center' : '')]
      }));
    }
  }]);

  return KonnectorHeaderIcon;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
KonnectorHeaderIcon.propTypes = {
  center: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  konnector: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired,
  t: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["translate"])()(KonnectorHeaderIcon));

/***/ }),

/***/ "gpME":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"col-konnector-header-icon-wrapper":"col-konnector-header-icon-wrapper--1oMyA","col-konnector-header-icon-wrapper--center":"col-konnector-header-icon-wrapper--center--3aLBw","col-konnector-header-icon":"col-konnector-header-icon--2Yxl_","col-konnector-header-icon--center":"col-konnector-header-icon--center--3rGkD"};

/***/ }),

/***/ "gwpp":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"col-account-connection":"col-account-connection--3AgeF"};

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
/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("skrj");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global cozy, PouchDB, pouchdbFind */

const REPLICATION_INTERVAL = 30000;
const SYNC_BIDIRECTIONAL = 'SYNC_BIDIRECTIONAL';
const SYNC_TO = 'SYNC_TO';
const SYNC_FROM = 'SYNC_FROM';
class PouchdbAdapter {
  constructor() {
    PouchDB.plugin(pouchdbFind);
    this.instances = {};
    this.doctypes = [];
  }

  registerDoctypes(doctypes) {
    this.doctypes = doctypes;
  }

  getDatabase(doctype) {
    return cozy.client.offline.getDatabase(doctype); // For now we let cozy-client-js creates PouchDB instances
  }

  getReplicationBaseUrl() {
    return cozy.client.authorize().then(credentials => {
      const basic = credentials.token.toBasicAuth();
      return `${cozy.client._url}/data/`.replace('//', `//${basic}`);
    });
  }

  getSeqNumber(doctype) {
    return this.getDatabase(doctype).info().then(result => result.update_seq);
  }

  async sync(dispatch, direction = SYNC_BIDIRECTIONAL) {
    const baseUrl = await this.getReplicationBaseUrl();

    for (let doctype of this.doctypes) {
      const seqNumber = await this.getSeqNumber(doctype);
      await dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_0__["startDoctypeSync"])(doctype, seqNumber));
      this.syncDoctype(doctype, `${baseUrl}${doctype}`, dispatch, direction);
    }
  }

  syncDoctype(doctype, replicationUrl, dispatch, direction = SYNC_BIDIRECTIONAL) {
    return new Promise((resolve, reject) => {
      const db = this.getDatabase(doctype);
      let syncHandler;
      if (direction === SYNC_TO) syncHandler = db.replicate.to(replicationUrl);else if (direction === SYNC_FROM) syncHandler = db.replicate.from(replicationUrl);else syncHandler = db.sync(replicationUrl);
      syncHandler.on('complete', info => {
        dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_0__["syncDoctypeOk"])(doctype, info));
        this.scheduleNextSync(doctype, replicationUrl, dispatch, direction);
        resolve(info);
      }).on('error', err => {
        if (err.error === 'code=400, message=Expired token') {
          return cozy.client.authorize().then(({
            client,
            token
          }) => {
            cozy.client.auth.refreshToken(cozy, client, token).then(newToken => cozy.client.saveCredentials(client, newToken)).then(() => this.syncDoctype(doctype, replicationUrl));
          });
        } else if (err.status !== 404) {
          // A 404 error on some doctypes is perfectly normal when there is no data
          dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_0__["syncDoctypeError"])(doctype, err));
          this.scheduleNextSync(doctype, replicationUrl, dispatch);
          reject(err);
        }
      });
    });
  }

  scheduleNextSync(doctype, replicationUrl, dispatch, direction) {
    setTimeout(() => {
      this.syncDoctype(doctype, replicationUrl, dispatch, direction);
    }, REPLICATION_INTERVAL);
  }

  async fetchDocuments(doctype) {
    const resp = await this.getDatabase(doctype).allDocs({
      include_docs: true
    });
    return {
      data: resp.rows.filter(row => !row.doc.hasOwnProperty('views')).map(row => _objectSpread({}, row.doc, {
        id: row.id,
        _type: doctype
      })),
      meta: {
        count: resp.total_rows
      },
      skip: resp.offset,
      next: false
    };
  }

  async queryDocuments(doctype, index, options) {
    const queryOptions = _objectSpread({}, options, {
      fields: [...options.fields, '_id'],
      sort: options.sort ? Object.keys(options.sort).map(k => ({
        [k]: options.sort[k]
      })) : undefined
    });

    const resp = await this.getDatabase(doctype).find(queryOptions);
    return {
      data: resp.docs.map(doc => _objectSpread({}, doc, {
        id: doc._id,
        _type: doctype
      })),
      meta: {
        count: resp.docs.length
      },
      skip: 0,
      next: false
    };
  }

  async fetchDocument(doctype, id) {
    const resp = await this.getDatabase(doctype).get(id, {
      revs_info: true
    }); // We need the revs_info option to get the _rev property

    return {
      data: [_objectSpread({}, resp, {
        id: resp.id,
        _id: resp.id,
        _type: doctype
      })]
    };
  }

  async createDocument(doctype, doc) {
    const resp = await this.getDatabase(doctype).post(doc);
    return {
      data: [_objectSpread({}, doc, {
        id: resp.id,
        _id: resp.id,
        _type: doctype,
        _rev: resp.rev
      })]
    };
  }

  async updateDocument(doc) {
    // TODO: _* properties are reserved by CouchDB, so we can't send the doc with its _type property...
    const {
      _type
    } = doc,
          safeDoc = _objectWithoutProperties(doc, ["_type"]);

    const resp = await this.getDatabase(_type).put(safeDoc);
    return {
      data: [_objectSpread({}, doc, {
        _rev: resp.rev
      })]
    };
  }

  async deleteDocument(doc) {
    await this.getDatabase(doc._type).remove(doc);
    return {
      data: [doc]
    };
  }

  createIndex(doctype, fields) {
    return this.getDatabase(doctype).createIndex({
      index: {
        fields
      }
    });
  }

  fetchFileByPath() {
    throw new Error('Not implemented');
  }

  createFile() {
    throw new Error('Not implemented');
  }

  trashFile() {
    throw new Error('Not implemented');
  }

  fetchReferencedFiles() {
    throw new Error('Not implemented');
  }

  addReferencedFiles() {
    throw new Error('Not implemented');
  }

  removeReferencedFiles() {
    throw new Error('Not implemented');
  }

}

/***/ }),

/***/ "jpY6":
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("V2U0");
/* harmony import */ var components_appEntryPoint__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("mD6Q");
/* harmony import */ var containers_IntentService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("XSRU");













var IntentHandler =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(IntentHandler, _Component);

  function IntentHandler(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, IntentHandler);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(IntentHandler).call(this, props, context));
    _this.store = context.store;
    _this.state = {
      isInitializing: true
    };

    _this.store.createIntentService().then(function (service) {
      _this.setState({
        isInitializing: false,
        service: service
      });
    }).catch(function (error) {
      _this.setState({
        isInitializing: false,
        error: {
          message: 'intent.service.error.initialization',
          reason: error.message
        }
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(IntentHandler, [{
    key: "terminate",
    value: function terminate(account) {
      var service = this.state.service;
      service.terminate(account);
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var service = this.state.service;
      service.cancel();
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      this.setState({
        error: {
          message: 'intent.service.error.creation',
          reason: error.message
        }
      });
      throw error;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // const { data } = this.props
      var _this$props = this.props,
          appData = _this$props.appData,
          accounts = _this$props.accounts,
          konnectors = _this$props.konnectors,
          triggers = _this$props.triggers,
          t = _this$props.t;
      var _this$state = this.state,
          error = _this$state.error,
          service = _this$state.service;
      var isInitializing = this.state.isInitializing;
      isInitializing = isInitializing || [accounts, konnectors, triggers].find(function (collection) {
        return ['pending', 'loading'].includes(collection.fetchStatus);
      });
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-service"
      }, isInitializing && react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-service-loading"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_9__["default"], {
        size: "xxlarge"
      })), error && react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-error coz-service-error"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, t(error.message)), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, t('intent.service.error.cause', {
        error: error.reason
      }))), !isInitializing && !error && // Here we should render a component based on the intent action.
      // For now, our action is only CREATE on io.cozy.accounts. So here
      // we should render a component named CreateAccountService.
      // IntentService is just here for legacy reason and should
      // disappear.
      // In the future we may test the intent action and render a
      // specific component for every action.
      react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(containers_IntentService__WEBPACK_IMPORTED_MODULE_11__["default"], {
        appData: appData,
        data: service.getData(),
        onTerminate: function onTerminate(account) {
          return _this2.terminate(account);
        },
        onCancel: function onCancel() {
          return _this2.cancel();
        },
        service: service
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__["Sprite"], null));
    }
  }]);

  return IntentHandler;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

IntentHandler.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (Object(components_appEntryPoint__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__["translate"])()(IntentHandler)));

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
/* harmony import */ var _flags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("oC12");







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

/***/ "oC12":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_0__);

cozy_flags__WEBPACK_IMPORTED_MODULE_0___default()('harvest.bi-konnector-policy', true);

/***/ }),

/***/ "oMPT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapValues", function() { return mapValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterValues", function() { return filterValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeObjectProperty", function() { return removeObjectProperty; });
const mapValues = (object, transform) => {
  let result = {};

  for (const key in object) {
    result[key] = transform(object[key], key);
  }

  return result;
};
const filterValues = (object, filter) => {
  let result = {};

  for (const key in object) {
    if (filter(object[key], key)) {
      result[key] = object[key];
    }
  }

  return result;
};
const removeObjectProperty = (obj, prop) => {
  return Object.keys(obj).reduce((result, key) => {
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
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fvjX");
/* harmony import */ var cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4kcP");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("GbhZ");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const FETCH_SHARINGS = 'FETCH_SHARINGS';
const RECEIVE_SHARINGS_DATA = 'RECEIVE_SHARINGS_DATA';
const RECEIVE_FETCH_SHARINGS_ERROR = 'RECEIVE_FETCH_SHARINGS_ERROR';
const CREATE_SHARING = 'CREATE_SHARING';
const RECEIVE_NEW_SHARING = 'RECEIVE_NEW_SHARING';
const CREATE_SHARING_LINK = 'CREATE_SHARING_LINK';
const RECEIVE_NEW_SHARING_LINK = 'RECEIVE_NEW_SHARING_LINK';
const REVOKE_SHARING_LINK = 'REVOKE_SHARING_LINK';
const RECEIVE_SHARING_LINK_REVOKE = 'RECEIVE_SHARING_LINK_REVOKE';
const REVOKE_SHARING = 'REVOKE_SHARING';
const RECEIVE_SHARING_REVOKE = 'RECEIVE_SHARING_REVOKE';
const RECEIVE_ERROR = 'RECEIVE_ERROR';

const removeRecipient = (recipients, recipientId) => {
  const idx = recipients.findIndex(r => r.recipient.id === recipientId);
  return [...recipients.slice(0, idx), ...recipients.slice(idx + 1)];
};

const documents = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SHARINGS_DATA:
      return action.response.sharings;

    case RECEIVE_NEW_SHARING:
      return [...state, action.response];

    case RECEIVE_SHARING_REVOKE:
      {
        const idx = state.findIndex(s => s.attributes.sharing_id === action.sharingId);
        if (idx === -1) return state;
        const sharing = state[idx];
        const loneRecipient = sharing.attributes.recipients === undefined || // for recipient-side revocation
        sharing.attributes.recipients.length === 1;
        const newState = loneRecipient ? _objectSpread({}, sharing, {
          attributes: _objectSpread({}, sharing.attributes, {
            revoked: true
          })
        }) : _objectSpread({}, sharing, {
          attributes: _objectSpread({}, sharing.attributes, {
            recipients: removeRecipient(sharing.attributes.recipients, action.recipientId)
          })
        });
        return [...state.slice(0, idx), newState, ...state.slice(idx + 1)];
      }

    default:
      return state;
  }
};

const doctypePermsetInitialState = {
  fetchStatus: 'loading',
  byMe: [],
  byLink: [],
  withMe: []
};

const permissions = (state = {}, action) => {
  let idx;

  switch (action.type) {
    case FETCH_SHARINGS:
      if (state[action.doctype]) {
        return _objectSpread({}, state, {
          [action.doctype]: _objectSpread({}, state[action.doctype], {
            fetchStatus: 'loading'
          })
        });
      }

      return _objectSpread({}, state, {
        [action.doctype]: doctypePermsetInitialState
      });

    case RECEIVE_SHARINGS_DATA:
      return _objectSpread({}, state, {
        [action.doctype]: _objectSpread({
          fetchStatus: 'loaded'
        }, action.response.permissions)
      });

    case RECEIVE_FETCH_SHARINGS_ERROR:
      return _objectSpread({}, state, {
        [action.doctype]: {
          fetchStatus: 'error'
        }
      });

    case RECEIVE_NEW_SHARING:
      return _objectSpread({}, state, {
        [action.doctype]: _objectSpread({}, state[action.doctype], {
          byMe: [...state[action.doctype].byMe, {
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
          }]
        })
      });

    case RECEIVE_NEW_SHARING_LINK:
      return _objectSpread({}, state, {
        [action.doctype]: _objectSpread({}, state[action.doctype], {
          byLink: [...state[action.doctype].byLink, action.response]
        })
      });

    case REVOKE_SHARING_LINK:
      idx = state[action.doctype].byLink.findIndex(p => action.permission._id === p._id);
      if (idx === -1) return state;
      return _objectSpread({}, state, {
        [action.doctype]: _objectSpread({}, state[action.doctype], {
          byLink: [...state[action.doctype].byLink.slice(0, idx), ...state[action.doctype].byLink.slice(idx + 1)]
        })
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  documents,
  permissions
})); // actions

const fetchSharings = (doctype, id = null, options = {}) => ({
  types: [FETCH_SHARINGS, RECEIVE_SHARINGS_DATA, RECEIVE_FETCH_SHARINGS_ERROR],
  doctype,
  id,
  options,
  promise: client => client.fetchSharings(doctype)
});
const share = (document, recipients, sharingType, sharingDesc) => async dispatch => {
  const recipientIds = await Promise.all(recipients.map(recipient => recipient.id || dispatch(createContact(recipient)).then(c => c.data[0].id)));
  trackSharingByEmail(document);
  return dispatch(createSharing(document, recipientIds, sharingType, sharingDesc));
};
const unshare = (document, recipient) => async (dispatch, getState) => {
  const sharing = getSharingForRecipient(getState(), document, recipient);
  const loneRecipient = sharing.attributes.recipients.length === 1;
  return dispatch({
    types: [REVOKE_SHARING, RECEIVE_SHARING_REVOKE, RECEIVE_ERROR],
    doctype: document._type,
    id: document._id,
    sharingId: sharing.attributes.sharing_id,
    recipientId: recipient._id,
    promise: client => loneRecipient ? client.revokeSharing(sharing.attributes.sharing_id) : client.revokeSharingForClient(sharing.attributes.sharing_id, sharing.attributes.recipients.find(r => r.recipient.id === recipient._id).Client.client_id)
  });
};
const leave = document => async (dispatch, getState) => {
  const sharings = getDocumentActiveSharings(getState(), document._type, document._id);
  const sharing = sharings.find(s => s.attributes.owner === false);
  return dispatch({
    types: [REVOKE_SHARING, RECEIVE_SHARING_REVOKE, RECEIVE_ERROR],
    doctype: document._type,
    id: document._id,
    sharingId: sharing.attributes.sharing_id,
    promise: client => client.revokeSharing(sharing.attributes.sharing_id)
  });
};
const shareByLink = document => {
  trackSharingByLink(document);
  return createSharingLink(document);
};
const revokeLink = document => async (dispatch, getState) => {
  const perm = getSharingLinkPermission(getState(), document._type, document._id);
  return dispatch({
    types: [REVOKE_SHARING_LINK, RECEIVE_SHARING_LINK_REVOKE, RECEIVE_ERROR],
    doctype: document._type,
    id: document._id,
    permission: perm,
    promise: client => client.revokeSharingLink(perm)
  });
};

const createSharing = (document, contactIds, sharingType = 'master-slave', description = '') => ({
  types: [CREATE_SHARING, RECEIVE_NEW_SHARING, RECEIVE_ERROR],
  doctype: document._type,
  id: document._id,
  promise: client => client.createSharing(getPermissionsFor(document), contactIds, sharingType, description)
});

const createSharingLink = document => ({
  types: [CREATE_SHARING_LINK, RECEIVE_NEW_SHARING_LINK, RECEIVE_ERROR],
  doctype: document._type,
  id: document._id,
  promise: client => client.createSharingLink(getPermissionsFor(document, true))
}); // TODO: this is a poor man's migration in order to normalize contacts
// and should be removed after a few weeks in prod
// Note for future-self: If you have no idea of what it means, please, erase this code.
// Note for time-travelers: please travel a little more back in time in order to advise us
// to get contacts right the first time


const fetchContacts = () => {
  const action = Object(_reducer__WEBPACK_IMPORTED_MODULE_2__["fetchCollection"])('contacts', 'io.cozy.contacts');

  action.promise = async client => {
    const response = await client.fetchCollection('contacts', 'io.cozy.contacts');
    const data = await Promise.all(response.data.map(contact => {
      return typeof contact.email !== 'string' ? contact : client.updateDocument(_objectSpread({}, contact, {
        email: [{
          address: contact.email,
          primary: true
        }]
      })).then(resp => resp.data[0]);
    }));
    return _objectSpread({}, response, {
      data
    });
  };

  return action;
};

const createContact = ({
  email
}) => Object(_reducer__WEBPACK_IMPORTED_MODULE_2__["createDocument"])('io.cozy.contacts', {
  email: [{
    address: email,
    primary: true
  }]
});

const getPermissionsFor = (document, publicLink = false) => {
  const {
    _id,
    _type
  } = document;
  const verbs = publicLink ? ['GET'] : ['ALL']; // TODO: this works for albums, but it needs to be generalized and integrated
  // with cozy-client ; some sort of doctype "schema" will be needed here

  return isFile(document) ? {
    files: {
      type: 'io.cozy.files',
      verbs,
      values: [_id]
    }
  } : {
    collection: {
      type: _type,
      verbs,
      values: [_id]
    },
    files: {
      type: 'io.cozy.files',
      verbs,
      values: [`${_type}/${_id}`],
      selector: 'referenced_by'
    }
  };
}; // selectors


const getSharing = (state, id) => state.cozy.sharings.documents.find(s => s.attributes.sharing_id === id);

const getContact = (state, id) => Object(_reducer__WEBPACK_IMPORTED_MODULE_2__["getDocument"])(state, 'io.cozy.contacts', id);

const getDoctypePermissions = (state, doctype) => {
  if (state.cozy.sharings.permissions[doctype]) {
    return state.cozy.sharings.permissions[doctype];
  }

  return doctypePermsetInitialState;
};

const getSharingLink = (state, doctype, id) => {
  const perm = getSharingLinkPermission(state, doctype, id);
  return perm ? buildSharingLink(id, doctype, perm.attributes.codes.email) : null;
};

const getSharingLinkPermission = (state, doctype, id) => {
  const perms = getDoctypePermissions(state, doctype);
  const type = isFile({
    _type: doctype
  }) ? 'files' : 'collection';
  return perms.byLink.find(p => p.attributes.permissions[type].values.indexOf(id) !== -1);
};

const getSharingForRecipient = (state, document, recipient) => {
  const sharings = getDocumentActiveSharings(state, document._type, document._id);
  return sharings.find(s => s.attributes.recipients.find(r => r.recipient.id === recipient._id));
};

const getDocumentActiveSharings = (state, doctype, id) => {
  const perms = getDoctypePermissions(state, doctype);
  return [...perms.byMe.filter(perm => perm.attributes.permissions['rule0'].values.indexOf(id) !== -1), ...perms.withMe.filter(perm => perm.attributes.permissions['rule0'].values.indexOf(id) !== -1)].map(p => getSharing(state, p.attributes.source_id)).filter(s => !s.attributes.revoked);
};

const getSharings = (state, doctype) => {
  const perms = getDoctypePermissions(state, doctype);
  const type = doctype === 'io.cozy.files' ? 'files' : 'collection';
  return {
    byMe: perms.byMe.map(p => p.attributes.permissions['rule0'].values[0]),
    withMe: perms.withMe.map(p => p.attributes.permissions['rule0'].values[0]),
    byLink: perms.byLink.map(p => p.attributes.permissions[type].values[0])
  };
};
const getSharingStatus = (state, doctype, id) => {
  const sharings = getDocumentActiveSharings(state, doctype, id);
  return {
    shared: sharings.length !== 0,
    owner: sharings.length === 0 || sharings.some(s => s.attributes.owner === true),
    sharingType: sharings.some(s => s.attributes.sharing_type === 'master-master') ? 'master-master' : 'master-slave',
    sharings
  };
};
const getSharingDetails = (state, doctype, id) => {
  const {
    shared,
    owner,
    sharingType,
    sharings
  } = getSharingStatus(state, doctype, id);
  const sharingLink = getSharingLink(state, doctype, id);
  return {
    shared,
    owner,
    sharingType,
    sharingLink,
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

const getSharingRecipients = (state, sharings) => sharings.filter(sharing => sharing.attributes.recipients).map(sharing => sharing.attributes.recipients.map(info => ({
  contact: getContact(state, info.recipient.id),
  status: info.status,
  type: sharing.attributes.sharing_type
}))).reduce((a, b) => a.concat(b), []);

const buildSharingLink = (id, doctype, sharecode) => `${window.location.origin}/public?sharecode=${sharecode}&id=${id}${doctype === 'file' ? '&directdownload' : ''}`; // helpers


const isFile = ({
  _type,
  type
}) => _type === 'io.cozy.files' || type === 'directory' || type === 'file';

const track = (document, action) => {
  const tracker = Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_1__["getTracker"])();

  if (!tracker) {
    return;
  }

  tracker.push(['trackEvent', isFile(document) ? 'Drive' : 'Photos', action, `${action}${isFile(document) ? 'File' : 'Album'}`]);
};

const trackSharingByLink = document => track(document, 'shareByLink');

const trackSharingByEmail = document => track(document, 'shareByEmail');

/***/ }),

/***/ "oway":
/***/ (function(module) {

module.exports = {"app":{"logo":{"alt":"%{name} logo"},"logout":"Desconexión"},"date":{"format":"DD/MM/YYYY","placeholder":"dd/mm/yyyy"},"manifest":{"name":"Inicio","short_description":"Cozy Collect es la aplicación que le ayuda a recopilar todos sus datos personales que están en Cozy.","long_description":"Con Cozy Collect, usted puede facilmente:\n* Descargar documentos de todos sus proveedores\n* Establecer la frecuencia con la que Cozy recopilará sus facturas\n* Acceder directoamente a los documentos recopilados por su Cozy","changes":"Seguro ya se ha dado cuenta, el Store ha llegado a su Cozy\nAprovechamos para mejorar Collect:\n*Adaptación a Store.\n*Fusión de fichas: cuando se tienen diversas cuentas en un proveedor, la primera se fusiona baja la ficha del proveedor.\n*Mejora de algunas páginas de Conectores."},"add_service":"Añadir","fix_konnector_error":"Fix now","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Opcional)","title":"Conecte su cuenta %{name} ","data":{"title":"Datos recopilados:","service":{"description":"Descripción del servicio:"}},"tabs":{"sync":"sincronización","account":"cuenta","data":"datos recopilados"}},"disconnect":{"title":"Desconexión","description":"Usted se desconectará de esta cuenta, pero se guardarán los datos importados"},"form":{"title":"Cuenta","label":{"firstname":"Nombre","lastname":"Apellido","login":"Login","consumerKey":"Clave del usuario","consumerSecret":"Secreto del usuario","appKey":"Clave de la aplicación","appSecret":"Secreto de la aplicación","tricountUrl":"URL Tricount","cardNumber":"Número de tarjeta","dob":"Fecha de nacimiento","password":"Contraseña","email":"Email","bank_identifier":"Identificante bancario (opcional)","profileName":"Nombre del perfil","identifier":"Identificador","new_identifier":"Identificador","secret":"Contraseña","answer":"Respuesta secreta","access_token":"Token de acceso","accessTokenSecret":"Token de acceso secreto","apikey":"Clave Api","phoneNumber":"Número de teléfono","folderPath":"Ruta de la carpeta","namePath":"Nombre de la carpeta","authCode":"Código de autorización","accountName":"Nombre de la cuenta","loginUrl":"URL de acceso","token":"Token","agreement":"Acepto","refreshToken":"Recargar el token","timeout":"Retardo (ms)","branchName":"Oficina","code":"Código confidencial"},"placeholder":{"password":"La contraseña que usted usa para acceder al servicio","update_password":"Actualizar la contraseña","accountName":"Ejemplo: Cuenta personal","namePath":"Ejemplo: Facturas de Camille. La ruta de nombre predeterminado es su login."},"button":{"connect":"Conectar","cancel":"Cancelar","save":"Guardar","disconnect":"Desconectar esta cuenta","delete":"Borrar esta cuenta","advanced":"Opciones avanzadas","synchronize":"Sincronizar ahora"}},"folder":{"title":"Configuración de carpetas relacionadas","withoutSettings":{"title":"Carpeta relacionada"},"link":"Abrir la carpeta en Cozy Drive","changePath":"cambiar la ruta de acceso","error":"Oops, algo salió mal. No se asuste, sus archivos siguen ahí, por favor vuelva a intentarlo más tarde.","close":"cerrar","warning":"Usted cambia su ruta de acceso","oldFiles":"Todas sus facturas serán trasladadas a su nueva ruta de acceso","newFiles":"Sus nuevas facturas serán descargadas a su nueva ruta de acceso","newPath":"Todo salió bien, el nuevo camino de acceso para su cuenta %{name} es:","placeholder":{"administrative":"Administrativa","photos":"Fotos"}},"success":{"title":{"connect":"Configuración correcta!","update":"¡Su cuenta %{name} ha sido actualizada!"},"banksLinkText":"Ver mis cuentas en %{appName}","driveLinkText":"Abrir la carpeta en Cozy Drive","button":"Cerrar"},"message":{"folder":{"title":"Carpeta","link":"Abrir la carpeta en Cozy Drive"},"success":{"connect":"Sus datos estarán disponibles en su Cozy en pocos minutos y a partir de ese momento, los siguientes lo estarán automáticamente.","update":"¡Su cuenta %{name} ha sido actualizada exitosamente.","delete":"Cuenta suprimida exitosamente."},"syncing":{"bill":"Sus facturas están sincronizándose y estarán disponibles en la siguiente dirección:"},"synced":{"title":"Sincronización de sus datos","cron":"Frecuencia de sincronización: %{frequency}","cron_hourly":"cada hora","cron_daily":"una vez por día","cron_weekly":"una vez por semana","cron_monthly":"una vez por mes","cron_undefined":"manualmente","syncing":"ejecutándose...","unknown":"desconocido","last_sync":"Última sincronización: **%{date}**","date_format":"MMMM D[,] YYYY [a las] HH[:]mm","bill":"Encuentre sus datos en la aplicación Drive en este sitio:"},"error":{"server":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?","bad_credentials":"Lo siento, uste ha escrito un login o una contraseña incorrectos.","delete":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?"}},"forceConnection":"Vuelva a ejecutar","editor_detail":"Servicio desarrolado por %{editor}"},"account_picker":{"add_account_button":{"label":"Añadir una cuenta"}},"apps":{"title":"Mis apps"},"connection":{"CTA":{"twofa_failed":"Vuelva a ejecutar"},"error":{"default":{"title":"Ha ocurrido un error","description":"Desafortunadamente, algo salió mal al intentar conectar con %{name}. Por favor, controle otra vez la información de su cuenta, visite nuestra ayuda en línea o contáctenos en contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"El amacenamiento de Cozy está lleno","description":"Este servicio no puede recuperar sus documentos ahora. Por favor, borre algunos archivos o vaya a \"Ajustes > Almacenamiento** para obtener más espacio libre."},"CHALLENGE_ASKED":{"title":"Se requiere Challenge","description":"Parece que el sitio web requiere un segundo factor de autenticación que aún no está disponible. Puede intentar resolver el problema en el sitio web[%{name}](%{link}) antes de volver a intentarlo."},"LOGIN_FAILED":{"title":"Malas credenciales","description":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Secreto exigido","description":"Se debe llenar un campo adicional antes de controlar sus credenciales."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Bloqueado temporalmente","description":"Se hicieron demasiados intentos. Por favor, actualice sus credenciales en el sitio web[%{name}](%{link}) y actualice el conector más tarde."},"MAINTENANCE":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible o que el konnector debe actualizarse. Vuelva a ejecutar el conector más tarde o visite nuestra ayuda en línea."},"NOT_EXISTING_DIRECTORY":{"title":"Falta la carpeta de destino","description":"Parece que la carpeta de destino de esta cuenta ha sido borrada. Por favor desconéctese de la cuenta, restáurela y vuelva a conectarse."},"UNKNOWN_ERROR":{"title":"Error de conexión","description":"Ha ocurrido un error no identificado."},"USER_ACTION_NEEDED":{"title":"Acción necesaria con el proveedor","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y realice una acción específica. Vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Se requiere volver a acceder","description":"El servicio [%{name}](%{link}) requiere que usted vuelva a acceder. Por favor desconecte y reconecte su cuenta %{name} a esta aplicación. No se perderá ningún dato."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Cuenta no disponible","description":"Parece que su cuenta no está activa. Compruebe su cuenta en[%{name}](%{link}) antes de volver a intentarlo."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Se requiere actualizar la contraseña","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y actualice su contraseña. Por favor, vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Se necesitan nuevos permisos de validación","description":"Su conector fue actualizado y los permisos cambiados. Por favor, valídelos antes de volver a lanzar el conector."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relanzar la conexión al servicio para recuperar sus datos","description":"La última conexión al servicio ha fallado; por favor, láncela de nuevo. Es posible que tenga que proporcionar un código de validación."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Código suministrado para dos factores es equivocado","description":"El código para dos factores suministrado esta errado, ensaye de nuevo por favor."},"VENDOR_DOWN":{"title":"Servicio no disponible","description":"Parece que el servicio[%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.BANK_DOWN":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Servicio no disponible","description":"Parece que en este momento estamos experimentando una sobrecarga con nuestros conectores bancarios. Por favor, vuelva a ejecutar el conector más tarde."}}},"intent":{"konnector":{"install":{"error":{"message":"Este conector no se puede instalar"}}},"service":{"return":"Volver a la lista de conectores","success":{"button":{"label":"Cerrar"}},"error":{"initialization":"El servicio ha fallado al inicializarse. Sentimos los inconvenientes.","creation":"Imposible crear una cuenta, ha ocurrido un error.","cause":"Causa: %{error}"},"cancel":"Cancelar","terminate":"Terminar"}},"field":{"password":{"visibility":{"hide":"Ocultar","show":"Mostrar","title":{"hide":"Ocultar la contraseña","show":"Mostrar la contraseña"}}}},"nav":{"services":"Servicios instalados"},"category":{"all":"Todo","banking":"Bancos","health":"Salud","insurance":"Seguros","transport":"Transporte","social":"Social","isp":"PSI","telecom":"Telecom","energy":"Energía","host_provider":"Huesped","productivity":"Productividad","shopping":"Compras","public_service":"Servicios Públicos","other":"Otros"},"loading":{"initial":"Cargando cuentas...","working":"Cargando"},"validation":{"exact_length":"Debe estar compuesto de %{length} caracteres exactamente.","max_length":"La longitud máxima es de %{length}  caracteres.","min_length":"Debe contener al menos %{length} caracteres.","pattern":"El valor debe coincidir con un patrón específico: %{pattern}.\n"},"update":{"title":"Está disponible una actualización de este servicio.","regular":"Actualice esta versión para seguir obteniendo sus datos y disponer de las últimas mejoras.","blocking":"Actualícela para seguir obteniendo sus datos","CTA":"Actualizar"},"error":{"initial":"Algo ocurrió al recolectar sus colectores y sus datos. por favor, vuelva a cargar la página.","LOGIN_FAILED":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo.","UNKNOWN_ERROR":"Algo inesperado ha ocurrido al ejecutar el conector","JOB_TIMEOUT":"La ejecución del conector ha tardado mucho","button":{"reload":"Volver a cargar la página ahora"}},"tutorial":{"cozy_collect":{"title":"Automatice la recolección de sus datos","text":"Ellos serán almacenados en su Cozy, usted no tendrá que buscarlos en parte alguna.","button":"Siguiente"},"home":{"apps":{"button":"Siguiente","text":"Organice facilmente su vida numérica (archivos, imágenes, cuentas de banco, ...)","title":"Acceda a todas sus aplicaciones Cozy"},"services":{"button":"Configurar mis cuentas","text":"Ellos serán almacenados en su Cozy, usted no tendrá que buscarlos en parte alguna.","title":"Automatice la recolección de sus datos"}},"menu_apps":{"title":"Su Cozy es mucho más que un simple agregador de datos","text":"Abra el menú de Aplicaciones para descubrir las características que Cozy puede ofrecerle.","button":"Descubrir mis aplicaciones"}},"maintenance":{"icon":"Este conector está en mantenimiento","service":"Servicio interrumpido","problem":"%{konnectorName} no permite que su Cozy acceda a sus datos","title":"¿Qué sucede?"},"connector":{"debug":{"successMessage":"Este konnector es sólo para fines de debug, este es un mensaje habitual adicional de éxito."},"empty":{"title":"¡Empiece a recopilar sus datos!","text":"Sincronice sus cuentas con su Cozy para recuperar automáticamente sus datos (facturas, reembolsos, gastos...)"},"silenced":"%{name} no se sugerirá más. Siempre puede encontrar un proveedor haciendo clic en el botón \"Añadir\".","noAccount":"Cuenta inexistente","add":"Añadir un servicio","update":"Actualización disponible","logo":{"alt":"%{name} logo\n"},"enedis":{"description":{"service":"Recupere sus datos de Linky conectandose a su cuenta de Enedis. Debe tener un medidor Linky y haber creado antes su cuenta de Enedis [en el sitio web de Enedis] (https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Fing proporciona este conector para el proyecto MesInfos. Recupera los datos de su contrato de electricidad y descarga su consumo de electricidad del día anterior. Este conector se ejecuta en su Cozy y Fing no tendrá acceso a estos datos."}},"orange":{"message":{"delay":"Una vez conectado, se envía al sistema de información de Orange una solicitud para extraer sus datos. Estos datos son válidos durante 15 días. Sus datos se actualizan automáticamente cada quince días."}},"orangemobile":{"description":{"connector":"En el contexto de 'MesInfos', Orange le permite localizar permanentemente su teléfono.\n\n**La recopilación de datos exige su acuerdo previo**\n\nHaciendo clic en \"Apruebo\", usted consiente que se recopile la posición de su teléfono, cada 30 minutos. La información recopilada será la siguiente:\nFecha y hora de la ubicación.\nDatos de la ubicación de la antena más cercana en el momento de la recopimación.\nLos datos recopilados por Orange después de su aceptación estarán disponibles sólo en el Cozy que usted ha asignado en el contexto de 'MesInfos'. Se añadirán a sus datos de ubicación almacenados en su registro de llamadas.","service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente los registros de llamadas de su teléfono. Estos registros de llamadas incluyen su número de teléfono, el número de teléfono de su corresponsal, fecha, duración de la llamada  y datos sobre la localización de la antena radio más cercana en el momento de la recopilación.\n\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \"Mapeando Mi Vida\" (pronto disponible en el Cozy Store).","field":{"agreement":"¿En el contexto de \"Mes infos\", aprueba usted que Orange localice regularmente su teléfono ?"}}},"orangevideos":{"description":{"service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente la lista de las películas que usted ha descargado gratis (TV Replay) o pagando VOD desde em 01/01/2015 (no se incluyen películos con contenido para adultos°.\\n\\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \"My Movies Music\" (pronto disponible en el Cozy Store)."}},"axabanque102":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo).","connector":"La respuesta secreta es [pregunta por HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) cuando usted se conecta sin doble autenticación. Ejemplo: ¿Cómo se llama su mascota?"}},"ingdirect95":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Sincronizando cuentas","header_mobile":"%{done} de %{total}","header_done":"Sincronizado %{done}  de %{total}","item":{"pending":"Pendiente"},"close":"Cerrar"},"services":{"title":"Servicios instalados"},"status":{"interrupted":"SEVICIO INTERRUMPIDO","edf":{"maintenance":"El sistema de información de EDF ha cambiado y el acceso a los datos relacionados no funciona. Este konnector no puede recuperar actualmente sus datos de EDF. Estamos tratando de restaurar la situación y le notificaremos cuando se arregle. [Más información en](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"DD MMM"}}}};

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

const DOCTYPE = 'io.cozy.triggers';
const triggersCollectionKey = 'triggers'; // CRUD action creators

const fetchTriggers = () => redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["fetchTriggers"](triggersCollectionKey, 'konnector'); // selectors

const getKonnectorTriggers = (state, konnector, existingAccountIds = []) => {
  return !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]).filter(trigger => {
    return trigger.worker === 'konnector' && trigger.message && trigger.message.konnector === konnector.slug && trigger.message.account && existingAccountIds.includes(trigger.message.account);
  }) || [];
};
const getTrigger = (state, id) => !!state.documents && !!state.documents[DOCTYPE] && state.documents[DOCTYPE][id];

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

const DOCTYPE = 'io.cozy.jobs'; // CRUD

const fetchKonnectorJobs = () => {}; // selectors

const getTriggerLastJob = (state, trigger) => {
  // state is state.cozy
  if (!state.documents || !state.documents[DOCTYPE] || !trigger) return null;
  return Object.values(state.documents[DOCTYPE]).reduce((lastestJob, currentJob) => {
    if (currentJob.trigger_id !== trigger._id) return lastestJob;
    if (!lastestJob) return currentJob;
    return date_fns__WEBPACK_IMPORTED_MODULE_0___default.a.isAfter(currentJob.started_at, lastestJob.started_at) ? currentJob : lastestJob;
  }, null);
};
const isJobRunning = (state, job) => !!job && ['queued', 'running'].includes(job.state);

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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const START_SYNC = 'START_SYNC';
const START_DOCTYPE_SYNC = 'START_DOCTYPE_SYNC';
const SYNC_DOCTYPE_OK = 'SYNC_DOCTYPE_OK';
const SYNC_DOCTYPE_ERROR = 'SYNC_DOCTYPE_ERROR';
const doctypeSyncInitialState = {
  syncStatus: 'pending',
  lastSync: null,
  seqNumber: 0
};

const doctypeSync = (state = doctypeSyncInitialState, action) => {
  switch (action.type) {
    case START_DOCTYPE_SYNC:
      return _objectSpread({}, state, {
        syncStatus: 'syncing',
        seqNumber: action.seqNumber
      });

    case SYNC_DOCTYPE_OK:
      return _objectSpread({}, state, {
        syncStatus: 'done',
        lastSync: Date.now()
      });

    case SYNC_DOCTYPE_ERROR:
      return _objectSpread({}, state, {
        syncStatus: 'error',
        lastSync: Date.now()
      });

    default:
      return state;
  }
};

const synchronization = (state = {}, action) => {
  switch (action.type) {
    case START_DOCTYPE_SYNC:
    case SYNC_DOCTYPE_OK:
    case SYNC_DOCTYPE_ERROR:
      return _objectSpread({}, state, {
        [action.doctype]: doctypeSync(state[action.doctype], action)
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (synchronization);
const startSync = () => async dispatch => {
  return dispatch({
    type: START_SYNC,
    promise: client => client.startSync(dispatch)
  });
};
const startDoctypeSync = (doctype, seqNumber = 0) => ({
  type: START_DOCTYPE_SYNC,
  doctype,
  seqNumber
});
const syncDoctypeOk = (doctype, infos) => ({
  type: SYNC_DOCTYPE_OK,
  doctype,
  infos
});
const syncDoctypeError = (doctype, error) => ({
  type: SYNC_DOCTYPE_ERROR,
  doctype,
  error
});
const isFirstSync = state => {
  const seqNumbers = Object.keys(state.cozy.synchronization).map(doctype => state.cozy.synchronization[doctype].seqNumber);
  return seqNumbers.every(number => number === 0);
};
const isSynced = state => {
  const timestamps = Object.keys(state.cozy.synchronization).map(doctype => state.cozy.synchronization[doctype].lastSync);
  return timestamps.every(ts => ts !== null);
};

/***/ }),

/***/ "u5EB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("sCMN");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4P+e");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4__);
/* global cozy */





var BanksLink = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(function (_ref) {
  var banksUrl = _ref.banksUrl,
      t = _ref.t;
  return banksUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_1__["default"], {
    slug: "banks",
    href: banksUrl
  }, function (_ref2) {
    var href = _ref2.href,
        onClick = _ref2.onClick,
        name = _ref2.name;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4___default.a['col-account-success-link'],
      href: href,
      target: "_top",
      onClick: onClick
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "u-mr-half",
      icon: "openwith"
    }), t('account.success.banksLinkText', {
      appName: name
    }));
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4___default.a['col-account-success-link'],
    onClick: function onClick() {
      return cozy.client.intents.redirect('io.cozy.apps', {
        slug: 'banks'
      }, function (url) {
        window.top.location.href = url;
      });
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "u-mr-half",
    icon: "openwith"
  }), t('account.success.banksLinkText'));
});
/* harmony default export */ __webpack_exports__["default"] = (BanksLink);

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
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m+TH");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const DOCTYPE = 'io.cozy.konnectors';
const konnectorsCollectionKey = 'konnectors'; // CRUD

const fetchKonnectors = () => redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["fetchKonnectors"](konnectorsCollectionKey); // Action creators

const receiveInstalledKonnector = konnector => {
  const normalized = _objectSpread({}, konnector, konnector.attributes, {
    id: `${DOCTYPE}/${konnector.slug}`,
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

const getKonnector = (state, slug) => {
  return !!state.documents && !!state.documents[DOCTYPE] && state.documents[DOCTYPE][`${DOCTYPE}/${slug}`];
};
const getInstalledKonnectors = state => !!state.documents && !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]);
const getIndexedKonnectors = state => !!state.documents && !!state.documents[DOCTYPE] && Object.keys(state.documents[DOCTYPE]).reduce((indexed, key) => {
  const konnector = state.documents[DOCTYPE][key];
  indexed[konnector.slug] = konnector;
  return indexed;
}, {});
const getSlugs = state => !!state && !!state.documents && !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]).map(konnector => konnector.slug);

/***/ }),

/***/ "vL8P":
/***/ (function(module, exports) {

module.exports = "/img/connecting-data-in-progress.svg";

/***/ }),

/***/ "vwW3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const cozyMiddleware = client => ({
  dispatch
}) => {
  return next => action => {
    const {
      promise,
      type,
      types
    } = action,
          rest = _objectWithoutProperties(action, ["promise", "type", "types"]);

    if (!promise) {
      return next(action);
    }

    if (!type && !types) {
      return promise(client).then(action => dispatch(action));
    }

    if (type) {
      return promise(client).then(response => {
        next(_objectSpread({}, rest, {
          response,
          type
        }));
        return response;
      });
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next(_objectSpread({}, rest, {
      type: REQUEST
    }));
    return promise(client).then(response => {
      next(_objectSpread({}, rest, {
        response,
        type: SUCCESS
      }));
      return response;
    }, error => {
      console.log(error); // eslint-disable-line no-console

      next(_objectSpread({}, rest, {
        error,
        type: FAILURE
      }));
    }).catch(error => {
      console.error('MIDDLEWARE ERROR:', error); // eslint-disable-line no-console

      next(_objectSpread({}, rest, {
        error,
        type: FAILURE
      }));
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (cozyMiddleware);

/***/ }),

/***/ "wiYS":
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
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("eO8H");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("buk/");
/* harmony import */ var components_KonnectorInstall__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("+NZW");
/* harmony import */ var components_KonnectorMaintenance__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("Lo76");
/* harmony import */ var components_Banners_UpdateMessage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("bECI");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("4YEU");
/* harmony import */ var lib_konnectors__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("8CvS");
/* harmony import */ var styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("gwpp");
/* harmony import */ var styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16__);


















var AccountConnection =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(AccountConnection, _Component);

  function AccountConnection(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AccountConnection);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(AccountConnection).call(this, props, context));
    _this.store = context.store;
    _this.state = {
      isFetching: false,
      maintenance: props.maintenance && props.maintenance[props.konnector.slug]
    };
    _this.handleLoginSuccess = _this.handleLoginSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.handleError = _this.handleError.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.handleDeleteSuccess = _this.handleDeleteSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AccountConnection, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.error) this.handleError({
        message: this.props.error
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          success = _this$props.success,
          queued = _this$props.queued;
      var connectionError = this.state.connectionError;
      var succeed = !prevProps.success && success;
      var loginSucceed = !prevProps.queued && queued;

      if (succeed || loginSucceed) {
        // we reset the error in case of persisted errors
        if (succeed && connectionError) this.setState({
          connectionError: null
        });
        this.props.handleConnectionSuccess();
      }
    }
  }, {
    key: "handleLoginSuccess",
    value: function handleLoginSuccess(trigger) {
      var _this$props2 = this.props,
          enqueueConnection = _this$props2.enqueueConnection,
          handleConnectionSuccess = _this$props2.handleConnectionSuccess;
      handleConnectionSuccess();
      enqueueConnection(trigger);
    }
  }, {
    key: "handleDeleteSuccess",
    value: function handleDeleteSuccess() {
      this.setState({
        submitting: false
      });
      this.props.handleDeleteSuccess();
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.setState({
        submitting: false,
        connectionError: error.message
      });
    }
  }, {
    key: "buildSuccessMessages",
    value: function buildSuccessMessages(konnector) {
      var t = this.props.t;
      var messages = [t('account.message.success.connect', {
        name: konnector.name
      })];

      if (konnector.additionnalSuccessMessage && konnector.additionnalSuccessMessage.message) {
        messages.push(t(konnector.additionnalSuccessMessage.message));
      }

      return messages;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          createdAccount = _this$props3.createdAccount,
          handleConnectionSuccess = _this$props3.handleConnectionSuccess,
          konnector = _this$props3.konnector,
          error = _this$props3.error,
          onCancel = _this$props3.onCancel,
          onDone = _this$props3.onDone,
          queued = _this$props3.queued,
          t = _this$props3.t,
          lang = _this$props3.lang,
          success = _this$props3.success,
          successButtonLabel = _this$props3.successButtonLabel;
      var _this$state = this.state,
          connectionError = _this$state.connectionError,
          oAuthError = _this$state.oAuthError,
          maintenance = _this$state.maintenance;
      var successMessages = success || queued ? this.buildSuccessMessages(konnector) : [];
      var konnectorError = error || oAuthError || connectionError;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16___default.a['col-account-connection']
      }, !!konnector.available_version && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Banners_UpdateMessage__WEBPACK_IMPORTED_MODULE_13__["default"], {
        konnector: konnector,
        error: konnectorError,
        isBlocking: Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_15__["isKonnectorUpdateNeededError"])(konnectorError)
      }), maintenance ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_KonnectorMaintenance__WEBPACK_IMPORTED_MODULE_12__["default"], {
        maintenance: maintenance,
        lang: lang,
        konnectorName: konnector.name
      }) : react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_KonnectorInstall__WEBPACK_IMPORTED_MODULE_11__["default"], {
        account: createdAccount,
        connector: konnector,
        onCancel: onCancel,
        onDone: onDone,
        onLoginSuccess: this.handleLoginSuccess,
        onSuccess: handleConnectionSuccess,
        legacySuccess: success || queued,
        successMessage: t('account.success.title.connect'),
        successButtonLabel: successButtonLabel,
        successMessages: successMessages
      }));
    }
  }]);

  return AccountConnection;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

AccountConnection.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    success: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["isConnectionConnected"])(state.connections, ownProps.trigger),
    error: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["getConnectionError"])(state.connections, ownProps.trigger),
    queued: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["isConnectionEnqueued"])(state.connections, ownProps.trigger)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    enqueueConnection: function enqueueConnection(trigger) {
      return dispatch(Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["enqueueConnection"])(trigger));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["withRouter"])(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__["translate"])()(AccountConnection))));

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

/***/ "zlKK":
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
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var components_services_CreateAccountService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Go3M");
/* harmony import */ var components_KonnectorHeaderIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("gAos");












var CreateAccountIntent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CreateAccountIntent, _Component);

  function CreateAccountIntent(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CreateAccountIntent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(CreateAccountIntent).call(this, props, context));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "handleConnectionSuccess", function () {
      _this.setState({
        isSuccess: true
      });
    });

    _this.store = context.store;
    _this.state = {
      isSuccess: false
    };

    _this.store.fetchUrls();

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CreateAccountIntent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          konnector = _this$props.konnector,
          _onCancel = _this$props.onCancel,
          onTerminate = _this$props.onTerminate;
      var isSuccess = this.state.isSuccess;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "col-create-account-intent"
      }, !isSuccess && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_KonnectorHeaderIcon__WEBPACK_IMPORTED_MODULE_10__["default"], {
        konnector: konnector,
        center: true
      }), konnector && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_services_CreateAccountService__WEBPACK_IMPORTED_MODULE_9__["default"], {
        konnector: konnector,
        onCancel: function onCancel() {
          return _onCancel();
        },
        onSuccess: onTerminate,
        handleConnectionSuccess: this.handleConnectionSuccess
      }));
    }
  }]);

  return CreateAccountIntent;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

CreateAccountIntent.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (CreateAccountIntent);

/***/ })

/******/ });
//# sourceMappingURL=home.js.map