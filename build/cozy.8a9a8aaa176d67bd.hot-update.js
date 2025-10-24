"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
"./node_modules/cozy-search/dist/components/Conversations/ChatAssistantItem.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var _ChatItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatItem.js"));

var _Sources = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/Sources/Sources.js"));

var _TwakeAssistantIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIcon.js");

var _excluded = ["label", "className", "id", "sources"];

var ChatAssistantItem = function ChatAssistantItem(_ref) {
  var label = _ref.label,
      className = _ref.className,
      id = _ref.id,
      sources = _ref.sources,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ChatItem.default, (0, _extends2.default)({}, props, {
    label: label,
    className: className,
    icon: /*#__PURE__*/_react.default.createElement(_Icon.default, {
      icon: _TwakeAssistantIcon.TwakeAssistantIcon,
      size: 24,
      className: "u-mh-half",
      color: "var(--primaryColor)"
    }),
    name: t('assistant.name')
  })), (sources === null || sources === void 0 ? void 0 : sources.length) > 0 && /*#__PURE__*/_react.default.createElement(_Sources.default, {
    messageId: id,
    sources: sources
  }));
};

var _default = ChatAssistantItem;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ChatConversation.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _ChatAssistantItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatAssistantItem.js"));

var _ChatRealtimeAnswer = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatRealtimeAnswer.js"));

var _ChatUserItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatUserItem.js"));

var _AssistantProvider = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");

var _helpers = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");

var _queries = __webpack_require__("./node_modules/cozy-search/dist/components/queries.js");

var _excluded = ["data"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ChatConversation = function ChatConversation(_ref) {
  var _conversation$message, _conversation$message2, _conversation$message3, _conversation$message4, _conversation$message5;

  var conversation = _ref.conversation,
      myself = _ref.myself;

  var _useAssistant = (0, _AssistantProvider.useAssistant)(),
      assistantState = _useAssistant.assistantState;

  var listRef = (0, _react.useRef)();
  var instantMessageKeysCount = Object.keys(assistantState.message).length; // test on role === user to be sure the last response is inside io.cozy.ai.chat.conversations

  var showRealtimeMessage = assistantState.status !== 'idle' || (conversation === null || conversation === void 0 ? void 0 : (_conversation$message = conversation.messages) === null || _conversation$message === void 0 ? void 0 : (_conversation$message2 = _conversation$message[(conversation === null || conversation === void 0 ? void 0 : (_conversation$message3 = conversation.messages) === null || _conversation$message3 === void 0 ? void 0 : _conversation$message3.length) - 1]) === null || _conversation$message2 === void 0 ? void 0 : _conversation$message2.role) === 'user';
  (0, _react.useEffect)(function () {
    var _listRef$current, _listRef$current$last;

    // force scroll down if new message of change in AI instant response
    (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : (_listRef$current$last = _listRef$current.lastElementChild) === null || _listRef$current$last === void 0 ? void 0 : _listRef$current$last.scrollIntoView(false);
  }, [conversation === null || conversation === void 0 ? void 0 : (_conversation$message4 = conversation.messages) === null || _conversation$message4 === void 0 ? void 0 : _conversation$message4.length, assistantState.status, instantMessageKeysCount]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: listRef
  }, conversation === null || conversation === void 0 ? void 0 : (_conversation$message5 = conversation.messages) === null || _conversation$message5 === void 0 ? void 0 : _conversation$message5.map(function (message, idx) {
    if (message.role === 'user') {
      return /*#__PURE__*/_react.default.createElement(_ChatUserItem.default, {
        key: conversation._id + '--' + idx,
        className: "u-mt-1-half",
        myself: myself,
        label: message.content
      });
    }

    if (idx !== (conversation === null || conversation === void 0 ? void 0 : conversation.messages.length) - 1) {
      return /*#__PURE__*/_react.default.createElement(_ChatAssistantItem.default, {
        key: conversation._id + '--' + idx,
        className: "u-mt-1-half",
        id: message.id,
        label: message.content,
        sources: message.sources
      });
    }

    if (showRealtimeMessage) {
      return null;
    }

    return /*#__PURE__*/_react.default.createElement(_ChatAssistantItem.default, {
      key: conversation._id + '--' + idx,
      className: "u-mt-1-half",
      id: message.id,
      label: message.content,
      sources: message.sources
    });
  }), showRealtimeMessage && /*#__PURE__*/_react.default.createElement(_ChatRealtimeAnswer.default, {
    isLoading: assistantState.status === 'pending',
    label: (0, _helpers.getInstantMessage)(assistantState)
  }));
};

var ChatConversationWithQuery = function ChatConversationWithQuery(_ref2) {
  var id = _ref2.id,
      myself = _ref2.myself;
  var chatConversationQuery = (0, _queries.buildChatConversationQueryById)(id);

  var _useQuery = (0, _cozyClient.useQuery)(chatConversationQuery.definition, chatConversationQuery.options),
      chatConversation = _useQuery.data,
      queryResult = (0, _objectWithoutProperties2.default)(_useQuery, _excluded);

  var isLoading = (0, _cozyClient.isQueryLoading)(queryResult);
  if (isLoading) return null;
  return /*#__PURE__*/_react.default.createElement(ChatConversation, {
    conversation: chatConversation,
    myself: myself
  });
};

var _default = ChatConversationWithQuery;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ChatItem.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _Box = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Box/index.js"));

var _Typography = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Typography/index.js"));

var _ChatItemLabel = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatItemLabel.js"));

var ChatItem = function ChatItem(_ref) {
  var className = _ref.className,
      icon = _ref.icon,
      name = _ref.name,
      label = _ref.label;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: className,
    display: "flex",
    alignItems: "center",
    gridGap: 12
  }, icon, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6",
    display: "inline"
  }, name)), /*#__PURE__*/_react.default.createElement(_Box.default, {
    pl: "44px"
  }, /*#__PURE__*/_react.default.createElement(_ChatItemLabel.default, {
    label: label
  })));
};

