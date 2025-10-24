"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
"./node_modules/cozy-search/dist/components/Conversations/styles.styl": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
// extracted by css-extract-rspack-plugin
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"conversationBar":"node_modules-cozy-search-dist-components-Conversations-styles__conversationBar-GQkEEE","conversationBar-input":"node_modules-cozy-search-dist-components-Conversations-styles__conversationBar-input-SIs7Fw","conversationBarInput":"node_modules-cozy-search-dist-components-Conversations-styles__conversationBar-input-SIs7Fw","conversationBarSibling":"node_modules-cozy-search-dist-components-Conversations-styles__conversationBarSibling-rNqDq3","conversationBarSibling--started":"node_modules-cozy-search-dist-components-Conversations-styles__conversationBarSibling--started-DzEAwq","conversationBarSiblingStarted":"node_modules-cozy-search-dist-components-Conversations-styles__conversationBarSibling--started-DzEAwq"});
    if(true) {
      (function() {
        var localsJsonString = "{\"conversationBar\":\"node_modules-cozy-search-dist-components-Conversations-styles__conversationBar-GQkEEE\",\"conversationBar-input\":\"node_modules-cozy-search-dist-components-Conversations-styles__conversationBar-input-SIs7Fw\",\"conversationBarInput\":\"node_modules-cozy-search-dist-components-Conversations-styles__conversationBar-input-SIs7Fw\",\"conversationBarSibling\":\"node_modules-cozy-search-dist-components-Conversations-styles__conversationBarSibling-rNqDq3\",\"conversationBarSibling--started\":\"node_modules-cozy-search-dist-components-Conversations-styles__conversationBarSibling--started-DzEAwq\",\"conversationBarSiblingStarted\":\"node_modules-cozy-search-dist-components-Conversations-styles__conversationBarSibling--started-DzEAwq\"}";
        // 1761295116517
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
"./node_modules/cozy-search/dist/stylesheet.css": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1761295116502
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
"./node_modules/cozy-search/dist/components/Conversations/ConversationLayout.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _CozyDialogs = __webpack_require__("./node_modules/cozy-ui/transpiled/react/CozyDialogs/index.js");

var _Breakpoints = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");

var _CozyTheme = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js"));

var _Buttons = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Buttons/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _AssistantProvider = _interopRequireWildcard(__webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js"));

var _Conversation = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/Conversation.js"));

var _ConversationBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ConversationBar.js"));

var _ConversationList = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ConversationList.js"));

var _AppTitle = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/AppTitle/index.js"));

var _Typography = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Typography/index.js"));

var _queries = __webpack_require__("./node_modules/cozy-search/dist/components/queries.js");

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _excluded = ["data"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = {
  "conversationApp": "Conversation__conversationApp___2oUn_",
  "conversationHeader": "Conversation__conversationHeader___2l1KR",
  "conversationLayout": "Conversation__conversationLayout___2FuAs",
  "conversationWindowContainer": "Conversation__conversationWindowContainer___1nhGG",
  "conversationWindow": "Conversation__conversationWindow___1QWU-",
  "conversationContainer": "Conversation__conversationContainer___14O1v",
  "conversationContainer--started": "Conversation__conversationContainer--started___1pmlF",
  "conversationHistory": "Conversation__conversationHistory___3fV_I",
  "conversationHistory--open": "Conversation__conversationHistory--open___p6m3y",
  "conversationHistory--mobile": "Conversation__conversationHistory--mobile___3My-p",
  "conversationSwitcher": "Conversation__conversationSwitcher___2bj3S",
  "conversationSwitcher--closed": "Conversation__conversationSwitcher--closed___KyFAu"
};

var ConversationLayout = function ConversationLayout(_ref) {
  var conversationId = _ref.conversationId,
      assistantState = _ref.assistantState;

  var _useBreakpoints = (0, _Breakpoints.useBreakpoints)(),
      isMobile = _useBreakpoints.isMobile;

  var chatConversationQuery = (0, _queries.buildChatConversationQueryById)(conversationId !== null && conversationId !== void 0 ? conversationId : "");

  var _useQuery = (0, _cozyClient.useQuery)(chatConversationQuery.definition, chatConversationQuery.options),
      chatConversation = _useQuery.data,
      queryResult = (0, _objectWithoutProperties2.default)(_useQuery, _excluded);

  var hasConversationStarted = chatConversation && chatConversation.messages.length > 0;

  var _useState = (0, _react.useState)(!isMobile),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      historyOpen = _useState2[0],
      setHistoryOpen = _useState2[1];

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationApp'])
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationHeader'])
  }, /*#__PURE__*/_react.default.createElement(_AppTitle.default, {
    slug: "home"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationLayout'])
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationSwitcher'], " ").concat(historyOpen ? styles['conversationSwitcher--open'] : styles['conversationSwitcher--closed'])
  }, /*#__PURE__*/_react.default.createElement(_Buttons.default, {
    label: /*#__PURE__*/_react.default.createElement(_Icon.default, {
      icon: "burger"
    }),
    onClick: function onClick() {
      setHistoryOpen(!historyOpen);
    },
    variant: historyOpen ? "ghost" : "text",
    className: "u-bdrs-4",
    style: {
      padding: 0,
      minWidth: 36,
      height: 30
    }
  }), /*#__PURE__*/_react.default.createElement(_Buttons.default, {
    label: /*#__PURE__*/_react.default.createElement(_Icon.default, {
      icon: "magnifier"
    }),
    variant: "text",
    className: "u-bdrs-4",
    style: {
      padding: 0,
      minWidth: 36,
      height: 30
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "u-flex u-flex-column u-flex-items-center u-flex-justify-center ".concat(styles['conversationHistory'], " ").concat(historyOpen ? styles['conversationHistory--open'] : '', " ").concat(isMobile ? styles['conversationHistory--mobile'] : '')
  }, /*#__PURE__*/_react.default.createElement(_ConversationList.default, {
    onNewConversation: function onNewConversation() {}
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationWindowContainer'])
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "u-flex u-flex-column u-flex-items-center u-flex-justify-center ".concat(styles['conversationWindow'])
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationContainer'], " ").concat(hasConversationStarted ? styles['conversationContainer--started'] : '')
  }, /*#__PURE__*/_react.default.createElement(_Conversation.default, {
    id: conversationId
  })), /*#__PURE__*/_react.default.createElement(_ConversationBar.default, {
    assistantStatus: assistantState.status,
    hasConversationStarted: hasConversationStarted
  })))));
};

var _default = ConversationLayout;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ConversationList.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _Buttons = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Buttons/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _List = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/List/index.js"));

var _ListItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItem/index.js"));

var _ListItemText = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItemText/index.js"));

var _Typography = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Typography/index.js"));

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _queries = __webpack_require__("./node_modules/cozy-search/dist/components/queries.js");

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _helpers = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ConversationList = function ConversationList(_ref) {
  var onNewConversation = _ref.onNewConversation;

  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  var client = (0, _cozyClient.useClient)();
  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useParams = (0, _reactRouterDom.useParams)(),
      conversationId = _useParams.conversationId;

  var _useSearchParams = (0, _reactRouterDom.useSearchParams)(),
      _useSearchParams2 = (0, _slicedToArray2.default)(_useSearchParams, 1),
      searchParams = _useSearchParams2[0];

  var recentConvsQuery = (0, _queries.buildRecentConversationsQuery)();

  var goToConversation = function goToConversation(conversationId) {
    navigate("/assistant/".concat(conversationId).concat(searchParams.toString() ? "?".concat(searchParams.toString()) : ''));
  };

  var createNewConversation = function createNewConversation() {
    var newConversationId = (0, _helpers.makeConversationId)();
    goToConversation(newConversationId);
  };

  var _useQuery = (0, _cozyClient.useQuery)(recentConvsQuery.definition, recentConvsQuery.options),
      conversations = _useQuery.data,
      historyFetchStatus = _useQuery.historyFetchStatus;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "u-flex u-flex-column u-w-100 u-h-100 u-flex-align-center u-flex-justify-start"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "u-m-1-half u-mb-0"
  }, /*#__PURE__*/_react.default.createElement(_Buttons.default, {
    startIcon: /*#__PURE__*/_react.default.createElement(_Icon.default, {
      icon: "plus",
      size: 14
    }),
    label: t('assistant.conversationBar.newChat'),
    onClick: createNewConversation,
    variant: "primary",
    className: "u-w-100 u-bdrs-6"
  })), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "u-ph-half u-mh-1 u-mb-half",
    variant: "subtitle1",
    color: "textSecondary"
  }, t('assistant.conversationList.recentConversations')), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '100%',
      width: '100%',
      overflow: 'scroll'
    }
  }, /*#__PURE__*/_react.default.createElement(_List.default, {
    className: "u-ph-half",
    disabledGutters: true
  }, conversations && conversations.map(function (conv, index) {
    var _conv$messages, _conv$messages2, _conv$cozyMetadata;

    return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      dense: true,
      button: true,
      className: "u-bdrs-4 u-mb-half",
      key: index,
      style: {
        backgroundColor: conversationId === conv.id ? 'var(--defaultBackgroundColor)' : undefined
      },
      onClick: function onClick() {
        return goToConversation(conv.id);
      }
    }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body2"
    }, (_conv$messages = conv.messages[conv.messages.length - 1]) === null || _conv$messages === void 0 ? void 0 : _conv$messages.content), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "subtitle1",
      color: "textSecondary"
    }, (_conv$messages2 = conv.messages[conv.messages.length - 1]) === null || _conv$messages2 === void 0 ? void 0 : _conv$messages2.content), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "caption",
      color: "textSecondary"
    }, new Date((_conv$cozyMetadata = conv.cozyMetadata) === null || _conv$cozyMetadata === void 0 ? void 0 : _conv$cozyMetadata.updatedAt).toLocaleString())));
  }))));
};

