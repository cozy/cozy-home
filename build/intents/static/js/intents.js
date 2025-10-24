(() => { // webpackBootstrap
var __webpack_modules__ = ({
"./src/styles/intents.styl": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
// extracted by css-extract-rspack-plugin
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"coz-service":"src-styles-intents__coz-service-l0LKL9","cozService":"src-styles-intents__coz-service-l0LKL9","coz-service-loading":"src-styles-intents__coz-service-loading-vytVPs","cozServiceLoading":"src-styles-intents__coz-service-loading-vytVPs","coz-service-error":"src-styles-intents__coz-service-error-AqO9Mn","cozServiceError":"src-styles-intents__coz-service-error-AqO9Mn"});
    if(true) {
      (function() {
        var localsJsonString = "{\"coz-service\":\"src-styles-intents__coz-service-l0LKL9\",\"cozService\":\"src-styles-intents__coz-service-l0LKL9\",\"coz-service-loading\":\"src-styles-intents__coz-service-loading-vytVPs\",\"cozServiceLoading\":\"src-styles-intents__coz-service-loading-vytVPs\",\"coz-service-error\":\"src-styles-intents__coz-service-error-AqO9Mn\",\"cozServiceError\":\"src-styles-intents__coz-service-error-AqO9Mn\"}";
        // 1761294525849
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
"./node_modules/cozy-harvest-lib/dist/locales sync recursive ^\\.\\/.*\\.json$": (function (module, __unused_webpack_exports, __webpack_require__) {
var map = {
  "./en.json": "./node_modules/cozy-harvest-lib/dist/locales/en.json",
  "./fr.json": "./node_modules/cozy-harvest-lib/dist/locales/fr.json",
  "./nl_NL.json": "./node_modules/cozy-harvest-lib/dist/locales/nl_NL.json",
  "./ru.json": "./node_modules/cozy-harvest-lib/dist/locales/ru.json",
  "./vi.json": "./node_modules/cozy-harvest-lib/dist/locales/vi.json"
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
webpackContext.id = "./node_modules/cozy-harvest-lib/dist/locales sync recursive ^\\.\\/.*\\.json$";


}),
"./src/locales sync recursive ^\\.\\/.*\\.json$": (function (module, __unused_webpack_exports, __webpack_require__) {
var map = {
  "./de.json": "./src/locales/de.json",
  "./en.json": "./src/locales/en.json",
  "./es.json": "./src/locales/es.json",
  "./fr.json": "./src/locales/fr.json",
  "./it.json": "./src/locales/it.json",
  "./ja.json": "./src/locales/ja.json",
  "./nl_NL.json": "./src/locales/nl_NL.json",
  "./ru.json": "./src/locales/ru.json",
  "./vi.json": "./src/locales/vi.json"
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
webpackContext.id = "./src/locales sync recursive ^\\.\\/.*\\.json$";


}),
"./src/components/AppWrapper.jsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppContext: () => (AppContext),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  setupAppContext: () => (setupAppContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-redux/es/index.js");
/* ESM import */var lodash_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/memoize.js");
/* ESM import */var lodash_memoize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var cozy_flags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-flags/dist/index.browser.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_16__);
/* ESM import */var cozy_sharing__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./node_modules/cozy-sharing/dist/index.js");
/* ESM import */var cozy_devtools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-devtools/dist/index.js");
/* ESM import */var cozy_intent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/cozy-intent/dist/index.js");
/* ESM import */var cozy_intent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_intent__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var cozy_ui_transpiled_react_providers_I18n__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");
/* ESM import */var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/redux-persist/es/integration/react.js");
/* ESM import */var cozy_ui_transpiled_react_providers_Alert__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Alert/index.js");
/* ESM import */var _store_configureStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/store/configureStore.js");
/* ESM import */var cozy_realtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/cozy-realtime/dist/index.browser.js");
/* ESM import */var cozy_device_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/cozy-device-helper/dist/index.js");
/* ESM import */var cozy_dataproxy_lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/cozy-dataproxy-lib/dist/index.js");
/* ESM import */var _hooks_useWallpaperContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./src/hooks/useWallpaperContext.tsx");
/* ESM import */var _schema__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./src/schema.js");
/* ESM import */var _ConditionalWrapper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./src/components/ConditionalWrapper.tsx");
/* ESM import */var _Sections_SectionsContext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./src/components/Sections/SectionsContext.tsx");























const dictRequire = (lang)=>__webpack_require__("./src/locales sync recursive ^\\.\\/.*\\.json$")(`./${lang}.json`);
const AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
/**
 * Setups clients and store
 *
 * Is memoized to avoid several clients in case of hot-reload
 */ const setupAppContext = lodash_memoize__WEBPACK_IMPORTED_MODULE_3___default()((intent)=>{
    const lang = document.documentElement.getAttribute('lang') || 'en';
    const context = window.context || 'cozy';
    const root = document.querySelector('[role=application]');
    const data = JSON.parse(root.dataset.cozy);
    const shouldUseWebFlagshipLink = (0,cozy_device_helper__WEBPACK_IMPORTED_MODULE_10__.isFlagshipApp)() && (0,cozy_device_helper__WEBPACK_IMPORTED_MODULE_10__.isFlagshipOfflineSupported)();
    const links = shouldUseWebFlagshipLink ? [
        new cozy_client__WEBPACK_IMPORTED_MODULE_16__.WebFlagshipLink({
            webviewIntent: intent
        })
    ] : null;
    // New improvements must be done with CozyClient
    const cozyClient = new (cozy_client__WEBPACK_IMPORTED_MODULE_16___default())({
        uri: `${window.location.protocol}//${data.domain}`,
        schema: _schema__WEBPACK_IMPORTED_MODULE_13__["default"],
        autoHydrate: true,
        token: data.token,
        useCustomStore: true,
        backgroundFetching: /*       isFlagshipApp() || */ (0,cozy_flags__WEBPACK_IMPORTED_MODULE_4__["default"])('home.store.persist') ? true : false,
        links
    });
    cozyClient.registerPlugin(cozy_flags__WEBPACK_IMPORTED_MODULE_4__["default"].plugin);
    cozyClient.registerPlugin(cozy_realtime__WEBPACK_IMPORTED_MODULE_9__.RealtimePlugin);
    // store
    const { store, persistor } = (0,_store_configureStore__WEBPACK_IMPORTED_MODULE_8__["default"])(cozyClient);
    cozyClient.setStore(store);
    return {
        cozyClient,
        store,
        data,
        lang,
        context,
        persistor
    };
});
const Inner = (param)=>{
    let { children, lang, context } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_providers_I18n__WEBPACK_IMPORTED_MODULE_17__["default"], {
        lang: lang,
        dictRequire: dictRequire,
        context: context,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Sections_SectionsContext__WEBPACK_IMPORTED_MODULE_15__.SectionsProvider, {
            children: [
                children,
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.RealTimeQueries, {
                    doctype: "io.cozy.ai.chat.conversations"
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 83,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.RealTimeQueries, {
                    doctype: "io.cozy.apps"
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 84,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.RealTimeQueries, {
                    doctype: "io.cozy.files"
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 85,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.RealTimeQueries, {
                    doctype: "io.cozy.jobs"
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.RealTimeQueries, {
                    doctype: "io.cozy.triggers"
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.RealTimeQueries, {
                    doctype: "io.cozy.konnectors"
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 88,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.RealTimeQueries, {
                    doctype: "io.cozy.settings"
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 89,
                    columnNumber: 7
                }, undefined),
                (0,cozy_flags__WEBPACK_IMPORTED_MODULE_4__["default"])('debug') ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_devtools__WEBPACK_IMPORTED_MODULE_5__["default"], {}, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 90,
                    columnNumber: 24
                }, undefined) : null
            ]
        }, void 0, true, {
            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
            lineNumber: 81,
            columnNumber: 5
        }, undefined)
    }, void 0, false, {
        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
        lineNumber: 80,
        columnNumber: 3
    }, undefined);
};
const ThemeProvider = (param)=>{
    let { children } = param;
    const { data: { isCustomWallpaper } } = (0,_hooks_useWallpaperContext__WEBPACK_IMPORTED_MODULE_12__.useWallpaperContext)();
    const { type } = (0,cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_18__.useCozyTheme)();
    const variant = type === 'light' ? 'normal' : 'inverted';
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_18__["default"], {
        variant: variant,
        className: "u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center",
        children: children
    }, void 0, false, {
        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
        lineNumber: 106,
        columnNumber: 5
    }, undefined);
};
/**
 * Setups the app context and creates all context providers and wrappers
 * for an app
 */ const AppWrapper = (param)=>{
    let { children } = param;
    const webviewIntent = (0,cozy_intent__WEBPACK_IMPORTED_MODULE_6__.useWebviewIntent)();
    const [appContext, setAppContext] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if ((0,cozy_device_helper__WEBPACK_IMPORTED_MODULE_10__.isFlagshipApp)() && !webviewIntent) return;
        const newAppContext = setupAppContext(webviewIntent);
        setAppContext(newAppContext);
    }, [
        webviewIntent
    ]);
    if (!appContext) {
        return null;
    }
    const { store, cozyClient, context, lang, persistor } = appContext;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AppContext.Provider, {
        value: appContext,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_client__WEBPACK_IMPORTED_MODULE_16__.CozyProvider, {
            client: cozyClient,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_19__.BreakpointsProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_sharing__WEBPACK_IMPORTED_MODULE_20__["default"], {
                    doctype: "io.cozy.files",
                    documentType: "Files",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_dataproxy_lib__WEBPACK_IMPORTED_MODULE_11__.DataProxyProvider, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hooks_useWallpaperContext__WEBPACK_IMPORTED_MODULE_12__.WallPaperProvider, {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_18__["default"], {
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeProvider, {
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_providers_Alert__WEBPACK_IMPORTED_MODULE_21__["default"], {
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_2__.Provider, {
                                            store: store,
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ConditionalWrapper__WEBPACK_IMPORTED_MODULE_14__.ConditionalWrapper, {
                                                condition: persistor,
                                                wrapper: (children)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_7__.PersistGate, {
                                                        loading: null,
                                                        persistor: persistor,
                                                        children: children
                                                    }, void 0, false, {
                                                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                                                        lineNumber: 151,
                                                        columnNumber: 29
                                                    }, void 0),
                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Inner, {
                                                    lang: lang,
                                                    context: context,
                                                    children: children
                                                }, void 0, false, {
                                                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                                                    lineNumber: 156,
                                                    columnNumber: 27
                                                }, undefined)
                                            }, void 0, false, {
                                                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                                                lineNumber: 148,
                                                columnNumber: 25
                                            }, undefined)
                                        }, void 0, false, {
                                            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                                            lineNumber: 147,
                                            columnNumber: 23
                                        }, undefined)
                                    }, void 0, false, {
                                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                                        lineNumber: 146,
                                        columnNumber: 21
                                    }, undefined)
                                }, void 0, false, {
                                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                                    lineNumber: 145,
                                    columnNumber: 19
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                            lineNumber: 143,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                    lineNumber: 141,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
                lineNumber: 140,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
            lineNumber: 139,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/AppWrapper.jsx",
        lineNumber: 138,
        columnNumber: 5
    }, undefined);
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(AppWrapper));


}),
"./src/components/ConditionalWrapper.tsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ConditionalWrapper: () => (ConditionalWrapper)
});
const ConditionalWrapper = (param)=>{
    let { condition, wrapper, children } = param;
    return condition ? wrapper(children) : children;
};


}),
"./src/components/KonnectorHelpers.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  STATUS: () => (STATUS),
  getAccountsFromTrigger: () => (getAccountsFromTrigger),
  getTriggersBySlug: () => (getTriggersBySlug)
});
const STATUS = {
    OK: 0,
    MAINTENANCE: 2,
    ERROR: 3,
    NO_ACCOUNT: 4,
    LOADING: 5
};
/**
 * Get accounts from triggers
 * @param {IOCozyAccount[]} accounts
 * @param {IOCozyTrigger[]} triggers
 * @returns {IOCozyAccount[]}
 */ const getAccountsFromTrigger = (accounts, triggers)=>{
    const triggerAccountIds = triggers.map((trigger)=>trigger.message.account);
    const matchingAccounts = Object.values(accounts).filter((account)=>triggerAccountIds.includes(account._id));
    return matchingAccounts;
};
/**
 * Get triggers by slug
 * @param {IOCozyTrigger[]} triggers
 * @param {IOCozyKonnector['slug']} slug
 * @returns {IOCozyTrigger[]}
 */ function getTriggersBySlug(triggers, slug) {
    return Object.values(triggers).filter((trigger)=>{
        return trigger.message && trigger.message.konnector && trigger.message.konnector === slug;
    });
}


}),
"./src/components/Sections/SectionsContext.tsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SectionsProvider: () => (SectionsProvider),
  useSections: () => (useSections)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/Breakpoints/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var lodash_keyBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/keyBy.js");
/* ESM import */var lodash_keyBy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_keyBy__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _components_Sections_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/components/Sections/utils.ts");
/* ESM import */var _lib_konnectors_typed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/konnectors_typed.ts");
/* ESM import */var _components_Sections_hooks_useMagicFolder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/components/Sections/hooks/useMagicFolder.ts");
/* ESM import */var _components_Sections_hooks_useShortcutsDirectories__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/components/Sections/hooks/useShortcutsDirectories.ts");
/* ESM import */var _queries__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/queries.js");
/* ESM import */var cozy_ui_transpiled_react_providers_I18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/index.js");
/* ESM import */var _queries_konnectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/components/Sections/queries/konnectors.ts");
/* ESM import */var _lib_formatServicesSections__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/components/Sections/lib/formatServicesSections.ts");














const _makeTriggersQuery = _queries__WEBPACK_IMPORTED_MODULE_8__.makeTriggersQuery;
const _makeAccountsQuery = _queries__WEBPACK_IMPORTED_MODULE_8__.makeAccountsQuery;
// Create a context
const SectionsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    konnectorsByCategory: [],
    shortcutsDirectories: [],
    ungroupedSections: [],
    groupedSections: [],
    isRunning: ()=>false,
    isInMaintenance: ()=>false
});
// Create a provider component
const SectionsProvider = (param)=>{
    let { children } = param;
    const magicHomeFolderId = (0,_components_Sections_hooks_useMagicFolder__WEBPACK_IMPORTED_MODULE_6__.useMagicFolder)();
    const shortcutsDirectories = (0,_components_Sections_hooks_useShortcutsDirectories__WEBPACK_IMPORTED_MODULE_7__.useShortcutsDirectories)(magicHomeFolderId);
    const { values } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_11__.useSettings)('home', [
        'shortcutsLayout'
    ]);
    const shortcutsLayout = values === null || values === void 0 ? void 0 : values.shortcutsLayout;
    const { isMobile } = (0,cozy_ui_transpiled_react_providers_Breakpoints__WEBPACK_IMPORTED_MODULE_12__["default"])();
    const client = (0,cozy_client__WEBPACK_IMPORTED_MODULE_11__.useClient)();
    const { t } = (0,cozy_ui_transpiled_react_providers_I18n__WEBPACK_IMPORTED_MODULE_13__.useI18n)();
    const { data: allTriggers } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_11__.useQueryAll)(_makeTriggersQuery.definition(), _makeTriggersQuery.options);
    const { data: accounts } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_11__.useQueryAll)(_makeAccountsQuery.definition(), _makeAccountsQuery.options);
    const { data: konnectors } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_11__.useQueryAll)(_queries__WEBPACK_IMPORTED_MODULE_8__.konnectorsConn.query, _queries__WEBPACK_IMPORTED_MODULE_8__.konnectorsConn);
    const appsAndKonnectorsInMaintenance = (0,cozy_client__WEBPACK_IMPORTED_MODULE_11__.useAppsInMaintenance)();
    const installedKonnectors = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_3__.sortBy)(konnectors, (konnector)=>konnector.name.toLowerCase()), [
        konnectors
    ]);
    const [groupedData, setGroupedData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchData = async ()=>{
            if (!client) return;
            const grouped = await (0,_queries_konnectors__WEBPACK_IMPORTED_MODULE_9__.fetchAllKonnectors)(client);
            setGroupedData(grouped);
        };
        void fetchData();
    }, [
        client
    ]);
    const sortedData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>groupedData ? (0,_lib_formatServicesSections__WEBPACK_IMPORTED_MODULE_10__.formatServicesSections)(groupedData, installedKonnectors, appsAndKonnectorsInMaintenance, t, allTriggers, accounts) : [], [
        groupedData,
        installedKonnectors,
        appsAndKonnectorsInMaintenance,
        t,
        allTriggers,
        accounts
    ]);
    const konnectorsByCategory = sortedData();
    const { ungroupedSections, groupedSections } = (0,_components_Sections_utils__WEBPACK_IMPORTED_MODULE_4__.formatSections)(shortcutsDirectories, shortcutsLayout, isMobile);
    const appsAndKonnectorsInMaintenanceBySlug = lodash_keyBy__WEBPACK_IMPORTED_MODULE_2___default()(appsAndKonnectorsInMaintenance, 'slug');
    const { data: jobData } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_11__.useQuery)(_lib_konnectors_typed__WEBPACK_IMPORTED_MODULE_5__.fetchRunningKonnectors.definition, _lib_konnectors_typed__WEBPACK_IMPORTED_MODULE_5__.fetchRunningKonnectors.options);
    const runningKonnectors = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_lib_konnectors_typed__WEBPACK_IMPORTED_MODULE_5__.getRunningKonnectors)(jobData), [
        jobData
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SectionsContext.Provider, {
        value: {
            konnectorsByCategory,
            shortcutsDirectories,
            ungroupedSections,
            groupedSections,
            isRunning: (slug)=>runningKonnectors.includes(slug),
            isInMaintenance: (slug)=>Boolean(appsAndKonnectorsInMaintenanceBySlug[slug])
        },
        children: children
    }, void 0, false, {
        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/components/Sections/SectionsContext.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, undefined);
};
// Custom hook to use the sections context
const useSections = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SectionsContext);
};


}),
"./src/components/Sections/SectionsTypes.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DisplayMode: () => (DisplayMode),
  GroupMode: () => (GroupMode)
});
var DisplayMode = /*#__PURE__*/ function(DisplayMode) {
    DisplayMode["COMPACT"] = "compact";
    DisplayMode["DETAILED"] = "detailed";
    return DisplayMode;
}({});
var GroupMode = /*#__PURE__*/ function(GroupMode) {
    GroupMode["DEFAULT"] = "default";
    GroupMode["GROUPED"] = "grouped";
    return GroupMode;
}({});


}),
"./src/components/Sections/hooks/useMagicFolder.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useMagicFolder: () => (useMagicFolder)
});
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/queries.js");


const useMagicFolder = ()=>{
    var _magicFolder_;
    const homeMagicFolderConn = (0,_queries__WEBPACK_IMPORTED_MODULE_0__.mkHomeMagicFolderConn)();
    const { data: magicFolder } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(homeMagicFolderConn.query, homeMagicFolderConn);
    return magicFolder === null || magicFolder === void 0 ? void 0 : (_magicFolder_ = magicFolder[0]) === null || _magicFolder_ === void 0 ? void 0 : _magicFolder_._id;
};


}),
"./src/components/Sections/hooks/useShortcutsDirectories.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useShortcutsDirectories: () => (useShortcutsDirectories)
});
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/queries.js");
/* ESM import */var _components_Shortcuts_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/Shortcuts/utils.js");



const useShortcutsDirectories = (magicHomeFolderId)=>{
    const homeShortcutsDirConn = (0,_queries__WEBPACK_IMPORTED_MODULE_0__.mkHomeCustomShorcutsDirConn)({
        currentFolderId: magicHomeFolderId
    });
    const canHaveShortcuts = !!magicHomeFolderId;
    const { data: folders } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_2__.useQuery)(homeShortcutsDirConn.query, {
        ...homeShortcutsDirConn.options,
        enabled: canHaveShortcuts
    });
    const customHomeShortcutsConn = (0,_queries__WEBPACK_IMPORTED_MODULE_0__.mkHomeCustomShorcutsConn)(folders && folders.map((folder)=>folder._id));
    const { data: customHomeShortcuts } = (0,cozy_client__WEBPACK_IMPORTED_MODULE_2__.useQuery)(customHomeShortcutsConn.query, {
        ...customHomeShortcutsConn,
        enabled: Boolean(folders && folders.length > 0)
    });
    return canHaveShortcuts ? (0,_components_Shortcuts_utils__WEBPACK_IMPORTED_MODULE_1__.formatShortcuts)(folders, customHomeShortcuts) : [];
};


}),
"./src/components/Sections/lib/formatServicesSections.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatServicesSections: () => (formatServicesSections)
});
/* ESM import */var _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/components/KonnectorHelpers.ts");
/* ESM import */var _components_Sections_config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/Sections/config.json");


// Determine the status of an item based on associated accounts
const getItemStatus = (accountsForKonnector)=>accountsForKonnector && accountsForKonnector.length > 0 ? _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.OK : _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.NO_ACCOUNT;
// Sort items first by status, then by localized name
const sortItemsByStatusAndName = (a, b)=>{
    if (a.status === _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.OK && b.status !== _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.OK) return -1;
    if (a.status !== _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.OK && b.status === _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.OK) return 1;
    if (a.status === _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.NO_ACCOUNT && b.status !== _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.NO_ACCOUNT) return -1;
    if (a.status !== _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.NO_ACCOUNT && b.status === _components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.STATUS.NO_ACCOUNT) return 1;
    return a.name.localeCompare(b.name);
};
// Determine if a section should be included based on whitelist or if it's not pristine
const shouldIncludeSection = (section, whitelist)=>whitelist.includes(section.name) || !section.pristine;
// Sort sections by whether they are pristine and by localized name
const sortSections = (a, b, t)=>{
    if (!a.pristine && b.pristine) return -1;
    if (a.pristine && !b.pristine) return 1;
    return t(`category.${a.name}`).localeCompare(t(`category.${b.name}`));
};
// Process and sort items within a category based on their status and name
const processAndSortItems = (items, allTriggers, accounts)=>{
    return items.map((item)=>{
        const triggers = (0,_components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.getTriggersBySlug)(allTriggers, item.slug);
        const accountsForKonnector = (0,_components_KonnectorHelpers__WEBPACK_IMPORTED_MODULE_0__.getAccountsFromTrigger)(accounts, triggers);
        return {
            ...item,
            status: getItemStatus(accountsForKonnector)
        };
    }).sort(sortItemsByStatusAndName);
};
/**
 * Formats the given data into sections for display.
 *
 * This function organizes konnectors into categorized sections, filtering out those in maintenance,
 * prioritizing installed konnectors, and including suggested konnectors where appropriate. It returns
 * a structured array of sections ready for display in the UI.
 *
 * Example of returned array:
 * [
 *   {
 *     name: 'public_service',
 *     items: [
 *       {
 *         name: 'Ameli',
 *         status: 1,
 *         slug: 'ameli',
 *         ...
 *       },
 *       {
 *         name: 'CAF',
 *         status: 2,
 *         slug: 'caf',
 *         ...
 *       }
 *     ],
 *     id: 'public_service',
 *     type: 'category',
 *     layout: {
 *       originalName: 'public_service',
 *       createdByApp: '',
 *       mobile: { detailedLines: false, grouped: true },
 *       desktop: { detailedLines: false, grouped: true },
 *       order: 0
 *     },
 *     pristine: false
 *   },
 *   ...
 * ]
 *
 * @param data - The raw data to be formatted into sections.
 * @param installedKonnectors - An array of konnectors that are installed.
 * @param suggestedKonnectors - An array of konnectors that are suggested.
 * @param appsAndKonnectorsInMaintenance - An array of konnectors and apps currently in maintenance.
 * @param t - A function for translating keys into localized strings.
 * @param allTriggers - An array of triggers associated with konnectors.
 * @param accounts - An array of accounts linked to konnectors.
 * @returns An array of formatted sections.
 */ const formatServicesSections = (data, installedKonnectors, appsAndKonnectorsInMaintenance, t, allTriggers, accounts)=>{
    // Create sets for fast lookup of installed konnector names and maintenance slugs
    const installedKonnectorNames = new Set(installedKonnectors.map((k)=>k.name));
    const maintenanceSlugs = new Set(appsAndKonnectorsInMaintenance.map((k)=>k.slug));
    // Functions to filter out items in maintenance and to check if items are installed
    const isAvailable = (item)=>!maintenanceSlugs.has(item.slug);
    const isInstalled = (item)=>installedKonnectorNames.has(item.name);
    return Object.keys(data).map((key)=>{
        const allItems = data[key] || [];
        // Filter out items that are in maintenance
        const availableItems = allItems.filter(isAvailable);
        // Filter out items that are in maintenance but keep installed ones
        const availableOrInstalledItems = allItems.filter((item)=>isAvailable(item) || isInstalled(item));
        // Filter out items that are installed
        const installedItems = availableOrInstalledItems.filter(isInstalled);
        // Determine the items to sort: prioritize installed items and add suggested ones if any, otherwise use all available items
        const itemsToSort = installedItems.length > 0 ? installedItems : availableItems;
        // Sort the items based on triggers and accounts
        const sortedItems = processAndSortItems(itemsToSort, allTriggers, accounts);
        // Construct the section with sorted items and layout details
        return {
            name: key,
            items: sortedItems,
            id: key,
            type: 'category',
            layout: {
                originalName: key,
                createdByApp: '',
                mobile: {
                    detailedLines: false,
                    grouped: true
                },
                desktop: {
                    detailedLines: false,
                    grouped: true
                },
                order: 0
            },
            pristine: installedItems.length === 0
        };
    })// Filter sections based on a whitelist to include only desired categories
    .filter((section)=>shouldIncludeSection(section, _components_Sections_config_json__WEBPACK_IMPORTED_MODULE_1__.categoriesWhitelist))// Sort the sections to maintain a consistent order
    .sort((a, b)=>sortSections(a, b, t));
};


}),
"./src/components/Sections/queries/konnectors.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  fetchAllKonnectors: () => (fetchAllKonnectors)
});
/* ESM import */var lodash_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/memoize.js");
/* ESM import */var lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_1__);


// Define the grouping function
const groupByCategory = (data)=>{
    const grouped = {};
    data.forEach((item)=>{
        if (item.latest_version && item.latest_version.manifest && item.latest_version.manifest.categories) {
            item.latest_version.manifest.categories.forEach((category)=>{
                if (!grouped[category]) {
                    grouped[category] = [];
                }
                grouped[category].push(item.latest_version.manifest);
            });
        }
    });
    return grouped;
};
// Memoize the grouping function
const memoizedGroupByCategory = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(groupByCategory);
const fetchAllKonnectors = async function(client) {
    let channel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'stable';
    const { data } = await client.query((0,cozy_client__WEBPACK_IMPORTED_MODULE_1__.Q)('io.cozy.apps_registry').getById(`konnectors/${channel}`));
    return memoizedGroupByCategory(data);
};


}),
"./src/components/Sections/utils.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  _defaultLayout: () => (_defaultLayout),
  computeDisplayMode: () => (computeDisplayMode),
  computeGroupMode: () => (computeGroupMode),
  formatSections: () => (formatSections),
  get4FirstItems: () => (get4FirstItems),
  handleSectionAction: () => (handleSectionAction)
});
/* ESM import */var _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/components/Sections/SectionsTypes.ts");

// Default layout configuration used when no specific layout is provided for a folder
const _defaultLayout = {
    mobile: {
        detailedLines: false,
        grouped: false
    },
    desktop: {
        detailedLines: false,
        grouped: false
    },
    order: Infinity,
    originalName: '',
    createdByApp: ''
};
// Creates a map of section settings by their ID for quick lookup
const createSectionsMap = (layout)=>{
    return layout.reduce((map, param)=>{
        let { id, ...rest } = param;
        if (id) {
            map[id] = rest;
        }
        return map;
    }, {});
};
// Merges a folder with its corresponding layout settings
// If no specific layout is provided, uses the default layout
const mergeFolderWithLayout = (folder, sectionsMap)=>{
    const sectionLayout = sectionsMap[folder.id] || {};
    const mergedLayout = {
        ..._defaultLayout,
        ...sectionLayout
    };
    return {
        id: folder.id,
        name: folder.name,
        items: folder.items,
        layout: mergedLayout
    };
};
// Sorts sections primarily by their 'order' property
// If two sections have the same order, sorts them alphabetically by their name
const sortSections = (sections)=>{
    return sections.sort((a, b)=>{
        const orderA = a.layout.order;
        const orderB = b.layout.order;
        // If both sections have the same order, sort alphabetically by name
        if (orderA === orderB) {
            return a.name.localeCompare(b.name);
        }
        // Otherwise, sort by order
        return orderA - orderB;
    });
};
// Formats the provided folders into grouped and ungrouped sections
// Uses the provided layout settings to determine the display mode for each section
// If no layout is provided, uses the default layout
const formatSections = (folders, layout, isMobile)=>{
    const fallback = {
        groupedSections: [],
        ungroupedSections: []
    };
    if (!folders) return fallback;
    // Create a new variable to hold the processed layout
    const processedLayout = !layout ? [] : Array.isArray(layout) ? layout : [
        layout
    ];
    // Handle the case where no layout is provided or layout is an empty array
    // Return folders sorted alphabetically by name, using the default layout
    if (processedLayout.length === 0) {
        return {
            ungroupedSections: folders.sort((a, b)=>a.name.localeCompare(b.name)).map((folder)=>({
                    id: folder.id,
                    name: folder.name,
                    items: folder.items,
                    layout: _defaultLayout
                })),
            groupedSections: []
        };
    }
    // Create a map of layout settings for quick lookup
    const sectionsMap = createSectionsMap(processedLayout);
    // Merge each folder with its corresponding layout settings
    const mergedMap = folders.map((folder)=>mergeFolderWithLayout(folder, sectionsMap));
    // Sort the merged sections based on their order and name
    const sortedSections = sortSections(mergedMap);
    const groupedSections = sortedSections.filter((section)=>section.layout[isMobile ? 'mobile' : 'desktop'].grouped);
    const ungroupedSections = sortedSections.filter((section)=>!section.layout[isMobile ? 'mobile' : 'desktop'].grouped);
    return {
        ungroupedSections,
        groupedSections
    };
};
const handleSectionAction = (section, isMobile, displayOrGroupMode, values, save)=>{
    const isDisplayMode = displayOrGroupMode === _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.DisplayMode.DETAILED || displayOrGroupMode === _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.DisplayMode.COMPACT;
    const sectionToSave = {
        ...section.layout,
        [isMobile ? 'mobile' : 'desktop']: {
            ...section.layout[isMobile ? 'mobile' : 'desktop'],
            ...isDisplayMode ? {
                detailedLines: displayOrGroupMode === _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.DisplayMode.DETAILED
            } : {
                grouped: displayOrGroupMode === _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.GroupMode.GROUPED
            }
        },
        id: section.id
    };
    const fetchedLayout = values.shortcutsLayout ?? [];
    save({
        shortcutsLayout: [
            ...fetchedLayout.filter((sectionSetting)=>sectionSetting.id !== sectionToSave.id),
            sectionToSave
        ]
    });
};
const computeDisplayMode = (isMobile, section)=>{
    const layout = section.layout[isMobile ? 'mobile' : 'desktop'];
    return layout.detailedLines ? _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.DisplayMode.DETAILED : _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.DisplayMode.COMPACT;
};
const computeGroupMode = (isMobile, section)=>{
    const layout = section.layout[isMobile ? 'mobile' : 'desktop'];
    return layout.grouped ? _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.GroupMode.GROUPED : _components_Sections_SectionsTypes__WEBPACK_IMPORTED_MODULE_0__.GroupMode.DEFAULT;
};
// Used when building the grouped view of a section (4 small icons into 1 big icon)
const get4FirstItems = (section)=>section.items.slice(0, 4);


}),
"./src/components/Shortcuts/utils.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatShortcuts: () => (formatShortcuts)
});
const formatShortcuts = (folders, shortcuts)=>{
    // folder null is when the query is not done yet
    if (folders === null) return undefined;
    // if folders is empty, we return an empty array because
    // we can't have shortcuts without folders
    if (folders.length === 0) return [];
    // shortcuts null is when the query for the shortcut is not done yet
    // and since we already checked that folders is not null, we can return undefined
    // because it means that the query for shortcuts is not done yet
    if (shortcuts === null) return undefined;
    return folders.map((folder)=>({
            id: folder._id,
            name: folder.name,
            items: shortcuts.filter((shortcut)=>shortcut.dir_id === folder._id)
        })).filter((folder)=>folder.items.length > 0);
};


}),
"./src/components/appEntryPoint.jsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _flags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/flags.js");