var _default = ChatItem;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ChatItemLabel.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _Markdown = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Markdown/index.js"));

var _helpers = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");

var ChatItemLabel = function ChatItemLabel(_ref) {
  var label = _ref.label;

  if (typeof label === 'string') {
    var content = (0, _helpers.sanitizeChatContent)(label);
    return /*#__PURE__*/_react.default.createElement(_Markdown.default, {
      content: content
    });
  }

  return label;
}; // need memo to avoid rendering all label of all items


var _default = /*#__PURE__*/_react.default.memo(ChatItemLabel);

exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ChatRealtimeAnswer.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _Skeleton = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Skeleton/index.js"));

var _ChatAssistantItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatAssistantItem.js"));

var ChatRealtimeAnswer = function ChatRealtimeAnswer(_ref) {
  var isLoading = _ref.isLoading,
      label = _ref.label;
  return /*#__PURE__*/_react.default.createElement(_ChatAssistantItem.default, {
    className: "u-mt-1-half",
    label: isLoading ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_Skeleton.default, {
      width: "100%"
    }), /*#__PURE__*/_react.default.createElement(_Skeleton.default, {
      width: "60%"
    })) : label
  });
};

var _default = ChatRealtimeAnswer;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ChatUserItem.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _contact = __webpack_require__("./node_modules/cozy-client/dist/models/contact.js");

var _Avatar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Avatar/index.js"));

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var _ChatItem = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatItem.js"));

var _excluded = ["className", "label", "myself"];

var ChatUserItem = function ChatUserItem(_ref) {
  var className = _ref.className,
      label = _ref.label,
      myself = _ref.myself,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  var contact = myself || {
    displayName: t('assistant.default_username')
  };
  return /*#__PURE__*/_react.default.createElement(_ChatItem.default, (0, _extends2.default)({}, props, {
    className: className,
    icon: /*#__PURE__*/_react.default.createElement(_Avatar.default, {
      text: (0, _contact.getInitials)(contact),
      size: 24
    }),
    name: (0, _contact.getDisplayName)(contact),
    label: label
  }));
};

var _default = ChatUserItem;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/Conversation.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _ChatConversation = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ChatConversation.js"));

var _queries = __webpack_require__("./node_modules/cozy-search/dist/components/queries.js");

