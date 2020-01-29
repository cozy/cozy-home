webpackHotUpdate("vendors",{

/***/ "eCGz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var minilog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("i9cR");
/* harmony import */ var minilog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(minilog__WEBPACK_IMPORTED_MODULE_0__);

var inBrowser = typeof window !== 'undefined';
var minilog = inBrowser && window.minilog || minilog__WEBPACK_IMPORTED_MODULE_0___default.a;
var logger = minilog("cozy-harvest-lib");
minilog.enable();
minilog.suggest.deny("cozy-harvest-lib", 'log');
minilog.suggest.deny("cozy-harvest-lib", 'info');
/* harmony default export */ __webpack_exports__["default"] = (logger);

/***/ }),

/***/ "jH4C":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOrUpdateBIConnection", function() { return createOrUpdateBIConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBIAccountCreation", function() { return onBIAccountCreation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "konnectorPolicy", function() { return konnectorPolicy; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Puqe");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("QkVN");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("uM7l");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("la6v");
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_defaults__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jobUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("ahmL");
/* harmony import */ var _biUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("0cZZ");
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("qqS2");
/* harmony import */ var cozy_bi_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("18b5");
/* harmony import */ var cozy_bi_auth__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(cozy_bi_auth__WEBPACK_IMPORTED_MODULE_11__);













var getBIConnectionIdFromAccount = function getBIConnectionIdFromAccount(account) {
  return lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(account, 'data.auth.bi.connId');
};

var throwWrappedError = function throwWrappedError(originalError, namespace) {
  var error = new Error("".concat(namespace, " failed (").concat(originalError.message, ")"));
  error.original = originalError;
  throw error;
};

var createTemporaryToken =
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(_ref) {
    var client, account, konnector, jobResponse, event;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = _ref.client, account = _ref.account, konnector = _ref.konnector;
            _context.prev = 1;
            Object(_assert__WEBPACK_IMPORTED_MODULE_10__["default"])(account && account._id, 'createTemporaryToken: Invalid account for createTemporaryToken');
            Object(_assert__WEBPACK_IMPORTED_MODULE_10__["default"])(konnector.slug, 'createTemporaryToken: No konnector slug');
            _context.next = 6;
            return client.stackClient.jobs.create('konnector', {
              mode: 'getTemporaryToken',
              konnector: konnector.slug,
              account: account._id
            });

          case 6:
            jobResponse = _context.sent;
            _context.next = 9;
            return Object(_jobUtils__WEBPACK_IMPORTED_MODULE_8__["waitForRealtimeResult"])(client, jobResponse.data.attributes);

          case 9:
            event = _context.sent;
            return _context.abrupt("return", event.data.code);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            throwWrappedError(_context.t0, 'createTemporaryToken');

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));

  return function createTemporaryToken(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Ensures a BI connection is ready
 *
 *  - Calls the getBITemporaryToken mode of the konnector
 *
 * Then:
 * If no BI connection is present in the io.cozy.accounts:
 *  - Creates the BI connection using user supplied data
 * If a BI connection exists:
 *  - Updates the BI connection using user supplied data
 *
 * @param  {Client} options.client
 * @param  {io.cozy.accounts} options.account
 * @param  {io.cozy.konnectors} options.konnector
 * @return {BIConnection}
 */


var createOrUpdateBIConnection =
/*#__PURE__*/
function () {
  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(_ref3) {
    var account, client, konnector, mode, config, connId, tempToken, credentials, credsToSend, connection;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            account = _ref3.account, client = _ref3.client, konnector = _ref3.konnector;
            _context2.prev = 1;
            mode = Object(_biUtils__WEBPACK_IMPORTED_MODULE_9__["getBIModeFromCozyURL"])(client.stackClient.uri);
            config = Object(_biUtils__WEBPACK_IMPORTED_MODULE_9__["getBIConfig"])(mode);
            connId = getBIConnectionIdFromAccount(account);
            _context2.next = 7;
            return createTemporaryToken({
              account: account,
              client: client,
              konnector: konnector
            });

          case 7:
            tempToken = _context2.sent;
            Object(_assert__WEBPACK_IMPORTED_MODULE_10__["default"])(tempToken, 'No temporary token');
            credentials = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, account.auth); // The konnector can have "baked-in" parameters that need to be passed in the
            // auth. This is the case for example for some konnectors for the bankId
            // parameter

            lodash_defaults__WEBPACK_IMPORTED_MODULE_7___default()(credentials, konnector.parameters);
            _context2.next = 13;
            return Object(cozy_bi_auth__WEBPACK_IMPORTED_MODULE_11__["mkConnAuth"])(config, credentials);

          case 13:
            credsToSend = _context2.sent;
            _context2.next = 16;
            return connId ? Object(_biUtils__WEBPACK_IMPORTED_MODULE_9__["updateBIConnection"])(config, connId, credsToSend, tempToken) : Object(_biUtils__WEBPACK_IMPORTED_MODULE_9__["createBIConnection"])(config, credsToSend, tempToken);

          case 16:
            connection = _context2.sent;
            return _context2.abrupt("return", connection);

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](1);
            throwWrappedError(_context2.t0, 'createOrUpdateBIConnection');

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 20]]);
  }));

  return function createOrUpdateBIConnection(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var SENSIBLE_FIELDS = ['password', 'secret', 'code', 'dob'];

var removeSensibleDataFromAccount = function removeSensibleDataFromAccount(fullAccount) {
  var account = lodash_clone__WEBPACK_IMPORTED_MODULE_6___default()(fullAccount);
  account.auth = lodash_omit__WEBPACK_IMPORTED_MODULE_4___default()(account.auth, SENSIBLE_FIELDS);
  return account;
};

var onBIAccountCreation =
/*#__PURE__*/
function () {
  var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(_ref5) {
    var account, client, konnector, saveAccount, _ref5$createOrUpdateB, createOrUpdateBIConnectionFn, fullAccount, biConnection;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            account = _ref5.account, client = _ref5.client, konnector = _ref5.konnector, saveAccount = _ref5.saveAccount, _ref5$createOrUpdateB = _ref5.createOrUpdateBIConnectionFn, createOrUpdateBIConnectionFn = _ref5$createOrUpdateB === void 0 ? createOrUpdateBIConnection : _ref5$createOrUpdateB;
            fullAccount = account;
            account = removeSensibleDataFromAccount(account);
            _context3.next = 5;
            return saveAccount(konnector, account);

          case 5:
            account = _context3.sent;
            _context3.next = 8;
            return createOrUpdateBIConnectionFn({
              account: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, fullAccount, {
                _id: account._id
              }),
              client: client,
              konnector: konnector
            });

          case 8:
            biConnection = _context3.sent;
            return _context3.abrupt("return", lodash_merge__WEBPACK_IMPORTED_MODULE_5___default()(account, {
              data: {
                auth: {
                  bi: {
                    connId: biConnection.id
                  }
                }
              }
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function onBIAccountCreation(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
var konnectorPolicy = {
  name: 'budget-insight',
  match: _biUtils__WEBPACK_IMPORTED_MODULE_9__["isBudgetInsightConnector"],
  saveInVault: false,
  onAccountCreation: onBIAccountCreation
};

/***/ }),

/***/ "v7Qg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DumbTriggerManager", function() { return DumbTriggerManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggerManager", function() { return TriggerManager; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
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
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("56YH");
/* harmony import */ var lodash_flow__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash_flow__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("Le8U");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_transpiled_react_MuiCozyTheme__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("xIbs");
/* harmony import */ var cozy_ui_transpiled_react_Spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_transpiled_react_Modal__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("cLsY");
/* harmony import */ var cozy_keys_lib__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("Bkvo");
/* harmony import */ var _AccountForm__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("oGkx");
/* harmony import */ var _OAuthForm__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("F4kv");
/* harmony import */ var _connections_accounts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("IXB1");
/* harmony import */ var _connections_triggers__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("hw33");
/* harmony import */ var _connections_files__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("Sz7o");
/* harmony import */ var _connections_permissions__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("fRJb");
/* harmony import */ var _helpers_accounts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("v7CI");
/* harmony import */ var _helpers_cron__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("QQs6");
/* harmony import */ var _helpers_konnectors__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("MmAb");
/* harmony import */ var _helpers_triggers__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__("Ih3Q");
/* harmony import */ var _TriggerLauncher__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__("V04f");
/* harmony import */ var _VaultCiphersList__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__("s720");
/* harmony import */ var _helpers_manifest__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__("C9ao");
/* harmony import */ var _HarvestVaultProvider__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__("NSF3");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__("uM7l");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__("eCGz");
/* harmony import */ var _models_cipherUtils__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__("Hq7M");
/* harmony import */ var _services_budget_insight__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__("jH4C");









































var defaultKonnectorPolicy = {
  accountContainsAuth: true,
  saveInVault: true,
  onAccountCreation: null,
  match: function match() {
    return true;
  },
  name: 'default'
};
var policies = [cozy_flags__WEBPACK_IMPORTED_MODULE_37___default()('bi-konnector-policy') ? _services_budget_insight__WEBPACK_IMPORTED_MODULE_40__["konnectorPolicy"] : null, defaultKonnectorPolicy].filter(Boolean);
_logger__WEBPACK_IMPORTED_MODULE_38__["default"].info('Available konnector policies', policies);
var IDLE = 'IDLE';
var RUNNING = 'RUNNING';
var MODAL_PLACE_ID = 'coz-harvest-modal-place';

var findKonnectorPolicy = function findKonnectorPolicy(konnector) {
  var policy = policies.find(function (policy) {
    return policy.match(konnector);
  });
  _logger__WEBPACK_IMPORTED_MODULE_38__["default"].info("Using ".concat(policy.name, " konnector policy for ").concat(konnector.slug));
  return policy;
};
/**
 * Creates or updates an io.cozy.accounts
 * Used as a form submit handler
 *
 * @param  {io.cozy.account} options.account - Existing io.cozy.account or object
 * @param  {[type]} options.cipher - Vault cipher if vault has been unlocked
 * @param  {CozyClient} options.client - A cozy client
 * @param  {io.cozy.konnector} options.konnector - Konnector to which the account is linked
 * @param  {KonnectorPolicy} options.konnectorPolicy - Controls if auth is saved in io.cozy.accounts
 * and if auth is saved into the vault
 * @param  {function} options.saveAccount
 * @param  {object} options.userData
 * @param  {function} options.ensureTrigger
 */


var createOrUpdateAccount =
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee(_ref) {
    var account, cipher, client, konnector, konnectorPolicy, saveAccount, userCredentials, isUpdate, onAccountCreation, saveInVault, accountToSave;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            account = _ref.account, cipher = _ref.cipher, client = _ref.client, konnector = _ref.konnector, konnectorPolicy = _ref.konnectorPolicy, saveAccount = _ref.saveAccount, userCredentials = _ref.userCredentials;
            isUpdate = !!account;
            onAccountCreation = konnectorPolicy.onAccountCreation, saveInVault = konnectorPolicy.saveInVault;
            accountToSave = lodash_clone__WEBPACK_IMPORTED_MODULE_36___default()(account);
            accountToSave = _helpers_accounts__WEBPACK_IMPORTED_MODULE_28__["default"].resetState(accountToSave);
            accountToSave = _helpers_accounts__WEBPACK_IMPORTED_MODULE_28__["default"].setSessionResetIfNecessary(accountToSave, userCredentials);
            accountToSave = isUpdate ? _helpers_accounts__WEBPACK_IMPORTED_MODULE_28__["default"].mergeAuth(accountToSave, userCredentials) : _helpers_accounts__WEBPACK_IMPORTED_MODULE_28__["default"].build(konnector, userCredentials);

            if (!onAccountCreation) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return onAccountCreation({
              client: client,
              account: accountToSave,
              konnector: konnector,
              saveAccount: saveAccount
            });

          case 10:
            accountToSave = _context.sent;

          case 11:
            if (cipher && saveInVault) {
              accountToSave = _helpers_accounts__WEBPACK_IMPORTED_MODULE_28__["default"].setVaultCipherRelationship(accountToSave, cipher.id);
            } else {
              // eslint-disable-next-line no-console
              _logger__WEBPACK_IMPORTED_MODULE_38__["default"].warn('No cipher passed when creating/updating account, account will not be linked to cipher');
            }

            _context.next = 14;
            return saveAccount(konnector, accountToSave);

          case 14:
            return _context.abrupt("return", _context.sent);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createOrUpdateAccount(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Wraps conditionally its children inside VaultUnlocker, only if
 * props.konnector's policy tells to saveInVault
 */


var KonnectorVaultUnlocker = function KonnectorVaultUnlocker(_ref3) {
  var konnector = _ref3.konnector,
      children = _ref3.children,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8___default()(_ref3, ["konnector", "children"]);

  var konnectorPolicy = findKonnectorPolicy(konnector);

  if (konnectorPolicy.saveInVault) {
    return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(cozy_keys_lib__WEBPACK_IMPORTED_MODULE_21__["VaultUnlocker"], props, children);
  } else {
    _logger__WEBPACK_IMPORTED_MODULE_38__["default"].info('Not rendering VaultUnlocker since konnectorPolicy.saveInVault = false');
    return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_11___default.a.Fragment, null, children);
  }
};
/**
 * If the vault is not going to be unlocked, we go directly to accountForm
 * step
 * If we need the vault unlocker, the `null` step represents
 *
 * - either vault locked
 * - ciphers being loaded
 *
 * TODO Find a way not to have to check konnectorPolicy here and again through
 * KonnectorVaultUnlocker
 */


var getInitialStep = function getInitialStep(_ref4) {
  var account = _ref4.account,
      konnector = _ref4.konnector;
  var konnectorPolicy = findKonnectorPolicy(konnector);

  if (konnectorPolicy.saveInVault) {
    return account ? 'accountForm' : null;
  } else {
    return 'accountForm';
  }
};
/**
 * Displays the login form and on submission will create the account, triggers and folders.
 * After that it calls TriggerLauncher to run the konnector.
 *
 * @type {Component}
 */


var DumbTriggerManager =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(DumbTriggerManager, _Component);

  function DumbTriggerManager(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, DumbTriggerManager);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(DumbTriggerManager).call(this, props));
    var account = props.account,
        konnector = props.konnector;
    _this.handleNewAccount = _this.handleNewAccount.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleOAuthAccountId = _this.handleOAuthAccountId.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleError = _this.handleError.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleCipherSelect = _this.handleCipherSelect.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.showCiphersList = _this.showCiphersList.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleVaultUnlock = _this.handleVaultUnlock.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.state = {
      account: account,
      error: null,
      status: IDLE,
      step: getInitialStep(props),
      selectedCipher: undefined,
      showBackButton: false,
      ciphers: []
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(DumbTriggerManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.CozyFolder = cozy_doctypes__WEBPACK_IMPORTED_MODULE_16__["CozyFolder"].copyWithClient(this.props.client);
    }
    /**
     * Ensure that a trigger will exist, with valid destination folder with
     * permissions and references
     * TODO move this to Cozy-Doctypes https://github.com/cozy/cozy-libs/issues/743
     *
     * @param  {object}  account
     * @return {Object} Trigger document
     */

  }, {
    key: "ensureTrigger",
    value: function () {
      var _ensureTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee2(account) {
        var _this$props, addPermission, addReferencesTo, createDirectoryByPath, createTrigger, statDirectoryByPath, konnector, t, trigger, folder, _ref5, _ref6, adminFolder, photosFolder, path;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = this.props, addPermission = _this$props.addPermission, addReferencesTo = _this$props.addReferencesTo, createDirectoryByPath = _this$props.createDirectoryByPath, createTrigger = _this$props.createTrigger, statDirectoryByPath = _this$props.statDirectoryByPath, konnector = _this$props.konnector, t = _this$props.t;
                trigger = this.props.trigger;

                if (!trigger) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", trigger);

              case 4:
                if (!_helpers_konnectors__WEBPACK_IMPORTED_MODULE_30__["default"].needsFolder(konnector)) {
                  _context2.next = 24;
                  break;
                }

                _context2.next = 7;
                return Promise.all([this.CozyFolder.ensureMagicFolder(this.CozyFolder.magicFolders.ADMINISTRATIVE, "/".concat(t('folder.administrative'))), this.CozyFolder.ensureMagicFolder(this.CozyFolder.magicFolders.PHOTOS, "/".concat(t('folder.photos')))]);

              case 7:
                _ref5 = _context2.sent;
                _ref6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref5, 2);
                adminFolder = _ref6[0];
                photosFolder = _ref6[1];
                path = _helpers_konnectors__WEBPACK_IMPORTED_MODULE_30__["default"].buildFolderPath(konnector, account, {
                  administrative: adminFolder.path,
                  photos: photosFolder.path
                });
                _context2.next = 14;
                return statDirectoryByPath(path);

              case 14:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 18;
                return createDirectoryByPath(path);

              case 18:
                _context2.t0 = _context2.sent;

              case 19:
                folder = _context2.t0;
                _context2.next = 22;
                return addPermission(konnector, _helpers_konnectors__WEBPACK_IMPORTED_MODULE_30__["default"].buildFolderPermission(folder));

              case 22:
                _context2.next = 24;
                return addReferencesTo(konnector, [folder]);

              case 24:
                _context2.next = 26;
                return createTrigger(_helpers_triggers__WEBPACK_IMPORTED_MODULE_31__["default"].buildAttributes({
                  account: account,
                  cron: _helpers_cron__WEBPACK_IMPORTED_MODULE_29__["default"].fromKonnector(konnector),
                  folder: folder,
                  konnector: konnector
                }));

              case 26:
                return _context2.abrupt("return", _context2.sent);

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function ensureTrigger(_x2) {
        return _ensureTrigger.apply(this, arguments);
      }

      return ensureTrigger;
    }()
    /**
     * OAuth Form success handler. OAuthForm retrieves an account id created by the
     * cozy stack
     * @param  {string}  accountId
     */

  }, {
    key: "handleOAuthAccountId",
    value: function () {
      var _handleOAuthAccountId = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee3(accountId) {
        var findAccount, oAuthAccount;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                findAccount = this.props.findAccount;
                _context3.prev = 1;
                this.setState({
                  error: null,
                  status: RUNNING
                });
                _context3.next = 5;
                return findAccount(accountId);

              case 5:
                oAuthAccount = _context3.sent;
                _context3.next = 8;
                return this.handleNewAccount(oAuthAccount);

              case 8:
                return _context3.abrupt("return", _context3.sent);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](1);
                this.handleError(_context3.t0);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 11]]);
      }));

      function handleOAuthAccountId(_x3) {
        return _handleOAuthAccountId.apply(this, arguments);
      }

      return handleOAuthAccountId;
    }()
    /**
     * Get the ID of the cipher selected by the user in the list
     *
     * @returns {string|null} the cipher ID
     */

  }, {
    key: "getSelectedCipherId",
    value: function getSelectedCipherId() {
      var selectedCipher = this.state.selectedCipher;
      return selectedCipher && selectedCipher.id;
    }
    /**
     * - Ensures a cipher is created for the authentication data
     *   Find cipher via identifier / password
     * - Creates io.cozy.accounts
     * - Links cipher to account
     * - Saves account
     */

  }, {
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee4() {
        var data,
            _this$props2,
            client,
            konnector,
            saveAccount,
            vaultClient,
            account,
            konnectorPolicy,
            cipher,
            cipherId,
            savedAccount,
            _args4 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                data = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _this$props2 = this.props, client = _this$props2.client, konnector = _this$props2.konnector, saveAccount = _this$props2.saveAccount, vaultClient = _this$props2.vaultClient;
                account = this.state.account;
                this.setState({
                  error: null,
                  status: RUNNING
                });
                konnectorPolicy = findKonnectorPolicy(konnector);
                _context4.prev = 5;
                _logger__WEBPACK_IMPORTED_MODULE_38__["default"].log('konnector policy', konnectorPolicy);

                if (!konnectorPolicy.saveInVault) {
                  _context4.next = 14;
                  break;
                }

                cipherId = this.getSelectedCipherId();
                _context4.next = 11;
                return Object(_models_cipherUtils__WEBPACK_IMPORTED_MODULE_39__["createOrUpdateCipher"])(vaultClient, cipherId, {
                  account: account,
                  konnector: konnector,
                  userCredentials: data
                });

              case 11:
                cipher = _context4.sent;
                _context4.next = 15;
                break;

              case 14:
                // eslint-disable-next-line no-console
                _logger__WEBPACK_IMPORTED_MODULE_38__["default"].info('Bypassing cipher creation because of konnector account policy');

              case 15:
                _context4.next = 17;
                return createOrUpdateAccount({
                  client: client,
                  account: account,
                  cipher: cipher,
                  konnector: konnector,
                  konnectorPolicy: konnectorPolicy,
                  saveAccount: saveAccount,
                  ensureTrigger: this.ensureTrigger.bind(this),
                  userCredentials: data
                });

              case 17:
                savedAccount = _context4.sent;
                _context4.next = 20;
                return this.handleNewAccount(_helpers_accounts__WEBPACK_IMPORTED_MODULE_28__["default"].mergeAuth(savedAccount, data));

              case 20:
                return _context4.abrupt("return", _context4.sent);

              case 23:
                _context4.prev = 23;
                _context4.t0 = _context4["catch"](5);
                return _context4.abrupt("return", this.handleError(_context4.t0));

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 23]]);
      }));

      function handleSubmit() {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
    /**
     * Account creation success handler
     * @param  {Object}  account Created io.cozy.accounts document
     * @return {Object}          io.cozy.jobs document, runned with account data
     */

  }, {
    key: "handleNewAccount",
    value: function () {
      var _handleNewAccount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee5(account) {
        var trigger;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.ensureTrigger(account);

              case 2:
                trigger = _context5.sent;
                this.setState({
                  account: account,
                  status: IDLE
                });
                _context5.next = 6;
                return this.props.launch(trigger);

              case 6:
                return _context5.abrupt("return", _context5.sent);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function handleNewAccount(_x4) {
        return _handleNewAccount.apply(this, arguments);
      }

      return handleNewAccount;
    }()
    /**
     * TODO rename state error to accountError
     */

  }, {
    key: "handleError",
    value: function handleError(error) {
      _logger__WEBPACK_IMPORTED_MODULE_38__["default"].error('TriggerManager handleError', error);
      var onError = this.props.onError;
      this.setState({
        error: error,
        state: IDLE
      });
      if (typeof onError === 'function') onError(error);
    }
  }, {
    key: "handleCipherSelect",
    value: function handleCipherSelect(selectedCipher) {
      var _this2 = this;

      var konnector = this.props.konnector;
      var account = this.cipherToAccount(selectedCipher);
      var values = _helpers_manifest__WEBPACK_IMPORTED_MODULE_34__["default"].getFieldsValues(konnector, account);
      var hasValuesForRequiredFields = _helpers_manifest__WEBPACK_IMPORTED_MODULE_34__["default"].hasValuesForRequiredFields(konnector, values);

      if (hasValuesForRequiredFields) {
        this.setState({
          selectedCipher: selectedCipher
        }, function () {
          _this2.handleSubmit(values);
        });
      } else {
        this.setState({
          step: 'accountForm',
          selectedCipher: selectedCipher,
          showBackButton: true
        });
      }
    }
  }, {
    key: "cipherToAccount",
    value: function cipherToAccount(cipher) {
      if (cipher === undefined) {
        return null;
      }

      var identifierProperty = _helpers_manifest__WEBPACK_IMPORTED_MODULE_34__["default"].getIdentifier(this.props.konnector.fields);
      var account = cozy_doctypes__WEBPACK_IMPORTED_MODULE_16__["Account"].fromCipher(cipher, {
        identifierProperty: identifierProperty
      });
      return account;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.error && this.props.error !== prevProps.error) {
        this.setState({
          step: 'accountForm'
        });
      }
    }
    /**
     * Tells whether we currently have a cipher selected or not
     * selectedCipher === undefined means nothing has been selected
     * selectedCipher === null means « from another account has been selected »
     * selectedCipher === Object means a cipher has been selected
     */

  }, {
    key: "hasCipherSelected",
    value: function hasCipherSelected() {
      return this.state.selectedCipher !== undefined;
    }
  }, {
    key: "showAccountForm",
    value: function showAccountForm() {
      this.setState({
        step: 'accountForm',
        showBackButton: false
      });
    }
  }, {
    key: "showCiphersList",
    value: function showCiphersList(ciphers) {
      var newState = {
        step: 'ciphersList'
      };

      if (ciphers) {
        newState.ciphers = ciphers;
      }

      this.setState(newState);
    }
  }, {
    key: "handleVaultUnlock",
    value: function () {
      var _handleVaultUnlock = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee6() {
        var _this$props3, vaultClient, konnector, encryptedCiphers, ciphers;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$props3 = this.props, vaultClient = _this$props3.vaultClient, konnector = _this$props3.konnector;
                _context6.next = 3;
                return vaultClient.getAll({
                  type: cozy_keys_lib__WEBPACK_IMPORTED_MODULE_21__["CipherType"].Login
                });

              case 3:
                encryptedCiphers = _context6.sent;

                if (!(encryptedCiphers.length === 0)) {
                  _context6.next = 7;
                  break;
                }

                this.showAccountForm();
                return _context6.abrupt("return");

              case 7:
                _context6.prev = 7;
                _context6.next = 10;
                return vaultClient.getAllDecrypted({
                  type: cozy_keys_lib__WEBPACK_IMPORTED_MODULE_21__["CipherType"].Login,
                  uri: lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(konnector, 'vendor_link')
                });

              case 10:
                ciphers = _context6.sent;

                if (ciphers.length === 0) {
                  this.showAccountForm();
                } else {
                  this.showCiphersList(ciphers);
                }

                _context6.next = 18;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](7);
                // eslint-disable-next-line no-console
                _logger__WEBPACK_IMPORTED_MODULE_38__["default"].error("Error while getting decrypted ciphers for ".concat(konnector.slug, " konnector:")); // eslint-disable-next-line no-console

                _logger__WEBPACK_IMPORTED_MODULE_38__["default"].error(_context6.t0);

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[7, 14]]);
      }));

      function handleVaultUnlock() {
        return _handleVaultUnlock.apply(this, arguments);
      }

      return handleVaultUnlock;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          triggerError = _this$props4.error,
          konnector = _this$props4.konnector,
          triggerRunning = _this$props4.running,
          showError = _this$props4.showError,
          modalContainerId = _this$props4.modalContainerId,
          t = _this$props4.t,
          onVaultDismiss = _this$props4.onVaultDismiss,
          vaultClosable = _this$props4.vaultClosable;
      var _this$state = this.state,
          account = _this$state.account,
          error = _this$state.error,
          status = _this$state.status,
          step = _this$state.step,
          selectedCipher = _this$state.selectedCipher,
          showBackButton = _this$state.showBackButton,
          ciphers = _this$state.ciphers;
      var submitting = !!(status === RUNNING || triggerRunning);
      var modalInto = modalContainerId || MODAL_PLACE_ID;
      var oauth = konnector.oauth;
      var showSpinner = submitting && selectedCipher && step === 'ciphersList';
      var showCiphersList = step === 'ciphersList';
      var showAccountForm = step === 'accountForm';

      if (oauth) {
        return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_OAuthForm__WEBPACK_IMPORTED_MODULE_23__["default"], {
          account: account,
          konnector: konnector,
          onSuccess: this.handleOAuthAccountId,
          submitting: submitting
        });
      }

      if (showSpinner) {
        return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
          className: "u-flex u-flex-column u-flex-items-center"
        }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(cozy_ui_transpiled_react_Spinner__WEBPACK_IMPORTED_MODULE_19__["default"], {
          size: "xxlarge"
        }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("p", null, t('triggerManager.connecting')));
      }

      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(KonnectorVaultUnlocker, {
        konnector: konnector,
        onDismiss: onVaultDismiss,
        closable: vaultClosable,
        onUnlock: this.handleVaultUnlock
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        id: modalInto
      }), showCiphersList && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_VaultCiphersList__WEBPACK_IMPORTED_MODULE_33__["default"], {
        konnector: konnector,
        ciphers: ciphers,
        onSelect: this.handleCipherSelect
      }), showAccountForm && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_11___default.a.Fragment, null, showBackButton && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(cozy_ui_transpiled_react_Modal__WEBPACK_IMPORTED_MODULE_20__["ModalBackButton"], {
        onClick: function onClick() {
          return _this3.showCiphersList();
        },
        label: t('back')
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_AccountForm__WEBPACK_IMPORTED_MODULE_22__["default"], {
        account: this.hasCipherSelected() ? this.cipherToAccount(selectedCipher) : account,
        error: error || triggerError,
        konnector: konnector,
        onSubmit: this.handleSubmit,
        showError: showError,
        submitting: submitting,
        onBack: function onBack() {
          return _this3.showCiphersList();
        },
        readOnlyIdentifier: this.hasCipherSelected()
      })));
    }
  }]);

  return DumbTriggerManager;
}(react__WEBPACK_IMPORTED_MODULE_11__["Component"]);
DumbTriggerManager.propTypes = {
  /**
   * Account document. Used to get intial form values.
   * If no account is passed, AccountForm will use empty initial values.
   * @type {Object}
   */
  account: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object,

  /**
   * Konnector document. AccountForm will check the `fields` object to compute
   * fields.
   * @type {Object}
   */
  konnector: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object.isRequired,

  /**
   * Indicates if the TriggerManager has to show errors. Sometimes errors may be
   * displayed elsewhere. However, a KonnectorJobError corresponding to a login
   * error is always displayed. Transmitted to AccountForm.
   * @type {Boolean}
   */
  showError: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool,

  /**
   * Existing trigger document to manage.
   * @type {Object}
   */
  trigger: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object,

  /**
   * Indicates if the given trigger is already running, i.e. if it has been
   * launched and if an associated job with status 'running' exists.
   * @type {[type]}
   */
  running: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool,

  /**
   * The current error for the job (string or KonnectorJob error)
   */
  error: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object]),

  /**
   * Function to call to launch the job
   */
  launch: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func.isRequired,

  /**
   * Translation function
   */
  t: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,
  //
  // mutations
  //

  /**
   * Permission mutation
   * @type {Function}
   */
  addPermission: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,

  /**
   * File mutation
   * @type {Function}
   */
  addReferencesTo: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,

  /**
   * Trigger mutation
   * @type {Function}
   */
  createTrigger: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func.isRequired,

  /**
   * Trigger mutations
   * @type {Function}
   */
  createDirectoryByPath: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,

  /**
   * Account Mutation, used to retrieve OAuth account
   * @type {Function}
   */
  findAccount: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,

  /**
   * Account mutation
   * @type {Func}
   */
  saveAccount: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func.isRequired,

  /**
   * Trigger mutations
   * @type {Function}
   */
  statDirectoryByPath: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,

  /**
   * What to do when the Vault unlock screen is dismissed without password
   */
  onVaultDismiss: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func.isRequired,

  /**
   * Whether the vault will be closable or not.
   * @type {Boolean}
   */
  vaultClosable: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool
};
var SmartTriggerManager = lodash_flow__WEBPACK_IMPORTED_MODULE_14___default()(Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_17__["translate"])(), cozy_client__WEBPACK_IMPORTED_MODULE_15__["withClient"], cozy_keys_lib__WEBPACK_IMPORTED_MODULE_21__["withVaultClient"], Object(cozy_client__WEBPACK_IMPORTED_MODULE_15__["withMutations"])(_connections_accounts__WEBPACK_IMPORTED_MODULE_24__["default"], _connections_files__WEBPACK_IMPORTED_MODULE_26__["default"], _connections_permissions__WEBPACK_IMPORTED_MODULE_27__["default"], _connections_triggers__WEBPACK_IMPORTED_MODULE_25__["triggersMutations"]))(DumbTriggerManager); // The TriggerManager is wrapped in the providers required for it to work by
// itself instead of receiving it from its parents because it is used as
// standalone in places like cozy-home intents