const ACCOUNT_DOCTYPE = 'io.cozy.accounts';
const KONNECTOR_DOCTYPE = 'io.cozy.konnectors';
const TRIGGER_DOCTYPE = 'io.cozy.triggers';
const OLDER_THAN_THIRTY_SECONDS = cozy_client__WEBPACK_IMPORTED_MODULE_1___default().fetchPolicies.olderThan(30 * 1000);
const appEntryPoint = (0,cozy_client__WEBPACK_IMPORTED_MODULE_1__.queryConnect)({
    accounts: {
        query: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_1__.Q)(ACCOUNT_DOCTYPE),
        as: 'io.cozy.accounts',
        fetchPolicy: OLDER_THAN_THIRTY_SECONDS
    },
    konnectors: {
        query: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_1__.Q)(KONNECTOR_DOCTYPE),
        as: 'io.cozy.konnectors',
        fetchPolicy: OLDER_THAN_THIRTY_SECONDS
    },
    triggers: {
        query: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_1__.Q)(TRIGGER_DOCTYPE).where({
                worker: {
                    $in: [
                        'client',
                        'konnector'
                    ]
                }
            }),
        as: 'io.cozy.triggers/by_worker_client_konnector',
        fetchPolicy: OLDER_THAN_THIRTY_SECONDS
    }
});
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appEntryPoint);


}),
"./src/containers/IntentHandler.jsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var cozy_interapp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-interapp/dist/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_I18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/I18n/translate.js");
/* ESM import */var cozy_ui_transpiled_react_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Spinner/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js");
/* ESM import */var _components_appEntryPoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/components/appEntryPoint.jsx");
/* ESM import */var _containers_IntentService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/containers/IntentService.jsx");









class IntentHandler extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    terminate(account) {
        const { service } = this.state;
        service.terminate(account);
    }
    cancel() {
        const { service } = this.state;
        service.cancel();
    }
    handleError(error) {
        this.setState({
            error: {
                message: 'intent.service.error.creation',
                reason: error.message
            }
        });
        throw error;
    }
    render() {
        const { accounts, konnectors, triggers, t } = this.props;
        const { error, service } = this.state;
        let { isInitializing } = this.state;
        isInitializing = isInitializing || [
            accounts,
            konnectors,
            triggers
        ].find((collection)=>[
                'pending',
                'loading'
            ].includes(collection.fetchStatus));
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_5__["default"], {
            variant: "normal",
            className: "u-pos-absolute",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "coz-service",
                children: [
                    isInitializing && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "coz-service-loading",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_Spinner__WEBPACK_IMPORTED_MODULE_6__["default"], {
                            size: "xxlarge"
                        }, void 0, false, {
                            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this),
                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "coz-error coz-service-error",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                children: t(error.message)
                            }, void 0, false, {
                                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                children: t('intent.service.error.cause', {
                                    error: error.reason
                                })
                            }, void 0, false, {
                                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, this),
                    !isInitializing && !error && // Here we should render a component based on the intent action.
                    // For now, our action is only CREATE on io.cozy.accounts. So here
                    // we should render a component named CreateAccountService.
                    // IntentService is just here for legacy reason and should
                    // disappear.
                    // In the future we may test the intent action and render a
                    // specific component for every action.
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_containers_IntentService__WEBPACK_IMPORTED_MODULE_4__["default"], {
                        data: service.getData(),
                        onTerminate: (account)=>this.terminate(account),
                        onCancel: ()=>this.cancel(),
                        service: service
                    }, void 0, false, {
                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/containers/IntentHandler.jsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    constructor(props, context){
        super(props, context);
        this.state = {
            isInitializing: true
        };
        const intent = new cozy_interapp__WEBPACK_IMPORTED_MODULE_2__["default"]({
            client: this.props.client
        });
        intent.createService()// eslint-disable-next-line promise/always-return
        .then((service)=>{
            this.setState({
                isInitializing: false,
                service: service
            });
        }).catch((error)=>{
            this.setState({
                isInitializing: false,
                error: {
                    message: 'intent.service.error.initialization',
                    reason: error.message
                }
            });
        });
    }
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_components_appEntryPoint__WEBPACK_IMPORTED_MODULE_3__["default"])((0,cozy_ui_transpiled_react_providers_I18n__WEBPACK_IMPORTED_MODULE_7__["default"])()((0,cozy_client__WEBPACK_IMPORTED_MODULE_8__.withClient)(IntentHandler))));


}),
"./src/containers/IntentService.jsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/queries.js");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-router/dist/index.js");




const IntentService = (param)=>{
    let { data, service } = param;
    const client = (0,cozy_client__WEBPACK_IMPORTED_MODULE_2__.useClient)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const fetchData = async ()=>{
            let konnectorReq;
            try {
                konnectorReq = await client.query((0,_queries__WEBPACK_IMPORTED_MODULE_1__.fetchKonnectorBySlug)(data.slug).query, _queries__WEBPACK_IMPORTED_MODULE_1__.fetchKonnectorBySlug);
            } catch (e) {
                // why an error is throwed?
                // eslint-disable-next-line
                console.log('e', e);
            } finally{
                if (service && (!konnectorReq || konnectorReq.data.length === 0)) {
                    const installedKonnector = await service.compose('INSTALL', 'io.cozy.apps', data);
                    // setKonnectorData(installedKonnector)
                    navigate(`/${service.getData().slug}/new`);
                    // if installedKonnector is null, it means the installation have been
                    // cancelled
                    if (!installedKonnector) {
                        service.cancel();
                    }
                } else {
                    if (service) {
                        const intent = service.getIntent();
                        if (service.hideCross) {
                            service.hideCross();
                        }
                        if (intent.action === 'VIEW' && intent.type === 'io.cozy.accounts') {
                            navigate(`/${service.getData().slug}/accounts/${data.accountId}`);
                        } else {
                            navigate(`/${service.getData().slug}/new`);
                        }
                    }
                }
            }
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IntentService);


}),
"./src/flags.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* ESM import */var cozy_flags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-flags/dist/index.browser.js");

(0,cozy_flags__WEBPACK_IMPORTED_MODULE_0__["default"])('harvest.bi-konnector-policy', true);


}),
"./src/hooks/useWallpaper.jsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/localforage/dist/localforage.js");
/* ESM import */var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);



const useWallpaper = ()=>{
    const client = (0,cozy_client__WEBPACK_IMPORTED_MODULE_2__.useClient)();
    const [wallpaperLink, setWallpaperLink] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [fetchStatus, setFetchStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle');
    const [binaryCustomWallpaper, setBinaryCustomWallpaper] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { cozyDefaultWallpaper } = client.getInstanceOptions();
    const [widgets, setWidgets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([
        1,
        2
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const fetchData = async ()=>{
            // happy path, in order to avoid a flash of the default wallpaper
            if (localStorage.getItem('hasCustomWallpaper') !== 'true') {
                setWallpaperLink(cozyDefaultWallpaper);
            }
            try {
                setFetchStatus('loading');
                const link = await localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem('customWallpaper');
                if (link) {
                    setWallpaperLink(link);
                    setFetchStatus('loaded');
                    return;
                }
            /*
        const binary = await localForage.getItem('customWallpaper')
        if (binary) {
          setBinaryCustomWallpaper(binary)
        }
        const response = await client
          .collection('io.cozy.files')
          .getDownloadLinkByPath(homeConfig.customWallpaperPath)
        setWallpaperLink(response)
        setFetchStatus('loaded')
        const fetchBinary = await fetch(response)
        const blob = await fetchBinary.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = async () => {
          const base64data = reader.result
          setBinaryCustomWallpaper(base64data)
          await localForage.setItem('customWallpaper', base64data)
          localStorage.setItem('hasCustomWallpaper', true)
        }
          */ } catch (error) {
                await localforage__WEBPACK_IMPORTED_MODULE_1___default().removeItem('customWallpaper');
                localStorage.setItem('hasCustomWallpaper', false);
                setWallpaperLink(cozyDefaultWallpaper);
                setBinaryCustomWallpaper(null);
                setFetchStatus('failed');
            }
        };
        fetchData();
    }, [
        client,
        cozyDefaultWallpaper
    ]);
    const setWallpaperLinkAndStore = async (link)=>{
        setWallpaperLink(link);
        if (link === cozyDefaultWallpaper) {
            await localforage__WEBPACK_IMPORTED_MODULE_1___default().removeItem('customWallpaper');
            localStorage.setItem('hasCustomWallpaper', false);
            setBinaryCustomWallpaper(null);
        }
        localStorage.setItem('hasCustomWallpaper', true);
        await localforage__WEBPACK_IMPORTED_MODULE_1___default().setItem('customWallpaper', link);
    };
    const returnToDefaultWallpaper = async ()=>{
        setWallpaperLink(cozyDefaultWallpaper);
        await localforage__WEBPACK_IMPORTED_MODULE_1___default().removeItem('customWallpaper');
        localStorage.setItem('hasCustomWallpaper', false);
        setBinaryCustomWallpaper(null);
    };
    return {
        data: {
            wallpaperLink,
            binaryCustomWallpaper,
            widgets,
            isCustomWallpaper: Boolean(wallpaperLink && wallpaperLink !== cozyDefaultWallpaper || binaryCustomWallpaper)
        },
        setWallpaperLink: setWallpaperLinkAndStore,
        returnToDefaultWallpaper,
        installWidget: (widgetIndex)=>{
            if (widgets.length >= 2) return;
            setWidgets([
                ...widgets,
                widgetIndex
            ]);
        },
        uninstallWidget: (widgetIndex)=>{
            setWidgets(widgets.filter((i)=>i !== widgetIndex));
        },
        fetchStatus
    };
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWallpaper);


}),
"./src/hooks/useWallpaperContext.tsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WallPaperProvider: () => (WallPaperProvider),
  useWallpaperContext: () => (useWallpaperContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _useWallpaper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/hooks/useWallpaper.jsx");



const WallPaperContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext(undefined);
const WallPaperProvider = (param)=>{
    let { children } = param;
    const data = (0,_useWallpaper__WEBPACK_IMPORTED_MODULE_2__["default"])();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WallPaperContext.Provider, {
        value: data,
        children: children
    }, void 0, false, {
        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/hooks/useWallpaperContext.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
const useWallpaperContext = ()=>{
    const context = react__WEBPACK_IMPORTED_MODULE_1___default().useContext(WallPaperContext);
    if (context === undefined) {
        throw new Error('useWallpaperContext must be used within a WallpaperProvider');
    }
    return context;
};


}),
"./src/lib/konnectors_typed.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  fetchRunningKonnectors: () => (fetchRunningKonnectors),
  getRunningKonnectors: () => (getRunningKonnectors)
});
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @description Fetches the list of running jobs for konnectors.
 * The select command only works during the first request.
 * Realtime requests will receive the whole Job object.
 * So in any case we have to map the fetched data before giving it to the view.
 *
 * @example
 * const { data: runningKonnectors } = useQuery(
 *  fetchRunningKonnectors.definition,
 * fetchRunningKonnectors.options
 * )
 */ const fetchRunningKonnectors = {
    definition: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.jobs').select([
            'message.konnector',
            'worker',
            'state'
        ]).indexFields([
            'started_at'
        ]).sortBy([
            {
                started_at: 'desc'
            }
        ]).partialIndex({
            worker: {
                $or: [
                    'konnector',
                    'client'
                ]
            },
            state: 'running'
        }),
    options: {
        as: 'io.cozy.jobs/running/konnector/messageKonnector'
    }
};
/**
 * @description Returns the list of running konnectors from the list of jobs as
 * an array of strings (the konnector slugs) or an empty array if <br />
 * the list of running jobs is empty.
 *
 * @example
 * const { data } = useQuery(
    fetchRunningKonnectors.definition,
    fetchRunningKonnectors.options
  )
 * const runningKonnectors = getRunningKonnectors(data)
 */ const getRunningKonnectors = (jobData)=>{
    try {
        if (Array.isArray(jobData) && jobData.length > 0) {
            return jobData.map((job)=>job.message.konnector);
        } else return [];
    } catch  {
        return [];
    }
};


}),
"./src/queries.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  appsConn: () => (appsConn),
  buildExistingTimeseriesGeojsonQuery: () => (buildExistingTimeseriesGeojsonQuery),
  defaultFetchPolicy: () => (defaultFetchPolicy),
  fetchKonnectorBySlug: () => (fetchKonnectorBySlug),
  homeSettingsConn: () => (homeSettingsConn),
  instanceSettingsConn: () => (instanceSettingsConn),
  konnectorsConn: () => (konnectorsConn),
  makeAccountsQuery: () => (makeAccountsQuery),
  makeAppsQuery: () => (makeAppsQuery),
  makeContextQuery: () => (makeContextQuery),
  makeJobsQuery: () => (makeJobsQuery),
  makeKonnectorsQuery: () => (makeKonnectorsQuery),
  makeTriggersQuery: () => (makeTriggersQuery),
  makeTriggersWithJobStatusQuery: () => (makeTriggersWithJobStatusQuery),
  mkHomeCustomShorcutsConn: () => (mkHomeCustomShorcutsConn),
  mkHomeCustomShorcutsDirConn: () => (mkHomeCustomShorcutsDirConn),
  mkHomeMagicFolderConn: () => (mkHomeMagicFolderConn)
});
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_0__);

const defaultFetchPolicy = cozy_client__WEBPACK_IMPORTED_MODULE_0___default().fetchPolicies.olderThan(30 * 1000);
const appsConn = {
    query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.apps'),
    as: 'io.cozy.apps',
    fetchPolicy: defaultFetchPolicy
};
const konnectorsConn = {
    query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.konnectors'),
    as: 'io.cozy.konnectors',
    fetchPolicy: defaultFetchPolicy
};
const makeJobsQuery = {
    definition: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.jobs'),
    options: {
        as: 'io.cozy.jobs',
        fetchPolicy: defaultFetchPolicy
    }
};
const makeAppsQuery = {
    definition: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.apps'),
    options: {
        as: 'io.cozy.apps',
        fetchPolicy: defaultFetchPolicy
    }
};
const makeKonnectorsQuery = {
    definition: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.konnectors'),
    options: {
        as: 'io.cozy.konnectors',
        fetchPolicy: defaultFetchPolicy
    }
};
const makeTriggersQuery = {
    definition: ()=>{
        return (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.triggers').partialIndex({
            worker: {
                $in: [
                    'client',
                    'konnector'
                ]
            } // client is for CLISK
        }).limitBy(1000);
    },
    options: {
        as: 'io.cozy.triggers/worker=client-or-konnector',
        fetchPolicy: defaultFetchPolicy
    }
};
const makeTriggersWithJobStatusQuery = {
    definition: ()=>{
        return (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.triggers').where({
            worker: {
                $in: [
                    'client',
                    'konnector'
                ]
            } // client is for CLISK
        }).limitBy(1000);
    },
    options: {
        as: 'io.cozy.triggers/worker=client-or-konnector/withjobstatus',
        fetchPolicy: defaultFetchPolicy
    }
};
const makeAccountsQuery = {
    definition: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.accounts'),
    options: {
        as: 'io.cozy.accounts',
        fetchPolicy: defaultFetchPolicy
    }
};
const instanceSettingsConn = {
    query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.settings').getById('io.cozy.settings.instance'),
    as: 'io.cozy.settings/io.cozy.settings.instance',
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true
};
const homeSettingsConn = {
    query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.home.settings').limitBy(1),
    as: 'io.cozy.home.settings',
    fetchPolicy: defaultFetchPolicy
};
const mkHomeMagicFolderConn = ()=>{
    return {
        query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.files').where({
            path: '/Settings/Home'
        }).indexFields([
            'path'
        ]),
        as: 'home/io.cozy.files/path=magic-folder',
        fetchPolicy: defaultFetchPolicy
    };
};
const fetchKonnectorBySlug = (slug)=>{
    return {
        query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.konnectors').getById(`io.cozy.konnectors/${slug}`),
        as: `io.cozy.konnectors/${slug}`,
        fetchPolicy: defaultFetchPolicy
    };
};
const mkHomeCustomShorcutsDirConn = (param)=>{
    let { currentFolderId, type = 'directory', sortAttribute = 'name', sortOrder = 'asc' } = param;
    return {
        query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.files').where({
            dir_id: currentFolderId,
            type,
            [sortAttribute]: {
                $gt: null
            }
        }).partialIndex({
            _id: {
                $ne: 'io.cozy.files.trash-dir'
            }
        }).indexFields([
            'dir_id',
            'type',
            sortAttribute
        ]).sortBy([
            {
                dir_id: sortOrder
            },
            {
                type: sortOrder
            },
            {
                [sortAttribute]: sortOrder
            }
        ]).limitBy(100),
        options: {
            as: `${type} ${currentFolderId} ${sortAttribute} ${sortOrder}`,
            fetchPolicy: defaultFetchPolicy
        }
    };
};
const mkHomeCustomShorcutsConn = (foldersId)=>{
    return {
        query: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.files').where({
            class: 'shortcut',
            dir_id: {
                $in: foldersId
            },
            name: {
                $gt: null
            }
        }).indexFields([
            'class',
            'dir_id',
            'name'
        ]).sortBy([
            {
                class: 'asc'
            },
            {
                dir_id: 'asc'
            },
            {
                name: 'asc'
            }
        ]).limitBy(100),
        as: 'home-shortcuts',
        fetchPolicy: defaultFetchPolicy
    };
};
const makeContextQuery = {
    definition: ()=>(0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.settings').getById('io.cozy.settings.context'),
    options: {
        as: 'io.cozy.settings/io.cozy.settings.context',
        fetchPolicy: defaultFetchPolicy,
        singleDocData: true
    }
};
const buildExistingTimeseriesGeojsonQuery = ()=>({
        definition: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)('io.cozy.timeseries.geojson').where({
            _id: {
                $gt: null
            }
        }).select([
            '_id'
        ]).indexFields([
            '_id'
        ]).limitBy(1),
        options: {
            as: 'io.cozy.timeseries.geojson/existing-timeseries-geojson',
            fetchPolicy: cozy_client__WEBPACK_IMPORTED_MODULE_0___default().fetchPolicies.olderThan(60 * 60 * 24 * 365 * 1000)
        }
    });


}),
"./src/reducers/index.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  getAccountsWithErrors: () => (getAccountsWithErrors),
  getTriggersByKonnector: () => (getTriggersByKonnector),
  getTriggersInError: () => (getTriggersInError)
});
/* ESM import */var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/redux/es/redux.js");
/* ESM import */var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/get.js");
/* ESM import */var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);


const isKonnectorTrigger = (doc)=>doc._type === 'io.cozy.triggers' && !!doc.message && !!doc.message.konnector;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((cozyClient)=>(0,redux__WEBPACK_IMPORTED_MODULE_1__.combineReducers)({
        cozy: cozyClient.reducer()
    }));
// selectors
const getTriggersByKonnector = (state, konnectorSlug)=>{
    const triggersInState = state.cozy.documents['io.cozy.triggers'] || {};
    const triggers = Object.keys(triggersInState).reduce((acc, key)=>{
        const document = state.cozy.documents['io.cozy.triggers'][key];
        if (isKonnectorTrigger(document) && lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(document, 'message.konnector') === konnectorSlug) {
            acc.push(document);
        }
        return acc;
    }, []);
    return triggers;
};
const getTriggersInError = (state)=>{
    const triggers = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(state, [
        'cozy',
        'documents',
        'io.cozy.triggers'
    ], {});
    return Object.values(triggers).filter((trigger)=>{
        const isInError = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(trigger, 'current_state.status') === 'errored';
        return isInError;
    });
};
const getAccountsWithErrors = (state)=>{
    const accountsWithErrorsIds = getTriggersInError(state).map((trigger)=>lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(trigger, 'message.account'));
    const accounts = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(state, [
        'cozy',
        'documents',
        'io.cozy.accounts'
    ], {});
    return Object.values(accounts).filter((param)=>{
        let { _id } = param;
        return accountsWithErrorsIds.includes(_id);
    });
};


}),
"./src/schema.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var cozy_doctypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-doctypes/dist/index.js");
/* ESM import */var cozy_doctypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_0__);

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
const schema = {
    app: cozy_doctypes__WEBPACK_IMPORTED_MODULE_0__.Application.schema,
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
    },
    jobs: {
        doctype: 'io.cozy.jobs'
    },
    bankAccounts: {
        doctype: 'io.cozy.bank.accounts',
        attributes: {},
        relationships: {
            checkingsAccount: {
                type: 'has-one',
                doctype: 'io.cozy.bank.accounts'
            },
            owners: {
                type: 'has-many',
                doctype: 'io.cozy.contacts'
            }
        }
    }
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (schema);


}),
"./src/store/configureStore.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/redux/es/redux.js");
/* ESM import */var redux_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/redux-logger/dist/redux-logger.js");
/* ESM import */var redux_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/redux-thunk/es/index.js");
/* ESM import */var redux_persist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/redux-persist/es/index.js");
/* ESM import */var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/redux-persist/lib/storage/index.js");
/* ESM import */var cozy_flags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-flags/dist/index.browser.js");
/* ESM import */var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/reducers/index.js");




 // defaults to localStorage for web
// import { isFlagshipApp } from 'cozy-device-helper'


const migrations = {
    0: ()=>{
        return {};
    },
    1: ()=>{
        return {};
    }
};
const persistConfig = {
    key: 'root',
    storage: redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3__["default"],
    version: 2,
    migrate: (0,redux_persist__WEBPACK_IMPORTED_MODULE_2__.createMigrate)(migrations, {
        debug: false
    })
};
const configureWithPersistor = (cozyClient)=>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_6__.compose;
    const persistedReducer = (0,redux_persist__WEBPACK_IMPORTED_MODULE_2__.persistReducer)(persistConfig, (0,_reducers__WEBPACK_IMPORTED_MODULE_5__["default"])(cozyClient));
    const reduxStore = (0,redux__WEBPACK_IMPORTED_MODULE_6__.createStore)(persistedReducer, composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_6__.applyMiddleware.apply(undefined, [
        redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"],
        (0,cozy_flags__WEBPACK_IMPORTED_MODULE_4__["default"])('redux-logger') ? (0,redux_logger__WEBPACK_IMPORTED_MODULE_0__.createLogger)() : null
    ].filter(Boolean))));
    let persistor = (0,redux_persist__WEBPACK_IMPORTED_MODULE_2__.persistStore)(reduxStore);
    return {
        store: reduxStore,
        persistor
    };
};
const configureDefault = (cozyClient)=>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_6__.compose;
    const reduxStore = (0,redux__WEBPACK_IMPORTED_MODULE_6__.createStore)((0,_reducers__WEBPACK_IMPORTED_MODULE_5__["default"])(cozyClient), composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_6__.applyMiddleware.apply(undefined, [
        redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"],
        (0,cozy_flags__WEBPACK_IMPORTED_MODULE_4__["default"])('redux-logger') ? (0,redux_logger__WEBPACK_IMPORTED_MODULE_0__.createLogger)() : null
    ].filter(Boolean))));
    return {
        store: reduxStore
    };
};
const configureStore = (cozyClient)=>{
    return /* isFlagshipApp() ||  */ (0,cozy_flags__WEBPACK_IMPORTED_MODULE_4__["default"])('home.store.persist') ? configureWithPersistor(cozyClient) : configureDefault(cozyClient);
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configureStore);


}),
"./src/targets/intents/KonnectorRoutes.jsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KonnectorRoutes: () => (KonnectorRoutes)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/cozy-harvest-lib/dist/index.js");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/providers/CozyTheme/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var cozy_interapp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-interapp/dist/index.js");
/* ESM import */var cozy_harvest_lib_dist_datacards_datacardOptions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/cozy-harvest-lib/dist/datacards/datacardOptions.js");








const KonnectorRoutes = (param)=>{
    let { intentData, intentId } = param;
    const { konnectorSlug } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useParams)();
    const client = (0,cozy_client__WEBPACK_IMPORTED_MODULE_4__.useClient)();
    const intents = new cozy_interapp__WEBPACK_IMPORTED_MODULE_2__["default"]({
        client
    });
    const [service, setService] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // eslint-disable-next-line
        intents.createService().then((service)=>{
            setService(service);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_providers_CozyTheme__WEBPACK_IMPORTED_MODULE_5__["default"], {
        variant: "normal",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_6__.HarvestRoutes, {
            konnectorRoot: `/${konnectorSlug}`,
            konnectorSlug: konnectorSlug,
            onDismiss: ()=>service ? service.cancel() : undefined,
            datacardOptions: cozy_harvest_lib_dist_datacards_datacardOptions__WEBPACK_IMPORTED_MODULE_7__["default"],
            intentData: intentData,
            intentId: intentId
        }, void 0, false, {
            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/KonnectorRoutes.jsx",
            lineNumber: 25,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/KonnectorRoutes.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined);
};


}),
"./src/targets/intents/index.jsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/cozy-ui/dist/cozy-ui.min.css");
/* ESM import */var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/stylesheet.css");
/* ESM import */var cozy_viewer_dist_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/cozy-viewer/dist/stylesheet.css");
/* ESM import */var cozy_ui_dist_cozy_ui_utils_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/cozy-ui/dist/cozy-ui.utils.min.css");
/* ESM import */var _styles_intents_styl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/styles/intents.styl");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-router-dom/dist/index.js");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var react_dom_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-dom/client.js");
/* ESM import */var cozy_ui_transpiled_react_Icon_Sprite__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/cozy-ui/transpiled/react/Icon/Sprite.js");
/* ESM import */var _containers_IntentHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/containers/IntentHandler.jsx");
/* ESM import */var _components_AppWrapper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/components/AppWrapper.jsx");
/* ESM import */var _KonnectorRoutes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/targets/intents/KonnectorRoutes.jsx");