var _excluded = ["data"];

var Conversation = function Conversation(_ref) {
  var id = _ref.id;
  var myselfQuery = (0, _queries.buildMyselfQuery)();

  var _useQuery = (0, _cozyClient.useQuery)(myselfQuery.definition, myselfQuery.options),
      myselves = _useQuery.data,
      queryMyselfResult = (0, _objectWithoutProperties2.default)(_useQuery, _excluded);

  var isLoading = (0, _cozyClient.isQueryLoading)(queryMyselfResult);
  if (isLoading) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "u-maw-7 u-mh-auto"
  }, /*#__PURE__*/_react.default.createElement(_ChatConversation.default, {
    id: id,
    myself: myselves[0]
  }));
};

var _default = Conversation;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ConversationBar.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _Buttons = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Buttons/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _Paperplane = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Paperplane.js"));

var _Stop = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Stop.js"));

var _SearchBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/SearchBar/index.js"));

var _Chips = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Chips/index.js"));

var _useEventListener = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/hooks/useEventListener.js"));

var _Breakpoints = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var _AssistantProvider = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");

var _Typography = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Typography/index.js"));

var _TwakeAssistantIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIcon.js");

var _TwakeAssistantIconColor = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIconColor.js");

var _ExpertIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/ExpertIcon.js");

var _KnowledgeBaseIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/KnowledgeBaseIcon.js");

var _ConversationChips = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ConversationChips.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = {
  "conversationBar": "styles__conversationBar___2J-Us",
  "conversationBar-input": "styles__conversationBar-input___2DfdZ",
  "conversationBarSibling": "styles__conversationBarSibling___1KTPm",
  "conversationBarSibling--started": "styles__conversationBarSibling--started___1T7gW"
};

var ConversationBar = function ConversationBar(_ref) {
  var assistantStatus = _ref.assistantStatus,
      hasConversationStarted = _ref.hasConversationStarted;

  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  var _useBreakpoints = (0, _Breakpoints.useBreakpoints)(),
      isMobile = _useBreakpoints.isMobile;

  var _useAssistant = (0, _AssistantProvider.useAssistant)(),
      onAssistantExecute = _useAssistant.onAssistantExecute;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var inputRef = (0, _react.useRef)();

  var _useParams = (0, _reactRouterDom.useParams)(),
      conversationId = _useParams.conversationId; // to adjust input height for multiline when typing in it


  (0, _useEventListener.default)(inputRef.current, 'input', function () {
    inputRef.current.style.height = 'auto'; // to resize input when emptying it

    inputRef.current.style.height = "".concat(inputRef.current.scrollHeight, "px");
  });

  var handleClear = function handleClear() {
    setInputValue('');
  };

  var handleChange = function handleChange(ev) {
    setInputValue(ev.target.value);
  };

  var handleStop = function handleStop() {
    // not supported right now
    return;
  };

  var handleClick = function handleClick() {
    return onAssistantExecute({
      value: inputValue,
      conversationId: conversationId
    }, function () {
      handleClear();
      inputRef.current.style.height = 'auto';
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "u-w-100 u-maw-7 u-mh-auto"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationBarSibling'], " ").concat(hasConversationStarted ? styles['conversationBarSibling--started'] : '', " u-flex u-flex-column u-flex-items-center u-flex-justify-end")
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h3",
    align: "center",
    className: "u-mb-2"
  }, t('assistant.conversationBar.startMessage'))), /*#__PURE__*/_react.default.createElement(_SearchBar.default, {
    className: styles['conversationBar'],
    icon: null,
    size: "auto",
    placeholder: t('assistant.search.placeholder'),
    value: inputValue,
    disabledClear: true,
    componentsProps: {
      inputBase: {
        inputRef: inputRef,
        className: 'u-pv-0',
        rows: 1,
        multiline: true,
        inputProps: {
          className: styles['conversationBar-input']
        },
        autoFocus: !isMobile,
        startAdornment: /*#__PURE__*/_react.default.createElement(_Buttons.default, {
          classes: {
            label: 'u-w-2 u-h-2'
          },
          label: /*#__PURE__*/_react.default.createElement(_Icon.default, {
            icon: "plus",
            size: 14
          }),
          variant: "text",
          color: "inherit",
          style: {
            marginRight: 2,
            marginLeft: -12
          }
        }),
        endAdornment: /*#__PURE__*/_react.default.createElement("div", {
          style: {
            marginRight: -8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            flex: "none"
          }
        }, assistantStatus !== 'idle' ? /*#__PURE__*/_react.default.createElement(_Buttons.default, {
          component: "div",
          className: "u-miw-auto u-mih-auto u-w-2 u-h-2 u-bdrs-circle u-p-1 u-mr-1",
          classes: {
            label: 'u-flex u-w-auto'
          },
          label: /*#__PURE__*/_react.default.createElement(_Icon.default, {
            icon: _Stop.default,
            size: 12
          }),
          onClick: handleStop
        }) : /*#__PURE__*/_react.default.createElement(_Buttons.default, {
          component: "div",
          className: "u-miw-auto u-mih-auto u-w-2 u-h-2 u-bdrs-circle u-p-1 u-mr-1",
          classes: {
            label: 'u-flex u-w-auto'
          },
          label: /*#__PURE__*/_react.default.createElement(_Icon.default, {
            icon: _Paperplane.default,
            size: 14
          }),
          disabled: !inputValue,
          onClick: handleClick
        })),
        onKeyDown: function onKeyDown(ev) {
          if (!isMobile) {
            if (ev.shiftKey && ev.key === 'Enter') {
              return ev;
            }

            if (ev.key === 'Enter') {
              ev.preventDefault(); // prevent form submit

              return handleClick();
            }
          }
        }
      }
    },
    onChange: handleChange
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(styles['conversationBarSibling'], " ").concat(hasConversationStarted ? styles['conversationBarSibling--started'] : '', " u-flex u-flex-column u-flex-items-center u-flex-justify-start")
  }, /*#__PURE__*/_react.default.createElement(_ConversationChips.default, null)));
};

