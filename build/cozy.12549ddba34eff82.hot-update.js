"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
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
"./node_modules/cozy-search/dist/components/AssistantIcon/KnowledgeBaseIcon.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KnowledgeBaseIcon = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var KnowledgeBaseIcon = function KnowledgeBaseIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
    viewBox: "0 0 24 24",
    fill: "none"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M12 18.91c-2.013 0-4.284-.466-6.074-1.245-.657-.289-1.22-.756-1.679-1.125a.15.15 0 0 0-.161-.016.16.16 0 0 0-.063.06.17.17 0 0 0-.023.084v.505c0 1.128.903 2.139 2.544 2.846C8.01 20.652 9.949 21 12 21s3.989-.348 5.456-.981C19.096 19.313 20 18.3 20 17.173v-.505q0-.046-.023-.085a.16.16 0 0 0-.063-.06.15.15 0 0 0-.161.017c-.46.369-1.022.836-1.68 1.125-1.79.78-4.06 1.246-6.073 1.246m8-12.113c-.031-1.11-.93-2.105-2.538-2.806C15.99 3.352 14.052 3 12 3s-3.99.352-5.458.99c-1.607.7-2.506 1.693-2.539 2.8L4 7.5c0 .258.2.662.563.994.428.39 1.063.776 1.837 1.114 1.648.719 3.741 1.146 5.6 1.146s3.952-.429 5.6-1.148c.774-.337 1.41-.723 1.837-1.114.363-.33.563-.734.563-.992z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M18.074 10.795c-1.79.78-4.06 1.245-6.074 1.245-2.013 0-4.284-.465-6.074-1.245-.657-.288-1.22-.755-1.679-1.125a.15.15 0 0 0-.224.044.17.17 0 0 0-.023.085v1.237c0 .257.2.582.563.913.428.391 1.063.777 1.837 1.114 1.648.718 3.741 1.147 5.6 1.147s3.952-.43 5.6-1.148c.774-.338 1.41-.723 1.837-1.115.363-.33.563-.654.563-.911V9.799q0-.046-.023-.085a.16.16 0 0 0-.063-.06.15.15 0 0 0-.161.017c-.46.369-1.022.836-1.68 1.124"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M18.074 14.25c-1.79.78-4.06 1.245-6.074 1.245-2.013 0-4.284-.465-6.074-1.245-.657-.288-1.22-.756-1.679-1.125a.15.15 0 0 0-.224.043.17.17 0 0 0-.023.086v1.197c0 .257.2.581.562.912.428.392 1.064.777 1.838 1.115 1.648.718 3.74 1.147 5.6 1.147s3.952-.43 5.6-1.148c.774-.338 1.41-.723 1.837-1.114.363-.332.563-.656.563-.912v-1.197q0-.046-.023-.085a.16.16 0 0 0-.063-.06.15.15 0 0 0-.161.017c-.46.368-1.022.836-1.68 1.124"
  }));
};

exports.KnowledgeBaseIcon = KnowledgeBaseIcon;

}),
"./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIcon.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TwakeAssistantIcon = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var TwakeAssistantIcon = function TwakeAssistantIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
    viewBox: "0 0 22 22",
    fill: "none"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.094.305a1.5 1.5 0 012.351.79l.005.02 1.581 6.135a1 1 0 00.718.719l6.136 1.58.016.005a1.5 1.5 0 010 2.892l-.016.004-6.135 1.581a1 1 0 00-.719.719l-1.582 6.135-.005.02a1.5 1.5 0 01-2.889 0l-.005-.02-1.581-6.135a1.001 1.001 0 00-.719-.719L1.115 12.45l-.023-.006a1.5 1.5 0 010-2.886l.023-.006L7.25 7.968a1 1 0 00.719-.718L9.55 1.115l.005-.02a1.5 1.5 0 01.538-.79zM11 3.503l1.095 4.247a3.002 3.002 0 002.155 2.155L18.498 11l-4.248 1.095a3.001 3.001 0 00-2.155 2.155L11 18.497 9.905 14.25a3 3 0 00-2.155-2.156L3.504 11 7.75 9.904A3 3 0 009.905 7.75L11 3.503zM19 1a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V5h-1a1 1 0 110-2h1V2a1 1 0 011-1zM3 15a1 1 0 011 1 1 1 0 110 2 1 1 0 11-2 0 1 1 0 110-2 1 1 0 011-1z"
  }));
};

exports.TwakeAssistantIcon = TwakeAssistantIcon;

}),

});
//# sourceMappingURL=cozy.12549ddba34eff82.hot-update.js.map