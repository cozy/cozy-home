"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
"./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextHighlighted.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Code copied and adapted from cozy-drive
 *
 * See source: https://github.com/cozy/cozy-drive/blob/fbe2df67199683b23a40f476ccdacb00ee027459/src/modules/search/components/SuggestionItemTextHighlighted.jsx
 */

const normalizeString = str => str
    .toString()
    .toLowerCase()
    .replace(/\//g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ');
/**
 * Add <b> on part that equlas query into each result
 *
 * @param {Array} searchResult - list of results
 * @param {string} query - search input
 * @returns list of results with the query highlighted
 */
const highlightQueryTerms = (searchResult, query) => {
    const normalizedQueryTerms = normalizeString(query);
    const normalizedResultTerms = normalizeString(searchResult);
    const matchedIntervals = [];
    const spacerLength = 1;
    let currentIndex = 0;
    normalizedResultTerms.forEach(resultTerm => {
        normalizedQueryTerms.forEach(queryTerm => {
            const index = resultTerm.indexOf(queryTerm);
            if (index >= 0) {
                matchedIntervals.push({
                    from: currentIndex + index,
                    to: currentIndex + index + queryTerm.length
                });
            }
        });
        currentIndex += resultTerm.length + spacerLength;
    });
    // matchedIntervals can overlap, so we merge them.
    // - sort the intervals by starting index
    // - add the first interval to the stack
    // - for every interval,
    // - - add it to the stack if it doesn't overlap with the stack top
    // - - or extend the stack top if the start overlaps and the new interval's top is bigger
    const mergedIntervals = matchedIntervals
        .sort((intervalA, intervalB) => intervalA.from > intervalB.from)
        .reduce((computedIntervals, newInterval) => {
        if (computedIntervals.length === 0 ||
            computedIntervals[computedIntervals.length - 1].to < newInterval.from) {
            computedIntervals.push(newInterval);
        }
        else if (computedIntervals[computedIntervals.length - 1].to < newInterval.to) {
            computedIntervals[computedIntervals.length - 1].to = newInterval.to;
        }
        return computedIntervals;
    }, []);
    // create an array containing the entire search result, with special characters, and the intervals surrounded y `<b>` tags
    const slicedOriginalResult = mergedIntervals.length > 0
        ? [react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { key: "0" }, searchResult.slice(0, mergedIntervals[0].from))]
        : searchResult;
    for (let i = 0, l = mergedIntervals.length; i < l; ++i) {
        slicedOriginalResult.push(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "u-primaryColor" }, searchResult.slice(mergedIntervals[i].from, mergedIntervals[i].to)));
        if (i + 1 < l)
            slicedOriginalResult.push(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, searchResult.slice(mergedIntervals[i].to, mergedIntervals[i + 1].from)));
    }
    if (mergedIntervals.length > 0)
        slicedOriginalResult.push(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, searchResult.slice(mergedIntervals[mergedIntervals.length - 1].to, searchResult.length)));
    return slicedOriginalResult;
};
const SuggestionItemTextHighlighted = ({ text, query }) => {
    if (!text)
        return null;
    const textHighlighted = highlightQueryTerms(text, query);
    if (Array.isArray(textHighlighted)) {
        return textHighlighted.map((item, idx) => (Object.assign(Object.assign({}, item), { key: idx })));
    }
    return textHighlighted;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuggestionItemTextHighlighted);


}),
"./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextSecondary.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/AppLinker/index.js");
/* ESM import */var cozy_ui_transpiled_react_Link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Link/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");
/* ESM import */var _SuggestionItemTextHighlighted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/SuggestionItemTextHighlighted.js");
/**
 * Code copied and adapted from cozy-drive
 *
 * See source: https://github.com/cozy/cozy-drive/blob/fbe2df67199683b23a40f476ccdacb00ee027459/src/modules/search/components/SuggestionItemTextSecondary.jsx
 */





const SuggestionItemTextSecondary = ({ text, query, url, slug }) => {
    const { isMobile } = (0,cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_2__["default"])();
    if (isMobile || !url) {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SuggestionItemTextHighlighted__WEBPACK_IMPORTED_MODULE_1__["default"], { text: text, query: query });
    }
    const app = { slug };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__["default"], { app: app, href: url }, ({ href, onClick }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_Link__WEBPACK_IMPORTED_MODULE_4__["default"], { color: "textSecondary", underline: "hover", href: href, onClick: e => {
            e.stopPropagation();
            if (typeof onClick == 'function') {
                onClick(e);
            }
        } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SuggestionItemTextHighlighted__WEBPACK_IMPORTED_MODULE_1__["default"], { text: text, query: query, slug: slug })))));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuggestionItemTextSecondary);


}),
"./node_modules/cozy-search/dist/components/Search/AssistantButton.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssistantButton: () => (AssistantButton)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* ESM import */var cozy_ui_transpiled_react_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/IconButton/index.js");
/* ESM import */var cozy_ui_transpiled_react_InputAdornment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/InputAdornment/index.js");
/* ESM import */var _AssistantIcon_TwakeAssistantIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantIcon/TwakeAssistantIcon.js");
/* ESM import */var _AssistantProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");
/* ESM import */var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");