var _default = ConversationBar;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Conversations/ConversationChips.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _Buttons = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Buttons/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _Paperplane = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Paperplane.js"));

var _Stop = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Stop.js"));

var _SearchBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/SearchBar/index.js"));

var _Chips = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Chips/index.js"));

var _useEventListener = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/hooks/useEventListener.js"));

var _Breakpoints = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");

var _I18n = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");

var _AssistantProvider = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");

var _Typography = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Typography/index.js"));

var _TwakeAssistantIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIcon.js");

var _TwakeAssistantIconColor = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIconColor.js");

var _ExpertIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/ExpertIcon.js");

var _KnowledgeBaseIcon = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/KnowledgeBaseIcon.js");

var _Alert = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Alert/index.js"));

var _AlertTitle = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/AlertTitle/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var styles = {
  "conversationBar": "styles__conversationBar___2J-Us",
  "conversationBar-input": "styles__conversationBar-input___2DfdZ",
  "conversationBarSibling": "styles__conversationBarSibling___1KTPm",
  "conversationBarSibling--started": "styles__conversationBarSibling--started___1T7gW"
};

var ChatModes = function ChatModes() {
  var _useI18n = (0, _I18n.useI18n)(),
      t = _useI18n.t;

  var experts = [{
    key: "legal",
    label: t("assistant.experts.legal"),
    icon: 'justice',
    external: true
  }, {
    key: 'financial',
    label: t("assistant.experts.financial"),
    icon: 'benefit'
  }, {
    key: 'image_creation',
    label: t("assistant.experts.image_creation"),
    icon: 'image',
    external: true
  }, {
    key: 'marketing',
    label: t("assistant.experts.marketing"),
    icon: 'lightning'
  }, {
    key: 'code_assistant',
    label: t("assistant.experts.code_assistant"),
    icon: 'lightning'
  }, {
    key: 'brainstorming',
    label: t("assistant.experts.brainstorming"),
    icon: 'lightbulb'
  }, {
    key: 'travel_planner',
    label: t("assistant.experts.travel_planner"),
    icon: 'plane'
  }, {
    key: 'fitness_coach',
    label: t("assistant.experts.fitness_coach"),
    icon: 'fitness'
  }, {
    key: 'recipe_suggester',
    label: t("assistant.experts.recipe_suggester"),
    icon: 'restaurant'
  }];
  var knowledges = [{
    key: "twake_knowledge",
    label: t('assistant.knowledge_bases.twake_knowledge'),
    icon: _TwakeAssistantIconColor.TwakeAssistantIconColor
  }, {
    key: "web",
    label: t('assistant.knowledge_bases.web'),
    icon: 'globe'
  }, {
    key: "linagora_client",
    label: t('assistant.knowledge_bases.linagora_client'),
    icon: 'collect'
  }, {
    key: "security_procedures",
    label: t('assistant.knowledge_bases.security_procedures'),
    icon: 'lock'
  }, {
    key: "other_1",
    label: t('assistant.knowledge_bases.other'),
    icon: 'globe'
  }, {
    key: "other_2",
    label: t('assistant.knowledge_bases.other'),
    icon: 'globe'
  }, {
    key: "other_3",
    label: t('assistant.knowledge_bases.other'),
    icon: 'globe'
  }, {
    key: "other_4",
    label: t('assistant.knowledge_bases.other'),
    icon: 'globe'
  }, {
    key: "other_5",
    label: t('assistant.knowledge_bases.other'),
    icon: 'globe'
  }, {
    key: "other_6",
    label: t('assistant.knowledge_bases.other'),
    icon: 'globe'
  }];

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedExpert = _useState2[0],
      setSelectedExpert = _useState2[1];

  var _useState3 = (0, _react.useState)(knowledges.map(function (knowledge) {
    return knowledge.key;
  })),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedKnowledges = _useState4[0],
      setSelectedKnowledges = _useState4[1];

  var prevExpertRef = (0, _react.useRef)(null);
  var isExternalExpertSelected = (0, _react.useMemo)(function () {
    var expert = selectedExpert ? experts.find(function (e) {
      return e.key === selectedExpert;
    }) : null;
    return expert ? expert.external : false;
  }, [selectedExpert, experts]);
  (0, _react.useEffect)(function () {
    var prevExpert = prevExpertRef.current;
    var currentExpert = selectedExpert ? experts.find(function (e) {
      return e.key === selectedExpert;
    }) : null;

    if (!selectedExpert && prevExpert !== null) {
      setSelectedKnowledges(knowledges.map(function (knowledge) {
        return knowledge.key;
      }));
    }

    prevExpertRef.current = selectedExpert;
  }, [selectedExpert, experts, knowledges]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "u-flex u-flex-column u-flex-items-start u-flex-justify-start, u-w-100"
  }, /*#__PURE__*/_react.default.createElement(ChatKnowledges, {
    knowledges: knowledges,
    selectedKnowledges: selectedKnowledges,
    setSelectedKnowledges: setSelectedKnowledges
  }), /*#__PURE__*/_react.default.createElement(ChatExperts, {
    experts: experts,
    selectedExpert: selectedExpert,
    setSelectedExpert: setSelectedExpert
  }), isExternalExpertSelected && /*#__PURE__*/_react.default.createElement(ExternalExpertWarning, null));
};