var _default = ConversationList;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/Sources/Sources.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _Box = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Box/index.js"));

var _Chips = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Chips/index.js"));

var _Grow = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Grow/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _MultiFiles = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/MultiFiles.js"));

var _Right = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Right.js"));

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var _SourcesItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/Sources/SourcesItem.js"));

var _queries = __webpack_require__("./node_modules/cozy-search/dist/components/queries.js");

var _excluded = ["data"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Sources = function Sources(_ref) {
  var messageId = _ref.messageId,
      files = _ref.files;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showSources = _useState2[0],
      setShowSources = _useState2[1];

  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  var ref = (0, _react.useRef)();

  var handleShowSources = function handleShowSources() {
    setShowSources(function (v) {
      return !v;
    });
  }; // we want to scroll down to the sources button when it is displayed


  (0, _react.useEffect)(function () {
    var _ref$current;

    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollIntoView(false);
  }, []);
  (0, _react.useEffect)(function () {
    if (showSources) {
      var sourcesBottom = ref.current.getBoundingClientRect().bottom;
      var innerContainer = document.getElementsByClassName('cozyDialogContent')[0];
      var innerContainerBottom = innerContainer.getBoundingClientRect().bottom;

      if (sourcesBottom > innerContainerBottom) {
        ref.current.scrollIntoView(false);
      }
    }
  }, [showSources]);
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    ref: ref,
    className: "u-mt-1-half",
    pl: "44px"
  }, /*#__PURE__*/_react.default.createElement(_Chips.default, {
    className: "u-mb-1",
    icon: /*#__PURE__*/_react.default.createElement(_Icon.default, {
      icon: _MultiFiles.default,
      className: "u-ml-half"
    }),
    label: t('assistant.sources', files.length),
    deleteIcon: /*#__PURE__*/_react.default.createElement(_Icon.default, {
      className: "u-h-1",
      icon: _Right.default,
      rotate: showSources ? 90 : 0
    }),
    clickable: true,
    onClick: handleShowSources,
    onDelete: handleShowSources
  }), /*#__PURE__*/_react.default.createElement(_Grow.default, {
    in: showSources,
    style: {
      transformOrigin: '0 0 0'
    },
    mountOnEnter: true,
    unmountOnExit: true
  }, /*#__PURE__*/_react.default.createElement("div", null, files.map(function (file) {
    return /*#__PURE__*/_react.default.createElement(_SourcesItem.default, {
      key: "".concat(messageId, "-").concat(file._id),
      file: file
    });
  }))));
};