const AssistantButton = ({ size }) => {
    const { onAssistantExecute } = (0,_AssistantProvider__WEBPACK_IMPORTED_MODULE_2__.useAssistant)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();
    const { pathname } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
    const onClick = () => {
        const conversationId = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.makeConversationId)();
        onAssistantExecute({ value: '', conversationId });
        navigate(`assistant/${conversationId}?returnPath=${pathname}`);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_InputAdornment__WEBPACK_IMPORTED_MODULE_5__["default"], { position: "end", className: "u-mr-half" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_IconButton__WEBPACK_IMPORTED_MODULE_6__["default"], { onClick: onClick, size: "small", color: "primary" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_7__["default"], { icon: _AssistantIcon_TwakeAssistantIcon__WEBPACK_IMPORTED_MODULE_1__.TwakeAssistantIcon, size: size === 'medium' ? 24 : 16 }))));
};


}),
"./node_modules/cozy-search/dist/components/Search/AssistantLink.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var _AssistantProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");
/* ESM import */var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");




const AssistantLink = ({ children }) => {
    const { onAssistantExecute } = (0,_AssistantProvider__WEBPACK_IMPORTED_MODULE_1__.useAssistant)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
    const { pathname } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
    const openAssistant = () => {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isAssistantEnabled)())
            return;
        const conversationId = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.makeConversationId)();
        onAssistantExecute({ value: '', conversationId });
        navigate(`assistant/${conversationId}?returnPath=${pathname}`);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AssistantProvider__WEBPACK_IMPORTED_MODULE_1__["default"], null, children({
        openAssistant
    })));
};
const AssistantLinkWrapper = ({ children }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AssistantProvider__WEBPACK_IMPORTED_MODULE_1__["default"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AssistantLink, null, children)));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssistantLinkWrapper);


}),
"./node_modules/cozy-search/dist/components/Search/Icons/DocsIcon.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

