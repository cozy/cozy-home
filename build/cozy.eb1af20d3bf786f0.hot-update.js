"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
"./node_modules/cozy-search/dist/stylesheet.css": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1761295117059
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
//# sourceMappingURL=cozy.eb1af20d3bf786f0.hot-update.js.map