var SourcesWithFilesQuery = function SourcesWithFilesQuery(_ref2) {
  var messageId = _ref2.messageId,
      sources = _ref2.sources;
  var fileIds = sources.map(function (source) {
    return source.id;
  });
  var filesByIds = (0, _queries.buildFilesByIds)(fileIds);

  var _useQuery = (0, _cozyClient.useQuery)(filesByIds.definition, filesByIds.options),
      files = _useQuery.data,
      queryResult = (0, _objectWithoutProperties2.default)(_useQuery, _excluded);

  var isLoading = (0, _cozyClient.isQueryLoading)(queryResult);
  if (isLoading || files.length === 0) return null;
  return /*#__PURE__*/_react.default.createElement(Sources, {
    messageId: messageId,
    files: files
  });
};

var _default = SourcesWithFilesQuery;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/Sources/SourcesItem.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _file = __webpack_require__("./node_modules/cozy-client/dist/models/file.js");

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _ListItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItem/index.js"));

var _ListItemIcon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItemIcon/index.js"));

var _ListItemText = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItemText/index.js"));

var _getIconForSearchResult = __webpack_require__("./node_modules/cozy-search/dist/components/Search/getIconForSearchResult.js");

var styles = {
  "sourcesItem": "styles__sourcesItem___204Zw"
};

var getSlug = function getSlug(file) {
  if ((0, _file.isNote)(file)) {
    return 'notes';
  }

  if ((0, _file.isDocs)(file)) {
    return 'docs';
  }

  return 'drive';
};