// TODO: should be moved in cozy-ui
const DocsIcon = () => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", { viewBox: "0 0 32 33", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M21.6305 29.5812C22.7983 29.2538 23.9166 28.6562 24.6505 27.6003C25.3749 26.5663 25.5789 25.2547 25.5789 23.9925V5.50099C25.5789 5.17358 25.5611 4.84557 25.5216 4.52148C26.1016 4.74961 26.5486 5.12658 26.8626 5.65239C27.2331 6.25024 27.4184 7.03757 27.4184 8.01435V26.7964C27.4184 28.1184 27.0942 29.1078 26.4458 29.7646C25.7974 30.4214 24.8207 30.7498 23.5155 30.7498H16.4209C16.5889 30.7204 16.7574 30.6901 16.9262 30.659C18.4067 30.3944 19.9713 30.0354 21.6185 29.5846L21.6305 29.5812Z", fill: "#C9191E" }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.58203 26.405V7.5977C4.58203 6.45251 4.88938 5.58519 5.50408 4.99575C6.1272 4.40631 6.95242 4.08212 7.97972 4.02318C9.49542 3.93055 10.9311 3.80425 12.2868 3.64425C13.6425 3.47584 14.9393 3.28217 16.1771 3.06324C17.4234 2.8443 18.6359 2.60011 19.8148 2.33065C21.0274 2.04435 21.9578 2.1875 22.6062 2.7601C23.2546 3.33269 23.5788 4.24632 23.5788 5.50099V23.9925C23.5788 25.0956 23.3893 25.9166 23.0104 26.4555C22.6315 27.0029 21.9915 27.4028 21.0905 27.6554C19.4906 28.0933 17.9833 28.4386 16.5687 28.6912C15.154 28.9522 13.7731 29.1501 12.4258 29.2848C11.0785 29.4196 9.69751 29.5248 8.28286 29.6006C7.11241 29.668 6.20299 29.4238 5.5546 28.868C4.90622 28.3207 4.58203 27.4997 4.58203 26.405ZM9.20865 11.0124C11.0635 10.8944 12.7632 10.7131 14.3075 10.4683C14.6822 10.4072 15.0564 10.3436 15.4291 10.2776C15.8192 10.2085 16.1013 9.86859 16.1013 9.47337C16.1013 8.96154 15.638 8.57609 15.135 8.66189C14.846 8.71118 14.5555 8.75909 14.2635 8.80562C12.7346 9.04923 11.0452 9.22998 9.19523 9.3477C8.91819 9.36558 8.69776 9.45188 8.55608 9.62391C8.42209 9.78661 8.35645 9.98229 8.35645 10.2053C8.35645 10.4321 8.43296 10.6295 8.58568 10.7918L8.58783 10.7939C8.75336 10.9595 8.96369 11.0311 9.20865 11.0124ZM9.20801 15.206C11.0631 15.088 12.763 14.9066 14.3075 14.6619C15.8588 14.4089 17.3936 14.1138 18.9112 13.7766C19.2191 13.7081 19.4498 13.6003 19.5652 13.433C19.6786 13.2721 19.7347 13.0876 19.7347 12.8832C19.7347 12.6526 19.6469 12.454 19.476 12.2926C19.2921 12.1189 19.0348 12.0784 18.7304 12.1411L18.7285 12.1415C17.2823 12.4694 15.794 12.7553 14.2635 12.9992C12.7346 13.2428 11.0452 13.4235 9.19523 13.5413C8.91819 13.5591 8.69776 13.6454 8.55608 13.8175C8.42276 13.9794 8.35645 14.1705 8.35645 14.3863C8.35645 14.6203 8.43209 14.8223 8.58558 14.9854L8.59 14.9896C8.75499 15.1449 8.96316 15.2155 9.20551 15.2062L9.20801 15.206ZM9.20847 19.3994C11.0634 19.2729 12.7631 19.0874 14.3075 18.8427C15.8589 18.5982 17.3934 18.3073 18.9112 17.97C19.2199 17.9014 19.4508 17.7891 19.566 17.6127C19.6783 17.4529 19.7347 17.2733 19.7347 17.0766C19.7347 16.8461 19.6469 16.6474 19.476 16.4861C19.2921 16.3123 19.0348 16.2718 18.7304 16.3345L18.729 16.3348C17.2827 16.6543 15.7942 16.9361 14.2635 17.18C12.7345 17.4236 11.045 17.6086 9.19495 17.7347C8.91804 17.7526 8.69771 17.8389 8.55608 18.0109C8.42276 18.1728 8.35645 18.3639 8.35645 18.5797C8.35645 18.8137 8.43209 19.0158 8.58558 19.1789L8.59 19.183C8.75499 19.3383 8.96316 19.4089 9.20551 19.3996L9.20847 19.3994ZM14.3075 23.007C12.7632 23.2518 11.0635 23.4331 9.20867 23.5512C8.9637 23.5698 8.75337 23.4982 8.58783 23.3326L8.58572 23.3305C8.433 23.1682 8.35645 22.9708 8.35645 22.7441C8.35645 22.521 8.42209 22.3253 8.55608 22.1626C8.69776 21.9906 8.91827 21.9043 9.19531 21.8864C11.0453 21.7687 12.7346 21.588 14.2635 21.3443C14.5555 21.2978 14.846 21.2499 15.135 21.2006C15.638 21.1148 16.1013 21.5003 16.1013 22.0121C16.1013 22.4073 15.8192 22.7472 15.4291 22.8163C15.0564 22.8823 14.6822 22.9459 14.3075 23.007Z", fill: "#000091" })));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DocsIcon);


}),
"./node_modules/cozy-search/dist/components/Search/Icons/EncryptedFolderIcon.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const EncryptedFolderIcon = props => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { opacity: "0.34", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9657 1C13.5206 1 14.2876 1.3125 14.6803 1.6995L16 3H30.0059C31.1072 3 32 3.89498 32 4.997V27.003C32 28.1059 31.1107 29 29.9983 29H2.00174C0.896211 29 0 28.1001 0 27.0088V1.99653C0 1.44616 0.448999 1 1.00472 1H12.9657Z", fill: "#297EF2" }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1 1C0.447715 1 0 1.44772 0 2V6C0 6.55228 0.447716 7 1 7H13.5858C13.851 7 14.1054 6.89464 14.2929 6.70711L15.7071 5.29289C15.8946 5.10536 16.149 5 16.4142 5H32C32 3.89543 31.1046 3 30 3H16.4142C16.149 3 15.8946 2.89464 15.7071 2.70711L14.2929 1.29289C14.1054 1.10536 13.851 1 13.5858 1H1ZM10 15.9954V24.0046C10 24.5543 10.4558 25 11.0025 25H20.9975C21.5512 25 22 24.5443 22 24.0046V15.9954C22 15.4457 21.5561 15 21 15H20V13C20 10.794 18.2053 9 16 9C13.794 9 12 10.794 12 13V15H11C10.4477 15 10 15.4557 10 15.9954ZM16 11C14.8968 11 14 12.1215 14 13.5V15H18V13.5C18 12.1215 17.1028 11 16 11ZM17.5 19C17.5 18.172 16.8265 17.5 16 17.5C15.172 17.5 14.5 18.172 14.5 19C14.5 19.552 14.803 20.032 15.25 20.29V22.75C15.25 23.1625 15.586 23.5 16 23.5C16.4125 23.5 16.75 23.1625 16.75 22.75V20.29C17.1955 20.032 17.5 19.552 17.5 19Z", fill: "#297EF2" })));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EncryptedFolderIcon);


}),
"./node_modules/cozy-search/dist/components/Search/SearchBar.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");
/* ESM import */var _SearchBarDesktop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchBarDesktop.js");
/* ESM import */var _SearchBarMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchBarMobile.js");
/* ESM import */var _SearchProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js");