document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.querySelector('[role=application]');
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_7__.createRoot)(container);
    //
    const params = new URL(document.location).searchParams;
    const intentId = params.get('intent');
    root.render(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AppWrapper__WEBPACK_IMPORTED_MODULE_9__["default"], {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.HashRouter, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AppWrapper__WEBPACK_IMPORTED_MODULE_9__.AppContext.Consumer, {
                    children: (param)=>{
                        let { data } = param;
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Routes, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Route, {
                                    path: "/",
                                    element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_containers_IntentHandler__WEBPACK_IMPORTED_MODULE_8__["default"], {}, void 0, false, {
                                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                                        lineNumber: 29,
                                        columnNumber: 40
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Route, {
                                    path: ":konnectorSlug/*",
                                    element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_KonnectorRoutes__WEBPACK_IMPORTED_MODULE_10__.KonnectorRoutes, {
                                        intentData: data,
                                        intentId: intentId
                                    }, void 0, false, {
                                        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                                        lineNumber: 33,
                                        columnNumber: 19
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, undefined);
                    }
                }, void 0, false, {
                    fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(cozy_ui_transpiled_react_Icon_Sprite__WEBPACK_IMPORTED_MODULE_13__["default"], {}, void 0, false, {
                fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
                lineNumber: 40,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/Users/vincelinise/Documents/GitHub/cozy-home/src/targets/intents/index.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined));
});


}),
"?aade": (function () {
"use strict";
/* (ignored) */

}),
"?1d53": (function () {
"use strict";
/* (ignored) */

}),
"?7bba": (function () {
"use strict";
/* (ignored) */

}),
"?1231": (function () {
"use strict";
/* (ignored) */

}),
"?271e": (function () {
"use strict";
/* (ignored) */

}),
"?aa23": (function () {
"use strict";
/* (ignored) */

}),
"?188f": (function () {
"use strict";
/* (ignored) */

}),
"?a6ce": (function () {
"use strict";
/* (ignored) */

}),
"?9814": (function () {
"use strict";
/* (ignored) */

}),
"?da50": (function () {
"use strict";
/* (ignored) */

}),
"?7893": (function () {
"use strict";
/* (ignored) */

}),
"?8780": (function () {
"use strict";
/* (ignored) */

}),
"./src/components/Sections/config.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"categoriesWhitelist":["banking","clouds","isp","energy","public_service"]}')

}),
"./src/locales/de.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"Eine Frage?","send":"Senden","result":"Den Assistenten fragen"},"dialog":{"close":"Schließen"},"name":"Cozy Assistent","sources":"%{smart_count} Quelle |||| %{smart_count} Quellen","suggestions":{"find_file":"Eine Datei suchen","reimbursements":"Meine Rückerstattungen überprüfen","reorganise_files":"Meine Dateien neu ordnen"}},"app":{"logo":{"alt":"%{name} Logo"}},"date":{"format":"dd.LL.yyyy","placeholder":"iiiiii.mm.yyyy"},"manifest":{"name":"Zuhause","short_description":"Cozy Home ist die Anwendung, die dir hilft, alle deine persönlichen Daten in Cozy zu sammeln.","long_description":"Mit Cozy Home kannst du ganz einfach:\\n * Dokumente all deiner Dienste herunterladen\\n * Festlegen, wie häufig Cozy deine Rechnungen holt\\n * Direkt auf all die von Cozy gesammelten Dokumente zugreifen","changes":"Du hast es nicht verpasst, der Store ist in deinem Cozy angekommen!\\nWir haben es genutzt, um Collect zu verbessern:\\n * Store Anpassungen.\\n * Kachelzusammenführung: Wenn du mehrere Konten bei einem Dienst hast, werden diese nun unter die Dienstleister-Kachel zusammengeführt.\\n * Verbesserungen einiger Connector-Seiten."},"add_service":"Hinzufügen","fix_konnector_error":"Repariere jetzt","logout":"Ausloggen","help":"Hilfe","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Verwaltung/%{name}","optional":"(Optional)","title":"Verbinde deine %{name} Konto","data":{"title":"Gesammelte Daten:","service":{"description":"Dienstbeschreibung:"}},"tabs":{"sync":"Synchronisierung","account":"Konto","data":"gesammelte Daten"}},"disconnect":{"title":"Trennung","description":"Du wirst von diesem Konto getrennt, aber deine importierten Daten werden beibehalten"},"form":{"title":"Konto","label":{"firstname":"Vorname","lastname":"Nachname","login":"Anmelden","consumerKey":"Nutzerschlüssel","consumerSecret":"Nutzergeheimnis","appKey":"Anwendungsschlüssel","appSecret":"Anwendungsgeheimnis","tricountUrl":"Tricount URL","cardNumber":"Kartennummer","dob":"Geburtsdatum","password":"Passwort","email":"E-Mail","bank_identifier":"Bankleitzahl (optional)","profileName":"Profilname","identifier":"Bezeichnung","new_identifier":"Bezeichnung","secret":"Passwort","answer":"Geheime Antwort","access_token":"Zugangstoken","accessTokenSecret":"Zugangstoken Geheimnis","apikey":"API Schlüssel","phoneNumber":"Telefonnummer","folderPath":"Ordnerpfad","namePath":"Ordnername","authCode":"Authentifizierungscode","accountName":"Kontoname","loginUrl":"Anmelde URL","token":"Token","agreement":"Ich stimme zu","refreshToken":"Token erneuern","timeout":"Verzögerung (ms)","branchName":"Branchenname","code":"Geheimzahl"},"placeholder":{"password":"Das Passwort, das du verwendest, um eine Verbindung zum Dienst herzustellen","update_password":"Aktualisiere das Passwort","accountName":"Beispiel: Persönliches Konto","namePath":"Beispiel: Max\' Rechnungen. Der Standard Ordnername ist dein Anmeldename."},"button":{"connect":"Verbinden","cancel":"Abbrechen","save":"Speichern","disconnect":"Dieses Konto trennen","delete":"Dieses Konto löschen","advanced":"Erweiterte Optionen","synchronize":"Jetzt synchronisieren"}},"folder":{"title":"Ähnliche Ordnereinstellungen","withoutSettings":{"title":"Ähnlicher Ordner"},"link":"Ordner in Cozy Drive öffnen","changePath":"Pfad ändern","error":"Ups, irgendetwas ist schiefgelaufen. Keine Panik, all deine Dateien sind immer noch da. Bitte versuche es später erneut","close":"schließen","warning":"Du hast deinen Ordnerpfad geändert","oldFiles":"All deine alten Rechnungen werden in den neuen Ordnerpfad verschoben.","newFiles":"Deine neuen Rechnungen werden in den neuen Ordnerpfad heruntergeladen.","newPath":"Alles ist gut gegangen. Der neue Ordnerpfad für dein %{name} Konto ist:","placeholder":{"administrative":"Verwaltung","photos":"Fotos"}},"success":{"title":{"connect":"Konfiguration erfolgreich!","update":"Dein %{name} Konto wurde aktualisiert!"},"banksLinkText":"Zeige meine Konten in %{appName}","driveLinkText":"Ordner in Cozy Drive öffnen","button":"Schließen"},"message":{"folder":{"title":"Ordner","link":"Ordner in Cozy Drive öffnen"},"success":{"connect":"Deine Daten sind in wenigen Minuten in deinem Cozy verfügbar und die nächsten werden automatisch folgen.","update":"Dein %{name} Konto wurde erfolgreich aktualisiert!","delete":"Das Konto wurde erfolgreich entfernt."},"syncing":{"bill":"Deine Rechnungen werden synchronisiert und werden im Ordnerpfad verfügbar sein:"},"synced":{"title":"Deine Datensynchronisation","cron":"Synchronisierungsintervall: %{frequency}","cron_hourly":"jede Stunde","cron_daily":"einmal täglich","cron_weekly":"einmal wöchentlich","cron_monthly":"einmal monatlich","cron_undefined":"manuell","syncing":"läuft...","unknown":"unbekannt","last_sync":"Letzte Synchronisation: **%{date}**","date_format":"LLLL D[,] yyyy [um] HH[:]mm","bill":"Finde deine Daten in der Drive App an dieser Stelle:"},"error":{"server":"Entschuldigung, unser Server hatte einen Schluckauf. Macht es dir etwas aus neuzustarten?","bad_credentials":"Entschuldigung, du hast falsche Anmeldedaten oder ein falsches Passwort eingegeben.","delete":"Entschuldigung, unser Server hatte einen Schluckauf. Macht es dir etwas aus neuzustarten?"}},"forceConnection":"Jetzt noch einmal starten","editor_detail":"Dienst entwickelt von %{editor} "},"account_picker":{"add_account_button":{"label":"Ein Konto hinzufügen"}},"apps":{"title":"Meine Apps","installing":"Installieren…"},"connection":{"CTA":{"twofa_failed":"Jetzt noch einmal starten"},"error":{"default":{"title":"Ein Fehler ist aufgetreten","description":"Unglücklicherweise ist bei der Verbindung zu %{name} etwas schiefgelaufen. Bitte überprüfe noch einmal deine Kontodetails, besuche unsere Online-Hilfe oder kontaktiere uns unter contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Cozy Speicherplatz voll","description":"Dieser Dienst kann gerade deine Dokumente nicht importieren. Bitte entferne ein paar Dateien oder gehe zu **Einstellungen > Speicherplatz** um mehr freien Speicherplatz zu bekommen."},"CHALLENGE_ASKED":{"title":"Herausforderung wird benötigt","description":"It seems that the website requires a second authentification factor that we don’t support yet. You may try to settle the issue on the [%{name}](%{link}) website before a retry."},"LOGIN_FAILED":{"title":"Falsche Anmeldedaten","description":"Falsche Anmeldedaten. Überprüfe die Connector-Felder und starte die Verbindung neu."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Geheimnis wird benötigt","description":"Ein zusätzliches Feld muss gefüllt werden, bevor deine Anmeldedaten überprüft werden."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporär blockiert","description":"Es gab zu viele Versuche. Bitte aktualisiere deine Anmeldedaten auf der Website von [%{name}](%{link}) und aktualisiere den Connector später."},"MAINTENANCE":{"title":"Webseite nicht verfügbar","description":"Es scheint, dass die [%{name}](%{link}) Webseite nicht verfügbar ist oder der Connector aktualisiert werden muss. Bitte starte den Connector später erneut oder besuche unsere Online-Hilfe."},"NOT_EXISTING_DIRECTORY":{"title":"Zielordner fehlt","description":"Es scheint, dass Zielordner des Kontos gelöscht wurde. Bitte wiederherstelle ihn, indem du das Konto trennst und dann wieder verbindest."},"UNKNOWN_ERROR":{"title":"Verbindungsfehler","description":"Ein unbekannter Fehler ist aufgetreten."},"USER_ACTION_NEEDED":{"title":"Handlungsbedarf beim Dienst","description":"Es scheint, dass die [%{name}](%{link}) Webseite ein Anmelden und eine spezielle Handlung von dir verlangt. Bitte starte den Connector erneut, nachdem du das Problem auf der Webseite gelöst hast."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Zugangsaktualisierung erforderlich","description":"Der Dienst [%{name}](%{link}) verlangt, dass du den Zugang erneut erlaubst. Bitte trenne und verbinde dein %{name} Konto mit dieser Anwendung. Es gehen keine Daten verloren."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Konto nicht verfügbar","description":"Es scheint, dass dein Konto nicht mehr aktiv ist. Bitte überprüfen dein Konto auf [%{name}](%{link}), bevor du es erneut versuchst."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Passwortaktualisierung erforderlich","description":"Es scheint, dass die [%{name}](%{link})  Webseite dich auffordert, sich anzumelden und dein Passwort zu ändern. Bitte starte den Connector neu, nachdem du das Problem auf der Webseite gelöst hast."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Bestätigung neuer Zugriffsberechtigungen erforderlich","description":"Dein Connector wurde aktualisiert und die Berechtigungen geändert. Bitte überprüfe sie, bevor du den Connector neustartest. "},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Starte die Verbindung zum Dienst neu, um deine Daten zu importieren","description":"Die letzte Verbindung zum Dienst ist fehlgeschlagen - bitte starte sie erneut. Du musst vielleicht einen neuen Validierungscode eingeben."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Falschen Zwei-Faktor-Code eingegeben","description":"Der eingegebene Zwei-Faktor-Code ist falsch. Bitte starte neu."},"VENDOR_DOWN":{"title":"Dienst nicht verfügbar","description":"Es scheint, dass der [%{name}](%{link}) Dienst derzeit unerreichbar ist. Bitte starte den Connector später neu."},"VENDOR_DOWN.BANK_DOWN":{"title":"Webseite nicht verfügbar","description":"Es scheint, dass die [%{name}](%{link}) Webseite derzeit unerreichbar ist. Bitte starte den Connector später neu."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Dienst nicht verfügbar","description":"Es scheint, dass wir im Moment eine Überlastung unserer Bank-Connectoren haben. Bitte starte den Connector später neu."}}},"intent":{"konnector":{"install":{"error":{"message":"Der Connector kann nicht installiert werden."}}},"service":{"return":"Zurück zur Connector-Übersicht","success":{"button":{"label":"Schließen"}},"error":{"initialization":"Der Dienst konnte nicht initialisiert werden. Entschuldige die Unannehmlichkeiten.","creation":"Das Konto konnte nicht erstellt werden, ein Fehler ist aufgetreten.","cause":"Ursache: %{error}"},"cancel":"Abbrechen","terminate":"Beenden"}},"field":{"password":{"visibility":{"hide":"Verstecken","show":"Zeigen","title":{"hide":"Passwort verbergen","show":"Passwort zeigen"}}}},"nav":{"services":"Meine Dienste"},"category":{"all":"Alle","konnectors":"Dienste","banking":"Banken","cozy":"Das Wesentliche","education":"Bildung","energy":"Energie","health":"Gesundheit","host_provider":"Host","insurance":"Versicherung","isp":"ISP","online_services":"Onlinedienste","others":"Andere","mes_infos":"MesInfos-Experiment","partners":"Partner","productivity":"Produktivität","press":"Presse","ptnb":"PTNB-Experiment","public_service":"Öffentliche Dienste","shopping":"Einkaufen","social":"Sozial","telecom":"Telekom","transport":"Transport","pro":"Arbeit","tech":"Technik","clouds":"Clouds und Tresore","finance":"Beschäftigung und Finanzen"},"loading":{"initial":"Lade Konten...","working":"Lade"},"validation":{"exact_length":"Es muss genau aus %{length} Zeichen bestehen.","max_length":"Die maximale Länge sind %{length} Zeichen.","min_length":"Es sollte mindestens %{length} Zeichen beinhalten.","pattern":"Der Wert muss mit einer speziellen Vorlage übereinstimmen:  %{pattern}"},"update":{"title":"Ein Update für diesen Dienst ist verfügbar.","regular":"Führe dieses Update durch, um deine Daten auch in Zukunft zu importieren und die neusten Funktionen zu haben.","blocking":"Aktualisiere es, um deine Daten auch in Zukunft zu importieren","CTA":"Aktualisieren"},"error":{"initial":"Etwas ging schief beim Abholen deiner Verbindungen und Informationen. Bitte aktualisiere die Seite.","LOGIN_FAILED":"Falsche Anmeldedaten. Überprüfe die Connector-Felder und starte die Verbindung neu.","UNKNOWN_ERROR":"Etwas Unerwartetes geschah beim Herstellen der Verbindung","JOB_TIMEOUT":"Das Herstellen der Verbindung dauerte zu lange","button":{"reload":"Jetzt aktualisieren"}},"maintenance":{"icon":"Dieser Connector wird gerade gewartet.","service":"Dienst unterbrochen","problem":"%{konnectorName} erlaubt es deinem Cozy nicht auf die Daten zuzugreifen","title":"Was geht hier vor sich?"},"connector":{"debug":{"successMessage":"Dieser Konnektor ist nur für Debugzwecke gedacht. Dies ist eine zusätzliche benutzerdefinierte Erfolgsmeldung."},"empty":{"title":"Beginne deine Daten zusammenzutragen!","text":"Synchronisiere deine Marken mit deinem Cozy, um automatisch deine Daten einzusammeln (Rechnungen, Erstattungen, Ausgaben, ...)"},"silenced":"%{name} wird nicht mehr empfohlen. Du kannst immer einen Anbieter finden, indem zu auf die \\"Hinzufügen\\"-Fläche klickst.","noAccount":"Kein Konto","add":"Dienst hinzufügen","update":"Aktualisierung verfügbar","logo":{"alt":"%{name} logo"},"enedis":{"description":{"service":"Wiederherstelle deine Linky-Daten, indem du dich mit deinem Enedis-Konto verbindest. Du musst über ein Linky-Meter besitzen und zuerst dein Enedis-Konto erstellt haben (auf der Website von [Enedis](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Dieser Connector wird von Fing für das MesInfos-Projekt bereitgestellt. Er ruft die Daten aus deinem Stromvertrag ab und extrahiert deinen Stromverbrauch vom Vortag. Dieser Connector läuft auf deinem Cozy und Fing hat keinen Zugriff auf diese Daten."}},"orange":{"message":{"delay":"Einmal verbunden, wird eine Anforderung an das Orange Informationssystem gesendet, um deine Daten zu extrahieren. Diese Daten sind innerhalb von 15 Tagen verfügbar. Die Daten werden automatisch aktualisiert, alle 15 Tage."}},"orangemobile":{"description":{"connector":"Im Rahmen von \'MesInfos\' erlaubt dir Orange, dein Telefon regelmäßig zu lokalisieren.\\n\\n**Die Datenerhebung bedarf deinem ausdrücklichen Einverständnis**\\n\\nDiese Vereinbarung kann jederzeit durch diese Datenverbindung widerrufen werden.\\n\\nWenn du auf \\"Zustimmen\\" klickst, gibst du deine Zustimmung, um die Position deines Telefons alle 30 Minuten zu sammeln. Informationen die gesammelt werden:\\n<ul><li>Datum und Uhrzeit dieses Ortes. </li><li>Lokationsdaten der nächstgelegenen Funkantenne zum Zeitpunkt der Erhebung.</li></ul> Gesammelte Daten von Orange, nach der Vereinbarung, werden nur in deinem Cozy verfügbar sein,  im Zusammenhang mit « Mes Infos ». Sie werden zu Ortsdaten hinzugefügt, die bereits in Anrufprotokollen gespeichert sind.","service":"Diese Verbindung wird Daten von deinem Orange-Konto auf dein Cozy herunterladen. Es werden automatisch die Anrufprotokolle von deinem Telefon heruntergeladen. Diese Protokolle enthalten deine Telefonnummer, die Telefonnummer deines Gesprächspartners, Datum und Uhrzeit des Anrufes und die Ortsdaten der nächstgelegenen Funkantenne zum Zeitpunkt des Sammelns.\\n\\nDu kannst diese Daten in verschiedenen Anwendungen in deinem Cozy nutzen, z.B. \\"Mapping My Life\\" (bald im Cozy Store erhältlich).","field":{"agreement":"Bist du damit einverstanden, dass Orange regelmäßig dein Telefon im Zusammenhang mit «Mes Infos» lokalisiert?"}}},"orangevideos":{"description":{"service":"Dieser Connector lädt Daten von deinem Orange Konto auf deinen Cozy herunter. Es wird automatisch die Liste der Filme herunterladen, die du ab dem 01.01.2015 kostenlos (TV Replay) oder mit bezahltem VOD heruntergeladen hast (Inhalte für Erwachsene sind nicht enthalten).\\n\\nDu kannst diese Daten in verschiedenen Apps in deinem Cozy verwenden, z.B. \\"My Movies Music\\" (bald im Cozy Store erhältlich)."}},"axabanque102":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo).","connector":"Die geheime Antwort wird [gefragt von HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion), wenn du dich ohne doppelte Authentifizierung verbindest. Beispiel: Wie lautet der Name Ihres Haustieres?"}},"ingdirect95":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"Die Verbindung zu deiner Bank wird von unserem Partner Linxo betrieben und gesichert. [Mehr erfahren](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Synchronisiere Konten:","header_mobile":"%{done} von %{total}","header_done":"%{done} von %{total} synchronisiert","item":{"pending":"Ausstehend"},"close":"Schließen"},"services":{"title":"Meine Dienste"},"status":{"interrupted":"UNTERBROCHENER DIENST","edf":{"maintenance":"EDF\'s Informationssystem hat sich geändert und der damit verbundene Datenzugriff funktioniert nicht mehr. Dieser Connector ist derzeit nicht in der Lage, deine Daten vom EDF zu importieren. Wir versuchen die Situation wiederherzustellen und werden dich benachrichtigen, wenn sie behoben ist. [Mehr erfahren](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"MMM dd"}}}}')

}),
"./src/locales/en.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"app":{"logo":{"alt":"%{name} logo"}},"date":{"format":"LL/dd/yyyy","placeholder":"mm/iiiiii/yyyy"},"manifest":{"name":"Home","short_description":"Cozy Home is the application that help you gather all your personal data inside Cozy.","long_description":"With Cozy Home, you can easily:\\n * Downloads documents from all your suppliers\\n * Set how often Cozy will collect your bills\\n * Access directly to the documents gathered by your Cozy","changes":"You haven\'t missed it, the Store arrived in your Cozy!\\nWe took advantage of it to improve Collect:\\n * Store adaptation.\\n * Tile merge: when you have several accounts for a single supplier, the former are now merged under the supplier tile.\\n * Improvement of some Connectors pages."},"add_service":"Add","fix_konnector_error":"Fix now","logout":"Log out","logout_dialog":{"title":"Logout","content":"Are you sure you want to log out of your Cozy?","cancel":"Cancel","confirm":"Logout"},"help":"Help","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Optional)","title":"Connect your %{name} account","data":{"title":"Collected data:","service":{"description":"Service description:"}},"tabs":{"sync":"synchronization","account":"account","data":"collected data"}},"disconnect":{"title":"Disconnection","description":"Your will be disconnected from this account, but imported data will be kept"},"form":{"title":"Account","label":{"firstname":"Firstname","lastname":"Lastname","login":"Login","consumerKey":"Consumer Key","consumerSecret":"Consumer Secret","appKey":"Application Key","appSecret":"Application Secret","tricountUrl":"Tricount URL","cardNumber":"Card Number","dob":"Date of birth","password":"Password","email":"Email","bank_identifier":"Bank identifier (optional)","profileName":"Profile Name","identifier":"Identifier","new_identifier":"Identifier","secret":"Password","answer":"Secret Answer","access_token":"Access token","accessTokenSecret":"Access token secret","apikey":"Api key","phoneNumber":"Phone number","folderPath":"Folder path","namePath":"Folder name","authCode":"Auth code","accountName":"Account name","loginUrl":"Login URL","token":"Token","agreement":"I agree","refreshToken":"Refresh Token","timeout":"Delay (ms)","branchName":"Branch","code":"Confidential code"},"placeholder":{"password":"The password you use to connect to the service","update_password":"Update the password","accountName":"Example: Personal account","namePath":"Example: Camille bills. Default name path is your login."},"button":{"connect":"Connect","cancel":"Cancel","save":"Save","disconnect":"Disconnect this account","delete":"Delete this account","advanced":"Advanced options","synchronize":"Synchronize now"}},"folder":{"title":"Related folder settings","withoutSettings":{"title":"Related folder"},"link":"Open the folder in Cozy Drive","changePath":"change the path","error":"Oops, something went wrong. Don\'t panic, your files are still there, please try again later","close":"close","warning":"You\'re changing your folder path","oldFiles":"All your olds bills will be moved in your new path.","newFiles":"Your news bills will be downloaded in your new path.","newPath":"Everything went well, the new path for your %{name} account is:","placeholder":{"administrative":"Administrative","photos":"Photos"}},"success":{"title":{"connect":"Successful configuration!","update":"Your %{name} account is updated!"},"banksLinkText":"See my accounts in %{appName}","driveLinkText":"Open the folder in Cozy Drive","button":"Close"},"message":{"folder":{"title":"Folder","link":"Open folder on cozy drive"},"success":{"connect":"Your data will be available in your Cozy in a few minutes and the next ones will follow automatically.","update":"Your %{name} account has been updated successfully.","delete":"Account removed succesfully."},"syncing":{"bill":"Your bills are syncing and will be available in the following path:"},"synced":{"title":"Your data synchronization","cron":"Synchronization frequency: %{frequency}","cron_hourly":"each hour","cron_daily":"once a day","cron_weekly":"once a week","cron_monthly":"once a month","cron_undefined":"manually","syncing":"running…","unknown":"unknown","last_sync":"Last synchronization: **%{date}**","date_format":"LLLL D[,] yyyy [at] HH[:]mm","bill":"Find your datas in the Drive app at this location:"},"error":{"server":"Apologies, our server had an hiccup, do you mind starting again?","bad_credentials":"Sorry, you entered an incorrect login or password.","delete":"Apologies, our server had an hiccup, do you mind starting again?"}},"forceConnection":"Run again now","editor_detail":"Service developed by %{editor}"},"account_picker":{"add_account_button":{"label":"Add an account"}},"apps":{"title":"My apps","installing":"Installing…"},"connection":{"CTA":{"twofa_failed":"Run again now"},"error":{"default":{"title":"An error occured","description":"Unfortunately, something went wrong when trying to connect to %{name}. Please check again your account informations, visit our online help or contact us at contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Cozy Storage full","description":"This service cannot fetch your documents now. Please remove some files or go to **Settings > Storage** to get more free space."},"CHALLENGE_ASKED":{"title":"Challenge required","description":"It seems that the website requires a second authentification factor that we don’t support yet. You may try to settle the issue on the [%{name}](%{link}) website before a retry."},"LOGIN_FAILED":{"title":"Bad credentials","description":"Bad credentials. Check the konnector fields and run the connection again."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Needs secret","description":"An additional field must be filled in before checking your credentials."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporarily blocked","description":"Too many attempts occured. Please update your credentials on [%{name}](%{link}) website and update the konnector later on."},"MAINTENANCE":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable or the konnector must be updated. Please rerun the connector later or visit our online help."},"NOT_EXISTING_DIRECTORY":{"title":"Missing destination folder","description":"It seems that this account\'s destination folder has been deleted. Please restore it by disconnecting this account and then reconnect again."},"UNKNOWN_ERROR":{"title":"Connection error","description":"An unknown error has occurred."},"USER_ACTION_NEEDED":{"title":"Action needed on the provider","description":"It seems that the [%{name}](%{link}) website requires you to log in and to do a specific action. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Access refresh required","description":"The [%{name}](%{link}) service requires you to allow your access again. Please disconnect and reconnect your account %{name} to this application. No data will be lost."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Unavailable account","description":"It seems that your account is no longer active. Please check your account on [%{name}](%{link}) before retry."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Password update required","description":"It seems that the [%{name}](%{link}) website requires you to log in and update your password. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"New permissions validation needed","description":"You connector was updated and the permissions changed. Please validate them before launching the connector again."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relaunch the connexion to the service to fetch your data","description":"The last connexion to the service failed; please launch it again. You may have to provide a validation code."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Wrong two-factore code provided","description":"The two-factor code provided is wrong, please start again."},"VENDOR_DOWN":{"title":"Unavailable service","description":"It seems that the [%{name}](%{link}) service is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.BANK_DOWN":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Unavailable service","description":"It seems that we are experiencing overload with our bank konnectors at the moment. Please rerun the connector later."}}},"intent":{"konnector":{"install":{"error":{"message":"The konnector cannot be installed"}}},"service":{"return":"Back to connectors list","success":{"button":{"label":"Close"}},"error":{"initialization":"Service failed to initialize. Sorry for the inconvenience.","creation":"Unable to create account, an error occurred.","cause":"Cause: %{error}"},"cancel":"Cancel","terminate":"Terminate"}},"field":{"password":{"visibility":{"hide":"Hide","show":"Show","title":{"hide":"Hide password","show":"Show password"}}}},"nav":{"services":"My services"},"category":{"all":"All categories","konnectors":"Services","banking":"Banking","cozy":"The essentials","education":"Education","energy":"Energy","health":"Health","host_provider":"Host","insurance":"Insurance","isp":"Mobile and Internet","online_services":"Online services","others":"Others","mes_infos":"MesInfos experimentation","partners":"Partners","productivity":"Productivity","press":"Press","ptnb":"PTNB experimentation","public_service":"Public services","shopping":"Shopping","social":"Social","telecom":"Telecom","transport":"Transportation","pro":"Work","tech":"Tech","clouds":"Clouds & vaults","finance":"Employment & finance"},"loading":{"initial":"Loading accounts...","working":"Loading"},"validation":{"exact_length":"It\'s must be made up of %{length} characters exactly.","max_length":"The length maximum is %{length} characters.","min_length":"It should contain at least %{length} characters.","pattern":"The value must match a specific pattern: %{pattern}"},"update":{"title":"An update is available for this service.","regular":"Perform this update to keep fetching your data and to have the latest features","blocking":"Update it to keep fetching your data","CTA":"Update"},"error":{"initial":"Something went wrong when fetching your connectors and informations. Please refresh the page.","LOGIN_FAILED":"Bad credentials. Check the konnector fields and run the connection again.","UNKNOWN_ERROR":"Something unexpected happened while running the connector","JOB_TIMEOUT":"The connector execution was too long","button":{"reload":"Refresh now"}},"move_modal":{"title":"Move completed","text":"The move of your data from %{from} has been successful.","button":"Access my Cozy"},"maintenance":{"icon":"This connector is under maintenance","service":"Service interrupted","problem":"%{konnectorName} doesn\'t allow your Cozy to access your data","title":"What is going on ?"},"connector":{"title":"My connected services","mute":"Mute error","debug":{"successMessage":"This konnector is for debug purpose only, this is an additionnal custom success message."},"empty":{"title":"Start gathering your data!","text":"Synchronise your brands with your Cozy to automatically retrieve your data (bills, reimbursements, expenses…)"},"silenced":"%{name} won\'t be suggested anymore. You can always find a provider by clicking the \\"Add\\" button.","noAccount":"No account","add":"Add a service","update":"Update available","logo":{"alt":"%{name} logo"},"enedis":{"description":{"service":"Recover your Linky data by connecting your Enedis account. You must have a Linky meter and have first created your Enedis account (on the [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). This connector is provided by Fing for the MesInfos project. It retrieves the data from your electricity contract and downloads your electricity consumption the day before. This connector is running on your Cozy and the Fing will have no access to this data."}},"orange":{"message":{"delay":"Once connected, a demand to extract your data will be sent to Orange information system. These data will be available within 15 days. You data will be updated automatically, every 15 days."}},"orangemobile":{"description":{"connector":"In the context of \'MesInfos\', Orange allows you to localize your phone regularly.\\n\\n**Data collection needs your express agreement**\\n\\nThis agreement may be revoked at any time by this data connector.\\n\\nBy clicking on \\"Agree\\", you give your consent to collect your phone\'s position, every 30 minutes. Information gathered will on be : \\n<ul><li>Date and time of this location.</li><li>Location data of the closest radio antenna at the time of collect.</li></ul>Collected data by Orange after you agreement will be available only in your Cozy that you have been assigned in context of  « Mes Infos ». They will be added to location data already stored in call logs.","service":"This connector will download data from your Orange account on your Cozy. It will automatically download the call logs from your phone. Thus call logs include your phone number, your corresponding\'s phone number, date and time of this call and location data of the closest radio antenna at the time of collect.\\n\\nYou will be able to use these data in different apps in your Cozy, for example \\"Mapping My Life\\" (available soon on the Cozy Store).","field":{"agreement":"Do you agree that Orange localizes regularly your phone in context of  « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"This connector will download data from your Orange account on your Cozy. It will automatically download the list of movies you downloaded in free (TV Replay) or paid VOD from 01/01/2015 (adult contents are not included).\\n\\nYou will be able to use these data in different apps in your Cozy, for example \\"My Movies Music\\" (available soon on the Cozy Store)."}},"axabanque102":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo).","connector":"The secret answer is [asked by HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) when you connect without double authentication. Example: what is the name of your pet?"}},"ingdirect95":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}}},"shortcut":{"edit":"Modify shortcut","delete":"Delete"},"Queue":{"header":"Syncing accounts:","header_mobile":"%{done} of %{total}","header_done":"Synced %{done} out of %{total}","item":{"pending":"Pending"},"close":"Close"},"services":{"title":"My services"},"status":{"interrupted":"INTERRUPTED SERVICE","edf":{"maintenance":"EDF\'s information system has changed and the related data access doesn\'t work anymore. This konnector is not currently able to get back your data from EDF. We are trying to restore the situation and we will notice you when it will be fixed. [Learn more](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"MMM dd"}}},"defaultRedirection":{"snackbar":{"description":"Set this page as the home screen of your mobile application?","refuse":"No, thank you","accept":"OK"}},"backup":{"backupInProgress":"Backup in progress","confirmStopBackupModal":{"title":"Stop backup?","description":"Your backup is not yet complete - do you really want to stop it? Photos that have already been saved will remain in your Cozy, and you can resume the backup at a later date.","cancel":"Cancel","stop":"Stop"},"appHighlightAlert":{"description":"Save your photos safely in your Cozy to protect them of loss or theft!"}},"appHighlightAlert":{"geolocationTracking":{"defaultDescription":"Track your travel and carbon footprint with the CO2 Coach","bikegoalSourceEmployerDescription":"Your %{sourceType} %{sourceName} invites you to take part in improving the area and benefit from the \\"prime vélo\\", this application will help you measure its progress, and much more!","bikegoalSourceDefaultDescription":"Your %{sourceType} %{sourceName} invites you to play your part in improving the region. Save and analyse your journeys!"}},"sections":{"label_compact":"Compact Mosaic","label_detailed":"Detailed List","label_grouped":"Grouped in Folder"},"AnnouncementsDialogContent":{"dateFormat":"LL/dd/yyyy","skip":"Understood"},"Widget":{"open":"Open","configure":"Configure","openApp":"Open app","customize":"Customize widgets","up":"Move up","down":"Move down","remove":"Remove","Drive":{"NoRecentFiles":"No recent files","NoRecentFolders":"No recent folders","NoTrashedFiles":"No files in the trash"},"Papillon":{"NoCourses":"No upcoming courses","NoHomeworks":"No homework due","NoGrades":"No grades available"}}}')

}),
"./src/locales/es.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"¿Tiene alguna pregunta?","send":"Enviar","result":"Pregunte al asistente"},"dialog":{"close":"Cerrar"},"name":"Asistente Cozy","sources":"%{smart_count} fuente |||| %{smart_count} fuentes","suggestions":{"find_file":"Buscar un fichero","reimbursements":"Comprobar mis reembolsos","reorganise_files":"Reorganizar mis archivos"}},"app":{"logo":{"alt":"%{name} logo"}},"date":{"format":"dd/LL/yyyy","placeholder":"iiiiii/mm/yyyy"},"manifest":{"name":"Inicio","short_description":"Cozy Home es la aplicación que le ayuda a recopilar todos sus datos personales que están en Cozy.","long_description":"Con Cozy Home, usted puede facilmente:\\n* Descargar documentos de todos sus proveedores\\n* Establecer la frecuencia con la que Cozy recopilará sus facturas\\n* Acceder directoamente a los documentos recopilados por su Cozy","changes":"Seguro ya se ha dado cuenta, el Store ha llegado a su Cozy\\nAprovechamos para mejorar Collect:\\n*Adaptación a Store.\\n*Fusión de fichas: cuando se tienen diversas cuentas en un proveedor, la primera se fusiona baja la ficha del proveedor.\\n*Mejora de algunas páginas de Conectores."},"add_service":"Añadir","fix_konnector_error":"Arreglar ahora","logout":"Cerrar sesión","help":"Ayuda","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Opcional)","title":"Conecte su cuenta %{name} ","data":{"title":"Datos recopilados:","service":{"description":"Descripción del servicio:"}},"tabs":{"sync":"sincronización","account":"cuenta","data":"datos recopilados"}},"disconnect":{"title":"Desconexión","description":"Usted se desconectará de esta cuenta, pero se guardarán los datos importados"},"form":{"title":"Cuenta","label":{"firstname":"Nombre","lastname":"Apellido","login":"Login","consumerKey":"Clave del usuario","consumerSecret":"Secreto del usuario","appKey":"Clave de la aplicación","appSecret":"Secreto de la aplicación","tricountUrl":"URL Tricount","cardNumber":"Número de tarjeta","dob":"Fecha de nacimiento","password":"Contraseña","email":"Email","bank_identifier":"Identificante bancario (opcional)","profileName":"Nombre del perfil","identifier":"Identificador","new_identifier":"Identificador","secret":"Contraseña","answer":"Respuesta secreta","access_token":"Token de acceso","accessTokenSecret":"Token de acceso secreto","apikey":"Clave Api","phoneNumber":"Número de teléfono","folderPath":"Ruta de la carpeta","namePath":"Nombre de la carpeta","authCode":"Código de autorización","accountName":"Nombre de la cuenta","loginUrl":"URL de acceso","token":"Token","agreement":"Acepto","refreshToken":"Recargar el token","timeout":"Retardo (ms)","branchName":"Oficina","code":"Código confidencial"},"placeholder":{"password":"La contraseña que usted usa para acceder al servicio","update_password":"Actualizar la contraseña","accountName":"Ejemplo: Cuenta personal","namePath":"Ejemplo: Facturas de Camille. La ruta de nombre predeterminado es su login."},"button":{"connect":"Conectar","cancel":"Cancelar","save":"Guardar","disconnect":"Desconectar esta cuenta","delete":"Borrar esta cuenta","advanced":"Opciones avanzadas","synchronize":"Sincronizar ahora"}},"folder":{"title":"Configuración de carpetas relacionadas","withoutSettings":{"title":"Carpeta relacionada"},"link":"Abrir la carpeta en Cozy Drive","changePath":"cambiar la ruta de acceso","error":"Oops, algo salió mal. No se asuste, sus archivos siguen ahí, por favor vuelva a intentarlo más tarde.","close":"cerrar","warning":"Usted cambia su ruta de acceso","oldFiles":"Todas sus facturas serán trasladadas a su nueva ruta de acceso","newFiles":"Sus nuevas facturas serán descargadas a su nueva ruta de acceso","newPath":"Todo salió bien, el nuevo camino de acceso para su cuenta %{name} es:","placeholder":{"administrative":"Administrativa","photos":"Fotos"}},"success":{"title":{"connect":"Configuración correcta!","update":"¡Su cuenta %{name} ha sido actualizada!"},"banksLinkText":"Ver mis cuentas en %{appName}","driveLinkText":"Abrir la carpeta en Cozy Drive","button":"Cerrar"},"message":{"folder":{"title":"Carpeta","link":"Abrir la carpeta en Cozy Drive"},"success":{"connect":"Sus datos estarán disponibles en su Cozy en pocos minutos y a partir de ese momento, los siguientes lo estarán automáticamente.","update":"¡Su cuenta %{name} ha sido actualizada exitosamente.","delete":"Cuenta suprimida exitosamente."},"syncing":{"bill":"Sus facturas están sincronizándose y estarán disponibles en la siguiente dirección:"},"synced":{"title":"Sincronización de sus datos","cron":"Frecuencia de sincronización: %{frequency}","cron_hourly":"cada hora","cron_daily":"una vez por día","cron_weekly":"una vez por semana","cron_monthly":"una vez por mes","cron_undefined":"manualmente","syncing":"ejecutándose...","unknown":"desconocido","last_sync":"Última sincronización: **%{date}**","date_format":"LLLL D[,] yyyy [a las] HH[:]mm","bill":"Encuentre sus datos en la aplicación Drive en este sitio:"},"error":{"server":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?","bad_credentials":"Lo siento, uste ha escrito un login o una contraseña incorrectos.","delete":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?"}},"forceConnection":"Vuelva a ejecutar","editor_detail":"Servicio desarrolado por %{editor}"},"account_picker":{"add_account_button":{"label":"Añadir una cuenta"}},"apps":{"title":"Mis apps","installing":"Instalando…"},"connection":{"CTA":{"twofa_failed":"Vuelva a ejecutar"},"error":{"default":{"title":"Ha ocurrido un error","description":"Desafortunadamente, algo salió mal al intentar conectar con %{name}. Por favor, controle otra vez la información de su cuenta, visite nuestra ayuda en línea o contáctenos en contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"El amacenamiento de Cozy está lleno","description":"Este servicio no puede recuperar sus documentos ahora. Por favor, borre algunos archivos o vaya a \\"Ajustes > Almacenamiento** para obtener más espacio libre."},"CHALLENGE_ASKED":{"title":"Se requiere Challenge","description":"Parece que el sitio web requiere un segundo factor de autenticación que aún no está disponible. Puede intentar resolver el problema en el sitio web[%{name}](%{link}) antes de volver a intentarlo."},"LOGIN_FAILED":{"title":"Malas credenciales","description":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Secreto exigido","description":"Se debe llenar un campo adicional antes de controlar sus credenciales."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Bloqueado temporalmente","description":"Se hicieron demasiados intentos. Por favor, actualice sus credenciales en el sitio web[%{name}](%{link}) y actualice el conector más tarde."},"MAINTENANCE":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible o que el konnector debe actualizarse. Vuelva a ejecutar el conector más tarde o visite nuestra ayuda en línea."},"NOT_EXISTING_DIRECTORY":{"title":"Falta la carpeta de destino","description":"Parece que la carpeta de destino de esta cuenta ha sido borrada. Por favor desconéctese de la cuenta, restáurela y vuelva a conectarse."},"UNKNOWN_ERROR":{"title":"Error de conexión","description":"Ha ocurrido un error no identificado."},"USER_ACTION_NEEDED":{"title":"Acción necesaria con el proveedor","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y realice una acción específica. Vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Se requiere volver a acceder","description":"El servicio [%{name}](%{link}) requiere que usted vuelva a acceder. Por favor desconecte y reconecte su cuenta %{name} a esta aplicación. No se perderá ningún dato."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Cuenta no disponible","description":"Parece que su cuenta no está activa. Compruebe su cuenta en[%{name}](%{link}) antes de volver a intentarlo."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Se requiere actualizar la contraseña","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y actualice su contraseña. Por favor, vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Se necesitan nuevos permisos de validación","description":"Su conector fue actualizado y los permisos cambiados. Por favor, valídelos antes de volver a lanzar el conector."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relanzar la conexión al servicio para recuperar sus datos","description":"La última conexión al servicio ha fallado; por favor, láncela de nuevo. Es posible que tenga que proporcionar un código de validación."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Código suministrado para dos factores es equivocado","description":"El código para dos factores suministrado esta errado, ensaye de nuevo por favor."},"VENDOR_DOWN":{"title":"Servicio no disponible","description":"Parece que el servicio[%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.BANK_DOWN":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Servicio no disponible","description":"Parece que en este momento estamos experimentando una sobrecarga con nuestros conectores bancarios. Por favor, vuelva a ejecutar el conector más tarde."}}},"intent":{"konnector":{"install":{"error":{"message":"Este conector no se puede instalar"}}},"service":{"return":"Volver a la lista de conectores","success":{"button":{"label":"Cerrar"}},"error":{"initialization":"El servicio ha fallado al inicializarse. Sentimos los inconvenientes.","creation":"Imposible crear una cuenta, ha ocurrido un error.","cause":"Causa: %{error}"},"cancel":"Cancelar","terminate":"Terminar"}},"field":{"password":{"visibility":{"hide":"Ocultar","show":"Mostrar","title":{"hide":"Ocultar la contraseña","show":"Mostrar la contraseña"}}}},"nav":{"services":"Servicios instalados"},"category":{"all":"Todas las categorías","konnectors":"Servicios","banking":"Bancos","cozy":"Lo esencial","education":"Educación","energy":"Energía","health":"Salud","host_provider":"Huésped","insurance":"Seguros","isp":"PSI","online_services":"Servicios en línea","others":"Otros","mes_infos":"Experimentación MesInfos","partners":"Socios","productivity":"Productividad","press":"Prensa","ptnb":"Experimentación PTNB","public_service":"Servicios Públicos","shopping":"Compras","social":"Social","telecom":"Telecom","transport":"Transporte","pro":"Trabajo","tech":"Tecnología","clouds":"Nubes y bóvedas","finance":"Empleo y finanzas"},"loading":{"initial":"Cargando cuentas...","working":"Cargando"},"validation":{"exact_length":"Debe estar compuesto de %{length} caracteres exactamente.","max_length":"La longitud máxima es de %{length}  caracteres.","min_length":"Debe contener al menos %{length} caracteres.","pattern":"El valor debe coincidir con un patrón específico: %{pattern}.\\n"},"update":{"title":"Está disponible una actualización de este servicio.","regular":"Actualice esta versión para seguir obteniendo sus datos y disponer de las últimas mejoras.","blocking":"Actualícela para seguir obteniendo sus datos","CTA":"Actualizar"},"error":{"initial":"Algo ocurrió al recolectar sus colectores y sus datos. por favor, vuelva a cargar la página.","LOGIN_FAILED":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo.","UNKNOWN_ERROR":"Algo inesperado ha ocurrido al ejecutar el conector","JOB_TIMEOUT":"La ejecución del conector ha tardado mucho","button":{"reload":"Volver a cargar la página ahora"}},"move_modal":{"title":"Traslado terminado","text":"El traslado de sus datos desde %{de} ha sido exitoso.","button":"Acceder a mi Cozy"},"maintenance":{"icon":"Este conector está en mantenimiento","service":"Servicio interrumpido","problem":"%{konnectorName} no permite que su Cozy acceda a sus datos","title":"¿Qué sucede?"},"connector":{"mute":"Error desconocido","debug":{"successMessage":"Este konnector es sólo para fines de debug, este es un mensaje habitual adicional de éxito."},"empty":{"title":"¡Empiece a recopilar sus datos!","text":"Sincronice sus cuentas con su Cozy para recuperar automáticamente sus datos (facturas, reembolsos, gastos...)"},"silenced":"%{name} no se sugerirá más. Siempre puede encontrar un proveedor haciendo clic en el botón \\"Añadir\\".","noAccount":"Cuenta inexistente","add":"Añadir un servicio","update":"Actualización disponible","logo":{"alt":"%{name} logo\\n"},"enedis":{"description":{"service":"Recupere sus datos de Linky conectandose a su cuenta de Enedis. Debe tener un medidor Linky y haber creado antes su cuenta de Enedis [en el sitio web de Enedis] (https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Fing proporciona este conector para el proyecto MesInfos. Recupera los datos de su contrato de electricidad y descarga su consumo de electricidad del día anterior. Este conector se ejecuta en su Cozy y Fing no tendrá acceso a estos datos."}},"orange":{"message":{"delay":"Una vez conectado, se envía al sistema de información de Orange una solicitud para extraer sus datos. Estos datos son válidos durante 15 días. Sus datos se actualizan automáticamente cada quince días."}},"orangemobile":{"description":{"connector":"En el contexto de \'MesInfos\', Orange le permite localizar permanentemente su teléfono.\\n\\n**La recopilación de datos exige su acuerdo previo**\\n\\nHaciendo clic en \\"Apruebo\\", usted consiente que se recopile la posición de su teléfono, cada 30 minutos. La información recopilada será la siguiente:\\nFecha y hora de la ubicación.\\nDatos de la ubicación de la antena más cercana en el momento de la recopimación.\\nLos datos recopilados por Orange después de su aceptación estarán disponibles sólo en el Cozy que usted ha asignado en el contexto de \'MesInfos\'. Se añadirán a sus datos de ubicación almacenados en su registro de llamadas.","service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente los registros de llamadas de su teléfono. Estos registros de llamadas incluyen su número de teléfono, el número de teléfono de su corresponsal, fecha, duración de la llamada  y datos sobre la localización de la antena radio más cercana en el momento de la recopilación.\\n\\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \\"Mapeando Mi Vida\\" (pronto disponible en el Cozy Store).","field":{"agreement":"¿En el contexto de \\"Mes infos\\", aprueba usted que Orange localice regularmente su teléfono ?"}}},"orangevideos":{"description":{"service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente la lista de las películas que usted ha descargado gratis (TV Replay) o pagando VOD desde em 01/01/2015 (no se incluyen películos con contenido para adultos°.\\\\n\\\\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \\"My Movies Music\\" (pronto disponible en el Cozy Store)."}},"axabanque102":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo).","connector":"La respuesta secreta es [pregunta por HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) cuando usted se conecta sin doble autenticación. Ejemplo: ¿Cómo se llama su mascota?"}},"ingdirect95":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Sincronizando cuentas","header_mobile":"%{done} de %{total}","header_done":"Sincronizado %{done}  de %{total}","item":{"pending":"Pendiente"},"close":"Cerrar"},"services":{"title":"Servicios instalados"},"status":{"interrupted":"SEVICIO INTERRUMPIDO","edf":{"maintenance":"El sistema de información de EDF ha cambiado y el acceso a los datos relacionados no funciona. Este konnector no puede recuperar actualmente sus datos de EDF. Estamos tratando de restaurar la situación y le notificaremos cuando se arregle. [Más información en](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"dd MMM"}}},"sections":{"label_compact":"Mosaico Compacto","label_detailed":"Lista Detallada","label_grouped":"Agrupado en Carpeta"}}')

}),
"./src/locales/fr.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"app":{"logo":{"alt":"Logo de %{name}"}},"date":{"format":"dd/LL/yyyy","placeholder":"iiiiii/mm/yyyy"},"manifest":{"name":"Accueil","short_description":"Cozy Home est l\'application de récupération de vos données personnelles disponible sur Cozy.","long_description":"Avec Cozy Home, vous pouvez facilement :\\n\\n * Télécharger les documents de tous vos fournisseurs\\n * Configurer la fréquence à laquelle Cozy va récupérer vos factures\\n * Accéder directement aux documents récupérés par votre Cozy","changes":"Cela ne vous aura pas échappé, le Store est arrivé dans Cozy !\\nNous en avons profité pour améliorer Collect :\\n\\n * Adaptation au Store.\\n * Fusion des tuiles : lorsque vous avez plusieurs comptes pour un même fournisseur ces derniers sont désormais réunis sous la tuile de ce fournisseur.\\n * Amélioration des pages des connecteurs."},"add_service":"Ajouter","fix_konnector_error":"Corriger maintenant","logout":"Déconnexion","logout_dialog":{"title":"Déconnexion","content":"Souhaitez vous réellement vous déconnecter ?","cancel":"Annuler ?","confirm":"Se déconnecter"},"help":"Aide","help_link":"https://support.cozy.io/","account":{"config":{"default_folder":"/Administratif/%{name}","optional":"(Optionnel)","title":"Connectez votre compte %{name}","data":{"title":"Données collectées :","service":{"description":"Description du service :"}},"tabs":{"sync":"Synchronisation","account":"Compte","data":"Données collectées"}},"disconnect":{"title":"Déconnexion","description":"Vous serez déconnecté de ce compte, mais les données importées seront conservées"},"form":{"title":"Compte","label":{"firstname":"Prénom","lastname":"Nom","login":"Identifiant","consumerKey":"Clé client","consumerSecret":"Secret client","appKey":"Clé de l\'application","appSecret":"Secret de l\'application","tricountUrl":"URL Tricount","cardNumber":"Numéro de carte","dob":"Date de naissance","password":"Mot de passe","email":"Mail","bank_identifier":"Identifiant bancaire (optionnel)","profileName":"Nom de Profil","identifier":"Identifiant","new_identifier":"Identifiant","secret":"Mot de passe","answer":"Réponse secrète","access_token":"Jeton d\'accès","accessTokenSecret":"Secret du jeton d\'accès","apikey":"Clé d\'API","phoneNumber":"Numéro de téléphone","folderPath":"Emplacement du dossier","namePath":"Nom du dossier","authCode":"Code d\'authentification","accountName":"Nom du compte","loginUrl":"URL d\'authentification","token":"Jeton","agreement":"J\'accepte","refreshToken":"Mettre à jour le jeton","timeout":"Délai (ms)","branchName":"Agence","code":"Code confidentiel"},"placeholder":{"password":"Le mot de passe utilisé pour vous connecter au service","update_password":"Mettre à jour le mot de passe","accountName":"Exemple: Compte personnel","namePath":"Example : Factures de Camille. Le dossier par défaut sera votre identifiant."},"button":{"connect":"Se connecter","cancel":"Annuler","save":"Sauvegarder","disconnect":"Déconnecter ce compte","delete":"Supprimer ce compte","advanced":"Configuration avancée","synchronize":"Mettre à jour maintenant"}},"folder":{"title":"Paramètres du dossier associé","withoutSettings":{"title":"Dossier associé"},"link":"Ouvrir le dossier dans Cozy Drive","changePath":"Changer le dossier","error":"Mince, quelque chose s\'est mal passé. Ne vous inquiétez pas, vos fichiers sont toujours là.","close":"fermer","warning":"Vous êtes en train de modifier le dossier de votre connecteur","oldFiles":"Toutes vos anciennes factures seront déplacées dans votre nouveau dossier.","newFiles":"Toutes vos nouvelles factures seront téléchargées dans votre nouveau dossier.","newPath":"Tout s\'est bien passé, le nouveau dossier de votre compte %{name} est :","placeholder":{"administrative":"Administratif","photos":"Photos"}},"success":{"title":{"connect":"Configuration réussie !","update":"Votre compte %{name} est mis à jour !"},"banksLinkText":"Voir mes comptes dans %{appName}","driveLinkText":"Ouvrir le dossier dans Cozy Drive","button":"Fermer"},"message":{"folder":{"title":"Dossier","link":"Ouvrir le dossier dans Cozy Drive"},"success":{"connect":"Vos données existantes seront disponibles dans votre Cozy dans quelques minutes et les prochaines suivront automatiquement.","update":"Votre compte %{name} a été mis à jour avec succès.","delete":"Compte supprimé avec succès."},"syncing":{"bill":"Vos factures sont en cours de synchronisation et seront disponibles au chemin suivant :"},"synced":{"title":"Mise à jour de vos données","cron":"Fréquence de mise à jour : %{frequency}","cron_hourly":"une fois par heure","cron_daily":"une fois par jour","cron_weekly":"hebdomadaire","cron_monthly":"une fois par mois","cron_undefined":"manuellement","syncing":"en cours…","unknown":"indéterminée","last_sync":"Dernière mise à jour : **%{date}**","date_format":"Le D LLLL yyyy [à] HH[:]mm","bill":"Retrouvez vos données dans l\'application Cozy Drive à l\'emplacement :"},"error":{"server":"Une erreur est survenue, vos identifiants n\'ont pas pu être enregistrés. Pouvez-vous recommencer ?","bad_credentials":"Votre identifiant et/ou mot de passe ne sont pas corrects.","delete":"Une erreur est survenue, vos identifiants n\'ont pas pu être enregistrés. Pouvez-vous recommencer ?"}},"forceConnection":"Relancer maintenant","editor_detail":"Service développé par %{editor}"},"account_picker":{"add_account_button":{"label":"Ajouter un compte"}},"apps":{"title":"Mes applications","installing":"Installation en cours ..."},"connection":{"CTA":{"twofa_failed":"Relancer maintenant"},"error":{"default":{"title":"Une erreur est survenue","description":"Un problème semble s\'être produit pendant la tentative de connexion à %{name}. Merci de revérifier vos informations de compte, de consulter notre aide en ligne ou de nous contacter à contact@cozycloud.cc"},"DISK_QUOTA_EXCEEDED":{"title":"Espace Cozy plein","description":"Actuellement, le service ne peut plus récupérer vos documents.\\nLibérez de l\'espace en supprimant des fichiers ou rendez-vous dans **Paramètres > Stockage** pour augmenter l\'espace de stockage de votre Cozy"},"CHALLENGE_ASKED":{"title":"Second facteur d’authentification demandé","description":"Un second facteur d’authentification que nous ne gérons pas encore est demandé. Vous pouvez essayer de vous connecter directement sur le site [%{name}](%{link}) avant de réessayer."},"LOGIN_FAILED":{"title":"Mauvais identifiants","description":"Données de connexion incorrectes. Vérifiez les données de connexion dans le connecteur et relancez la connexion."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Informations requise","description":"Un champ additionnel doit être rempli pour vérifier vos identifiants."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporairement bloqué","description":"Trop de tentatives erronées ont eu lieu. Merci de modifier votre mot de passe sur le site [%{name}](%{link}) et de mettre à jour le connecteur ensuite."},"MAINTENANCE":{"title":"Site non disponible","description":"Il semble que le site [%{name}](%{link}) soit indisponible. Merci de relancer ultérieurement ou de consulter notre aide en ligne."},"NOT_EXISTING_DIRECTORY":{"title":"Dossier de destination manquant","description":"Il semble que le dossier de destination pour ce compte ait été supprimé. Merci de le restaurer en déconnectant ce compte puis en le reconnectant à nouveau."},"UNKNOWN_ERROR":{"title":"Erreur de Connexion","description":"Une erreur inconnue est survenue"},"USER_ACTION_NEEDED":{"title":"Action nécessaire chez le fournisseur","description":"Il semble que le site [%{name}](%{link}) ait besoin que vous vous y authentifiiez pour faire une action spécifique. Merci de relancer le connecteur une fois cette action effectuée."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Actualisation de l\'accès requis","description":"Il semble que le site [%{name}](%{link}) demande d\'autoriser à nouveau le connecteur. Merci de déconnecter puis reconnecter votre compte %{name}. Aucune donnée ne sera perdue."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Compte client non accessible","description":"Il semble que votre compte ne soit plus actif. Merci de vérifier son statut sur le site [%{name}](%{link}) avant de réessayer."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Renouvellement de mot de passe demandé","description":"Il semble que le site [%{name}](%{link}) ait besoin que vous vous y authentifiiez pour renouveler votre mot de passe. Merci de relancer le connecteur une fois cette action effectuée."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Validation des nouvelles permissions nécessaire","description":"Votre connecteur a été mis à jour et les permissions nécessaires ont changé. Merci de valider les nouvelles permissions avant de relancer le connecteur."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relancez la connexion au service pour récupérer vos données.","description":"La dernière connexion au service a échoué; merci de la relancer.\\nIl vous faudra peut-être renseigner un code de validation."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Le code fournis ne semble pas correct","description":"Le code de deux facteurs est incorrect, veuillez recommencer."},"VENDOR_DOWN":{"title":"Service non disponible","description":"Il semble que le service [%{name}](%{link}) ne nous réponde pas dans les temps actuellement. Merci de relancer ultérieurement."},"VENDOR_DOWN.BANK_DOWN":{"title":"Site non disponible","description":"Site non disponible"},"VENDOR_DOWN.LINXO_DOWN":{"title":"Service non disponible","description":"Il semble que le site [%{name}](%{link}) ne nous réponde pas dans les temps actuellement. Merci de relancer ultérieurement."}}},"intent":{"konnector":{"install":{"error":{"message":"Le connecteur ne peut pas être installé"}}},"service":{"return":"Revenir à la liste des connecteurs","success":{"button":{"label":"Fermer"}},"error":{"initialization":"L\'initialisation du service a échoué.","creation":"Impossible de créer le compte, il y a eu une erreur.","cause":"Raison : %{error}"},"cancel":"Annuler","terminate":"Terminer"}},"field":{"password":{"visibility":{"hide":"Masquer","show":"Afficher","title":{"hide":"Masquer le mot de passe","show":"Afficher le mot de passe"}}}},"nav":{"services":"Services installés"},"category":{"all":"Toutes les catégories","konnectors":"Services","banking":"Banques","cozy":"Les essentielles","education":"Education","energy":"Energie","health":"Santé","host_provider":"Hébergeur","insurance":"Assurance","isp":"Mobile et Internet","online_services":"Services en ligne","others":"Autres","mes_infos":"Expérimentation MesInfos","partners":"Partenaires","productivity":"Productivité","press":"Presse","ptnb":"Expérimentation Carnet du Logement","public_service":"Services publics","shopping":"Shopping","social":"Social","telecom":"Mobile","transport":"Voyage et transport","pro":"Travail","tech":"Tech","clouds":"Clouds & coffres","finance":"Emploi & finance"},"loading":{"initial":"Chargement des comptes…","working":"Chargement"},"validation":{"exact_length":"La valeur doit faire exactement %{length} caractères.","max_length":"La longueur maximum est de %{length} caractères.","min_length":"La valeur doit contenir au moins %{length} caractères.","pattern":"La valeur doit respecter un format spécifique : %{pattern}"},"update":{"title":"Une mise à jour est disponible pour ce service.","regular":"Effectuez la mise à jour pour continuer à récupérer vos données et profiter des dernières fonctionnalités","blocking":"Mettez-le à jour pour continuer à récupérer vos données","CTA":"Mettre à jour"},"error":{"initial":"Quelque chose s’est mal passé pendant la récupération de vos connecteurs et de vos informations. Merci de recharger la page.","LOGIN_FAILED":"Données de connexion incorrectes. Vérifiez les données de connexion dans le connecteur et relancez la connexion.","UNKNOWN_ERROR":"Quelque-chose d’inattendu s‘est produit pendant l’exécution du connecteur","JOB_TIMEOUT":"L’exécution du connecteur a pris trop de temps","button":{"reload":"Rechargez la page maintenant"}},"move_modal":{"title":"Déplacement terminé","text":"Le déplacement de vos données depuis %{from} est terminé avec succès.","button":"Accéder à mon Cozy"},"maintenance":{"icon":"Ce connecteur est en cours de maintenance","service":"Service interrompu","problem":"%{konnectorName} ne permet pas à votre Cozy d\'accéder à vos données","title":"Que se passe-t-il ?"},"connector":{"title":"Mes services connectés","mute":"Erreur silencieuse","debug":{"successMessage":"Ce konnecteur est utilisé uniquement pour déboguer l\'application, ceci est un message de succès additionnel."},"empty":{"title":"Commencez à réunir vos données !","text":"Synchronisez vos marques avec votre Cozy pour récupérer automatiquement vos données (factures, remboursements, dépenses…)"},"silenced":"%{name} n’est plus proposé. Vous pourrez toujours retrouver un fournisseur en cliquant sur \\"Ajouter\\"","noAccount":"Aucun compte","add":"Ajouter un service","update":"Mise à jour dispo.","logo":{"alt":"Logo de %{name}"},"enedis":{"description":{"service":"Retrouvez vos données Linky en connectant votre compte Enedis. Vous devez avoir un compteur Linky et avoir préalablement créé votre compte Enedis (sur [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Ce connecteur est proposé par Fing pour le projet MesInfos. Il récupère les données de votre contrat d\'électricité et télécharge vos consommations électriques de la veille. Ce connecteur fonctionne sur votre Cozy et Fing n\'aura aucun accès à vos données."}},"orange":{"message":{"delay":"Une demande d’extraction de vos données a été émise vers le système d’information d’Orange. Ces données seront disponibles sous 7 jours. Par la suite, vos données seront mises à jour automatiquement dans votre espace Cozy Cloud, à intervalles de 7 jours."}},"orangemobile":{"description":{"connector":"**De manière optionnelle et dans le cadre du pilote « Mes Infos »**, Orange vous offre aussi la possibilité de localiser votre téléphone mobile de manière régulière.\\n\\n**Le recueil de ces données nécessite votre accord explicite.**\\n\\nCet accord pourra être révoqué à tout moment via ce même connecteur de données.\\n\\nEn cliquant sur « Accepter », vous donnerez votre accord pour qu’une localisation de votre téléphone mobile soit effectuée à compter de ce jour, deux fois par heure. Les informations recueillies contiendront uniquement :\\n<ul><li>La date et l’heure de cette localisation.</li><li>Les coordonnées géographiques de l’antenne radio à laquelle le mobile est rattaché au moment de la localisation.</li></ul>Les données récoltées par Orange  seront accessibles, après votre accord, uniquement dans le Cozy Cloud qui vous a été attribué dans le cadre du pilote « Mes Infos ». Elles viendront compléter les informations de localisation déjà présentes dans les comptes rendus d’appels.","service":"Les données mises à disposition par Orange via ce connecteur contiennent les comptes rendus des appels émis et reçus depuis votre mobile à partir du 01/07/2016. Ces comptes rendus incluent votre numéro, celui de votre correspondant, l’heure et la durée de l’appel, ainsi que la localisation géographique de l’antenne radio à laquelle le mobile était rattaché au moment de l’appel.\\n\\nVous pourrez utiliser ces données dans différentes applications de votre Cozy Cloud, par exemple « Mapping My Life » (disponibilité prochaine sur le Cozy Store)","field":{"agreement":"Acceptez-vous qu’Orange localise régulièrement votre téléphone mobile dans le cadre du pilote « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"Les données mises à disposition par Orange via ce connecteur contiennent la liste des films que vous avez visionnés à partir du 01/01/2015 en VOD payante ou gratuite (Replay TV) à partir de votre Livebox (à l’exception des contenus « adulte »). \\n\\nVous pourrez utiliser ces données dans différentes applications de votre Cozy, par exemple « La Musique de mes Films » (disponibilité prochaine sur le Cozy Store) "}},"axabanque102":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo). "}},"bforbank97":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo).","connector":"La réponse secrète est [demandée par HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) lors d\'une connexion sans double authentification. Exemple: quel est le nom de votre animal de compagnie? "}},"ingdirect95":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}}},"shortcut":{"edit":"Modifier le raccourci","delete":"Supprimer"},"Queue":{"header":"Synchronisation :","header_mobile":"%{done} sur %{total}","header_done":"Synchronisé %{done} sur %{total}","item":{"pending":"En cours"},"close":"Fermer"},"services":{"title":"Mes services"},"status":{"interrupted":"SERVICE INTERROMPU","edf":{"maintenance":"EDF a modifié son système d\'information et son accès à vos données ne fonctionne plus. Ce connecteur n\'est donc pas actuellement en mesure de récupérer vos données personnelles détenues par EDF. Nous tentons de rétablir la situation et vous informerons dès que le service sera rétabli. [En savoir plus](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"dd MMM"}}},"defaultRedirection":{"snackbar":{"description":"Définir cette page comme page par défaut sur votre application mobile ?","refuse":"Non merci","accept":"OK"}},"backup":{"backupInProgress":"Sauvegarde en cours","confirmStopBackupModal":{"title":"Arrêter la sauvegarde ?","description":"Votre sauvegarde n\'est pas terminée. Souhaitez vous l\'arrêter ? Les photo et video resteront dans votre Cozy. Vous pourrez reprendre la sauvegarde plus tard.","cancel":"Annuler","stop":"Arrêter"},"appHighlightAlert":{"description":"Mettez vos photos & videos en sécurité en les sauvegardant automatiquement dans votre Cozy!"}},"appHighlightAlert":{"geolocationTracking":{"defaultDescription":"Suivez vos déplacements et votre empreinte carbone avec le Coach CO2","bikegoalSourceEmployerDescription":"Votre %{sourceType} %{sourceName} vous invite à participer à l’amélioration du territoire et bénéficier de la \\"prime vélo\\", cette application vous aidera à mesurer son avancement, et bien plus !","bikegoalSourceDefaultDescription":"Votre %{sourceType} %{sourceName} vous invite à participer à l\'amélioration du territoire, mémorisez et analysez vos déplacements !"}},"sections":{"label_compact":"Mosaïque condensée","label_detailed":"Liste détaillée","label_grouped":"Regroupé en dossier"},"AnnouncementsDialogContent":{"dateFormat":"dd/LL/yyyy","skip":"J\'ai compris"},"Widget":{"open":"Ouvrir","configure":"Configurer","openApp":"Ouvrir l\'application","customize":"Personnaliser les widgets","up":"Monter","down":"Descendre","remove":"Supprimer","Drive":{"NoRecentFiles":"Aucun fichier récent","NoRecentFolders":"Aucun dossier récent","NoTrashedFiles":"Aucun fichier dans la corbeille"},"Papillon":{"NoCourses":"Aucun cours à venir","NoHomeworks":"Aucun travail à faire","NoGrades":"Aucune note disponible"}}}')

}),
"./src/locales/it.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"Avete una domanda?","send":"Inviare","result":"Chiedete all\'assistente"},"dialog":{"close":"Chiudere"},"name":"Assistente Cozy","sources":"%{smart_count} fonte |||| %{smart_count} fonti","suggestions":{"find_file":"Ricerca di un file","reimbursements":"Controllare i miei rimborsi","reorganise_files":"Riorganizzare i miei file"}},"app":{"logo":{"alt":"%{name} logo"}},"date":{"format":"LL/dd/yyyy","placeholder":"mm/iiiiii/yyyy"},"manifest":{"name":"Home","short_description":"Cozy Home is the application that help you gather all your personal data inside Cozy.","long_description":"With Cozy Home, you can easily:\\n * Downloads documents from all your suppliers\\n * Set how often Cozy will collect your bills\\n * Access directly to the documents gathered by your Cozy","changes":"You haven\'t missed it, the Store arrived in your Cozy!\\nWe took advantage of it to improve Collect:\\n * Store adaptation.\\n * Tile merge: when you have several accounts for a single supplier, the former are now merged under the supplier tile.\\n * Improvement of some Connectors pages."},"add_service":"Add","fix_konnector_error":"Risolvi adesso","logout":"Esci","help":"Aiuto","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Optional)","title":"Connect your %{name} account","data":{"title":"Collected data:","service":{"description":"Service description:"}},"tabs":{"sync":"synchronization","account":"account","data":"collected data"}},"disconnect":{"title":"Disconnection","description":"Your will be disconnected from this account, but imported data will be kept"},"form":{"title":"Account","label":{"firstname":"Firstname","lastname":"Lastname","login":"Login","consumerKey":"Consumer Key","consumerSecret":"Consumer Secret","appKey":"Application Key","appSecret":"Application Secret","tricountUrl":"Tricount URL","cardNumber":"Card Number","dob":"Date of birth","password":"Password","email":"Email","bank_identifier":"Bank identifier (optional)","profileName":"Profile Name","identifier":"Identifier","new_identifier":"Identifier","secret":"Password","answer":"Secret Answer","access_token":"Access token","accessTokenSecret":"Access token secret","apikey":"Api key","phoneNumber":"Phone number","folderPath":"Folder path","namePath":"Folder name","authCode":"Auth code","accountName":"Account name","loginUrl":"Login URL","token":"Token","agreement":"I agree","refreshToken":"Refresh Token","timeout":"Delay (ms)","branchName":"Branch","code":"Confidential code"},"placeholder":{"password":"The password you use to connect to the service","update_password":"Update the password","accountName":"Example: Personal account","namePath":"Example: Camille bills. Default name path is your login."},"button":{"connect":"Connect","cancel":"Cancel","save":"Save","disconnect":"Disconnect this account","delete":"Delete this account","advanced":"Advanced options","synchronize":"Synchronize now"}},"folder":{"title":"Related folder settings","withoutSettings":{"title":"Related folder"},"link":"Open the folder in Cozy Drive","changePath":"change the path","error":"Oops, something went wrong. Don\'t panic, your files are still there, please try again later","close":"close","warning":"You\'re changing your folder path","oldFiles":"All your olds bills will be moved in your new path.","newFiles":"Your news bills will be downloaded in your new path.","newPath":"Everything went well, the new path for your %{name} account is:","placeholder":{"administrative":"Amministrativo","photos":"Foto"}},"success":{"title":{"connect":"Successful configuration!","update":"Your %{name} account is updated!"},"banksLinkText":"Mostra il mio account in %{appName}","driveLinkText":"Apri la cartella in Cozy Drive","button":"Close"},"message":{"folder":{"title":"Folder","link":"Open folder on cozy drive"},"success":{"connect":"Your data will be available in your Cozy in a few minutes and the next ones will follow automatically.","update":"Your %{name} account has been updated successfully.","delete":"Account removed succesfully."},"syncing":{"bill":"Your bills are syncing and will be available in the following path:"},"synced":{"title":"Your data synchronization","cron":"Synchronization frequency: %{frequency}","cron_hourly":"each hour","cron_daily":"once a day","cron_weekly":"once a week","cron_monthly":"once a month","cron_undefined":"manually","syncing":"running…","unknown":"unknown","last_sync":"Last synchronization: **%{date}**","date_format":"LLLL D[,] yyyy [at] HH[:]mm","bill":"Find your datas in the Drive app at this location:"},"error":{"server":"Apologies, our server had an hiccup, do you mind starting again?","bad_credentials":"Sorry, you entered an incorrect login or password.","delete":"Apologies, our server had an hiccup, do you mind starting again?"}},"forceConnection":"Esegui di nuovo adesso","editor_detail":"Service developed by %{editor}"},"account_picker":{"add_account_button":{"label":"Add an account"}},"apps":{"title":"My apps","installing":"Installazione…"},"connection":{"CTA":{"twofa_failed":"Esegui di nuovo adesso"},"error":{"default":{"title":"An error occured","description":"Sfortunatamente qualcosa è andato storto durante la connessione a %{name}. \\nControlla di nuovo le informazioni del tuo account, visita la nostra sezione di aiuto online o contattaci a contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Cozy Storage full","description":"This service cannot fetch your documents now. Please remove some files or go to **Settings > Storage** to get more free space."},"CHALLENGE_ASKED":{"title":"Challenge required","description":"It seems that the website requires a second authentification factor that we don’t support yet. You may try to settle the issue on the [%{name}](%{link}) website before a retry."},"LOGIN_FAILED":{"title":"Bad credentials","description":"Bad credentials. Check the konnector fields and run the connection again."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Needs secret","description":"An additional field must be filled in before checking your credentials."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporarily blocked","description":"Too many attempts occured. Please update your credentials on [%{name}](%{link}) website and update the konnector later on."},"MAINTENANCE":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable or the konnector must be updated. Please rerun the connector later or visit our online help."},"NOT_EXISTING_DIRECTORY":{"title":"Missing destination folder","description":"It seems that this account\'s destination folder has been deleted. Please restore it by disconnecting this account and then reconnect again."},"UNKNOWN_ERROR":{"title":"Connection error","description":"An unknown error has occurred."},"USER_ACTION_NEEDED":{"title":"Action needed on the provider","description":"It seems that the [%{name}](%{link}) website requires you to log in and to do a specific action. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Access refresh required","description":"Il servizio [%{name}](%{link}) richiede che tu permetta di nuovo l\'accesso. Disconetti e riconetti il tuo account %{name} a questa applicazione. \\nNon verrà perso nessun dato."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Unavailable account","description":"It seems that your account is no longer active. Please check your account on [%{name}](%{link}) before retry."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Password update required","description":"It seems that the [%{name}](%{link}) website requires you to log in and update your password. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"New permissions validation needed","description":"You connector was updated and the permissions changed. Please validate them before launching the connector again."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Rilancia la connessione al servizio per recuperare i tuoi dati","description":"L\'ultima connessione al servizio è fallita; eseguila di nuovo. Potresti dover inserire un codice di validazione."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Codice a due fattori errato","description":"Il codice a due fattori inserito è errato, prova di nuovo."},"VENDOR_DOWN":{"title":"Unavailable service","description":"It seems that the [%{name}](%{link}) service is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.BANK_DOWN":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Unavailable service","description":"It seems that we are experiencing overload with our bank konnectors at the moment. Please rerun the connector later."}}},"intent":{"konnector":{"install":{"error":{"message":"The konnector cannot be installed"}}},"service":{"return":"Back to connectors list","success":{"button":{"label":"Close"}},"error":{"initialization":"Service failed to initialize. Sorry for the inconvenience.","creation":"Unable to create account, an error occurred.","cause":"Cause: %{error}"},"cancel":"Cancel","terminate":"Terminate"}},"field":{"password":{"visibility":{"hide":"Hide","show":"Show","title":{"hide":"Hide password","show":"Show password"}}}},"nav":{"services":"My services"},"category":{"all":"Tutte le categorie","konnectors":"Servizi","banking":"Banche","cozy":"L\'essenziale","education":"Educazione","energy":"Energia","health":"Salute","host_provider":"Host","insurance":"Assicurazioni","isp":"ISP","online_services":"Servizi online","others":"Altri","mes_infos":"Sperimentazione MesInfos","partners":"Partner","productivity":"Produttività","press":"Stampa","ptnb":"Sperimentazione PTNB","public_service":"Servizi pubblici","shopping":"Shopping","social":"Sociale","telecom":"Telecom","transport":"Trasporti","pro":"Lavoro","tech":"Tecnologia","clouds":"Cloud e caveau","finance":"Lavoro e finanza"},"loading":{"initial":"Loading accounts...","working":"Loading"},"validation":{"exact_length":"It\'s must be made up of %{length} characters exactly.","max_length":"The length maximum is %{length} characters.","min_length":"It should contain at least %{length} characters.","pattern":"The value must match a specific pattern: %{pattern}"},"update":{"title":"E\' disponibile un aggiornamento per questo servizio.","regular":"Esegui questo aggiornamento per continuare a recuperare i tuoi dati e per avere le ultime funzionalità","blocking":"Aggiornalo per continuare a recuperare i tuoi dati","CTA":"Aggiorna"},"error":{"initial":"Something went wrong when fetching your connectors and informations. Please refresh the page.","LOGIN_FAILED":"Bad credentials. Check the konnector fields and run the connection again.","UNKNOWN_ERROR":"Something unexpected happened while running the connector","JOB_TIMEOUT":"The connector execution was too long","button":{"reload":"Refresh now"}},"maintenance":{"icon":"This connector is under maintenance","service":"Service interrupted","problem":"%{konnectorName} doesn\'t allow your Cozy to access your data","title":"What is going on ?"},"connector":{"debug":{"successMessage":"This konnector is for debug purpose only, this is an additionnal custom success message."},"empty":{"title":"Inizia a raccogliere i tuoi dati!","text":"Sincronizza i tuoi marchi con il tuo Cozy per recuperare automaticamente i tuoi dati (fatture, rimborsi, spese...)"},"silenced":"%{name} non sarà piu suggerito. Potrai sempre trovare un fornitore facendo clic sul pulsante \\"Aggiungi\\".","noAccount":"No account","add":"Add a service","update":"Aggiornamento disponibile","logo":{"alt":"%{name} logo"},"enedis":{"description":{"service":"Recover your Linky data by connecting your Enedis account. You must have a Linky meter and have first created your Enedis account (on the [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). This connector is provided by Fing for the MesInfos project. It retrieves the data from your electricity contract and downloads your electricity consumption the day before. This connector is running on your Cozy and the Fing will have no access to this data."}},"orange":{"message":{"delay":"Once connected, a demand to extract your data will be sent to Orange information system. These data will be available within 15 days. You data will be updated automatically, every 15 days."}},"orangemobile":{"description":{"connector":"In the context of \'MesInfos\', Orange allows you to localize your phone regularly.\\n\\n**Data collection needs your express agreement**\\n\\nThis agreement may be revoked at any time by this data connector.\\n\\nBy clicking on \\"Agree\\", you give your consent to collect your phone\'s position, every 30 minutes. Information gathered will on be : \\n<ul><li>Date and time of this location.</li><li>Location data of the closest radio antenna at the time of collect.</li></ul>Collected data by Orange after you agreement will be available only in your Cozy that you have been assigned in context of  « Mes Infos ». They will be added to location data already stored in call logs.","service":"This connector will download data from your Orange account on your Cozy. It will automatically download the call logs from your phone. Thus call logs include your phone number, your corresponding\'s phone number, date and time of this call and location data of the closest radio antenna at the time of collect.\\n\\nYou will be able to use these data in different apps in your Cozy, for example \\"Mapping My Life\\" (available soon on the Cozy Store).","field":{"agreement":"Do you agree that Orange localizes regularly your phone in context of  « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"This connector will download data from your Orange account on your Cozy. It will automatically download the list of movies you downloaded in free (TV Replay) or paid VOD from 01/01/2015 (adult contents are not included).\\n\\nYou will be able to use these data in different apps in your Cozy, for example \\"My Movies Music\\" (available soon on the Cozy Store)."}},"axabanque102":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo).","connector":"The secret answer is [asked by HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) when you connect without double authentication. Example: what is the name of your pet?"}},"ingdirect95":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Syncing accounts:","header_mobile":"%{done} of %{total}","header_done":"Synced %{done} out of %{total}","item":{"pending":"Pending"},"close":"Close"},"services":{"title":"My services"},"status":{"interrupted":"INTERRUPTED SERVICE","edf":{"maintenance":"EDF\'s information system has changed and the related data access doesn\'t work anymore. This konnector is not currently able to get back your data from EDF. We are trying to restore the situation and we will notice you when it will be fixed. [Learn more](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"MMM dd"}}}}')

}),
"./src/locales/ja.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"質問はありますか？","send":"送る","result":"アシスタントに聞く"},"dialog":{"close":"閉じる"},"name":"アシスタント Cozy","sources":"%{smart_count} ソース |||| %{smart_count} ソース","suggestions":{"find_file":"ファイルの検索","reimbursements":"返済額の確認","reorganise_files":"ファイルの整理"}},"app":{"logo":{"alt":"%{name} ロゴ"}},"date":{"format":"yyyy/LL/dd","placeholder":"yyyy/mm/iiiiii"},"manifest":{"name":"ホーム","short_description":"Cozy コレクトは、すべてのパーソナルデータを Cozy に収集するのに役立つアプリケーションです。","long_description":"Cozy コレクトを使用すると、次のことが簡単にできます:\\n* すべてのサプライヤーからドキュメントをダウンロード\\n* Cozy が請求書を収集する頻度の設定\\n* Cozy で集められたドキュメントに直接アクセス","changes":"なくなっていません。Cozy にストアが登場しました!\\n以下のようなコレクトの改善を行いました:\\n* ストアの対応。\\n* タイルマージ: サプライヤーのアカウントが複数ある場合、サプライヤータイルの下にマージされます。\\n* いくつかのコネクターページの改善。"},"add_service":"追加","fix_konnector_error":"今すぐ修正","logout":"ログアウト","help":"ヘルプ","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(オプション)","title":"自分の %{name} アカウントに接続","data":{"title":"収集したデータ:","service":{"description":"サービス説明:"}},"tabs":{"sync":"同期","account":"アカウント","data":"収集したデータ"}},"disconnect":{"title":"切断","description":"このアカウントから切断されますが、インポートされたデータは保存されます"},"form":{"title":"アカウント","label":{"firstname":"名","lastname":"姓","login":"ログイン","consumerKey":"コンシューマーキー","consumerSecret":"コンシューマーシークレット","appKey":"アプリケーションキー","appSecret":"アプリケーションシークレット","tricountUrl":"Tricount URL","cardNumber":"カード番号","dob":"誕生日","password":"パスワード","email":"メール","bank_identifier":"銀行コード (オプション)","profileName":"プロファイル名","identifier":"ID","new_identifier":"ID","secret":"パスワード","answer":"秘密の答え","access_token":"アクセストークン","accessTokenSecret":"アクセストークン シークレット","apikey":"API キー","phoneNumber":"電話番号","folderPath":"フォルダーのパス","namePath":"フォルダー名","authCode":"認証コード","accountName":"アカウント名","loginUrl":"ログイン URL","token":"トークン","agreement":"同意する","refreshToken":"トークンを更新","timeout":"遅延 (ms)","branchName":"支店","code":"機密コード"},"placeholder":{"password":"サービスに接続するために使用するパスワード","update_password":"パスワードを更新","accountName":"例: 個人口座","namePath":"例: カミーユ紙幣。 デフォルトのパス名はあなたのログイン名です。"},"button":{"connect":"接続","cancel":"キャンセル","save":"保存","disconnect":"このアカウントを切断","delete":"このアカウントを削除","advanced":"詳細オプション","synchronize":"今すぐ同期"}},"folder":{"title":"関連フォルダーの設定","withoutSettings":{"title":"関連フォルダー"},"link":"フォルダーを Cozy ドライブで開く","changePath":"パスを変更","error":"何か問題が発生しました。 慌てないでください。ファイルはまだそこにあります。後でもう一度やり直してください","close":"閉じる","warning":"フォルダーのパスを変更しています","oldFiles":"すべての古い請求書は新しいパスに移動されます。","newFiles":"新しい請求書は新しいパスにダウンロードされます。","newPath":"すべてうまくいきました。%{name} アカウントの新しいパスは次のとおりです:","placeholder":{"administrative":"管理","photos":"写真"}},"success":{"title":{"connect":"設定が完了しました!","update":"お使いの %{name} アカウントを更新しました!"},"banksLinkText":"%{appName} で自分のアカウントを参照","driveLinkText":"フォルダーを Cozy ドライブで開く","button":"閉じる"},"message":{"folder":{"title":"フォルダー","link":"フォルダーを Cozy ドライブで開く"},"success":{"connect":"データは数分であなたの Cozy で利用可能になります。自動的に次に続きます。","update":"%{name} アカウントが正常に更新されました。","delete":"アカウントを正常に削除しました。"},"syncing":{"bill":"請求書が同期されて、次のパスで利用できます:"},"synced":{"title":"あなたのデータの同期","cron":"同期頻度: %{frequency}","cron_hourly":"毎時","cron_daily":"1 日 1 回","cron_weekly":"週 1 回","cron_monthly":"月 1 回","cron_undefined":"手動","syncing":"実行中…","unknown":"不明","last_sync":"前回の同期: **%{date}**","date_format":"yyyy[/]LL[/]dd HH[:]mm","bill":"ドライブアプリで、この場所のデータを見つけます:"},"error":{"server":"申し訳ありません。サーバーに問題がありました。もう一度やり直していただけますか?","bad_credentials":"申し訳ありません。入力されたログインまたはパスワードが間違っています。","delete":"申し訳ありません。サーバーに問題がありました。もう一度やり直していただけますか?"}},"forceConnection":"今すぐもう一度実行する","editor_detail":"サービス開発者 %{editor}"},"account_picker":{"add_account_button":{"label":"アカウントを追加"}},"apps":{"title":"マイ アプリ","installing":"インストール中…"},"connection":{"CTA":{"twofa_failed":"今すぐもう一度実行する"},"error":{"default":{"title":"エラーが発生しました","description":"残念ながら、%{name} に接続するときに問題が発生しました。 アカウント情報をもう一度確認するか、オンラインヘルプを参照するか、 contact@cozycloud.cc にお問い合わせください。"},"DISK_QUOTA_EXCEEDED":{"title":"Cozy ストレージが一杯です","description":"現在このサービスはあなたのドキュメントを取得できません。 いくつかのファイルを削除するか、**設定 > ストレージ** に移動して空き容量を増やしてください。"},"CHALLENGE_ASKED":{"title":"挑戦が必要です","description":"Webサイトは、まだサポートしていない二番目の認証要素が必要なようです。 再試行の前に、[%{name}](%{link}) Webサイトで問題が解決する可能性があります。"},"LOGIN_FAILED":{"title":"資格情報が正しくありません","description":"Bad credentials. Check the konnector fields and run the connection again."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Needs secret","description":"An additional field must be filled in before checking your credentials."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporarily blocked","description":"Too many attempts occured. Please update your credentials on [%{name}](%{link}) website and update the konnector later on."},"MAINTENANCE":{"title":"ウェブサイトが利用できません","description":"[%{name}](%{link}) のウェブサイトが利用できないか、コネクターをアップデートする必要があるようです。 後でコネクターに戻るか、オンラインヘルプを参照してください。"},"NOT_EXISTING_DIRECTORY":{"title":"対象のフォルダーが見つかりません","description":"このアカウントの対象フォルダーが削除されたようです。このアカウントを切断し、その後再接続して回復してください。"},"UNKNOWN_ERROR":{"title":"接続エラー","description":"不明なエラーが発生しました。"},"USER_ACTION_NEEDED":{"title":"プロバイダーで操作が必要","description":"[%{name}](%{link}) のウェブサイトにログインして、特定の操作を行う必要があるようです。 Web サイトで問題を解決してから、コネクターに戻ってください。"},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Access refresh required","description":"[%{name}](%{link}) サービスは、アクセスをもう一度許可する必要があります。 アカウント %{name} を切断して、このアプリケーションに再接続してください。 データが失われることはありません。"},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Unavailable account","description":"It seems that your account is no longer active. Please check your account on [%{name}](%{link}) before retry."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"パスワードの更新が必要です","description":"It seems that the [%{name}](%{link}) website requires you to log in and update your password. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"New permissions validation needed","description":"You connector was updated and the permissions changed. Please validate them before launching the connector again."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"データを取得するためにサービスへの接続を再起動","description":"前回のサービスへの接続は失敗しました。 もう一度起動してください。 検証コードを入力する必要があるかもしれません。"},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"２要素コードが間違っています","description":"入力された２要素コードが間違っています。もう一度やり直してください。"},"VENDOR_DOWN":{"title":"Unavailable service","description":"It seems that the [%{name}](%{link}) service is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.BANK_DOWN":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Unavailable service","description":"It seems that we are experiencing overload with our bank konnectors at the moment. Please rerun the connector later."}}},"intent":{"konnector":{"install":{"error":{"message":"The konnector cannot be installed"}}},"service":{"return":"コネクター一覧に戻る","success":{"button":{"label":"閉じる"}},"error":{"initialization":"サービスを初期化できませんでした。 ご不便おかけして申し訳ありません。","creation":"アカウントを作成できません。エラーが発生しました。","cause":"原因: %{error}"},"cancel":"キャンセル","terminate":"終了"}},"field":{"password":{"visibility":{"hide":"非表示","show":"表示","title":{"hide":"パスワードを非表示","show":"パスワードを表示"}}}},"nav":{"services":"インストールされたサービス"},"category":{"all":"すべて","banking":"銀行","health":"健康","insurance":"保険","transport":"交通","social":"ソーシャル","isp":"ISP","telecom":"電話","energy":"エネルギー","host_provider":"ホスト","productivity":"生産性","shopping":"ショッピング","public_service":"公共サービス","other":"その他"},"loading":{"initial":"アカウントを読み込んでいます...","working":"読み込み中"},"validation":{"exact_length":"%{length} 文字で正確に構成する必要があります。","max_length":"最大長は %{length} 文字です。","min_length":"%{length} 文字以上にする必要があります。","pattern":"値は指定したパターンに一致する必要があります: %{pattern}"},"update":{"title":"このサービスのアップデートが利用可能です。","regular":"このアップデートを実行して、データを取得し、最新の機能を利用できるようにしましょう。","blocking":"データを取得し続けるように更新する","CTA":"アップデート"},"error":{"initial":"コネクターと情報を取得する際に何か問題が発生しました。 ページを更新してください。","LOGIN_FAILED":"資格情報が間違っています。 Konnector フィールドを確認し、再度接続を実行してください。","UNKNOWN_ERROR":"コネクターの実行中に予期しないことが発生しました","JOB_TIMEOUT":"コネクターの実行時間が長すぎます","button":{"reload":"今すぐ更新"}},"maintenance":{"icon":"This connector is under maintenance","service":"Service interrupted","problem":"%{konnectorName} doesn\'t allow your Cozy to access your data","title":"What is going on ?"},"connector":{"debug":{"successMessage":"このコネクターはデバッグ目的用のみです。これは追加のカスタム成功メッセージです。"},"empty":{"title":"データの収集を開始してください！","text":"ブランドと Cozy を同期して、自動的にデータ (請求書、払い戻し、経費など…) を取得します"},"silenced":"%{name} はもう提案されません。 \\"追加\\" ボタンをクリックして、いつでもプロバイダーを見つけることができます。","noAccount":"アカウントがありません","add":"サービスを追加","update":"アップデートが利用できます","logo":{"alt":"%{name} ロゴ"},"enedis":{"description":{"service":"Recover your Linky data by connecting your Enedis account. You must have a Linky meter and have first created your Enedis account (on the [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). This connector is provided by Fing for the MesInfos project. It retrieves the data from your electricity contract and downloads your electricity consumption the day before. This connector is running on your Cozy and the Fing will have no access to this data."}},"orange":{"message":{"delay":"接続されると、Orange の情報システムにデータの抽出要求が送信されます。これらのデータは 15 日以内に利用可能となります。データは 15 日ごとに自動的に更新されます。"}},"orangemobile":{"description":{"connector":"\'MesInfos\' のコンテキストで、Orange で携帯電話を定期的にローカライズすることができます。\\n\\n**データ収集にはあなたの明示的な合意が必要です**\\n\\nこの契約は、このデータコネクターによっていつでも取り消すことができます。\\n\\n\\"同意する\\" をクリックすると、30 分ごとに電話の位置を収集することに同意します。 収集される情報は次のとおりです:\\n<ul><li>この場所の日付と時刻。</li><li>収集時に最も近い無線アンテナの位置データ。</li></ul>契約後に Orange で収集されたデータは、« Mes Infos » のコンテキストで割り当てられた Cozy でのみ利用可能です。 通話履歴にすでに格納されているロケーションデータに追加されます。","service":"このコネクタは Cozy で Orange アカウントからデータをダウンロードします。 お使いの電話から自動的に通話記録をダウンロードします。 したがって、通話記録には、収集時の電話番号、相手の電話番号、この通話の日時、最も近い無線アンテナの位置データが含まれます。\\n\\nCozy のさまざまなアプリでこれらのデータを使用することができます。たとえば、\\"Mapping My Life\\" (Cozy ストアでまもなく利用できます) などです。","field":{"agreement":"« Mes Infos » のコンテキストで Orange がお使いの電話を定期的にローカライズすることに同意しますか?"}}},"orangevideos":{"description":{"service":"このコネクターは Orange アカウントから Cozy にデータをダウンロードします。 無料 (TV 再放送) または 2015 年 1 月 1 日から有料 VOD (アダルトコンテンツは含みません) でダウンロードした映画のリストが自動的にダウンロードされます。\\n\\n(まもなく Cozy ストアで利用可能な) \\"マイムービーミュージック\\"など、Cozy の別のアプリでこれらのデータを使用することができます。"}},"axabanque102":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"銀行への接続は、私たちのパートナーによって安全に運営されています : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo).","connector":"二段階認証がないとき、接続時に秘密の回答を [HSBC から尋ねられます](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) 。 例: ペットの名前は何ですか?"}},"ingdirect95":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"銀行への接続は、私たちパートナーによって運営され安全です : Linxo. [詳細情報](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"同期中の口座:","header_mobile":"%{done} / %{total}","header_done":"%{done} / %{total} 同期しました","item":{"pending":"保留"},"close":"閉じる"},"services":{"title":"マイ サービス"},"status":{"interrupted":"INTERRUPTED SERVICE","edf":{"maintenance":"EDF の情報システムが変更され、関連するデータへのアクセスはもはや機能しません。 このコネクターは現在 EDF からデータを取得することはできません。 私たちは状況を回復しようとしていて、修正されたら通知します。 [詳細](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"LL/dd"}}}}')

}),
"./src/locales/nl_NL.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"assistant":{"search":{"placeholder":"Heb je een vraag?","send":"Verzenden","result":"Vraag het de assistent"},"dialog":{"close":"Sluit"},"name":"Cozy Assistent","sources":"%{smart_count} bron |||| %{smart_count} bronnen","suggestions":{"find_file":"Een bestand zoeken","reimbursements":"Mijn vergoedingen controleren","reorganise_files":"Mijn bestanden reorganiseren"}},"app":{"logo":{"alt":"%{name}-logo"}},"date":{"format":"LL/dd/yyyy","placeholder":"mm/iiiiii/yyyy"},"manifest":{"name":"Startpagina","short_description":"Cozy Verzamelingen is dé app die je helpt al je persoonlijke gegevens binnen Cozy te verzamelen.","long_description":"Met Cozy Verzamelingen kun je eenvoudig:\\n * documenten downloaden van al je leveranciers\\n * instellen hoe vaak Cozy je rekeningen moet verzamelen\\n * toegang krijgen tot documenten die jouw Cozy verzameld heeft","changes":"Je kunt het niet gemist hebben: de Winkel is gearriveerd op jouw Cozy!\\nWe hebben daar gebruik van gemaakt om Verzamelingen te verbeteren door:\\n * winkelintegratie.\\n * tegelsamenvoeging: als je meerdere accounts bij dezelfde leverancier hebt, dan zijn ze nu samengevoegd onder één tegel.\\n * sommige connector-pagina\'s te verbeteren."},"add_service":"Toevoegen","fix_konnector_error":"Nu oplossen","logout":"Uitloggen","logout_dialog":{"title":"Uitloggen","content":"Weet je zeker dat je wilt uitloggen?","cancel":"Annuleren","confirm":"Uitloggen"},"help":"Hulp","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(optioneel)","title":"Koppel je %{name}-account","data":{"title":"Verzamelde gegevens:","service":{"description":"Dienstomschrijving:"}},"tabs":{"sync":"synchronisatie","account":"account","data":"verzamelde gegevens"}},"disconnect":{"title":"Koppeling verbreken","description":"Je accountkoppeling wordt verbroken, maar geïmporteerde gegevens blijven bewaard"},"form":{"title":"Account","label":{"firstname":"Voornaam","lastname":"Achternaam","login":"Inloggen","consumerKey":"Toegangssleutel","consumerSecret":"Toegangsgeheim","appKey":"Appsleutel","appSecret":"Appgeheim","tricountUrl":"Tricount-URL","cardNumber":"Kaartnummer","dob":"Geboortedatum","password":"Wachtwoord","email":"E-mailadres","bank_identifier":"Bankidentificatie (optioneel)","profileName":"Profielnaam","identifier":"Identificatie","new_identifier":"Identificatie","secret":"Wachtwoord","answer":"Geheim antwoord","access_token":"Toegangssleutel","accessTokenSecret":"Toegangssleutel-geheim","apikey":"API-sleutel","phoneNumber":"Telefoonnummer","folderPath":"Mappad","namePath":"Mapnaam","authCode":"Authenticatiecode","accountName":"Accountnaam","loginUrl":"Inlog-URL","token":"Toegangssleutel","agreement":"Ik ga akkoord","refreshToken":"Toegangssleutel vernieuwen","timeout":"Vertraging (ms)","branchName":"Tak","code":"Geheime code"},"placeholder":{"password":"Het wachtwoord dat je gebruikt om de dienst te koppelen","update_password":"Wachtwoord bijwerken","accountName":"Bijvoorbeeld: Persoonlijk account","namePath":"Bijvoorbeeld: Jans rekeningen. Het standaard naampad is je inlognaam."},"button":{"connect":"Koppelen","cancel":"Annuleren","save":"Opslaan","disconnect":"Accountkoppeling verbreken","delete":"Dit account verwijderen","advanced":"Geavanceerde opties","synchronize":"Nu synchroniseren"}},"folder":{"title":"Gerelateerde mapinstellingen","withoutSettings":{"title":"Gerelateerde map"},"link":"Open de map in Cozy Drive","changePath":"pad wijzigen","error":"Oeps, er is iets misgegaan. Geen zorgen, je bestanden zijn nog steeds aanwezig. Probeer het later opnieuw.","close":"sluiten","warning":"Je staat op het punt om je mappad te wijzigen","oldFiles":"Al je oude rekeningen worden verplaatst naar je nieuwe pad.","newFiles":"Je nieuwe rekeningen worden gedownload naar je nieuwe pad.","newPath":"Alles is goed gegaan! Het nieuwe pad voor je account \'%{name}\' is:","placeholder":{"administrative":"Administratief","photos":"Foto\'s"}},"success":{"title":{"connect":"Instellen voltooid!","update":"Je account \'%{name}\' is bijgewerkt!"},"banksLinkText":"Bekijk mijn accounts in %{appName}","driveLinkText":"Open de map in Cozy Drive","button":"Sluiten"},"message":{"folder":{"title":"Map","link":"Open de map op Cozy Drive"},"success":{"connect":"Je gegevens zijn over een paar minuten beschikbaar en de volgende volgen automatisch.","update":"Je account \'%{name} is bijgewerkt.","delete":"Account is verwijderd."},"syncing":{"bill":"Je rekeningen worden gesynchroniseerd en komen beschikbaar op het volgende pad:"},"synced":{"title":"Je gegevenssynchronisatie","cron":"Synchronisatiefrequentie: %{frequency}","cron_hourly":"elk uur","cron_daily":"één keer per dag","cron_weekly":"één keer per week","cron_monthly":"één keer per maand","cron_undefined":"handmatig","syncing":"wordt uitgevoerd...","unknown":"onbekend","last_sync":"Laatst gesynchroniseerd op: **%{date}**","date_format":"LLLL D[,] yyyy [om] HH[:]mm","bill":"Vind je gegevens terug in de Drive-app op deze locatie:"},"error":{"server":"Excuses. Er ging iets mis op onze server. Wil je opnieuw beginnen?","bad_credentials":"Sorry, je gebruikersnaam of wachtwoord is onjuist.","delete":"Excuses. Er ging iets mis op onze server. Wil je opnieuw beginnen?"}},"forceConnection":"Nu opnieuw uitvoeren","editor_detail":"Dienst ontwikkeld door %{editor}"},"account_picker":{"add_account_button":{"label":"Account toevoegen"}},"apps":{"title":"Mijn apps","installing":"Bezig met installeren…"},"connection":{"CTA":{"twofa_failed":"Nu opnieuw uitvoeren"},"error":{"default":{"title":"Er is een fout opgetreden","description":"Sorry, er is iets misgegaan bij het verbinden met %{name}. Controleer je accountinformatie, bezoek onze online hulp of neem contact op via contact@cozycloud.cc"},"DISK_QUOTA_EXCEEDED":{"title":"Cozy-opslag is vol","description":"Deze dienst kan je documenten nu niet ophalen. Verwijder wat bestanden of ga naar **Instellingen > Opslag** om meer vrije ruimte te verkrijgen."},"CHALLENGE_ASKED":{"title":"Uitdaging vereist","description":"Het lijkt erop dat de website authenticatie in twee stappen vereist; wij ondersteunen dit nog niet. Je kunt dit proberen op te lossen via de website [%{name}](%{link}) voordat je het opnieuw probeert."},"LOGIN_FAILED":{"title":"Onjuiste inloggegevens","description":"Onjuiste inloggegevens. Controleer de Connector-velden en probeer de koppeling opnieuw te maken."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Geheim vereist","description":"Er moet een extra veld worden ingevuld voordat je gegevens gecontroleerd kunnen worden."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Tijdelijk geblokkeerd","description":"Teveel inlogpogingen. Werk je inloggegevens bij via de website [%{name}](%{link}) en werk dan later de Connector bij."},"MAINTENANCE":{"title":"Website niet beschikbaar","description":"Het lijkt erop dat de website [%{name}](%{link}) niet beschikbaar is of dat de Connector moet worden bijgewerkt. Probeer het later opnieuw of bezoek ons hulpcentrum."},"NOT_EXISTING_DIRECTORY":{"title":"Ontbrekende bestemmingsmap","description":"Het lijkt erop dat de bestemmingsmap van dit account verwijderd is. Herstel deze door het account te ontkoppelen en daarna te herkoppelen."},"UNKNOWN_ERROR":{"title":"Verbindingsfout","description":"Er is een onbekende fout opgetreden."},"USER_ACTION_NEEDED":{"title":"Actie benodigd bij dienst","description":"Het lijkt erop dat de website [%{name}](%{link}) vereist dat je inlogt én een specifieke actie uitvoert. Probeer het opnieuw nadat je het probleem hebt opgelost."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Accountverversing vereist","description":"De dienst \'[%{name}](%{link})\' vereist dat je opnieuw machtigt. Ontkoppel je account en herstel deze (%{name}); er gaan geen gegevens verloren."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Account niet bsechikbaar","description":"Het lijkt erop dat je account niet meer actief is. Controleer je account op [%{name}](%{link}) voordat je het opnieuw probeert."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Wachtwoord moet worden bijgewerkt","description":"Het lijkt erop dat de website [%{name}](%{link}) vereist dat je inlogt en je wachtwoord bijwerkt. Ontkoppel de Connector en herkoppel hem zodra je het probleem hebt opgelost."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Nieuwe machtigingen","description":"Je Connector is bijgewerkt; daarbij zijn de machtigingen gewijzigd. Valideer de machtigingen en probeer het opnieuw."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Herkoppel je account om je gegevens op te halen","description":"De vorige koppeling is mislukt; koppel deze opnieuw. Mogelijk moet je een validatiecode opgeven."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Onjuiste code opgegeven","description":"De code voor authenticatie in twee stappen is onjuist. Begin overnieuw."},"VENDOR_DOWN":{"title":"Dienst niet beschikbaar","description":"Het lijkt erop dat de dienst [%{name}](%{link}) momenteel niet beschikbaar is. Probeer het later opnieuw."},"VENDOR_DOWN.BANK_DOWN":{"title":"Website niet beschikbaar","description":"Het lijkt erop dat de website [%{name}](%{link}) momenteel niet beschikbaar is. Probeer het later opnieuw."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Dienst niet beschikbaar","description":"Het lijkt erop dat er momenteel teveel mensen hun bank proberen te koppelen. Probeer het later opnieuw."}}},"intent":{"konnector":{"install":{"error":{"message":"De Connector kan niet worden geïnstalleerd"}}},"service":{"return":"Terug naar Connector-lijst","success":{"button":{"label":"Sluiten"}},"error":{"initialization":"Dienst-initialisatie mislukt. Excuses voor het ongemak.","creation":"Het account kan niet worden aangemaakt; er is een fout opgetreden.","cause":"Oorzaak: %{error}"},"cancel":"Annuleren","terminate":"Beëindigen"}},"field":{"password":{"visibility":{"hide":"Verbergen","show":"Tonen","title":{"hide":"Wachtwoord verbergen","show":"Wachtwoord tonen"}}}},"nav":{"services":"Mijn diensten"},"category":{"all":"Alle","konnectors":"Diensten","banking":"Banken","cozy":"De essentie","education":"Onderwijs","energy":"Energiemaatschappijen","health":"Gezondheidszorg","host_provider":"Hosts","insurance":"Verzekeringen","isp":"Internetproviders","online_services":"Online diensten","others":"Overige","mes_infos":"MesInfos-experiment","partners":"Partners","productivity":"Productiviteit","press":"Pers","ptnb":"PTNB-experiment","public_service":"Openbare diensten","shopping":"Winkelen","social":"Sociaal","telecom":"Telecomproviders","transport":"Vervoer","pro":"Werk","tech":"Techniek","clouds":"Clouds en kluizen","finance":"Werk en financiën"},"loading":{"initial":"Bezig met laden van accounts...","working":"Bezig met laden"},"validation":{"exact_length":"Het moet exact %{length} tekens bevatten.","max_length":"De maximale lengte is {%length} tekens.","min_length":"Het moet minimaal %{length} tekens bevatten.","pattern":"De waarde moet overeenkomen met een specifiek patroon: %{pattern}"},"update":{"title":"Er is een update beschikbaar voor deze dienst.","regular":"Voer deze update uit om je gegevens te blijven ophalen en de nieuwste functies te verkrijgen","blocking":"Voer deze update uit om je gegevens te blijven ophalen en de nieuwste functies te verkrijgen","CTA":"Bijwerken"},"error":{"initial":"Er is iets misgegaan bij het ophalen van je connectors en informatie. Ververs de pagina.","LOGIN_FAILED":"Onjuiste inloggegevens. Controleer de Connector-velden en probeer de koppeling opnieuw te maken.","UNKNOWN_ERROR":"Er is een onverwachte fout opgetreden tijdens het draaien van de connector","JOB_TIMEOUT":"De connector-uitvoering duurde te lang","button":{"reload":"Nu verversen"}},"move_modal":{"title":"Voltooide verplaatsen","text":"De gegevens van %{from} zijn verplaatst.","button":"Open mijn Cozy"},"maintenance":{"icon":"Aan deze connector wordt momenteel gewerkt","service":"Dienst onderbroken","problem":"%{konnectorName} verzamelt geen gegevens van je Cozy","title":"Wat gebeurt er allemaal?"},"connector":{"mute":"Fout tijdens dempen","debug":{"successMessage":"Deze connector wordt alleen gebruikt voor foutopsporing; dit is een extra bericht."},"empty":{"title":"Begin met het ophalen van je gegevens!","text":"Synchroniseer je producten met Cozy om automatisch gegevens op te halen (rekeningen, vergoedingen, uitgaven, etc.)"},"silenced":"%{name} wordt niet langer aanbevolen. Je kunt ten allen tijde een dienst zoeken door op de knop \'Toevoegen\' te klikken.","noAccount":"Geen account","add":"Dienst toevoegen","update":"Update beschikbaar","logo":{"alt":"%{name}-logo"},"enedis":{"description":{"service":"Herstel je Linky-gegevens door je Enedis-account te koppelen. Je moet een Linky-meter hebben en reeds een Enedis-account hebben aangemaakt (op de [Enedis-website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Deze connector wordt je aangeboden voor Fing van het MesInfo-project. Het verzamelt gegevens over je energiecontract en haalt je electriciteitsverbruik van de voorgaande dag op. Deze connector draait op je Cozy en Fing heeft geen toegang tot deze gegevens."}},"orange":{"message":{"delay":"Zodra de koppeling gemaakt is, wordt er een gegevensverzoek gedaan bij Orange\'s informatiesysteem. Deze gegevens komen binnen 15 dagen beschikbaar en worden vervolgens elke 15 dagen automatisch bijgewerkt."}},"orangemobile":{"description":{"connector":"In de context van \'MesInfos\' staat Orange je toe om je telefoon regelmatig te lokaliseren.\\n\\n**Gegevensverzameling vereist expliciete toestemming**\\n\\nDeze toestemming kan op elk moment worden ingetrokken door deze connector.\\n\\nDoor op \\"Ik ga akkoord\\" te klikken, geef je toestemming om je telefoonlocatie elke 30 minuten door te geven. De volgende informatie wordt verzameld:\\n\\n<ul><li>Datum en tijd op deze locatie.</li><li>Locatiegegevens van de dichtstbijzijnde zendmast op het moment van verzamelen.</li></ul>De door Orange verzamelde gegevens worden alleen beschikbaar in je Cozy en ingedeeld onder « Mes Infos ». Ze worden toegevoegd aan reeds aanwezige locatiegegevens in je gespreksgeschiedenis.","service":"Deze connector haalt automatisch gegevens op van je Orange-account en importeert deze naar je Cozy. De gespreksgeschiedenis van je telefoon wordt automatisch opgehaald. De geschiedenis bevat je telefoonnummer, datum en tijd van dit gesprek en locatiegegevens van de dichtstbijzijnde zendmast op het moment van verzamelen.\\n\\nJe kunt deze gegevens gebruiken in verschillende Cozy-apps, zoals bijv. de app \\"Mijn leven in kaart brengen\\" (binnenkort beschikbaar in de Cozy-winkel).","field":{"agreement":"Ga je akkoord met het door Orange regelmatig lokaliseren van je telefoon voor « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"Deze connector haalt automatisch gegevens op van je Orange-account en importeert deze naar je Cozy. Het haalt automatisch een lijst op met gedownloade films, zowel gratis (TV Replay) als betaald (VOD) sinds 01/01/2015 (excl. erotisch materiaal).\\n\\nJe kunt deze gegevens gebruiken in verschillende Cozy-apps, zoals bijv. \\"Mijn films en muziek\\" (binnenkort beschikbaar in de Cozy-winkel)."}},"axabanque102":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo).","connector":"Het geheime antwoord [wordt gevraagd door HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) zodra je probeert te verbinden zonder authenticatie in twee stappen. Voorbeeld: wat is de naam van je huisdier?"}},"ingdirect95":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"De verbinding met je bank wordt beheerd en beveiligd door onze partner Linxo. [meer informatie](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Bezig met synchroniseren van accounts:","header_mobile":"%{done} van %{total}","header_done":"%{done} van %{total} gesynchroniseerd","item":{"pending":"In wachtrij"},"close":"Sluiten"},"services":{"title":"Mijn diensten"},"status":{"interrupted":"DIENST ONDERBROKEN","edf":{"maintenance":"EDF\'s informatiesysteem is gewijzigd en de gerelateerde gegevenstoegang werkt niet meer. Deze connector kan momenteel dus geen gegevens opvragen. We proberen de situatie te herstellen en melden je als het probleem is opgelost. [meer informatie](%{supportLink})\\n","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"dd MMM"}}},"defaultRedirection":{"snackbar":{"description":"Wil je deze pagina instellen als startscherm van je mobiele app?","refuse":"Nee, bedankt","accept":"Oké"}},"backup":{"backupInProgress":"Er wordt een reservekopie gemaakt","confirmStopBackupModal":{"title":"Reservekopie afbreken?","description":"De reservekopie is nog niet voltooid. Weet je zeker dat je het proces wilt afbreken? Reeds opgeslagen foto\'s blĳven bewaard op je Cozy en je kunt de reservekopie te allen tĳde hervatten.","cancel":"Annuleren","stop":"Afbreken"},"appHighlightAlert":{"description":"Bewaar je foto\'s veilig op je Cozy om ze te beschermen tegen verlies of diefstal."}}}')

}),
"./src/locales/ru.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"app":{"logo":{"alt":"Логотип %{name}"}},"date":{"format":"LL/dd/yyyy","placeholder":"мм/дд/гггг"},"manifest":{"name":"Главная","short_description":"Cozy Home — это приложение, которое помогает собирать все ваши личные данные в Cozy.","long_description":"С Cozy Home вы можете легко:\\n * Загружать документы от всех ваших поставщиков\\n * Настраивать, как часто Cozy собирает ваши счета\\n * Получать прямой доступ к документам, собранным Cozy","changes":"Вы ничего не пропустили, Магазин появился в вашем Cozy!\\nМы воспользовались этим, чтобы улучшить сбор:\\n * Адаптация под Магазин.\\n * Объединение плиток: если у вас несколько аккаунтов у одного поставщика, они теперь объединены под одной плиткой.\\n * Улучшение некоторых страниц Коннекторов."},"add_service":"Добавить","fix_konnector_error":"Исправить сейчас","logout":"Выйти","logout_dialog":{"title":"Выход","content":"Вы уверены, что хотите выйти из Cozy?","cancel":"Отмена","confirm":"Выйти"},"help":"Помощь","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Административные/%{name}","optional":"(Опционально)","title":"Подключите ваш аккаунт %{name}","data":{"title":"Собираемые данные:","service":{"description":"Описание сервиса:"}},"tabs":{"sync":"синхронизация","account":"аккаунт","data":"собираемые данные"}},"disconnect":{"title":"Отключение","description":"Вы будете отключены от этого аккаунта, но загруженные данные останутся"},"form":{"title":"Аккаунт","label":{"firstname":"Имя","lastname":"Фамилия","login":"Логин","consumerKey":"Потребительский ключ","consumerSecret":"Потребительский секрет","appKey":"Ключ приложения","appSecret":"Секрет приложения","tricountUrl":"Tricount URL","cardNumber":"Номер карты","dob":"Дата рождения","password":"Пароль","email":"Email","bank_identifier":"Идентификатор банка (опционально)","profileName":"Имя профиля","identifier":"Идентификатор","new_identifier":"Идентификатор","secret":"Пароль","answer":"Секретный ответ","access_token":"Токен доступа","accessTokenSecret":"Секрет токена доступа","apikey":"API ключ","phoneNumber":"Номер телефона","folderPath":"Путь к папке","namePath":"Имя папки","authCode":"Код авторизации","accountName":"Имя аккаунта","loginUrl":"URL входа","token":"Токен","agreement":"Я согласен","refreshToken":"Токен обновления","timeout":"Задержка (мс)","branchName":"Филиал","code":"Конфиденциальный код"},"placeholder":{"password":"Пароль, который вы используете для входа в сервис","update_password":"Обновить пароль","accountName":"Пример: Личный аккаунт","namePath":"Пример: Счета Камиллы. По умолчанию используется ваш логин."},"button":{"connect":"Подключить","cancel":"Отмена","save":"Сохранить","disconnect":"Отключить этот аккаунт","delete":"Удалить этот аккаунт","advanced":"Дополнительные настройки","synchronize":"Синхронизировать сейчас"}},"folder":{"title":"Настройки связанной папки","withoutSettings":{"title":"Связанная папка"},"link":"Открыть папку в Cozy Drive","changePath":"изменить путь","error":"Что-то пошло не так. Не волнуйтесь, ваши файлы на месте, попробуйте позже","close":"закрыть","warning":"Вы меняете путь к папке","oldFiles":"Все ваши старые счета будут перемещены по новому пути.","newFiles":"Новые счета будут загружаться по новому пути.","newPath":"Всё прошло успешно, новый путь для вашего аккаунта %{name}:","placeholder":{"administrative":"Административные","photos":"Фото"}},"success":{"title":{"connect":"Успешная настройка!","update":"Ваш аккаунт %{name} обновлён!"},"banksLinkText":"Посмотреть мои аккаунты в %{appName}","driveLinkText":"Открыть папку в Cozy Drive","button":"Закрыть"},"message":{"folder":{"title":"Папка","link":"Открыть папку в Cozy Drive"},"success":{"connect":"Ваши данные будут доступны в вашем Cozy через несколько минут, а следующие будут загружаться автоматически.","update":"Ваш аккаунт %{name} успешно обновлён.","delete":"Аккаунт успешно удалён."},"syncing":{"bill":"Ваши счета синхронизируются и будут доступны по следующему пути:"},"synced":{"title":"Синхронизация ваших данных","cron":"Частота синхронизации: %{frequency}","cron_hourly":"каждый час","cron_daily":"раз в день","cron_weekly":"раз в неделю","cron_monthly":"раз в месяц","cron_undefined":"вручную","syncing":"выполняется…","unknown":"неизвестно","last_sync":"Последняя синхронизация: %{date}","date_format":"LLLL D[,] yyyy [в] HH[:]mm","bill":"Найдите свои данные в приложении Drive по этому пути:"},"error":{"server":"Извините, наш сервер дал сбой, не могли бы вы повторить попытку?","bad_credentials":"Извините, вы ввели неверный логин или пароль.","delete":"Извините, наш сервер дал сбой, не могли бы вы повторить попытку?"}},"forceConnection":"Запустить снова","editor_detail":"Сервис разработан %{editor}"},"account_picker":{"add_account_button":{"label":"Добавить аккаунт"}},"apps":{"title":"Мои приложения","installing":"Установка…"},"connection":{"CTA":{"twofa_failed":"Запустить снова"},"error":{"default":{"title":"Произошла ошибка","description":"К сожалению, при подключении к %{name} что-то пошло не так. Пожалуйста, проверьте данные вашего аккаунта, прочитайте справочную информацию или свяжитесь с нами по адресу contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Хранилище Cozy заполнено","description":"Этот сервис не может загрузить ваши документы. Пожалуйста, удалите некоторые файлы или перейдите в Настройки > Хранилище, чтобы получить больше места."},"CHALLENGE_ASKED":{"title":"Требуется проверка","description":"Похоже, что сайт требует двухфакторную аутентификацию, которую мы пока не поддерживаем. Вы можете попробовать решить проблему на сайте %{name} перед повторной попыткой."},"LOGIN_FAILED":{"title":"Неверные данные","description":"Неверные данные. Проверьте поля коннектора и запустите подключение снова."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Требуется секрет","description":"Перед проверкой данных необходимо заполнить дополнительное поле."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Временно заблокировано","description":"Слишком много попыток. Пожалуйста, обновите данные на сайте %{name} и обновите коннектор позже."},"MAINTENANCE":{"title":"Сайт недоступен","description":"Похоже, что сайт %{name} недоступен или коннектор требует обновления. Пожалуйста, запустите коннектор позже или прочитайте справочную информацию."},"NOT_EXISTING_DIRECTORY":{"title":"Отсутствует целевая папка","description":"Похоже, что целевая папка для этого аккаунта была удалена. Пожалуйста, восстановите её, отключив и снова подключив этот аккаунт."},"UNKNOWN_ERROR":{"title":"Ошибка подключения","description":"Произошла неизвестная ошибка."},"USER_ACTION_NEEDED":{"title":"Требуется действие на стороне поставщика","description":"Похоже, что сайт %{name} требует от вас входа и выполнения определённого действия. Пожалуйста, запустите коннектор снова после решения проблемы на сайте."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Требуется обновление доступа","description":"Сервис %{name} требует повторного разрешения доступа. Пожалуйста, отключите и снова подключите ваш аккаунт %{name} к этому приложению. Данные не будут потеряны."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Аккаунт недоступен","description":"Похоже, что ваш аккаунт больше не активен. Пожалуйста, проверьте ваш аккаунт на сайте %{name} перед повторной попыткой."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Требуется обновление пароля","description":"Похоже, что сайт %{name} требует от вас входа и обновления пароля. Пожалуйста, запустите коннектор снова после решения проблемы на сайте."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Требуется подтверждение новых разрешений","description":"Ваш коннектор был обновлён, и разрешения изменились. Пожалуйста, подтвердите их перед повторным запуском коннектора."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Перезапустите подключение к сервису для загрузки данных","description":"Последнее подключение к сервису не удалось; пожалуйста, запустите его снова. Возможно, вам потребуется предоставить проверочный код."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Неверный код двухфакторной аутентификации","description":"Указан неверный код двухфакторной аутентификации, пожалуйста, начните заново."},"VENDOR_DOWN":{"title":"Сервис недоступен","description":"Похоже, что сервис %{name} сейчас недоступен. Пожалуйста, запустите коннектор позже."},"VENDOR_DOWN.BANK_DOWN":{"title":"Сайт недоступен","description":"Похоже, что сайт %{name} сейчас недоступен. Пожалуйста, запустите коннектор позже."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Сервис недоступен","description":"Похоже, что у нас перегрузка банковских коннекторов. Пожалуйста, запустите коннектор позже."}}},"intent":{"konnector":{"install":{"error":{"message":"Коннектор не может быть установлен"}}},"service":{"return":"Вернуться к списку коннекторов","success":{"button":{"label":"Закрыть"}},"error":{"initialization":"Не удалось инициализировать сервис. Приносим извинения за неудобства.","creation":"Не удалось создать аккаунт, произошла ошибка.","cause":"Причина: %{error}"},"cancel":"Отмена","terminate":"Завершить"}},"field":{"password":{"visibility":{"hide":"Скрыть","show":"Показать","title":{"hide":"Скрыть пароль","show":"Показать пароль"}}}},"nav":{"services":"Мои сервисы"},"category":{"all":"Все категории","konnectors":"Сервисы","banking":"Банки","cozy":"Основное","education":"Образование","energy":"Энергия","health":"Здоровье","host_provider":"Хостинг","insurance":"Страхование","isp":"Мобильная связь и интернет","online_services":"Онлайн-сервисы","others":"Другое","mes_infos":"Эксперимент MesInfos","partners":"Партнёры","productivity":"Продуктивность","press":"Пресса","ptnb":"Эксперимент PTNB","public_service":"Государственные услуги","shopping":"Покупки","social":"Социальные сети","telecom":"Телеком","transport":"Транспорт","pro":"Работа","tech":"Технологии","clouds":"Облака и хранилища","finance":"Работа и финансы"},"loading":{"initial":"Загрузка аккаунтов...","working":"Загрузка"},"validation":{"exact_length":"Должно содержать ровно %{length} символов.","max_length":"Максимальная длина — %{length} символов.","min_length":"Должно содержать не менее %{length} символов.","pattern":"Значение должно соответствовать шаблону: %{pattern}"},"update":{"title":"Доступно обновление для этого сервиса.","regular":"Выполните это обновление, чтобы продолжать загружать данные и получать новые функции.","blocking":"Установите обновление, чтобы продолжать загружать данные.","CTA":"Обновить"},"error":{"initial":"Что-то пошло не так при загрузке ваших коннекторов и информации. Пожалуйста, обновите страницу.","LOGIN_FAILED":"Неверные данные. Проверьте поля коннектора и запустите подключение снова.","UNKNOWN_ERROR":"При подключении коннектора произошла непредвиденная ошибка.","JOB_TIMEOUT":"Подключение коннектора заняло слишком много времени.","button":{"reload":"Обновить сейчас"}},"move_modal":{"title":"Перемещение завершено","text":"Перемещение ваших данных из %{from} прошло успешно.","button":"Перейти в мой Cozy"},"maintenance":{"icon":"Этот коннектор на обслуживании","service":"Сервис прерван","problem":"%{konnectorName} не позволяет Cozy получить доступ к вашим данным.","title":"Что происходит?"},"connector":{"title":"Мои подключённые сервисы","mute":"Отключить уведомления об ошибках","debug":{"successMessage":"Этот коннектор предназначен исключительно для отладки, данное сообщение об успехе является дополнительным."},"empty":{"title":"Начните собирать свои данные!","text":"Синхронизируйте ваши сервисы с Cozy, чтобы автоматически получать данные (счета, возмещения, расходы…)"},"silenced":"%{name} больше не будет предлагаться. Вы всегда можете найти поставщика, нажав кнопку \'Добавить\'.","noAccount":"Нет аккаунта","add":"Добавить сервис","update":"Доступно обновление","logo":{"alt":"Логотип %{name}"},"enedis":{"description":{"service":"Получайте данные Linky, подключив ваш аккаунт Enedis. У вас должен быть счётчик Linky, и вы должны сначала создать аккаунт Enedis (на сайте Enedis). Этот коннектор предоставлен Fing для проекта MesInfos. Он загружает данные вашего контракта на электроэнергию и ваше потребление электроэнергии за предыдущий день. Этот коннектор работает на вашем Cozy, и Fing не будет иметь доступа к этим данным."}},"orange":{"message":{"delay":"После подключения запрос на извлечение ваших данных будет отправлен в информационную систему Orange. Эти данные будут доступны в течение 15 дней. Ваши данные будут обновляться автоматически каждые 15 дней."}},"orangemobile":{"description":{"connector":"В рамках проекта \'MesInfos\' Orange позволяет вам регулярно определять местоположение вашего телефона.\\n\\nДля сбора данных требуется ваше явное согласие\\n\\nЭто согласие может быть отозвано в любое время через этот коннектор.\\n\\nНажав \'Согласен\', вы даёте согласие на сбор местоположения вашего телефона каждые 30 минут. Собираемая информация будет включать:\\n<ul><li>Дату и время определения местоположения.</li><li>Данные о местоположении ближайшей радиовышки на момент сбора.</li></ul>Данные, собранные Orange после вашего согласия, будут доступны только в вашем Cozy, назначенном в рамках проекта «Mes Infos». Они будут добавлены к данным о местоположении, уже хранящимся в журналах вызовов.","service":"Этот коннектор загрузит данные из вашего аккаунта Orange в Cozy. Он автоматически загрузит журналы вызовов с вашего телефона. Эти журналы включают ваш номер телефона, номер вашего собеседника, дату и время вызова, а также данные о местоположении ближайшей радиовышки на момент вызова.\\n\\nВы сможете использовать эти данные в различных приложениях вашего Cozy, например, в \'Mapping My Life\' (скоро в Cozy Store).","field":{"agreement":"Согласны ли вы, чтобы Orange регулярно определял местоположение вашего телефона в рамках проекта «Mes Infos»?"}}},"orangevideos":{"description":{"service":"Этот коннектор загрузит данные из вашего аккаунта Orange в Cozy. Он автоматически загрузит список фильмов, которые вы скачали бесплатно (TV Replay) или платно (VOD) с 01/01/2015 (взрослый контент не включён).\\n\\nВы сможете использовать эти данные в различных приложениях вашего Cozy, например, в \'My Movies Music\' (скоро в Cozy Store)."}},"axabanque102":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo).","connector":"Секретный ответ запрашивается HSBC при входе без двухфакторной аутентификации. Пример: как зовут вашего питомца?"}},"ingdirect95":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"Подключение к вашему банку осуществляется и защищается нашим партнёром: Linxo. [Подробнее] (https://support.cozy.io/article/147-linxo)."}}},"shortcut":{"edit":"Изменить ярлык","delete":"Удалить"},"Queue":{"header":"Синхронизация аккаунтов:","header_mobile":"%{done} из %{total}","header_done":"Синхронизировано %{done} из %{total}","item":{"pending":"В ожидании"},"close":"Закрыть"},"services":{"title":"Мои сервисы"},"status":{"interrupted":"СЕРВИС ПРЕРВАН","edf":{"maintenance":"Информационная система EDF изменилась, и доступ к данным больше не работает. Этот коннектор сейчас не может получить ваши данные из EDF. Мы пытаемся восстановить работу и сообщим вам, когда проблема будет решена. Подробнее","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"MMM dd"}}},"defaultRedirection":{"snackbar":{"description":"Установить эту страницу как домашний экран мобильного приложения?","refuse":"Нет, спасибо","accept":"ОК"}},"backup":{"backupInProgress":"Резервное копирование выполняется","confirmStopBackupModal":{"title":"Остановить резервное копирование?","description":"Резервное копирование ещё не завершено — вы действительно хотите остановить его? Фото, которые уже были сохранены, останутся в вашем Cozy, и вы сможете возобновить резервное копирование позже.","cancel":"Отмена","stop":"Остановить"},"appHighlightAlert":{"description":"Безопасно храните свои фото в Cozy, чтобы защитить их от потери или кражи!"}},"appHighlightAlert":{"geolocationTracking":{"defaultDescription":"Отслеживайте ваши поездки и углеродный след с CO2 Coach","bikegoalSourceEmployerDescription":"%{sourceType} %{sourceName} приглашает вас принять участие в улучшении региона и воспользоваться \'велопремией\', это приложение поможет вам измерить прогресс и многое другое!","bikegoalSourceDefaultDescription":"%{sourceType} %{sourceName} приглашает вас внести свой вклад в улучшение региона. Сохраняйте и анализируйте свои поездки!"}},"sections":{"label_compact":"Компактная мозаика","label_detailed":"Подробный список","label_grouped":"Сгруппировано в папке"},"AnnouncementsDialogContent":{"dateFormat":"LL/dd/yyyy","skip":"Понятно"}}')

}),
"./src/locales/vi.json": (function (module) {
"use strict";
module.exports = JSON.parse('{"app":{"logo":{"alt":"Logo %{name}"}},"date":{"format":"dd/MM/yyyy","placeholder":"dd/mm/yyyy"},"manifest":{"name":"Trang chủ","short_description":"Cozy Home là ứng dụng giúp bạn tập hợp tất cả dữ liệu cá nhân của mình bên trong Cozy.","long_description":"Với Cozy Home, bạn có thể dễ dàng:\\n * Tải xuống tài liệu từ tất cả nhà cung cấp của bạn\\n * Thiết lập tần suất Cozy sẽ thu thập hóa đơn của bạn\\n * Truy cập trực tiếp vào các tài liệu được thu thập bởi Cozy của bạn","changes":"Bạn đã không bỏ lỡ, Cửa hàng đã có mặt trong Cozy của bạn!\\nChúng tôi đã tận dụng cơ hội để cải thiện Thu thập:\\n * Thích ứng với Cửa hàng.\\n * Hợp nhất ô: khi bạn có nhiều tài khoản cho một nhà cung cấp, các tài khoản trước đó hiện được hợp nhất dưới ô nhà cung cấp.\\n * Cải thiện một số trang Connectors."},"add_service":"Thêm","fix_konnector_error":"Sửa ngay","logout":"Đăng xuất","logout_dialog":{"title":"Đăng xuất","content":"Bạn có chắc chắn muốn đăng xuất khỏi Cozy của mình không?","cancel":"Hủy","confirm":"Đăng xuất"},"help":"Trợ giúp","help_link":"https://help.cozy.io/","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Tùy chọn)","title":"Kết nối tài khoản %{name} của bạn","data":{"title":"Dữ liệu được thu thập:","service":{"description":"Mô tả dịch vụ:"}},"tabs":{"sync":"đồng bộ hóa","account":"tài khoản","data":"dữ liệu được thu thập"}},"disconnect":{"title":"Ngắt kết nối","description":"Bạn sẽ được ngắt kết nối khỏi tài khoản này, nhưng dữ liệu đã nhập sẽ được giữ lại"},"form":{"title":"Tài khoản","label":{"firstname":"Tên","lastname":"Họ","login":"Đăng nhập","consumerKey":"Consumer Key","consumerSecret":"Consumer Secret","appKey":"Application Key","appSecret":"Application Secret","tricountUrl":"Tricount URL","cardNumber":"Số thẻ","dob":"Ngày sinh","password":"Mật khẩu","email":"Email","bank_identifier":"Mã định danh ngân hàng (tùy chọn)","profileName":"Tên hồ sơ","identifier":"Mã định danh","new_identifier":"Mã định danh","secret":"Mật khẩu","answer":"Câu trả lời bí mật","access_token":"Access token","accessTokenSecret":"Access token secret","apikey":"Api key","phoneNumber":"Số điện thoại","folderPath":"Đường dẫn thư mục","namePath":"Tên thư mục","authCode":"Mã xác thực","accountName":"Tên tài khoản","loginUrl":"URL đăng nhập","token":"Token","agreement":"Tôi đồng ý","refreshToken":"Refresh Token","timeout":"Độ trễ (ms)","branchName":"Chi nhánh","code":"Mã bí mật"},"placeholder":{"password":"Mật khẩu bạn sử dụng để kết nối với dịch vụ","update_password":"Cập nhật mật khẩu","accountName":"Ví dụ: Tài khoản cá nhân","namePath":"Ví dụ: Hóa đơn của Camille. Tên đường dẫn mặc định là tên đăng nhập của bạn."},"button":{"connect":"Kết nối","cancel":"Hủy","save":"Lưu","disconnect":"Ngắt kết nối tài khoản này","delete":"Xóa tài khoản này","advanced":"Tùy chọn nâng cao","synchronize":"Đồng bộ hóa ngay"}},"folder":{"title":"Cài đặt thư mục liên quan","withoutSettings":{"title":"Thư mục liên quan"},"link":"Mở thư mục trong Cozy Drive","changePath":"thay đổi đường dẫn","error":"Ối, có gì đó đã xảy ra sai sót. Đừng hoảng sợ, các tệp của bạn vẫn ở đó, vui lòng thử lại sau","close":"đóng","warning":"Bạn đang thay đổi đường dẫn thư mục của mình","oldFiles":"Tất cả hóa đơn cũ của bạn sẽ được chuyển đến đường dẫn mới của bạn.","newFiles":"Các hóa đơn mới của bạn sẽ được tải xuống trong đường dẫn mới của bạn.","newPath":"Mọi thứ đã diễn ra tốt đẹp, đường dẫn mới cho tài khoản %{name} của bạn là:","placeholder":{"administrative":"Hành chính","photos":"Ảnh"}},"success":{"title":{"connect":"Cấu hình thành công!","update":"Tài khoản %{name} của bạn đã được cập nhật!"},"banksLinkText":"Xem tài khoản của tôi trong %{appName}","driveLinkText":"Mở thư mục trong Cozy Drive","button":"Đóng"},"message":{"folder":{"title":"Thư mục","link":"Mở thư mục trên cozy drive"},"success":{"connect":"Dữ liệu của bạn sẽ có sẵn trong Cozy của bạn trong vài phút và những dữ liệu tiếp theo sẽ theo một cách tự động.","update":"Tài khoản %{name} của bạn đã được cập nhật thành công.","delete":"Tài khoản đã được xóa thành công."},"syncing":{"bill":"Hóa đơn của bạn đang đồng bộ hóa và sẽ có sẵn trong đường dẫn sau:"},"synced":{"title":"Đồng bộ hóa dữ liệu của bạn","cron":"Tần suất đồng bộ hóa: %{frequency}","cron_hourly":"mỗi giờ","cron_daily":"một lần mỗi ngày","cron_weekly":"một lần mỗi tuần","cron_monthly":"một lần mỗi tháng","cron_undefined":"thủ công","syncing":"đang chạy…","unknown":"không xác định","last_sync":"Đồng bộ hóa lần cuối: **%{date}**","date_format":"dd/MM/yyyy [lúc] HH[:]mm","bill":"Tìm dữ liệu của bạn trong ứng dụng Drive tại vị trí này:"},"error":{"server":"Xin lỗi, máy chủ của chúng tôi đã gặp sự cố, bạn có phiền bắt đầu lại không?","bad_credentials":"Xin lỗi, bạn đã nhập sai tên đăng nhập hoặc mật khẩu.","delete":"Xin lỗi, máy chủ của chúng tôi đã gặp sự cố, bạn có phiền bắt đầu lại không?"}},"forceConnection":"Chạy lại ngay bây giờ","editor_detail":"Dịch vụ được phát triển bởi %{editor}"},"account_picker":{"add_account_button":{"label":"Thêm tài khoản"}},"apps":{"title":"Ứng dụng của tôi","installing":"Đang cài đặt…"},"connection":{"CTA":{"twofa_failed":"Chạy lại ngay bây giờ"},"error":{"default":{"title":"Đã xảy ra lỗi","description":"Thật không may, đã xảy ra sự cố khi cố gắng kết nối với %{name}. Vui lòng kiểm tra lại thông tin tài khoản của bạn, truy cập trợ giúp trực tuyến của chúng tôi hoặc liên hệ với chúng tôi tại contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Dung lượng lưu trữ Cozy đã đầy","description":"Dịch vụ này không thể tìm nạp tài liệu của bạn ngay bây giờ. Vui lòng xóa một số tệp hoặc đi đến **Cài đặt > Lưu trữ** để có thêm không gian trống."},"CHALLENGE_ASKED":{"title":"Yêu cầu thách thức","description":"Có vẻ như trang web yêu cầu yếu tố xác thực thứ hai mà chúng tôi chưa hỗ trợ. Bạn có thể thử giải quyết vấn đề trên trang web [%{name}](%{link}) trước khi thử lại."},"LOGIN_FAILED":{"title":"Thông tin đăng nhập sai","description":"Thông tin đăng nhập sai. Kiểm tra các trường konnector và chạy kết nối lại."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Cần mật khẩu bí mật","description":"Một trường bổ sung phải được điền trước khi kiểm tra thông tin đăng nhập của bạn."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Tạm thời bị chặn","description":"Đã có quá nhiều lần thử. Vui lòng cập nhật thông tin đăng nhập của bạn trên trang web [%{name}](%{link}) và cập nhật konnector sau."},"MAINTENANCE":{"title":"Trang web không khả dụng","description":"Có vẻ như trang web [%{name}](%{link}) không khả dụng hoặc konnector phải được cập nhật. Vui lòng chạy lại connector sau hoặc truy cập trợ giúp trực tuyến của chúng tôi."},"NOT_EXISTING_DIRECTORY":{"title":"Thiếu thư mục đích","description":"Có vẻ như thư mục đích của tài khoản này đã bị xóa. Vui lòng khôi phục nó bằng cách ngắt kết nối tài khoản này và sau đó kết nối lại."},"UNKNOWN_ERROR":{"title":"Lỗi kết nối","description":"Đã xảy ra lỗi không xác định."},"USER_ACTION_NEEDED":{"title":"Cần hành động trên nhà cung cấp","description":"Có vẻ như trang web [%{name}](%{link}) yêu cầu bạn đăng nhập và thực hiện một hành động cụ thể. Vui lòng chạy lại connector sau khi bạn đã giải quyết vấn đề trên trang web."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Yêu cầu làm mới quyền truy cập","description":"Dịch vụ [%{name}](%{link}) yêu cầu bạn cho phép quyền truy cập của mình một lần nữa. Vui lòng ngắt kết nối và kết nối lại tài khoản %{name} của bạn với ứng dụng này. Không có dữ liệu nào sẽ bị mất."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Tài khoản không khả dụng","description":"Có vẻ như tài khoản của bạn không còn hoạt động. Vui lòng kiểm tra tài khoản của bạn trên [%{name}](%{link}) trước khi thử lại."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Yêu cầu cập nhật mật khẩu","description":"Có vẻ như trang web [%{name}](%{link}) yêu cầu bạn đăng nhập và cập nhật mật khẩu của mình. Vui lòng chạy lại connector sau khi bạn đã giải quyết vấn đề trên trang web."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Cần xác thực quyền mới","description":"Connector của bạn đã được cập nhật và quyền đã thay đổi. Vui lòng xác thực chúng trước khi khởi chạy connector lại."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Khởi chạy lại kết nối với dịch vụ để lấy dữ liệu của bạn","description":"Kết nối cuối cùng với dịch vụ đã thất bại; vui lòng khởi chạy lại. Bạn có thể phải cung cấp mã xác thực."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Mã xác thực hai yếu tố sai được cung cấp","description":"Mã xác thực hai yếu tố được cung cấp là sai, vui lòng bắt đầu lại."},"VENDOR_DOWN":{"title":"Dịch vụ không khả dụng","description":"Có vẻ như dịch vụ [%{name}](%{link}) không khả dụng vào lúc này. Vui lòng chạy lại connector sau."},"VENDOR_DOWN.BANK_DOWN":{"title":"Trang web không khả dụng","description":"Có vẻ như trang web [%{name}](%{link}) không khả dụng vào lúc này. Vui lòng chạy lại connector sau."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Dịch vụ không khả dụng","description":"Có vẻ như chúng tôi đang gặp quá tải với các konnector ngân hàng của chúng tôi vào lúc này. Vui lòng chạy lại connector sau."}}},"intent":{"konnector":{"install":{"error":{"message":"Konnector không thể được cài đặt"}}},"service":{"return":"Quay lại danh sách connectors","success":{"button":{"label":"Đóng"}},"error":{"initialization":"Dịch vụ không thể khởi tạo. Xin lỗi vì sự bất tiện.","creation":"Không thể tạo tài khoản, đã xảy ra lỗi.","cause":"Nguyên nhân: %{error}"},"cancel":"Hủy","terminate":"Kết thúc"}},"field":{"password":{"visibility":{"hide":"Ẩn","show":"Hiện","title":{"hide":"Ẩn mật khẩu","show":"Hiện mật khẩu"}}}},"nav":{"services":"Dịch vụ của tôi"},"category":{"all":"Tất cả danh mục","konnectors":"Dịch vụ","banking":"Ngân hàng","cozy":"Những điều cần thiết","education":"Giáo dục","energy":"Năng lượng","health":"Sức khỏe","host_provider":"Máy chủ","insurance":"Bảo hiểm","isp":"Di động và Internet","online_services":"Dịch vụ trực tuyến","others":"Khác","mes_infos":"Thử nghiệm MesInfos","partners":"Đối tác","productivity":"Năng suất","press":"Báo chí","ptnb":"Thử nghiệm PTNB","public_service":"Dịch vụ công","shopping":"Mua sắm","social":"Xã hội","telecom":"Viễn thông","transport":"Vận tải","pro":"Công việc","tech":"Công nghệ","clouds":"Đám mây & kho lưu trữ","finance":"Việc làm & tài chính"},"loading":{"initial":"Đang tải tài khoản...","working":"Đang tải"},"validation":{"exact_length":"Nó phải được tạo thành từ chính xác %{length} ký tự.","max_length":"Độ dài tối đa là %{length} ký tự.","min_length":"Nó phải chứa ít nhất %{length} ký tự.","pattern":"Giá trị phải khớp với một mẫu cụ thể: %{pattern}"},"update":{"title":"Có bản cập nhật cho dịch vụ này.","regular":"Thực hiện bản cập nhật này để tiếp tục lấy dữ liệu của bạn và có các tính năng mới nhất","blocking":"Cập nhật nó để tiếp tục lấy dữ liệu của bạn","CTA":"Cập nhật"},"error":{"initial":"Đã xảy ra sự cố khi tìm nạp connectors và thông tin của bạn. Vui lòng làm mới trang.","LOGIN_FAILED":"Thông tin đăng nhập sai. Kiểm tra các trường konnector và chạy kết nối lại.","UNKNOWN_ERROR":"Đã xảy ra điều gì đó bất ngờ khi chạy connector","JOB_TIMEOUT":"Việc thực thi connector quá lâu","button":{"reload":"Làm mới ngay"}},"move_modal":{"title":"Di chuyển hoàn tất","text":"Việc di chuyển dữ liệu của bạn từ %{from} đã thành công.","button":"Truy cập Cozy của tôi"},"maintenance":{"icon":"Connector này đang được bảo trì","service":"Dịch vụ bị gián đoạn","problem":"%{konnectorName} không cho phép Cozy của bạn truy cập dữ liệu của bạn","title":"Chuyện gì đang xảy ra?"},"connector":{"title":"Dịch vụ đã kết nối của tôi","mute":"Tắt tiếng lỗi","debug":{"successMessage":"Konnector này chỉ dành cho mục đích gỡ lỗi, đây là thông báo thành công tùy chỉnh bổ sung."},"empty":{"title":"Bắt đầu thu thập dữ liệu của bạn!","text":"Đồng bộ hóa các thương hiệu của bạn với Cozy để tự động truy xuất dữ liệu của bạn (hóa đơn, hoàn tiền, chi phí…)"},"silenced":"%{name} sẽ không được đề xuất nữa. Bạn luôn có thể tìm thấy nhà cung cấp bằng cách nhấp vào nút \\"Thêm\\".","noAccount":"Không có tài khoản","add":"Thêm dịch vụ","update":"Có bản cập nhật","logo":{"alt":"Logo %{name}"},"enedis":{"description":{"service":"Phục hồi dữ liệu Linky của bạn bằng cách kết nối tài khoản Enedis của bạn. Bạn phải có đồng hồ đo Linky và trước tiên phải tạo tài khoản Enedis của mình (trên [trang web Enedis](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Connector này được cung cấp bởi Fing cho dự án MesInfos. Nó truy xuất dữ liệu từ hợp đồng điện của bạn và tải xuống mức tiêu thụ điện của bạn ngày hôm trước. Connector này đang chạy trên Cozy của bạn và Fing sẽ không có quyền truy cập vào dữ liệu này."}},"orange":{"message":{"delay":"Sau khi kết nối, một yêu cầu trích xuất dữ liệu của bạn sẽ được gửi đến hệ thống thông tin Orange. Những dữ liệu này sẽ có sẵn trong vòng 15 ngày. Dữ liệu của bạn sẽ được cập nhật tự động, mỗi 15 ngày."}},"orangemobile":{"description":{"connector":"Trong bối cảnh \'MesInfos\', Orange cho phép bạn định vị điện thoại của mình thường xuyên.\\n\\n**Thu thập dữ liệu cần sự đồng ý rõ ràng của bạn**\\n\\nSự đồng ý này có thể được thu hồi bất cứ lúc nào bởi connector dữ liệu này.\\n\\nBằng cách nhấp vào \\"Đồng ý\\", bạn đồng ý thu thập vị trí điện thoại của mình, mỗi 30 phút. Thông tin thu thập sẽ chỉ là: \\n<ul><li>Ngày và giờ của vị trí này.</li><li>Dữ liệu vị trí của anten radio gần nhất tại thời điểm thu thập.</li></ul>Dữ liệu được Orange thu thập sau khi bạn đồng ý sẽ chỉ có sẵn trong Cozy mà bạn đã được chỉ định trong bối cảnh « Mes Infos ». Chúng sẽ được thêm vào dữ liệu vị trí đã được lưu trữ trong nhật ký cuộc gọi.","service":"Connector này sẽ tải xuống dữ liệu từ tài khoản Orange của bạn trên Cozy của bạn. Nó sẽ tự động tải xuống nhật ký cuộc gọi từ điện thoại của bạn. Do đó nhật ký cuộc gọi bao gồm số điện thoại của bạn, số điện thoại tương ứng của bạn, ngày và giờ của cuộc gọi này và dữ liệu vị trí của anten radio gần nhất tại thời điểm thu thập.\\n\\nBạn sẽ có thể sử dụng những dữ liệu này trong các ứng dụng khác nhau trong Cozy của mình, ví dụ \\"Mapping My Life\\" (sẽ có sẵn sớm trên Cozy Store).","field":{"agreement":"Bạn có đồng ý để Orange định vị thường xuyên điện thoại của bạn trong bối cảnh « Mes Infos » không?"}}},"orangevideos":{"description":{"service":"Connector này sẽ tải xuống dữ liệu từ tài khoản Orange của bạn trên Cozy của bạn. Nó sẽ tự động tải xuống danh sách các bộ phim bạn đã tải xuống miễn phí (TV Replay) hoặc VOD trả phí từ 01/01/2015 (nội dung người lớn không được bao gồm).\\n\\nBạn sẽ có thể sử dụng những dữ liệu này trong các ứng dụng khác nhau trong Cozy của mình, ví dụ \\"My Movies Music\\" (sẽ có sẵn sớm trên Cozy Store)."}},"axabanque102":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo).","connector":"Câu trả lời bí mật được [HSBC yêu cầu](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) khi bạn kết nối mà không có xác thực kép. Ví dụ: tên của thú cưng của bạn là gì?"}},"ingdirect95":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"Kết nối với ngân hàng của bạn được vận hành và bảo mật bởi đối tác của chúng tôi: Linxo. [Tìm hiểu thêm](https://support.cozy.io/article/147-linxo)."}}},"shortcut":{"edit":"Chỉnh sửa lối tắt","delete":"Xóa"},"Queue":{"header":"Đang đồng bộ tài khoản:","header_mobile":"%{done} trên %{total}","header_done":"Đã đồng bộ %{done} trên %{total}","item":{"pending":"Đang chờ"},"close":"Đóng"},"services":{"title":"Dịch vụ của tôi"},"status":{"interrupted":"DỊCH VỤ BỊ GIÁN ĐOẠN","edf":{"maintenance":"Hệ thống thông tin của EDF đã thay đổi và quyền truy cập dữ liệu liên quan không hoạt động nữa. Konnector này hiện không thể lấy lại dữ liệu của bạn từ EDF. Chúng tôi đang cố gắng khôi phục tình hình và sẽ thông báo cho bạn khi nó được sửa chữa. [Tìm hiểu thêm](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"dd MMM"}}},"defaultRedirection":{"snackbar":{"description":"Đặt trang này làm màn hình chính của ứng dụng di động của bạn?","refuse":"Không, cảm ơn","accept":"OK"}},"backup":{"backupInProgress":"Đang sao lưu","confirmStopBackupModal":{"title":"Dừng sao lưu?","description":"Bản sao lưu của bạn chưa hoàn tất - bạn có thực sự muốn dừng nó không? Những ảnh đã được lưu sẽ vẫn còn trong Cozy của bạn, và bạn có thể tiếp tục sao lưu vào lúc khác.","cancel":"Hủy","stop":"Dừng"},"appHighlightAlert":{"description":"Lưu ảnh của bạn một cách an toàn trong Cozy để bảo vệ chúng khỏi bị mất hoặc trộm!"}},"appHighlightAlert":{"geolocationTracking":{"defaultDescription":"Theo dõi hành trình và dấu chân carbon của bạn với CO2 Coach","bikegoalSourceEmployerDescription":"%{sourceType} %{sourceName} của bạn mời bạn tham gia cải thiện khu vực và hưởng lợi từ \\"prime vélo\\", ứng dụng này sẽ giúp bạn đo lường tiến trình của nó, và nhiều hơn nữa!","bikegoalSourceDefaultDescription":"%{sourceType} %{sourceName} của bạn mời bạn đóng góp vào việc cải thiện khu vực. Lưu và phân tích các hành trình của bạn!"}},"sections":{"label_compact":"Ghép nối Compact","label_detailed":"Danh sách Chi tiết","label_grouped":"Nhóm trong Thư mục"},"AnnouncementsDialogContent":{"dateFormat":"dd/MM/yyyy","skip":"Đã hiểu"}}')

}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
if (cachedModule.error !== undefined) throw cachedModule.error;
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
id: moduleId,
loaded: false,
exports: {}
});
// Execute the module function
try {

var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
module = execOptions.module;
if (!execOptions.factory) {
  console.error("undefined factory", moduleId);
  throw Error("RuntimeError: factory is undefined (" + moduleId + ")");
}
execOptions.factory.call(module.exports, module, module.exports, execOptions.require);

} catch (e) {
module.error = e;
throw e;
}
// Flag the module as loaded
module.loaded = true;
// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