var getHash = function getHash(file, slug) {
  if (slug === 'notes') {
    return "/n/".concat(file._id);
  }

  if (slug === 'docs') {
    return "/bridge/docs/".concat(file.metadata.externalId);
  }

  return "/folder/".concat(file.dir_id, "/file/").concat(file._id);
};

var SourcesItem = function SourcesItem(_ref) {
  var file = _ref.file;
  var client = (0, _cozyClient.useClient)();
  var slug = getSlug(file);
  var hash = getHash(file, slug);
  var docUrl = (0, _cozyClient.generateWebLink)({
    slug: slug,
    cozyUrl: client === null || client === void 0 ? void 0 : client.getStackClient().uri,
    subDomainType: client === null || client === void 0 ? void 0 : client.getInstanceOptions().subdomain,
    hash: hash
  });
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    className: styles['sourcesItem'],
    component: "a",
    href: docUrl,
    target: "_blank",
    button: true
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: (0, _getIconForSearchResult.getDriveMimeTypeIcon)(file),
    size: 32
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: file.name,
    secondary: file.path.replace(file.name, '')
  }));
};

var _default = SourcesItem;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/ResultMenu/NoResultItem.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _ListItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItem/index.js"));

var _ListItemText = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItemText/index.js"));

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var NoResultItem = function NoResultItem() {
  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: t('assistant.search.noItem')
  }));
};

var _default = NoResultItem;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/ResultMenu/NotEnoughItem.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _ListItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItem/index.js"));

var _ListItemText = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItemText/index.js"));

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var NotEnoughItem = function NotEnoughItem() {
  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: t('assistant.search.notEnough')
  }));
};

var _default = NotEnoughItem;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/ResultMenu/ResultMenu.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _Paper = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Paper/index.js"));

var _Popper = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Popper/index.js"));

var _ResultMenuContent = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/ResultMenuContent.js"));

var styles = {
  "resultMenu": "styles__resultMenu___o76q-",
  "resultMenu-inner": "styles__resultMenu-inner___2Lf0d",
  "resultMenuItem": "styles__resultMenuItem___3-bLe"
};

var ResultMenu = function ResultMenu(_ref) {
  var anchorRef = _ref.anchorRef,
      listRef = _ref.listRef,
      onClear = _ref.onClear;
  return /*#__PURE__*/_react.default.createElement(_Popper.default, {
    style: {
      width: anchorRef.current.offsetWidth,
      zIndex: 'var(--zIndex-popover)'
    },
    anchorEl: anchorRef.current,
    open: Boolean(anchorRef.current),
    placement: "bottom-start"
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: styles['resultMenu'],
    square: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: styles['resultMenu-inner']
  }, /*#__PURE__*/_react.default.createElement(_ResultMenuContent.default, {
    ref: listRef,
    onClear: onClear
  }))));
};

var _default = ResultMenu;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/ResultMenu/ResultMenuContent.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _cozyDataproxyLib = __webpack_require__("./node_modules/cozy-dataproxy-lib/dist/index.js");

var _List = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/List/index.js"));

var _ListItemSkeleton = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Skeletons/ListItemSkeleton.js"));

var _NoResultItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/NoResultItem.js"));

var _NotEnoughItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/NotEnoughItem.js"));

var _ResultMenuItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/ResultMenuItem.js"));

var _SearchProvider = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SearchResult = function SearchResult(_ref) {
  var onClear = _ref.onClear;

  var _useSearch = (0, _SearchProvider.useSearch)(),
      isLoading = _useSearch.isLoading,
      results = _useSearch.results,
      selectedIndex = _useSearch.selectedIndex,
      searchValue = _useSearch.searchValue;

  if (isLoading && !(results !== null && results !== void 0 && results.length)) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ListItemSkeleton.default, {
      hasSecondary: true
    }), /*#__PURE__*/_react.default.createElement(_ListItemSkeleton.default, {
      hasSecondary: true
    }), /*#__PURE__*/_react.default.createElement(_ListItemSkeleton.default, {
      hasSecondary: true
    }));
  }

  if (!isLoading && !(results !== null && results !== void 0 && results.length)) {
    if (searchValue.length >= 3) {
      return /*#__PURE__*/_react.default.createElement(_NoResultItem.default, null);
    } else {
      return /*#__PURE__*/_react.default.createElement(_NotEnoughItem.default, null);
    }
  }

  return results.map(function (result, idx) {
    return /*#__PURE__*/_react.default.createElement(_ResultMenuItem.default, {
      key: result.id || idx,
      icon: result.icon,
      slug: result.slug,
      url: result.url,
      primaryText: result.primary,
      secondaryText: result.secondary,
      secondaryUrl: result.secondaryUrl,
      query: searchValue,
      highlightQuery: "true",
      selected: selectedIndex === idx,
      onClear: onClear
    });
  });
};