const SearchBar = ({ componentsProps }) => {
    const { isMobile } = (0,cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_4__.useBreakpoints)();
    const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const { clearSearch, setSelectedIndex, delayedSetSearchValue } = (0,_SearchProvider__WEBPACK_IMPORTED_MODULE_3__.useSearch)();
    const handleClear = () => {
        setInputValue('');
        clearSearch();
    };
    const handleChange = ev => {
        setSelectedIndex(0);
        delayedSetSearchValue(ev.target.value);
        setInputValue(ev.target.value);
    };
    if (isMobile) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SearchBarMobile__WEBPACK_IMPORTED_MODULE_2__["default"], { value: inputValue, onClear: handleClear, onChange: handleChange }));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SearchBarDesktop__WEBPACK_IMPORTED_MODULE_1__["default"], Object.assign({}, componentsProps === null || componentsProps === void 0 ? void 0 : componentsProps.SearchBarDesktop, { value: inputValue, onClear: handleClear, onChange: handleChange })));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBar);


}),
"./node_modules/cozy-search/dist/components/Search/SearchBarDesktop.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var cozy_ui_transpiled_react_ClickAwayListener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/ClickAwayListener/index.js");
/* ESM import */var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_Magnifier__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Magnifier.js");
/* ESM import */var cozy_ui_transpiled_react_SearchBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/SearchBar/index.js");
/* ESM import */var _AssistantButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/AssistantButton.js");
/* ESM import */var _SearchProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js");
/* ESM import */var _styles_styl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/styles.styl");
/* ESM import */var _ResultMenu_ResultMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/ResultMenu.js");
/* ESM import */var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/cozy-search/dist/components/helpers.js");











const SearchBarDesktop = ({ value, onClear, onChange, elevation, size, hasHalfBorderRadius, className, disabledHover }) => {
    const { searchValue, results, selectedIndex, setSelectedIndex } = (0,_SearchProvider__WEBPACK_IMPORTED_MODULE_3__.useSearch)();
    const searchRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const listRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const handleKeyDown = ev => {
        var _a, _b;
        const listElementCount = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.childElementCount;
        if (ev.key === 'ArrowDown') {
            ev.preventDefault();
            if (selectedIndex === listElementCount - 1) {
                setSelectedIndex(0);
            }
            else {
                setSelectedIndex(v => v + 1);
            }
        }
        if (ev.key === 'ArrowUp') {
            ev.preventDefault();
            if (selectedIndex === 0) {
                setSelectedIndex(listElementCount - 1);
            }
            else {
                setSelectedIndex(v => v - 1);
            }
        }
        if (ev.key === 'Escape') {
            ev.preventDefault();
            onClear();
        }
        if (ev.key === 'Enter') {
            ev.preventDefault();
            if (selectedIndex !== undefined) {
                const onClickFn = (_b = results === null || results === void 0 ? void 0 : results[selectedIndex]) === null || _b === void 0 ? void 0 : _b.onClick;
                onClear();
                onClickFn();
            }
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(cozy_ui_transpiled_react_ClickAwayListener__WEBPACK_IMPORTED_MODULE_7__["default"], { onClickAway: onClear },
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null,
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(cozy_ui_transpiled_react_SearchBar__WEBPACK_IMPORTED_MODULE_8__["default"], { elevation: elevation, className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, searchValue && hasHalfBorderRadius
                    ? _styles_styl__WEBPACK_IMPORTED_MODULE_4__["default"]["searchBarDesktop--result"]
                    : ''), ref: searchRef, size: size, icon: size === 'large' ? (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_9__["default"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('u-mh-1', _styles_styl__WEBPACK_IMPORTED_MODULE_4__["default"]["search-bar-icon"]), icon: cozy_ui_transpiled_react_Icons_Magnifier__WEBPACK_IMPORTED_MODULE_10__["default"], size: 24 })) : (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_9__["default"], { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('u-ml-1 u-mr-half', _styles_styl__WEBPACK_IMPORTED_MODULE_4__["default"]["search-bar-icon"]), icon: cozy_ui_transpiled_react_Icons_Magnifier__WEBPACK_IMPORTED_MODULE_10__["default"], size: 16 })), value: value, componentsProps: {
                    inputBase: {
                        onKeyDown: handleKeyDown,
                        endAdornment: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.isAssistantEnabled)() && (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_AssistantButton__WEBPACK_IMPORTED_MODULE_2__.AssistantButton, { size: size }))
                    }
                }, disabledClear: true, disabledFocus: value !== '', disabledHover: disabledHover, onChange: onChange }),
            searchValue && (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ResultMenu_ResultMenu__WEBPACK_IMPORTED_MODULE_5__["default"], { listRef: listRef, anchorRef: searchRef, onClear: onClear })))));
};
SearchBarDesktop.defaultProps = {
    size: 'large',
    elevation: 0
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBarDesktop);


}),
"./node_modules/cozy-search/dist/components/Search/SearchBarMobile.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var cozy_ui_transpiled_react_SearchBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/SearchBar/index.js");
/* ESM import */var _Conversations_styles_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/components/Conversations/styles.styl");