// expose the module cache
__webpack_require__.c = __webpack_module_cache__;

// expose the module execution interceptor
__webpack_require__.i = [];

/************************************************************************/
// webpack/runtime/compat_get_default_export
(() => {
// getDefaultExport function for compatibility with non-ESM modules
__webpack_require__.n = (module) => {
	var getter = module && module.__esModule ?
		() => (module['default']) :
		() => (module);
	__webpack_require__.d(getter, { a: getter });
	return getter;
};

})();
// webpack/runtime/create_fake_namespace_object
(() => {
var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
var leafPrototypes;
// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 16: return value when it's Promise-like
// mode & 8|1: behave like require
__webpack_require__.t = function(value, mode) {
	if(mode & 1) value = this(value);
	if(mode & 8) return value;
	if(typeof value === 'object' && value) {
		if((mode & 4) && value.__esModule) return value;
		if((mode & 16) && typeof value.then === 'function') return value;
	}
	var ns = Object.create(null);
  __webpack_require__.r(ns);
	var def = {};
	leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
	for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
		Object.getOwnPropertyNames(current).forEach((key) => { def[key] = () => (value[key]) });
	}
	def['default'] = () => (value);
	__webpack_require__.d(ns, def);
	return ns;
};
})();
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/esm_module_decorator
(() => {
__webpack_require__.hmd = (module) => {
  module = Object.create(module);
  if (!module.children) module.children = [];
  Object.defineProperty(module, 'exports', {
      enumerable: true,
      set: () => {
          throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
      }
  });
  return module;
};
})();
// webpack/runtime/get mini-css chunk filename
(() => {
// This function allow to reference chunks
__webpack_require__.miniCssF = (chunkId) => {
  // return url for filenames not based on template
  
  // return url for filenames based on template
  return "static/css/" + chunkId + ".css"
}
})();
// webpack/runtime/get_chunk_update_filename
(() => {
__webpack_require__.hu = (chunkId) => ('' + chunkId + '.' + __webpack_require__.h() + '.hot-update.js')
})();
// webpack/runtime/get_full_hash
(() => {
__webpack_require__.h = () => ("6da7adb7d75b9cd3")
})();
// webpack/runtime/get_main_filename/update manifest
(() => {
__webpack_require__.hmrF = function () {
            return "intents." + __webpack_require__.h() + ".hot-update.json";
         };
        
})();
// webpack/runtime/global
(() => {
__webpack_require__.g = (() => {
	if (typeof globalThis === 'object') return globalThis;
	try {
		return this || new Function('return this')();
	} catch (e) {
		if (typeof window === 'object') return window;
	}
})();
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/hot_module_replacement
(() => {
var currentModuleData = {};
var installedModules = __webpack_require__.c;

// module and require creation
var currentChildModule;
var currentParents = [];

// status
var registeredStatusHandlers = [];
var currentStatus = "idle";

// while downloading
var blockingPromises = 0;
var blockingPromisesWaiting = [];

// The update info
var currentUpdateApplyHandlers;
var queuedInvalidatedModules;

__webpack_require__.hmrD = currentModuleData;
__webpack_require__.i.push(function (options) {
	var module = options.module;
	var require = createRequire(options.require, options.id);
	module.hot = createModuleHotObject(options.id, module);
	module.parents = currentParents;
	module.children = [];
	currentParents = [];
	options.require = require;
});

__webpack_require__.hmrC = {};
__webpack_require__.hmrI = {};

function createRequire(require, moduleId) {
	var me = installedModules[moduleId];
	if (!me) return require;
	var fn = function (request) {
		if (me.hot.active) {
			if (installedModules[request]) {
				var parents = installedModules[request].parents;
				if (parents.indexOf(moduleId) === -1) {
					parents.push(moduleId);
				}
			} else {
				currentParents = [moduleId];
				currentChildModule = request;
			}
			if (me.children.indexOf(request) === -1) {
				me.children.push(request);
			}
		} else {
			console.warn(
				"[HMR] unexpected require(" +
				request +
				") from disposed module " +
				moduleId
			);
			currentParents = [];
		}
		return require(request);
	};
	var createPropertyDescriptor = function (name) {
		return {
			configurable: true,
			enumerable: true,
			get: function () {
				return require[name];
			},
			set: function (value) {
				require[name] = value;
			}
		};
	};
	for (var name in require) {
		if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
			Object.defineProperty(fn, name, createPropertyDescriptor(name));
		}
	}

	fn.e = function (chunkId, fetchPriority) {
		return trackBlockingPromise(require.e(chunkId, fetchPriority));
	};

	return fn;
}

function createModuleHotObject(moduleId, me) {
	var _main = currentChildModule !== moduleId;
	var hot = {
		_acceptedDependencies: {},
		_acceptedErrorHandlers: {},
		_declinedDependencies: {},
		_selfAccepted: false,
		_selfDeclined: false,
		_selfInvalidated: false,
		_disposeHandlers: [],
		_main: _main,
		_requireSelf: function () {
			currentParents = me.parents.slice();
			currentChildModule = _main ? undefined : moduleId;
			__webpack_require__(moduleId);
		},
		active: true,
		accept: function (dep, callback, errorHandler) {
			if (dep === undefined) hot._selfAccepted = true;
			else if (typeof dep === "function") hot._selfAccepted = dep;
			else if (typeof dep === "object" && dep !== null) {
				for (var i = 0; i < dep.length; i++) {
					hot._acceptedDependencies[dep[i]] = callback || function () { };
					hot._acceptedErrorHandlers[dep[i]] = errorHandler;
				}
			} else {
				hot._acceptedDependencies[dep] = callback || function () { };
				hot._acceptedErrorHandlers[dep] = errorHandler;
			}
		},
		decline: function (dep) {
			if (dep === undefined) hot._selfDeclined = true;
			else if (typeof dep === "object" && dep !== null)
				for (var i = 0; i < dep.length; i++)
					hot._declinedDependencies[dep[i]] = true;
			else hot._declinedDependencies[dep] = true;
		},
		dispose: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		addDisposeHandler: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		removeDisposeHandler: function (callback) {
			var idx = hot._disposeHandlers.indexOf(callback);
			if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
		},
		invalidate: function () {
			this._selfInvalidated = true;
			switch (currentStatus) {
				case "idle":
					currentUpdateApplyHandlers = [];
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					setStatus("ready");
					break;
				case "ready":
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					break;
				case "prepare":
				case "check":
				case "dispose":
				case "apply":
					(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
						moduleId
					);
					break;
				default:
					break;
			}
		},
		check: hotCheck,
		apply: hotApply,
		status: function (l) {
			if (!l) return currentStatus;
			registeredStatusHandlers.push(l);
		},
		addStatusHandler: function (l) {
			registeredStatusHandlers.push(l);
		},
		removeStatusHandler: function (l) {
			var idx = registeredStatusHandlers.indexOf(l);
			if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
		},
		data: currentModuleData[moduleId]
	};
	currentChildModule = undefined;
	return hot;
}

function setStatus(newStatus) {
	currentStatus = newStatus; 
	var results = [];
	for (var i = 0; i < registeredStatusHandlers.length; i++)
		results[i] = registeredStatusHandlers[i].call(null, newStatus);

	return Promise.all(results).then(function () { });
}

function unblock() {
	if (--blockingPromises === 0) {
		setStatus("ready").then(function () {
			if (blockingPromises === 0) {
				var list = blockingPromisesWaiting;
				blockingPromisesWaiting = [];
				for (var i = 0; i < list.length; i++) {
					list[i]();
				}
			}
		});
	}
}

function trackBlockingPromise(promise) {
	switch (currentStatus) {
		case "ready":
			setStatus("prepare");
		case "prepare":
			blockingPromises++;
			promise.then(unblock, unblock);
			return promise;
		default:
			return promise;
	}
}

function waitForBlockingPromises(fn) {
	if (blockingPromises === 0) return fn();
	return new Promise(function (resolve) {
		blockingPromisesWaiting.push(function () {
			resolve(fn());
		});
	});
}

function hotCheck(applyOnUpdate) {
	if (currentStatus !== "idle") {
		throw new Error("check() is only allowed in idle status");
	} 
	return setStatus("check")
		.then(__webpack_require__.hmrM)
		.then(function (update) {
			if (!update) {
				return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
					function () {
						return null;
					}
				);
			}

			return setStatus("prepare").then(function () {
				var updatedModules = [];
				currentUpdateApplyHandlers = [];

				return Promise.all(
					Object.keys(__webpack_require__.hmrC).reduce(function (
						promises,
						key
					) {
						__webpack_require__.hmrC[key](
							update.c,
							update.r,
							update.m,
							promises,
							currentUpdateApplyHandlers,
							updatedModules
						);
						return promises;
					},
						[])
				).then(function () {
					return waitForBlockingPromises(function () {
						if (applyOnUpdate) {
							return internalApply(applyOnUpdate);
						}
						return setStatus("ready").then(function () {
							return updatedModules;
						});
					});
				});
			});
		});
}

function hotApply(options) {
	if (currentStatus !== "ready") {
		return Promise.resolve().then(function () {
			throw new Error(
				"apply() is only allowed in ready status (state: " + currentStatus + ")"
			);
		});
	}
	return internalApply(options);
}

function internalApply(options) {
	options = options || {};
	applyInvalidatedModules();
	var results = currentUpdateApplyHandlers.map(function (handler) {
		return handler(options);
	});
	currentUpdateApplyHandlers = undefined;
	var errors = results
		.map(function (r) {
			return r.error;
		})
		.filter(Boolean);

	if (errors.length > 0) {
		return setStatus("abort").then(function () {
			throw errors[0];
		});
	}

	var disposePromise = setStatus("dispose");

	results.forEach(function (result) {
		if (result.dispose) result.dispose();
	});

	var applyPromise = setStatus("apply");

	var error;
	var reportError = function (err) {
		if (!error) error = err;
	};

	var outdatedModules = [];
	results.forEach(function (result) {
		if (result.apply) {
			var modules = result.apply(reportError);
			if (modules) {
				for (var i = 0; i < modules.length; i++) {
					outdatedModules.push(modules[i]);
				}
			}
		}
	});

	return Promise.all([disposePromise, applyPromise]).then(function () {
		if (error) {
			return setStatus("fail").then(function () {
				throw error;
			});
		}

		if (queuedInvalidatedModules) {
			return internalApply(options).then(function (list) {
				outdatedModules.forEach(function (moduleId) {
					if (list.indexOf(moduleId) < 0) list.push(moduleId);
				});
				return list;
			});
		}

		return setStatus("idle").then(function () {
			return outdatedModules;
		});
	});
}

function applyInvalidatedModules() {
	if (queuedInvalidatedModules) {
		if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
		Object.keys(__webpack_require__.hmrI).forEach(function (key) {
			queuedInvalidatedModules.forEach(function (moduleId) {
				__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
			});
		});
		queuedInvalidatedModules = undefined;
		return true;
	}
}

})();
// webpack/runtime/load_script
(() => {
var inProgress = {};

var dataWebpackPrefix = "cozy-home:";
// loadScript function to load a script via script tag
__webpack_require__.l = function (url, done, key, chunkId) {
	if (inProgress[url]) {
		inProgress[url].push(done);
		return;
	}
	var script, needAttach;
	if (key !== undefined) {
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i++) {
			var s = scripts[i];
			if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
				script = s;
				break;
			}
		}
	}
	if (!script) {
		needAttach = true;
		
    script = document.createElement('script');
    
		script.charset = 'utf-8';
		script.timeout = 120;
		if (__webpack_require__.nc) {
			script.setAttribute("nonce", __webpack_require__.nc);
		}
		script.setAttribute("data-webpack", dataWebpackPrefix + key);
		
		script.src = url;
		
    
	}
	inProgress[url] = [done];
	var onScriptComplete = function (prev, event) {
		script.onerror = script.onload = null;
		clearTimeout(timeout);
		var doneFns = inProgress[url];
		delete inProgress[url];
		script.parentNode && script.parentNode.removeChild(script);
		doneFns &&
			doneFns.forEach(function (fn) {
				return fn(event);
			});
		if (prev) return prev(event);
	};
	var timeout = setTimeout(
		onScriptComplete.bind(null, undefined, {
			type: 'timeout',
			target: script
		}),
		120000
	);
	script.onerror = onScriptComplete.bind(null, script.onerror);
	script.onload = onScriptComplete.bind(null, script.onload);
	needAttach && document.head.appendChild(script);
};

})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
// webpack/runtime/node_module_decorator
(() => {
__webpack_require__.nmd = (module) => {
  module.paths = [];
  if (!module.children) module.children = [];
  return module;
};
})();
// webpack/runtime/nonce
(() => {
__webpack_require__.nc = undefined;
})();
// webpack/runtime/on_chunk_loaded
(() => {
var deferred = [];
__webpack_require__.O = (result, chunkIds, fn, priority) => {
	if (chunkIds) {
		priority = priority || 0;
		for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--)
			deferred[i] = deferred[i - 1];
		deferred[i] = [chunkIds, fn, priority];
		return;
	}
	var notFulfilled = Infinity;
	for (var i = 0; i < deferred.length; i++) {
		var [chunkIds, fn, priority] = deferred[i];
		var fulfilled = true;
		for (var j = 0; j < chunkIds.length; j++) {
			if (
				(priority & (1 === 0) || notFulfilled >= priority) &&
				Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))
			) {
				chunkIds.splice(j--, 1);
			} else {
				fulfilled = false;
				if (priority < notFulfilled) notFulfilled = priority;
			}
		}
		if (fulfilled) {
			deferred.splice(i--, 1);
			var r = fn();
			if (r !== undefined) result = r;
		}
	}
	return result;
};

})();
// webpack/runtime/public_path
(() => {
__webpack_require__.p = "/intents/";
})();
// webpack/runtime/css loading
(() => {
if (typeof document === "undefined") return;
var createStylesheet = function (
	chunkId, fullhref, oldTag, resolve, reject
) {
	var linkTag = document.createElement("link");
	
	linkTag.rel = "stylesheet";
	linkTag.type="text/css";
	if (__webpack_require__.nc) {
		linkTag.nonce = __webpack_require__.nc;
	}
	var onLinkComplete = function (event) {
		// avoid mem leaks.
		linkTag.onerror = linkTag.onload = null;
		if (event.type === 'load') {
			resolve();
		} else {
			var errorType = event && (event.type === 'load' ? 'missing' : event.type);
			var realHref = event && event.target && event.target.href || fullhref;
			var err = new Error("Loading CSS chunk " + chunkId + " failed.\\n(" + realHref + ")");
			err.code = "CSS_CHUNK_LOAD_FAILED";
			err.type = errorType;
			err.request = realHref;
			if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
			reject(err);
		}
	}

	linkTag.onerror = linkTag.onload = onLinkComplete;
	linkTag.href = fullhref;
	
	if (oldTag) {
  oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
} else {
  document.head.appendChild(linkTag);
}
	return linkTag;
}
var findStylesheet = function (href, fullhref) {
	var existingLinkTags = document.getElementsByTagName("link");
	for (var i = 0; i < existingLinkTags.length; i++) {
		var tag = existingLinkTags[i];
		var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
		if (dataHref) {
			dataHref = dataHref.split('?')[0]
		}
		if (tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
	}

	var existingStyleTags = document.getElementsByTagName("style");
	for (var i = 0; i < existingStyleTags.length; i++) {
		var tag = existingStyleTags[i];
		var dataHref = tag.getAttribute("data-href");
		if (dataHref === href || dataHref === fullhref) return tag;
	}
}

var loadStylesheet = function (chunkId) {
	return new Promise(function (resolve, reject) {
		var href = __webpack_require__.miniCssF(chunkId);
		var fullhref = __webpack_require__.p + href;
		if (findStylesheet(href, fullhref)) return resolve();
		createStylesheet(chunkId, fullhref, null, resolve, reject);
	})
}

// no chunk loading
var oldTags = [];
var newTags = [];
var applyHandler = function (options) {
	return {
		dispose: function () {
			for (var i = 0; i < oldTags.length; i++) {
				var oldTag = oldTags[i];
				if (oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
			}
			oldTags.length = 0;
		},
		apply: function () {
			for (var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
			newTags.length = 0;
		}
	}
}
__webpack_require__.hmrC.miniCss = function (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
	applyHandlers.push(applyHandler);
	chunkIds.forEach(function (chunkId) {
		var href = __webpack_require__.miniCssF(chunkId);
		var fullhref = __webpack_require__.p + href;
		var oldTag = findStylesheet(href, fullhref);
		if (!oldTag) return;
		promises.push(new Promise(function (resolve, reject) {
			var tag = createStylesheet(
				chunkId,

				/**
					If dynamically add link tag through dom API and there is already a loaded style link, browsers sometimes treats the new link tag as the same link, and won't fetch the new style.
					Use query to avoid browser cache the link tag, force to re-fetch new style, this is the same strategy as updateCss API, this can happen during lazy compilation
				 */
				`${fullhref}?${Date.now()}`,
				oldTag,
				function () {
					tag.as = "style";
					tag.rel = "preload";
					resolve();
				},
				reject
			);
			oldTags.push(oldTag);
			newTags.push(tag);
		}))
	});
}


})();
// webpack/runtime/jsonp_chunk_loading
(() => {

      // object to store loaded and loading chunks
      // undefined = chunk not loaded, null = chunk preloaded/prefetched
      // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
      var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {"intents": 0,};
      var currentUpdatedModulesList;
var waitingUpdateResolves = {};
function loadUpdateChunk(chunkId, updatedModulesList) {
	currentUpdatedModulesList = updatedModulesList;
	return new Promise((resolve, reject) => {
		waitingUpdateResolves[chunkId] = resolve;
		// start update chunk loading
		var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
		// create error before stack unwound to get useful stacktrace later
		var error = new Error();
		var loadingEnded = (event) => {
			if (waitingUpdateResolves[chunkId]) {
				waitingUpdateResolves[chunkId] = undefined;
				var errorType =
					event && (event.type === 'load' ? 'missing' : event.type);
				var realSrc = event && event.target && event.target.src;
				error.message =
					'Loading hot update chunk ' +
					chunkId +
					' failed.\n(' +
					errorType +
					': ' +
					realSrc +
					')';
				error.name = 'ChunkLoadError';
				error.type = errorType;
				error.request = realSrc;
				reject(error);
			}
		};
		__webpack_require__.l(url, loadingEnded);
	});
}

self["webpackHotUpdatecozy_home"] = (chunkId, moreModules, runtime) => {
	for (var moduleId in moreModules) {
		if (__webpack_require__.o(moreModules, moduleId)) {
			currentUpdate[moduleId] = moreModules[moduleId];
			if (currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
		}
	}
	if (runtime) currentUpdateRuntime.push(runtime);
	if (waitingUpdateResolves[chunkId]) {
		waitingUpdateResolves[chunkId]();
		waitingUpdateResolves[chunkId] = undefined;
	}
};
var currentUpdateChunks;
var currentUpdate;
var currentUpdateRemovedChunks;
var currentUpdateRuntime;
function applyHandler(options) {
	if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
	currentUpdateChunks = undefined;
	function getAffectedModuleEffects(updateModuleId) {
		var outdatedModules = [updateModuleId];
		var outdatedDependencies = {};
		var queue = outdatedModules.map(function (id) {
			return {
				chain: [id],
				id: id
			};
		});
		while (queue.length > 0) {
			var queueItem = queue.pop();
			var moduleId = queueItem.id;
			var chain = queueItem.chain;
			var module = __webpack_require__.c[moduleId];
			if (
				!module ||
				(module.hot._selfAccepted && !module.hot._selfInvalidated)
			) {
				continue;
			}

			if (module.hot._selfDeclined) {
				return {
					type: "self-declined",
					chain: chain,
					moduleId: moduleId
				};
			}

			if (module.hot._main) {
				return {
					type: "unaccepted",
					chain: chain,
					moduleId: moduleId
				};
			}

			for (var i = 0; i < module.parents.length; i++) {
				var parentId = module.parents[i];
				var parent = __webpack_require__.c[parentId];
				if (!parent) {
					continue;
				}
				if (parent.hot._declinedDependencies[moduleId]) {
					return {
						type: "declined",
						chain: chain.concat([parentId]),
						moduleId: moduleId,
						parentId: parentId
					};
				}
				if (outdatedModules.indexOf(parentId) !== -1) {
					continue;
				}
				if (parent.hot._acceptedDependencies[moduleId]) {
					if (!outdatedDependencies[parentId]) {
						outdatedDependencies[parentId] = [];
					}
					addAllToSet(outdatedDependencies[parentId], [moduleId]);
					continue;
				}
				delete outdatedDependencies[parentId];
				outdatedModules.push(parentId);
				queue.push({
					chain: chain.concat([parentId]),
					id: parentId
				});
			}
		}

		return {
			type: "accepted",
			moduleId: updateModuleId,
			outdatedModules: outdatedModules,
			outdatedDependencies: outdatedDependencies
		};
	}

	function addAllToSet(a, b) {
		for (var i = 0; i < b.length; i++) {
			var item = b[i];
			if (a.indexOf(item) === -1) a.push(item);
		}
	}

	var outdatedDependencies = {};
	var outdatedModules = [];
	var appliedUpdate = {};

	var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
		console.warn(
			"[HMR] unexpected require(" + module.id + ") to disposed module"
		);
	};

	for (var moduleId in currentUpdate) {
		if (__webpack_require__.o(currentUpdate, moduleId)) {
			var newModuleFactory = currentUpdate[moduleId];
			var result = newModuleFactory ? getAffectedModuleEffects(moduleId) : {
				type: "disposed",
				moduleId: moduleId
			};
			var abortError = false;
			var doApply = false;
			var doDispose = false;
			var chainInfo = "";
			if (result.chain) {
				chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
			}
			switch (result.type) {
				case "self-declined":
					if (options.onDeclined) options.onDeclined(result);
					if (!options.ignoreDeclined)
						abortError = new Error(
							"Aborted because of self decline: " + result.moduleId + chainInfo
						);
					break;
				case "declined":
					if (options.onDeclined) options.onDeclined(result);
					if (!options.ignoreDeclined)
						abortError = new Error(
							"Aborted because of declined dependency: " +
							result.moduleId +
							" in " +
							result.parentId +
							chainInfo
						);
					break;
				case "unaccepted":
					if (options.onUnaccepted) options.onUnaccepted(result);
					if (!options.ignoreUnaccepted)
						abortError = new Error(
							"Aborted because " + moduleId + " is not accepted" + chainInfo
						);
					break;
				case "accepted":
					if (options.onAccepted) options.onAccepted(result);
					doApply = true;
					break;
				case "disposed":
					if (options.onDisposed) options.onDisposed(result);
					doDispose = true;
					break;
				default:
					throw new Error("Unexception type " + result.type);
			}
			if (abortError) {
				return {
					error: abortError
				};
			}
			if (doApply) {
				appliedUpdate[moduleId] = newModuleFactory;
				addAllToSet(outdatedModules, result.outdatedModules);
				for (moduleId in result.outdatedDependencies) {
					if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
						if (!outdatedDependencies[moduleId])
							outdatedDependencies[moduleId] = [];
						addAllToSet(
							outdatedDependencies[moduleId],
							result.outdatedDependencies[moduleId]
						);
					}
				}
			}
			if (doDispose) {
				addAllToSet(outdatedModules, [result.moduleId]);
				appliedUpdate[moduleId] = warnUnexpectedRequire;
			}
		}
	}
	currentUpdate = undefined;

	var outdatedSelfAcceptedModules = [];
	for (var j = 0; j < outdatedModules.length; j++) {
		var outdatedModuleId = outdatedModules[j];
		var module = __webpack_require__.c[outdatedModuleId];
		if (
			module &&
			(module.hot._selfAccepted || module.hot._main) &&
			// removed self-accepted modules should not be required
			appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
			// when called invalidate self-accepting is not possible
			!module.hot._selfInvalidated
		) {
			outdatedSelfAcceptedModules.push({
				module: outdatedModuleId,
				require: module.hot._requireSelf,
				errorHandler: module.hot._selfAccepted
			});
		}
	} 

	var moduleOutdatedDependencies;
	return {
		dispose: function () {
			currentUpdateRemovedChunks.forEach(function (chunkId) {
				delete installedChunks[chunkId];
			});
			currentUpdateRemovedChunks = undefined;

			var idx;
			var queue = outdatedModules.slice();
			while (queue.length > 0) {
				var moduleId = queue.pop();
				var module = __webpack_require__.c[moduleId];
				if (!module) continue;

				var data = {};

				// Call dispose handlers
				var disposeHandlers = module.hot._disposeHandlers; 
				for (j = 0; j < disposeHandlers.length; j++) {
					disposeHandlers[j].call(null, data);
				}
				__webpack_require__.hmrD[moduleId] = data;

				module.hot.active = false;

				delete __webpack_require__.c[moduleId];

				delete outdatedDependencies[moduleId];

				for (j = 0; j < module.children.length; j++) {
					var child = __webpack_require__.c[module.children[j]];
					if (!child) continue;
					idx = child.parents.indexOf(moduleId);
					if (idx >= 0) {
						child.parents.splice(idx, 1);
					}
				}
			}

			var dependency;
			for (var outdatedModuleId in outdatedDependencies) {
				if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
					module = __webpack_require__.c[outdatedModuleId];
					if (module) {
						moduleOutdatedDependencies = outdatedDependencies[outdatedModuleId];
						for (j = 0; j < moduleOutdatedDependencies.length; j++) {
							dependency = moduleOutdatedDependencies[j];
							idx = module.children.indexOf(dependency);
							if (idx >= 0) module.children.splice(idx, 1);
						}
					}
				}
			}
		},
		apply: function (reportError) {
			// insert new code
			for (var updateModuleId in appliedUpdate) {
				if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
					__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId]; 
				}
			}

			// run new runtime modules
			for (var i = 0; i < currentUpdateRuntime.length; i++) {
				currentUpdateRuntime[i](__webpack_require__);
			}

			// call accept handlers
			for (var outdatedModuleId in outdatedDependencies) {
				if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
					var module = __webpack_require__.c[outdatedModuleId];
					if (module) {
						moduleOutdatedDependencies = outdatedDependencies[outdatedModuleId];
						var callbacks = [];
						var errorHandlers = [];
						var dependenciesForCallbacks = [];
						for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
							var dependency = moduleOutdatedDependencies[j];
							var acceptCallback = module.hot._acceptedDependencies[dependency];
							var errorHandler = module.hot._acceptedErrorHandlers[dependency];
							if (acceptCallback) {
								if (callbacks.indexOf(acceptCallback) !== -1) continue;
								callbacks.push(acceptCallback);
								errorHandlers.push(errorHandler); 
								dependenciesForCallbacks.push(dependency);
							}
						}
						for (var k = 0; k < callbacks.length; k++) {
							try {
								callbacks[k].call(null, moduleOutdatedDependencies);
							} catch (err) {
								if (typeof errorHandlers[k] === "function") {
									try {
										errorHandlers[k](err, {
											moduleId: outdatedModuleId,
											dependencyId: dependenciesForCallbacks[k]
										});
									} catch (err2) {
										if (options.onErrored) {
											options.onErrored({
												type: "accept-error-handler-errored",
												moduleId: outdatedModuleId,
												dependencyId: dependenciesForCallbacks[k],
												error: err2,
												originalError: err
											});
										}
										if (!options.ignoreErrored) {
											reportError(err2);
											reportError(err);
										}
									}
								} else {
									if (options.onErrored) {
										options.onErrored({
											type: "accept-errored",
											moduleId: outdatedModuleId,
											dependencyId: dependenciesForCallbacks[k],
											error: err
										});
									}
									if (!options.ignoreErrored) {
										reportError(err);
									}
								}
							}
						}
					}
				}
			}

			// Load self accepted modules
			for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
				var item = outdatedSelfAcceptedModules[o];
				var moduleId = item.module;
				try {
					item.require(moduleId);
				} catch (err) {
					if (typeof item.errorHandler === "function") {
						try {
							item.errorHandler(err, {
								moduleId: moduleId,
								module: __webpack_require__.c[moduleId]
							});
						} catch (err1) {
							if (options.onErrored) {
								options.onErrored({
									type: "self-accept-error-handler-errored",
									moduleId: moduleId,
									error: err1,
									originalError: err
								});
							}
							if (!options.ignoreErrored) {
								reportError(err1);
								reportError(err);
							}
						}
					} else {
						if (options.onErrored) {
							options.onErrored({
								type: "self-accept-errored",
								moduleId: moduleId,
								error: err
							});
						}
						if (!options.ignoreErrored) {
							reportError(err);
						}
					}
				}
			}

			return outdatedModules;
		}
	};
}

