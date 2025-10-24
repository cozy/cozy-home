"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
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
"./node_modules/cozy-search/dist/components/Search/SearchBar.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _Breakpoints = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");

var _SearchBarDesktop = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchBarDesktop.js"));

var _SearchBarMobile = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchBarMobile.js"));

var _SearchProvider = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SearchBar = function SearchBar(_ref) {
  var componentsProps = _ref.componentsProps;

  var _useBreakpoints = (0, _Breakpoints.useBreakpoints)(),
      isMobile = _useBreakpoints.isMobile;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useSearch = (0, _SearchProvider.useSearch)(),
      clearSearch = _useSearch.clearSearch,
      setSelectedIndex = _useSearch.setSelectedIndex,
      delayedSetSearchValue = _useSearch.delayedSetSearchValue;

  var handleClear = function handleClear() {
    setInputValue('');
    clearSearch();
  };

  var handleChange = function handleChange(ev) {
    setSelectedIndex(0);
    delayedSetSearchValue(ev.target.value);
    setInputValue(ev.target.value);
  };

  if (isMobile) {
    return /*#__PURE__*/_react.default.createElement(_SearchBarMobile.default, {
      value: inputValue,
      onClear: handleClear,
      onChange: handleChange
    });
  }

  return /*#__PURE__*/_react.default.createElement(_SearchBarDesktop.default, (0, _extends2.default)({}, componentsProps === null || componentsProps === void 0 ? void 0 : componentsProps.SearchBarDesktop, {
    value: inputValue,
    onClear: handleClear,
    onChange: handleChange
  }));
};

var _default = SearchBar;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Search/SearchBarDesktop.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classnames = _interopRequireDefault(__webpack_require__("./node_modules/classnames/index.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _ClickAwayListener = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/ClickAwayListener/index.js"));

var _Icon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js"));

var _Magnifier = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Magnifier.js"));

var _SearchBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/SearchBar/index.js"));

var _AssistantButton = __webpack_require__("./node_modules/cozy-search/dist/components/Search/AssistantButton.js");

var _SearchProvider = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js");

var _ResultMenu = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/ResultMenu.js"));

var _helpers = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = {
  "searchBarDesktop--result": "styles__searchBarDesktop--result___2bQQy",
  "suggestionsPlaceholder": "styles__suggestionsPlaceholder___y-vsv",
  "search-bar-icon": "styles__search-bar-icon___1affF"
};

var SearchBarDesktop = function SearchBarDesktop(_ref) {
  var value = _ref.value,
      onClear = _ref.onClear,
      onChange = _ref.onChange,
      elevation = _ref.elevation,
      size = _ref.size,
      hasHalfBorderRadius = _ref.hasHalfBorderRadius,
      className = _ref.className,
      disabledHover = _ref.disabledHover;

  var _useSearch = (0, _SearchProvider.useSearch)(),
      searchValue = _useSearch.searchValue,
      results = _useSearch.results,
      selectedIndex = _useSearch.selectedIndex,
      setSelectedIndex = _useSearch.setSelectedIndex;

  var searchRef = (0, _react.useRef)();
  var listRef = (0, _react.useRef)();

  var handleKeyDown = function handleKeyDown(ev) {
    var _listRef$current;

    var listElementCount = (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.childElementCount;

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();

      if (selectedIndex === listElementCount - 1) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(function (v) {
          return v + 1;
        });
      }
    }

    if (ev.key === 'ArrowUp') {
      ev.preventDefault();

      if (selectedIndex === 0) {
        setSelectedIndex(listElementCount - 1);
      } else {
        setSelectedIndex(function (v) {
          return v - 1;
        });
      }
    }

    if (ev.key === 'Escape') {
      ev.preventDefault();
      onClear();
    }

    if (ev.key === 'Enter') {
      ev.preventDefault();

      if (selectedIndex !== undefined) {
        var _results$selectedInde;

        var onClickFn = results === null || results === void 0 ? void 0 : (_results$selectedInde = results[selectedIndex]) === null || _results$selectedInde === void 0 ? void 0 : _results$selectedInde.onClick;
        onClear();
        onClickFn();
      }
    }
  };

  return /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: onClear
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_SearchBar.default, {
    elevation: elevation,
    className: (0, _classnames.default)(className, searchValue && hasHalfBorderRadius ? styles['searchBarDesktop--result'] : ''),
    ref: searchRef,
    size: size,
    icon: size === 'large' ? /*#__PURE__*/_react.default.createElement(_Icon.default, {
      className: (0, _classnames.default)('u-mh-1', styles['search-bar-icon']),
      icon: _Magnifier.default,
      size: 24
    }) : /*#__PURE__*/_react.default.createElement(_Icon.default, {
      className: (0, _classnames.default)('u-ml-1 u-mr-half', styles['search-bar-icon']),
      icon: _Magnifier.default,
      size: 16
    }),
    value: value,
    componentsProps: {
      inputBase: {
        onKeyDown: handleKeyDown,
        endAdornment: (0, _helpers.isAssistantEnabled)() && /*#__PURE__*/_react.default.createElement(_AssistantButton.AssistantButton, {
          size: size
        })
      }
    },
    disabledClear: true,
    disabledFocus: value !== '',
    disabledHover: disabledHover,
    onChange: onChange
  }), searchValue && /*#__PURE__*/_react.default.createElement(_ResultMenu.default, {
    listRef: listRef,
    anchorRef: searchRef,
    onClear: onClear
  })));
};