const SearchBarMobile = ({ value, onClear, onChange }) => {
    const handleClear = () => {
        onClear();
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_SearchBar__WEBPACK_IMPORTED_MODULE_2__["default"], { className: _Conversations_styles_styl__WEBPACK_IMPORTED_MODULE_1__["default"].conversationBar, size: "auto", icon: null, value: value, componentsProps: {
            inputBase: {
                inputProps: {
                    className: _Conversations_styles_styl__WEBPACK_IMPORTED_MODULE_1__["default"]["conversationBar-input"]
                },
                autoFocus: true
            }
        }, onChange: onChange, onClear: handleClear }));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBarMobile);


}),
"./node_modules/cozy-search/dist/components/Search/SearchProvider.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchContext: () => (SearchContext),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  useSearch: () => (useSearch)
});
/* ESM import */var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/debounce.js");
/* ESM import */var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _useFetchResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/useFetchResult.js");



const SearchContext = react__WEBPACK_IMPORTED_MODULE_1___default().createContext();
const useSearch = () => {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
const SearchProvider = ({ children, searchOptions = {} }) => {
    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [selectedIndex, setSelectedIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { isLoading, results } = (0,_useFetchResult__WEBPACK_IMPORTED_MODULE_2__.useFetchResult)(searchValue, searchOptions);
    const delayedSetSearchValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(setSearchValue, 250), [setSearchValue]);
    const clearSearch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
        setSearchValue('');
        setSelectedIndex();
    }, []);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
        searchValue,
        setSearchValue,
        delayedSetSearchValue,
        isLoading,
        clearSearch,
        selectedIndex,
        setSelectedIndex,
        results
    }), [
        searchValue,
        delayedSetSearchValue,
        isLoading,
        clearSearch,
        selectedIndex,
        results
    ]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SearchContext.Provider, { value: value }, children));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_1___default().memo(SearchProvider));


}),
"./node_modules/cozy-search/dist/components/Search/getFileMimetype.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getFileMimetype: () => (getFileMimetype)
});
/* ESM import */var mime_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-search/node_modules/mime-types/index.js");

const getMimetypeFromFilename = name => {
    return mime_types__WEBPACK_IMPORTED_MODULE_0__.lookup(name) || 'application/octet-stream';
};
const mappingMimetypeSubtype = {
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
const getFileMimetype = collection => (mime = '', name = '') => {
    const mimetype = mime === 'application/octet-stream'
        ? getMimetypeFromFilename(name.toLowerCase())
        : mime;
    const [type, subtype] = mimetype.split('/');
    if (collection[type]) {
        return type;
    }
    if (type === 'application') {
        const existingType = subtype.match(Object.keys(mappingMimetypeSubtype).join('|'));
        return existingType ? mappingMimetypeSubtype[existingType[0]] : undefined;
    }
    return undefined;
};


}),
"./node_modules/cozy-search/dist/components/Search/getIconForSearchResult.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getDriveMimeTypeIcon: () => (getDriveMimeTypeIcon),
  getIconForSearchResult: () => (getIconForSearchResult)
});
/* ESM import */var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/get.js");
/* ESM import */var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var cozy_client_dist_models_file__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/cozy-client/dist/models/file.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_Contacts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/Contacts.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeAudio__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeAudio.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeBin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeBin.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeCode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeCode.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeFiles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeFiles.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeFolder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeFolder.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeImage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeImage.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeNote__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeNote.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypePdf__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypePdf.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeSheet__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeSheet.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeSlide__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeSlide.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeText__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeText.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeVideo__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeVideo.js");
/* ESM import */var cozy_ui_transpiled_react_Icons_FileTypeZip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icons/FileTypeZip.js");
/* ESM import */var _Icons_DocsIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/Icons/DocsIcon.js");
/* ESM import */var _Icons_EncryptedFolderIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/Icons/EncryptedFolderIcon.js");
/* ESM import */var _getFileMimetype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/getFileMimetype.js");



