var TriggerManager = function TriggerManager(props) {
  return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_HarvestVaultProvider__WEBPACK_IMPORTED_MODULE_35__["default"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(cozy_ui_transpiled_react_MuiCozyTheme__WEBPACK_IMPORTED_MODULE_18__["default"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(SmartTriggerManager, props)));
}; // TriggerManager is exported wrapped in TriggerLauncher to avoid breaking changes.

var LegacyTriggerManager = function LegacyTriggerManager(props) {
  var onLaunch = props.onLaunch,
      onSuccess = props.onSuccess,
      onLoginSuccess = props.onLoginSuccess,
      onError = props.onError,
      initialTrigger = props.initialTrigger,
      otherProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8___default()(props, ["onLaunch", "onSuccess", "onLoginSuccess", "onError", "initialTrigger"]);

  return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_TriggerLauncher__WEBPACK_IMPORTED_MODULE_32__["default"], {
    onLaunch: onLaunch,
    onSuccess: onSuccess,
    onLoginSuccess: onLoginSuccess,
    onError: onError,
    initialTrigger: initialTrigger
  }, function (_ref7) {
    var error = _ref7.error,
        launch = _ref7.launch,
        running = _ref7.running,
        trigger = _ref7.trigger;
    return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(TriggerManager, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, otherProps, {
      error: error,
      launch: launch,
      running: running,
      trigger: trigger
    }));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (LegacyTriggerManager);

/***/ })

})
//# sourceMappingURL=vendors.2f3edd721ca29380fc0c.hot-update.js.map