SearchBarDesktop.defaultProps = {
  size: 'large',
  elevation: 0
};
var _default = SearchBarDesktop;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Search/SearchBarMobile.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _SearchBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/SearchBar/index.js"));

var styles = {
  "conversationBar": "styles__conversationBar___2J-Us",
  "conversationBar-input": "styles__conversationBar-input___2DfdZ",
  "conversationBarSibling": "styles__conversationBarSibling___1KTPm",
  "conversationBarSibling--started": "styles__conversationBarSibling--started___1T7gW"
};

var SearchBarMobile = function SearchBarMobile(_ref) {
  var value = _ref.value,
      onClear = _ref.onClear,
      onChange = _ref.onChange;

  var handleClear = function handleClear() {
    onClear();
  };

  return /*#__PURE__*/_react.default.createElement(_SearchBar.default, {
    className: styles['conversationBar'],
    size: "auto",
    icon: null,
    value: value,
    componentsProps: {
      inputBase: {
        inputProps: {
          className: styles['conversationBar-input']
        },
        autoFocus: true
      }
    },
    onChange: onChange,
    onClear: handleClear
  });
};

var _default = SearchBarMobile;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Search/SearchProvider.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useSearch = exports["default"] = exports.SearchContext = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _debounce = _interopRequireDefault(__webpack_require__("./node_modules/lodash/debounce.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/react/index.js"));

var _useFetchResult2 = __webpack_require__("./node_modules/cozy-search/dist/components/Search/useFetchResult.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SearchContext = /*#__PURE__*/_react.default.createContext();

exports.SearchContext = SearchContext;

var useSearch = function useSearch() {
  var context = (0, _react.useContext)(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};

exports.useSearch = useSearch;

var SearchProvider = function SearchProvider(_ref) {
  var children = _ref.children,
      _ref$searchOptions = _ref.searchOptions,
      searchOptions = _ref$searchOptions === void 0 ? {} : _ref$searchOptions;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      searchValue = _useState2[0],
      setSearchValue = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedIndex = _useState4[0],
      setSelectedIndex = _useState4[1];

  var _useFetchResult = (0, _useFetchResult2.useFetchResult)(searchValue, searchOptions),
      isLoading = _useFetchResult.isLoading,
      results = _useFetchResult.results;

  var delayedSetSearchValue = (0, _react.useMemo)(function () {
    return (0, _debounce.default)(setSearchValue, 250);
  }, [setSearchValue]);
  var clearSearch = (0, _react.useCallback)(function () {
    setSearchValue('');
    setSelectedIndex();
  }, []);
  var value = (0, _react.useMemo)(function () {
    return {
      searchValue: searchValue,
      setSearchValue: setSearchValue,
      delayedSetSearchValue: delayedSetSearchValue,
      isLoading: isLoading,
      clearSearch: clearSearch,
      selectedIndex: selectedIndex,
      setSelectedIndex: setSelectedIndex,
      results: results
    };
  }, [searchValue, delayedSetSearchValue, isLoading, clearSearch, selectedIndex, results]);
  return /*#__PURE__*/_react.default.createElement(SearchContext.Provider, {
    value: value
  }, children);
};

var _default = /*#__PURE__*/_react.default.memo(SearchProvider);

exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Search/getFileMimetype.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getFileMimetype = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _mimeTypes = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/node_modules/mime-types/index.js"));

var getMimetypeFromFilename = function getMimetypeFromFilename(name) {
  return _mimeTypes.default.lookup(name) || 'application/octet-stream';
};

var mappingMimetypeSubtype = {
  word: 'text',
  text: 'text',
  zip: 'zip',
  pdf: 'pdf',
  spreadsheet: 'sheet',
  excel: 'sheet',
  sheet: 'sheet',
  presentation: 'slide',
  powerpoint: 'slide'
};

var getFileMimetype = function getFileMimetype(collection) {
  return function () {
    var mime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var mimetype = mime === 'application/octet-stream' ? getMimetypeFromFilename(name.toLowerCase()) : mime;

    var _mimetype$split = mimetype.split('/'),
        _mimetype$split2 = (0, _slicedToArray2.default)(_mimetype$split, 2),
        type = _mimetype$split2[0],
        subtype = _mimetype$split2[1];

    if (collection[type]) {
      return type;
    }

    if (type === 'application') {
      var existingType = subtype.match(Object.keys(mappingMimetypeSubtype).join('|'));
      return existingType ? mappingMimetypeSubtype[existingType[0]] : undefined;
    }

    return undefined;
  };
};

exports.getFileMimetype = getFileMimetype;

}),
"./node_modules/cozy-search/dist/components/Search/getIconForSearchResult.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getIconForSearchResult = exports.getDriveMimeTypeIcon = void 0;