const getIconForSearchResult = searchResult => {
    if (searchResult.doc._type === 'io.cozy.apps') {
        return {
            type: 'app',
            app: searchResult.doc
        };
    }
    if (searchResult.slug === 'notes') {
        return {
            type: 'component',
            component: cozy_ui_transpiled_react_Icons_FileTypeNote__WEBPACK_IMPORTED_MODULE_4__["default"]
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
            component: cozy_ui_transpiled_react_Icons_Contacts__WEBPACK_IMPORTED_MODULE_5__["default"]
        };
    }
    return {
        type: 'component',
        component: cozy_ui_transpiled_react_Icons_FileTypeFiles__WEBPACK_IMPORTED_MODULE_6__["default"]
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
const getDriveMimeTypeIcon = (file, { isEncrypted = false } = {}) => {
    const isDirectory = file.type === 'directory';
    const { name, mime } = file;
    if (isEncrypted) {
        return _Icons_EncryptedFolderIcon__WEBPACK_IMPORTED_MODULE_2__["default"];
    }
    if (isDirectory) {
        return cozy_ui_transpiled_react_Icons_FileTypeFolder__WEBPACK_IMPORTED_MODULE_7__["default"];
    }
    else if ((0,cozy_client_dist_models_file__WEBPACK_IMPORTED_MODULE_8__.isNote)(file)) {
        return cozy_ui_transpiled_react_Icons_FileTypeNote__WEBPACK_IMPORTED_MODULE_4__["default"];
    }
    else if ((0,cozy_client_dist_models_file__WEBPACK_IMPORTED_MODULE_8__.isDocs)(file)) {
        return _Icons_DocsIcon__WEBPACK_IMPORTED_MODULE_1__["default"];
    }
    else {
        const iconsByMimeType = {
            audio: cozy_ui_transpiled_react_Icons_FileTypeAudio__WEBPACK_IMPORTED_MODULE_9__["default"],
            bin: cozy_ui_transpiled_react_Icons_FileTypeBin__WEBPACK_IMPORTED_MODULE_10__["default"],
            code: cozy_ui_transpiled_react_Icons_FileTypeCode__WEBPACK_IMPORTED_MODULE_11__["default"],
            image: cozy_ui_transpiled_react_Icons_FileTypeImage__WEBPACK_IMPORTED_MODULE_12__["default"],
            pdf: cozy_ui_transpiled_react_Icons_FileTypePdf__WEBPACK_IMPORTED_MODULE_13__["default"],
            slide: cozy_ui_transpiled_react_Icons_FileTypeSlide__WEBPACK_IMPORTED_MODULE_14__["default"],
            sheet: cozy_ui_transpiled_react_Icons_FileTypeSheet__WEBPACK_IMPORTED_MODULE_15__["default"],
            text: cozy_ui_transpiled_react_Icons_FileTypeText__WEBPACK_IMPORTED_MODULE_16__["default"],
            video: cozy_ui_transpiled_react_Icons_FileTypeVideo__WEBPACK_IMPORTED_MODULE_17__["default"],
            zip: cozy_ui_transpiled_react_Icons_FileTypeZip__WEBPACK_IMPORTED_MODULE_18__["default"]
        };
        const type = (0,_getFileMimetype__WEBPACK_IMPORTED_MODULE_3__.getFileMimetype)(iconsByMimeType)(mime, name);
        return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(iconsByMimeType, type, cozy_ui_transpiled_react_Icons_FileTypeFiles__WEBPACK_IMPORTED_MODULE_6__["default"]);
    }
};


}),
"./node_modules/cozy-search/dist/components/Search/useFetchResult.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFetchResult: () => (useFetchResult)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var cozy_dataproxy_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-dataproxy-lib/dist/index.js");
/* ESM import */var cozy_minilog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-minilog/dist/web/index.js");
/* ESM import */var cozy_minilog__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_minilog__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _getIconForSearchResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/getIconForSearchResult.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};






const log = cozy_minilog__WEBPACK_IMPORTED_MODULE_2___default()('🔍 [useFetchResult]');
const searchWithRetry = (dataProxy_1, searchValue_1, ...args_1) => __awaiter(void 0, [dataProxy_1, searchValue_1, ...args_1], void 0, function* (dataProxy, searchValue, options = {}) {
    const { maxRetries = 5, delay = 500 } = options, searchOptions = __rest(options, ["maxRetries", "delay"]);
    let currentDelay = delay;
    // Make several search attemps in case it is not ready yet
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const searchResults = yield dataProxy.search(searchValue, searchOptions);
        if (searchResults) {
            // A successful search will return an array, and null otherwise
            return searchResults;
        }
        log.info(`Search attempt ${attempt + 1} failed, retrying in ${currentDelay} ms...`);
        yield new Promise(resolve => setTimeout(resolve, currentDelay));
        currentDelay *= 2; // Exponential backoff
    }
    log.error(`Search failed after ${maxRetries} attempts`);
    return [];
});
const useFetchResult = (searchValue, searchOptions = {}) => {
    const client = (0,cozy_client__WEBPACK_IMPORTED_MODULE_4__.useClient)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useNavigate)();
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        isLoading: true,
        results: null,
        searchValue: null
    });
    const dataProxy = (0,cozy_dataproxy_lib__WEBPACK_IMPORTED_MODULE_1__.useDataProxy)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const fetch = (searchValue, searchOptions) => __awaiter(void 0, void 0, void 0, function* () {
            if (!dataProxy.dataProxyServicesAvailable) {
                log.log('DataProxy services are not available. Skipping search...');
                return;
            }
            setState({ isLoading: true, results: null, searchValue });
            const searchResults = yield searchWithRetry(dataProxy, searchValue, searchOptions);
            const results = searchResults.map(r => {
                // Begin Retrocompatibility code, to be removed when following PR is merged: https://github.com/cozy/cozy-web-data-proxy/pull/10
                r.slug = r.slug || r.type;
                r.subTitle = r.subTitle || r.name;
                // End Retrocompatibility code
                const icon = (0,_getIconForSearchResult__WEBPACK_IMPORTED_MODULE_3__.getIconForSearchResult)(r);
                return {
                    id: r.doc._id,
                    icon: icon,
                    slug: r.slug,
                    url: r.url,
                    secondaryUrl: r.secondaryUrl,
                    primary: r.title,
                    secondary: r.subTitle,
                    onClick: () => {
                        if (r.slug === client.appMetadata.slug) {
                            try {
                                const url = new URL(r.url);
                                const hash = url.hash.replace('#', '');
                                navigate(hash);
                            }
                            catch (_a) {
                                window.open(r.url);
                            }
                        }
                        else {
                            window.open(r.url);
                        }
                    }
                };
            });
            setState({ isLoading: false, results, searchValue });
        });
        if (searchValue) {
            if (searchValue !== state.searchValue) {
                fetch(searchValue, searchOptions);
            }
        }
        else {
            setState({ isLoading: true, results: null, searchValue: null });
        }
    }, [dataProxy, searchValue, state.searchValue, setState]);
    return {
        isLoading: state.isLoading,
        results: state.results
    };
};


}),
"./node_modules/cozy-search/dist/components/Views/AssistantDialog.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-router-dom/dist/index.js");
/* ESM import */var cozy_ui_transpiled_react_CozyDialogs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/CozyDialogs/FixedDialog.js");
/* ESM import */var cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js");
/* ESM import */var _AssistantProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");
/* ESM import */var _Conversations_Conversation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/Conversations/Conversation.js");
/* ESM import */var _Conversations_ConversationBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ConversationBar.js");
/* ESM import */var _Conversations_ConversationLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-search/dist/components/Conversations/ConversationLayout.js");









