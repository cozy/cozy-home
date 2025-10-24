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
        // 1761294542935
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

});
//# sourceMappingURL=cozy.3a3a6dd0506d20b0.hot-update.js.map