var _get = _interopRequireDefault(__webpack_require__("./node_modules/lodash/get.js"));

var _file = __webpack_require__("./node_modules/cozy-client/dist/models/file.js");

var _Contacts = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Contacts.js"));

var _FileTypeAudio = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeAudio.js"));

var _FileTypeBin = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeBin.js"));

var _FileTypeCode = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeCode.js"));

var _FileTypeFiles = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeFiles.js"));

var _FileTypeFolder = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeFolder.js"));

var _FileTypeImage = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeImage.js"));

var _FileTypeNote = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeNote.js"));

var _FileTypePdf = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypePdf.js"));

var _FileTypeSheet = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeSheet.js"));

var _FileTypeSlide = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeSlide.js"));

var _FileTypeText = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeText.js"));

var _FileTypeVideo = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeVideo.js"));

var _FileTypeZip = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeZip.js"));

var _DocsIcon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/Icons/DocsIcon.js"));

var _EncryptedFolderIcon = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/Icons/EncryptedFolderIcon.js"));

var _getFileMimetype = __webpack_require__("./node_modules/cozy-search/dist/components/Search/getFileMimetype.js");

var getIconForSearchResult = function getIconForSearchResult(searchResult) {
  if (searchResult.doc._type === 'io.cozy.apps') {
    return {
      type: 'app',
      app: searchResult.doc
    };
  }

  if (searchResult.slug === 'notes') {
    return {
      type: 'component',
      component: _FileTypeNote.default
    };
  }

  if (searchResult.slug === 'drive') {
    return {
      type: 'component',
      component: getDriveMimeTypeIcon(searchResult.doc)
    };
  }

  if (searchResult.slug === 'contacts') {
    return {
      type: 'component',
      component: _Contacts.default
    };
  }

  return {
    type: 'component',
    component: _FileTypeFiles.default
  };
};
/**
 * Returns the appropriate icon for a given file based on its mime type and other properties.
 *
 * This method has been copied from cozy-drive
 *
 * See source: https://github.com/cozy/cozy-drive/blob/fbe2df67199683b23a40f476ccdacb00ee027459/src/lib/getMimeTypeIcon.js
 *
 * @param {import('cozy-client/types/types').IOCozyFile} file - The io.cozy.files .
 * @param {Object} [options] - Additional options.
 * @param {boolean} [options.isEncrypted] - Indicates whether the file is encrypted. Default is false.
 * @returns {import('react').ReactNode} - The icon corresponding to the file's mime type.
 */


exports.getIconForSearchResult = getIconForSearchResult;

var getDriveMimeTypeIcon = function getDriveMimeTypeIcon(file) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$isEncrypted = _ref.isEncrypted,
      isEncrypted = _ref$isEncrypted === void 0 ? false : _ref$isEncrypted;

  var isDirectory = file.type === 'directory';
  var name = file.name,
      mime = file.mime;

  if (isEncrypted) {
    return _EncryptedFolderIcon.default;
  }

  if (isDirectory) {
    return _FileTypeFolder.default;
  } else if ((0, _file.isNote)(file)) {
    return _FileTypeNote.default;
  } else if ((0, _file.isDocs)(file)) {
    return _DocsIcon.default;
  } else {
    var iconsByMimeType = {
      audio: _FileTypeAudio.default,
      bin: _FileTypeBin.default,
      code: _FileTypeCode.default,
      image: _FileTypeImage.default,
      pdf: _FileTypePdf.default,
      slide: _FileTypeSlide.default,
      sheet: _FileTypeSheet.default,
      text: _FileTypeText.default,
      video: _FileTypeVideo.default,
      zip: _FileTypeZip.default
    };
    var type = (0, _getFileMimetype.getFileMimetype)(iconsByMimeType)(mime, name);
    return (0, _get.default)(iconsByMimeType, type, _FileTypeFiles.default);
  }
};

