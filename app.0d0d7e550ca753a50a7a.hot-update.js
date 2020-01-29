webpackHotUpdate("app",{

/***/ "bRzR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toFlagNames", function() { return toFlagNames; });
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










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
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

var _default = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["withRouter"])(Object(components_appEntryPoint__WEBPACK_IMPORTED_MODULE_22__["default"])(App));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(IDLE, "IDLE", "/Users/cozy/code/cozy/cozy-home/src/containers/App.jsx");
  reactHotLoader.register(FETCHING_CONTEXT, "FETCHING_CONTEXT", "/Users/cozy/code/cozy/cozy-home/src/containers/App.jsx");
  reactHotLoader.register(toFlagNames, "toFlagNames", "/Users/cozy/code/cozy/cozy-home/src/containers/App.jsx");
  reactHotLoader.register(App, "App", "/Users/cozy/code/cozy/cozy-home/src/containers/App.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/containers/App.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ })

})
//# sourceMappingURL=app.0d0d7e550ca753a50a7a.hot-update.js.map