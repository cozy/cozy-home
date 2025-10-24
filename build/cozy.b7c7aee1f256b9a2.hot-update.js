"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
"./node_modules/cozy-search/dist/stylesheet.css": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1761295114498
        var cssReload = (__webpack_require__("./node_modules/@rspack/core/dist/cssExtractHmr.js")/* .cssReload */.cssReload)(module.id, {});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

}),
"./node_modules/cozy-search/dist/components/AssistantDesktop.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__("./node_modules/prop-types/index.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _useExtendI18n = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/useExtendI18n.js"));

var _AssistantProvider = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js"));

var _SearchBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchBar.js"));

var _SearchProvider = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js"));

var _locales = __webpack_require__("./node_modules/cozy-search/dist/locales/index.js");

var AssistantDesktop = function AssistantDesktop(_ref) {
  var componentsProps = _ref.componentsProps,
      _ref$searchOptions = _ref.searchOptions,
      searchOptions = _ref$searchOptions === void 0 ? {} : _ref$searchOptions;
  (0, _useExtendI18n.default)(_locales.locales);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "u-mh-auto u-w-100 u-maw-100"
  }, /*#__PURE__*/_react.default.createElement(_AssistantProvider.default, null, /*#__PURE__*/_react.default.createElement(_SearchProvider.default, {
    searchOptions: searchOptions
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, {
    componentsProps: componentsProps
  }))));
};

AssistantDesktop.propTypes = {
  componentsProps: _propTypes.default.shape({
    SearchBarDesktop: _propTypes.default.shape({
      elevation: _propTypes.default.number,
      size: _propTypes.default.string,
      hasHalfBorderRadius: _propTypes.default.bool,
      className: _propTypes.default.string,
      disabledHover: _propTypes.default.bool
    })
  })
};
var _default = AssistantDesktop;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/AssistantIcon/ExpertIcon.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ExpertIcon = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var ExpertIcon = function ExpertIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
    viewBox: "0 0 24 24",
    fill: "none"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M15.088 18.923a.62.62 0 0 1 .504.159l.72.676L15.096 23l-.785-1.626-1.68.758 1.14-3.03zm3.824 0 1.361.186a.6.6 0 0 0 .284-.03l1.15 3.053-1.682-.758L19.242 23l-1.307-3.477.473-.441a.62.62 0 0 1 .504-.16M16.58 9.164a.62.62 0 0 1 .84 0l.719.673a.62.62 0 0 0 .505.16l.989-.138a.604.604 0 0 1 .68.479l.171.952c.033.177.148.33.312.415l.883.453c.287.148.402.49.26.774l-.439.868a.57.57 0 0 0 0 .513l.439.869a.577.577 0 0 1-.26.773l-.883.453a.59.59 0 0 0-.312.416l-.172.952a.603.603 0 0 1-.68.478l-.988-.135a.62.62 0 0 0-.505.157l-.718.673a.62.62 0 0 1-.84 0l-.72-.673a.62.62 0 0 0-.504-.157l-.988.135a.603.603 0 0 1-.68-.478l-.173-.952a.59.59 0 0 0-.312-.416l-.883-.453a.577.577 0 0 1-.26-.773l.439-.869a.57.57 0 0 0 0-.513l-.438-.868a.577.577 0 0 1 .26-.774l.882-.453a.59.59 0 0 0 .312-.415l.172-.952a.604.604 0 0 1 .681-.479l.988.137a.62.62 0 0 0 .504-.16zM11.022 13q.037.236.148.462l.316.64-.316.642a1.66 1.66 0 0 0 .717 2.198l.637.338.125.705c.036.2.107.384.204.55l-.171.465H3v-2c0-2.21 3.58-4 8-4zM17 10.886c-1.81 0-3.278 1.42-3.278 3.17 0 1.752 1.468 3.173 3.278 3.173 1.81-.001 3.277-1.421 3.277-3.172s-1.467-3.17-3.277-3.171m-.346 1.026c.109-.323.582-.323.69 0l.31.922a.36.36 0 0 0 .344.243h1.002c.351 0 .497.434.214.634l-.81.57a.35.35 0 0 0-.134.393l.311.92c.108.324-.274.594-.559.394l-.81-.57a.37.37 0 0 0-.426 0l-.81.57c-.285.2-.668-.07-.559-.393l.31-.921a.35.35 0 0 0-.132-.394l-.81-.57c-.284-.199-.138-.633.213-.633h1.002a.36.36 0 0 0 .345-.243zM11 3a4 4 0 0 1 3.536 5.866h-.01a1.67 1.67 0 0 0-1.84 1.197l-.004.012-.003.013-.025.112-.003.01-.002.013-.08.455A3.996 3.996 0 0 1 7 7a4 4 0 0 1 4-4"
  }));
};