exports.getDriveMimeTypeIcon = getDriveMimeTypeIcon;

}),
"./node_modules/cozy-search/dist/components/Search/useFetchResult.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useFetchResult = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _react = __webpack_require__("./node_modules/react/index.js");

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var _cozyDataproxyLib = __webpack_require__("./node_modules/cozy-dataproxy-lib/dist/index.js");

var _cozyMinilog = _interopRequireDefault(__webpack_require__("./node_modules/cozy-minilog/dist/web/index.js"));

var _getIconForSearchResult = __webpack_require__("./node_modules/cozy-search/dist/components/Search/getIconForSearchResult.js");

var _excluded = ["maxRetries", "delay"];
var log = (0, _cozyMinilog.default)('🔍 [useFetchResult]');

var searchWithRetry = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dataProxy, searchValue) {
    var options,
        _options$maxRetries,
        maxRetries,
        _options$delay,
        delay,
        searchOptions,
        currentDelay,
        attempt,
        searchResults,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            _options$maxRetries = options.maxRetries, maxRetries = _options$maxRetries === void 0 ? 5 : _options$maxRetries, _options$delay = options.delay, delay = _options$delay === void 0 ? 500 : _options$delay, searchOptions = (0, _objectWithoutProperties2.default)(options, _excluded);
            currentDelay = delay; // Make several search attemps in case it is not ready yet

            attempt = 0;

          case 4:
            if (!(attempt < maxRetries)) {
              _context.next = 17;
              break;
            }

            _context.next = 7;
            return dataProxy.search(searchValue, searchOptions);

          case 7:
            searchResults = _context.sent;

            if (!searchResults) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", searchResults);

          case 10:
            log.info("Search attempt ".concat(attempt + 1, " failed, retrying in ").concat(currentDelay, " ms..."));
            _context.next = 13;
            return new Promise(function (resolve) {
              return setTimeout(resolve, currentDelay);
            });

          case 13:
            currentDelay *= 2; // Exponential backoff

          case 14:
            attempt++;
            _context.next = 4;
            break;

          case 17:
            log.error("Search failed after ".concat(maxRetries, " attempts"));
            return _context.abrupt("return", []);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function searchWithRetry(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var useFetchResult = function useFetchResult(searchValue) {
  var searchOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var client = (0, _cozyClient.useClient)();
  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useState = (0, _react.useState)({
    isLoading: true,
    results: null,
    searchValue: null
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var dataProxy = (0, _cozyDataproxyLib.useDataProxy)();
  (0, _react.useEffect)(function () {
    var fetch = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(searchValue, searchOptions) {
        var searchResults, results;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (dataProxy.dataProxyServicesAvailable) {
                  _context2.next = 3;
                  break;
                }

                log.log('DataProxy services are not available. Skipping search...');
                return _context2.abrupt("return");

              case 3:
                setState({
                  isLoading: true,
                  results: null,
                  searchValue: searchValue
                });
                _context2.next = 6;
                return searchWithRetry(dataProxy, searchValue, searchOptions);

              case 6:
                searchResults = _context2.sent;
                results = searchResults.map(function (r) {
                  // Begin Retrocompatibility code, to be removed when following PR is merged: https://github.com/cozy/cozy-web-data-proxy/pull/10
                  r.slug = r.slug || r.type;
                  r.subTitle = r.subTitle || r.name; // End Retrocompatibility code

                  var icon = (0, _getIconForSearchResult.getIconForSearchResult)(r);
                  return {
                    id: r.doc._id,
                    icon: icon,
                    slug: r.slug,
                    url: r.url,
                    secondaryUrl: r.secondaryUrl,
                    primary: r.title,
                    secondary: r.subTitle,
                    onClick: function onClick() {
                      if (r.slug === client.appMetadata.slug) {
                        try {
                          var url = new URL(r.url);
                          var hash = url.hash.replace('#', '');
                          navigate(hash);
                        } catch (_unused) {
                          window.open(r.url);
                        }
                      } else {
                        window.open(r.url);
                      }
                    }
                  };
                });
                setState({
                  isLoading: false,
                  results: results,
                  searchValue: searchValue
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function fetch(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();

    if (searchValue) {
      if (searchValue !== state.searchValue) {
        fetch(searchValue, searchOptions);
      }
    } else {
      setState({
        isLoading: true,
        results: null,
        searchValue: null
      });
    }
  }, [dataProxy, searchValue, state.searchValue, setState]);
  return {
    isLoading: state.isLoading,
    results: state.results
  };
};

exports.useFetchResult = useFetchResult;

}),
"./node_modules/cozy-search/dist/components/Views/AssistantDialog.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _CozyDialogs = __webpack_require__("./node_modules/cozy-ui/transpiled/react/CozyDialogs/index.js");

var _Breakpoints = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");

var _CozyTheme = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js"));

var _AssistantProvider = _interopRequireWildcard(__webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js"));

var _Conversation = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/Conversation.js"));

var _ConversationBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ConversationBar.js"));

var _ConversationLayout = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ConversationLayout.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AssistantDialog = function AssistantDialog() {
  var _useAssistant = (0, _AssistantProvider.useAssistant)(),
      assistantState = _useAssistant.assistantState;

  var _useBreakpoints = (0, _Breakpoints.useBreakpoints)(),
      isMobile = _useBreakpoints.isMobile;

  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useSearchParams = (0, _reactRouterDom.useSearchParams)(),
      _useSearchParams2 = (0, _slicedToArray2.default)(_useSearchParams, 1),
      searchParams = _useSearchParams2[0];

  var _useParams = (0, _reactRouterDom.useParams)(),
      conversationId = _useParams.conversationId;

  var onClose = function onClose() {
    try {
      var returnPath = searchParams.get('returnPath');

      if (returnPath) {
        navigate(returnPath);
      } else {
        navigate('..');
      }
    } catch (_unused) {
      navigate('..');
    }
  };

  return /*#__PURE__*/_react.default.createElement(_CozyDialogs.FixedDialog, {
    open: true,
    fullScreen: true,
    size: "full",
    componentsProps: {
      dialogTitle: {
        className: 'u-dn'
      },
      dialogActions: {
        className: 'u-dn'
      },
      dialogContent: {
        className: 'u-p-0'
      },
      divider: {
        className: 'u-dn'
      }
    },
    disableGutters: true,
    title: isMobile ? ' ' : ' ',
    content: /*#__PURE__*/_react.default.createElement(_ConversationLayout.default, {
      conversationId: conversationId,
      assistantState: assistantState
    }),
    onClose: onClose
  });
};

var AssistantDialogWithProviders = function AssistantDialogWithProviders() {
  return /*#__PURE__*/_react.default.createElement(_CozyTheme.default, {
    variant: "normal"
  }, /*#__PURE__*/_react.default.createElement(_AssistantProvider.default, null, /*#__PURE__*/_react.default.createElement(AssistantDialog, null)));
};

var _default = AssistantDialogWithProviders;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/Views/SearchDialog.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/dist/index.js");

var _CozyDialogs = __webpack_require__("./node_modules/cozy-ui/transpiled/react/CozyDialogs/index.js");

var _CozyTheme = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js"));

var _useExtendI18n = _interopRequireDefault(__webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/useExtendI18n.js"));

var _locales = __webpack_require__("./node_modules/cozy-search/dist/locales/index.js");

var _AssistantProvider = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js"));

var _ResultMenuContent = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/ResultMenuContent.js"));

var _SearchBar = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchBar.js"));

var _SearchProvider = _interopRequireWildcard(__webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SearchDialog = function SearchDialog() {
  (0, _useExtendI18n.default)(_locales.locales);
  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useSearchParams = (0, _reactRouterDom.useSearchParams)(),
      _useSearchParams2 = (0, _slicedToArray2.default)(_useSearchParams, 1),
      searchParams = _useSearchParams2[0];

  var _useSearch = (0, _SearchProvider.useSearch)(),
      searchValue = _useSearch.searchValue;

  var onClose = function onClose() {
    try {
      var returnPath = searchParams.get('returnPath');

      if (returnPath) {
        navigate(returnPath);
      } else {
        navigate('..');
      }
    } catch (_unused) {
      navigate('..');
    }
  };

  return /*#__PURE__*/_react.default.createElement(_CozyDialogs.FixedDialog, {
    open: true,
    fullScreen: true,
    size: "full",
    disableGutters: true,
    componentsProps: {
      // don't touch padding-top in dialogTitle, there is a flagship override. Play with margin instead.
      dialogTitle: {
        className: 'u-ph-half u-pb-0 u-mt-2-half u-ov-visible'
      },
      divider: {
        className: 'u-dn'
      }
    },
    title: /*#__PURE__*/_react.default.createElement(_SearchBar.default, null),
    content: searchValue && /*#__PURE__*/_react.default.createElement(_ResultMenuContent.default, null),
    onClose: onClose
  });
};

var SearchDialogWithProviders = function SearchDialogWithProviders() {
  return /*#__PURE__*/_react.default.createElement(_CozyTheme.default, {
    variant: "normal"
  }, /*#__PURE__*/_react.default.createElement(_AssistantProvider.default, null, /*#__PURE__*/_react.default.createElement(_SearchProvider.default, null, /*#__PURE__*/_react.default.createElement(SearchDialog, null))));
};

var _default = SearchDialogWithProviders;
exports["default"] = _default;

}),
"./node_modules/cozy-search/dist/components/helpers.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.sanitizeChatContent = exports.pushMessagesIdInState = exports.makeConversationId = exports.isMessageForThisConversation = exports.isAssistantEnabled = exports.getInstantMessage = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _cozyFlags = _interopRequireDefault(__webpack_require__("./node_modules/cozy-flags/dist/index.browser.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var getInstantMessage = function getInstantMessage(assistantState) {
  return Object.keys(assistantState.message).sort(function (a, b) {
    return a - b;
  }).map(function (key) {
    return assistantState.message[key];
  }).join('');
};

exports.getInstantMessage = getInstantMessage;

var makeConversationId = function makeConversationId() {
  return "".concat(Date.now(), "-").concat(Math.floor(Math.random() * 90000) + 10000);
};

exports.makeConversationId = makeConversationId;

var pushMessagesIdInState = function pushMessagesIdInState(id, res, setState) {
  if (id !== res._id) return;
  var messagesId = res.messages.map(function (message) {
    return message.id;
  });
  setState(function (v) {
    return _objectSpread(_objectSpread({}, v), {}, {
      messagesId: messagesId
    });
  });
};

exports.pushMessagesIdInState = pushMessagesIdInState;

var isMessageForThisConversation = function isMessageForThisConversation(res, messagesId) {
  return messagesId.includes(res._id);
};

exports.isMessageForThisConversation = isMessageForThisConversation;

var isAssistantEnabled = function isAssistantEnabled() {
  return (0, _cozyFlags.default)('cozy.assistant.enabled');
};
/**
 * Sanitize chat content by removing special sources tags like
 * [REF]...[/REF] or [doc_X] that are not currently handled.
 *
 * @param {string} content - content to sanitize
 * @returns {string} sanitized content
 */


exports.isAssistantEnabled = isAssistantEnabled;

var sanitizeChatContent = function sanitizeChatContent(content) {
  if (!content) {
    return '';
  }

  return content // Remove REFdoc_1/REF
  .replace(/\s?\[REF\][\s\S]*?\[\/REF\]/g, '') // Remove [REF]doc_1[/REF]
  .replace(/\s?REF[\s\S]*?\/REF/g, '') // remove « [doc_1] »
  .replace(/\s?\[doc_\d+\]/g, '');
};

exports.sanitizeChatContent = sanitizeChatContent;

}),
"./node_modules/cozy-search/dist/components/queries.js": (function (__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.buildRecentConversationsQuery = exports.buildMyselfQuery = exports.buildFilesByIds = exports.buildChatConversationQueryById = exports.FILES_DOCTYPE = exports.CHAT_EVENTS_DOCTYPE = exports.CHAT_CONVERSATIONS_DOCTYPE = void 0;

var _cozyClient = __webpack_require__("./node_modules/cozy-client/dist/index.js");

var CONTACTS_DOCTYPE = 'io.cozy.contacts';
var CHAT_CONVERSATIONS_DOCTYPE = 'io.cozy.ai.chat.conversations';
exports.CHAT_CONVERSATIONS_DOCTYPE = CHAT_CONVERSATIONS_DOCTYPE;
var CHAT_EVENTS_DOCTYPE = 'io.cozy.ai.chat.events';
exports.CHAT_EVENTS_DOCTYPE = CHAT_EVENTS_DOCTYPE;
var FILES_DOCTYPE = 'io.cozy.files';
exports.FILES_DOCTYPE = FILES_DOCTYPE;

var defaultFetchPolicy = _cozyClient.fetchPolicies.olderThan(86400); // 24 hours


var buildFilesByIds = function buildFilesByIds(ids) {
  return {
    definition: (0, _cozyClient.Q)(FILES_DOCTYPE).getByIds(ids),
    options: {
      as: "".concat(FILES_DOCTYPE, "/").concat(ids.join('')),
      fetchPolicy: defaultFetchPolicy
    }
  };
};

exports.buildFilesByIds = buildFilesByIds;

var buildChatConversationQueryById = function buildChatConversationQueryById(id) {
  return {
    definition: (0, _cozyClient.Q)(CHAT_CONVERSATIONS_DOCTYPE).getById(id),
    options: {
      as: "".concat(CHAT_CONVERSATIONS_DOCTYPE, "/").concat(id),
      fetchPolicy: defaultFetchPolicy,
      singleDocData: true
    }
  };
};

exports.buildChatConversationQueryById = buildChatConversationQueryById;

var buildMyselfQuery = function buildMyselfQuery() {
  return {
    definition: (0, _cozyClient.Q)(CONTACTS_DOCTYPE).where({
      me: true
    }),
    options: {
      as: "".concat(CONTACTS_DOCTYPE, "/myself"),
      fetchPolicy: defaultFetchPolicy
    }
  };
};

exports.buildMyselfQuery = buildMyselfQuery;

var buildRecentConversationsQuery = function buildRecentConversationsQuery() {
  return {
    definition: function definition() {
      return (0, _cozyClient.Q)(CHAT_CONVERSATIONS_DOCTYPE).where({
        // TODO : fix
        'cozyMetadata.updatedAt': {
          $gt: new Date("1999-01-01T00:00:00Z")
        }
      }).indexFields(['cozyMetadata.updatedAt']).sortBy([{
        'cozyMetadata.updatedAt': 'desc'
      }]).limitBy(50);
    },
    options: {
      as: CHAT_CONVERSATIONS_DOCTYPE + '/recent',
      fetchPolicy: defaultFetchPolicy
    }
  };
};

exports.buildRecentConversationsQuery = buildRecentConversationsQuery;

}),
"./node_modules/cozy-search/dist/index.js": (function (__unused_webpack_module, exports, __webpack_require__) {


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "AssistantDesktop", ({
  enumerable: true,
  get: function get() {
    return _AssistantDesktop.default;
  }
}));
Object.defineProperty(exports, "AssistantDialog", ({
  enumerable: true,
  get: function get() {
    return _AssistantDialog.default;
  }
}));
Object.defineProperty(exports, "AssistantLink", ({
  enumerable: true,
  get: function get() {
    return _AssistantLink.default;
  }
}));
Object.defineProperty(exports, "AssistantMobile", ({
  enumerable: true,
  get: function get() {
    return _AssistantMobile.default;
  }
}));
Object.defineProperty(exports, "SearchDialog", ({
  enumerable: true,
  get: function get() {
    return _SearchDialog.default;
  }
}));

var _AssistantLink = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Search/AssistantLink.js"));

var _AssistantDesktop = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/AssistantDesktop.js"));

var _AssistantMobile = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/AssistantMobile.js"));

var _AssistantDialog = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Views/AssistantDialog.js"));

var _SearchDialog = _interopRequireDefault(__webpack_require__("./node_modules/cozy-search/dist/components/Views/SearchDialog.js"));

}),
"./node_modules/cozy-search/dist/locales/index.js": (function (__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.locales = void 0;
var en = {
  assistant: {
    search: {
      placeholder: "Any question?",
      send: "Send",
      noItem: "No results",
      notEnough: "Your query must contain at least 3 characters"
    },
    conversationBar: {
      startMessage: "What can I do for you?",
      newChat: "New chat",
      more: {
        experts: "more experts",
        knowledge_bases: "more knowledge bases"
      }
    },
    conversationList: {
      recentConversations: "Recent conversations"
    },
    experts: {
      legal: "Legal",
      financial: "Financial",
      image_creation: "Image creation",
      marketing: "Marketing",
      code_assistant: "Code assistant",
      brainstorming: "Brainstorming",
      travel_planner: "Travel planner",
      fitness_coach: "Fitness coach",
      recipe_suggester: "Recipe suggester",
      web_search: "Web search",
      external_warning: {
        title: "External expert selected",
        description: "Be careful with the selected knowledge bases",
        know_more: "Know more"
      }
    },
    knowledge_bases: {
      twake_knowledge: "My Twake",
      web: "Web",
      linagora_client: "Linagora Client Base",
      security_procedures: "Security",
      other: "Other knowledge base"
    },
    dialog: {
      close: "Close"
    },
    name: "Twake Assistant",
    default_username: "Anonymous",
    sources: "%{smart_count} source |||| %{smart_count} sources",
    suggestions: {
      find_file: "Search a file",
      reimbursements: "Check my repayments",
      reorganise_files: "Reorganise my files"
    }
  }
};
var fr = {
  assistant: {
    search: {
      placeholder: "Une question ?",
      send: "Envoyer",
      noItem: "Aucun r\xE9sultat",
      notEnough: "Votre recherche doit contenir au moins 3 caract\xE8res"
    },
    conversationBar: {
      startMessage: "Comment puis-je vous aider ?",
      newChat: "Nouveau",
      more: {
        experts: "autres expertises",
        knowledge_bases: "autres bases de connaissances"
      }
    },
    conversationList: {
      recentConversations: "Conversations r\xE9centes"
    },
    experts: {
      legal: "Juridique",
      financial: "Financier",
      image_creation: "Cr\xE9ation d'images",
      marketing: "Marketing",
      code_assistant: "Assistant de code",
      brainstorming: "Brainstorming",
      travel_planner: "Planificateur de voyage",
      fitness_coach: "Coach sportif",
      recipe_suggester: "Suggestions de recettes",
      web_search: "Recherche web",
      external_warning: {
        title: "Expert externe s\xE9lectionn\xE9",
        description: "Attention aux bases de donn\xE9es s\xE9lectionn\xE9es.",
        know_more: "En savoir plus"
      }
    },
    knowledge_bases: {
      twake_knowledge: "My Twake",
      web: "Web",
      linagora_client: "Base clients Linagora",
      security_procedures: "S\xE9curit\xE9",
      other: "Autre base de connaissances"
    },
    dialog: {
      close: "Fermer"
    },
    name: "Assistant Twake",
    default_username: "Anonyme",
    sources: "%{smart_count} source |||| %{smart_count} sources",
    suggestions: {
      find_file: "Rechercher un fichier",
      reimbursements: "V\xE9rifier mes remboursements",
      reorganise_files: "R\xE9organiser mes fichiers"
    }
  }
};
var ru = {
  assistant: {
    search: {
      placeholder: "\u0415\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441?",
      send: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",
      noItem: "\u041D\u0435\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      notEnough: "\u0412\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 3 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
    },
    dialog: {
      close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
    },
    name: "\u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442 Twake",
    default_username: "\u0410\u043D\u043E\u043D\u0438\u043C\u043D\u043E",
    sources: "%{smart_count} \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A |||| %{smart_count} \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 |||| %{smart_count} \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432",
    suggestions: {
      find_file: "\u041D\u0430\u0439\u0442\u0438 \u0444\u0430\u0439\u043B",
      reimbursements: "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0432\u043E\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432",
      reorganise_files: "\u0420\u0435\u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0438 \u0444\u0430\u0439\u043B\u044B"
    }
  }
};
var vi = {
  assistant: {
    search: {
      placeholder: "C\xF3 c\xE2u h\u1ECFi n\xE0o kh\xF4ng?",
      send: "G\u1EEDi",
      noItem: "Kh\xF4ng c\xF3 k\u1EBFt qu\u1EA3",
      notEnough: "Truy v\u1EA5n c\u1EE7a b\u1EA1n ph\u1EA3i ch\u1EE9a \xEDt nh\u1EA5t 3 k\xFD t\u1EF1"
    },
    dialog: {
      close: "\u0110\xF3ng"
    },
    name: "Tr\u1EE3 l\xFD Twake",
    default_username: "\u1EA8n danh",
    sources: "%{smart_count} ngu\u1ED3n |||| %{smart_count} ngu\u1ED3n",
    suggestions: {
      find_file: "T\xECm m\u1ED9t t\u1EC7p",
      reimbursements: "Ki\u1EC3m tra c\xE1c kho\u1EA3n ho\xE0n tr\u1EA3 c\u1EE7a t\xF4i",
      reorganise_files: "S\u1EAFp x\u1EBFp l\u1EA1i c\xE1c t\u1EC7p c\u1EE7a t\xF4i"
    }
  }
};
var locales = {
  en: en,
  fr: fr,
  ru: ru,
  vi: vi
};
exports.locales = locales;

}),

});
//# sourceMappingURL=cozy.d189c456433ef292.hot-update.js.map