const AssistantDialog = () => {
    const { assistantState } = (0,_AssistantProvider__WEBPACK_IMPORTED_MODULE_1__.useAssistant)();
    const { isMobile } = (0,cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_5__.useBreakpoints)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
    const [searchParams] = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useSearchParams)();
    const { conversationId } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useParams)();
    const onClose = () => {
        try {
            const returnPath = searchParams.get('returnPath');
            if (returnPath) {
                navigate(returnPath);
            }
            else {
                navigate('..');
            }
        }
        catch (_a) {
            navigate('..');
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_CozyDialogs__WEBPACK_IMPORTED_MODULE_8__["default"], { open: true, fullScreen: true, size: "full", componentsProps: {
            dialogTitle: { className: 'u-dn' },
            dialogActions: { className: 'u-dn' },
            dialogContent: { className: 'u-p-0' },
            divider: { className: 'u-dn' }
        }, disableGutters: true, title: isMobile ? ' ' : ' ', content: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Conversations_ConversationLayout__WEBPACK_IMPORTED_MODULE_4__["default"], { conversationId: conversationId, assistantState: assistantState }), onClose: onClose }));
};
const AssistantDialogWithProviders = () => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_9__["default"], { variant: "normal" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AssistantProvider__WEBPACK_IMPORTED_MODULE_1__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AssistantDialog, null))));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssistantDialogWithProviders);


}),
"./node_modules/cozy-search/dist/components/Views/SearchDialog.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-router-dom/dist/index.js");
/* ESM import */var cozy_ui_transpiled_react_CozyDialogs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/CozyDialogs/FixedDialog.js");
/* ESM import */var cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_I18n_useExtendI18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/useExtendI18n.js");
/* ESM import */var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/locales/index.js");
/* ESM import */var _AssistantProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/components/AssistantProvider.js");
/* ESM import */var _ResultMenu_ResultMenuContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/components/ResultMenu/ResultMenuContent.js");
/* ESM import */var _Search_SearchBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchBar.js");
/* ESM import */var _Search_SearchProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-search/dist/components/Search/SearchProvider.js");











const SearchDialog = () => {
    (0,cozy_ui_transpiled_react_providers_I18n_useExtendI18n__WEBPACK_IMPORTED_MODULE_6__["default"])(_locales__WEBPACK_IMPORTED_MODULE_1__.locales);
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
    const [searchParams] = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useSearchParams)();
    const { searchValue } = (0,_Search_SearchProvider__WEBPACK_IMPORTED_MODULE_5__.useSearch)();
    const onClose = () => {
        try {
            const returnPath = searchParams.get('returnPath');
            if (returnPath) {
                navigate(returnPath);
            }
            else {
                navigate('..');
            }
        }
        catch (_a) {
            navigate('..');
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_CozyDialogs__WEBPACK_IMPORTED_MODULE_9__["default"], { open: true, fullScreen: true, size: "full", disableGutters: true, componentsProps: {
            // don't touch padding-top in dialogTitle, there is a flagship override. Play with margin instead.
            dialogTitle: { className: 'u-ph-half u-pb-0 u-mt-2-half u-ov-visible' },
            divider: { className: 'u-dn' }
        }, title: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Search_SearchBar__WEBPACK_IMPORTED_MODULE_4__["default"], null), content: searchValue && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ResultMenu_ResultMenuContent__WEBPACK_IMPORTED_MODULE_3__["default"], null), onClose: onClose }));
};
const SearchDialogWithProviders = () => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_10__["default"], { variant: "normal" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AssistantProvider__WEBPACK_IMPORTED_MODULE_2__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Search_SearchProvider__WEBPACK_IMPORTED_MODULE_5__["default"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SearchDialog, null)))));
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchDialogWithProviders);


}),
"./node_modules/cozy-search/dist/locales/index.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  locales: () => (locales)
});
/* ESM import */var _en_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-search/dist/locales/en.json");
/* ESM import */var _fr_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-search/dist/locales/fr.json");
/* ESM import */var _ru_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-search/dist/locales/ru.json");
/* ESM import */var _vi_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-search/dist/locales/vi.json");