exports.ExpertIcon = ExpertIcon;

}),
"./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIconColor.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TwakeAssistantIconColor = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var React = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TwakeAssistantIconColor = function TwakeAssistantIconColor(props) {
  return /*#__PURE__*/React.createElement("svg", (0, _extends2.default)({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    viewBox: "0 0 18 18"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "#4A1616",
    d: "M7.452 11.623a1.5 1.5 0 0 0-1.078-1.077L1.773 9.359a.375.375 0 0 1 0-.722l4.6-1.187a1.5 1.5 0 0 0 1.079-1.077l1.186-4.601a.375.375 0 0 1 .722 0l1.186 4.601a1.5 1.5 0 0 0 1.078 1.078l4.601 1.186a.375.375 0 0 1 0 .723l-4.601 1.186a1.5 1.5 0 0 0-1.078 1.077L9.36 16.225a.375.375 0 0 1-.723 0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "url(#a)",
    d: "M7.452 11.623a1.5 1.5 0 0 0-1.078-1.077L1.773 9.359a.375.375 0 0 1 0-.722l4.6-1.187a1.5 1.5 0 0 0 1.079-1.077l1.186-4.601a.375.375 0 0 1 .722 0l1.186 4.601a1.5 1.5 0 0 0 1.078 1.078l4.601 1.186a.375.375 0 0 1 0 .723l-4.601 1.186a1.5 1.5 0 0 0-1.078 1.077L9.36 16.225a.375.375 0 0 1-.723 0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "url(#b)",
    d: "M7.452 11.623a1.5 1.5 0 0 0-1.078-1.077L1.773 9.359a.375.375 0 0 1 0-.722l4.6-1.187a1.5 1.5 0 0 0 1.079-1.077l1.186-4.601a.375.375 0 0 1 .722 0l1.186 4.601a1.5 1.5 0 0 0 1.078 1.078l4.601 1.186a.375.375 0 0 1 0 .723l-4.601 1.186a1.5 1.5 0 0 0-1.078 1.077L9.36 16.225a.375.375 0 0 1-.723 0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#4A1616",
    d: "M14.998 1.682c.316 0 .571.256.571.572v.928h.929a.572.572 0 0 1 0 1.143h-.929v.929a.572.572 0 0 1-1.143 0v-.929h-.928a.572.572 0 0 1 0-1.143h.928v-.928c0-.316.256-.572.572-.572"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "url(#c)",
    d: "M14.998 1.682c.316 0 .571.256.571.572v.928h.929a.572.572 0 0 1 0 1.143h-.929v.929a.572.572 0 0 1-1.143 0v-.929h-.928a.572.572 0 0 1 0-1.143h.928v-.928c0-.316.256-.572.572-.572"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "url(#d)",
    d: "M14.998 1.682c.316 0 .571.256.571.572v.928h.929a.572.572 0 0 1 0 1.143h-.929v.929a.572.572 0 0 1-1.143 0v-.929h-.928a.572.572 0 0 1 0-1.143h.928v-.928c0-.316.256-.572.572-.572"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#4A1616",
    d: "M2.998 12.178c.315 0 .571.256.571.572v.178h.18a.572.572 0 0 1-.001 1.143H3.57v.179a.572.572 0 0 1-1.143 0v-.179h-.178a.572.572 0 0 1 0-1.143h.178v-.178c0-.316.256-.572.572-.572"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "url(#e)",
    d: "M2.998 12.178c.315 0 .571.256.571.572v.178h.18a.572.572 0 0 1-.001 1.143H3.57v.179a.572.572 0 0 1-1.143 0v-.179h-.178a.572.572 0 0 1 0-1.143h.178v-.178c0-.316.256-.572.572-.572"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "url(#f)",
    d: "M2.998 12.178c.315 0 .571.256.571.572v.178h.18a.572.572 0 0 1-.001 1.143H3.57v.179a.572.572 0 0 1-1.143 0v-.179h-.178a.572.572 0 0 1 0-1.143h.178v-.178c0-.316.256-.572.572-.572"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "a",
    x1: 16.5,
    x2: 1.5,
    y1: 10.248,
    y2: 10.248,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: 0.13,
    stopColor: "#A033FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.61,
    stopColor: "#0094FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 1,
    stopColor: "#4FB500"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "b",
    x1: 8.375,
    x2: 3.687,
    y1: 6.186,
    y2: 15.56,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#FFD600",
    stopOpacity: 0
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.563,
    stopColor: "#FFC700"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "c",
    x1: 17.069,
    x2: 12.926,
    y1: 3.849,
    y2: 3.849,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: 0.13,
    stopColor: "#A033FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.61,
    stopColor: "#0094FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 1,
    stopColor: "#4FB500"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "d",
    x1: 14.825,
    x2: 14.704,
    y1: 3.539,
    y2: 4.416,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#FFD600",
    stopOpacity: 0
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.563,
    stopColor: "#FFC700"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "e",
    x1: 4.319,
    x2: 1.676,
    y1: 13.595,
    y2: 13.595,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: 0.13,
    stopColor: "#A033FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.61,
    stopColor: "#0094FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 1,
    stopColor: "#4FB500"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "f",
    x1: 2.887,
    x2: 2.703,
    y1: 13.285,
    y2: 14.139,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#FFD600",
    stopOpacity: 0
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.563,
    stopColor: "#FFC700"
  }))));
};