__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
	if (!currentUpdate) {
		currentUpdate = {};
		currentUpdateRuntime = [];
		currentUpdateRemovedChunks = [];
		applyHandlers.push(applyHandler);
	}
	if (!__webpack_require__.o(currentUpdate, moduleId)) {
		currentUpdate[moduleId] = __webpack_require__.m[moduleId];
	}
};

__webpack_require__.hmrC.jsonp = function (
	chunkIds,
	removedChunks,
	removedModules,
	promises,
	applyHandlers,
	updatedModulesList
) {
	applyHandlers.push(applyHandler);
	currentUpdateChunks = {};
	currentUpdateRemovedChunks = removedChunks;
	currentUpdate = removedModules.reduce(function (obj, key) {
		obj[key] = false;
		return obj;
	}, {});
	currentUpdateRuntime = [];
	chunkIds.forEach(function (chunkId) {
		if (
			__webpack_require__.o(installedChunks, chunkId) &&
			installedChunks[chunkId] !== undefined
		) {
			promises.push(loadUpdateChunk(chunkId, updatedModulesList));
			currentUpdateChunks[chunkId] = true;
		} else {
			currentUpdateChunks[chunkId] = false;
		}
	});
	if (__webpack_require__.f) {
		__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
			if (
				currentUpdateChunks &&
				__webpack_require__.o(currentUpdateChunks, chunkId) &&
				!currentUpdateChunks[chunkId]
			) {
				promises.push(loadUpdateChunk(chunkId));
				currentUpdateChunks[chunkId] = true;
			}
		};
	}
};
__webpack_require__.hmrM = () => {
	if (typeof fetch === "undefined")
		throw new Error("No browser support: need fetch API");
	return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(
		(response) => {
			if (response.status === 404) return; // no update available
			if (!response.ok)
				throw new Error(
					"Failed to fetch update manifest " + response.statusText
				);
			return response.json();
		}
	);
};
__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
// install a JSONP callback for chunk loading
var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
	var [chunkIds, moreModules, runtime] = data;
	// add "moreModules" to the modules object,
	// then flag all "chunkIds" as loaded and fire callback
	var moduleId, chunkId, i = 0;
	if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
		for (moduleId in moreModules) {
			if (__webpack_require__.o(moreModules, moduleId)) {
				__webpack_require__.m[moduleId] = moreModules[moduleId];
			}
		}
		if (runtime) var result = runtime(__webpack_require__);
	}
	if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
	for (; i < chunkIds.length; i++) {
		chunkId = chunkIds[i];
		if (
			__webpack_require__.o(installedChunks, chunkId) &&
			installedChunks[chunkId]
		) {
			installedChunks[chunkId][0]();
		}
		installedChunks[chunkId] = 0;
	}
	return __webpack_require__.O(result);
};

var chunkLoadingGlobal = self["webpackChunkcozy_home"] = self["webpackChunkcozy_home"] || [];
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));

})();
/************************************************************************/
// module cache are used so entry inlining is disabled
// startup
// Load entry module and return exports
var __webpack_exports__ = __webpack_require__.O(undefined, ["lib-react", "lib-router", "cozy", "vendors-node_modules_babel_runtime_helpers_asyncToGenerator_js-node_modules_babel_runtime_hel-202d45"], function() { return __webpack_require__("./src/targets/intents/index.jsx") });
__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})()
;
//# sourceMappingURL=intents.js.map