var ResultMenuContent = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var onClear = _ref2.onClear;

  var _useDataProxy = (0, _cozyDataproxyLib.useDataProxy)(),
      dataProxyServicesAvailable = _useDataProxy.dataProxyServicesAvailable;

  return /*#__PURE__*/_react.default.createElement(_List.default, {
    ref: ref
  }, dataProxyServicesAvailable && /*#__PURE__*/_react.default.createElement(SearchResult, {
    onClear: onClear
  }));
});
ResultMenuContent.displayName = 'ResultMenuContent';
var _default = ResultMenuContent;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/ResultMenu/ResultMenuItem.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _AppIcon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/AppIcon/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _ListItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItem/index.js"));

var _ListItemIcon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItemIcon/index.js"));

var _ListItemText = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ListItemText/index.js"));

var _SuggestionItemTextHighlighted = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextHighlighted.js"));

var _SuggestionItemTextSecondary = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextSecondary.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = {
  "resultMenu": "styles__resultMenu___o76q-",
  "resultMenu-inner": "styles__resultMenu-inner___2Lf0d",
  "resultMenuItem": "styles__resultMenuItem___3-bLe"
};

var ResultMenuItem = function ResultMenuItem(_ref) {
  var icon = _ref.icon,
      url = _ref.url,
      primaryText = _ref.primaryText,
      secondaryText = _ref.secondaryText,
      secondaryUrl = _ref.secondaryUrl,
      slug = _ref.slug,
      selected = _ref.selected,
      query = _ref.query,
      _ref$highlightQuery = _ref.highlightQuery,
      highlightQuery = _ref$highlightQuery === void 0 ? false : _ref$highlightQuery,
      onClear = _ref.onClear;
  var itemRef = (0, _react.useRef)();
  var iconComponent = icon.type === 'component' ? /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: icon.component,
    size: 32
  }) : icon.type === 'app' ? /*#__PURE__*/_react.default.createElement(_AppIcon.default, {
    app: icon.app
  }) : icon;
  var primary = highlightQuery ? /*#__PURE__*/_react.default.createElement(_SuggestionItemTextHighlighted.default, {
    text: primaryText,
    query: query
  }) : primaryText;
  var secondary = highlightQuery ? /*#__PURE__*/_react.default.createElement(_SuggestionItemTextSecondary.default, {
    text: secondaryText,
    query: query,
    slug: slug,
    url: secondaryUrl
  }) : secondaryText;
  (0, _react.useEffect)(function () {
    if (selected) {
      var _itemRef$current;

      itemRef === null || itemRef === void 0 ? void 0 : (_itemRef$current = itemRef.current) === null || _itemRef$current === void 0 ? void 0 : _itemRef$current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [selected]);
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    component: "a",
    href: url,
    ref: itemRef,
    size: "small",
    selected: selected,
    className: styles.resultMenuItem,
    onClick: onClear
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, iconComponent), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: primary,
    secondary: secondary
  }));
};