exports.TwakeAssistantIconColor = TwakeAssistantIconColor;

}),
"./node_modules/cozy-search/dist/components/AssistantMobile.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.AssistantMobile = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _classnames = _interopRequireDefault(__webpack_require__("./node_modules/classnames/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__("./node_modules/prop-types/index.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _Magnifier = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Magnifier.js"));

var _SearchBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/SearchBar/index.js"));

var _useExtendI18n = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/useExtendI18n.js"));

var _locales = __webpack_require__("./node_modules/cozy-search/dist/locales/index.js");

var styles = {
  "searchBarDesktop--result": "styles__searchBarDesktop--result___2bQQy",
  "suggestionsPlaceholder": "styles__suggestionsPlaceholder___y-vsv",
  "search-bar-icon": "styles__search-bar-icon___1affF"
};

var AssistantMobile = function AssistantMobile(_ref) {
  var componentsProps = _ref.componentsProps;
  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useLocation = (0, _reactRouterDom.useLocation)(),
      pathname = _useLocation.pathname;

  (0, _useExtendI18n.default)(_locales.locales);
  return /*#__PURE__*/_react.default.createElement(_SearchBar.default, (0, _extends2.default)({}, componentsProps === null || componentsProps === void 0 ? void 0 : componentsProps.SearchBar, {
    size: "medium",
    icon: /*#__PURE__*/_react.default.createElement(_Icon.default, {
      className: (0, _classnames.default)('u-ml-1 u-mr-half', styles['search-bar-icon']),
      icon: _Magnifier.default,
      size: 16
    }),
    type: "button",
    onClick: function onClick() {
      return navigate("connected/search?returnPath=".concat(pathname));
    } // FIXME this route is related to home app

  }));
};