var ChatExperts = function ChatExperts(_ref) {
  var experts = _ref.experts,
      selectedExpert = _ref.selectedExpert,
      setSelectedExpert = _ref.setSelectedExpert;

  var _useI18n2 = (0, _I18n.useI18n)(),
      t = _useI18n2.t;

  var expertsState = (0, _react.useMemo)(function () {
    return experts.map(function (expert) {
      return _objectSpread(_objectSpread({}, expert), {}, {
        selected: expert.key === selectedExpert
      });
    });
  }, [selectedExpert, experts]);
  return /*#__PURE__*/_react.default.createElement(ChatChips, {
    modes: expertsState,
    onModeSelect: function onModeSelect(key) {
      setSelectedExpert(key === selectedExpert ? null : key);
    },
    splice: 4,
    startIcon: _ExpertIcon.ExpertIcon,
    moreEndLabel: t('assistant.conversationBar.more.experts')
  });
};

var ChatKnowledges = function ChatKnowledges(_ref2) {
  var knowledges = _ref2.knowledges,
      selectedKnowledges = _ref2.selectedKnowledges,
      setSelectedKnowledges = _ref2.setSelectedKnowledges;

  var _useI18n3 = (0, _I18n.useI18n)(),
      t = _useI18n3.t;

  var knowledgesState = (0, _react.useMemo)(function () {
    return knowledges.map(function (knowledge) {
      return _objectSpread(_objectSpread({}, knowledge), {}, {
        selected: selectedKnowledges.includes(knowledge.key)
      });
    });
  }, [selectedKnowledges]);
  return /*#__PURE__*/_react.default.createElement(ChatChips, {
    modes: knowledgesState,
    onModeSelect: function onModeSelect(key) {
      if (selectedKnowledges.includes(key)) {
        setSelectedKnowledges(selectedKnowledges.filter(function (k) {
          return k !== key;
        }));
      } else {
        setSelectedKnowledges([].concat((0, _toConsumableArray2.default)(selectedKnowledges), [key]));
      }
    },
    splice: 4,
    startIcon: _KnowledgeBaseIcon.KnowledgeBaseIcon,
    moreEndLabel: t('assistant.conversationBar.more.knowledge_bases')
  });
};