var _default = ResultMenuItem;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextHighlighted.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var normalizeString = function normalizeString(str) {
  return str.toString().toLowerCase().replace(/\//g, ' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ');
};
/**
 * Add <b> on part that equlas query into each result
 *
 * @param {Array} searchResult - list of results
 * @param {string} query - search input
 * @returns list of results with the query highlighted
 */


var highlightQueryTerms = function highlightQueryTerms(searchResult, query) {
  var normalizedQueryTerms = normalizeString(query);
  var normalizedResultTerms = normalizeString(searchResult);
  var matchedIntervals = [];
  var spacerLength = 1;
  var currentIndex = 0;
  normalizedResultTerms.forEach(function (resultTerm) {
    normalizedQueryTerms.forEach(function (queryTerm) {
      var index = resultTerm.indexOf(queryTerm);

      if (index >= 0) {
        matchedIntervals.push({
          from: currentIndex + index,
          to: currentIndex + index + queryTerm.length
        });
      }
    });
    currentIndex += resultTerm.length + spacerLength;
  }); // matchedIntervals can overlap, so we merge them.
  // - sort the intervals by starting index
  // - add the first interval to the stack
  // - for every interval,
  // - - add it to the stack if it doesn't overlap with the stack top
  // - - or extend the stack top if the start overlaps and the new interval's top is bigger

  var mergedIntervals = matchedIntervals.sort(function (intervalA, intervalB) {
    return intervalA.from > intervalB.from;
  }).reduce(function (computedIntervals, newInterval) {
    if (computedIntervals.length === 0 || computedIntervals[computedIntervals.length - 1].to < newInterval.from) {
      computedIntervals.push(newInterval);
    } else if (computedIntervals[computedIntervals.length - 1].to < newInterval.to) {
      computedIntervals[computedIntervals.length - 1].to = newInterval.to;
    }

    return computedIntervals;
  }, []); // create an array containing the entire search result, with special characters, and the intervals surrounded y `<b>` tags

  var slicedOriginalResult = mergedIntervals.length > 0 ? [/*#__PURE__*/_react.default.createElement("span", {
    key: "0"
  }, searchResult.slice(0, mergedIntervals[0].from))] : searchResult;

  for (var i = 0, l = mergedIntervals.length; i < l; ++i) {
    slicedOriginalResult.push( /*#__PURE__*/_react.default.createElement("span", {
      className: "u-primaryColor"
    }, searchResult.slice(mergedIntervals[i].from, mergedIntervals[i].to)));
    if (i + 1 < l) slicedOriginalResult.push( /*#__PURE__*/_react.default.createElement("span", null, searchResult.slice(mergedIntervals[i].to, mergedIntervals[i + 1].from)));
  }

  if (mergedIntervals.length > 0) slicedOriginalResult.push( /*#__PURE__*/_react.default.createElement("span", null, searchResult.slice(mergedIntervals[mergedIntervals.length - 1].to, searchResult.length)));
  return slicedOriginalResult;
};

var SuggestionItemTextHighlighted = function SuggestionItemTextHighlighted(_ref) {
  var text = _ref.text,
      query = _ref.query;
  if (!text) return null;
  var textHighlighted = highlightQueryTerms(text, query);

  if (Array.isArray(textHighlighted)) {
    return textHighlighted.map(function (item, idx) {
      return _objectSpread(_objectSpread({}, item), {}, {
        key: idx
      });
    });
  }

  return textHighlighted;
};

var _default = SuggestionItemTextHighlighted;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextSecondary.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _AppLinker = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/AppLinker/index.js"));

var _Link = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Link/index.js"));

var _Breakpoints = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js"));

var _SuggestionItemTextHighlighted = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextHighlighted.js"));

/**
 * Code copied and adapted from cozy-drive
 *
 * See source: https://github.com/cozy/cozy-drive/blob/fbe2df67199683b23a40f476ccdacb00ee027459/src/modules/search/components/SuggestionItemTextSecondary.jsx
 */
var SuggestionItemTextSecondary = function SuggestionItemTextSecondary(_ref) {
  var text = _ref.text,
      query = _ref.query,
      url = _ref.url,
      slug = _ref.slug;

  var _useBreakpoints = (0, _Breakpoints.default)(),
      isMobile = _useBreakpoints.isMobile;

  if (isMobile || !url) {
    return /*#__PURE__*/_react.default.createElement(_SuggestionItemTextHighlighted.default, {
      text: text,
      query: query
    });
  }

  var app = {
    slug: slug
  };
  return /*#__PURE__*/_react.default.createElement(_AppLinker.default, {
    app: app,
    href: url
  }, function (_ref2) {
    var href = _ref2.href,
        _onClick = _ref2.onClick;
    return /*#__PURE__*/_react.default.createElement(_Link.default, {
      color: "textSecondary",
      underline: "hover",
      href: href,
      onClick: function onClick(e) {
        e.stopPropagation();

        if (typeof _onClick == 'function') {
          _onClick(e);
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_SuggestionItemTextHighlighted.default, {
      text: text,
      query: query,
      slug: slug
    }));
  });
};

var _default = SuggestionItemTextSecondary;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Search/AssistantButton.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AssistantButton = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _IconButton = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/IconButton/index.js"));

var _InputAdornment = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/InputAdornment/index.js"));

var _TwakeAssistantIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIcon.js");

var _AssistantProvider = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");

var _helpers = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");

var AssistantButton = function AssistantButton(_ref) {
  var size = _ref.size;

  var _useAssistant = (0, _AssistantProvider.useAssistant)(),
      onAssistantExecute = _useAssistant.onAssistantExecute;

  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useLocation = (0, _reactRouterDom.useLocation)(),
      pathname = _useLocation.pathname;

  var onClick = function onClick() {
    var conversationId = (0, _helpers.makeConversationId)();
    onAssistantExecute({
      value: '',
      conversationId: conversationId
    });
    navigate("assistant/".concat(conversationId, "?returnPath=").concat(pathname));
  };

  return /*#__PURE__*/_react.default.createElement(_InputAdornment.default, {
    position: "end",
    className: "u-mr-half"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: onClick,
    size: "small",
    color: "primary"
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _TwakeAssistantIcon.TwakeAssistantIcon,
    size: size === 'medium' ? 24 : 16
  })));
};

exports.AssistantButton = AssistantButton;

}),
"./node_modules/cozy-search/dist/components/Search/AssistantLink.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _AssistantProvider = _interopRequireWildcard(__webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js"));