exports.AssistantMobile = AssistantMobile;
AssistantMobile.propTypes = {
  componentsProps: _propTypes.default.shape({
    SearchBar: _propTypes.default.shape({
      className: _propTypes.default.string
    })
  })
};
var _default = AssistantMobile;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/AssistantProvider.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useAssistant = exports["default"] = exports.AssistantContext = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _set = _interopRequireDefault(__webpack_require__("./node_modules/lodash/set.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _useRealtime3 = _interopRequireDefault(__webpack_require__("./node_modules/cozy-realtime/dist/useRealtime.js"));

var _helpers = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");

var _queries = __webpack_require__("./node_modules/cozy-search/dist/components/queries.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var AssistantContext = /*#__PURE__*/_react.default.createContext();

exports.AssistantContext = AssistantContext;

var useAssistant = function useAssistant() {
  var context = (0, _react.useContext)(AssistantContext);

  if (!context) {
    throw new Error('useAssistant must be used within a AssistantProvider');
  }

  return context;
};

exports.useAssistant = useAssistant;

var AssistantProvider = function AssistantProvider(_ref) {
  var children = _ref.children;

  var _useParams = (0, _reactRouterDom.useParams)(),
      conversationId = _useParams.conversationId;

  var client = (0, _cozyClient.useClient)();

  var _useState = (0, _react.useState)({
    message: {},
    status: 'idle',
    messagesId: []
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      assistantState = _useState2[0],
      setAssistantState = _useState2[1];

  (0, _useRealtime3.default)(client, (0, _defineProperty2.default)({}, _queries.CHAT_CONVERSATIONS_DOCTYPE, {
    created: function created(res) {
      (0, _helpers.pushMessagesIdInState)(conversationId, res, setAssistantState);
    },
    updated: function updated(res) {
      (0, _helpers.pushMessagesIdInState)(conversationId, res, setAssistantState);
    }
  }), []);
  (0, _useRealtime3.default)(client, (0, _defineProperty2.default)({}, _queries.CHAT_EVENTS_DOCTYPE, {
    created: function created(res) {
      setAssistantState(function (prevState) {
        // to exclude realtime messages if not relevant to the actual conversation
        if (!(0, _helpers.isMessageForThisConversation)(res, prevState.messagesId)) {
          return prevState;
        }

        if (res.object === 'done') {
          if (prevState.status !== 'idle') {
            return _objectSpread(_objectSpread({}, prevState), {}, {
              status: 'idle'
            });
          }
        }

        if (res.object === 'delta') {
          var message = (0, _set.default)(prevState.message, res.position, res.content);
          return _objectSpread(_objectSpread({}, prevState), {}, {
            message: message,
            status: 'writing'
          });
        }

        return prevState;
      });
    }
  }), []);
  var clearAssistant = (0, _react.useCallback)(function () {
    return setAssistantState({
      message: {},
      status: 'pending',
      messagesId: []
    });
  }, []);
  var onAssistantExecute = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref2, callback) {
      var value, conversationId;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              value = _ref2.value, conversationId = _ref2.conversationId;

              if (value) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              callback === null || callback === void 0 ? void 0 : callback();
              clearAssistant();
              _context.next = 7;
              return client.stackClient.fetchJSON('POST', "/ai/chat/conversations/".concat(conversationId), {
                q: value
              });

            case 7:
              setAssistantState(function (v) {
                return _objectSpread(_objectSpread({}, v), {}, {
                  status: 'pending'
                });
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }(), [client, clearAssistant]);
  var value = (0, _react.useMemo)(function () {
    return {
      assistantState: assistantState,
      setAssistantState: setAssistantState,
      clearAssistant: clearAssistant,
      onAssistantExecute: onAssistantExecute
    };
  }, [assistantState, clearAssistant, onAssistantExecute]);
  return /*#__PURE__*/_react.default.createElement(AssistantContext.Provider, {
    value: value
  }, children);
};

var _default = /*#__PURE__*/_react.default.memo(AssistantProvider);

exports["default"] = _default;

}),

});
//# sourceMappingURL=cozy.b7c7aee1f256b9a2.hot-update.js.map