var ChatChips = function ChatChips(_ref3) {
  var modes = _ref3.modes,
      onModeSelect = _ref3.onModeSelect,
      _ref3$splice = _ref3.splice,
      splice = _ref3$splice === void 0 ? 3 : _ref3$splice,
      _ref3$startIcon = _ref3.startIcon,
      startIcon = _ref3$startIcon === void 0 ? _ExpertIcon.ExpertIcon : _ref3$startIcon,
      moreEndLabel = _ref3.moreEndLabel;
  var visibleModes = modes.slice(0, splice);
  var remainingCount = modes.length - splice;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "u-flex u-flex-row u-flex-wrap u-w-100 u-flex-justify-between u-flex-items-center u-mb-1",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: startIcon,
    size: 24,
    style: {
      opacity: 0.6
    }
  }), visibleModes.map(function (mode) {
    var warningColor = mode.selected ? 'var(--warningColor)' : undefined;
    return /*#__PURE__*/_react.default.createElement(_Chips.default, {
      icon: /*#__PURE__*/_react.default.createElement(_Icon.default, {
        icon: mode.icon,
        style: {
          marginLeft: 12
        }
      }),
      label: mode.label,
      clickable: true,
      onDelete: mode.external && function () {},
      deleteIcon: mode.external && /*#__PURE__*/_react.default.createElement(_Icon.default, {
        icon: "openwith",
        className: "u-h-1",
        style: {
          fill: warningColor,
          color: warningColor
        }
      }),
      color: mode.external && mode.selected ? 'warning' : undefined,
      key: mode.label,
      variant: mode.selected ? 'ghost' : 'default',
      style: {
        borderStyle: 'solid'
      },
      className: "u-mr-0",
      onClick: function onClick() {
        onModeSelect(mode.key);
      }
    });
  }), remainingCount > 0 && /*#__PURE__*/_react.default.createElement(_Chips.default, {
    label: "+".concat(remainingCount, " ").concat(moreEndLabel || 'more'),
    clickable: true,
    variant: "outlined"
  }));
};

var ExternalExpertWarning = function ExternalExpertWarning() {
  var _useI18n4 = (0, _I18n.useI18n)(),
      t = _useI18n4.t;

  return /*#__PURE__*/_react.default.createElement(_Alert.default, {
    severity: "warning",
    style: {
      width: 'calc(100% - (16px * 2))'
    },
    action: /*#__PURE__*/_react.default.createElement(_Buttons.default, {
      variant: "text",
      label: t('assistant.experts.external_warning.know_more'),
      color: "warning"
    })
  }, /*#__PURE__*/_react.default.createElement(_AlertTitle.default, null, t('assistant.experts.external_warning.title')), t('assistant.experts.external_warning.description'));
};

var _default = ChatModes;
exports["default"] = _default;

}),

});
//# sourceMappingURL=cozy.8a9a8aaa176d67bd.hot-update.js.map