var _helpers = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AssistantLink = function AssistantLink(_ref) {
  var children = _ref.children;

  var _useAssistant = (0, _AssistantProvider.useAssistant)(),
      onAssistantExecute = _useAssistant.onAssistantExecute;

  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useLocation = (0, _reactRouterDom.useLocation)(),
      pathname = _useLocation.pathname;

  var openAssistant = function openAssistant() {
    if (!(0, _helpers.isAssistantEnabled)()) return;
    var conversationId = (0, _helpers.makeConversationId)();
    onAssistantExecute({
      value: '',
      conversationId: conversationId
    });
    navigate("assistant/".concat(conversationId, "?returnPath=").concat(pathname));
  };

  return /*#__PURE__*/_react.default.createElement(_AssistantProvider.default, null, children({
    openAssistant: openAssistant
  }));
};

var AssistantLinkWrapper = function AssistantLinkWrapper(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/_react.default.createElement(_AssistantProvider.default, null, /*#__PURE__*/_react.default.createElement(AssistantLink, null, children));
};

var _default = AssistantLinkWrapper;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Search/Icons/DocsIcon.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

// TODO: should be moved in cozy-ui
var DocsIcon = function DocsIcon() {
  return /*#__PURE__*/_react.default.createElement("svg", {
    viewBox: "0 0 32 33",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M21.6305 29.5812C22.7983 29.2538 23.9166 28.6562 24.6505 27.6003C25.3749 26.5663 25.5789 25.2547 25.5789 23.9925V5.50099C25.5789 5.17358 25.5611 4.84557 25.5216 4.52148C26.1016 4.74961 26.5486 5.12658 26.8626 5.65239C27.2331 6.25024 27.4184 7.03757 27.4184 8.01435V26.7964C27.4184 28.1184 27.0942 29.1078 26.4458 29.7646C25.7974 30.4214 24.8207 30.7498 23.5155 30.7498H16.4209C16.5889 30.7204 16.7574 30.6901 16.9262 30.659C18.4067 30.3944 19.9713 30.0354 21.6185 29.5846L21.6305 29.5812Z",
    fill: "#C9191E"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.58203 26.405V7.5977C4.58203 6.45251 4.88938 5.58519 5.50408 4.99575C6.1272 4.40631 6.95242 4.08212 7.97972 4.02318C9.49542 3.93055 10.9311 3.80425 12.2868 3.64425C13.6425 3.47584 14.9393 3.28217 16.1771 3.06324C17.4234 2.8443 18.6359 2.60011 19.8148 2.33065C21.0274 2.04435 21.9578 2.1875 22.6062 2.7601C23.2546 3.33269 23.5788 4.24632 23.5788 5.50099V23.9925C23.5788 25.0956 23.3893 25.9166 23.0104 26.4555C22.6315 27.0029 21.9915 27.4028 21.0905 27.6554C19.4906 28.0933 17.9833 28.4386 16.5687 28.6912C15.154 28.9522 13.7731 29.1501 12.4258 29.2848C11.0785 29.4196 9.69751 29.5248 8.28286 29.6006C7.11241 29.668 6.20299 29.4238 5.5546 28.868C4.90622 28.3207 4.58203 27.4997 4.58203 26.405ZM9.20865 11.0124C11.0635 10.8944 12.7632 10.7131 14.3075 10.4683C14.6822 10.4072 15.0564 10.3436 15.4291 10.2776C15.8192 10.2085 16.1013 9.86859 16.1013 9.47337C16.1013 8.96154 15.638 8.57609 15.135 8.66189C14.846 8.71118 14.5555 8.75909 14.2635 8.80562C12.7346 9.04923 11.0452 9.22998 9.19523 9.3477C8.91819 9.36558 8.69776 9.45188 8.55608 9.62391C8.42209 9.78661 8.35645 9.98229 8.35645 10.2053C8.35645 10.4321 8.43296 10.6295 8.58568 10.7918L8.58783 10.7939C8.75336 10.9595 8.96369 11.0311 9.20865 11.0124ZM9.20801 15.206C11.0631 15.088 12.763 14.9066 14.3075 14.6619C15.8588 14.4089 17.3936 14.1138 18.9112 13.7766C19.2191 13.7081 19.4498 13.6003 19.5652 13.433C19.6786 13.2721 19.7347 13.0876 19.7347 12.8832C19.7347 12.6526 19.6469 12.454 19.476 12.2926C19.2921 12.1189 19.0348 12.0784 18.7304 12.1411L18.7285 12.1415C17.2823 12.4694 15.794 12.7553 14.2635 12.9992C12.7346 13.2428 11.0452 13.4235 9.19523 13.5413C8.91819 13.5591 8.69776 13.6454 8.55608 13.8175C8.42276 13.9794 8.35645 14.1705 8.35645 14.3863C8.35645 14.6203 8.43209 14.8223 8.58558 14.9854L8.59 14.9896C8.75499 15.1449 8.96316 15.2155 9.20551 15.2062L9.20801 15.206ZM9.20847 19.3994C11.0634 19.2729 12.7631 19.0874 14.3075 18.8427C15.8589 18.5982 17.3934 18.3073 18.9112 17.97C19.2199 17.9014 19.4508 17.7891 19.566 17.6127C19.6783 17.4529 19.7347 17.2733 19.7347 17.0766C19.7347 16.8461 19.6469 16.6474 19.476 16.4861C19.2921 16.3123 19.0348 16.2718 18.7304 16.3345L18.729 16.3348C17.2827 16.6543 15.7942 16.9361 14.2635 17.18C12.7345 17.4236 11.045 17.6086 9.19495 17.7347C8.91804 17.7526 8.69771 17.8389 8.55608 18.0109C8.42276 18.1728 8.35645 18.3639 8.35645 18.5797C8.35645 18.8137 8.43209 19.0158 8.58558 19.1789L8.59 19.183C8.75499 19.3383 8.96316 19.4089 9.20551 19.3996L9.20847 19.3994ZM14.3075 23.007C12.7632 23.2518 11.0635 23.4331 9.20867 23.5512C8.9637 23.5698 8.75337 23.4982 8.58783 23.3326L8.58572 23.3305C8.433 23.1682 8.35645 22.9708 8.35645 22.7441C8.35645 22.521 8.42209 22.3253 8.55608 22.1626C8.69776 21.9906 8.91827 21.9043 9.19531 21.8864C11.0453 21.7687 12.7346 21.588 14.2635 21.3443C14.5555 21.2978 14.846 21.2499 15.135 21.2006C15.638 21.1148 16.1013 21.5003 16.1013 22.0121C16.1013 22.4073 15.8192 22.7472 15.4291 22.8163C15.0564 22.8823 14.6822 22.9459 14.3075 23.007Z",
    fill: "#000091"
  }));
};