const locales = { en: _en_json__WEBPACK_IMPORTED_MODULE_0__, fr: _fr_json__WEBPACK_IMPORTED_MODULE_1__, ru: _ru_json__WEBPACK_IMPORTED_MODULE_2__, vi: _vi_json__WEBPACK_IMPORTED_MODULE_3__ };


}),
"./node_modules/cozy-search/dist/locales/en.json": (function (module) {
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"Any question?","send":"Send","noItem":"No results","notEnough":"Your query must contain at least 3 characters"},"conversationBar":{"startMessage":"What can I do for you?","newChat":"New chat","more":{"experts":"more experts","knowledge_bases":"more knowledge bases"}},"conversationList":{"recentConversations":"Recent conversations"},"experts":{"legal":"Legal","financial":"Financial","image_creation":"Image creation","marketing":"Marketing","code_assistant":"Code assistant","brainstorming":"Brainstorming","travel_planner":"Travel planner","fitness_coach":"Fitness coach","recipe_suggester":"Recipe suggester","web_search":"Web search","external_warning":{"title":"External expert selected","description":"Be careful with the selected knowledge bases","know_more":"Know more"}},"knowledge_bases":{"twake_knowledge":"My Twake","web":"Web","linagora_client":"Linagora Client Base","security_procedures":"Security","other":"Other knowledge base"},"dialog":{"close":"Close"},"name":"Twake Assistant","default_username":"Anonymous","sources":"%{smart_count} source |||| %{smart_count} sources","suggestions":{"find_file":"Search a file","reimbursements":"Check my repayments","reorganise_files":"Reorganise my files"}}}')

}),
"./node_modules/cozy-search/dist/locales/fr.json": (function (module) {
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"Une question ?","send":"Envoyer","noItem":"Aucun résultat","notEnough":"Votre recherche doit contenir au moins 3 caractères"},"conversationBar":{"startMessage":"Comment puis-je vous aider ?","newChat":"Nouveau","more":{"experts":"autres expertises","knowledge_bases":"autres bases de connaissances"}},"conversationList":{"recentConversations":"Conversations récentes"},"experts":{"legal":"Juridique","financial":"Financier","image_creation":"Création d\'images","marketing":"Marketing","code_assistant":"Assistant de code","brainstorming":"Brainstorming","travel_planner":"Planificateur de voyage","fitness_coach":"Coach sportif","recipe_suggester":"Suggestions de recettes","web_search":"Recherche web","external_warning":{"title":"Expert externe sélectionné","description":"Attention aux bases de données sélectionnées.","know_more":"En savoir plus"}},"knowledge_bases":{"twake_knowledge":"My Twake","web":"Web","linagora_client":"Base clients Linagora","security_procedures":"Sécurité","other":"Autre base de connaissances"},"dialog":{"close":"Fermer"},"name":"Assistant Twake","default_username":"Anonyme","sources":"%{smart_count} source |||| %{smart_count} sources","suggestions":{"find_file":"Rechercher un fichier","reimbursements":"Vérifier mes remboursements","reorganise_files":"Réorganiser mes fichiers"}}}')

}),
"./node_modules/cozy-search/dist/locales/ru.json": (function (module) {
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"Есть вопрос?","send":"Отправить","noItem":"Нет результатов","notEnough":"Ваш запрос должен содержать не менее 3 символов"},"dialog":{"close":"Закрыть"},"name":"Ассистент Twake","default_username":"Анонимно","sources":"%{smart_count} источник |||| %{smart_count} источника |||| %{smart_count} источников","suggestions":{"find_file":"Найти файл","reimbursements":"Проверить возмещения расходов","reorganise_files":"Реорганизовать мои файлы"}}}')

}),
"./node_modules/cozy-search/dist/locales/vi.json": (function (module) {
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"Có câu hỏi nào không?","send":"Gửi","noItem":"Không có kết quả","notEnough":"Truy vấn của bạn phải chứa ít nhất 3 ký tự"},"dialog":{"close":"Đóng"},"name":"Trợ lý Twake","default_username":"Ẩn danh","sources":"%{smart_count} nguồn |||| %{smart_count} nguồn","suggestions":{"find_file":"Tìm một tệp","reimbursements":"Kiểm tra các khoản hoàn trả của tôi","reorganise_files":"Sắp xếp lại các tệp của tôi"}}}')

}),

});
//# sourceMappingURL=cozy.eacacfb969deefcf.hot-update.js.map