var _default = DocsIcon;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Search/Icons/EncryptedFolderIcon.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var EncryptedFolderIcon = function EncryptedFolderIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    opacity: "0.34",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.9657 1C13.5206 1 14.2876 1.3125 14.6803 1.6995L16 3H30.0059C31.1072 3 32 3.89498 32 4.997V27.003C32 28.1059 31.1107 29 29.9983 29H2.00174C0.896211 29 0 28.1001 0 27.0088V1.99653C0 1.44616 0.448999 1 1.00472 1H12.9657Z",
    fill: "#297EF2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 1C0.447715 1 0 1.44772 0 2V6C0 6.55228 0.447716 7 1 7H13.5858C13.851 7 14.1054 6.89464 14.2929 6.70711L15.7071 5.29289C15.8946 5.10536 16.149 5 16.4142 5H32C32 3.89543 31.1046 3 30 3H16.4142C16.149 3 15.8946 2.89464 15.7071 2.70711L14.2929 1.29289C14.1054 1.10536 13.851 1 13.5858 1H1ZM10 15.9954V24.0046C10 24.5543 10.4558 25 11.0025 25H20.9975C21.5512 25 22 24.5443 22 24.0046V15.9954C22 15.4457 21.5561 15 21 15H20V13C20 10.794 18.2053 9 16 9C13.794 9 12 10.794 12 13V15H11C10.4477 15 10 15.4557 10 15.9954ZM16 11C14.8968 11 14 12.1215 14 13.5V15H18V13.5C18 12.1215 17.1028 11 16 11ZM17.5 19C17.5 18.172 16.8265 17.5 16 17.5C15.172 17.5 14.5 18.172 14.5 19C14.5 19.552 14.803 20.032 15.25 20.29V22.75C15.25 23.1625 15.586 23.5 16 23.5C16.4125 23.5 16.75 23.1625 16.75 22.75V20.29C17.1955 20.032 17.5 19.552 17.5 19Z",
    fill: "#297EF2"
  }));
};

var _default = EncryptedFolderIcon;
exports["default"] = _default;

}),

});
//# sourceMappingURL=cozy.32fa7bf2f6cd9c50.hot-update.js.map