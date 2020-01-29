/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "e593895d21a1d9b09f88";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"intents": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "/home.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8888/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = this["webpackJsonp"] = this["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+NZW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorInstall", function() { return KonnectorInstall; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("iDCe");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("buk/");
/* harmony import */ var components_KonnectorSuccess__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("5Xzc");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("uZd2");
/* harmony import */ var styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("K4zY");
/* harmony import */ var styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12__);







(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








var KonnectorInstall =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(KonnectorInstall, _Component);

  function KonnectorInstall(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KonnectorInstall);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(KonnectorInstall).call(this, props));
    _this.state = {
      trigger: null,
      success: false
    };
    _this.handleLoginSuccess = _this.handleLoginSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.handleSuccess = _this.handleSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(KonnectorInstall, [{
    key: "handleLoginSuccess",
    value: function handleLoginSuccess(trigger) {
      this.setState({
        trigger: trigger,
        success: true
      });
      this.props.onLoginSuccess(trigger);
    }
  }, {
    key: "handleSuccess",
    value: function handleSuccess(trigger) {
      this.setState({
        trigger: trigger,
        success: true
      });
      this.props.onSuccess(trigger);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          account = _this$props.account,
          konnector = _this$props.konnector,
          legacySuccess = _this$props.legacySuccess,
          onDone = _this$props.onDone,
          successMessage = _this$props.successMessage,
          successMessages = _this$props.successMessages,
          successButtonLabel = _this$props.successButtonLabel,
          t = _this$props.t;
      var _this$state = this.state,
          trigger = _this$state.trigger,
          success = _this$state.success;

      if (success || legacySuccess) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_KonnectorSuccess__WEBPACK_IMPORTED_MODULE_10__["default"], {
          account: account,
          connector: konnector,
          folderId: trigger && trigger.message.folder_to_save,
          onDone: onDone,
          title: successMessage,
          trigger: trigger,
          messages: successMessages,
          successButtonLabel: successButtonLabel
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-connection-content']
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: styles_konnectorInstall_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-connection-form']
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", {
        className: "u-ta-center"
      }, t('account.config.title', {
        name: konnector.name
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(cozy_harvest_lib__WEBPACK_IMPORTED_MODULE_8__["TriggerManager"], {
        account: account,
        konnector: konnector,
        onLoginSuccess: this.handleLoginSuccess,
        onSuccess: this.handleSuccess,
        vaultClosable: false
      })));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return KonnectorInstall;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    konnector: Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__["getKonnector"])(state.cozy, ownProps.connector.slug)
  };
};

var _default = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps)(KonnectorInstall));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(KonnectorInstall, "KonnectorInstall", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorInstall.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorInstall.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorInstall.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "+tca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataAccessFacade; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _adapters_CozyStackAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2hsQ");
/* harmony import */ var _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("jPoV");




/* global cozy, PouchDB */

 // const isOnline = () =>
//   typeof navigator !== 'undefined' ? navigator.onLine : true

var DataAccessFacade =
/*#__PURE__*/
function () {
  function DataAccessFacade() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DataAccessFacade);

    this.stackAdapter = new _adapters_CozyStackAdapter__WEBPACK_IMPORTED_MODULE_3__["default"]();

    if (typeof PouchDB !== 'undefined') {
      this.pouchAdapter = new _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["default"](); // TODO: strategy injection

      this.strategy = new PouchFirstStrategy();
    } else {
      this.strategy = new StackOnlyStrategy();
    }
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DataAccessFacade, [{
    key: "setup",
    value: function setup(cozyUrl, options) {
      var config = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({
        cozyURL: cozyUrl
      }, options);

      cozy.client.init(config); // TODO: For now we let cozy-client-js creates PouchDB instances

      this.stackAdapter.init(config);

      if (config.offline) {
        this.pouchAdapter.registerDoctypes(config.offline.doctypes);
      }
    }
  }, {
    key: "getAdapter",
    value: function getAdapter(doctype) {
      return this.strategy.getAdapter(doctype, this.stackAdapter, this.pouchAdapter);
    }
  }, {
    key: "startSync",
    value: function startSync(dispatch) {
      return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["SYNC_BIDIRECTIONAL"]);
    }
  }, {
    key: "startReplicationTo",
    value: function startReplicationTo(dispatch) {
      return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["SYNC_TO"]);
    }
  }, {
    key: "startReplicationFrom",
    value: function startReplicationFrom(dispatch) {
      return this.pouchAdapter.sync(dispatch, _adapters_PouchdbAdapter__WEBPACK_IMPORTED_MODULE_4__["SYNC_FROM"]);
    }
  }]);

  return DataAccessFacade;
}();



var PouchFirstStrategy =
/*#__PURE__*/
function () {
  function PouchFirstStrategy() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PouchFirstStrategy);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PouchFirstStrategy, [{
    key: "getAdapter",
    value: function getAdapter(doctype, stackAdapter, pouchAdapter) {
      if (pouchAdapter.getDatabase(doctype) === undefined) {
        return stackAdapter;
      }

      return pouchAdapter;
    }
  }]);

  return PouchFirstStrategy;
}();

var StackOnlyStrategy =
/*#__PURE__*/
function () {
  function StackOnlyStrategy() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, StackOnlyStrategy);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(StackOnlyStrategy, [{
    key: "getAdapter",
    value: function getAdapter(doctype, stackAdapter) {
      return stackAdapter;
    }
  }]);

  return StackOnlyStrategy;
}();

/***/ }),

/***/ "/n/j":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveApps", function() { return receiveApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApp", function() { return getApp; });
var RECEIVE_APPS = 'RECEIVE_APPS';

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_APPS:
      return action.apps || state;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer); // Action creators

var receiveApps = function receiveApps(apps) {
  return {
    type: RECEIVE_APPS,
    apps: apps
  };
}; // Selectors

var getApp = function getApp() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var slug = arguments.length > 1 ? arguments[1] : undefined;
  return state.find(function (app) {
    return app.slug === slug;
  });
};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("hk3e");
__webpack_require__("56O9");
__webpack_require__("201c");
__webpack_require__("7NIr");
module.exports = __webpack_require__("d/w2");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2hsQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_BY_LINK", function() { return SHARED_BY_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_WITH_ME", function() { return SHARED_WITH_ME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_WITH_OTHERS", function() { return SHARED_WITH_OTHERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyStackAdapter; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);








/* global cozy */
var FILES_DOCTYPE = 'io.cozy.files';
var FETCH_LIMIT = 50;
var SHARED_BY_LINK = 'sharedByLink';
var SHARED_WITH_ME = 'sharedWithMe';
var SHARED_WITH_OTHERS = 'sharedWithOthers';

var CozyStackAdapter =
/*#__PURE__*/
function () {
  function CozyStackAdapter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, CozyStackAdapter);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(CozyStackAdapter, [{
    key: "fetchApps",
    value: function () {
      var _fetchApps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee() {
        var skip,
            _ref,
            data,
            meta,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                skip = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
                _context.next = 3;
                return cozy.client.fetchJSON('GET', '/apps/', null, {
                  processJSONAPI: false
                });

              case 3:
                _ref = _context.sent;
                data = _ref.data;
                meta = _ref.meta;
                return _context.abrupt("return", {
                  data: data || [],
                  meta: meta,
                  skip: skip,
                  next: !!meta && meta.count > skip + FETCH_LIMIT
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fetchApps() {
        return _fetchApps.apply(this, arguments);
      }

      return fetchApps;
    }()
  }, {
    key: "fetchDocuments",
    value: function () {
      var _fetchDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2(doctype) {
        var resp, rows, docs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return cozy.client.fetchJSON('GET', "/data/".concat(doctype, "/_all_docs?include_docs=true"));

              case 3:
                resp = _context2.sent;
                // WARN: the JSON response from the stack is not homogenous with other routes (offset? rows? total_rows?)
                // see https://github.com/cozy/cozy-stack/blob/master/docs/data-system.md#list-all-the-documents
                // WARN: looks like this route returns something looking like a couchDB design doc, we need to filter it:
                rows = resp.rows.filter(function (row) {
                  return !row.doc.hasOwnProperty('views');
                }); // we normalize the data (note that we add _type so that cozy.client.data.listReferencedFiles works...)

                docs = rows.map(function (row) {
                  return Object.assign({}, row.doc, {
                    id: row.id,
                    _type: doctype
                  });
                }); // we forge a correct JSONAPI response:

                return _context2.abrupt("return", {
                  data: docs,
                  meta: {
                    count: resp.total_rows
                  },
                  skip: resp.offset,
                  next: false
                });

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);

                if (!_context2.t0.message.match(/not_found/)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", {
                  data: [],
                  meta: {
                    count: 0
                  },
                  skip: 0,
                  next: false
                });

              case 13:
                throw _context2.t0;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function fetchDocuments(_x) {
        return _fetchDocuments.apply(this, arguments);
      }

      return fetchDocuments;
    }()
  }, {
    key: "queryDocuments",
    value: function () {
      var _queryDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3(doctype, index, options) {
        var fields, skip, sort, queryOptions, data, meta, next, response, _response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fields = options.fields;
                skip = options.skip || 0; // Mango wants an array of single-property-objects...

                sort = options.sort ? index.fields.map(function (f) {
                  return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, f, options.sort[f] || 'desc');
                }) : undefined;
                queryOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
                  limit: FETCH_LIMIT,
                  wholeResponse: true
                }, options, {
                  // TODO: type and class should not be necessary, it's just a temp fix for a stack bug
                  fields: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(fields), ['_id', '_type', 'class']),
                  skip: skip,
                  sort: sort
                }); // abstract away the format differences between query replies on the VFS versus the data API

                if (!(doctype === FILES_DOCTYPE)) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 7;
                return cozy.client.files.query(index, queryOptions);

              case 7:
                response = _context3.sent;
                data = response.data.map(function (doc) {
                  return Object.assign({
                    _id: doc.id,
                    _type: doctype
                  }, doc, doc.attributes);
                });
                meta = response.meta;
                next = meta.count > skip + FETCH_LIMIT;
                _context3.next = 19;
                break;

              case 13:
                _context3.next = 15;
                return cozy.client.data.query(index, queryOptions);

              case 15:
                _response = _context3.sent;
                data = _response.docs.map(function (doc) {
                  return Object.assign({
                    id: doc._id,
                    _type: doctype
                  }, doc);
                });
                meta = {};
                next = _response.next;

              case 19:
                return _context3.abrupt("return", {
                  data: data,
                  meta: meta,
                  next: next
                });

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function queryDocuments(_x2, _x3, _x4) {
        return _queryDocuments.apply(this, arguments);
      }

      return queryDocuments;
    }()
  }, {
    key: "fetchDocument",
    value: function () {
      var _fetchDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee4(doctype, id) {
        var doc, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return cozy.client.data.find(doctype, id);

              case 2:
                doc = _context4.sent;
                // we normalize again...
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                  id: doc._id,
                  _type: doc._type
                });
                return _context4.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function fetchDocument(_x5, _x6) {
        return _fetchDocument.apply(this, arguments);
      }

      return fetchDocument;
    }()
  }, {
    key: "init",
    value: function init(config) {
      this.config = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, config);
    }
  }, {
    key: "createDocument",
    value: function () {
      var _createDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee5(doctype, doc) {
        var created, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return cozy.client.data.create(doctype, doc);

              case 2:
                created = _context5.sent;
                // we forge a standard response with a 'data' property
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, created, {
                  id: created._id,
                  _type: doctype
                });
                return _context5.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function createDocument(_x7, _x8) {
        return _createDocument.apply(this, arguments);
      }

      return createDocument;
    }()
  }, {
    key: "createTrigger",
    value: function () {
      var _createTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee6(doc) {
        var created, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return cozy.client.fetchJSON('POST', '/jobs/triggers', {
                  data: doc
                });

              case 2:
                created = _context6.sent;
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, created, created.attributes, {
                  id: created._id
                });
                return _context6.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function createTrigger(_x9) {
        return _createTrigger.apply(this, arguments);
      }

      return createTrigger;
    }()
  }, {
    key: "launchTrigger",
    value: function () {
      var _launchTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee7(doc) {
        var job, normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return cozy.client.fetchJSON('POST', "/jobs/triggers/".concat(doc._id, "/launch"));

              case 2:
                job = _context7.sent;
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, job, job.attributes, {
                  id: job._id
                });
                return _context7.abrupt("return", {
                  data: [normalized]
                });

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function launchTrigger(_x10) {
        return _launchTrigger.apply(this, arguments);
      }

      return launchTrigger;
    }()
  }, {
    key: "updateDocument",
    value: function () {
      var _updateDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee8(doc) {
        var updated;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return cozy.client.data.updateAttributes(doc._type, doc.id, doc);

              case 2:
                updated = _context8.sent;
                return _context8.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                    _rev: updated._rev
                  })]
                });

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function updateDocument(_x11) {
        return _updateDocument.apply(this, arguments);
      }

      return updateDocument;
    }()
  }, {
    key: "deleteDocument",
    value: function () {
      var _deleteDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee9(doc) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return cozy.client.data.delete(doc._type, doc);

              case 2:
                return _context9.abrupt("return", {
                  data: [doc]
                });

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function deleteDocument(_x12) {
        return _deleteDocument.apply(this, arguments);
      }

      return deleteDocument;
    }()
  }, {
    key: "deleteTrigger",
    value: function () {
      var _deleteTrigger = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee10(doc) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return cozy.client.fetchJSON('DELETE', "/jobs/triggers/".concat(doc._id));

              case 2:
                return _context10.abrupt("return", {
                  data: [doc]
                });

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function deleteTrigger(_x13) {
        return _deleteTrigger.apply(this, arguments);
      }

      return deleteTrigger;
    }()
  }, {
    key: "createIndex",
    value: function createIndex(doctype, fields) {
      return cozy.client.data.defineIndex(doctype, fields);
    }
  }, {
    key: "fetchFileByPath",
    value: function () {
      var _fetchFileByPath = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee11(path) {
        var file;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return cozy.client.files.statByPath(path);

              case 3:
                file = _context11.sent;
                return _context11.abrupt("return", {
                  data: [normalizeFile(file)]
                });

              case 7:
                _context11.prev = 7;
                _context11.t0 = _context11["catch"](0);
                return _context11.abrupt("return", null);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 7]]);
      }));

      function fetchFileByPath(_x14) {
        return _fetchFileByPath.apply(this, arguments);
      }

      return fetchFileByPath;
    }()
  }, {
    key: "createFile",
    value: function () {
      var _createFile = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee12(file, dirID) {
        var created;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return cozy.client.files.create(file, {
                  dirID: dirID
                });

              case 2:
                created = _context12.sent;
                return _context12.abrupt("return", {
                  data: [normalizeFile(created)]
                });

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function createFile(_x15, _x16) {
        return _createFile.apply(this, arguments);
      }

      return createFile;
    }()
  }, {
    key: "trashFile",
    value: function () {
      var _trashFile = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee13(file) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                /* const trashed = */
                cozy.client.files.trashById(file.id); // we forge a standard response with a 'data' property

                return _context13.abrupt("return", {
                  data: [file]
                });

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function trashFile(_x17) {
        return _trashFile.apply(this, arguments);
      }

      return trashFile;
    }()
  }, {
    key: "fetchReferencedFiles",
    value: function () {
      var _fetchReferencedFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee14(doc) {
        var skip,
            normalized,
            _ref3,
            included,
            meta,
            _args14 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                skip = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 0;
                // WARN: _type and _id are needed by cozy.client.data.fetchReferencedFiles
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                  _id: doc.id
                }); // WARN: the stack API is probably not ideal here: referencedFiles are in the 'included' property
                // (that should be used when fetching an entity AND its relations) and the 'data' property
                // only contains uplets { id, type }

                _context14.next = 4;
                return cozy.client.data.fetchReferencedFiles(normalized, {
                  skip: skip,
                  limit: FETCH_LIMIT
                });

              case 4:
                _ref3 = _context14.sent;
                included = _ref3.included;
                meta = _ref3.meta;
                return _context14.abrupt("return", {
                  data: !included ? [] : included.map(function (file) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, file, file.attributes, {
                      _type: 'io.cozy.files'
                    });
                  }),
                  meta: meta,
                  next: meta.count > skip + FETCH_LIMIT,
                  skip: skip
                });

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function fetchReferencedFiles(_x18) {
        return _fetchReferencedFiles.apply(this, arguments);
      }

      return fetchReferencedFiles;
    }()
  }, {
    key: "fetchKonnectors",
    value: function () {
      var _fetchKonnectors = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee15() {
        var skip,
            _ref4,
            data,
            meta,
            _args15 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                skip = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : 0;
                _context15.next = 3;
                return cozy.client.fetchJSON('GET', "/konnectors/", null, {
                  processJSONAPI: false
                });

              case 3:
                _ref4 = _context15.sent;
                data = _ref4.data;
                meta = _ref4.meta;
                return _context15.abrupt("return", {
                  data: data ? data.map(function (konnector) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, konnector, konnector.attributes, {
                      _type: 'io.cozy.konnectors'
                    });
                  }) : [],
                  meta: meta,
                  skip: skip,
                  next: !!meta && meta.count > skip + FETCH_LIMIT
                });

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function fetchKonnectors() {
        return _fetchKonnectors.apply(this, arguments);
      }

      return fetchKonnectors;
    }()
  }, {
    key: "fetchTriggers",
    value: function () {
      var _fetchTriggers = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee16(worker) {
        var skip,
            _ref5,
            data,
            meta,
            _args16 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                skip = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 0;
                _context16.next = 3;
                return cozy.client.fetchJSON('GET', "/jobs/triggers?Worker=".concat(worker), null, {
                  processJSONAPI: false
                });

              case 3:
                _ref5 = _context16.sent;
                data = _ref5.data;
                meta = _ref5.meta;
                return _context16.abrupt("return", {
                  data: data ? data.map(function (trigger) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, trigger, trigger.attributes, {
                      _type: 'io.cozy.triggers'
                    });
                  }) : [],
                  meta: meta,
                  skip: skip,
                  next: !!meta && meta.count > skip + FETCH_LIMIT
                });

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function fetchTriggers(_x19) {
        return _fetchTriggers.apply(this, arguments);
      }

      return fetchTriggers;
    }()
  }, {
    key: "addReferencedFiles",
    value: function () {
      var _addReferencedFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee17(doc, ids) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return cozy.client.data.addReferencedFiles(doc, ids);

              case 2:
                return _context17.abrupt("return", ids);

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function addReferencedFiles(_x20, _x21) {
        return _addReferencedFiles.apply(this, arguments);
      }

      return addReferencedFiles;
    }()
  }, {
    key: "removeReferencedFiles",
    value: function () {
      var _removeReferencedFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee18(doc, ids) {
        var normalized;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                // WARN: _type and _id are needed by cozy.client.data.removeReferencedFiles
                normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, doc, {
                  _id: doc.id
                });
                _context18.next = 3;
                return cozy.client.data.removeReferencedFiles(normalized, ids);

              case 3:
                return _context18.abrupt("return", ids);

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function removeReferencedFiles(_x22, _x23) {
        return _removeReferencedFiles.apply(this, arguments);
      }

      return removeReferencedFiles;
    }()
  }, {
    key: "fetchSharingPermissions",
    value: function () {
      var _fetchSharingPermissions = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee19(doctype) {
        var fetchPermissions, byMe, byLink, withMe;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                fetchPermissions = function fetchPermissions(doctype, sharingType) {
                  return cozy.client.fetchJSON('GET', "/permissions/doctype/".concat(doctype, "/").concat(sharingType));
                };

                _context19.next = 3;
                return fetchPermissions(doctype, SHARED_WITH_OTHERS);

              case 3:
                byMe = _context19.sent;
                _context19.next = 6;
                return fetchPermissions(doctype, SHARED_BY_LINK);

              case 6:
                byLink = _context19.sent;
                _context19.next = 9;
                return fetchPermissions(doctype, SHARED_WITH_ME);

              case 9:
                withMe = _context19.sent;
                return _context19.abrupt("return", {
                  byMe: byMe,
                  byLink: byLink,
                  withMe: withMe
                });

              case 11:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));

      function fetchSharingPermissions(_x24) {
        return _fetchSharingPermissions.apply(this, arguments);
      }

      return fetchSharingPermissions;
    }()
  }, {
    key: "fetchSharing",
    value: function fetchSharing(id) {
      return cozy.client.fetchJSON('GET', "/sharings/".concat(id));
    }
  }, {
    key: "createSharing",
    value: function createSharing(permissions, contactIds, sharingType, description) {
      return cozy.client.fetchJSON('POST', '/sharings/', {
        desc: description,
        permissions: permissions,
        recipients: contactIds.map(function (contactId) {
          return {
            recipient: {
              id: contactId,
              type: 'io.cozy.contacts'
            }
          };
        }),
        sharing_type: sharingType
      });
    }
  }, {
    key: "revokeSharing",
    value: function revokeSharing(sharingId) {
      return cozy.client.fetchJSON('DELETE', "/sharings/".concat(sharingId));
    }
  }, {
    key: "revokeSharingForClient",
    value: function revokeSharingForClient(sharingId, clientId) {
      return cozy.client.fetchJSON('DELETE', "/sharings/".concat(sharingId, "/recipient/").concat(clientId));
    }
  }, {
    key: "createSharingLink",
    value: function createSharingLink(permissions) {
      return cozy.client.fetchJSON('POST', "/permissions?codes=email", {
        data: {
          type: 'io.cozy.permissions',
          attributes: {
            permissions: permissions
          }
        }
      });
    }
  }, {
    key: "revokeSharingLink",
    value: function revokeSharingLink(permission) {
      return cozy.client.fetchJSON('DELETE', "/permissions/".concat(permission._id));
    }
  }]);

  return CozyStackAdapter;
}();



var normalizeFile = function normalizeFile(file) {
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, file, file.attributes, {
    id: file._id
  });
};

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3dAU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCTYPE", function() { return DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAccounts", function() { return fetchAccounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccount", function() { return getAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIds", function() { return getIds; });
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m+TH");

var DOCTYPE = 'io.cozy.accounts';
var accountCollectionKey = 'accounts';
var fetchAccounts = function fetchAccounts() {
  return Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["fetchCollection"])(accountCollectionKey, DOCTYPE);
}; // selectors

var getAccount = function getAccount(state, id) {
  if (!state.documents || !state.documents[DOCTYPE]) {
    return null;
  }

  return state.documents[DOCTYPE][id];
};
var getIds = function getIds(state) {
  return (// state.collection is bugged, it does not update correctly id list on
    // RECEIVE_DATA
    // (state.collections &&
    //   state.collections[accountCollectionKey] &&
    //   state.collections[accountCollectionKey].ids) ||
    // []
    state.documents && state.documents[DOCTYPE] && Object.keys(state.documents[DOCTYPE]) || []
  );
};

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "4DAK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactMarkdownRendererOptions", function() { return reactMarkdownRendererOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactMarkdownWrapper", function() { return ReactMarkdownWrapper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6x+I");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



var reactMarkdownRendererOptions = {
  // eslint-disable-next-line react/display-name
  Link: function Link(props) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: props.href,
      rel: "noopener noreferrer",
      target: "_blank"
    }, props.children);
  }
};
var ReactMarkdownWrapper = function ReactMarkdownWrapper(_ref) {
  var source = _ref.source;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1___default.a, {
    source: source,
    renderers: reactMarkdownRendererOptions
  });
};
var _default = ReactMarkdownWrapper;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(reactMarkdownRendererOptions, "reactMarkdownRendererOptions", "/Users/cozy/code/cozy/cozy-home/src/components/ReactMarkdownWrapper.jsx");
  reactHotLoader.register(ReactMarkdownWrapper, "ReactMarkdownWrapper", "/Users/cozy/code/cozy/cozy-home/src/components/ReactMarkdownWrapper.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/ReactMarkdownWrapper.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "4P+e":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("j7c3");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("j7c3", function() {
		var newContent = __webpack_require__("j7c3");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "4YEU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENQUEUE_CONNECTION", function() { return ENQUEUE_CONNECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LAUNCH_TRIGGER", function() { return LAUNCH_TRIGGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PURGE_QUEUE", function() { return PURGE_QUEUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_DATA", function() { return RECEIVE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_NEW_DOCUMENT", function() { return RECEIVE_NEW_DOCUMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_DELETED_DOCUMENT", function() { return RECEIVE_DELETED_DOCUMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_CONNECTION_RUNNING_STATUS", function() { return UPDATE_CONNECTION_RUNNING_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_CONNECTION_ERROR", function() { return UPDATE_CONNECTION_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_CONNECTION_CREATION", function() { return START_CONNECTION_CREATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "END_CONNECTION_CREATION", function() { return END_CONNECTION_CREATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueueConnection", function() { return enqueueConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purgeQueue", function() { return purgeQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateConnectionError", function() { return updateConnectionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startConnectionCreation", function() { return startConnectionCreation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endConnectionCreation", function() { return endConnectionCreation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsByKonnector", function() { return getConnectionsByKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstError", function() { return getFirstError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstUserError", function() { return getFirstUserError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLastSyncDate", function() { return getLastSyncDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueue", function() { return getQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionError", function() { return getConnectionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCreatedAccount", function() { return getCreatedAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerIdByKonnectorAndAccount", function() { return getTriggerIdByKonnectorAndAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerLastSuccess", function() { return getTriggerLastSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCreatingConnection", function() { return isCreatingConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConnectionConnected", function() { return isConnectionConnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConnectionEnqueued", function() { return isConnectionEnqueued; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConnectionRunning", function() { return isConnectionRunning; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fvjX");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Puqe");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lib_konnectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("8CvS");
/* harmony import */ var ducks_jobs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("sR/t");







 // constant

var ACCOUNT_DOCTYPE = 'io.cozy.accounts';
var TRIGGERS_DOCTYPE = 'io.cozy.triggers';
var JOBS_DOCTYPE = 'io.cozy.jobs';
var ENQUEUE_CONNECTION = 'ENQUEUE_CONNECTION';
var LAUNCH_TRIGGER = 'LAUNCH_TRIGGER';
var PURGE_QUEUE = 'PURGE_QUEUE';
var RECEIVE_DATA = 'RECEIVE_DATA';
var RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT';
var RECEIVE_DELETED_DOCUMENT = 'RECEIVE_DELETED_DOCUMENT';
var UPDATE_CONNECTION_RUNNING_STATUS = 'UPDATE_CONNECTION_RUNNING_STATUS';
var UPDATE_CONNECTION_ERROR = 'UPDATE_CONNECTION_ERROR';
var START_CONNECTION_CREATION = 'START_CONNECTION_CREATION';
var END_CONNECTION_CREATION = 'END_CONNECTION_CREATION'; // Helpers

var getTriggerKonnectorSlug = function getTriggerKonnectorSlug(trigger) {
  return trigger && trigger.message && trigger.message.konnector || null;
};

var isKonnectorTrigger = function isKonnectorTrigger(doc) {
  return doc._type === TRIGGERS_DOCTYPE && !!doc.message && !!doc.message.konnector;
};

var isKonnectorJob = function isKonnectorJob(doc) {
  return doc._type === JOBS_DOCTYPE && doc.worker === 'konnector';
}; // reducers


var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
    case LAUNCH_TRIGGER:
      // Trigger is launched, connection should be running.
      if (!action.trigger || !action.trigger._id) throw new Error('Missing trigger id');
      if (!action.trigger.message || !action.trigger.message.konnector) throw new Error('Malformed trigger message');
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, getTriggerKonnectorSlug(action.trigger), konnectorReducer(state[getTriggerKonnectorSlug(action.trigger)], action)));

    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      if (!action.response || !action.response.data || !action.response.data.length) {
        return state;
      }

      return action.response.data.reduce(function (newState, doc) {
        var isTrigger = isKonnectorTrigger(doc);
        var isJob = isKonnectorJob(doc); // Ignore non triggers or non jobs

        if (!isTrigger && !isJob) return newState;
        var konnectorSlug = doc.message.konnector;
        var triggerId = isTrigger && doc._id || isJob && doc.trigger_id;
        if (!triggerId) return newState;
        var account = isTrigger && !!doc.message && doc.message.account;
        var currentStatus = isTrigger && doc.current_state && doc.current_state.status || isJob && doc.state;
        var error = isTrigger && !!doc.current_state && doc.current_state.status !== 'done' && !!doc.current_state.last_error && Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_6__["buildKonnectorError"])(doc.current_state.last_error) || isJob && !!doc.error && Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_6__["buildKonnectorError"])(doc.error) || null;
        var lastSyncDate = isTrigger && !!doc.current_state && doc.current_state.last_execution || isJob && doc.queued_at;
        var existingTriggers = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers', 'data'], []);
        var rawTriggers = existingTriggers;

        if (isTrigger) {
          rawTriggers = existingTriggers.filter(function (_ref) {
            var _id = _ref._id;
            return _id !== doc._id;
          });
          rawTriggers.push(doc);
        }

        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, newState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, konnectorSlug, {
          triggers: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers'], []), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
            data: rawTriggers
          }, triggerId, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers', triggerId], {}), {
            account: account || lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(newState, [konnectorSlug, 'triggers', triggerId, 'account']),
            error: error,
            hasError: !!error || currentStatus === 'errored',
            isRunning: ['queued', 'running'].includes(currentStatus),
            isConnected: !error && currentStatus === 'done',
            lastSyncDate: lastSyncDate
          })))
        }));
      }, state);

    case PURGE_QUEUE:
    case RECEIVE_DELETED_DOCUMENT:
      return Object.keys(state).reduce(function (konnectors, slug) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, konnectors, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, slug, konnectorReducer(state[slug], action)));
      }, state);

    default:
      return state;
  }
};

var creation = function creation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      {
        if (!state) return null;

        if (!action.response || !action.response.data || action.response.data.length !== 1) {
          return state;
        }

        var doc = action.response.data[0];
        var isAccount = doc._type === ACCOUNT_DOCTYPE;
        if (isAccount) return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, {
          account: doc._id
        });
        var isTrigger = isKonnectorTrigger(doc);
        if (isTrigger) return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, {
          trigger: doc._id
        });
        return state;
      }

    case START_CONNECTION_CREATION:
      // Store all data related to the creation of a new connection in then
      // property `creation`
      // While a new connection is being configured, new trigger and account
      // are store here
      return {};

    case END_CONNECTION_CREATION:
      return null;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])({
  creation: creation,
  konnectors: reducer
})); // sub(?) reducers

var konnectorReducer = function konnectorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ENQUEUE_CONNECTION:
    case LAUNCH_TRIGGER:
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_DELETED_DOCUMENT:
    case PURGE_QUEUE:
      // We assume that document being a trigger has already been validated.
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, {
        triggers: triggersReducer(state.triggers, action)
      });

    default:
      return state;
  }
};

var triggersReducer = function triggersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ENQUEUE_CONNECTION:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, action.trigger._id, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state[action.trigger._id], {
        isEnqueued: true
      })));

    case LAUNCH_TRIGGER:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, action.trigger._id, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state[action.trigger._id], {
        account: action.trigger.message.account,
        isRunning: true
      })));

    case PURGE_QUEUE:
      return state ? Object.keys(state).reduce(function (newState, triggerId) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, newState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, triggerId, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, newState[triggerId], {
          isEnqueued: false
        })));
      }, state) : state;

    case RECEIVE_DELETED_DOCUMENT:
      {
        var data = action.response.data;
        var _data$ = data[0],
            _id = _data$._id,
            _type = _data$._type;

        if (_type === TRIGGERS_DOCTYPE) {
          return lodash_omit__WEBPACK_IMPORTED_MODULE_4___default()(state, _id);
        } else return state;
      }

    default:
      return state;
  }
}; // action creators sync


var enqueueConnection = function enqueueConnection(trigger) {
  return {
    type: ENQUEUE_CONNECTION,
    trigger: trigger
  };
};
var purgeQueue = function purgeQueue() {
  return {
    type: PURGE_QUEUE
  };
};
var updateConnectionError = function updateConnectionError(konnector, account, error) {
  return {
    type: UPDATE_CONNECTION_ERROR,
    konnector: konnector,
    account: account,
    error: error
  };
};
var startConnectionCreation = function startConnectionCreation(konnector) {
  return {
    type: START_CONNECTION_CREATION,
    konnector: konnector
  };
};
var endConnectionCreation = function endConnectionCreation() {
  return {
    type: END_CONNECTION_CREATION
  };
}; // selectors

var getConnectionsByKonnector = function getConnectionsByKonnector(state, konnectorSlug) {
  var validAccounts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var validKonnectors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var konnectorIsValid = !validKonnectors.length || validKonnectors.includes(konnectorSlug);
  var konnectorHasConnections = state.konnectors[konnectorSlug] && Object.keys(state.konnectors[konnectorSlug].triggers).length;
  if (!konnectorIsValid || !konnectorHasConnections) return [];
  return Object.values(state.konnectors[konnectorSlug].triggers).filter(function (trigger) {
    return validAccounts.includes(trigger.account);
  });
};
var getFirstError = function getFirstError(state, konnectorSlug) {
  var firstTriggerHavingError = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).find(function (trigger) {
    return !!trigger.error;
  });
  return firstTriggerHavingError ? firstTriggerHavingError.error : null;
};
var getFirstUserError = function getFirstUserError(state, konnectorSlug) {
  var firstTriggerHavingUserError = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).find(function (trigger) {
    return Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_6__["isKonnectorUserError"])(trigger.error);
  });
  return firstTriggerHavingUserError ? firstTriggerHavingUserError.error : null;
};
var getLastSyncDate = function getLastSyncDate(state, konnectorSlug) {
  var lastExecutions = !!state.konnectors && !!state.konnectors[konnectorSlug] && !!state.konnectors[konnectorSlug].triggers && Object.values(state.konnectors[konnectorSlug].triggers).map(function (trigger) {
    return trigger.lastSyncDate;
  }).sort(function (dateA, dateB) {
    var momentA = moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(dateA);
    var momentB = moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(dateB);
    return momentA.isAfter(momentB) ? -1 : momentA.isBefore(momentB) ? 1 : 0;
  });
  return lastExecutions.length && lastExecutions[0];
}; // Map the trigger status to a status compatible with queue

var getTriggerQueueStatus = function getTriggerQueueStatus(trigger) {
  if (trigger.isRunning) return 'ongoing';
  if (trigger.hasError) return 'error';
  if (trigger.isConnected) return 'done';
  return 'pending';
};

var getQueue = function getQueue(state, konnectors) {
  return (// state is state.connections
    state.konnectors ? Object.keys(state.konnectors).reduce(function (queuedConnections, konnectorSlug) {
      var triggers = state.konnectors[konnectorSlug].triggers;
      if (!triggers) return queuedConnections;
      var konnector = konnectors[konnectorSlug];
      return queuedConnections.concat(Object.keys(triggers).reduce(function (queuedTriggers, triggerId) {
        if (triggers[triggerId].isEnqueued) {
          var label = konnector.name;
          var status = getTriggerQueueStatus(triggers[triggerId]);
          return queuedTriggers.concat({
            konnector: konnector,
            label: label,
            status: status,
            triggerId: triggerId
          });
        }

        return queuedTriggers;
      }, []));
    }, []) : []
  );
};
var getConnectionError = function getConnectionError(state, trigger) {
  return getTriggerState(state, trigger).error;
};
var getCreatedAccount = function getCreatedAccount(state) {
  return !!state.creation && state.creation.account;
};
var getTriggerIdByKonnectorAndAccount = function getTriggerIdByKonnectorAndAccount(state, konnector, account) {
  var validAccounts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return !!konnector && !!account && validAccounts.includes(account._id) && !!state.konnectors[konnector.slug] && Object.keys(state.konnectors[konnector.slug].triggers).find(function (triggerId) {
    return state.konnectors[konnector.slug].triggers[triggerId].account === account._id;
  });
};
var getTriggerLastSuccess = function getTriggerLastSuccess(state, trigger) {
  var lastJob = Object(ducks_jobs__WEBPACK_IMPORTED_MODULE_7__["getTriggerLastJob"])(state, trigger);
  var lastJobIsSuccess = lastJob && lastJob.state === 'done';
  if (lastJobIsSuccess) return lastJob.started_at;
  return !!trigger && !!trigger.current_state && trigger.current_state.last_success;
}; // get trigger from state, in state.konnectors[konnectorSlug].triggers[triggerId]

var getTriggerState = function getTriggerState(state, trigger) {
  var konnectorSlug = getTriggerKonnectorSlug(trigger);
  if (!konnectorSlug || !state.konnectors || !state.konnectors[konnectorSlug]) return false;
  var triggers = state.konnectors[konnectorSlug].triggers;
  if (!triggers) return false;
  return !!triggers && !!triggers[trigger._id] && triggers[trigger._id] || {};
};

var isCreatingConnection = function isCreatingConnection(state) {
  return !!state.creation;
};
var isConnectionConnected = function isConnectionConnected(state, trigger) {
  return getTriggerState(state, trigger).isConnected;
};
var isConnectionEnqueued = function isConnectionEnqueued(state, trigger) {
  return getTriggerState(state, trigger).isEnqueued;
};
var isConnectionRunning = function isConnectionRunning(state, trigger) {
  return getTriggerState(state, trigger).isRunning;
};

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "5Xzc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorSuccess", function() { return KonnectorSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessImage", function() { return SuccessImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessLinks", function() { return SuccessLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriveLink", function() { return DriveLink; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("OFL0");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("xweI");
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("buk/");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("4P+e");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var components_DescriptionContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("CB1n");
/* harmony import */ var components_TriggerFolderLink__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("8MA2");
/* harmony import */ var components_BanksLink__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("u5EB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BanksLink", function() { return components_BanksLink__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("vL8P");
/* harmony import */ var assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16__);






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};














var SuccessImage = function SuccessImage() {
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success-illu-wrapper']
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("img", {
    src: assets_images_connecting_data_in_progress_svg__WEBPACK_IMPORTED_MODULE_16___default.a,
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success-illu']
  }));
};

var SuccessLinks = function SuccessLinks(_ref) {
  var children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success-links'], 'u-mv-half')
  }, children);
};

var DriveLink = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(function (_ref2) {
  var folderId = _ref2.folderId,
      t = _ref2.t;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_TriggerFolderLink__WEBPACK_IMPORTED_MODULE_14__["default"], {
    folderId: folderId,
    label: t('account.success.driveLinkText')
  });
});
var SuccessFooter = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(function (_ref3) {
  var children = _ref3.children;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['coz-form-controls-success']
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-form-success-buttons']
  }, children));
});
var KonnectorSuccess =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(KonnectorSuccess, _Component);

  function KonnectorSuccess() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KonnectorSuccess);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(KonnectorSuccess).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(KonnectorSuccess, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof this.props.handleConnectionSuccess === 'function') {
        this.props.handleConnectionSuccess();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          account = _this$props.account,
          error = _this$props.error,
          title = _this$props.title,
          messages = _this$props.messages;
      var relatedApps = lodash_sortBy__WEBPACK_IMPORTED_MODULE_7___default()(Object.values(KonnectorSuccess.apps).filter(function (app) {
        return app.predicate(_this.props);
      }), function (app) {
        return -app.priority;
      });
      var hasLinks = relatedApps.length > 0;
      return account && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_12___default.a['col-account-success']
      }, !error && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(SuccessImage, null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_DescriptionContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
        title: !error && title,
        messages: !error && messages
      }, hasLinks && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(SuccessLinks, null, relatedApps.map(function (app, i) {
        return (// Should always pass context, since it's used for customisation
          app.successLink(_this.props, _this.context, i)
        );
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(SuccessFooter, null, relatedApps.length > 0 ? // Should always pass context, since it's used for customisation
      relatedApps[0].footerLink(this.props, this.context) : null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return KonnectorSuccess;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);
KonnectorSuccess.apps = {
  drive: {
    priority: 1,
    // eslint-disable-next-line react/display-name
    predicate: function predicate(props) {
      var trigger = props.trigger;
      var res = lodash_has__WEBPACK_IMPORTED_MODULE_6___default()(trigger, 'message.folder_to_save');
      return res;
    },
    // eslint-disable-next-line react/display-name
    successLink: function successLink(props, context, i) {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(DriveLink, {
        key: i,
        folderId: props.trigger.message.folder_to_save
      });
    },
    // eslint-disable-next-line react/display-name
    footerLink: function footerLink(props) {
      var t = props.t,
          onDone = props.onDone,
          account = props.account,
          successButtonLabel = props.successButtonLabel;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
        label: successButtonLabel || t('account.success.button'),
        onClick: function onClick(event) {
          event.preventDefault();
          onDone(account);
        }
      });
    }
  },
  banks: {
    priority: 0,
    // eslint-disable-next-line react/display-name
    predicate: function predicate(props) {
      var connector = props.connector;
      return Array.isArray(connector.data_types) && connector.data_types.includes('bankAccounts');
    },
    // eslint-disable-next-line react/display-name
    successLink: function successLink(props, context, i) {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_BanksLink__WEBPACK_IMPORTED_MODULE_15__["default"], {
        key: i,
        banksUrl: context.store.banksUrl
      });
    },
    footerLink: function footerLink() {
      return null;
    }
  }
};
KonnectorSuccess.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object
};
KonnectorSuccess.propTypes = {
  account: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object.isRequired,
  error: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  title: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string.isRequired,
  messages: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string),
  onDone: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  successButtonLabel: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  trigger: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object.isRequired
};


var _default = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(KonnectorSuccess);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SuccessImage, "SuccessImage", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorSuccess.jsx");
  reactHotLoader.register(SuccessLinks, "SuccessLinks", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorSuccess.jsx");
  reactHotLoader.register(DriveLink, "DriveLink", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorSuccess.jsx");
  reactHotLoader.register(SuccessFooter, "SuccessFooter", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorSuccess.jsx");
  reactHotLoader.register(KonnectorSuccess, "KonnectorSuccess", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorSuccess.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorSuccess.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "7dT6":
/***/ (function(module) {

module.exports = {"app":{"logo":{"alt":"%{name} logo"},"logout":"Log out"},"date":{"format":"MM/DD/YYYY","placeholder":"mm/dd/yyyy"},"manifest":{"name":"Home","short_description":"Cozy Collect is the application that help you gather all your personal data inside Cozy.","long_description":"With Cozy Collect, you can easily:\n * Downloads documents from all your suppliers\n * Set how often Cozy will collect your bills\n * Access directly to the documents gathered by your Cozy","changes":"You haven't missed it, the Store arrived in your Cozy!\nWe took advantage of it to improve Collect:\n * Store adaptation.\n * Tile merge: when you have several accounts for a single supplier, the former are now merged under the supplier tile.\n * Improvement of some Connectors pages."},"add_service":"Add","fix_konnector_error":"Fix now","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Optional)","title":"Connect your %{name} account","data":{"title":"Collected data:","service":{"description":"Service description:"}},"tabs":{"sync":"synchronization","account":"account","data":"collected data"}},"disconnect":{"title":"Disconnection","description":"Your will be disconnected from this account, but imported data will be kept"},"form":{"title":"Account","label":{"firstname":"Firstname","lastname":"Lastname","login":"Login","consumerKey":"Consumer Key","consumerSecret":"Consumer Secret","appKey":"Application Key","appSecret":"Application Secret","tricountUrl":"Tricount URL","cardNumber":"Card Number","dob":"Date of birth","password":"Password","email":"Email","bank_identifier":"Bank identifier (optional)","profileName":"Profile Name","identifier":"Identifier","new_identifier":"Identifier","secret":"Password","answer":"Secret Answer","access_token":"Access token","accessTokenSecret":"Access token secret","apikey":"Api key","phoneNumber":"Phone number","folderPath":"Folder path","namePath":"Folder name","authCode":"Auth code","accountName":"Account name","loginUrl":"Login URL","token":"Token","agreement":"I agree","refreshToken":"Refresh Token","timeout":"Delay (ms)","branchName":"Branch","code":"Confidential code"},"placeholder":{"password":"The password you use to connect to the service","update_password":"Update the password","accountName":"Example: Personal account","namePath":"Example: Camille bills. Default name path is your login."},"button":{"connect":"Connect","cancel":"Cancel","save":"Save","disconnect":"Disconnect this account","delete":"Delete this account","advanced":"Advanced options","synchronize":"Synchronize now"}},"folder":{"title":"Related folder settings","withoutSettings":{"title":"Related folder"},"link":"Open the folder in Cozy Drive","changePath":"change the path","error":"Oops, something went wrong. Don't panic, your files are still there, please try again later","close":"close","warning":"You're changing your folder path","oldFiles":"All your olds bills will be moved in your new path.","newFiles":"Your news bills will be downloaded in your new path.","newPath":"Everything went well, the new path for your %{name} account is:","placeholder":{"administrative":"Administrative","photos":"Photos"}},"success":{"title":{"connect":"Successful configuration!","update":"Your %{name} account is updated!"},"banksLinkText":"See my accounts in %{appName}","driveLinkText":"Open the folder in Cozy Drive","button":"Close"},"message":{"folder":{"title":"Folder","link":"Open folder on cozy drive"},"success":{"connect":"Your data will be available in your Cozy in a few minutes and the next ones will follow automatically.","update":"Your %{name} account has been updated successfully.","delete":"Account removed succesfully."},"syncing":{"bill":"Your bills are syncing and will be available in the following path:"},"synced":{"title":"Your data synchronization","cron":"Synchronization frequency: %{frequency}","cron_hourly":"each hour","cron_daily":"once a day","cron_weekly":"once a week","cron_monthly":"once a month","cron_undefined":"manually","syncing":"running…","unknown":"unknown","last_sync":"Last synchronization: **%{date}**","date_format":"MMMM D[,] YYYY [at] HH[:]mm","bill":"Find your datas in the Drive app at this location:"},"error":{"server":"Apologies, our server had an hiccup, do you mind starting again?","bad_credentials":"Sorry, you entered an incorrect login or password.","delete":"Apologies, our server had an hiccup, do you mind starting again?"}},"forceConnection":"Run again now","editor_detail":"Service developed by %{editor}"},"account_picker":{"add_account_button":{"label":"Add an account"}},"apps":{"title":"My apps"},"connection":{"CTA":{"twofa_failed":"Run again now"},"error":{"default":{"title":"An error occured","description":"Unfortunately, something went wrong when trying to connect to %{name}. Please check again your account informations, visit our online help or contact us at contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"Cozy Storage full","description":"This service cannot fetch your documents now. Please remove some files or go to **Settings > Storage** to get more free space."},"CHALLENGE_ASKED":{"title":"Challenge required","description":"It seems that the website requires a second authentification factor that we don’t support yet. You may try to settle the issue on the [%{name}](%{link}) website before a retry."},"LOGIN_FAILED":{"title":"Bad credentials","description":"Bad credentials. Check the konnector fields and run the connection again."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Needs secret","description":"An additional field must be filled in before checking your credentials."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporarily blocked","description":"Too many attempts occured. Please update your credentials on [%{name}](%{link}) website and update the konnector later on."},"MAINTENANCE":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable or the konnector must be updated. Please rerun the connector later or visit our online help."},"NOT_EXISTING_DIRECTORY":{"title":"Missing destination folder","description":"It seems that this account's destination folder has been deleted. Please restore it by disconnecting this account and then reconnect again."},"UNKNOWN_ERROR":{"title":"Connection error","description":"An unknown error has occurred."},"USER_ACTION_NEEDED":{"title":"Action needed on the provider","description":"It seems that the [%{name}](%{link}) website requires you to log in and to do a specific action. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Access refresh required","description":"The [%{name}](%{link}) service requires you to allow your access again. Please disconnect and reconnect your account %{name} to this application. No data will be lost."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Unavailable account","description":"It seems that your account is no longer active. Please check your account on [%{name}](%{link}) before retry."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Password update required","description":"It seems that the [%{name}](%{link}) website requires you to log in and update your password. Please rerun the connector once you have settled the issue on the website."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"New permissions validation needed","description":"You connector was updated and the permissions changed. Please validate them before launching the connector again."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relaunch the connexion to the service to fetch your data","description":"The last connexion to the service failed; please launch it again. You may have to provide a validation code."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Wrong two-factore code provided","description":"The two-factor code provided is wrong, please start again."},"VENDOR_DOWN":{"title":"Unavailable service","description":"It seems that the [%{name}](%{link}) service is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.BANK_DOWN":{"title":"Unavailable website","description":"It seems that the [%{name}](%{link}) website is unavailable at the moment. Please rerun the connector later."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Unavailable service","description":"It seems that we are experiencing overload with our bank konnectors at the moment. Please rerun the connector later."}}},"intent":{"konnector":{"install":{"error":{"message":"The konnector cannot be installed"}}},"service":{"return":"Back to connectors list","success":{"button":{"label":"Close"}},"error":{"initialization":"Service failed to initialize. Sorry for the inconvenience.","creation":"Unable to create account, an error occurred.","cause":"Cause: %{error}"},"cancel":"Cancel","terminate":"Terminate"}},"field":{"password":{"visibility":{"hide":"Hide","show":"Show","title":{"hide":"Hide password","show":"Show password"}}}},"nav":{"services":"My services"},"category":{"all":"All","banking":"Banks","health":"Health","insurance":"Insurance","transport":"Transportation","social":"Social","isp":"ISP","telecom":"Telecom","energy":"Energy","host_provider":"Host","productivity":"Productivity","shopping":"Shopping","public_service":"Public Services","other":"Others"},"loading":{"initial":"Loading accounts...","working":"Loading"},"validation":{"exact_length":"It's must be made up of %{length} characters exactly.","max_length":"The length maximum is %{length} characters.","min_length":"It should contain at least %{length} characters.","pattern":"The value must match a specific pattern: %{pattern}"},"update":{"title":"An update is available for this service.","regular":"Perform this update to keep fetching your data and to have the latest features","blocking":"Update it to keep fetching your data","CTA":"Update"},"error":{"initial":"Something went wrong when fetching your connectors and informations. Please refresh the page.","LOGIN_FAILED":"Bad credentials. Check the konnector fields and run the connection again.","UNKNOWN_ERROR":"Something unexpected happened while running the connector","JOB_TIMEOUT":"The connector execution was too long","button":{"reload":"Refresh now"}},"tutorial":{"cozy_collect":{"title":"Automate your data gathering","text":"They will be stored in your Cozy, you won't have to look for them anymore.","button":"Next"},"home":{"apps":{"button":"Next","text":"Easily manage your digital life (files, pictures, bank accounts, ...)","title":"Access to all your Cozy applications"},"services":{"button":"Let's configure my accounts","text":"They will be stored in your Cozy, you won't have to look for them anymore.","title":"Automate your data gathering"}},"menu_apps":{"title":"Your Cozy is so much more than a simple data aggregator","text":"Open the Applications menu to discover all the features your Cozy has to offer.","button":"Discover my Apps"}},"maintenance":{"icon":"This connector is under maintenance","service":"Service interrupted","problem":"%{konnectorName} doesn't allow your Cozy to access your data","title":"What is going on ?"},"connector":{"debug":{"successMessage":"This konnector is for debug purpose only, this is an additionnal custom success message."},"empty":{"title":"Start gathering your data!","text":"Synchronise your brands with your Cozy to automatically retrieve your data (bills, reimbursements, expenses…)"},"silenced":"%{name} won't be suggested anymore. You can always find a provider by clicking the \"Add\" button.","noAccount":"No account","add":"Add a service","update":"Update available","logo":{"alt":"%{name} logo"},"enedis":{"description":{"service":"Recover your Linky data by connecting your Enedis account. You must have a Linky meter and have first created your Enedis account (on the [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). This connector is provided by Fing for the MesInfos project. It retrieves the data from your electricity contract and downloads your electricity consumption the day before. This connector is running on your Cozy and the Fing will have no access to this data."}},"orange":{"message":{"delay":"Once connected, a demand to extract your data will be sent to Orange information system. These data will be available within 15 days. You data will be updated automatically, every 15 days."}},"orangemobile":{"description":{"connector":"In the context of 'MesInfos', Orange allows you to localize your phone regularly.\n\n**Data collection needs your express agreement**\n\nThis agreement may be revoked at any time by this data connector.\n\nBy clicking on \"Agree\", you give your consent to collect your phone's position, every 30 minutes. Information gathered will on be : \n<ul><li>Date and time of this location.</li><li>Location data of the closest radio antenna at the time of collect.</li></ul>Collected data by Orange after you agreement will be available only in your Cozy that you have been assigned in context of  « Mes Infos ». They will be added to location data already stored in call logs.","service":"This connector will download data from your Orange account on your Cozy. It will automatically download the call logs from your phone. Thus call logs include your phone number, your corresponding's phone number, date and time of this call and location data of the closest radio antenna at the time of collect.\n\nYou will be able to use these data in different apps in your Cozy, for example \"Mapping My Life\" (available soon on the Cozy Store).","field":{"agreement":"Do you agree that Orange localizes regularly your phone in context of  « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"This connector will download data from your Orange account on your Cozy. It will automatically download the list of movies you downloaded in free (TV Replay) or paid VOD from 01/01/2015 (adult contents are not included).\n\nYou will be able to use these data in different apps in your Cozy, for example \"My Movies Music\" (available soon on the Cozy Store)."}},"axabanque102":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo).","connector":"The secret answer is [asked by HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) when you connect without double authentication. Example: what is the name of your pet?"}},"ingdirect95":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"The connection to your bank is operated and secured by our partner : Linxo. [Learn more](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Syncing accounts:","header_mobile":"%{done} of %{total}","header_done":"Synced %{done} out of %{total}","item":{"pending":"Pending"},"close":"Close"},"services":{"title":"My services"},"status":{"interrupted":"INTERRUPTED SERVICE","edf":{"maintenance":"EDF's information system has changed and the related data access doesn't work anymore. This konnector is not currently able to get back your data from EDF. We are trying to restore the situation and we will notice you when it will be fixed. [Learn more](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"MMM DD"}}}};

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "8CvS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_TYPES", function() { return ERROR_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_NEEDED_ERRORS_TYPES", function() { return UPDATE_NEEDED_ERRORS_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TWO_FA_ERRORS", function() { return TWO_FA_ERRORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFolderPermission", function() { return addFolderPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorLoginError", function() { return isKonnectorLoginError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorTwoFAError", function() { return isKonnectorTwoFAError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorUserError", function() { return isKonnectorUserError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorKnownError", function() { return isKonnectorKnownError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKonnectorUpdateNeededError", function() { return isKonnectorUpdateNeededError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildKonnectorError", function() { return buildKonnectorError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasPendingUpdate", function() { return hasPendingUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMostAccurateErrorKey", function() { return getMostAccurateErrorKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnectorMessage", function() { return getKonnectorMessage; });
/* konnector lib ready to be added to cozy-client-js */
var ERROR_TYPES = {
  CHALLENGE_ASKED: 'CHALLENGE_ASKED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  MAINTENANCE: 'MAINTENANCE',
  NOT_EXISTING_DIRECTORY: 'NOT_EXISTING_DIRECTORY',
  USER_ACTION_NEEDED: 'USER_ACTION_NEEDED',
  VENDOR_DOWN: 'VENDOR_DOWN',
  DISK_QUOTA_EXCEEDED: 'DISK_QUOTA_EXCEEDED'
};
var UPDATE_NEEDED_ERRORS_TYPES = {
  TERMS_VERSION_MISMATCH: 'TERMS_VERSION_MISMATCH'
};
var TWO_FA_ERRORS = ['USER_ACTION_NEEDED.TWOFA_EXPIRED', 'USER_ACTION_NEEDED.WRONG_TWOFA_CODE'];

function patchFolderPermission(cozy, konnector) {
  var folderId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var slug = konnector.attributes ? konnector.attributes.slug : konnector.slug;
  var saveFolder = folderId ? {
    type: 'io.cozy.files',
    values: [folderId]
  } : {};
  return cozy.fetchJSON('PATCH', "/permissions/konnectors/".concat(encodeURIComponent(slug)), {
    data: {
      attributes: {
        permissions: {
          saveFolder: saveFolder
        }
      }
    }
  });
}

function addFolderPermission(cozy, konnector, folderId) {
  return patchFolderPermission(cozy, konnector, folderId);
}
function isKonnectorLoginError(error) {
  return error && error.type && error.type === ERROR_TYPES.LOGIN_FAILED;
}
function isKonnectorTwoFAError(error) {
  return error && error.type && TWO_FA_ERRORS.includes(error.code);
}
function isKonnectorUserError(error) {
  return error && error.type && [ERROR_TYPES.CHALLENGE_ASKED, ERROR_TYPES.DISK_QUOTA_EXCEEDED, ERROR_TYPES.LOGIN_FAILED, ERROR_TYPES.NOT_EXISTING_DIRECTORY, ERROR_TYPES.USER_ACTION_NEEDED].includes(error.type);
}
function isKonnectorKnownError(error) {
  return error && error.type && Object.keys(ERROR_TYPES).includes(error.type);
}
function isKonnectorUpdateNeededError(error) {
  return error && error.type && Object.keys(UPDATE_NEEDED_ERRORS_TYPES).includes(error.type);
}
function buildKonnectorError(message) {
  var error = new Error(message);
  error.type = message.split('.')[0];
  error.code = message;
  return error;
}

var checkLocale = function checkLocale(t, key) {
  return t(key) !== key;
};

var hasPendingUpdate = function hasPendingUpdate(konnector) {
  return !!konnector.available_version;
};
var getMostAccurateErrorKey = function getMostAccurateErrorKey(t, error) {
  var getKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (key) {
    return key;
  };
  // Legacy. Kind of.
  if (!error.code) return error.message;
  var errorSegments = error.code.split('.');
  var tested = errorSegments;
  var fullKey = getKey(tested.join('.'));

  while (tested.length && !checkLocale(t, fullKey)) {
    tested = tested.slice(0, tested.length - 1);
    fullKey = getKey(tested.join('.'));
  }

  return tested.length ? fullKey : getKey('UNKNOWN_ERROR');
};
var legacyMessages = {
  terms: 'connector'
};
var getKonnectorMessage = function getKonnectorMessage(t, konnector, message) {
  var messages = konnector.messages,
      hasDescriptions = konnector.hasDescriptions;
  var providesMessage = messages && messages.length && messages.includes(message);
  if (providesMessage) return t("".concat(konnector.slug, ".messages.").concat(message));
  var providesLegacyMessage = hasDescriptions && hasDescriptions[legacyMessages[message] || message];
  if (providesLegacyMessage) return t("connector.".concat(konnector.slug, ".description.").concat(legacyMessages[message] || message));
  return null;
};

/***/ }),

/***/ "8EAv":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("B7lu");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("B7lu", function() {
		var newContent = __webpack_require__("B7lu");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "8MA2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggerFolderLink", function() { return TriggerFolderLink; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("y6ex");
/* harmony import */ var ducks_apps__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("/n/j");
/* harmony import */ var styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("ONtV");
/* harmony import */ var styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13__);








(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








/**
 * Renders a link only if href prop is provided
 */

var MaybeLink =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(MaybeLink, _PureComponent);

  function MaybeLink() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MaybeLink);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(MaybeLink).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(MaybeLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          href = _this$props.href;
      return href ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
        className: className,
        href: href,
        target: "_parent"
      }, this.props.children) : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
        className: className
      }, this.props.children);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return MaybeLink;
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);

var TriggerFolderLink =
/*#__PURE__*/
function (_PureComponent2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(TriggerFolderLink, _PureComponent2);

  function TriggerFolderLink() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, TriggerFolderLink);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(TriggerFolderLink).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(TriggerFolderLink, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this$props2, client, driveApp, receiveApps, _ref, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, client = _this$props2.client, driveApp = _this$props2.driveApp, receiveApps = _this$props2.receiveApps;

                if (driveApp) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return client.query(client.all('io.cozy.apps'));

              case 4:
                _ref = _context.sent;
                data = _ref.data;
                receiveApps(data);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          driveApp = _this$props3.driveApp,
          label = _this$props3.label,
          folderId = _this$props3.folderId;
      var disabled = !driveApp;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(MaybeLink, {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(styles_triggerFolderLink_styl__WEBPACK_IMPORTED_MODULE_13___default.a['col-trigger-folder-link'], {
          'u-silver': disabled,
          'u-c-not-allowed': disabled
        }),
        href: driveApp && "".concat(driveApp.links.related, "#/files/").concat(folderId)
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "u-mr-half",
        icon: "openwith"
      }), label);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return TriggerFolderLink;
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    driveApp: Object(ducks_apps__WEBPACK_IMPORTED_MODULE_12__["getApp"])(state.apps, 'drive')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    receiveApps: function receiveApps(apps) {
      return dispatch(Object(ducks_apps__WEBPACK_IMPORTED_MODULE_12__["receiveApps"])(apps));
    }
  };
};

var _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps, mapDispatchToProps)(Object(cozy_client__WEBPACK_IMPORTED_MODULE_10__["withClient"])(TriggerFolderLink));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MaybeLink, "MaybeLink", "/Users/cozy/code/cozy/cozy-home/src/components/TriggerFolderLink.jsx");
  reactHotLoader.register(TriggerFolderLink, "TriggerFolderLink", "/Users/cozy/code/cozy/cozy-home/src/components/TriggerFolderLink.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/Users/cozy/code/cozy/cozy-home/src/components/TriggerFolderLink.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "/Users/cozy/code/cozy/cozy-home/src/components/TriggerFolderLink.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/TriggerFolderLink.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "91CF":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("UGnq");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("UGnq", function() {
		var newContent = __webpack_require__("UGnq");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "9pOX":
/***/ (function(module) {

module.exports = {"app":{"logo":{"alt":"Logo de %{name}"},"logout":"Déconnexion"},"date":{"format":"DD/MM/YYYY","placeholder":"dd/mm/yyyy"},"manifest":{"name":"Accueil","short_description":"Cozy Collect est l'application de récupération de vos données personnelles disponible sur Cozy.","long_description":"Avec Cozy Collect, vous pouvez facilement :\n\n * Télécharger les documents de tous vos fournisseurs\n * Configurer la fréquence à laquelle Cozy va récupérer vos factures\n * Accéder directement aux documents récupérés par votre Cozy","changes":"Cela ne vous aura pas échappé, le Store est arrivé dans Cozy !\nNous en avons profité pour améliorer Collect :\n\n * Adaptation au Store.\n * Fusion des tuiles : lorsque vous avez plusieurs comptes pour un même fournisseur ces derniers sont désormais réunis sous la tuile de ce fournisseur.\n * Amélioration des pages des connecteurs."},"add_service":"Ajouter","fix_konnector_error":"Corriger maintenant","account":{"config":{"default_folder":"/Administratif/%{name}","optional":"(Optionnel)","title":"Connectez votre compte %{name}","data":{"title":"Données collectées :","service":{"description":"Description du service :"}},"tabs":{"sync":"Synchronisation","account":"Compte","data":"Données collectées"}},"disconnect":{"title":"Déconnexion","description":"Vous serez déconnecté de ce compte, mais les données importées seront conservées"},"form":{"title":"Compte","label":{"firstname":"Prénom","lastname":"Nom","login":"Identifiant","consumerKey":"Clé client","consumerSecret":"Secret client","appKey":"Clé de l'application","appSecret":"Secret de l'application","tricountUrl":"URL Tricount","cardNumber":"Numéro de carte","dob":"Date de naissance","password":"Mot de passe","email":"Mail","bank_identifier":"Identifiant bancaire (optionnel)","profileName":"Nom de Profil","identifier":"Identifiant","new_identifier":"Identifiant","secret":"Mot de passe","answer":"Réponse secrète","access_token":"Jeton d'accès","accessTokenSecret":"Secret du jeton d'accès","apikey":"Clé d'API","phoneNumber":"Numéro de téléphone","folderPath":"Emplacement du dossier","namePath":"Nom du dossier","authCode":"Code d'authentification","accountName":"Nom du compte","loginUrl":"URL d'authentification","token":"Jeton","agreement":"J'accepte","refreshToken":"Mettre à jour le jeton","timeout":"Délai (ms)","branchName":"Agence","code":"Code confidentiel"},"placeholder":{"password":"Le mot de passe utilisé pour vous connecter au service","update_password":"Mettre à jour le mot de passe","accountName":"Exemple: Compte personnel","namePath":"Example : Factures de Camille. Le dossier par défaut sera votre identifiant."},"button":{"connect":"Se connecter","cancel":"Annuler","save":"Sauvegarder","disconnect":"Déconnecter ce compte","delete":"Supprimer ce compte","advanced":"Configuration avancée","synchronize":"Mettre à jour maintenant"}},"folder":{"title":"Paramètres du dossier associé","withoutSettings":{"title":"Dossier associé"},"link":"Ouvrir le dossier dans Cozy Drive","changePath":"Changer le dossier","error":"Mince, quelque chose c'est mal passé. Ne vous inquiétez pas, vos fichiers sont toujours là.","close":"fermer","warning":"Vous êtes en train de modifier le dossier de votre connecteur","oldFiles":"Toutes vos anciennes factures seront déplacées dans votre nouveau dossier.","newFiles":"Toutes vos nouvelles factures seront téléchargées dans votre nouveau dossier.","newPath":"Tout s'est bien passé, le nouveau dossier de votre compte %{name} est :","placeholder":{"administrative":"Administratif","photos":"Photos"}},"success":{"title":{"connect":"Configuration réussie !","update":"Votre compte %{name} est mis à jour !"},"banksLinkText":"Voir mes comptes dans %{appName}","driveLinkText":"Ouvrir le dossier dans Cozy Drive","button":"Fermer"},"message":{"folder":{"title":"Dossier","link":"Ouvrir le dossier dans Cozy Drive"},"success":{"connect":"Vos données existantes seront disponibles dans votre Cozy dans quelques minutes et les prochaines suivront automatiquement.","update":"Votre compte %{name} a été mis à jour avec succès.","delete":"Compte supprimé avec succès."},"syncing":{"bill":"Vos factures sont en cours de synchronisation et seront disponibles au chemin suivant :"},"synced":{"title":"Mise à jour de vos données","cron":"Fréquence de mise à jour : %{frequency}","cron_hourly":"une fois par heure","cron_daily":"une fois par jour","cron_weekly":"hebdomadaire","cron_monthly":"une fois par mois","cron_undefined":"manuellement","syncing":"en cours…","unknown":"indéterminée","last_sync":"Dernière mise à jour : **%{date}**","date_format":"Le D MMMM YYYY [à] HH[:]mm","bill":"Retrouvez vos données dans l'application Cozy Drive à l'emplacement :"},"error":{"server":"Une erreur est survenue, vos identifiants n'ont pas pu être enregistrés. Pouvez-vous recommencer ?","bad_credentials":"Votre identifiant et/ou mot de passe ne sont pas corrects.","delete":"Une erreur est survenue, vos identifiants n'ont pas pu être enregistrés. Pouvez-vous recommencer ?"}},"forceConnection":"Relancer maintenant","editor_detail":"Service développé par %{editor}"},"account_picker":{"add_account_button":{"label":"Ajouter un compte"}},"apps":{"title":"Mes applications"},"connection":{"CTA":{"twofa_failed":"Relancer maintenant"},"error":{"default":{"title":"Une erreur est survenue","description":"Un problème semble s'être produit pendant la tentative de connexion à %{name}. Merci de revérifier vos informations de compte, de consulter notre aide en ligne ou de nous contacter à contact@cozycloud.cc"},"DISK_QUOTA_EXCEEDED":{"title":"Espace Cozy plein","description":"Actuellement, le service ne peut plus récupérer vos documents.\nLibérez de l'espace en supprimant des fichiers ou rendez-vous dans **Paramètres > Stockage** pour augmenter l'espace de stockage de votre Cozy"},"CHALLENGE_ASKED":{"title":"Second facteur d’authentification demandé","description":"Un second facteur d’authentification que nous ne gérons pas encore est demandé. Vous pouvez essayer de vous connecter directement sur le site [%{name}](%{link}) avant de réessayer."},"LOGIN_FAILED":{"title":"Mauvais identifiants","description":"Données de connexion incorrectes. Vérifiez les données de connexion dans le connecteur et relancez la connexion."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Informations requise","description":"Un champ additionnel doit être rempli pour vérifier vos identifiants."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Temporairement bloqué","description":"Trop de tentatives erronées ont eu lieu. Merci de modifier votre mot de passe sur le site [%{name}](%{link}) et de mettre à jour le connecteur ensuite."},"MAINTENANCE":{"title":"Site non disponible","description":"Il semble que le site [%{name}](%{link}) soit indisponible. Merci de relancer ultérieurement ou de consulter notre aide en ligne."},"NOT_EXISTING_DIRECTORY":{"title":"Dossier de destination manquant","description":"Il semble que le dossier de destination pour ce compte ait été supprimé. Merci de le restaurer en déconnectant ce compte puis en le reconnectant à nouveau."},"UNKNOWN_ERROR":{"title":"Erreur de Connexion","description":"Une erreur inconnue est survenue"},"USER_ACTION_NEEDED":{"title":"Action nécessaire chez le fournisseur","description":"Il semble que le site [%{name}](%{link}) ait besoin que vous vous y authentifiiez pour faire une action spécifique. Merci de relancer le connecteur une fois cette action effectuée."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Actualisation de l'accès requis","description":"Il semble que le site [%{name}](%{link}) demande d'autoriser à nouveau le connecteur. Merci de déconnecter puis reconnecter votre compte %{name}. Aucune donnée ne sera perdue."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Compte client non accessible","description":"Il semble que votre compte ne soit plus actif. Merci de vérifier son statut sur le site [%{name}](%{link}) avant de réessayer."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Renouvellement de mot de passe demandé","description":"Il semble que le site [%{name}](%{link}) ait besoin que vous vous y authentifiiez pour renouveler votre mot de passe. Merci de relancer le connecteur une fois cette action effectuée."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Validation des nouvelles permissions nécessaire","description":"Votre connecteur a été mis à jour et les permissions nécessaires ont changé. Merci de valider les nouvelles permissions avant de relancer le connecteur."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relancez la connexion au service pour récupérer vos données.","description":"La dernière connexion au service a échoué; merci de la relancer.\nIl vous faudra peut-être renseigner un code de validation."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Le code fournis ne semble pas correct","description":"Le code de deux facteurs est incorrect, veuillez recommencer."},"VENDOR_DOWN":{"title":"Service non disponible","description":"Il semble que le service [%{name}](%{link}) ne nous réponde pas dans les temps actuellement. Merci de relancer ultérieurement."},"VENDOR_DOWN.BANK_DOWN":{"title":"Site non disponible","description":"Site non disponible"},"VENDOR_DOWN.LINXO_DOWN":{"title":"Service non disponible","description":"Il semble que le site [%{name}](%{link}) ne nous réponde pas dans les temps actuellement. Merci de relancer ultérieurement."}}},"intent":{"konnector":{"install":{"error":{"message":"Le connecteur ne peut pas être installé"}}},"service":{"return":"Revenir à la liste des connecteurs","success":{"button":{"label":"Fermer"}},"error":{"initialization":"L'initialisation du service a échoué.","creation":"Impossible de créer le compte, il y a eu une erreur.","cause":"Raison : %{error}"},"cancel":"Annuler","terminate":"Terminer"}},"field":{"password":{"visibility":{"hide":"Masquer","show":"Afficher","title":{"hide":"Masquer le mot de passe","show":"Afficher le mot de passe"}}}},"nav":{"services":"Services installés"},"category":{"all":"Tous","banking":"Banques","health":"Santé","insurance":"Assurance","transport":"Voyage et transport","social":"Social","isp":"Internet","telecom":"Mobile","energy":"Énergie","host_provider":"Hébergeur","productivity":"Productivité","shopping":"Shopping","public_service":"Services publics","other":"Autres"},"loading":{"initial":"Chargement des comptes…","working":"Chargement"},"validation":{"exact_length":"La valeur doit faire exactement %{length} caractères.","max_length":"La longueur maximum est de %{length} caractères.","min_length":"La valeur doit contenir au moins %{length} caractères.","pattern":"La valeur doit respecter un format spécifique : %{pattern}"},"update":{"title":"Une mise à jour est disponible pour ce service.","regular":"Effectuez la mise à jour pour continuer à récupérer vos données et profiter des dernières fonctionnalités","blocking":"Mettez-le à jour pour continuer à récupérer vos données","CTA":"Mettre à jour"},"error":{"initial":"Quelque chose s’est mal passé pendant la récupération de vos connecteurs et de vos informations. Merci de recharger la page.","LOGIN_FAILED":"Données de connexion incorrectes. Vérifiez les données de connexion dans le connecteur et relancez la connexion.","UNKNOWN_ERROR":"Quelque-chose d’inattendu s‘est produit pendant l’exécution du connecteur","JOB_TIMEOUT":"L’exécution du connecteur a pris trop de temps","button":{"reload":"Rechargez la page maintenant"}},"tutorial":{"cozy_collect":{"title":"Automatisez la récupération de vos données","text":"Elles seront conservées dans votre Cozy pour que vous n'ayez plus à les chercher.","button":"Suivant"},"home":{"apps":{"button":"Suivant","text":"Gérez facilement toute votre vie numérique (photos, fichiers, compte bancaires, …)","title":"Retrouvez toutes les applications de votre Cozy"},"services":{"button":"Je connecte mes comptes","text":"Elles seront conservées dans votre Cozy pour que vous n'ayez plus à les chercher.","title":"Automatisez la récupération de vos données"}},"menu_apps":{"title":"Votre Cozy est bien plus qu’un simple agrégateur de données","text":"Ouvrez le menu Applications pour découvrir toutes les possibilités offertes par votre Cozy.","button":"Je découvre mes Applications"}},"maintenance":{"icon":"Ce connecteur est en cours de maintenance","service":"Service interrompu","problem":"%{konnectorName} ne permet pas à votre Cozy d'accéder à vos données","title":"Que se passe-t-il ?"},"connector":{"debug":{"successMessage":"Ce konnecteur est utilisé uniquement pour déboguer l'application, ceci est un message de succès additionnel."},"empty":{"title":"Commencez à réunir vos données !","text":"Synchronisez vos marques avec votre Cozy pour récupérer automatiquement vos données (factures, remboursements, dépenses…)"},"silenced":"%{name} n’est plus proposé. Vous pourrez toujours retrouver un fournisseur en cliquant sur \"Ajouter\"","noAccount":"Aucun compte","add":"Ajouter un service","update":"Mise à jour dispo.","logo":{"alt":"Logo de %{name}"},"enedis":{"description":{"service":"Retrouvez vos données Linky en connectant votre compte Enedis. Vous devez avoir un compteur Linky et avoir préalablement créé votre compte Enedis (sur [Enedis website](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Ce connecteur est proposé par Fing pour le projet MesInfos. Il récupère les données de votre contrat d'électricité et télécharge vos consommations électriques de la veille. Ce connecteur fonctionne sur votre Cozy et Fing n'aura aucun accès à vos données."}},"orange":{"message":{"delay":"Une demande d’extraction de vos données a été émise vers le système d’information d’Orange. Ces données seront disponibles sous 7 jours. Par la suite, vos données seront mises à jour automatiquement dans votre espace Cozy Cloud, à intervalles de 7 jours."}},"orangemobile":{"description":{"connector":"**De manière optionnelle et dans le cadre du pilote « Mes Infos »**, Orange vous offre aussi la possibilité de localiser votre téléphone mobile de manière régulière.\n\n**Le recueil de ces données nécessite votre accord explicite.**\n\nCet accord pourra être révoqué à tout moment via ce même connecteur de données.\n\nEn cliquant sur « Accepter », vous donnerez votre accord pour qu’une localisation de votre téléphone mobile soit effectuée à compter de ce jour, deux fois par heure. Les informations recueillies contiendront uniquement :\n<ul><li>La date et l’heure de cette localisation.</li><li>Les coordonnées géographiques de l’antenne radio à laquelle le mobile est rattaché au moment de la localisation.</li></ul>Les données récoltées par Orange  seront accessibles, après votre accord, uniquement dans le Cozy Cloud qui vous a été attribué dans le cadre du pilote « Mes Infos ». Elles viendront compléter les informations de localisation déjà présentes dans les comptes rendus d’appels.","service":"Les données mises à disposition par Orange via ce connecteur contiennent les comptes rendus des appels émis et reçus depuis votre mobile à partir du 01/07/2016. Ces comptes rendus incluent votre numéro, celui de votre correspondant, l’heure et la durée de l’appel, ainsi que la localisation géographique de l’antenne radio à laquelle le mobile était rattaché au moment de l’appel.\n\nVous pourrez utiliser ces données dans différentes applications de votre Cozy Cloud, par exemple « Mapping My Life » (disponibilité prochaine sur le Cozy Store)","field":{"agreement":"Acceptez-vous qu’Orange localise régulièrement votre téléphone mobile dans le cadre du pilote « Mes Infos » ?"}}},"orangevideos":{"description":{"service":"Les données mises à disposition par Orange via ce connecteur contiennent la liste des films que vous avez visionnés à partir du 01/01/2015 en VOD payante ou gratuite (Replay TV) à partir de votre Livebox (à l’exception des contenus « adulte »). \n\nVous pourrez utiliser ces données dans différentes applications de votre Cozy, par exemple « La Musique de mes Films » (disponibilité prochaine sur le Cozy Store) "}},"axabanque102":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo). "}},"bforbank97":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo).","connector":"La réponse secrète est [demandée par HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) lors d'une connexion sans double authentification. Exemple: quel est le nom de votre animal de compagnie? "}},"ingdirect95":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"La connexion à votre banque est opérée et sécurisée par notre partenaire Linxo. [En savoir plus](https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Synchronisation :","header_mobile":"%{done} sur %{total}","header_done":"Synchronisé %{done} sur %{total}","item":{"pending":"En cours"},"close":"Fermer"},"services":{"title":"Mes services"},"status":{"interrupted":"SERVICE INTERROMPU","edf":{"maintenance":"EDF a modifié son système d'information et son accès à vos données ne fonctionne plus. Ce connecteur n'est donc pas actuellement en mesure de récupérer vos données personnelles détenues par EDF. Nous tentons de rétablir la situation et vous informerons dès que le service sera rétabli. [En savoir plus](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"DD MMM"}}}};

/***/ }),

/***/ "AEoj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authenticateWithCordova", function() { return authenticateWithCordova; });
/* global prompt */
var hasCordovaPlugin = function hasCordovaPlugin() {
  return window.cordova !== undefined && window.cordova.InAppBrowser !== undefined;
};

var REGISTRATION_ABORT = 'REGISTRATION_ABORT';
var authenticateWithCordova = function authenticateWithCordova(url) {
  if (hasCordovaPlugin()) {
    return new Promise(function (resolve, reject) {
      var target = '_blank';
      var options = 'clearcache=yes,zoom=no';
      var inAppBrowser = window.cordova.InAppBrowser.open(url, target, options);

      var removeListener = function removeListener() {
        inAppBrowser.removeEventListener('loadstart', onLoadStart);
        inAppBrowser.removeEventListener('exit', onExit);
      };

      var onLoadStart = function onLoadStart(_ref) {
        var url = _ref.url;
        var accessCode = /\?access_code=(.+)$/.test(url);
        var state = /\?state=(.+)$/.test(url);

        if (accessCode || state) {
          resolve(url);
          removeListener();
          inAppBrowser.close();
        }
      };

      var onExit = function onExit() {
        reject(new Error(REGISTRATION_ABORT));
        removeListener();
        inAppBrowser.close();
      };

      inAppBrowser.addEventListener('loadstart', onLoadStart);
      inAppBrowser.addEventListener('exit', onExit);
    });
  } else {
    /**
     * for dev purpose:
     * In oauth workflow, the server displays an authorization page
     * User must accept to give permission then the server gives an url
     * with query parameters used by cozy-client-js to initialize itself.
     *
     * This hack let developers open the authorization page in a new tab
     * then get the "access_code" url and paste it in the prompt to let the
     * application initialize and redirect to other pages.
     */
    return new Promise(function (resolve) {
      setTimeout(function () {
        var token = prompt('Paste the url here:');
        resolve(token);
      }, 10000);
    });
  }
};

/***/ }),

/***/ "Al7w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyProvider; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);







(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




var CozyProvider =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(CozyProvider, _Component);

  function CozyProvider() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CozyProvider);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(CozyProvider).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CozyProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        domain: this.props.domain,
        secure: this.props.secure,
        store: this.props.store || this.context.store,
        client: this.props.client
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return CozyProvider;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(CozyProvider, "propTypes", {
  domain: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  secure: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  store: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    subscribe: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired,
    dispatch: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired,
    getState: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired
  }),
  client: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.element.isRequired
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(CozyProvider, "childContextTypes", {
  domain: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  secure: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  store: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  client: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(CozyProvider, "contextTypes", {
  store: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
});


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CozyProvider, "CozyProvider", "/Users/cozy/code/cozy/cozy-home/src/lib/redux-cozy-client/CozyProvider.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "B/vO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_AppIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rvOC");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);



(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



 // TODO Update the component in cozy-ui to handle secure and domain natively

var AppIcon = function AppIcon(_ref) {
  var client = _ref.client,
      otherProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["client"]);

  var cozyURL = new URL(client.getStackClient().uri);
  var domain = cozyURL.host;
  var secure = cozyURL.protocol === 'https:';
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_AppIcon__WEBPACK_IMPORTED_MODULE_3__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    domain: domain,
    secure: secure
  }, otherProps));
};

var _default = Object(cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"])(AppIcon);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppIcon, "AppIcon", "/Users/cozy/code/cozy/cozy-home/src/components/AppIcon.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/AppIcon.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "B7lu":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, ":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n@-webkit-keyframes spin--1tM1P {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n@keyframes spin--1tM1P {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes shake--2XjZi {\n  10%, 90% {\n    -webkit-transform: translate3d(-1px, 0, 0);\n            transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    -webkit-transform: translate3d(2px, 0, 0);\n            transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    -webkit-transform: translate3d(-4px, 0, 0);\n            transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    -webkit-transform: translate3d(4px, 0, 0);\n            transform: translate3d(4px, 0, 0);\n  }\n}\n@keyframes shake--2XjZi {\n  10%, 90% {\n    -webkit-transform: translate3d(-1px, 0, 0);\n            transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    -webkit-transform: translate3d(2px, 0, 0);\n            transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    -webkit-transform: translate3d(-4px, 0, 0);\n            transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    -webkit-transform: translate3d(4px, 0, 0);\n            transform: translate3d(4px, 0, 0);\n  }\n}\n#svg-sprite-content {\n  position: absolute;\n  width: 0;\n  height: 0;\n  visibility: hidden;\n}\n.app-list {\n  position: relative;\n  margin-top: -3rem;\n  margin-bottom: 1.5rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 6rem);\n  grid-auto-rows: 6rem;\n  grid-gap: 0.5rem;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n@media (max-width: ) {\n  .app-list {\n    margin-top: -2rem;\n    margin-bottom: 0.5rem;\n    grid-template-columns: repeat(auto-fit, 4rem);\n    grid-auto-rows: 4rem;\n    grid-gap: 0.25rem;\n  }\n}\n.app-list .item {\n  background-color: var(--white);\n  -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08);\n          box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08);\n  padding: 20px 4px 12px;\n  -webkit-transition: -webkit-box-shadow 0.05s ease, -webkit-transform 0.05s ease;\n  transition: -webkit-box-shadow 0.05s ease, -webkit-transform 0.05s ease;\n  transition: box-shadow 0.05s ease, transform 0.05s ease;\n  transition: box-shadow 0.05s ease, transform 0.05s ease, -webkit-box-shadow 0.05s ease, -webkit-transform 0.05s ease;\n}\n.app-list .item:active, .app-list .item:focus {\n  background-color: var(--paleGrey);\n  -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 24px 0 rgba(50,54,63,0.08);\n          box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 24px 0 rgba(50,54,63,0.08);\n}\n.app-list .item:hover {\n  -webkit-transform: scale(1.05);\n          transform: scale(1.05);\n  -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 24px 0 rgba(50,54,63,0.08);\n          box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 24px 0 rgba(50,54,63,0.08);\n}\n@media (pointer: coarse) {\n  .app-list .item:hover {\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n@media (max-width: ) {\n  .app-list .item {\n    padding: 10px 4px 6px;\n  }\n}\n.app-list .item-icon {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n@media (max-width: ) {\n  .app-list .item-icon {\n    width: 2rem;\n    height: 2rem;\n  }\n}\n.services-list {\n  width: 100%;\n  max-width: calc(5rem * 7 + 17px * 6);\n  margin: 1.5rem auto;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 5rem);\n  grid-auto-rows: 5rem;\n  grid-gap: 17px;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  opacity: 0.99;\n}\n@media (max-width: ) {\n  .services-list {\n    margin: 1rem auto;\n    grid-template-columns: repeat(auto-fit, 4rem);\n    grid-auto-rows: 4rem;\n    grid-gap: 0.188rem;\n  }\n}\n.services-list .item {\n  padding: 12px 8px;\n  border-radius: 8px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: transparent;\n  position: relative;\n}\n.services-list .item:before, .services-list .item:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 30%;\n  bottom: 30%;\n  width: 1px;\n  opacity: 0.32;\n  mix-blend-mode: difference;\n  background: #fff;\n}\n.services-list .item:before {\n  left: -10px;\n}\n.services-list .item:after {\n  right: -10px;\n}\n@media (max-width: ) {\n  .services-list .item:before {\n    left: -3px;\n  }\n  .services-list .item:after {\n    right: -3px;\n  }\n}\n.services-list .item:hover {\n  border-color: rgba(0,0,0,0.12);\n}\n.services-list .item:active, .services-list .item:focus {\n  background-color: var(--paleGrey);\n  border-color: rgba(0,0,0,0.08);\n}\n@media (pointer: coarse) {\n  .services-list .item:hover {\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n@media (max-width: ) {\n  .services-list .item {\n    padding: 12px 4px;\n  }\n}\n.services-list .item--maintenance .item-icon {\n  -webkit-filter: grayscale(1);\n          filter: grayscale(1);\n  opacity: 0.64;\n}\n.services-list .item--ghost {\n  background: var(--zircon);\n  border: dashed 1px var(--primaryColorLightest);\n}\n.services-list .item--ghost .item-icon {\n  -webkit-filter: sepia(1) saturate(3) hue-rotate(-180deg);\n          filter: sepia(1) saturate(3) hue-rotate(-180deg);\n  opacity: 0.64;\n}\n.services-list .item--ghost:hover {\n  border-color: var(--dodgerBlue);\n}\n.services-list .item-icon {\n  width: 2rem;\n  height: 2rem;\n  position: relative;\n}\n@media (max-width: ) {\n  .services-list .item-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n}\n.services-list .item-grid-icon {\n  width: 1rem;\n  height: 1rem;\n}\n@media (max-width: ) {\n  .services-list .item-grid-icon {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n}\n.services-list .item-status {\n  position: absolute;\n  bottom: -6px;\n  right: -6px;\n  border: 2px solid var(--white);\n  border-radius: 50%;\n  background: var(--white);\n}\n.services-list .item--add-service .item-icon {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.services-list .item--add-service[aria-busy='true'] {\n  opacity: 0.8;\n}\n.services-list .item--add-service[aria-busy='true']:hover {\n  -webkit-transform: none;\n          transform: none;\n}\n.EmptyServicesListTip {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 640px;\n  max-width: 100%;\n  margin: auto;\n  padding: 1rem 2rem;\n}\n@media (max-width: ) {\n  .EmptyServicesListTip {\n    padding: 0 1.5rem 1rem 3rem;\n  }\n}\n.EmptyServicesListTip-text {\n  font-style: italic;\n  padding-left: 1rem;\n}\n@media (max-width: ) {\n  .EmptyServicesListTip-text {\n    padding-left: 0.5rem;\n  }\n}\n.item {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-radius: 0.5rem;\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  cursor: pointer;\n  text-decoration: none;\n  text-align: center;\n}\n.item-icon {\n  margin-bottom: 0.5rem;\n}\n@media (max-width: ) {\n  .item-icon {\n    margin-bottom: 0.25rem;\n  }\n}\n.item-title {\n  width: 100%;\n  margin: 0;\n  color: var(--charcoalGrey);\n  font-size: 0.75rem;\n  font-weight: normal;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (max-width: ) {\n  .item-title {\n    font-size: 0.625rem;\n    line-height: 1.2;\n  }\n}\n.account-connection, .account-management {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.account-connection h3, .account-management h3 {\n  margin: 2em 0 0.5em;\n}\n.account-connection a:not([role=button]), .account-management a:not([role=button]) {\n  color: var(--dodgerBlue);\n  text-transform: uppercase;\n  text-decoration: none;\n  cursor: pointer;\n}\n.account-connection p, .account-management p {\n  margin: 0.5em 0;\n}\n.account-connection > div {\n  width: 50%;\n  padding-bottom: 2em;\n}\n.account-management {\n  width: 70%;\n  margin: auto;\n}\n.account-description {\n  background-color: var(--paleGrey);\n  padding: 0 2em;\n}\n.account-description > p {\n  margin-top: 2em;\n}\n.account-description .title {\n  margin-top: 2em;\n}\n.account-login {\n  padding: 0 2em;\n}\n.account-list {\n  width: 25%;\n}\n.account-config .account-field {\n  max-width: 80%;\n}\n.connector-dialog {\n  padding-top: 0.5em;\n}\n.connector-dialog .dialog-header svg {\n  height: 4em;\n  width: 100%;\n  margin: 1.5em 0;\n}\n.errors {\n  color: var(--pomegranate);\n}\n.coz-service {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.col-create-account-intent {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-top: 2rem;\n}\n.coz-service-loading, .coz-service-error {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100vh;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 100vw;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.coz-service-layout {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  height: 100vh;\n  width: 100vw;\n}\n.coz-service-return {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.coz-service-return--button {\n  width: 24px;\n  height: 24px;\n  margin: 0 0 0 0.75em;\n  border: 0;\n  background-color: transparent;\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzk1OTk5RCIgZD0iTTMuNTcgMTNsMTAuMTA2IDkuMjYzYTEgMSAwIDEgMS0xLjM1MiAxLjQ3NEwuMzI3IDEyLjc0YS45OTcuOTk3IDAgMCAxIDAtMS40OEwxMi4zMjQuMjYzYTEgMSAwIDEgMSAxLjM1MiAxLjQ3NEwzLjU3IDExSDIzYTEgMSAwIDEgMSAwIDJIMy41N3oiLz48L3N2Zz4=\");\n  background-repeat: no-repeat;\n  cursor: pointer;\n}\n.coz-service-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  position: fixed;\n  z-index: 100;\n  width: 100%;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  background-color: var(--paleGrey);\n  -webkit-box-shadow: inset 0 -1px 0 0 var(--silver);\n          box-shadow: inset 0 -1px 0 0 var(--silver);\n}\n.coz-service-bar .coz-icon, .coz-service-bar h1, .coz-service-bar .coz-btn {\n  margin: 0 0.75rem;\n}\n.coz-service-bar .coz-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.coz-service-bar .coz-icon img {\n  height: 2rem;\n  width: 2rem;\n}\n.coz-service-bar h1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin: 0;\n  padding: 0;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: normal;\n}\n.coz-service-bar .coz-btn--close {\n  height: inherit;\n  width: inherit;\n  zoom: 1.5;\n  padding-right: 0;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  background-position: center right;\n}\n.coz-service-content {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: calc(100% - 2rem);\n  max-height: calc(100vh - rem(32));\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: start;\n  padding: 1rem;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  overflow-y: auto;\n}\n", "",{"version":3,"sources":["node_modules/cozy-ui/stylus/settings/palette.styl","intents.styl","node_modules/cozy-ui/stylus/generic/animations.styl","src/styles/intents.styl","src/styles/lists.styl","node_modules/cozy-ui/stylus/settings/breakpoints.styl","src/styles/dialog.styl"],"names":[],"mappings":"AAoBA;AACI;;;;;;;;;;;;;;KCNC;EDqBD,aAAgB;EAChB,mBAAgB;EAChB,iBAAgB;EAChB,mBAAgB;EAChB,oBAAgB;EAChB,uBAAgB;EAChB,aAAgB;EAChB,6BAAmC;AACnC;;;;;;;;;;;;KCRC;EDqBD,iBAAe;EACf,qBAAe;EACf,qBAAe;EACf,gBAAe;EACf,qBAAe;EACf,sBAAe;EACf,qBAAe;AACf;;;;;;;;;;KCVC;EDqBD,sBAAe;EACf,qBAAe;EACf,kBAAe;EACf,oBAAe;EACf,uBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,oBAAiB;EACjB,oBAAiB;EACjB,gBAAiB;EACjB,wBAAiB;EACjB,sBAAiB;EACjB,gBAAiB;AACjB;;;;;;;;;;KCVC;EDqBD,kBAAe;EACf,mBAAe;EACf,kBAAe;EACf,sBAAe;EACf,gBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,mBAAkB;EAClB,yBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,yBAAkB;EAClB,iBAAkB;AAElB;;;;;;KCfC;ADuBD;;;;;;;;;;KCZC;EDuBD,iCAA+B;EAC/B,4BAAoB;EACpB,8BAAsB;EACtB,+BAAuB;EACvB,wCAAsC;ACrB1C;AC3HW;EACP;IACI,+BAAqB;YAArB,uBAAqB;EDqI3B;ECpIE;IACI,iCAAuB;YAAvB,yBAAuB;EDsI7B;AACF;AC3IW;EACP;IACI,+BAAqB;YAArB,uBAAqB;EDqJ3B;ECpJE;IACI,iCAAuB;YAAvB,yBAAuB;EDsJ7B;AACF;ACrJW;EACP;IACI,0CAAgC;YAAhC,kCAAgC;EDqKtC;ECnKE;IACI,yCAA+B;YAA/B,iCAA+B;EDqKrC;ECnKE;IACI,0CAAgC;YAAhC,kCAAgC;EDqKtC;ECnKE;IACI,yCAA+B;YAA/B,iCAA+B;EDqKrC;AACF;ACjLW;EACP;IACI,0CAAgC;YAAhC,kCAAgC;EDiMtC;EC/LE;IACI,yCAA+B;YAA/B,iCAA+B;EDiMrC;EC/LE;IACI,0CAAgC;YAAhC,kCAAgC;EDiMtC;EC/LE;IACI,yCAA+B;YAA/B,iCAA+B;EDiMrC;AACF;AE1NI;EACI,kBAAS;EACT,QAAM;EACN,SAAO;EACP,kBAAW;AF4NnB;AG5NA;EAEI,kBAAS;EACT,iBAA4B;EAC5B,qBAA8B;EAC9B,aAAQ;EACR,6CAAkD;EAClD,oBAAe;EACf,gBAAc;EACd,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;AH6NpB;AI1JmE;EAAA;IDhE3D,iBAAiC;IACjC,qBAA8B;IAC9B,6CAAqD;IACrD,oBAAe;IACf,iBAAc;EH8NpB;AACF;AG7NI;EACI,8BAA4B;EAC5B,6EAAwB;UAAxB,qEAAwB;EACxB,sBAAQ;EACR,+EAA+B;EAA/B,uEAA+B;EAA/B,uDAA+B;EAA/B,oHAA+B;AH+NvC;AG7NQ;EAEI,iCAA+B;EAC/B,+GAAwB;UAAxB,uGAAwB;AH+NpC;AG7NQ;EACI,8BAAoB;UAApB,sBAAoB;EACpB,+GAAwB;UAAxB,uGAAwB;AH+NpC;AG7N8B;EAClB;IACI,uBAAU;YAAV,eAAU;EH+NxB;AACF;AIvLmE;EAAA;IDtCvD,qBAAQ;EHiOlB;AACF;AGhOI;EACQ,aAAY;EACZ,cAAa;AHkOzB;AIhMmE;EAAA;ID/BnD,WAAY;IACZ,YAAa;EHmO3B;AACF;AGjOA;EAGI,WAAM;EACN,oCAAsE;EACtE,mBAAuB;EACvB,aAAQ;EACR,6CAAsD;EACtD,oBAAe;EACf,cAAU;EACV,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;EAChB,aAAQ;AHiOZ;AIjNmE;EAAA;IDb3D,iBAAuB;IACvB,6CAAqD;IACrD,oBAAe;IACf,kBAAc;EHkOpB;AACF;AGjOI;EACI,iBAAQ;EACR,kBAAc;EACd,iBAAa;EACb,mBAAa;EACb,yBAAa;EACb,kBAAS;AHmOjB;AGjOQ;EAEI,WAAQ;EACR,cAAQ;EACR,kBAAS;EACT,QAAI;EACJ,WAAO;EACP,UAAM;EACN,aAAQ;EACR,0BAAe;EACf,gBAAW;AHmOvB;AGjOQ;EACI,WAAK;AHmOjB;AGlOQ;EACI,YAAM;AHoOlB;AInPmE;EDkBvD;IACI,UAAK;EHoOnB;EGnOU;IACI,WAAM;EHqOpB;AACF;AGpOQ;EACI,8BAA8B;AHsO1C;AGpOQ;EAEI,iCAA+B;EAC/B,8BAA8B;AHsO1C;AGpO8B;EAClB;IACI,uBAAU;YAAV,eAAU;EHsOxB;AACF;AIxQmE;EAAA;IDoCnD,iBAAQ;EHwOtB;AACF;AGvOI;EACQ,4BAAkB;UAAlB,oBAAkB;EAClB,aAAQ;AHyOpB;AGvOI;EACQ,yBAAuB;EACvB,8CAAO;AHyOnB;AGvOY;EACI,wDAAc;UAAd,gDAAc;EACd,aAAQ;AHyOxB;AGvOY;EACI,+BAA8B;AHyO9C;AGvOI;EACI,WAAY;EACZ,YAAa;EACb,kBAAS;AHyOjB;AIjSmE;EAAA;ID2DvD,aAAY;IACZ,cAAa;EH0OvB;AACF;AGzOI;EACI,WAAY;EACZ,YAAa;AH2OrB;AI3SmE;EAAA;IDmEvD,cAAY;IACZ,eAAa;EH4OvB;AACF;AG3OI;EACI,kBAAS;EACT,YAAO;EACP,WAAM;EACN,8BAAO;EACP,kBAAc;EACd,wBAAsB;AH6O9B;AG1OQ;EACI,8BAAW;UAAX,sBAAW;EACX,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;EAChB,yBAAY;MAAZ,sBAAY;UAAZ,mBAAY;AH4OxB;AG1OQ;EACI,YAAQ;AH4OpB;AG1OQ;EACI,uBAAU;UAAV,eAAU;AH4OtB;AG1OA;EACI,8BAAW;UAAX,sBAAW;EACX,YAAM;EACN,eAAU;EACV,YAAO;EACP,kBAAQ;AH4OZ;AI5UmE;EAAA;IDmG3D,2BAAQ;EH6Od;AACF;AG5OA;EACI,kBAAW;EACX,kBAAa;AH8OjB;AIrVmE;EAAA;ID0G3D,oBAAa;EH+OnB;AACF;AG9OA;EACI,8BAAW;UAAX,sBAAW;EACX,qBAAmB;EACnB,WAAM;EACN,YAAO;EACP,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,4BAAe;EAAf,6BAAe;MAAf,0BAAe;UAAf,sBAAe;EACf,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;EAChB,yBAAY;MAAZ,sBAAY;UAAZ,mBAAY;EACZ,oBAAY;MAAZ,cAAY;EACZ,eAAO;EACP,qBAAgB;EAChB,kBAAW;AHgPf;AG9OA;EACQ,qBAAmB;AHgP3B;AI3WmE;EAAA;ID8HvD,sBAAmB;EHiP7B;AACF;AGhPA;EACQ,WAAM;EACN,SAAO;EACP,0BAAwB;EACxB,kBAAgB;EAChB,mBAAY;EACZ,mBAAY;EACZ,gBAAS;EACT,uBAAc;AHkPtB;AI1XmE;EAAA;ID2IvD,mBAAgB;IAChB,gBAAY;EHmPtB;AACF;AKldA;EAEI,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;ALodZ;AKldI;EACI,mBAAO;ALqdf;AKldI;EACI,wBAAgC;EAChC,yBAAgB;EAChB,qBAAgB;EAChB,eAAgB;ALqdxB;AKndI;EACI,eAAO;ALsdf;AKndI;EACI,UAAe;EACf,mBAAe;ALqdvB;AKndA;EACI,UAAO;EACP,YAAO;ALqdX;AKndA;EACI,iCAA+B;EAC/B,cAAiB;ALqdrB;AKpdI;EACI,eAAW;ALsdnB;AKrdI;EACI,eAAW;ALudnB;AKrdA;EACI,cAAQ;ALudZ;AKrdA;EACI,UAAM;ALudV;AKrdI;EACI,cAAU;ALudlB;AKpdA;EACI,kBAAY;ALsdhB;AKpdQ;EACI,WAAO;EACP,WAAO;EACP,eAAO;ALsdnB;AKpdA;EACI,yBAAuB;ALsd3B;AEhgBI;EACI,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,WAAM;EACN,YAAO;AFkgBf;AEhgBI;EACI,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,mBAAU;MAAV,oBAAU;UAAV,YAAU;EACV,4BAAe;EAAf,6BAAe;MAAf,0BAAe;UAAf,sBAAe;EACf,iBAAY;AFkgBpB;AEhgBI;EAEI,oBAAgB;EAAhB,oBAAgB;EAAhB,aAAgB;EAChB,aAAgB;EAChB,yBAAgB;MAAhB,sBAAgB;UAAhB,mBAAgB;EAChB,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;EAChB,YAAgB;EAChB,4BAAgB;EAAhB,6BAAgB;MAAhB,0BAAgB;UAAhB,sBAAgB;AFkgBxB;AEhgBI;EACI,oBAAgB;EAAhB,oBAAgB;EAAhB,aAAgB;EAChB,4BAAgB;EAAhB,6BAAgB;MAAhB,0BAAgB;UAAhB,sBAAgB;EAChB,0BAAgB;MAAhB,uBAAgB;UAAhB,oBAAgB;EAChB,aAAgB;EAChB,YAAgB;AFkgBxB;AEhgBI;EACI,oBAAgB;EAAhB,oBAAgB;EAAhB,aAAgB;AFkgBxB;AEjgBQ;EACI,WAAmB;EACnB,YAAmB;EACnB,oBAAmB;EACnB,SAAmB;EACnB,6BAAmB;EACnB,2WAAmE;EACnE,4BAAmB;EACnB,eAAmB;AFmgB/B;AEjgBI;EACI,oBAAkB;EAAlB,oBAAkB;EAAlB,aAAkB;EAClB,yBAAkB;MAAlB,sBAAkB;UAAlB,mBAAkB;EAClB,mBAAkB;MAAlB,kBAAkB;UAAlB,cAAkB;EAClB,eAAkB;EAClB,YAAkB;EAClB,WAAkB;EAClB,8BAAkB;EAAlB,6BAAkB;MAAlB,uBAAkB;UAAlB,mBAAkB;EAClB,iCAAgC;EAChC,kDAAkB;UAAlB,0CAAkB;AFmgB1B;AEjgBQ;EAGI,iBAAO;AFmgBnB;AEjgBQ;EACI,oBAAgB;EAAhB,oBAAgB;EAAhB,aAAgB;EAChB,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;EAChB,yBAAgB;MAAhB,sBAAgB;UAAhB,mBAAgB;AFmgB5B;AEjgBY;EACI,YAAa;EACb,WAAa;AFmgB7B;AEjgBQ;EACI,mBAAgB;MAAhB,WAAgB;UAAhB,OAAgB;EAChB,SAAgB;EAChB,UAAgB;EAChB,iBAAsB;EACtB,iBAAsB;EACtB,mBAAgB;AFmgB5B;AEjgBQ;EACI,eAAc;EACd,cAAc;EACd,SAAc;EACd,gBAAc;EACd,mBAAc;MAAd,WAAc;UAAd,OAAc;EAEd,iCAAqB;AFkgBjC;AEhgBI;EACI,mBAAU;MAAV,oBAAU;UAAV,YAAU;EACV,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,wBAAsB;EACtB,iCAAoC;EACpC,uBAAgB;MAAhB,oBAAgB;UAAhB,sBAAgB;EAChB,aAAQ;EACR,4BAAe;EAAf,6BAAe;MAAf,0BAAe;UAAf,sBAAe;EACf,yBAAY;MAAZ,sBAAY;UAAZ,mBAAY;EACZ,gBAAW;AFkgBnB","file":"intents.styl","sourcesContent":["// @stylint off\n/*------------------------------------*\\\n  Palette\n  =====\n\\*------------------------------------*/\n/*\n    Settings\n\n    Weight: -10\n\n    Styleguide Settings\n*/\n\n/*\n    Colors\n\n    Colors used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n    Styleguide Settings.colors\n*/\n:root\n    /*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n    --white         #FFFFFF\n    --paleGrey      #F5F6F7\n    --silver        #D6D8Da\n    --coolGrey      #95999D\n    --slateGrey     #5D6165\n    --charcoalGrey  #32363F\n    --black         #000000\n    --overlay       rgba(50, 54, 63, .5)\n    /*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n    --zircon       #F5FAFF\n    --hawkesBlue   #EEF5FE\n    --frenchPass   #C2DCFF\n    --azure        #1FA8F1\n    --dodgerBlue   #297EF2\n    --scienceBlue  #0B61D6\n    --puertoRico   #0DCBCF\n    /*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n    --grannyApple  #DEF7E7\n    --weirdGreen   #40DE8E\n    --emerald      #35CE68\n    --malachite    #08b442\n    --seafoamGreen #3DA67E\n    /*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n    --brightSun      #FFC644\n    --texasRose      #FFAE5F\n    --mango          #FF962F\n    --pumpkinOrange  #FF7F1B\n    --blazeOrange    #FC6D00\n    --melon          #FD7461\n    /*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n    --chablis      #FFF2F2\n    --yourPink     #FDCBCB\n    --fushsia      #FC4C83\n    --pomegranate  #F52D2D\n    --monza        #DD0505\n    /*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n    --lavender        #C2ADF4\n    --darkPeriwinkle  #6984CE\n    --purpley         #7F6BEE\n    --portage         #9169F2\n    --lightishPurple  #B449E7\n    --barney          #922BC2\n\n    /*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n\n    /*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n    --primaryColor var(--dodgerBlue)\n    --primaryColorLight #5C9DF5 // lighten(dodgerBlue, 24)\n    --primaryColorLighter #4B93F7\n    --primaryColorLightest #9FC4FB\n    --primaryContrastTextColor var(--white)\n// @stylint on\n",":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n@-moz-keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@-o-keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@-moz-keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n@-webkit-keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n@-o-keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n@keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n:global #svg-sprite-content {\n  position: absolute;\n  width: 0;\n  height: 0;\n  visibility: hidden;\n}\n:global .app-list {\n  position: relative;\n  margin-top: -3rem;\n  margin-bottom: 1.5rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 6rem);\n  grid-auto-rows: 6rem;\n  grid-gap: 0.5rem;\n  justify-content: center;\n}\n@media (max-width: ) {\n  :global .app-list {\n    margin-top: -2rem;\n    margin-bottom: 0.5rem;\n    grid-template-columns: repeat(auto-fit, 4rem);\n    grid-auto-rows: 4rem;\n    grid-gap: 0.25rem;\n  }\n}\n:global .app-list .item {\n  background-color: var(--white);\n  box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08);\n  padding: 20px 4px 12px;\n  transition: box-shadow 0.05s ease, transform 0.05s ease;\n}\n:global .app-list .item:active,\n:global .app-list .item:focus {\n  background-color: var(--paleGrey);\n  box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 24px 0 rgba(50,54,63,0.08);\n}\n:global .app-list .item:hover {\n  transform: scale(1.05);\n  box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 24px 0 rgba(50,54,63,0.08);\n}\n@media (pointer: coarse) {\n  :global .app-list .item:hover {\n    transform: none;\n  }\n}\n@media (max-width: ) {\n  :global .app-list .item {\n    padding: 10px 4px 6px;\n  }\n}\n:global .app-list .item-icon {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n@media (max-width: ) {\n  :global .app-list .item-icon {\n    width: 2rem;\n    height: 2rem;\n  }\n}\n:global .services-list {\n  width: 100%;\n  max-width: calc(5rem * 7 + 17px * 6);\n  margin: 1.5rem auto;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 5rem);\n  grid-auto-rows: 5rem;\n  grid-gap: 17px;\n  justify-content: center;\n  opacity: 0.99;\n}\n@media (max-width: ) {\n  :global .services-list {\n    margin: 1rem auto;\n    grid-template-columns: repeat(auto-fit, 4rem);\n    grid-auto-rows: 4rem;\n    grid-gap: 0.188rem;\n  }\n}\n:global .services-list .item {\n  padding: 12px 8px;\n  border-radius: 8px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: transparent;\n  position: relative;\n}\n:global .services-list .item:before,\n:global .services-list .item:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 30%;\n  bottom: 30%;\n  width: 1px;\n  opacity: 0.32;\n  mix-blend-mode: difference;\n  background: #fff;\n}\n:global .services-list .item:before {\n  left: -10px;\n}\n:global .services-list .item:after {\n  right: -10px;\n}\n@media (max-width: ) {\n  :global .services-list .item:before {\n    left: -3px;\n  }\n  :global .services-list .item:after {\n    right: -3px;\n  }\n}\n:global .services-list .item:hover {\n  border-color: rgba(0,0,0,0.12);\n}\n:global .services-list .item:active,\n:global .services-list .item:focus {\n  background-color: var(--paleGrey);\n  border-color: rgba(0,0,0,0.08);\n}\n@media (pointer: coarse) {\n  :global .services-list .item:hover {\n    transform: none;\n  }\n}\n@media (max-width: ) {\n  :global .services-list .item {\n    padding: 12px 4px;\n  }\n}\n:global .services-list .item--maintenance .item-icon {\n  filter: grayscale(1);\n  opacity: 0.64;\n}\n:global .services-list .item--ghost {\n  background: var(--zircon);\n  border: dashed 1px var(--primaryColorLightest);\n}\n:global .services-list .item--ghost .item-icon {\n  filter: sepia(1) saturate(3) hue-rotate(-180deg);\n  opacity: 0.64;\n}\n:global .services-list .item--ghost:hover {\n  border-color: var(--dodgerBlue);\n}\n:global .services-list .item-icon {\n  width: 2rem;\n  height: 2rem;\n  position: relative;\n}\n@media (max-width: ) {\n  :global .services-list .item-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n}\n:global .services-list .item-grid-icon {\n  width: 1rem;\n  height: 1rem;\n}\n@media (max-width: ) {\n  :global .services-list .item-grid-icon {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n}\n:global .services-list .item-status {\n  position: absolute;\n  bottom: -6px;\n  right: -6px;\n  border: 2px solid var(--white);\n  border-radius: 50%;\n  background: var(--white);\n}\n:global .services-list .item--add-service .item-icon {\n  box-sizing: border-box;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n:global .services-list .item--add-service[aria-busy='true'] {\n  opacity: 0.8;\n}\n:global .services-list .item--add-service[aria-busy='true']:hover {\n  transform: none;\n}\n:global .EmptyServicesListTip {\n  box-sizing: border-box;\n  width: 640px;\n  max-width: 100%;\n  margin: auto;\n  padding: 1rem 2rem;\n}\n@media (max-width: ) {\n  :global .EmptyServicesListTip {\n    padding: 0 1.5rem 1rem 3rem;\n  }\n}\n:global .EmptyServicesListTip-text {\n  font-style: italic;\n  padding-left: 1rem;\n}\n@media (max-width: ) {\n  :global .EmptyServicesListTip-text {\n    padding-left: 0.5rem;\n  }\n}\n:global .item {\n  box-sizing: border-box;\n  border-radius: 0.5rem;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  flex-shrink: 0;\n  cursor: pointer;\n  text-decoration: none;\n  text-align: center;\n}\n:global .item-icon {\n  margin-bottom: 0.5rem;\n}\n@media (max-width: ) {\n  :global .item-icon {\n    margin-bottom: 0.25rem;\n  }\n}\n:global .item-title {\n  width: 100%;\n  margin: 0;\n  color: var(--charcoalGrey);\n  font-size: 0.75rem;\n  font-weight: normal;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (max-width: ) {\n  :global .item-title {\n    font-size: 0.625rem;\n    line-height: 1.2;\n  }\n}\n:global .account-connection,\n:global .account-management {\n  display: flex;\n}\n:global .account-connection h3,\n:global .account-management h3 {\n  margin: 2em 0 0.5em;\n}\n:global .account-connection a:not([role=button]),\n:global .account-management a:not([role=button]) {\n  color: var(--dodgerBlue);\n  text-transform: uppercase;\n  text-decoration: none;\n  cursor: pointer;\n}\n:global .account-connection p,\n:global .account-management p {\n  margin: 0.5em 0;\n}\n:global .account-connection > div {\n  width: 50%;\n  padding-bottom: 2em;\n}\n:global .account-management {\n  width: 70%;\n  margin: auto;\n}\n:global .account-description {\n  background-color: var(--paleGrey);\n  padding: 0 2em;\n}\n:global .account-description > p {\n  margin-top: 2em;\n}\n:global .account-description .title {\n  margin-top: 2em;\n}\n:global .account-login {\n  padding: 0 2em;\n}\n:global .account-list {\n  width: 25%;\n}\n:global .account-config .account-field {\n  max-width: 80%;\n}\n:global .connector-dialog {\n  padding-top: 0.5em;\n}\n:global .connector-dialog .dialog-header svg {\n  height: 4em;\n  width: 100%;\n  margin: 1.5em 0;\n}\n:global .errors {\n  color: var(--pomegranate);\n}\n:global .coz-service {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n:global .col-create-account-intent {\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  padding-top: 2rem;\n}\n:global .coz-service-loading,\n:global .coz-service-error {\n  display: flex;\n  height: 100vh;\n  align-items: center;\n  justify-content: center;\n  width: 100vw;\n  flex-direction: column;\n}\n:global .coz-service-layout {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  height: 100vh;\n  width: 100vw;\n}\n:global .coz-service-return {\n  display: flex;\n}\n:global .coz-service-return--button {\n  width: 24px;\n  height: 24px;\n  margin: 0 0 0 0.75em;\n  border: 0;\n  background-color: transparent;\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzk1OTk5RCIgZD0iTTMuNTcgMTNsMTAuMTA2IDkuMjYzYTEgMSAwIDEgMS0xLjM1MiAxLjQ3NEwuMzI3IDEyLjc0YS45OTcuOTk3IDAgMCAxIDAtMS40OEwxMi4zMjQuMjYzYTEgMSAwIDEgMSAxLjM1MiAxLjQ3NEwzLjU3IDExSDIzYTEgMSAwIDEgMSAwIDJIMy41N3oiLz48L3N2Zz4=\");\n  background-repeat: no-repeat;\n  cursor: pointer;\n}\n:global .coz-service-bar {\n  display: flex;\n  align-items: center;\n  flex: 0 0 100%;\n  position: fixed;\n  z-index: 100;\n  width: 100%;\n  flex-direction: row;\n  background-color: var(--paleGrey);\n  box-shadow: inset 0 -1px 0 0 var(--silver);\n}\n:global .coz-service-bar .coz-icon,\n:global .coz-service-bar h1,\n:global .coz-service-bar .coz-btn {\n  margin: 0 0.75rem;\n}\n:global .coz-service-bar .coz-icon {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n:global .coz-service-bar .coz-icon img {\n  height: 2rem;\n  width: 2rem;\n}\n:global .coz-service-bar h1 {\n  flex: 1;\n  margin: 0;\n  padding: 0;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: normal;\n}\n:global .coz-service-bar .coz-btn--close {\n  height: inherit;\n  width: inherit;\n  zoom: 1.5;\n  padding-right: 0;\n  flex: 1;\n  background-position: center right;\n}\n:global .coz-service-content {\n  flex-grow: 1;\n  display: flex;\n  width: calc(100% - 2rem);\n  max-height: calc(100vh - rem(32));\n  justify-content: start;\n  padding: 1rem;\n  flex-direction: column;\n  align-items: center;\n  overflow-y: auto;\n}\n","/*------------------------------------*\\\n  Animations\n\\*------------------------------------*/\n/*\n    Animations\n\n    Available animations:\n\n    spin - Animates an element by rotating it endlessly by 360 deg (used by the loading spinner)\n\n    Styleguide Generic.animation\n*/\n@keyframes spin\n    from\n        transform rotate(0deg)\n    to\n        transform rotate(359deg)\n        \n@keyframes shake\n    10%, 90%\n        transform translate3d(-1px, 0, 0)\n   \n    20%, 80%\n        transform translate3d(2px, 0, 0)\n\n    30%, 50%, 70%\n        transform translate3d(-4px, 0, 0)\n\n    40%, 60%\n        transform translate3d(4px, 0, 0)\n","@require 'settings/palette.styl'\n@require 'tools/mixins.styl'\n@require 'settings/icons.styl'\n\n:global // @stylint ignore\n    #svg-sprite-content\n        position absolute\n        width 0\n        height 0\n        visibility hidden\n\n    @require './lists.styl'\n    @require './dialog.styl'\n\n    .coz-service\n        display flex\n        width 100%\n        height 100%\n\n    .col-create-account-intent\n        display flex\n        flex-grow 1\n        flex-direction column\n        padding-top 2rem\n\n    .coz-service-loading\n    .coz-service-error\n        display         flex\n        height          100vh\n        align-items     center\n        justify-content center\n        width           100vw\n        flex-direction  column\n\n    .coz-service-layout\n        display         flex\n        flex-direction  column\n        align-items     stretch\n        height          100vh\n        width           100vw\n\n    .coz-service-return\n        display         flex\n        &--button\n            width              24px\n            height             24px\n            margin             0 0 0 .75em\n            border             0\n            background-color   transparent\n            background-image   embedurl('../assets/sprites/icon-arrow-left.svg')\n            background-repeat  no-repeat\n            cursor             pointer\n\n    .coz-service-bar\n        display           flex\n        align-items       center\n        flex              0 0 100%\n        position          fixed\n        z-index           100\n        width             100%\n        flex-direction    row\n        background-color  var(--paleGrey)\n        box-shadow        inset 0 -1px 0 0 var(--silver)\n\n        .coz-icon\n        h1\n        .coz-btn\n            margin 0 rem(12)\n\n        .coz-icon\n            display         flex\n            justify-content center\n            align-items     center\n\n            img\n                height rem(32)\n                width  rem(32)\n\n        h1\n            flex            1\n            margin          0\n            padding         0\n            font-size       rem(24)\n            line-height     rem(32)\n            font-weight     normal\n\n        .coz-btn--close\n            height        inherit\n            width         inherit\n            zoom          1.5\n            padding-right 0\n            flex          1\n            // overide default bg position\n            background-position  center right\n\n    .coz-service-content\n        flex-grow 1\n        display flex\n        width calc(100% - 2rem)\n        max-height      calc(100vh - rem(32))\n        justify-content start\n        padding 1rem\n        flex-direction column\n        align-items center\n        overflow-y auto\n","@require 'settings/breakpoints.styl'\n@require 'settings/palette.styl'\n@require 'settings/spaces.styl'\n\nmobileTileSize = 4rem\noutsideBorder = 0 0 0 1px rgba(0, 0, 0, .08)\nlightShadow = 0 4px 12px 0 rgba(0, 0, 0, .08)\nheavyShadow = 0 4px 24px 0 rgba(50, 54, 63, .08)\n\n.app-list\n    appTileSize = 6rem\n    position relative\n    margin-top -(appTileSize / 2)\n    margin-bottom: spacing_values.l\n    display grid\n    grid-template-columns repeat(auto-fit, appTileSize)\n    grid-auto-rows appTileSize\n    grid-gap rem(8)\n    justify-content center\n\n    +tiny-screen()\n        margin-top: (-(mobileTileSize) / 2)\n        margin-bottom: spacing_values.xs\n        grid-template-columns repeat(auto-fit, mobileTileSize)\n        grid-auto-rows mobileTileSize\n        grid-gap rem(4)\n\n    .item\n        background-color var(--white)\n        box-shadow outsideBorder, lightShadow\n        padding 20px 4px 12px\n        transition box-shadow .05s ease, transform .05s ease\n\n        &:active\n        &:focus\n            background-color var(--paleGrey)\n            box-shadow outsideBorder, lightShadow, heavyShadow\n\n        &:hover\n            transform scale(1.05)\n            box-shadow outsideBorder, lightShadow, heavyShadow\n\n        @media (pointer coarse)\n            &:hover\n                transform none\n\n        +tiny-screen()\n            padding 10px 4px 6px\n\n    .item-icon\n            width rem(40)\n            height rem(40)\n\n            +tiny-screen()\n                width rem(32)\n                height rem(32)\n\n\n.services-list\n    serviceTileSize = 5rem\n    serviceGridGutter = 17px\n    width 100%\n    max-width 'calc(%s * 7 + %s * 6)' % (serviceTileSize serviceGridGutter) // 7 columns + 6 column gaps\n    margin: spacing_values.l auto\n    display grid\n    grid-template-columns repeat(auto-fit, serviceTileSize)\n    grid-auto-rows serviceTileSize\n    grid-gap (serviceGridGutter)\n    justify-content center\n    opacity .99 // required for the blend mode difference to work\n\n    +tiny-screen()\n        margin: spacing_values.m auto\n        grid-template-columns repeat(auto-fit, mobileTileSize)\n        grid-auto-rows mobileTileSize\n        grid-gap rem(3)\n\n    .item\n        padding 12px 8px\n        border-radius 8px\n        border-width 1px\n        border-style solid\n        border-color transparent\n        position relative\n\n        &:before,\n        &:after\n            content ''\n            display block\n            position absolute\n            top 30%\n            bottom 30%\n            width 1px\n            opacity .32\n            mix-blend-mode difference\n            background white\n\n        &:before\n            left -10px\n        &:after\n            right -10px\n\n        +tiny-screen()\n            &:before\n                left -3px\n            &:after\n                right -3px\n\n        &:hover\n            border-color rgba(0, 0, 0, .12)\n\n        &:active\n        &:focus\n            background-color var(--paleGrey)\n            border-color rgba(0, 0, 0, .08)\n\n        @media (pointer coarse)\n            &:hover\n                transform none\n\n        +tiny-screen()\n                padding 12px 4px\n\n    .item--maintenance .item-icon\n            filter grayscale(1)\n            opacity .64\n\n    .item--ghost\n            background var(--zircon)\n            border dashed 1px var(--primaryColorLightest)\n\n            .item-icon\n                filter sepia(1) saturate(3) hue-rotate(-180deg)\n                opacity .64\n\n            &:hover\n                border-color: var(--dodgerBlue)\n\n    .item-icon\n        width rem(32)\n        height rem(32)\n        position relative\n\n        +tiny-screen()\n            width rem(24)\n            height rem(24)\n\n    .item-grid-icon\n        width rem(16)\n        height rem(16)\n\n        +tiny-screen()\n            width rem(12)\n            height rem(12)\n\n    .item-status\n        position absolute\n        bottom -6px\n        right -6px\n        border 2px solid var(--white)\n        border-radius 50%\n        background var(--white)\n\n    .item--add-service\n        .item-icon\n            box-sizing border-box\n            display flex\n            justify-content center\n            align-items center\n\n        &[aria-busy='true']\n            opacity .8\n\n        &[aria-busy='true']:hover\n            transform none\n\n.EmptyServicesListTip\n    box-sizing border-box\n    width 640px\n    max-width 100%\n    margin auto\n    padding 1rem 2rem\n\n    +tiny-screen()\n        padding 0 1.5rem 1rem 3rem\n\n.EmptyServicesListTip-text\n    font-style italic\n    padding-left 1rem\n\n    +tiny-screen()\n        padding-left .5rem\n\n.item\n    box-sizing border-box\n    border-radius rem(8)\n    width 100%\n    height 100%\n    display flex\n    flex-direction column\n    justify-content center\n    align-items center\n    flex-shrink 0\n    cursor pointer\n    text-decoration none\n    text-align center\n\n.item-icon\n        margin-bottom rem(8)\n\n        +tiny-screen()\n            margin-bottom rem(4)\n\n.item-title\n        width 100%\n        margin 0\n        color var(--charcoalGrey)\n        font-size rem(12)\n        font-weight normal\n        white-space nowrap\n        overflow hidden\n        text-overflow ellipsis\n\n        +tiny-screen()\n            font-size rem(10)\n            line-height 1.2\n","@require '../tools/mixins'\n\n/*------------------------------------*\\\n  Breakpoints\n  =====\n\\*------------------------------------*/\n\n// variables\n\nBP-teeny       =  375\nBP-tiny        =  480\nBP-small       =  768\nBP-medium      = 1023\nBP-large       = 1200\nBP-extra-large = 1439\n\n// Standard breakpoints collection for utilities\nbreakpoints = {\n    'none': '',\n    'tiny': 't',\n    'small': 's',\n    'medium': 'm',\n}\n\n/*\n    Breakpoints\n\n    This is the collection of available breakpoint variables:<br><br>\n    - `BP-teeny`         -  375px\n    - `BP-tiny`          -  480px\n    - `BP-small`         -  768px\n    - `BP-medium`        -  1023px\n    - `BP-large`         -  1200px\n    - `BP-extra-large`   -  1439px\n\n    <br>Also we have a standard breakpoints collection meant to be used as suffixes for some utility classes<br>\n\n    If you want a utility class to trigger only at defined breakpoints you can use those:<br><br>\n    - `-t`  - refers to `tiny` breakpoint (max-width: 480px)\n    - `-s`  - refers to `small` breakpoint (max-width: 768px)\n    - `-m`  - refers to `medium` breakpoint (max-width: 1023px)\n\n    Styleguide Settings.breakpoints\n*/\n\n/*\n    Media Queries mixins\n\n    You can use these mixins with no arguments and they will output\n    the desired a `max-width` media-query. Use the direction argument\n    to set it to `min`.\n\n    Styleguide Settings.breakpoints.mixins\n*/\n\n// mixins\n// @stylint off\nsize-helper(direction, size)\n    direction == 'min' ? size + 1 : size\n\n/*\n    teeny-screen()\n\n    teeny-screen() Refers to (max-width: 375px)\n    teeny-screen('min') Refers to (min-width: 376px)\n\n    Weight: -6\n\n    Styleguide Settings.breakpoints.mixins.teeny\n*/\nteeny-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-teeny)))\n        {block}\n\n/*\n    tiny-screen()\n\n    tiny-screen() Refers to (max-width: 480px)\n    tiny-screen('min') Refers to (min-width: 481px)\n\n    Weight: -5\n\n    Styleguide Settings.breakpoints.mixins.tiny\n*/\ntiny-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-tiny)))\n        {block}\n\n/*\n    small-screen()\n\n    small-screen() Refers to (max-width: 768px)\n    small-screen('min') Refers to (min-width: 769px)\n\n    Weight: -4\n\n    Styleguide Settings.breakpoints.mixins.small\n*/\nsmall-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-small)))\n        {block}\n\n/*\n    medium-screen()\n\n    medium-screen() Refers to (max-width: 1023px)\n    medium-screen('min') Refers to (min-width: 1024px)\n\n    Weight: -3\n\n    Styleguide Settings.breakpoints.mixins.medium\n*/\nmedium-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-medium)))\n        {block}\n\n/*\n    large-screen()\n\n    large-screen() Refers to (max-width: 1200px)\n    large-screen('min') Refers to (min-width: 1201px)\n\n    Weight: -2\n\n    Styleguide Settings.breakpoints.mixins.large\n*/\nlarge-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-large)))\n        {block}\n\n/*\n    extra-large-screen()\n\n    extra-large-screen() Refers to (max-width: 1439px)\n    extra-large-screen('min') Refers to (min-width: 1440px)\n\n    Weight: -1\n\n    Styleguide Settings.breakpoints.mixins.extra-large\n*/\nextra-large-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-extra-large)))\n        {block}\n\n// mixins named\n\n/*\n    small-device()\n\n    Refers to (max-width: 543px), (max-height: 375px)\n    Triggers when the viewport has a width smaller than 543px OR a height smaller than 375px\n\n    Weight: 0\n\n    Styleguide Settings.breakpoints.mixins.small-device\n*/\n\nsmall-device()\n    @media (max-width: rem(size-helper('max', BP-tiny))), (max-height: rem(size-helper('max', BP-teeny)))\n        {block}\n\n/*\n    medium-device()\n\n    Refers to (min-width: 543px) and (min-height: 375px)\n    Triggers when the viewport has a width bigger than 543px AND a height bigger than 375px\n\n    Weight: 0\n\n    Styleguide Settings.breakpoints.mixins.medium-device\n*/\n\nmedium-device()\n    @media (min-width: rem(size-helper('min', BP-tiny))) and (min-height: rem(size-helper('min', BP-teeny)))\n        {block}\n\n/*\n    desktop()\n\n    Refers to (min-width: 1024px)\n\n    Weight: 0\n\n    Styleguide Settings.breakpoints.mixins.desktop\n*/\ndesktop()\n    @media (min-width: rem(size-helper('min', BP-medium)))\n        {block}\n\n/*\n    tablet()\n\n    Refers to (min-width: 769px) and (max-width: 1023px)\n\n    Weight: 1\n\n    Styleguide Settings.breakpoints.mixins.tablet\n*/\ntablet()\n    @media (min-width: rem(size-helper('min', BP-small))) and (max-width: rem(size-helper('max', BP-medium)))\n        {block}\n\n/*\n    mobile()\n\n    Refers to small-screen() which is (max-width: 768px)\n\n    Weight: 2\n\n    Styleguide Settings.breakpoints.mixins.mobile\n*/\nmobile()\n    +small-screen()\n        {block}\n\n/*\n    gt-mobile()\n\n    Refers to (min-width: 769px)\n\n    Weight: 3\n\n    Styleguide Settings.breakpoints.mixins.gt-mobile\n*/\ngt-mobile()\n    @media (min-width: rem(size-helper('min', BP-small)))\n        {block}\n\n/*\n    gt-tablet()\n\n    Refers to (min-width: 1024px)\n\n    Weight: 4\n\n    Styleguide Settings.breakpoints.mixins.gt-tablet\n*/\ngt-tablet()\n    @media (min-width: rem(size-helper('min', BP-medium)))\n        {block}\n\n/*\n    lt-desktop()\n\n    Refers to medium-screen() which is (max-width: 1023px)\n\n    Weight: 5\n\n    Styleguide Settings.breakpoints.mixins.lt-desktop\n*/\nlt-desktop()\n    +medium-screen()\n        {block}\n// @stylint on\n","@require 'settings/palette.styl'\n\n// Global styles for forms\n.account-connection,\n.account-management\n    display flex\n\n    h3\n        margin 2em 0 .5em\n        font-size(24px)\n\n    a:not([role=button])\n        color           var(--dodgerBlue)\n        text-transform  uppercase\n        text-decoration none\n        cursor          pointer\n\n    p\n        margin .5em 0\n\n.account-connection\n    > div\n        width          50%\n        padding-bottom 2em\n\n.account-management\n    width  70%\n    margin auto\n\n.account-description\n    background-color var(--paleGrey)\n    padding          0 2em\n    > p\n        margin-top 2em\n    .title\n        margin-top 2em\n\n.account-login\n    padding 0 2em\n\n.account-list\n    width 25%\n.account-config\n    .account-field\n        max-width 80%\n\n// specific to account dialog\n.connector-dialog\n    padding-top .5em\n    .dialog-header\n        svg\n            height 4em\n            width  100%\n            margin 1.5em 0\n\n.errors\n    color var(--pomegranate)\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"spin": "spin--1tM1P",
	"shake": "shake--2XjZi"
};

/***/ }),

/***/ "CB1n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescriptionContent", function() { return DescriptionContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4DAK");
/* harmony import */ var styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("N0Cd");
/* harmony import */ var styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





var DescriptionContent = function DescriptionContent(_ref) {
  var cssClassesObject = _ref.cssClassesObject,
      title = _ref.title,
      messages = _ref.messages,
      children = _ref.children,
      hasError = _ref.hasError,
      centerTitle = _ref.centerTitle;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(cssClassesObject)
  }, title && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
    className: centerTitle ? styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default.a['col-account-description-title-centered'] : styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default.a['col-account-description-title']
  }, title), messages && messages.length > 0 && messages.map(function (m, i) {
    return m ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: i,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(styles_descriptionContent_styl__WEBPACK_IMPORTED_MODULE_3___default.a['col-account-description-message'], hasError && 'errors')
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
      source: m
    })) : null;
  }), children);
};
var _default = DescriptionContent;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DescriptionContent, "DescriptionContent", "/Users/cozy/code/cozy/cozy-home/src/components/DescriptionContent.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/DescriptionContent.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "GbhZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_DOCUMENT", function() { return CREATE_DOCUMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchApps", function() { return fetchApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCollection", function() { return fetchCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchDocument", function() { return fetchDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReferencedFiles", function() { return fetchReferencedFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTriggers", function() { return fetchTriggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectors", function() { return fetchKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDocument", function() { return createDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTrigger", function() { return createTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "launchTrigger", function() { return launchTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDocument", function() { return updateDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDocument", function() { return deleteDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTrigger", function() { return deleteTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFile", function() { return createFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trashFile", function() { return trashFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addReferencedFiles", function() { return addReferencedFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeReferencedFiles", function() { return removeReferencedFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeActionCreator", function() { return makeActionCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeFetchMoreAction", function() { return makeFetchMoreAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applySelectorForAction", function() { return applySelectorForAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enhancePropsForActions", function() { return enhancePropsForActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCollection", function() { return getCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocument", function() { return getDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCollectionFetched", function() { return isCollectionFetched; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("fvjX");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("oMPT");
/* harmony import */ var _slices_sharings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("og8P");
/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("skrj");








var APPS_DOCTYPE = 'io.cozy.apps';
var FETCH_DOCUMENT = 'FETCH_DOCUMENT';
var FETCH_COLLECTION = 'FETCH_COLLECTION';
var LAUNCH_TRIGGER = 'LAUNCH_TRIGGER';
var RECEIVE_DATA = 'RECEIVE_DATA';
var RECEIVE_ERROR = 'RECEIVE_ERROR';
var CREATE_DOCUMENT = 'CREATE_DOCUMENT';
var UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
var DELETE_DOCUMENT = 'DELETE_DOCUMENT';
var RECEIVE_APP = 'RECEIVE_APP';
var RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT';
var RECEIVE_UPDATED_DOCUMENT = 'RECEIVE_UPDATED_DOCUMENT';
var RECEIVE_DELETED_DOCUMENT = 'RECEIVE_DELETED_DOCUMENT';
var FETCH_REFERENCED_FILES = 'FETCH_REFERENCED_FILES';
var ADD_REFERENCED_FILES = 'ADD_REFERENCED_FILES';
var REMOVE_REFERENCED_FILES = 'REMOVE_REFERENCED_FILES';

var documents = function documents() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_APP:
      {
        var apps = action.response && action.response.data;
        if (apps.length === 0) return state;
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, APPS_DOCTYPE, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[APPS_DOCTYPE], objectifyDocumentsArray(apps))));
      }

    case RECEIVE_DATA:
      {
        var data = action.response.data;
        if (data.length === 0) return state;
        var dataDoctype = getArrayDoctype(data);
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, dataDoctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[dataDoctype], objectifyDocumentsArray(data))));
      }

    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_UPDATED_DOCUMENT:
      {
        var doc = action.response.data[0];
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, doc._type, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[doc._type], _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, doc.id, doc))));
      }

    case RECEIVE_DELETED_DOCUMENT:
      {
        var deleted = action.response.data[0];
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, deleted._type, Object(_utils__WEBPACK_IMPORTED_MODULE_5__["removeObjectProperty"])(state[deleted._type], deleted.id)));
      }

    case ADD_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        'io.cozy.files': _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state['io.cozy.files'], updateFilesReferences(state['io.cozy.files'], action.ids, action.document))
      });

    case REMOVE_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        'io.cozy.files': _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state['io.cozy.files'], removeFilesReferences(state['io.cozy.files'], action.ids, action.document))
      });

    default:
      return state;
  }
};

var objectifyDocumentsArray = function objectifyDocumentsArray(documents) {
  return documents.reduce(function (obj, doc) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, obj, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, doc.id, doc));
  }, {});
};

var updateFileReference = function updateFileReference(
/* eslint-disable-next-line casecamelcase */
_ref, doc) {
  var _ref$relationships = _ref.relationships,
      referenced_by = _ref$relationships.referenced_by,
      relationships = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref$relationships, ["referenced_by"]),
      file = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["relationships"]);

  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, file, {
    relationships: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, relationships, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, referenced_by.data,
    /* eslint-disable-next-line casecamelcase */
    referenced_by.data === null ? [{
      id: doc.id,
      type: doc.type
    }] :
    /* eslint-disable-next-line casecamelcase */
    [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(referenced_by.data), [{
      id: doc.id,
      type: doc.type
    }])))
  });
};

var updateFilesReferences = function updateFilesReferences(files, newlyReferencedIds, doc) {
  return newlyReferencedIds.reduce(function (updated, id) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, updated, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, id, updateFileReference(files[id], doc)));
  }, {});
};

var removeFileReferences = function removeFileReferences(
/* eslint-disable-next-line casecamelcase */
_ref2, doc) {
  var _ref2$relationships = _ref2.relationships,
      referenced_by = _ref2$relationships.referenced_by,
      relationships = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref2$relationships, ["referenced_by"]),
      file = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref2, ["relationships"]);

  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, file, {
    relationships: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, relationships, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, referenced_by.data, referenced_by.data.filter(function (rel) {
      return rel.type !== doc.type && rel.id !== doc.id;
    })))
  });
};

var removeFilesReferences = function removeFilesReferences(files, removedIds, doc) {
  return removedIds.reduce(function (updated, id) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, updated, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, id, removeFileReferences(files[id], doc)));
  }, {});
};

var getDoctype = function getDoctype(_ref3) {
  var doctype = _ref3._type;

  // TODO: don't know why the stack returns 'file' here..
  if (doctype === 'file') {
    return 'io.cozy.files';
  }

  return doctype;
};

var getArrayDoctype = function getArrayDoctype(documents) {
  return getDoctype(documents[0]);
}; // collection reducers


var collectionInitialState = {
  type: null,
  options: {},
  fetchStatus: 'pending',
  lastFetch: null,
  hasMore: false,
  count: 0,
  ids: []
};

var collection = function collection() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : collectionInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        type: action.doctype || 'io.cozy.files',
        options: action.options,
        fetchStatus: action.skip > 0 ? 'loadingMore' : 'loading'
      });

    case RECEIVE_APP:
    case RECEIVE_DATA:
      {
        var response = action.response;
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
          fetchStatus: 'loaded',
          lastFetch: Date.now(),
          hasMore: response.next !== undefined ? response.next : state.hasMore,
          count: response.meta && response.meta.count ? response.meta.count : response.data.length,
          ids: !action.skip ? response.data.map(function (doc) {
            return doc.id;
          }) : [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(state.ids), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(response.data.map(function (doc) {
            return doc.id;
          })))
        });
      }

    case ADD_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        type: 'io.cozy.files',
        count: state.count + action.ids.length,
        ids: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(state.ids), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(action.ids))
      });

    case REMOVE_REFERENCED_FILES:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        count: state.count - action.ids.length,
        ids: state.ids.filter(function (id) {
          return action.ids.indexOf(id) === -1;
        })
      });

    case RECEIVE_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        fetchStatus: 'failed'
      });

    case RECEIVE_NEW_DOCUMENT:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        ids: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(state.ids), [action.response.data[0].id])
      });

    case RECEIVE_DELETED_DOCUMENT:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        ids: state.ids.filter(function (id) {
          return id !== action.response.data[0].id;
        })
      });

    default:
      return state;
  }
};

var collections = function collections() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var applyUpdate = function applyUpdate(collections, updateAction) {
    return updateAction.updateCollections.reduce(function (updated, name) {
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, updated, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, name, collection(collections[name], action)));
    }, {});
  };

  switch (action.type) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
    case ADD_REFERENCED_FILES:
    case REMOVE_REFERENCED_FILES:
    case RECEIVE_APP:
    case RECEIVE_DATA:
    case RECEIVE_ERROR:
      if (!action.collection) {
        return state;
      }

      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.collection, collection(state[action.collection], action)));

    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_DELETED_DOCUMENT:
      if (!action.updateCollections) {
        return state;
      }

      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, applyUpdate(state, action));

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_4__["combineReducers"])({
  collections: collections,
  documents: documents,
  sharings: _slices_sharings__WEBPACK_IMPORTED_MODULE_6__["default"],
  synchronization: _slices_synchronization__WEBPACK_IMPORTED_MODULE_7__["default"]
}));
var fetchApps = function fetchApps(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_APP, RECEIVE_ERROR],
    collection: name,
    doctype: 'io.cozy.apps',
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchApps(name, options, skip);
    }
  };
};
var fetchCollection = function fetchCollection(name, doctype) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
    collection: name,
    doctype: doctype,
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchCollection(name, doctype, options, skip);
    }
  };
};
var fetchDocument = function fetchDocument(doctype, id) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    types: [FETCH_DOCUMENT, RECEIVE_DATA, RECEIVE_ERROR],
    doctype: doctype,
    id: id,
    options: options,
    promise: function promise(client) {
      return client.fetchDocument(doctype, id);
    }
  };
};
var fetchReferencedFiles = function fetchReferencedFiles(doc) {
  var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    types: [FETCH_REFERENCED_FILES, RECEIVE_DATA, RECEIVE_ERROR],
    collection: "".concat(doc._type, "/").concat(doc.id, "#files"),
    document: doc,
    options: {},
    skip: skip,
    promise: function promise(client) {
      return client.fetchReferencedFiles(doc, skip);
    }
  };
};
var fetchTriggers = function fetchTriggers(name, worker) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
    collection: name,
    doctype: 'io.cozy.triggers',
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchTriggers(name, worker, options, skip);
    }
  };
};
var fetchKonnectors = function fetchKonnectors(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return {
    types: [FETCH_COLLECTION, RECEIVE_DATA, RECEIVE_ERROR],
    collection: name,
    doctype: 'io.cozy.konnectors',
    options: options,
    skip: skip,
    promise: function promise(client) {
      return client.fetchKonnectors(name, options, skip);
    }
  };
};
var createDocument = function createDocument(doctype, doc) {
  var actionOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    doctype: doctype,
    document: doc,
    promise: function promise(client) {
      return client.createDocument(doctype, doc);
    }
  }, actionOptions);
};
var createTrigger = function createTrigger(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.createTrigger(doc);
    }
  }, actionOptions);
};
var launchTrigger = function launchTrigger(trigger) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [LAUNCH_TRIGGER, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    trigger: trigger,
    promise: function promise(client) {
      return client.launchTrigger(trigger);
    }
  }, actionOptions);
};
var updateDocument = function updateDocument(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [UPDATE_DOCUMENT, RECEIVE_UPDATED_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.updateDocument(doc);
    }
  }, actionOptions);
};
var deleteDocument = function deleteDocument(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.deleteDocument(doc);
    }
  }, actionOptions);
};
var deleteTrigger = function deleteTrigger(doc) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
    document: doc,
    promise: function promise(client) {
      return client.deleteTrigger(doc);
    }
  }, actionOptions);
};
var createFile = function createFile(file, dirID) {
  var actionOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [CREATE_DOCUMENT, RECEIVE_NEW_DOCUMENT, RECEIVE_ERROR],
    doctype: 'io.cozy.files',
    promise: function promise(client) {
      return client.createFile(file, dirID);
    }
  }, actionOptions);
};
var trashFile = function trashFile(file) {
  var actionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
    types: [DELETE_DOCUMENT, RECEIVE_DELETED_DOCUMENT, RECEIVE_ERROR],
    document: file,
    promise: function promise(client) {
      return client.trashFile(file);
    }
  }, actionOptions);
};
var addReferencedFiles = function addReferencedFiles(doc, ids) {
  return {
    type: ADD_REFERENCED_FILES,
    collection: "".concat(doc._type, "/").concat(doc._id, "#files"),
    document: doc,
    ids: ids,
    promise: function promise(client) {
      return client.addReferencedFiles(doc, ids);
    }
  };
};
var removeReferencedFiles = function removeReferencedFiles(doc, ids) {
  return {
    type: REMOVE_REFERENCED_FILES,
    collection: "".concat(doc._type, "/").concat(doc._id, "#files"),
    document: doc,
    ids: ids,
    promise: function promise(client) {
      return client.removeReferencedFiles(doc, ids);
    }
  };
};
var makeActionCreator = function makeActionCreator(promise) {
  return {
    promise: promise
  };
};
var makeFetchMoreAction = function makeFetchMoreAction(_ref4, skip) {
  var types = _ref4.types,
      collection = _ref4.collection,
      document = _ref4.document,
      doctype = _ref4.doctype,
      options = _ref4.options;
  return types[0] === FETCH_REFERENCED_FILES ? fetchReferencedFiles(document, skip) : fetchCollection(collection, doctype, options, skip);
};
var applySelectorForAction = function applySelectorForAction(state, action) {
  switch (action.types[0]) {
    case FETCH_COLLECTION:
    case FETCH_REFERENCED_FILES:
      return getCollection(state, action.collection);

    case FETCH_DOCUMENT:
      return getDocument(state, action.doctype, action.id);

    case _slices_sharings__WEBPACK_IMPORTED_MODULE_6__["FETCH_SHARINGS"]:
      return action.id ? Object(_slices_sharings__WEBPACK_IMPORTED_MODULE_6__["getSharingDetails"])(state, action.doctype, action.id, action.options) : Object(_slices_sharings__WEBPACK_IMPORTED_MODULE_6__["getSharings"])(state, action.doctype, action.options);

    default:
      return null;
  }
};
var enhancePropsForActions = function enhancePropsForActions(props, fetchActions, dispatch) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_5__["mapValues"])(fetchActions, function (action, propName) {
    var dataObject = props[propName];

    switch (action.types[0]) {
      case FETCH_COLLECTION:
      case FETCH_REFERENCED_FILES:
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, dataObject, {
          fetchMore: dataObject.hasMore ? function () {
            return dispatch(makeFetchMoreAction(action, dataObject.data.length));
          } : null
        });

      default:
        return dataObject;
    }
  });
}; // selectors

var mapDocumentsToIds = function mapDocumentsToIds(documents, doctype, ids) {
  return ids.map(function (id) {
    return documents[doctype][id];
  });
};

var getCollection = function getCollection(state, name) {
  var collection = state.cozy.collections[name];

  if (!collection) {
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, collectionInitialState, {
      data: null
    });
  }

  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, collection, {
    data: mapDocumentsToIds(state.cozy.documents, collection.type, collection.ids)
  });
};
var getDocument = function getDocument(state, doctype, id) {
  var documents = state.cozy.documents[doctype];

  if (!documents) {
    return null;
  }

  return documents[id];
};
var isCollectionFetched = function isCollectionFetched(state, name) {
  return state.cozy.collections[name] && state.cozy.collections[name].fetchStatus === 'loaded';
};

/***/ }),

/***/ "GdGx":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, ".col-konnector-header-icon-wrapper--1oMyA, .col-konnector-header-icon-wrapper--center--3aLBw {\n  height: 3.5rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.col-konnector-header-icon-wrapper--1oMyA .col-konnector-header-icon--2Yxl_, .col-konnector-header-icon-wrapper--center--3aLBw .col-konnector-header-icon--2Yxl_ {\n  height: 2rem;\n}\n.col-konnector-header-icon-wrapper--1oMyA .col-konnector-header-icon--center--3rGkD, .col-konnector-header-icon-wrapper--center--3aLBw .col-konnector-header-icon--center--3rGkD {\n  height: 3.5rem;\n}\n.col-konnector-header-icon-wrapper--1oMyA img, .col-konnector-header-icon-wrapper--center--3aLBw img {\n  width: auto;\n}\n.col-konnector-header-icon-wrapper--center--3aLBw {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n", "",{"version":3,"sources":["src/styles/konnectorHeaderIcon.styl","konnectorHeaderIcon.styl"],"names":[],"mappings":"AACI;EAEI,cAAO;EACP,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;ACAhB;ADEQ;EACI,YAAO;ACCnB;ADCQ;EACI,cAAO;ACEnB;ADAQ;EACI,WAAM;ACGlB;ADDI;EACI,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;ACGxB","file":"konnectorHeaderIcon.styl","sourcesContent":[":local // @stylint ignore\n    .col-konnector-header-icon-wrapper\n    .col-konnector-header-icon-wrapper--center\n        height 3.5rem\n        display flex\n\n        .col-konnector-header-icon\n            height 2rem\n\n        .col-konnector-header-icon--center\n            height 3.5rem\n\n        img\n            width auto\n\n    .col-konnector-header-icon-wrapper--center\n        justify-content center\n",":local .col-konnector-header-icon-wrapper,\n:local .col-konnector-header-icon-wrapper--center {\n  height: 3.5rem;\n  display: flex;\n}\n:local .col-konnector-header-icon-wrapper .col-konnector-header-icon,\n:local .col-konnector-header-icon-wrapper--center .col-konnector-header-icon {\n  height: 2rem;\n}\n:local .col-konnector-header-icon-wrapper .col-konnector-header-icon--center,\n:local .col-konnector-header-icon-wrapper--center .col-konnector-header-icon--center {\n  height: 3.5rem;\n}\n:local .col-konnector-header-icon-wrapper img,\n:local .col-konnector-header-icon-wrapper--center img {\n  width: auto;\n}\n:local .col-konnector-header-icon-wrapper--center {\n  justify-content: center;\n}\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"col-konnector-header-icon-wrapper": "col-konnector-header-icon-wrapper--1oMyA",
	"col-konnector-header-icon-wrapper--center": "col-konnector-header-icon-wrapper--center--3aLBw",
	"col-konnector-header-icon": "col-konnector-header-icon--2Yxl_",
	"col-konnector-header-icon--center": "col-konnector-header-icon--center--3rGkD"
};

/***/ }),

/***/ "GfxC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadArchive", function() { return downloadArchive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return downloadFile; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);



/* global cozy */
var slugify = function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w-]+/g, '') // Remove all non-word chars
  .replace(/--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '');
}; // Trim - from end of text


var forceFileDownload = function forceFileDownload(href, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', href);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}; // async helpers: they interact with the stack but not with the store


var downloadArchive =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(notSecureFilename, fileIds) {
    var filename, href, fullpath;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filename = slugify(notSecureFilename);
            _context.next = 3;
            return cozy.client.files.getArchiveLinkByIds(fileIds, filename);

          case 3:
            href = _context.sent;
            _context.next = 6;
            return cozy.client.fullpath(href);

          case 6:
            fullpath = _context.sent;
            forceFileDownload(fullpath, filename + '.zip');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadArchive(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var downloadFile =
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(file) {
    var response, blob;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return cozy.client.files.downloadById(file.id);

          case 2:
            response = _context2.sent;
            _context2.next = 5;
            return response.blob();

          case 5:
            blob = _context2.sent;
            forceFileDownload(window.URL.createObjectURL(blob), file.name);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadFile(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "Go3M":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("buk/");
/* harmony import */ var containers_AccountConnection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("wiYS");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("4YEU");
/* harmony import */ var reducers_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("cokx");









(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








var CreateAccountService =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(CreateAccountService, _React$Component);

  function CreateAccountService(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CreateAccountService);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CreateAccountService).call(this, props, context));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onSuccess", function (account) {
      _this.props.endCreation();

      _this.props.onSuccess(account);
    });

    _this.props.startCreation(_this.props.konnector);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CreateAccountService, [{
    key: "render",
    value: function render() {
      var t = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "coz-service-content"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(containers_AccountConnection__WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        onDone: this.onSuccess,
        successButtonLabel: t('intent.service.success.button.label')
      }, this.props)));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return CreateAccountService;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  // infos from route parameters
  var konnector = ownProps.konnector;
  var createdAccount = Object(reducers_index__WEBPACK_IMPORTED_MODULE_13__["getCreatedConnectionAccount"])(state);
  var trigger = Object(reducers_index__WEBPACK_IMPORTED_MODULE_13__["getTriggerByKonnectorAndAccount"])(state, konnector, createdAccount);
  return {
    createdAccount: createdAccount,
    isCreating: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["isCreatingConnection"])(state.connections),
    isRunning: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["isConnectionRunning"])(state.connections, trigger),
    trigger: trigger
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    startCreation: function startCreation() {
      return dispatch(Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["startConnectionCreation"])(ownProps.konnector));
    },
    endCreation: function endCreation() {
      return dispatch(Object(ducks_connections__WEBPACK_IMPORTED_MODULE_12__["endConnectionCreation"])());
    }
  };
};

var _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps, mapDispatchToProps)(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__["translate"])()(CreateAccountService));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CreateAccountService, "CreateAccountService", "/Users/cozy/code/cozy/cozy-home/src/components/services/CreateAccountService.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/Users/cozy/code/cozy/cozy-home/src/components/services/CreateAccountService.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "/Users/cozy/code/cozy/cozy-home/src/components/services/CreateAccountService.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/services/CreateAccountService.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "K4zY":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("LI8k");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("LI8k", function() {
		var newContent = __webpack_require__("LI8k");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "KAKi":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": "7dT6",
	"./en.json": "7dT6",
	"./es": "oway",
	"./es.json": "oway",
	"./fr": "9pOX",
	"./fr.json": "9pOX"
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
webpackContext.id = "KAKi";

/***/ }),

/***/ "LI8k":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, ":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n.col-account-connection-content--Jta1z {\n  padding: 0 2rem;\n}\n@media (max-width: 30rem) {\n  .col-account-connection-content--Jta1z {\n    padding: 0;\n  }\n}\n.col-account-connection-fetching--3rtXV {\n  padding: 0 0 2em;\n  position: relative;\n}\n.col-account-connection-fetching--3rtXV > div {\n  position: relative;\n  -webkit-transform: translateX(-50%) translateY(0);\n          transform: translateX(-50%) translateY(0);\n}\n.col-account-connection-security--1I2Yb {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: top;\n      -ms-flex-align: top;\n          align-items: top;\n  margin-bottom: 0.5rem;\n  margin-top: 1.5rem;\n}\n.col-account-connection-security--1I2Yb svg {\n  max-height: 1.5rem;\n  max-width: 1.5rem;\n  float: left;\n  margin-right: 0.5rem;\n}\n.col-account-connection-editor--1sA6J {\n  text-align: center;\n  color: var(--coolGrey);\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 0.9em;\n}\n", "",{"version":3,"sources":["node_modules/cozy-ui/stylus/settings/palette.styl","konnectorInstall.styl","src/styles/konnectorInstall.styl","node_modules/cozy-ui/stylus/settings/breakpoints.styl"],"names":[],"mappings":"AAoBA;AACI;;;;;;;;;;;;;;KCNC;EDqBD,aAAgB;EAChB,mBAAgB;EAChB,iBAAgB;EAChB,mBAAgB;EAChB,oBAAgB;EAChB,uBAAgB;EAChB,aAAgB;EAChB,6BAAmC;AACnC;;;;;;;;;;;;KCRC;EDqBD,iBAAe;EACf,qBAAe;EACf,qBAAe;EACf,gBAAe;EACf,qBAAe;EACf,sBAAe;EACf,qBAAe;AACf;;;;;;;;;;KCVC;EDqBD,sBAAe;EACf,qBAAe;EACf,kBAAe;EACf,oBAAe;EACf,uBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,oBAAiB;EACjB,oBAAiB;EACjB,gBAAiB;EACjB,wBAAiB;EACjB,sBAAiB;EACjB,gBAAiB;AACjB;;;;;;;;;;KCVC;EDqBD,kBAAe;EACf,mBAAe;EACf,kBAAe;EACf,sBAAe;EACf,gBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,mBAAkB;EAClB,yBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,yBAAkB;EAClB,iBAAkB;AAElB;;;;;;KCfC;ADuBD;;;;;;;;;;KCZC;EDuBD,iCAA+B;EAC/B,4BAAoB;EACpB,8BAAsB;EACtB,+BAAuB;EACvB,wCAAsC;ACrB1C;AClII;EACI,eAAQ;ADoIhB;AErDmE;EAAA;ID5EvD,UAAQ;EDqIlB;AACF;ACpII;EACI,gBAAQ;EACR,kBAAS;ADsIjB;ACrIQ;EACI,kBAAS;EACT,iDAAyB;UAAzB,yCAAyB;ADuIrC;ACrII;EACI,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,sBAAa;MAAb,mBAAa;UAAb,gBAAa;EACb,qBAAc;EACd,kBAAc;ADuItB;ACrII;EACI,kBAAmB;EACnB,iBAAmB;EACnB,WAAa;EACb,oBAAkB;ADuI1B;ACrII;EACI,kBAAgB;EAChB,sBAA8B;EAC9B,aAAgB;EAChB,gBAAgB;EAChB,gBAAgB;ADuIxB","file":"konnectorInstall.styl","sourcesContent":["// @stylint off\n/*------------------------------------*\\\n  Palette\n  =====\n\\*------------------------------------*/\n/*\n    Settings\n\n    Weight: -10\n\n    Styleguide Settings\n*/\n\n/*\n    Colors\n\n    Colors used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n    Styleguide Settings.colors\n*/\n:root\n    /*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n    --white         #FFFFFF\n    --paleGrey      #F5F6F7\n    --silver        #D6D8Da\n    --coolGrey      #95999D\n    --slateGrey     #5D6165\n    --charcoalGrey  #32363F\n    --black         #000000\n    --overlay       rgba(50, 54, 63, .5)\n    /*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n    --zircon       #F5FAFF\n    --hawkesBlue   #EEF5FE\n    --frenchPass   #C2DCFF\n    --azure        #1FA8F1\n    --dodgerBlue   #297EF2\n    --scienceBlue  #0B61D6\n    --puertoRico   #0DCBCF\n    /*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n    --grannyApple  #DEF7E7\n    --weirdGreen   #40DE8E\n    --emerald      #35CE68\n    --malachite    #08b442\n    --seafoamGreen #3DA67E\n    /*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n    --brightSun      #FFC644\n    --texasRose      #FFAE5F\n    --mango          #FF962F\n    --pumpkinOrange  #FF7F1B\n    --blazeOrange    #FC6D00\n    --melon          #FD7461\n    /*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n    --chablis      #FFF2F2\n    --yourPink     #FDCBCB\n    --fushsia      #FC4C83\n    --pomegranate  #F52D2D\n    --monza        #DD0505\n    /*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n    --lavender        #C2ADF4\n    --darkPeriwinkle  #6984CE\n    --purpley         #7F6BEE\n    --portage         #9169F2\n    --lightishPurple  #B449E7\n    --barney          #922BC2\n\n    /*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n\n    /*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n    --primaryColor var(--dodgerBlue)\n    --primaryColorLight #5C9DF5 // lighten(dodgerBlue, 24)\n    --primaryColorLighter #4B93F7\n    --primaryColorLightest #9FC4FB\n    --primaryContrastTextColor var(--white)\n// @stylint on\n",":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n:local .col-account-connection-content {\n  padding: 0 2rem;\n}\n@media (max-width: 30rem) {\n  :local .col-account-connection-content {\n    padding: 0;\n  }\n}\n:local .col-account-connection-fetching {\n  padding: 0 0 2em;\n  position: relative;\n}\n:local .col-account-connection-fetching > div {\n  position: relative;\n  transform: translateX(-50%) translateY(0);\n}\n:local .col-account-connection-security {\n  display: flex;\n  align-items: top;\n  margin-bottom: 0.5rem;\n  margin-top: 1.5rem;\n}\n:local .col-account-connection-security svg {\n  max-height: 1.5rem;\n  max-width: 1.5rem;\n  float: left;\n  margin-right: 0.5rem;\n}\n:local .col-account-connection-editor {\n  text-align: center;\n  color: var(--coolGrey);\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 0.9em;\n}\n","@require 'tools/mixins.styl'\n@require 'settings/breakpoints.styl'\n@require 'settings/palette.styl'\n\n:local // @stylint ignore\n    .col-account-connection-content\n        padding 0 2rem\n\n        +tiny-screen()\n            padding 0\n\n    .col-account-connection-fetching\n        padding 0 0 2em\n        position relative\n        > div\n            position relative // override default Spinner absolute position\n            transform translateX(-50%) translateY(0)\n\n    .col-account-connection-security\n        display      flex\n        align-items  top\n        margin-bottom .5rem\n        margin-top    1.5rem\n\n    .col-account-connection-security svg\n        max-height   rem(24)\n        max-width    rem(24)\n        float        left\n        margin-right rem(8)\n\n    .col-account-connection-editor\n        text-align      center\n        color           var(--coolGrey)\n        margin-top      0\n        margin-bottom   0\n        font-size       .9em\n","@require '../tools/mixins'\n\n/*------------------------------------*\\\n  Breakpoints\n  =====\n\\*------------------------------------*/\n\n// variables\n\nBP-teeny       =  375\nBP-tiny        =  480\nBP-small       =  768\nBP-medium      = 1023\nBP-large       = 1200\nBP-extra-large = 1439\n\n// Standard breakpoints collection for utilities\nbreakpoints = {\n    'none': '',\n    'tiny': 't',\n    'small': 's',\n    'medium': 'm',\n}\n\n/*\n    Breakpoints\n\n    This is the collection of available breakpoint variables:<br><br>\n    - `BP-teeny`         -  375px\n    - `BP-tiny`          -  480px\n    - `BP-small`         -  768px\n    - `BP-medium`        -  1023px\n    - `BP-large`         -  1200px\n    - `BP-extra-large`   -  1439px\n\n    <br>Also we have a standard breakpoints collection meant to be used as suffixes for some utility classes<br>\n\n    If you want a utility class to trigger only at defined breakpoints you can use those:<br><br>\n    - `-t`  - refers to `tiny` breakpoint (max-width: 480px)\n    - `-s`  - refers to `small` breakpoint (max-width: 768px)\n    - `-m`  - refers to `medium` breakpoint (max-width: 1023px)\n\n    Styleguide Settings.breakpoints\n*/\n\n/*\n    Media Queries mixins\n\n    You can use these mixins with no arguments and they will output\n    the desired a `max-width` media-query. Use the direction argument\n    to set it to `min`.\n\n    Styleguide Settings.breakpoints.mixins\n*/\n\n// mixins\n// @stylint off\nsize-helper(direction, size)\n    direction == 'min' ? size + 1 : size\n\n/*\n    teeny-screen()\n\n    teeny-screen() Refers to (max-width: 375px)\n    teeny-screen('min') Refers to (min-width: 376px)\n\n    Weight: -6\n\n    Styleguide Settings.breakpoints.mixins.teeny\n*/\nteeny-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-teeny)))\n        {block}\n\n/*\n    tiny-screen()\n\n    tiny-screen() Refers to (max-width: 480px)\n    tiny-screen('min') Refers to (min-width: 481px)\n\n    Weight: -5\n\n    Styleguide Settings.breakpoints.mixins.tiny\n*/\ntiny-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-tiny)))\n        {block}\n\n/*\n    small-screen()\n\n    small-screen() Refers to (max-width: 768px)\n    small-screen('min') Refers to (min-width: 769px)\n\n    Weight: -4\n\n    Styleguide Settings.breakpoints.mixins.small\n*/\nsmall-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-small)))\n        {block}\n\n/*\n    medium-screen()\n\n    medium-screen() Refers to (max-width: 1023px)\n    medium-screen('min') Refers to (min-width: 1024px)\n\n    Weight: -3\n\n    Styleguide Settings.breakpoints.mixins.medium\n*/\nmedium-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-medium)))\n        {block}\n\n/*\n    large-screen()\n\n    large-screen() Refers to (max-width: 1200px)\n    large-screen('min') Refers to (min-width: 1201px)\n\n    Weight: -2\n\n    Styleguide Settings.breakpoints.mixins.large\n*/\nlarge-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-large)))\n        {block}\n\n/*\n    extra-large-screen()\n\n    extra-large-screen() Refers to (max-width: 1439px)\n    extra-large-screen('min') Refers to (min-width: 1440px)\n\n    Weight: -1\n\n    Styleguide Settings.breakpoints.mixins.extra-large\n*/\nextra-large-screen(direction='max')\n    @media ({direction}-width: rem(size-helper(direction, BP-extra-large)))\n        {block}\n\n// mixins named\n\n/*\n    small-device()\n\n    Refers to (max-width: 543px), (max-height: 375px)\n    Triggers when the viewport has a width smaller than 543px OR a height smaller than 375px\n\n    Weight: 0\n\n    Styleguide Settings.breakpoints.mixins.small-device\n*/\n\nsmall-device()\n    @media (max-width: rem(size-helper('max', BP-tiny))), (max-height: rem(size-helper('max', BP-teeny)))\n        {block}\n\n/*\n    medium-device()\n\n    Refers to (min-width: 543px) and (min-height: 375px)\n    Triggers when the viewport has a width bigger than 543px AND a height bigger than 375px\n\n    Weight: 0\n\n    Styleguide Settings.breakpoints.mixins.medium-device\n*/\n\nmedium-device()\n    @media (min-width: rem(size-helper('min', BP-tiny))) and (min-height: rem(size-helper('min', BP-teeny)))\n        {block}\n\n/*\n    desktop()\n\n    Refers to (min-width: 1024px)\n\n    Weight: 0\n\n    Styleguide Settings.breakpoints.mixins.desktop\n*/\ndesktop()\n    @media (min-width: rem(size-helper('min', BP-medium)))\n        {block}\n\n/*\n    tablet()\n\n    Refers to (min-width: 769px) and (max-width: 1023px)\n\n    Weight: 1\n\n    Styleguide Settings.breakpoints.mixins.tablet\n*/\ntablet()\n    @media (min-width: rem(size-helper('min', BP-small))) and (max-width: rem(size-helper('max', BP-medium)))\n        {block}\n\n/*\n    mobile()\n\n    Refers to small-screen() which is (max-width: 768px)\n\n    Weight: 2\n\n    Styleguide Settings.breakpoints.mixins.mobile\n*/\nmobile()\n    +small-screen()\n        {block}\n\n/*\n    gt-mobile()\n\n    Refers to (min-width: 769px)\n\n    Weight: 3\n\n    Styleguide Settings.breakpoints.mixins.gt-mobile\n*/\ngt-mobile()\n    @media (min-width: rem(size-helper('min', BP-small)))\n        {block}\n\n/*\n    gt-tablet()\n\n    Refers to (min-width: 1024px)\n\n    Weight: 4\n\n    Styleguide Settings.breakpoints.mixins.gt-tablet\n*/\ngt-tablet()\n    @media (min-width: rem(size-helper('min', BP-medium)))\n        {block}\n\n/*\n    lt-desktop()\n\n    Refers to medium-screen() which is (max-width: 1023px)\n\n    Weight: 5\n\n    Styleguide Settings.breakpoints.mixins.lt-desktop\n*/\nlt-desktop()\n    +medium-screen()\n        {block}\n// @stylint on\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"col-account-connection-content": "col-account-connection-content--Jta1z",
	"col-account-connection-fetching": "col-account-connection-fetching--3rtXV",
	"col-account-connection-security": "col-account-connection-security--1I2Yb",
	"col-account-connection-editor": "col-account-connection-editor--1sA6J"
};

/***/ }),

/***/ "Lf2i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONNECTION_STATUS", function() { return CONNECTION_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CollectStore; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lib_triggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("WWPq");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("oBqo");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_realtime__WEBPACK_IMPORTED_MODULE_6__);






/* global cozy */


var CONNECTION_STATUS = {
  ERRORED: 'errored',
  RUNNING: 'running',
  CONNECTED: 'connected'
};
var ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
var JOBS_DOCTYPE = 'io.cozy.jobs';
var TRIGGERS_DOCTYPE = 'io.cozy.triggers';

var normalize = function normalize(dbObject, doctype) {
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, dbObject, dbObject.attributes, {
    id: dbObject._id,
    _type: doctype || dbObject._type
  });
};

var CollectStore =
/*#__PURE__*/
function () {
  function CollectStore(context, client) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, CollectStore);

    this.client = client;
    this.listener = null;
    this.options = options;
    this.categories = __webpack_require__("QxZi");
    this.updateUnfinishedJob = this.updateUnfinishedJob.bind(this);
    this.onAccountCreated = this.onAccountCreated.bind(this);
    this.onAccountUpdated = this.onAccountUpdated.bind(this);
    this.onAccountDeleted = this.onAccountDeleted.bind(this);
    this.onTriggerCreated = this.onTriggerCreated.bind(this);
    this.onTriggerDeleted = this.onTriggerDeleted.bind(this);
    this.initializeRealtime();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(CollectStore, [{
    key: "initializeRealtime",
    value: function initializeRealtime() {
      this.realtime = new cozy_realtime__WEBPACK_IMPORTED_MODULE_6___default.a({
        client: this.client
      });
      this.realtime.subscribe('created', JOBS_DOCTYPE, this.updateUnfinishedJob);
      this.realtime.subscribe('updated', JOBS_DOCTYPE, this.updateUnfinishedJob);
      this.realtime.subscribe('created', ACCOUNTS_DOCTYPE, this.onAccountCreated);
      this.realtime.subscribe('updated', ACCOUNTS_DOCTYPE, this.onAccountUpdated);
      this.realtime.subscribe('deleted', ACCOUNTS_DOCTYPE, this.onAccountDeleted);
      this.realtime.subscribe('created', TRIGGERS_DOCTYPE, this.onTriggerCreated);
      this.realtime.subscribe('deleted', TRIGGERS_DOCTYPE, this.onTriggerDeleted);
    }
  }, {
    key: "onAccountCreated",
    value: function () {
      var _onAccountCreated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(account) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_NEW_DOCUMENT',
                  response: {
                    data: [normalize(account, ACCOUNTS_DOCTYPE)]
                  },
                  updateCollections: ['accounts']
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onAccountCreated(_x) {
        return _onAccountCreated.apply(this, arguments);
      }

      return onAccountCreated;
    }()
  }, {
    key: "onAccountUpdated",
    value: function () {
      var _onAccountUpdated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(account) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_UPDATED_DOCUMENT',
                  response: {
                    data: [normalize(account, ACCOUNTS_DOCTYPE)]
                  },
                  updateCollections: ['accounts']
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onAccountUpdated(_x2) {
        return _onAccountUpdated.apply(this, arguments);
      }

      return onAccountUpdated;
    }()
  }, {
    key: "onAccountDeleted",
    value: function () {
      var _onAccountDeleted = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(account) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_DELETED_DOCUMENT',
                  response: {
                    data: [normalize(account, ACCOUNTS_DOCTYPE)]
                  },
                  updateCollections: ['accounts']
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onAccountDeleted(_x3) {
        return _onAccountDeleted.apply(this, arguments);
      }

      return onAccountDeleted;
    }()
  }, {
    key: "onTriggerCreated",
    value: function () {
      var _onTriggerCreated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(trigger) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_NEW_DOCUMENT',
                  response: {
                    data: [normalize(trigger, TRIGGERS_DOCTYPE)]
                  },
                  updateCollections: ['triggers']
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onTriggerCreated(_x4) {
        return _onTriggerCreated.apply(this, arguments);
      }

      return onTriggerCreated;
    }()
  }, {
    key: "onTriggerUpdated",
    value: function () {
      var _onTriggerUpdated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(trigger) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_UPDATED_DOCUMENT',
                  response: {
                    data: [normalize(trigger, TRIGGERS_DOCTYPE)]
                  },
                  updateCollections: ['triggers']
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onTriggerUpdated(_x5) {
        return _onTriggerUpdated.apply(this, arguments);
      }

      return onTriggerUpdated;
    }()
  }, {
    key: "onTriggerDeleted",
    value: function () {
      var _onTriggerDeleted = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(trigger) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.dispatch({
                  type: 'RECEIVE_DELETED_DOCUMENT',
                  response: {
                    data: [normalize(trigger, TRIGGERS_DOCTYPE)]
                  },
                  updateCollections: ['triggers']
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onTriggerDeleted(_x6) {
        return _onTriggerDeleted.apply(this, arguments);
      }

      return onTriggerDeleted;
    }()
  }, {
    key: "updateUnfinishedJob",
    value: function () {
      var _updateUnfinishedJob = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(job) {
        var normalizedJob, isKonnectorJob, isDeletedAccountHookJob, trigger;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                normalizedJob = normalize(job, JOBS_DOCTYPE); // TODO Filter by worker on the WebSocket when it will be available in the
                // stack

                isKonnectorJob = normalizedJob.worker === 'konnector';
                isDeletedAccountHookJob = !!normalizedJob.account_deleted;

                if (!(!isKonnectorJob || isDeletedAccountHookJob)) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return");

              case 5:
                this.dispatch({
                  type: 'RECEIVE_NEW_DOCUMENT',
                  response: {
                    data: [normalizedJob]
                  },
                  updateCollections: ['jobs']
                });
                _context7.next = 8;
                return lib_triggers__WEBPACK_IMPORTED_MODULE_5__["fetch"](cozy.client, normalizedJob.trigger_id);

              case 8:
                trigger = _context7.sent;
                this.onTriggerUpdated(trigger);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function updateUnfinishedJob(_x7) {
        return _updateUnfinishedJob.apply(this, arguments);
      }

      return updateUnfinishedJob;
    }()
  }, {
    key: "createIntentService",
    value: function createIntentService(intent, window) {
      return cozy.client.intents.createService(intent, window);
    } // Get the drive and banks application url using the list of application

  }, {
    key: "fetchUrls",
    value: function fetchUrls() {
      var _this = this;

      return cozy.client.fetchJSON('GET', '/apps/').then(function (body) {
        body.forEach(function (item) {
          if (!item.attributes || !item.attributes.slug || !item.links) return;

          switch (item.attributes.slug) {
            case 'banks':
              _this.banksUrl = "".concat(item.links.related);
              break;

            default:
              break;
          }
        });
      }).catch(function (err) {
        // eslint-disable-next-line no-console
        console.warn(err.message);
        return false;
      });
    }
  }]);

  return CollectStore;
}();



/***/ }),

/***/ "Lo76":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4DAK");
/* harmony import */ var styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("91CF");
/* harmony import */ var styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






var KonnectorMaintenance = function KonnectorMaintenance(_ref) {
  var t = _ref.t,
      maintenance = _ref.maintenance,
      lang = _ref.lang,
      konnectorName = _ref.konnectorName;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-intro']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-icon']
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-service']
  }, t('maintenance.service')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-problem']
  }, t('maintenance.problem', {
    konnectorName: konnectorName
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-title']
  }, t('maintenance.title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: styles_konnectorMaintenance_styl__WEBPACK_IMPORTED_MODULE_3___default.a['maintenance-message'],
    source: maintenance.message[lang] || maintenance.message['en']
  }));
};

var _default = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(KonnectorMaintenance);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(KonnectorMaintenance, "KonnectorMaintenance", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorMaintenance.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorMaintenance.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "N0Cd":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("Qglo");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("Qglo", function() {
		var newContent = __webpack_require__("Qglo");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "ONtV":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("TEgB");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("TEgB", function() {
		var newContent = __webpack_require__("TEgB");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "OiML":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CozyClient; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _DataAccessFacade__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("+tca");
/* harmony import */ var _authentication_mobile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("AEoj");









/* global cozy */


var APPS_DOCTYPE = 'io.cozy.apps';
var FILES_DOCTYPE = 'io.cozy.files';
var TRIGGERS_DOCTYPE = 'io.cozy.triggers';
var KONNECTORS_DOCTYPE = 'io.cozy.konnectors';
var SHARINGS_DOCTYPE = 'io.cozy.sharings';

var CozyClient =
/*#__PURE__*/
function () {
  function CozyClient(config) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, CozyClient);

    var cozyURL = config.cozyURL,
        options = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5___default()(config, ["cozyURL"]);

    this.options = options;
    this.indexes = {};
    this.specialDirectories = {};
    this.facade = new _DataAccessFacade__WEBPACK_IMPORTED_MODULE_8__["default"]();

    if (cozyURL) {
      this.facade.setup(cozyURL, options);
    }
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(CozyClient, [{
    key: "register",
    value: function register(cozyUrl) {
      this.facade.setup(cozyUrl, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, this.options, {
        oauth: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, this.options.oauth, {
          onRegistered: function onRegistered(client, url) {
            return Object(_authentication_mobile__WEBPACK_IMPORTED_MODULE_9__["authenticateWithCordova"])(url);
          }
        })
      }));
      return cozy.client.authorize(true);
    }
  }, {
    key: "isRegistered",
    value: function () {
      var _isRegistered = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(clientInfos) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (clientInfos) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return cozy.client.auth.getClient(clientInfos);

              case 5:
                return _context.abrupt("return", true);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);

                if (!(_context.t0.message === 'Failed to fetch')) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", true);

              case 14:
                console.warn(_context.t0); // eslint-disable-line no-console

                return _context.abrupt("return", false);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 8]]);
      }));

      function isRegistered(_x) {
        return _isRegistered.apply(this, arguments);
      }

      return isRegistered;
    }()
  }, {
    key: "startSync",
    value: function startSync(dispatch) {
      return this.facade.startSync(dispatch);
    }
  }, {
    key: "startReplicationTo",
    value: function startReplicationTo(dispatch) {
      return this.facade.startReplicationTo(dispatch);
    }
  }, {
    key: "startReplicationFrom",
    value: function startReplicationFrom(dispatch) {
      return this.facade.startReplicationFrom(dispatch);
    }
  }, {
    key: "getAdapter",
    value: function getAdapter(doctype) {
      return this.facade.getAdapter(doctype);
    }
  }, {
    key: "fetchApps",
    value: function () {
      var _fetchApps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.getAdapter(APPS_DOCTYPE).fetchApps());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchApps() {
        return _fetchApps.apply(this, arguments);
      }

      return fetchApps;
    }()
  }, {
    key: "fetchCollection",
    value: function () {
      var _fetchCollection = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3(name, doctype) {
        var options,
            skip,
            index,
            _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                skip = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : 0;

                if (!options.selector) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 5;
                return this.getCollectionIndex(name, doctype, options);

              case 5:
                index = _context3.sent;
                return _context3.abrupt("return", this.getAdapter(doctype).queryDocuments(doctype, index, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_4___default()({}, options, {
                  skip: skip
                })));

              case 7:
                return _context3.abrupt("return", this.getAdapter(doctype).fetchDocuments(doctype));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchCollection(_x2, _x3) {
        return _fetchCollection.apply(this, arguments);
      }

      return fetchCollection;
    }()
  }, {
    key: "fetchDocument",
    value: function fetchDocument(doctype, id) {
      return this.getAdapter(doctype).fetchDocument(doctype, id);
    }
  }, {
    key: "fetchFile",
    value: function fetchFile(id) {
      return this.getAdapter(FILES_DOCTYPE).fetchFile(id);
    }
  }, {
    key: "fetchReferencedFiles",
    value: function fetchReferencedFiles(doc) {
      var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this.getAdapter(doc._type).fetchReferencedFiles(doc, skip);
    }
  }, {
    key: "fetchTriggers",
    value: function fetchTriggers(name, worker) {
      return this.getAdapter(TRIGGERS_DOCTYPE).fetchTriggers(worker);
    }
  }, {
    key: "fetchKonnectors",
    value: function fetchKonnectors() {
      return this.getAdapter(KONNECTORS_DOCTYPE).fetchKonnectors();
    }
  }, {
    key: "addReferencedFiles",
    value: function addReferencedFiles(doc, ids) {
      return this.getAdapter(doc._type).addReferencedFiles(doc, ids);
    }
  }, {
    key: "removeReferencedFiles",
    value: function removeReferencedFiles(doc, ids) {
      return this.getAdapter(doc._type).removeReferencedFiles(doc, ids);
    }
  }, {
    key: "createDocument",
    value: function createDocument(doctype, doc) {
      return this.getAdapter(doctype).createDocument(doctype, doc);
    }
  }, {
    key: "createTrigger",
    value: function createTrigger(doc) {
      return this.getAdapter(doc._type).createTrigger(doc);
    }
  }, {
    key: "launchTrigger",
    value: function launchTrigger(doc) {
      return this.getAdapter(doc._type).launchTrigger(doc);
    }
  }, {
    key: "updateDocument",
    value: function updateDocument(doc) {
      return this.getAdapter(doc._type).updateDocument(doc);
    }
  }, {
    key: "deleteDocument",
    value: function deleteDocument(doc) {
      return this.getAdapter(doc._type).deleteDocument(doc);
    }
  }, {
    key: "deleteTrigger",
    value: function deleteTrigger(doc) {
      return this.getAdapter(doc._type).deleteTrigger(doc);
    }
  }, {
    key: "fetchSharings",
    value: function () {
      var _fetchSharings = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4(doctype) {
        var _this = this;

        var permissions, sharingIds, sharings;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getAdapter(doctype).fetchSharingPermissions(doctype);

              case 2:
                permissions = _context4.sent;
                sharingIds = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(permissions.byMe.map(function (p) {
                  return p.attributes.source_id;
                })), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(permissions.withMe.map(function (p) {
                  return p.attributes.source_id;
                })));
                _context4.next = 6;
                return Promise.all(sharingIds.map(function (id) {
                  return _this.getAdapter(SHARINGS_DOCTYPE).fetchSharing(id);
                }));

              case 6:
                sharings = _context4.sent;
                return _context4.abrupt("return", {
                  permissions: permissions,
                  sharings: sharings
                });

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchSharings(_x4) {
        return _fetchSharings.apply(this, arguments);
      }

      return fetchSharings;
    }()
  }, {
    key: "createSharing",
    value: function createSharing(permissions, contactIds, sharingType, description) {
      return this.getAdapter(SHARINGS_DOCTYPE).createSharing(permissions, contactIds, sharingType, description);
    }
  }, {
    key: "revokeSharing",
    value: function revokeSharing(sharingId) {
      return this.getAdapter(SHARINGS_DOCTYPE).revokeSharing(sharingId);
    }
  }, {
    key: "revokeSharingForClient",
    value: function revokeSharingForClient(sharingId, clientId) {
      return this.getAdapter(SHARINGS_DOCTYPE).revokeSharingForClient(sharingId, clientId);
    }
  }, {
    key: "createSharingLink",
    value: function createSharingLink(permissions) {
      return this.getAdapter(SHARINGS_DOCTYPE).createSharingLink(permissions);
    }
  }, {
    key: "revokeSharingLink",
    value: function revokeSharingLink(permission) {
      return this.getAdapter(SHARINGS_DOCTYPE).revokeSharingLink(permission);
    }
  }, {
    key: "createFile",
    value: function createFile(file, dirID) {
      return this.getAdapter(FILES_DOCTYPE).createFile(file, dirID);
    }
  }, {
    key: "trashFile",
    value: function trashFile(file) {
      return this.getAdapter(FILES_DOCTYPE).trashFile(file);
    }
  }, {
    key: "ensureDirectoryExists",
    value: function () {
      var _ensureDirectoryExists = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5(path) {
        var dir;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.specialDirectories[path]) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 3;
                return cozy.client.files.createDirectoryByPath(path);

              case 3:
                dir = _context5.sent;
                this.specialDirectories[path] = dir._id;

              case 5:
                return _context5.abrupt("return", this.specialDirectories[path]);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function ensureDirectoryExists(_x5) {
        return _ensureDirectoryExists.apply(this, arguments);
      }

      return ensureDirectoryExists;
    }()
  }, {
    key: "checkUniquenessOf",
    value: function () {
      var _checkUniquenessOf = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6(doctype, property, value) {
        var index, existingDocs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getUniqueIndex(doctype, property);

              case 2:
                index = _context6.sent;
                _context6.next = 5;
                return cozy.client.data.query(index, {
                  selector: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, property, value),
                  fields: ['_id']
                });

              case 5:
                existingDocs = _context6.sent;
                return _context6.abrupt("return", existingDocs.length === 0);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkUniquenessOf(_x6, _x7, _x8) {
        return _checkUniquenessOf.apply(this, arguments);
      }

      return checkUniquenessOf;
    }()
  }, {
    key: "getCollectionIndex",
    value: function () {
      var _getCollectionIndex = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7(name, doctype, options) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.indexes[name]) {
                  _context7.next = 4;
                  break;
                }

                _context7.next = 3;
                return this.getAdapter(doctype).createIndex(doctype, this.getIndexFields(options));

              case 3:
                this.indexes[name] = _context7.sent;

              case 4:
                return _context7.abrupt("return", this.indexes[name]);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getCollectionIndex(_x9, _x10, _x11) {
        return _getCollectionIndex.apply(this, arguments);
      }

      return getCollectionIndex;
    }()
  }, {
    key: "getUniqueIndex",
    value: function () {
      var _getUniqueIndex = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee8(doctype, property) {
        var name;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                name = "".concat(doctype, "/").concat(property);

                if (this.indexes[name]) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 4;
                return this.getAdapter(doctype).createIndex(doctype, [property]);

              case 4:
                this.indexes[name] = _context8.sent;

              case 5:
                return _context8.abrupt("return", this.indexes[name]);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getUniqueIndex(_x12, _x13) {
        return _getUniqueIndex.apply(this, arguments);
      }

      return getUniqueIndex;
    }()
  }, {
    key: "getIndexFields",
    value: function getIndexFields(options) {
      var selector = options.selector,
          sort = options.sort;

      if (sort) {
        // We filter possible duplicated fields
        return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(Object.keys(selector)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(Object.keys(sort))).filter(function (f, i, arr) {
          return arr.indexOf(f) === i;
        });
      }

      return Object.keys(selector);
    }
  }]);

  return CozyClient;
}();



/***/ }),

/***/ "Qglo":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, ".col-account-description-title--vVTHU,\n.col-account-description-title-centered--32S1O {\n  margin: 1.1rem 0 0.5rem;\n  font-size: 1.125rem;\n}\n.col-account-description-title-centered--32S1O {\n  text-align: center;\n}\n.col-account-description-message--ZyZtK {\n  margin: 0.5rem 0;\n}\n.col-account-description-message--ZyZtK p {\n  margin: 0.5rem 0;\n}\n", "",{"version":3,"sources":["src/styles/descriptionContent.styl","descriptionContent.styl"],"names":[],"mappings":"AAAA;;EACI,uBAAO;EACP,mBAAU;ACEd;ADAA;EACI,kBAAW;ACEf;ADAA;EACI,gBAAO;ACEX;ADDI;EACI,gBAAO;ACGf","file":"descriptionContent.styl","sourcesContent":[".col-account-description-title, .col-account-description-title-centered\n    margin 1.1rem 0 .5rem\n    font-size 1.125rem\n\n.col-account-description-title-centered\n    text-align center\n\n.col-account-description-message\n    margin .5rem 0\n    p\n        margin .5rem 0\n",".col-account-description-title,\n.col-account-description-title-centered {\n  margin: 1.1rem 0 0.5rem;\n  font-size: 1.125rem;\n}\n.col-account-description-title-centered {\n  text-align: center;\n}\n.col-account-description-message {\n  margin: 0.5rem 0;\n}\n.col-account-description-message p {\n  margin: 0.5rem 0;\n}\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"col-account-description-title": "col-account-description-title--vVTHU",
	"col-account-description-title-centered": "col-account-description-title-centered--32S1O",
	"col-account-description-message": "col-account-description-message--ZyZtK"
};

/***/ }),

/***/ "QxZi":
/***/ (function(module) {

module.exports = ["energy","insurance","isp","shopping","telecom","transport","banking","public_service"];

/***/ }),

/***/ "TEgB":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, ":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n.col-trigger-folder--3s1fX {\n  margin-top: 2rem;\n  position: relative;\n}\n.col-trigger-folder-link--2Fkdb {\n  color: var(--dodgerBlue);\n  text-decoration: none;\n  font-weight: bold;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n", "",{"version":3,"sources":["node_modules/cozy-ui/stylus/settings/palette.styl","triggerFolderLink.styl","src/styles/triggerFolderLink.styl"],"names":[],"mappings":"AAoBA;AACI;;;;;;;;;;;;;;KCNC;EDqBD,aAAgB;EAChB,mBAAgB;EAChB,iBAAgB;EAChB,mBAAgB;EAChB,oBAAgB;EAChB,uBAAgB;EAChB,aAAgB;EAChB,6BAAmC;AACnC;;;;;;;;;;;;KCRC;EDqBD,iBAAe;EACf,qBAAe;EACf,qBAAe;EACf,gBAAe;EACf,qBAAe;EACf,sBAAe;EACf,qBAAe;AACf;;;;;;;;;;KCVC;EDqBD,sBAAe;EACf,qBAAe;EACf,kBAAe;EACf,oBAAe;EACf,uBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,oBAAiB;EACjB,oBAAiB;EACjB,gBAAiB;EACjB,wBAAiB;EACjB,sBAAiB;EACjB,gBAAiB;AACjB;;;;;;;;;;KCVC;EDqBD,kBAAe;EACf,mBAAe;EACf,kBAAe;EACf,sBAAe;EACf,gBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,mBAAkB;EAClB,yBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,yBAAkB;EAClB,iBAAkB;AAElB;;;;;;KCfC;ADuBD;;;;;;;;;;KCZC;EDuBD,iCAA+B;EAC/B,4BAAoB;EACpB,8BAAsB;EACtB,+BAAuB;EACvB,wCAAsC;ACrB1C;ACpII;EACI,gBAAY;EACZ,kBAAY;ADsIpB;ACpIQ;EACI,wBAAsB;EACtB,qBAAgB;EAChB,iBAAY;EACZ,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,yBAAY;MAAZ,sBAAY;UAAZ,mBAAY;ADsIxB","file":"triggerFolderLink.styl","sourcesContent":["// @stylint off\n/*------------------------------------*\\\n  Palette\n  =====\n\\*------------------------------------*/\n/*\n    Settings\n\n    Weight: -10\n\n    Styleguide Settings\n*/\n\n/*\n    Colors\n\n    Colors used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n    Styleguide Settings.colors\n*/\n:root\n    /*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n    --white         #FFFFFF\n    --paleGrey      #F5F6F7\n    --silver        #D6D8Da\n    --coolGrey      #95999D\n    --slateGrey     #5D6165\n    --charcoalGrey  #32363F\n    --black         #000000\n    --overlay       rgba(50, 54, 63, .5)\n    /*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n    --zircon       #F5FAFF\n    --hawkesBlue   #EEF5FE\n    --frenchPass   #C2DCFF\n    --azure        #1FA8F1\n    --dodgerBlue   #297EF2\n    --scienceBlue  #0B61D6\n    --puertoRico   #0DCBCF\n    /*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n    --grannyApple  #DEF7E7\n    --weirdGreen   #40DE8E\n    --emerald      #35CE68\n    --malachite    #08b442\n    --seafoamGreen #3DA67E\n    /*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n    --brightSun      #FFC644\n    --texasRose      #FFAE5F\n    --mango          #FF962F\n    --pumpkinOrange  #FF7F1B\n    --blazeOrange    #FC6D00\n    --melon          #FD7461\n    /*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n    --chablis      #FFF2F2\n    --yourPink     #FDCBCB\n    --fushsia      #FC4C83\n    --pomegranate  #F52D2D\n    --monza        #DD0505\n    /*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n    --lavender        #C2ADF4\n    --darkPeriwinkle  #6984CE\n    --purpley         #7F6BEE\n    --portage         #9169F2\n    --lightishPurple  #B449E7\n    --barney          #922BC2\n\n    /*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n\n    /*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n    --primaryColor var(--dodgerBlue)\n    --primaryColorLight #5C9DF5 // lighten(dodgerBlue, 24)\n    --primaryColorLighter #4B93F7\n    --primaryColorLightest #9FC4FB\n    --primaryContrastTextColor var(--white)\n// @stylint on\n",":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n:local .col-trigger-folder {\n  margin-top: 2rem;\n  position: relative;\n}\n:local .col-trigger-folder-link {\n  color: var(--dodgerBlue);\n  text-decoration: none;\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n}\n","@require 'settings/palette.styl'\n\n:local // @stylint ignore\n    .col-trigger-folder\n        margin-top  2rem\n        position    relative\n\n        &-link\n            color var(--dodgerBlue)\n            text-decoration none\n            font-weight bold\n            display flex\n            align-items center\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"col-trigger-folder": "col-trigger-folder--3s1fX",
	"col-trigger-folder-link": "col-trigger-folder-link--2Fkdb"
};

/***/ }),

/***/ "UGnq":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, ":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n.maintenance-intro--1-SbJ {\n  text-align: center;\n  color: var(--pomegranate);\n  margin: 1rem auto;\n}\n.maintenance-service--1ZZfz {\n  font-size: 1.125rem;\n}\n.maintenance-icon--2QHy- {\n  width: 6.25rem;\n  height: 6.25rem;\n  margin: 0 auto;\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NiA5NiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZjkzMDB9LmNscy00e2ZpbGw6I2ZmZDc5OX08L3N0eWxlPjwvZGVmcz48ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04NCA4NS41aDN2LTQ4YTcuNSA3LjUgMCAwIDAtNy41LTcuNWgtNjNBNy41IDcuNSAwIDAgMCA5IDM3LjV2NDh6Ii8+PHBhdGggZD0iTTE2LjUgMzYuNzVBMS40OCAxLjQ4IDAgMCAwIDE1IDM4LjJ2NDIuMWExLjQ4IDEuNDggMCAwIDAgMS41IDEuNDVoNjNBMS40OCAxLjQ4IDAgMCAwIDgxIDgwLjNWMzguMmExLjQ4IDEuNDggMCAwIDAtMS41LTEuNDV6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTkxLjUgODUuNWgtODdBMS41IDEuNSAwIDAgMCAzIDg3djEuNWE3LjUgNy41IDAgMCAwIDcuNSA3LjVoNzVhNy41IDcuNSAwIDAgMCA3LjUtNy41Vjg3YTEuNSAxLjUgMCAwIDAtMS41LTEuNXoiIGZpbGw9IiNmZjdmMWIiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0zNiAzMHYtOWgxMC41djE1aDNWMjFIODRhMS41IDEuNSAwIDAgMCAxLjA2LTIuNTZsLTEyLTEyYTEuNCAxLjQgMCAwIDAtLjQ0LS4yOS4zOS4zOSAwIDAgMC0uMTQtLjA1IDEuMjMgMS4yMyAwIDAgMC0uMzktLjFIMzZWMS41QTEuNSAxLjUgMCAwIDAgMzQuNSAwaC0xMkExLjUgMS41IDAgMCAwIDIxIDEuNVY2aC0zYTEuNSAxLjUgMCAwIDAtMS4wNi40NGwtMTIgMTJBMS41IDEuNSAwIDAgMCA2IDIxaDE1djl6bTM3LjUtMTguODhMODAuMzggMThINzMuNXpNNzAuNSA5djYuODhMNjMuNjIgOXptLTkgMi4xMkw2OC4zOCAxOEg2MS41ek01OC41IDl2Ni44OEw1MS42MiA5em0tOSAyLjEyTDU2LjM4IDE4SDQ5LjV6TTQ2LjUgOXY2Ljg4TDM5LjYyIDl6TTM2IDkuNjJMNDQuMzggMThIMzZ6TTIxIDE4SDkuNjJsOS05SDIxek01MC41MyA0Ny41OWwzLTMtMi4xMi0yLjEyTDQ4IDQ1Ljg4bC0yLjM4LTIuMzggMy40NC0zLjQ0QTEuNSAxLjUgMCAwIDAgNDkuNSAzOXYtM2gtM3YyLjM4bC00LjA2IDQuMDZhMS40OSAxLjQ5IDAgMCAwIDAgMi4xMmwzIDMtNi43MSAxMWg0LjM5bDQuODgtOC45IDUuNjkgOC44NGgzLjd6Ii8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDggNzguNmExMy41IDEzLjUgMCAxIDAtMTMuNS0xMy41QTEzLjQ5IDEzLjQ5IDAgMCAwIDQ4IDc4LjZ6Ii8+PGNpcmNsZSBjbGFzcz0iY2xzLTQiIGN4PSI0OCIgY3k9IjYwLjk1IiByPSI1LjE5Ii8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMzguMjMgNzFhMTEuNDMgMTEuNDMgMCAwIDAgMTkuNTQgMCAuNTQuNTQgMCAwIDAtLjExLS4yNiA3LjM2IDcuMzYgMCAwIDAtNi0yLjU1aC03LjI5YTcuMzYgNy4zNiAwIDAgMC02IDIuNTUuNTQuNTQgMCAwIDAtLjExLjI2eiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI3IDEzLjVoM3YzaC0zeiIvPjwvZz48L3N2Zz4=\") 0 no-repeat;\n}\n", "",{"version":3,"sources":["node_modules/cozy-ui/stylus/settings/palette.styl","konnectorMaintenance.styl","src/styles/konnectorMaintenance.styl"],"names":[],"mappings":"AAoBA;AACI;;;;;;;;;;;;;;KCNC;EDqBD,aAAgB;EAChB,mBAAgB;EAChB,iBAAgB;EAChB,mBAAgB;EAChB,oBAAgB;EAChB,uBAAgB;EAChB,aAAgB;EAChB,6BAAmC;AACnC;;;;;;;;;;;;KCRC;EDqBD,iBAAe;EACf,qBAAe;EACf,qBAAe;EACf,gBAAe;EACf,qBAAe;EACf,sBAAe;EACf,qBAAe;AACf;;;;;;;;;;KCVC;EDqBD,sBAAe;EACf,qBAAe;EACf,kBAAe;EACf,oBAAe;EACf,uBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,oBAAiB;EACjB,oBAAiB;EACjB,gBAAiB;EACjB,wBAAiB;EACjB,sBAAiB;EACjB,gBAAiB;AACjB;;;;;;;;;;KCVC;EDqBD,kBAAe;EACf,mBAAe;EACf,kBAAe;EACf,sBAAe;EACf,gBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,mBAAkB;EAClB,yBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,yBAAkB;EAClB,iBAAkB;AAElB;;;;;;KCfC;ADuBD;;;;;;;;;;KCZC;EDuBD,iCAA+B;EAC/B,4BAAoB;EACpB,8BAAsB;EACtB,+BAAuB;EACvB,wCAAsC;ACrB1C;ACpII;EACI,kBAAW;EACX,yBAAuB;EACvB,iBAAO;ADsIf;ACpII;EACI,mBAAU;ADsIlB;ACpII;EACI,cAAM;EACN,eAAO;EACP,cAAO;EACP,i/DAA0D;ADsIlE","file":"konnectorMaintenance.styl","sourcesContent":["// @stylint off\n/*------------------------------------*\\\n  Palette\n  =====\n\\*------------------------------------*/\n/*\n    Settings\n\n    Weight: -10\n\n    Styleguide Settings\n*/\n\n/*\n    Colors\n\n    Colors used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n    Styleguide Settings.colors\n*/\n:root\n    /*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n    --white         #FFFFFF\n    --paleGrey      #F5F6F7\n    --silver        #D6D8Da\n    --coolGrey      #95999D\n    --slateGrey     #5D6165\n    --charcoalGrey  #32363F\n    --black         #000000\n    --overlay       rgba(50, 54, 63, .5)\n    /*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n    --zircon       #F5FAFF\n    --hawkesBlue   #EEF5FE\n    --frenchPass   #C2DCFF\n    --azure        #1FA8F1\n    --dodgerBlue   #297EF2\n    --scienceBlue  #0B61D6\n    --puertoRico   #0DCBCF\n    /*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n    --grannyApple  #DEF7E7\n    --weirdGreen   #40DE8E\n    --emerald      #35CE68\n    --malachite    #08b442\n    --seafoamGreen #3DA67E\n    /*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n    --brightSun      #FFC644\n    --texasRose      #FFAE5F\n    --mango          #FF962F\n    --pumpkinOrange  #FF7F1B\n    --blazeOrange    #FC6D00\n    --melon          #FD7461\n    /*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n    --chablis      #FFF2F2\n    --yourPink     #FDCBCB\n    --fushsia      #FC4C83\n    --pomegranate  #F52D2D\n    --monza        #DD0505\n    /*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n    --lavender        #C2ADF4\n    --darkPeriwinkle  #6984CE\n    --purpley         #7F6BEE\n    --portage         #9169F2\n    --lightishPurple  #B449E7\n    --barney          #922BC2\n\n    /*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n\n    /*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n    --primaryColor var(--dodgerBlue)\n    --primaryColorLight #5C9DF5 // lighten(dodgerBlue, 24)\n    --primaryColorLighter #4B93F7\n    --primaryColorLightest #9FC4FB\n    --primaryContrastTextColor var(--white)\n// @stylint on\n",":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n:local .maintenance-intro {\n  text-align: center;\n  color: var(--pomegranate);\n  margin: 1rem auto;\n}\n:local .maintenance-service {\n  font-size: 1.125rem;\n}\n:local .maintenance-icon {\n  width: 6.25rem;\n  height: 6.25rem;\n  margin: 0 auto;\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NiA5NiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZjkzMDB9LmNscy00e2ZpbGw6I2ZmZDc5OX08L3N0eWxlPjwvZGVmcz48ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04NCA4NS41aDN2LTQ4YTcuNSA3LjUgMCAwIDAtNy41LTcuNWgtNjNBNy41IDcuNSAwIDAgMCA5IDM3LjV2NDh6Ii8+PHBhdGggZD0iTTE2LjUgMzYuNzVBMS40OCAxLjQ4IDAgMCAwIDE1IDM4LjJ2NDIuMWExLjQ4IDEuNDggMCAwIDAgMS41IDEuNDVoNjNBMS40OCAxLjQ4IDAgMCAwIDgxIDgwLjNWMzguMmExLjQ4IDEuNDggMCAwIDAtMS41LTEuNDV6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTkxLjUgODUuNWgtODdBMS41IDEuNSAwIDAgMCAzIDg3djEuNWE3LjUgNy41IDAgMCAwIDcuNSA3LjVoNzVhNy41IDcuNSAwIDAgMCA3LjUtNy41Vjg3YTEuNSAxLjUgMCAwIDAtMS41LTEuNXoiIGZpbGw9IiNmZjdmMWIiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0zNiAzMHYtOWgxMC41djE1aDNWMjFIODRhMS41IDEuNSAwIDAgMCAxLjA2LTIuNTZsLTEyLTEyYTEuNCAxLjQgMCAwIDAtLjQ0LS4yOS4zOS4zOSAwIDAgMC0uMTQtLjA1IDEuMjMgMS4yMyAwIDAgMC0uMzktLjFIMzZWMS41QTEuNSAxLjUgMCAwIDAgMzQuNSAwaC0xMkExLjUgMS41IDAgMCAwIDIxIDEuNVY2aC0zYTEuNSAxLjUgMCAwIDAtMS4wNi40NGwtMTIgMTJBMS41IDEuNSAwIDAgMCA2IDIxaDE1djl6bTM3LjUtMTguODhMODAuMzggMThINzMuNXpNNzAuNSA5djYuODhMNjMuNjIgOXptLTkgMi4xMkw2OC4zOCAxOEg2MS41ek01OC41IDl2Ni44OEw1MS42MiA5em0tOSAyLjEyTDU2LjM4IDE4SDQ5LjV6TTQ2LjUgOXY2Ljg4TDM5LjYyIDl6TTM2IDkuNjJMNDQuMzggMThIMzZ6TTIxIDE4SDkuNjJsOS05SDIxek01MC41MyA0Ny41OWwzLTMtMi4xMi0yLjEyTDQ4IDQ1Ljg4bC0yLjM4LTIuMzggMy40NC0zLjQ0QTEuNSAxLjUgMCAwIDAgNDkuNSAzOXYtM2gtM3YyLjM4bC00LjA2IDQuMDZhMS40OSAxLjQ5IDAgMCAwIDAgMi4xMmwzIDMtNi43MSAxMWg0LjM5bDQuODgtOC45IDUuNjkgOC44NGgzLjd6Ii8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDggNzguNmExMy41IDEzLjUgMCAxIDAtMTMuNS0xMy41QTEzLjQ5IDEzLjQ5IDAgMCAwIDQ4IDc4LjZ6Ii8+PGNpcmNsZSBjbGFzcz0iY2xzLTQiIGN4PSI0OCIgY3k9IjYwLjk1IiByPSI1LjE5Ii8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMzguMjMgNzFhMTEuNDMgMTEuNDMgMCAwIDAgMTkuNTQgMCAuNTQuNTQgMCAwIDAtLjExLS4yNiA3LjM2IDcuMzYgMCAwIDAtNi0yLjU1aC03LjI5YTcuMzYgNy4zNiAwIDAgMC02IDIuNTUuNTQuNTQgMCAwIDAtLjExLjI2eiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI3IDEzLjVoM3YzaC0zeiIvPjwvZz48L3N2Zz4=\") 0 no-repeat;\n}\n","@require 'settings/palette.styl'\n\n:local // @stylint ignore\n    .maintenance-intro\n        text-align center\n        color var(--pomegranate)\n        margin 1rem auto\n\n    .maintenance-service\n        font-size 1.125rem\n\n    .maintenance-icon\n        width 6.25rem\n        height 6.25rem\n        margin 0 auto\n        background embedurl('../assets/icons/icon-maintenance.svg') 0 no-repeat\n\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"maintenance-intro": "maintenance-intro--1-SbJ",
	"maintenance-service": "maintenance-service--1ZZfz",
	"maintenance-icon": "maintenance-icon--2QHy-"
};

/***/ }),

/***/ "UufI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "konnectorsI18nMiddleware", function() { return konnectorsI18nMiddleware; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");


var KONNECTORS_DOCTYPE = 'io.cozy.konnectors';

var extendI18nWithKonnector = function extendI18nWithKonnector(lang) {
  return function (konnector) {
    var langs = konnector.langs,
        locales = konnector.locales;
    var hasLangs = langs && langs.length;

    if (!hasLangs) {
      // eslint-disable-next-line no-console
      console.warn("Konnector ".concat(konnector.name, " does not specify any lang"));
      return konnector;
    }

    var providesLang = hasLangs && langs.includes(lang);
    var actualLang = providesLang ? lang : langs[0];
    var localeKeys = locales && Object.keys(locales);
    var providesLocales = localeKeys && localeKeys.length && localeKeys.includes(actualLang);

    if (!providesLocales) {
      // eslint-disable-next-line no-console
      console.warn("Konnector ".concat(konnector.name, " does not specify any locale for lang ").concat(actualLang));
      return konnector;
    }

    Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["extend"])(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, konnector.slug, locales[actualLang]));
    return konnector;
  };
};

var konnectorsI18nMiddleware = function konnectorsI18nMiddleware(lang) {
  return function () {
    return function (next) {
      return function (action) {
        var response = action.response;

        switch (action.type) {
          case 'RECEIVE_DATA':
          case 'RECEIVE_NEW_DOCUMENT':
            if (response && action.doctype === KONNECTORS_DOCTYPE) {
              var konnectors = response.data;
              konnectors && konnectors.length && konnectors.forEach(extendI18nWithKonnector(lang));
            }

            break;
        }

        return next(action);
      };
    };
  };
};
/* harmony default export */ __webpack_exports__["default"] = (konnectorsI18nMiddleware);

/***/ }),

/***/ "WWPq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


function fetch(_x, _x2) {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(cozy, triggerId) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", cozy.fetchJSON('GET', "/jobs/triggers/".concat(triggerId)));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}

/***/ }),

/***/ "XSRU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("buk/");
/* harmony import */ var components_intents_CreateAccountIntent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("zlKK");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("uZd2");








(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







var IntentService =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(IntentService, _Component);

  function IntentService(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, IntentService);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(IntentService).call(this, props));
    _this.state = {
      error: null
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(IntentService, [{
    key: "handleInstallationSuccess",
    value: function handleInstallationSuccess(konnector) {
      this.props.receiveKonnector(konnector);
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this$props, data, konnector, receiveKonnector, service, installedKonnector;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, data = _this$props.data, konnector = _this$props.konnector, receiveKonnector = _this$props.receiveKonnector, service = _this$props.service;

                if (!(service && !konnector)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return service.compose('INSTALL', 'io.cozy.apps', data);

              case 4:
                installedKonnector = _context.sent;

                if (installedKonnector) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", service.cancel());

              case 7:
                receiveKonnector(installedKonnector);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "onError",
    value: function onError(error) {
      this.setState({
        error: error
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          appData = _this$props2.appData,
          konnector = _this$props2.konnector,
          onCancel = _this$props2.onCancel,
          service = _this$props2.service,
          t = _this$props2.t;
      var error = this.state.error;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-service"
      }, error && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-error coz-service-error"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, t(error.message)), error.reason && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, t('intent.service.error.cause', {
        error: error.reason
      }))), !error && konnector && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_intents_CreateAccountIntent__WEBPACK_IMPORTED_MODULE_10__["default"], {
        appData: appData,
        konnector: konnector,
        onCancel: onCancel,
        onTerminate: service.terminate
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return IntentService;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    receiveKonnector: function receiveKonnector(konnector) {
      return dispatch(Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__["receiveInstalledKonnector"])(konnector));
    }
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var data = ownProps.data;
  var slug = data.slug;
  return {
    konnector: slug && Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_11__["getKonnector"])(state.cozy, slug)
  };
};

var _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__["translate"])()(IntentService));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(IntentService, "IntentService", "/Users/cozy/code/cozy/cozy-home/src/containers/IntentService.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "/Users/cozy/code/cozy/cozy-home/src/containers/IntentService.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/Users/cozy/code/cozy/cozy-home/src/containers/IntentService.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/containers/IntentService.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "YAxW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("/MKj");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("m+TH");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("oMPT");








(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







var connect = function connect(mapDocumentsToProps) {
  var mapActionsToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (WrappedComponent) {
    var Wrapper =
    /*#__PURE__*/
    function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Wrapper, _Component);

      function Wrapper() {
        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Wrapper);

        return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Wrapper).apply(this, arguments));
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var fetchActions = this.props.fetchActions;
          var dispatch = this.context.store.dispatch;

          for (var propName in fetchActions) {
            dispatch(fetchActions[propName]);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var store = this.context.store;
          var fetchActions = this.props.fetchActions;

          var props = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, Object(___WEBPACK_IMPORTED_MODULE_10__["enhancePropsForActions"])(this.props, fetchActions, store.dispatch));

          return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(WrappedComponent, props);
        }
      }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
          // @ts-ignore
          this[key] = eval(code);
        }
      }]);

      return Wrapper;
    }(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(Wrapper, "contextTypes", {
      store: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object
    });

    var makeMapStateToProps = function makeMapStateToProps(initialState, initialOwnProps) {
      var initialProps = mapDocumentsToProps(initialOwnProps);

      var isAction = function isAction(action) {
        return action && action.types && action.promise;
      };

      var fetchActions = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["filterValues"])(initialProps, function (prop) {
        return isAction(prop);
      });
      var otherProps = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["filterValues"])(initialProps, function (prop) {
        return !isAction(prop);
      });

      var mapStateToProps = function mapStateToProps(state) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["mapValues"])(fetchActions, function (action) {
          return isAction(action) ? Object(___WEBPACK_IMPORTED_MODULE_10__["applySelectorForAction"])(state, action) : action;
        }), {
          fetchActions: fetchActions
        }, otherProps);
      };

      return mapStateToProps;
    };

    return Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(makeMapStateToProps, mapActionsToProps)(Wrapper);
  };
};

var _default = connect;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(connect, "connect", "/Users/cozy/code/cozy/cozy-home/src/lib/redux-cozy-client/connect.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/lib/redux-cozy-client/connect.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "a0/m":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, "h3 {\n  font-size: 1.5rem;\n  line-height: 1.5em;\n  margin: 0.667em 0;\n}\nh4 {\n  font-size: 1.25rem;\n  line-height: 1.5em;\n  margin: 1em 0;\n}\np {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n.col-account-connection--3AgeF {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 100%;\n}\n@media (max-width: 25rem) {\n  h4 {\n    font-size: 1.125rem;\n  }\n  p {\n    font-size: 0.875rem;\n  }\n}\n", "",{"version":3,"sources":["src/styles/accountConnection.styl","accountConnection.styl"],"names":[],"mappings":"AAGI;EACI,iBAAkB;EAClB,kBAAY;EACZ,iBAAY;ACFpB;ADII;EACI,kBAAkB;EAClB,kBAAY;EACZ,aAAY;ACFpB;ADII;EACI,eAAkB;EAClB,mBAAkB;ACF1B;ADII;EACI,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,4BAAe;EAAf,6BAAe;MAAf,0BAAe;UAAf,sBAAe;EACf,wBAAgB;MAAhB,qBAAgB;UAAhB,uBAAgB;EAChB,WAAM;ACFd;ADI+B;EACvB;IACI,mBAAkB;ECF5B;EDIM;IACI,mBAAkB;ECF5B;AACF","file":"accountConnection.styl","sourcesContent":["@require 'tools/mixins.styl'\n\n:local // @stylint ignore\n    h3\n        font-size   rem(24)\n        line-height 1.5em\n        margin      .667em 0\n\n    h4\n        font-size   rem(20)\n        line-height 1.5em\n        margin      1em 0\n\n    p\n        font-size   rem(16)\n        line-height rem(24)\n\n    .col-account-connection\n        display flex\n        flex-direction column\n        justify-content center\n        width 100%\n\n    @media (max-width: rem(400))\n        h4\n            font-size   rem(18)\n\n        p\n            font-size   rem(14)\n",":local h3 {\n  font-size: 1.5rem;\n  line-height: 1.5em;\n  margin: 0.667em 0;\n}\n:local h4 {\n  font-size: 1.25rem;\n  line-height: 1.5em;\n  margin: 1em 0;\n}\n:local p {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n:local .col-account-connection {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 100%;\n}\n@media (max-width: 25rem) {\n  :local h4 {\n    font-size: 1.125rem;\n  }\n  :local p {\n    font-size: 0.875rem;\n  }\n}\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"col-account-connection": "col-account-connection--3AgeF"
};

/***/ }),

/***/ "bECI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMessage", function() { return UpdateMessage; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Infos__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("M2p0");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);









(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/* global cozy */





var UpdateMessage =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(UpdateMessage, _Component);

  function UpdateMessage(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, UpdateMessage);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(UpdateMessage).call(this, props));
    _this.state = {
      isRedirecting: false
    };
    _this.redirectToStore = _this.redirectToStore.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(UpdateMessage, [{
    key: "redirectToStore",
    value: function () {
      var _redirectToStore = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var konnector;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({
                  isRedirecting: true
                });
                konnector = this.props.konnector;
                _context.prev = 2;
                _context.next = 5;
                return cozy.client.intents.redirect('io.cozy.apps', {
                  slug: konnector.slug,
                  step: 'update'
                });

              case 5:
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);

                /* eslint-disable-next-line no-console */
                console.error(_context.t0);
                this.setState({
                  isRedirecting: false
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 7]]);
      }));

      function redirectToStore() {
        return _redirectToStore.apply(this, arguments);
      }

      return redirectToStore;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          isBlocking = _this$props.isBlocking;
      var isRedirecting = this.state.isRedirecting;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_react_Infos__WEBPACK_IMPORTED_MODULE_11__["default"], {
        actionButton: react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          label: t('update.CTA'),
          theme: "danger",
          className: "u-m-0",
          onClick: this.redirectToStore,
          disabled: isRedirecting
        }),
        className: "u-maw-none",
        text: isBlocking ? t('update.blocking') : t('update.regular'),
        isImportant: isBlocking,
        title: t('update.title')
      });
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return UpdateMessage;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);
UpdateMessage.propTypes = {
  konnector: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object.isRequired,
  isBlocking: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool,
  t: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func.isRequired
};

var _default = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__["translate"])()(UpdateMessage);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UpdateMessage, "UpdateMessage", "/Users/cozy/code/cozy/cozy-home/src/components/Banners/UpdateMessage.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/Banners/UpdateMessage.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "cXEB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fvjX");
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("m+TH");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("1mXj");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lib_middlewares_konnectorsI18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("UufI");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("sINF");
/* harmony import */ var lib_CollectStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Lf2i");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cokx");
var _this = undefined;










var configureStore = function configureStore(legacyClient, cozyClient, context) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // Enable Redux dev tools
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || redux__WEBPACK_IMPORTED_MODULE_0__["compose"];
  var reduxStore = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(Object(reducers__WEBPACK_IMPORTED_MODULE_7__["default"])(), composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(_this, [Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__["cozyMiddleware"])(legacyClient), Object(lib_middlewares_konnectorsI18n__WEBPACK_IMPORTED_MODULE_3__["default"])(options.lang), redux_thunk__WEBPACK_IMPORTED_MODULE_4__["default"], cozy_flags__WEBPACK_IMPORTED_MODULE_6___default()('redux-logger') ? Object(redux_logger__WEBPACK_IMPORTED_MODULE_2__["createLogger"])() : null].filter(Boolean))));
  return Object.assign(new lib_CollectStore__WEBPACK_IMPORTED_MODULE_5__["default"](context, cozyClient, options), reduxStore);
};

/* harmony default export */ __webpack_exports__["default"] = (configureStore);

/***/ }),

/***/ "cokx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstalledKonnectors", function() { return getInstalledKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsByKonnector", function() { return getConnectionsByKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsQueue", function() { return getConnectionsQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCreatedConnectionAccount", function() { return getCreatedConnectionAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnectorTriggersCount", function() { return getKonnectorTriggersCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerByKonnectorAndAccount", function() { return getTriggerByKonnectorAndAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggersByKonnector", function() { return getTriggersByKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggersInError", function() { return getTriggersInError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccountsWithErrors", function() { return getAccountsWithErrors; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fvjX");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("m+TH");
/* harmony import */ var ducks_apps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("/n/j");
/* harmony import */ var ducks_accounts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("3dAU");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("uZd2");
/* harmony import */ var ducks_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("rGvZ");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4YEU");








/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    apps: ducks_apps__WEBPACK_IMPORTED_MODULE_3__["default"],
    connections: ducks_connections__WEBPACK_IMPORTED_MODULE_7__["default"],
    cozy: redux_cozy_client__WEBPACK_IMPORTED_MODULE_2__["reducer"]
  });
}); // selectors

var getInstalledKonnectors = function getInstalledKonnectors(state) {
  return ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getInstalledKonnectors"](state.cozy);
};
var getConnectionsByKonnector = function getConnectionsByKonnector(state, konnectorSlug) {
  return ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getConnectionsByKonnector"](state.connections, konnectorSlug, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy), ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getSlugs"](state.cozy));
};
var getConnectionsQueue = function getConnectionsQueue(state) {
  return ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getQueue"](state.connections, ducks_konnectors__WEBPACK_IMPORTED_MODULE_5__["getIndexedKonnectors"](state.cozy));
};
var getCreatedConnectionAccount = function getCreatedConnectionAccount(state) {
  return ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getAccount"](state.cozy, ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getCreatedAccount"](state.connections));
};
var getKonnectorTriggersCount = function getKonnectorTriggersCount(state, konnector) {
  return ducks_triggers__WEBPACK_IMPORTED_MODULE_6__["getKonnectorTriggers"](state.cozy, konnector, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy)).length;
};
var getTriggerByKonnectorAndAccount = function getTriggerByKonnectorAndAccount(state, konnector, account) {
  var triggerId = ducks_connections__WEBPACK_IMPORTED_MODULE_7__["getTriggerIdByKonnectorAndAccount"](state.connections, konnector, account, ducks_accounts__WEBPACK_IMPORTED_MODULE_4__["getIds"](state.cozy));
  return ducks_triggers__WEBPACK_IMPORTED_MODULE_6__["getTrigger"](state.cozy, triggerId);
};
var getTriggersByKonnector = function getTriggersByKonnector(state, konnectorSlug) {
  var triggersInState = state.cozy.documents['io.cozy.triggers'] || {};
  var triggers = Object.keys(triggersInState).reduce(function (acc, key) {
    var document = state.cozy.documents['io.cozy.triggers'][key];

    if (document.worker === 'konnector' && lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(document, 'message.konnector') === konnectorSlug) {
      acc.push(document);
    }

    return acc;
  }, []);
  return triggers;
};
var getTriggersInError = function getTriggersInError(state) {
  var triggers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(state, ['cozy', 'documents', 'io.cozy.triggers'], {});
  return Object.values(triggers).filter(function (trigger) {
    var isInError = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(trigger, 'current_state.status') === 'errored';
    return isInError;
  });
};
var getAccountsWithErrors = function getAccountsWithErrors(state) {
  var accountsWithErrorsIds = getTriggersInError(state).map(function (trigger) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(trigger, 'message.account');
  });
  var accounts = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(state, ['cozy', 'documents', 'io.cozy.accounts'], {});
  return Object.values(accounts).filter(function (_ref) {
    var _id = _ref._id;
    return accountsWithErrorsIds.includes(_id);
  });
};

/***/ }),

/***/ "d/w2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("/8/d");
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("M50D");
/* harmony import */ var cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_dist_cozy_ui_min_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
/* harmony import */ var store_configureStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cXEB");
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("m+TH");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Le8U");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var containers_IntentHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("jpY6");
/* harmony import */ var styles_intents_styl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("8EAv");
/* harmony import */ var styles_intents_styl__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(styles_intents_styl__WEBPACK_IMPORTED_MODULE_11__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/* global __DEVELOPMENT__ */












var lang = document.documentElement.getAttribute('lang') || 'en';
var context = window.context || 'cozy';
var ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('[role=application]');
  var appData = root.dataset;
  var legacyClient = new redux_cozy_client__WEBPACK_IMPORTED_MODULE_8__["CozyClient"]({
    cozyURL: "//".concat(appData.cozyDomain),
    token: appData.cozyToken
  }); // New improvements must be done with CozyClient

  var cozyClient = new cozy_client__WEBPACK_IMPORTED_MODULE_5___default.a({
    uri: "".concat(window.location.protocol, "//").concat(appData.cozyDomain),
    schema: {
      app: cozy_doctypes__WEBPACK_IMPORTED_MODULE_9__["Application"].schema,
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
      }
    },
    token: appData.cozyToken
  }); // store

  var store = Object(store_configureStore__WEBPACK_IMPORTED_MODULE_7__["default"])(legacyClient, cozyClient, context, {
    lang: lang
  });
  Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_5__["CozyProvider"], {
    client: cozyClient
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_cozy_client__WEBPACK_IMPORTED_MODULE_8__["CozyProvider"], {
    domain: appData.cozyDomain,
    store: store,
    client: cozyClient,
    secure: !true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["I18n"], {
    lang: lang,
    dictRequire: function dictRequire(lang) {
      return __webpack_require__("KAKi")("./".concat(lang));
    },
    context: context
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["HashRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(containers_IntentHandler__WEBPACK_IMPORTED_MODULE_10__["default"], {
    appData: appData
  }))))), document.querySelector('[role=application]'));
});
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(lang, "lang", "/Users/cozy/code/cozy/cozy-home/src/targets/intents/index.jsx");
  reactHotLoader.register(context, "context", "/Users/cozy/code/cozy/cozy-home/src/targets/intents/index.jsx");
  reactHotLoader.register(ACCOUNTS_DOCTYPE, "ACCOUNTS_DOCTYPE", "/Users/cozy/code/cozy/cozy-home/src/targets/intents/index.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "gAos":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KonnectorHeaderIcon", function() { return KonnectorHeaderIcon; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var components_AppIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("B/vO");
/* harmony import */ var styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("gpME");
/* harmony import */ var styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9__);






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






var KonnectorHeaderIcon =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(KonnectorHeaderIcon, _Component);

  function KonnectorHeaderIcon() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KonnectorHeaderIcon);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(KonnectorHeaderIcon).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(KonnectorHeaderIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          center = _this$props.center,
          konnector = _this$props.konnector,
          t = _this$props.t;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9___default.a["col-konnector-header-icon-wrapper".concat(center ? '--center' : '')]
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_AppIcon__WEBPACK_IMPORTED_MODULE_8__["default"], {
        alt: t('app.logo.alt', {
          name: konnector.name
        }),
        app: konnector,
        className: styles_konnectorHeaderIcon_styl__WEBPACK_IMPORTED_MODULE_9___default.a["col-konnector-header-icon".concat(center ? '--center' : '')]
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return KonnectorHeaderIcon;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
KonnectorHeaderIcon.propTypes = {
  center: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  konnector: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired,
  t: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired
};

var _default = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["translate"])()(KonnectorHeaderIcon);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(KonnectorHeaderIcon, "KonnectorHeaderIcon", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorHeaderIcon.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/KonnectorHeaderIcon.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "gpME":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("GdGx");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("GdGx", function() {
		var newContent = __webpack_require__("GdGx");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "gwpp":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("a0/m");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept("a0/m", function() {
		var newContent = __webpack_require__("a0/m");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "i3Xp":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "dZZH"
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
webpackContext.id = "i3Xp";

/***/ }),

/***/ "iUaz":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en-SG": "zavE",
	"./en-SG.js": "zavE",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc"
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
webpackContext.id = "iUaz";

/***/ }),

/***/ "j7c3":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(true);
// Module
exports.push([module.i, ":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n.coz-form-controls--1gEYB, .coz-form-controls-success--1NQyf {\n  margin: 2rem 0 0.5rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.coz-form-controls--1gEYB .coz-btn--233oo, .coz-form-controls-success--1NQyf .coz-btn--233oo {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n  width: 100%;\n}\n.coz-form-controls--1gEYB .coz-btn--233oo:first-of-type, .coz-form-controls-success--1NQyf .coz-btn--233oo:first-of-type {\n  margin-left: 0;\n}\n.coz-form-controls--1gEYB .coz-btn--233oo:last-of-type, .coz-form-controls-success--1NQyf .coz-btn--233oo:last-of-type {\n  margin-right: 0;\n}\n.coz-form-controls-success--1NQyf {\n  margin-top: 1rem;\n}\n.col-btn--regular--2N744 {\n  margin: 0;\n  font-size: 1rem;\n  height: 3rem;\n  width: 100%;\n}\n.col-account-form-success-buttons--1J36i {\n  margin: auto;\n}\n.col-account-form-success-buttons--1J36i button {\n  width: 100%;\n}\n.account-form-login--_w3tO .col-account-form-advanced-button--niE6T {\n  font-family: Lato, sans-serif;\n  cursor: pointer;\n  margin: 1rem 0 0;\n  font-size: 0.8em;\n  border: 0;\n  color: var(--dodgerBlue);\n  background-color: var(--white);\n  text-transform: uppercase;\n  font-weight: 700;\n  padding: 0.125rem;\n}\n.account-form-fieldset--3WD-X {\n  padding: 0;\n  border: 0;\n}\n.col-account-success--1NEI1 {\n  text-align: center;\n}\n.col-account-success-links--15Ii5 {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.col-account-success-link--18QVL {\n  position: relative;\n  margin-top: 1rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: var(--dodgerBlue);\n  text-decoration: none;\n  font-weight: bold;\n  cursor: pointer;\n}\n.col-account-success-illu--RvZfy {\n  height: 7rem;\n  width: 7.5rem;\n}\n", "",{"version":3,"sources":["node_modules/cozy-ui/stylus/settings/palette.styl","konnectorSuccess.styl","src/styles/accountLoginForm.styl","src/styles/konnectorSuccess.styl"],"names":[],"mappings":"AAoBA;AACI;;;;;;;;;;;;;;KCNC;EDqBD,aAAgB;EAChB,mBAAgB;EAChB,iBAAgB;EAChB,mBAAgB;EAChB,oBAAgB;EAChB,uBAAgB;EAChB,aAAgB;EAChB,6BAAmC;AACnC;;;;;;;;;;;;KCRC;EDqBD,iBAAe;EACf,qBAAe;EACf,qBAAe;EACf,gBAAe;EACf,qBAAe;EACf,sBAAe;EACf,qBAAe;AACf;;;;;;;;;;KCVC;EDqBD,sBAAe;EACf,qBAAe;EACf,kBAAe;EACf,oBAAe;EACf,uBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,oBAAiB;EACjB,oBAAiB;EACjB,gBAAiB;EACjB,wBAAiB;EACjB,sBAAiB;EACjB,gBAAiB;AACjB;;;;;;;;;;KCVC;EDqBD,kBAAe;EACf,mBAAe;EACf,kBAAe;EACf,sBAAe;EACf,gBAAe;AACf;;;;;;;;;;;KCTC;EDqBD,mBAAkB;EAClB,yBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,yBAAkB;EAClB,iBAAkB;AAElB;;;;;;KCfC;ADuBD;;;;;;;;;;KCZC;EDuBD,iCAA+B;EAC/B,4BAAoB;EACpB,8BAAsB;EACtB,+BAAuB;EACvB,wCAAsC;ACrB1C;ACnII;EACI,qBAAa;EACb,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,mBAAU;MAAV,eAAU;ADsIlB;ACrIQ;EAEI,mBAAK;MAAL,kBAAK;UAAL,cAAK;EACL,WAAM;ADuIlB;ACrIY;EACI,cAAY;ADwI5B;ACtIY;EACI,eAAa;ADyI7B;ACvII;EACI,gBAAiB;ADyIzB;ACvII;EACI,SAAU;EACV,eAAgB;EAChB,YAAgB;EAChB,WAAU;ADyIlB;ACvII;EACI,YAAO;ADyIf;ACvIQ;EACI,WAAM;ADyIlB;ACtIQ;EACI,6BAAwB;EACxB,eAAoB;EACpB,gBAAoB;EACpB,gBAAoB;EACpB,SAAoB;EACpB,wBAAoC;EACpC,8BAA+B;EAC/B,yBAAoB;EACpB,gBAAoB;EACpB,iBAAoB;ADwIhC;ACtII;EACI,UAAU;EACV,SAAU;ADwIlB;AEvLA;EACI,kBAAW;AFyLf;AEvLA;EACI,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,yBAAY;MAAZ,sBAAY;UAAZ,mBAAY;EACZ,4BAAe;EAAf,6BAAe;MAAf,0BAAe;UAAf,sBAAe;AFyLnB;AEvLA;EACI,kBAAS;EACT,gBAAW;EACX,oBAAQ;EAAR,oBAAQ;EAAR,aAAQ;EACR,yBAAY;MAAZ,sBAAY;UAAZ,mBAAY;EACZ,wBAAsB;EACtB,qBAAgB;EAChB,iBAAY;EACZ,eAAO;AFyLX;AEvLA;EACI,YAAc;EACd,aAAa;AFyLjB","file":"konnectorSuccess.styl","sourcesContent":["// @stylint off\n/*------------------------------------*\\\n  Palette\n  =====\n\\*------------------------------------*/\n/*\n    Settings\n\n    Weight: -10\n\n    Styleguide Settings\n*/\n\n/*\n    Colors\n\n    Colors used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n    Styleguide Settings.colors\n*/\n:root\n    /*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n    --white         #FFFFFF\n    --paleGrey      #F5F6F7\n    --silver        #D6D8Da\n    --coolGrey      #95999D\n    --slateGrey     #5D6165\n    --charcoalGrey  #32363F\n    --black         #000000\n    --overlay       rgba(50, 54, 63, .5)\n    /*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n    --zircon       #F5FAFF\n    --hawkesBlue   #EEF5FE\n    --frenchPass   #C2DCFF\n    --azure        #1FA8F1\n    --dodgerBlue   #297EF2\n    --scienceBlue  #0B61D6\n    --puertoRico   #0DCBCF\n    /*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n    --grannyApple  #DEF7E7\n    --weirdGreen   #40DE8E\n    --emerald      #35CE68\n    --malachite    #08b442\n    --seafoamGreen #3DA67E\n    /*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n    --brightSun      #FFC644\n    --texasRose      #FFAE5F\n    --mango          #FF962F\n    --pumpkinOrange  #FF7F1B\n    --blazeOrange    #FC6D00\n    --melon          #FD7461\n    /*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n    --chablis      #FFF2F2\n    --yourPink     #FDCBCB\n    --fushsia      #FC4C83\n    --pomegranate  #F52D2D\n    --monza        #DD0505\n    /*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n    --lavender        #C2ADF4\n    --darkPeriwinkle  #6984CE\n    --purpley         #7F6BEE\n    --portage         #9169F2\n    --lightishPurple  #B449E7\n    --barney          #922BC2\n\n    /*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n\n    /*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n    --primaryColor var(--dodgerBlue)\n    --primaryColorLight #5C9DF5 // lighten(dodgerBlue, 24)\n    --primaryColorLighter #4B93F7\n    --primaryColorLightest #9FC4FB\n    --primaryContrastTextColor var(--white)\n// @stylint on\n",":root {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n    Weight: -1\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: hawkesBlue   -  #EEF5FE, CSS: var(--hawkesBlue)\n    Stylus: frenchPass   -  #C2DCFF, CSS: var(--frenchPass)\n    Stylus: azure        -  #1FA8F1, CSS: var(--azure)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n    Stylus: puertoRico   -  #0DCBCF, CSS: var(--puertoRico)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --hawkesBlue: #eef5fe;\n  --frenchPass: #c2dcff;\n  --azure: #1fa8f1;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n  --puertoRico: #0dcbcf;\n/*\n    Green\n\n    Stylus: grannyApple  - #DEF7E7, CSS: var(--grannyApple)\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n    Stylus: seafoamGreen - #3DA67E, CSS: var(--seafoamGreen)\n\n    Styleguide Settings.colors.green\n    */\n  --grannyApple: #def7e7;\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n  --seafoamGreen: #3da67e;\n/*\n    Orange\n\n    Stylus: brightSun     - #FFC644, CSS: var(--brightSun)\n    Stylus: texasRose     - #FFAE5F, CSS: var(--texasRose)\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n    Stylus: pumpkinOrange - #FF7F1B, CSS: var(--pumpkinOrange)\n    Stylus: blazeOrange   - #FC6D00, CSS: var(--blazeOrange)\n    Stylus: melon         - #FD7461, CSS: var(--melon)\n\n    Styleguide Settings.colors.orange\n    */\n  --brightSun: #ffc644;\n  --texasRose: #ffae5f;\n  --mango: #ff962f;\n  --pumpkinOrange: #ff7f1b;\n  --blazeOrange: #fc6d00;\n  --melon: #fd7461;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fushsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n/*\n    Purple\n\n    Stylus: lavender       - #C2ADF4, CSS: var(--lavender)\n    Stylus: darkPeriwinkle - #6984CE, CSS: var(--darkPeriwinkle)\n    Stylus: purpley        - #7F6BEE, CSS: var(--purpley)\n    Stylus: portage        - #9169F2, CSS: var(--portage)\n    Stylus: lightishPurple - #B449E7, CSS: var(--lightishPurple)\n    Stylus: barney         - #922BC2, CSS: var(--barney)\n\n    Styleguide Settings.colors.purple\n    */\n  --lavender: #c2adf4;\n  --darkPeriwinkle: #6984ce;\n  --purpley: #7f6bee;\n  --portage: #9169f2;\n  --lightishPurple: #b449e7;\n  --barney: #922bc2;\n/*\n        Theme\n\n        Colors theme used in the user interface. You can directly use the var name assiociated with its hexadecimal.\n\n        Styleguide Settings.theme\n    */\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLighter      - #4B93F7, CSS: var(--primaryColorLighter)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: var(--dodgerBlue);\n  --primaryColorLight: #5c9df5;\n  --primaryColorLighter: #4b93f7;\n  --primaryColorLightest: #9fc4fb;\n  --primaryContrastTextColor: var(--white);\n}\n:local .coz-form-controls,\n:local .coz-form-controls-success {\n  margin: 2rem 0 0.5rem;\n  display: flex;\n  flex-wrap: wrap;\n}\n:local .coz-form-controls .coz-btn,\n:local .coz-form-controls-success .coz-btn {\n  flex: 1 0 auto;\n  width: 100%;\n}\n:local .coz-form-controls .coz-btn:first-of-type,\n:local .coz-form-controls-success .coz-btn:first-of-type {\n  margin-left: 0;\n}\n:local .coz-form-controls .coz-btn:last-of-type,\n:local .coz-form-controls-success .coz-btn:last-of-type {\n  margin-right: 0;\n}\n:local .coz-form-controls-success {\n  margin-top: 1rem;\n}\n:local .col-btn--regular {\n  margin: 0;\n  font-size: 1rem;\n  height: 3rem;\n  width: 100%;\n}\n:local .col-account-form-success-buttons {\n  margin: auto;\n}\n:local .col-account-form-success-buttons button {\n  width: 100%;\n}\n:local .account-form-login .col-account-form-advanced-button {\n  font-family: Lato, sans-serif;\n  cursor: pointer;\n  margin: 1rem 0 0;\n  font-size: 0.8em;\n  border: 0;\n  color: var(--dodgerBlue);\n  background-color: var(--white);\n  text-transform: uppercase;\n  font-weight: 700;\n  padding: 0.125rem;\n}\n:local .account-form-fieldset {\n  padding: 0;\n  border: 0;\n}\n.col-account-success {\n  text-align: center;\n}\n.col-account-success-links {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n.col-account-success-link {\n  position: relative;\n  margin-top: 1rem;\n  display: flex;\n  align-items: center;\n  color: var(--dodgerBlue);\n  text-decoration: none;\n  font-weight: bold;\n  cursor: pointer;\n}\n.col-account-success-illu {\n  height: 7rem;\n  width: 7.5rem;\n}\n","@require 'tools/mixins.styl'\n@require 'settings/palette.styl'\n\n:local // @stylint ignore\n    .coz-form-controls, .coz-form-controls-success\n        margin rem(32) 0 rem(8)\n        display flex\n        flex-wrap wrap\n        .coz-btn\n            // Used to position progress bar\n            flex 1 0 auto\n            width 100%\n\n            &:first-of-type\n                margin-left 0\n\n            &:last-of-type\n                margin-right 0\n\n    .coz-form-controls-success\n        margin-top rem(16)\n\n    .col-btn--regular\n        margin    0\n        font-size rem(16)\n        height    rem(48)\n        width     100%\n\n    .col-account-form-success-buttons\n        margin auto\n\n        button\n            width 100%\n\n    .account-form-login\n        .col-account-form-advanced-button\n            font-family         Lato, sans-serif\n            cursor              pointer\n            margin              1rem 0 0\n            font-size           .8em\n            border              0\n            color               var(--dodgerBlue)\n            background-color    var(--white)\n            text-transform      uppercase\n            font-weight         700\n            padding             .125rem // Magic number to align button with form fields\n\n    .account-form-fieldset\n        padding   0\n        border    0\n","@require './accountLoginForm'\n\n.col-account-success\n    text-align center\n\n.col-account-success-links\n    display flex\n    align-items center\n    flex-direction column\n\n.col-account-success-link\n    position relative\n    margin-top 1rem\n    display flex\n    align-items center\n    color var(--dodgerBlue)\n    text-decoration none\n    font-weight bold\n    cursor pointer\n\n.col-account-success-illu\n    height rem(112)\n    width rem(120)\n"],"sourceRoot":""}]);

// Exports
exports.locals = {
	"coz-form-controls": "coz-form-controls--1gEYB",
	"coz-form-controls-success": "coz-form-controls-success--1NQyf",
	"coz-btn": "coz-btn--233oo",
	"col-btn--regular": "col-btn--regular--2N744",
	"col-account-form-success-buttons": "col-account-form-success-buttons--1J36i",
	"account-form-login": "account-form-login--_w3tO",
	"col-account-form-advanced-button": "col-account-form-advanced-button--niE6T",
	"account-form-fieldset": "account-form-fieldset--3WD-X",
	"col-account-success": "col-account-success--1NEI1",
	"col-account-success-links": "col-account-success-links--15Ii5",
	"col-account-success-link": "col-account-success-link--18QVL",
	"col-account-success-illu": "col-account-success-illu--RvZfy"
};

/***/ }),

/***/ "jPoV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_BIDIRECTIONAL", function() { return SYNC_BIDIRECTIONAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_TO", function() { return SYNC_TO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_FROM", function() { return SYNC_FROM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PouchdbAdapter; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("skrj");









/* global cozy, PouchDB, pouchdbFind */

var REPLICATION_INTERVAL = 30000;
var SYNC_BIDIRECTIONAL = 'SYNC_BIDIRECTIONAL';
var SYNC_TO = 'SYNC_TO';
var SYNC_FROM = 'SYNC_FROM';

var PouchdbAdapter =
/*#__PURE__*/
function () {
  function PouchdbAdapter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, PouchdbAdapter);

    PouchDB.plugin(pouchdbFind);
    this.instances = {};
    this.doctypes = [];
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(PouchdbAdapter, [{
    key: "registerDoctypes",
    value: function registerDoctypes(doctypes) {
      this.doctypes = doctypes;
    }
  }, {
    key: "getDatabase",
    value: function getDatabase(doctype) {
      return cozy.client.offline.getDatabase(doctype); // For now we let cozy-client-js creates PouchDB instances
    }
  }, {
    key: "getReplicationBaseUrl",
    value: function getReplicationBaseUrl() {
      return cozy.client.authorize().then(function (credentials) {
        var basic = credentials.token.toBasicAuth();
        return "".concat(cozy.client._url, "/data/").replace('//', "//".concat(basic));
      });
    }
  }, {
    key: "getSeqNumber",
    value: function getSeqNumber(doctype) {
      return this.getDatabase(doctype).info().then(function (result) {
        return result.update_seq;
      });
    }
  }, {
    key: "sync",
    value: function () {
      var _sync = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee(dispatch) {
        var direction,
            baseUrl,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            doctype,
            seqNumber,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                direction = _args.length > 1 && _args[1] !== undefined ? _args[1] : SYNC_BIDIRECTIONAL;
                _context.next = 3;
                return this.getReplicationBaseUrl();

              case 3:
                baseUrl = _context.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 7;
                _iterator = this.doctypes[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 20;
                  break;
                }

                doctype = _step.value;
                _context.next = 13;
                return this.getSeqNumber(doctype);

              case 13:
                seqNumber = _context.sent;
                _context.next = 16;
                return dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_8__["startDoctypeSync"])(doctype, seqNumber));

              case 16:
                this.syncDoctype(doctype, "".concat(baseUrl).concat(doctype), dispatch, direction);

              case 17:
                _iteratorNormalCompletion = true;
                _context.next = 9;
                break;

              case 20:
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](7);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 26:
                _context.prev = 26;
                _context.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 29:
                _context.prev = 29;

                if (!_didIteratorError) {
                  _context.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context.finish(29);

              case 33:
                return _context.finish(26);

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 22, 26, 34], [27,, 29, 33]]);
      }));

      function sync(_x) {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "syncDoctype",
    value: function syncDoctype(doctype, replicationUrl, dispatch) {
      var _this = this;

      var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : SYNC_BIDIRECTIONAL;
      return new Promise(function (resolve, reject) {
        var db = _this.getDatabase(doctype);

        var syncHandler;
        if (direction === SYNC_TO) syncHandler = db.replicate.to(replicationUrl);else if (direction === SYNC_FROM) syncHandler = db.replicate.from(replicationUrl);else syncHandler = db.sync(replicationUrl);
        syncHandler.on('complete', function (info) {
          dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_8__["syncDoctypeOk"])(doctype, info));

          _this.scheduleNextSync(doctype, replicationUrl, dispatch, direction);

          resolve(info);
        }).on('error', function (err) {
          if (err.error === 'code=400, message=Expired token') {
            return cozy.client.authorize().then(function (_ref) {
              var client = _ref.client,
                  token = _ref.token;
              cozy.client.auth.refreshToken(cozy, client, token).then(function (newToken) {
                return cozy.client.saveCredentials(client, newToken);
              }).then(function () {
                return _this.syncDoctype(doctype, replicationUrl);
              });
            });
          } else if (err.status !== 404) {
            // A 404 error on some doctypes is perfectly normal when there is no data
            dispatch(Object(_slices_synchronization__WEBPACK_IMPORTED_MODULE_8__["syncDoctypeError"])(doctype, err));

            _this.scheduleNextSync(doctype, replicationUrl, dispatch);

            reject(err);
          }
        });
      });
    }
  }, {
    key: "scheduleNextSync",
    value: function scheduleNextSync(doctype, replicationUrl, dispatch, direction) {
      var _this2 = this;

      setTimeout(function () {
        _this2.syncDoctype(doctype, replicationUrl, dispatch, direction);
      }, REPLICATION_INTERVAL);
    }
  }, {
    key: "fetchDocuments",
    value: function () {
      var _fetchDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee2(doctype) {
        var resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getDatabase(doctype).allDocs({
                  include_docs: true
                });

              case 2:
                resp = _context2.sent;
                return _context2.abrupt("return", {
                  data: resp.rows.filter(function (row) {
                    return !row.doc.hasOwnProperty('views');
                  }).map(function (row) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, row.doc, {
                      id: row.id,
                      _type: doctype
                    });
                  }),
                  meta: {
                    count: resp.total_rows
                  },
                  skip: resp.offset,
                  next: false
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchDocuments(_x2) {
        return _fetchDocuments.apply(this, arguments);
      }

      return fetchDocuments;
    }()
  }, {
    key: "queryDocuments",
    value: function () {
      var _queryDocuments = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee3(doctype, index, options) {
        var queryOptions, resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, options, {
                  fields: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(options.fields), ['_id']),
                  sort: options.sort ? Object.keys(options.sort).map(function (k) {
                    return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, k, options.sort[k]);
                  }) : undefined
                });
                _context3.next = 3;
                return this.getDatabase(doctype).find(queryOptions);

              case 3:
                resp = _context3.sent;
                return _context3.abrupt("return", {
                  data: resp.docs.map(function (doc) {
                    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, doc, {
                      id: doc._id,
                      _type: doctype
                    });
                  }),
                  meta: {
                    count: resp.docs.length
                  },
                  skip: 0,
                  next: false
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function queryDocuments(_x3, _x4, _x5) {
        return _queryDocuments.apply(this, arguments);
      }

      return queryDocuments;
    }()
  }, {
    key: "fetchDocument",
    value: function () {
      var _fetchDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee4(doctype, id) {
        var resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getDatabase(doctype).get(id, {
                  revs_info: true
                });

              case 2:
                resp = _context4.sent;
                return _context4.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, resp, {
                    id: resp.id,
                    _id: resp.id,
                    _type: doctype
                  })]
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchDocument(_x6, _x7) {
        return _fetchDocument.apply(this, arguments);
      }

      return fetchDocument;
    }()
  }, {
    key: "createDocument",
    value: function () {
      var _createDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee5(doctype, doc) {
        var resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getDatabase(doctype).post(doc);

              case 2:
                resp = _context5.sent;
                return _context5.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, doc, {
                    id: resp.id,
                    _id: resp.id,
                    _type: doctype,
                    _rev: resp.rev
                  })]
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function createDocument(_x8, _x9) {
        return _createDocument.apply(this, arguments);
      }

      return createDocument;
    }()
  }, {
    key: "updateDocument",
    value: function () {
      var _updateDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee6(doc) {
        var _type, safeDoc, resp;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // TODO: _* properties are reserved by CouchDB, so we can't send the doc with its _type property...
                _type = doc._type, safeDoc = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default()(doc, ["_type"]);
                _context6.next = 3;
                return this.getDatabase(_type).put(safeDoc);

              case 3:
                resp = _context6.sent;
                return _context6.abrupt("return", {
                  data: [_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, doc, {
                    _rev: resp.rev
                  })]
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateDocument(_x10) {
        return _updateDocument.apply(this, arguments);
      }

      return updateDocument;
    }()
  }, {
    key: "deleteDocument",
    value: function () {
      var _deleteDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee7(doc) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getDatabase(doc._type).remove(doc);

              case 2:
                return _context7.abrupt("return", {
                  data: [doc]
                });

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteDocument(_x11) {
        return _deleteDocument.apply(this, arguments);
      }

      return deleteDocument;
    }()
  }, {
    key: "createIndex",
    value: function createIndex(doctype, fields) {
      return this.getDatabase(doctype).createIndex({
        index: {
          fields: fields
        }
      });
    }
  }, {
    key: "fetchFileByPath",
    value: function fetchFileByPath() {
      throw new Error('Not implemented');
    }
  }, {
    key: "createFile",
    value: function createFile() {
      throw new Error('Not implemented');
    }
  }, {
    key: "trashFile",
    value: function trashFile() {
      throw new Error('Not implemented');
    }
  }, {
    key: "fetchReferencedFiles",
    value: function fetchReferencedFiles() {
      throw new Error('Not implemented');
    }
  }, {
    key: "addReferencedFiles",
    value: function addReferencedFiles() {
      throw new Error('Not implemented');
    }
  }, {
    key: "removeReferencedFiles",
    value: function removeReferencedFiles() {
      throw new Error('Not implemented');
    }
  }]);

  return PouchdbAdapter;
}();



/***/ }),

/***/ "jpY6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("V2U0");
/* harmony import */ var components_appEntryPoint__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("mD6Q");
/* harmony import */ var containers_IntentService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("XSRU");






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};









var IntentHandler =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(IntentHandler, _Component);

  function IntentHandler(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, IntentHandler);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(IntentHandler).call(this, props, context));
    _this.store = context.store;
    _this.state = {
      isInitializing: true
    };

    _this.store.createIntentService().then(function (service) {
      _this.setState({
        isInitializing: false,
        service: service
      });
    }).catch(function (error) {
      _this.setState({
        isInitializing: false,
        error: {
          message: 'intent.service.error.initialization',
          reason: error.message
        }
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(IntentHandler, [{
    key: "terminate",
    value: function terminate(account) {
      var service = this.state.service;
      service.terminate(account);
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var service = this.state.service;
      service.cancel();
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      this.setState({
        error: {
          message: 'intent.service.error.creation',
          reason: error.message
        }
      });
      throw error;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // const { data } = this.props
      var _this$props = this.props,
          appData = _this$props.appData,
          accounts = _this$props.accounts,
          konnectors = _this$props.konnectors,
          triggers = _this$props.triggers,
          t = _this$props.t;
      var _this$state = this.state,
          error = _this$state.error,
          service = _this$state.service;
      var isInitializing = this.state.isInitializing;
      isInitializing = isInitializing || [accounts, konnectors, triggers].find(function (collection) {
        return ['pending', 'loading'].includes(collection.fetchStatus);
      });
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-service"
      }, isInitializing && react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-service-loading"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_9__["default"], {
        size: "xxlarge"
      })), error && react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-error coz-service-error"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, t(error.message)), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, t('intent.service.error.cause', {
        error: error.reason
      }))), !isInitializing && !error && // Here we should render a component based on the intent action.
      // For now, our action is only CREATE on io.cozy.accounts. So here
      // we should render a component named CreateAccountService.
      // IntentService is just here for legacy reason and should
      // disappear.
      // In the future we may test the intent action and render a
      // specific component for every action.
      react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(containers_IntentService__WEBPACK_IMPORTED_MODULE_11__["default"], {
        appData: appData,
        data: service.getData(),
        onTerminate: function onTerminate(account) {
          return _this2.terminate(account);
        },
        onCancel: function onCancel() {
          return _this2.cancel();
        },
        service: service
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__["Sprite"], null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return IntentHandler;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

IntentHandler.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object
};

var _default = Object(components_appEntryPoint__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__["translate"])()(IntentHandler));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(IntentHandler, "IntentHandler", "/Users/cozy/code/cozy/cozy-home/src/containers/IntentHandler.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/containers/IntentHandler.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "kGy0":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en.json": "8WAw",
	"./fr.json": "H488"
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
webpackContext.id = "kGy0";

/***/ }),

/***/ "m+TH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CozyProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Al7w");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CozyProvider", function() { return _CozyProvider__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _CozyClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("OiML");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CozyClient", function() { return _CozyClient__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("YAxW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cozyConnect", function() { return _connect__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vwW3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cozyMiddleware", function() { return _middleware__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("GbhZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeActionCreator", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["makeActionCreator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchApps", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchApps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCollection", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchReferencedFiles", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchReferencedFiles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectors", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchKonnectors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTriggers", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["fetchTriggers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addReferencedFiles", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["addReferencedFiles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeReferencedFiles", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["removeReferencedFiles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applySelectorForAction", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["applySelectorForAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enhancePropsForActions", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["enhancePropsForActions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCollection", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["getCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["getDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["createDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTrigger", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["createTrigger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "launchTrigger", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["launchTrigger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["updateDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteDocument", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["deleteDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteTrigger", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["deleteTrigger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFile", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["createFile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trashFile", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["trashFile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CREATE_DOCUMENT", function() { return _reducer__WEBPACK_IMPORTED_MODULE_4__["CREATE_DOCUMENT"]; });

/* harmony import */ var _slices_sharings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("og8P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchSharings", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["fetchSharings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchContacts", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["fetchContacts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSharingDetails", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["getSharingDetails"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "share", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["share"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unshare", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["unshare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "leave", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["leave"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareByLink", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["shareByLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "revokeLink", function() { return _slices_sharings__WEBPACK_IMPORTED_MODULE_5__["revokeLink"]; });

/* harmony import */ var _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("skrj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "startSync", function() { return _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__["startSync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFirstSync", function() { return _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__["isFirstSync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSynced", function() { return _slices_synchronization__WEBPACK_IMPORTED_MODULE_6__["isSynced"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("GfxC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadArchive", function() { return _helpers__WEBPACK_IMPORTED_MODULE_7__["downloadArchive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return _helpers__WEBPACK_IMPORTED_MODULE_7__["downloadFile"]; });










/***/ }),

/***/ "mD6Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m+TH");
/* harmony import */ var ducks_accounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3dAU");
/* harmony import */ var ducks_konnectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("uZd2");
/* harmony import */ var ducks_jobs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("sR/t");
/* harmony import */ var ducks_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rGvZ");
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







var mapDocumentsToProps = function mapDocumentsToProps() {
  return {
    accounts: Object(ducks_accounts__WEBPACK_IMPORTED_MODULE_1__["fetchAccounts"])(),
    jobs: Object(ducks_jobs__WEBPACK_IMPORTED_MODULE_3__["fetchKonnectorJobs"])(),
    konnectors: Object(ducks_konnectors__WEBPACK_IMPORTED_MODULE_2__["fetchKonnectors"])(),
    triggers: Object(ducks_triggers__WEBPACK_IMPORTED_MODULE_4__["fetchTriggers"])()
  };
};

var appEntryPoint = function appEntryPoint(WrappedComponent, selectData) {
  return Object(redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["cozyConnect"])(mapDocumentsToProps)(WrappedComponent, selectData);
};

var _default = appEntryPoint;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapDocumentsToProps, "mapDocumentsToProps", "/Users/cozy/code/cozy/cozy-home/src/components/appEntryPoint.jsx");
  reactHotLoader.register(appEntryPoint, "appEntryPoint", "/Users/cozy/code/cozy/cozy-home/src/components/appEntryPoint.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/appEntryPoint.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "oMPT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapValues", function() { return mapValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterValues", function() { return filterValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeObjectProperty", function() { return removeObjectProperty; });
var mapValues = function mapValues(object, transform) {
  var result = {};

  for (var key in object) {
    result[key] = transform(object[key], key);
  }

  return result;
};
var filterValues = function filterValues(object, filter) {
  var result = {};

  for (var key in object) {
    if (filter(object[key], key)) {
      result[key] = object[key];
    }
  }

  return result;
};
var removeObjectProperty = function removeObjectProperty(obj, prop) {
  return Object.keys(obj).reduce(function (result, key) {
    if (key !== prop) {
      result[key] = obj[key];
    }

    return result;
  }, {});
};

/***/ }),

/***/ "og8P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SHARINGS", function() { return FETCH_SHARINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSharings", function() { return fetchSharings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "share", function() { return share; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unshare", function() { return unshare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leave", function() { return leave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareByLink", function() { return shareByLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "revokeLink", function() { return revokeLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchContacts", function() { return fetchContacts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharings", function() { return getSharings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharingStatus", function() { return getSharingStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharingDetails", function() { return getSharingDetails; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("fvjX");
/* harmony import */ var cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("4kcP");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("GbhZ");








var FETCH_SHARINGS = 'FETCH_SHARINGS';
var RECEIVE_SHARINGS_DATA = 'RECEIVE_SHARINGS_DATA';
var RECEIVE_FETCH_SHARINGS_ERROR = 'RECEIVE_FETCH_SHARINGS_ERROR';
var CREATE_SHARING = 'CREATE_SHARING';
var RECEIVE_NEW_SHARING = 'RECEIVE_NEW_SHARING';
var CREATE_SHARING_LINK = 'CREATE_SHARING_LINK';
var RECEIVE_NEW_SHARING_LINK = 'RECEIVE_NEW_SHARING_LINK';
var REVOKE_SHARING_LINK = 'REVOKE_SHARING_LINK';
var RECEIVE_SHARING_LINK_REVOKE = 'RECEIVE_SHARING_LINK_REVOKE';
var REVOKE_SHARING = 'REVOKE_SHARING';
var RECEIVE_SHARING_REVOKE = 'RECEIVE_SHARING_REVOKE';
var RECEIVE_ERROR = 'RECEIVE_ERROR';

var removeRecipient = function removeRecipient(recipients, recipientId) {
  var idx = recipients.findIndex(function (r) {
    return r.recipient.id === recipientId;
  });
  return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(recipients.slice(0, idx)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(recipients.slice(idx + 1)));
};

var documents = function documents() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_SHARINGS_DATA:
      return action.response.sharings;

    case RECEIVE_NEW_SHARING:
      return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state), [action.response]);

    case RECEIVE_SHARING_REVOKE:
      {
        var idx = state.findIndex(function (s) {
          return s.attributes.sharing_id === action.sharingId;
        });
        if (idx === -1) return state;
        var sharing = state[idx];
        var loneRecipient = sharing.attributes.recipients === undefined || // for recipient-side revocation
        sharing.attributes.recipients.length === 1;
        var newState = loneRecipient ? _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing, {
          attributes: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing.attributes, {
            revoked: true
          })
        }) : _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing, {
          attributes: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, sharing.attributes, {
            recipients: removeRecipient(sharing.attributes.recipients, action.recipientId)
          })
        });
        return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state.slice(0, idx)), [newState], _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state.slice(idx + 1)));
      }

    default:
      return state;
  }
};

var doctypePermsetInitialState = {
  fetchStatus: 'loading',
  byMe: [],
  byLink: [],
  withMe: []
};

var permissions = function permissions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var idx;

  switch (action.type) {
    case FETCH_SHARINGS:
      if (state[action.doctype]) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
          fetchStatus: 'loading'
        })));
      }

      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, doctypePermsetInitialState));

    case RECEIVE_SHARINGS_DATA:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
        fetchStatus: 'loaded'
      }, action.response.permissions)));

    case RECEIVE_FETCH_SHARINGS_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, {
        fetchStatus: 'error'
      }));

    case RECEIVE_NEW_SHARING:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
        byMe: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byMe), [{
          attributes: {
            permissions: {
              rule0: {
                type: action.doctype,
                values: [action.id]
              }
            },
            source_id: action.response.attributes.sharing_id,
            type: 'io.cozy.sharings'
          }
        }])
      })));

    case RECEIVE_NEW_SHARING_LINK:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
        byLink: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byLink), [action.response])
      })));

    case REVOKE_SHARING_LINK:
      idx = state[action.doctype].byLink.findIndex(function (p) {
        return action.permission._id === p._id;
      });
      if (idx === -1) return state;
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state[action.doctype], {
        byLink: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byLink.slice(0, idx)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(state[action.doctype].byLink.slice(idx + 1)))
      })));

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_5__["combineReducers"])({
  documents: documents,
  permissions: permissions
})); // actions

var fetchSharings = function fetchSharings(doctype) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    types: [FETCH_SHARINGS, RECEIVE_SHARINGS_DATA, RECEIVE_FETCH_SHARINGS_ERROR],
    doctype: doctype,
    id: id,
    options: options,
    promise: function promise(client) {
      return client.fetchSharings(doctype);
    }
  };
};
var share = function share(document, recipients, sharingType, sharingDesc) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        var recipientIds;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all(recipients.map(function (recipient) {
                  return recipient.id || dispatch(createContact(recipient)).then(function (c) {
                    return c.data[0].id;
                  });
                }));

              case 2:
                recipientIds = _context.sent;
                trackSharingByEmail(document);
                return _context.abrupt("return", dispatch(createSharing(document, recipientIds, sharingType, sharingDesc)));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var unshare = function unshare(document, recipient) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(dispatch, getState) {
        var sharing, loneRecipient;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sharing = getSharingForRecipient(getState(), document, recipient);
                loneRecipient = sharing.attributes.recipients.length === 1;
                return _context2.abrupt("return", dispatch({
                  types: [REVOKE_SHARING, RECEIVE_SHARING_REVOKE, RECEIVE_ERROR],
                  doctype: document._type,
                  id: document._id,
                  sharingId: sharing.attributes.sharing_id,
                  recipientId: recipient._id,
                  promise: function promise(client) {
                    return loneRecipient ? client.revokeSharing(sharing.attributes.sharing_id) : client.revokeSharingForClient(sharing.attributes.sharing_id, sharing.attributes.recipients.find(function (r) {
                      return r.recipient.id === recipient._id;
                    }).Client.client_id);
                  }
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
var leave = function leave(document) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(dispatch, getState) {
        var sharings, sharing;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sharings = getDocumentActiveSharings(getState(), document._type, document._id);
                sharing = sharings.find(function (s) {
                  return s.attributes.owner === false;
                });
                return _context3.abrupt("return", dispatch({
                  types: [REVOKE_SHARING, RECEIVE_SHARING_REVOKE, RECEIVE_ERROR],
                  doctype: document._type,
                  id: document._id,
                  sharingId: sharing.attributes.sharing_id,
                  promise: function promise(client) {
                    return client.revokeSharing(sharing.attributes.sharing_id);
                  }
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};
var shareByLink = function shareByLink(document) {
  trackSharingByLink(document);
  return createSharingLink(document);
};
var revokeLink = function revokeLink(document) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(dispatch, getState) {
        var perm;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                perm = getSharingLinkPermission(getState(), document._type, document._id);
                return _context4.abrupt("return", dispatch({
                  types: [REVOKE_SHARING_LINK, RECEIVE_SHARING_LINK_REVOKE, RECEIVE_ERROR],
                  doctype: document._type,
                  id: document._id,
                  permission: perm,
                  promise: function promise(client) {
                    return client.revokeSharingLink(perm);
                  }
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};

var createSharing = function createSharing(document, contactIds) {
  var sharingType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'master-slave';
  var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return {
    types: [CREATE_SHARING, RECEIVE_NEW_SHARING, RECEIVE_ERROR],
    doctype: document._type,
    id: document._id,
    promise: function promise(client) {
      return client.createSharing(getPermissionsFor(document), contactIds, sharingType, description);
    }
  };
};

var createSharingLink = function createSharingLink(document) {
  return {
    types: [CREATE_SHARING_LINK, RECEIVE_NEW_SHARING_LINK, RECEIVE_ERROR],
    doctype: document._type,
    id: document._id,
    promise: function promise(client) {
      return client.createSharingLink(getPermissionsFor(document, true));
    }
  };
}; // TODO: this is a poor man's migration in order to normalize contacts
// and should be removed after a few weeks in prod
// Note for future-self: If you have no idea of what it means, please, erase this code.
// Note for time-travelers: please travel a little more back in time in order to advise us
// to get contacts right the first time


var fetchContacts = function fetchContacts() {
  var action = Object(_reducer__WEBPACK_IMPORTED_MODULE_7__["fetchCollection"])('contacts', 'io.cozy.contacts');

  action.promise =
  /*#__PURE__*/
  function () {
    var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(client) {
      var response, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return client.fetchCollection('contacts', 'io.cozy.contacts');

            case 2:
              response = _context5.sent;
              _context5.next = 5;
              return Promise.all(response.data.map(function (contact) {
                return typeof contact.email !== 'string' ? contact : client.updateDocument(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, contact, {
                  email: [{
                    address: contact.email,
                    primary: true
                  }]
                })).then(function (resp) {
                  return resp.data[0];
                });
              }));

            case 5:
              data = _context5.sent;
              return _context5.abrupt("return", _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, response, {
                data: data
              }));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  return action;
};

var createContact = function createContact(_ref6) {
  var email = _ref6.email;
  return Object(_reducer__WEBPACK_IMPORTED_MODULE_7__["createDocument"])('io.cozy.contacts', {
    email: [{
      address: email,
      primary: true
    }]
  });
};

var getPermissionsFor = function getPermissionsFor(document) {
  var publicLink = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _id = document._id,
      _type = document._type;
  var verbs = publicLink ? ['GET'] : ['ALL']; // TODO: this works for albums, but it needs to be generalized and integrated
  // with cozy-client ; some sort of doctype "schema" will be needed here

  return isFile(document) ? {
    files: {
      type: 'io.cozy.files',
      verbs: verbs,
      values: [_id]
    }
  } : {
    collection: {
      type: _type,
      verbs: verbs,
      values: [_id]
    },
    files: {
      type: 'io.cozy.files',
      verbs: verbs,
      values: ["".concat(_type, "/").concat(_id)],
      selector: 'referenced_by'
    }
  };
}; // selectors


var getSharing = function getSharing(state, id) {
  return state.cozy.sharings.documents.find(function (s) {
    return s.attributes.sharing_id === id;
  });
};

var getContact = function getContact(state, id) {
  return Object(_reducer__WEBPACK_IMPORTED_MODULE_7__["getDocument"])(state, 'io.cozy.contacts', id);
};

var getDoctypePermissions = function getDoctypePermissions(state, doctype) {
  if (state.cozy.sharings.permissions[doctype]) {
    return state.cozy.sharings.permissions[doctype];
  }

  return doctypePermsetInitialState;
};

var getSharingLink = function getSharingLink(state, doctype, id) {
  var perm = getSharingLinkPermission(state, doctype, id);
  return perm ? buildSharingLink(id, doctype, perm.attributes.codes.email) : null;
};

var getSharingLinkPermission = function getSharingLinkPermission(state, doctype, id) {
  var perms = getDoctypePermissions(state, doctype);
  var type = isFile({
    _type: doctype
  }) ? 'files' : 'collection';
  return perms.byLink.find(function (p) {
    return p.attributes.permissions[type].values.indexOf(id) !== -1;
  });
};

var getSharingForRecipient = function getSharingForRecipient(state, document, recipient) {
  var sharings = getDocumentActiveSharings(state, document._type, document._id);
  return sharings.find(function (s) {
    return s.attributes.recipients.find(function (r) {
      return r.recipient.id === recipient._id;
    });
  });
};

var getDocumentActiveSharings = function getDocumentActiveSharings(state, doctype, id) {
  var perms = getDoctypePermissions(state, doctype);
  return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(perms.byMe.filter(function (perm) {
    return perm.attributes.permissions['rule0'].values.indexOf(id) !== -1;
  })), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(perms.withMe.filter(function (perm) {
    return perm.attributes.permissions['rule0'].values.indexOf(id) !== -1;
  }))).map(function (p) {
    return getSharing(state, p.attributes.source_id);
  }).filter(function (s) {
    return !s.attributes.revoked;
  });
};

var getSharings = function getSharings(state, doctype) {
  var perms = getDoctypePermissions(state, doctype);
  var type = doctype === 'io.cozy.files' ? 'files' : 'collection';
  return {
    byMe: perms.byMe.map(function (p) {
      return p.attributes.permissions['rule0'].values[0];
    }),
    withMe: perms.withMe.map(function (p) {
      return p.attributes.permissions['rule0'].values[0];
    }),
    byLink: perms.byLink.map(function (p) {
      return p.attributes.permissions[type].values[0];
    })
  };
};
var getSharingStatus = function getSharingStatus(state, doctype, id) {
  var sharings = getDocumentActiveSharings(state, doctype, id);
  return {
    shared: sharings.length !== 0,
    owner: sharings.length === 0 || sharings.some(function (s) {
      return s.attributes.owner === true;
    }),
    sharingType: sharings.some(function (s) {
      return s.attributes.sharing_type === 'master-master';
    }) ? 'master-master' : 'master-slave',
    sharings: sharings
  };
};
var getSharingDetails = function getSharingDetails(state, doctype, id) {
  var _getSharingStatus = getSharingStatus(state, doctype, id),
      shared = _getSharingStatus.shared,
      owner = _getSharingStatus.owner,
      sharingType = _getSharingStatus.sharingType,
      sharings = _getSharingStatus.sharings;

  var sharingLink = getSharingLink(state, doctype, id);
  return {
    shared: shared,
    owner: owner,
    sharingType: sharingType,
    sharingLink: sharingLink,
    sharer: shared && !owner ? {
      name: 'John Doe',
      url: sharings[0].attributes.sharer.url
    } : null,
    readOnly: !owner && sharingType === 'master-slave',
    recipients: shared && owner ? getSharingRecipients(state, sharings) : [],
    byMe: shared && owner === true,
    withMe: shared && !owner,
    byLink: !!sharingLink
  };
};

var getSharingRecipients = function getSharingRecipients(state, sharings) {
  return sharings.filter(function (sharing) {
    return sharing.attributes.recipients;
  }).map(function (sharing) {
    return sharing.attributes.recipients.map(function (info) {
      return {
        contact: getContact(state, info.recipient.id),
        status: info.status,
        type: sharing.attributes.sharing_type
      };
    });
  }).reduce(function (a, b) {
    return a.concat(b);
  }, []);
};

var buildSharingLink = function buildSharingLink(id, doctype, sharecode) {
  return "".concat(window.location.origin, "/public?sharecode=").concat(sharecode, "&id=").concat(id).concat(doctype === 'file' ? '&directdownload' : '');
}; // helpers


var isFile = function isFile(_ref7) {
  var _type = _ref7._type,
      type = _ref7.type;
  return _type === 'io.cozy.files' || type === 'directory' || type === 'file';
};

var track = function track(document, action) {
  var tracker = Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_6__["getTracker"])();

  if (!tracker) {
    return;
  }

  tracker.push(['trackEvent', isFile(document) ? 'Drive' : 'Photos', action, "".concat(action).concat(isFile(document) ? 'File' : 'Album')]);
};

var trackSharingByLink = function trackSharingByLink(document) {
  return track(document, 'shareByLink');
};

var trackSharingByEmail = function trackSharingByEmail(document) {
  return track(document, 'shareByEmail');
};

/***/ }),

/***/ "oway":
/***/ (function(module) {

module.exports = {"app":{"logo":{"alt":"%{name} logo"},"logout":"Desconexión"},"date":{"format":"DD/MM/YYYY","placeholder":"dd/mm/yyyy"},"manifest":{"name":"Inicio","short_description":"Cozy Collect es la aplicación que le ayuda a recopilar todos sus datos personales que están en Cozy.","long_description":"Con Cozy Collect, usted puede facilmente:\n* Descargar documentos de todos sus proveedores\n* Establecer la frecuencia con la que Cozy recopilará sus facturas\n* Acceder directoamente a los documentos recopilados por su Cozy","changes":"Seguro ya se ha dado cuenta, el Store ha llegado a su Cozy\nAprovechamos para mejorar Collect:\n*Adaptación a Store.\n*Fusión de fichas: cuando se tienen diversas cuentas en un proveedor, la primera se fusiona baja la ficha del proveedor.\n*Mejora de algunas páginas de Conectores."},"add_service":"Añadir","fix_konnector_error":"Fix now","account":{"config":{"default_folder":"/Administrative/%{name}","optional":"(Opcional)","title":"Conecte su cuenta %{name} ","data":{"title":"Datos recopilados:","service":{"description":"Descripción del servicio:"}},"tabs":{"sync":"sincronización","account":"cuenta","data":"datos recopilados"}},"disconnect":{"title":"Desconexión","description":"Usted se desconectará de esta cuenta, pero se guardarán los datos importados"},"form":{"title":"Cuenta","label":{"firstname":"Nombre","lastname":"Apellido","login":"Login","consumerKey":"Clave del usuario","consumerSecret":"Secreto del usuario","appKey":"Clave de la aplicación","appSecret":"Secreto de la aplicación","tricountUrl":"URL Tricount","cardNumber":"Número de tarjeta","dob":"Fecha de nacimiento","password":"Contraseña","email":"Email","bank_identifier":"Identificante bancario (opcional)","profileName":"Nombre del perfil","identifier":"Identificador","new_identifier":"Identificador","secret":"Contraseña","answer":"Respuesta secreta","access_token":"Token de acceso","accessTokenSecret":"Token de acceso secreto","apikey":"Clave Api","phoneNumber":"Número de teléfono","folderPath":"Ruta de la carpeta","namePath":"Nombre de la carpeta","authCode":"Código de autorización","accountName":"Nombre de la cuenta","loginUrl":"URL de acceso","token":"Token","agreement":"Acepto","refreshToken":"Recargar el token","timeout":"Retardo (ms)","branchName":"Oficina","code":"Código confidencial"},"placeholder":{"password":"La contraseña que usted usa para acceder al servicio","update_password":"Actualizar la contraseña","accountName":"Ejemplo: Cuenta personal","namePath":"Ejemplo: Facturas de Camille. La ruta de nombre predeterminado es su login."},"button":{"connect":"Conectar","cancel":"Cancelar","save":"Guardar","disconnect":"Desconectar esta cuenta","delete":"Borrar esta cuenta","advanced":"Opciones avanzadas","synchronize":"Sincronizar ahora"}},"folder":{"title":"Configuración de carpetas relacionadas","withoutSettings":{"title":"Carpeta relacionada"},"link":"Abrir la carpeta en Cozy Drive","changePath":"cambiar la ruta de acceso","error":"Oops, algo salió mal. No se asuste, sus archivos siguen ahí, por favor vuelva a intentarlo más tarde.","close":"cerrar","warning":"Usted cambia su ruta de acceso","oldFiles":"Todas sus facturas serán trasladadas a su nueva ruta de acceso","newFiles":"Sus nuevas facturas serán descargadas a su nueva ruta de acceso","newPath":"Todo salió bien, el nuevo camino de acceso para su cuenta %{name} es:","placeholder":{"administrative":"Administrativa","photos":"Fotos"}},"success":{"title":{"connect":"Configuración correcta!","update":"¡Su cuenta %{name} ha sido actualizada!"},"banksLinkText":"Ver mis cuentas en %{appName}","driveLinkText":"Abrir la carpeta en Cozy Drive","button":"Cerrar"},"message":{"folder":{"title":"Carpeta","link":"Abrir la carpeta en Cozy Drive"},"success":{"connect":"Sus datos estarán disponibles en su Cozy en pocos minutos y a partir de ese momento, los siguientes lo estarán automáticamente.","update":"¡Su cuenta %{name} ha sido actualizada exitosamente.","delete":"Cuenta suprimida exitosamente."},"syncing":{"bill":"Sus facturas están sincronizándose y estarán disponibles en la siguiente dirección:"},"synced":{"title":"Sincronización de sus datos","cron":"Frecuencia de sincronización: %{frequency}","cron_hourly":"cada hora","cron_daily":"una vez por día","cron_weekly":"una vez por semana","cron_monthly":"una vez por mes","cron_undefined":"manualmente","syncing":"ejecutándose...","unknown":"desconocido","last_sync":"Última sincronización: **%{date}**","date_format":"MMMM D[,] YYYY [a las] HH[:]mm","bill":"Encuentre sus datos en la aplicación Drive en este sitio:"},"error":{"server":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?","bad_credentials":"Lo siento, uste ha escrito un login o una contraseña incorrectos.","delete":"Discúlpenos, nuestro servidor tuvo un contratiempo, le importaría arrancar de nuevo?"}},"forceConnection":"Vuelva a ejecutar","editor_detail":"Servicio desarrolado por %{editor}"},"account_picker":{"add_account_button":{"label":"Añadir una cuenta"}},"apps":{"title":"Mis apps"},"connection":{"CTA":{"twofa_failed":"Vuelva a ejecutar"},"error":{"default":{"title":"Ha ocurrido un error","description":"Desafortunadamente, algo salió mal al intentar conectar con %{name}. Por favor, controle otra vez la información de su cuenta, visite nuestra ayuda en línea o contáctenos en contact@cozycloud.cc."},"DISK_QUOTA_EXCEEDED":{"title":"El amacenamiento de Cozy está lleno","description":"Este servicio no puede recuperar sus documentos ahora. Por favor, borre algunos archivos o vaya a \"Ajustes > Almacenamiento** para obtener más espacio libre."},"CHALLENGE_ASKED":{"title":"Se requiere Challenge","description":"Parece que el sitio web requiere un segundo factor de autenticación que aún no está disponible. Puede intentar resolver el problema en el sitio web[%{name}](%{link}) antes de volver a intentarlo."},"LOGIN_FAILED":{"title":"Malas credenciales","description":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo."},"LOGIN_FAILED.NEEDS_SECRET":{"title":"Secreto exigido","description":"Se debe llenar un campo adicional antes de controlar sus credenciales."},"LOGIN_FAILED.TOO_MANY_ATTEMPTS":{"title":"Bloqueado temporalmente","description":"Se hicieron demasiados intentos. Por favor, actualice sus credenciales en el sitio web[%{name}](%{link}) y actualice el conector más tarde."},"MAINTENANCE":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible o que el konnector debe actualizarse. Vuelva a ejecutar el conector más tarde o visite nuestra ayuda en línea."},"NOT_EXISTING_DIRECTORY":{"title":"Falta la carpeta de destino","description":"Parece que la carpeta de destino de esta cuenta ha sido borrada. Por favor desconéctese de la cuenta, restáurela y vuelva a conectarse."},"UNKNOWN_ERROR":{"title":"Error de conexión","description":"Ha ocurrido un error no identificado."},"USER_ACTION_NEEDED":{"title":"Acción necesaria con el proveedor","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y realice una acción específica. Vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.OAUTH_OUTDATED":{"title":"Se requiere volver a acceder","description":"El servicio [%{name}](%{link}) requiere que usted vuelva a acceder. Por favor desconecte y reconecte su cuenta %{name} a esta aplicación. No se perderá ningún dato."},"USER_ACTION_NEEDED.ACCOUNT_REMOVED":{"title":"Cuenta no disponible","description":"Parece que su cuenta no está activa. Compruebe su cuenta en[%{name}](%{link}) antes de volver a intentarlo."},"USER_ACTION_NEEDED.CHANGE_PASSWORD":{"title":"Se requiere actualizar la contraseña","description":"Parece que el sitio web[%{name}](%{link}) requiere que inicie sesión y actualice su contraseña. Por favor, vuelva a ejecutar el conector una vez que haya resuelto el problema en la página web."},"USER_ACTION_NEEDED.PERMISSIONS_CHANGED":{"title":"Se necesitan nuevos permisos de validación","description":"Su conector fue actualizado y los permisos cambiados. Por favor, valídelos antes de volver a lanzar el conector."},"USER_ACTION_NEEDED.TWOFA_EXPIRED":{"title":"Relanzar la conexión al servicio para recuperar sus datos","description":"La última conexión al servicio ha fallado; por favor, láncela de nuevo. Es posible que tenga que proporcionar un código de validación."},"USER_ACTION_NEEDED.WRONG_TWOFA_CODE":{"title":"Código suministrado para dos factores es equivocado","description":"El código para dos factores suministrado esta errado, ensaye de nuevo por favor."},"VENDOR_DOWN":{"title":"Servicio no disponible","description":"Parece que el servicio[%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.BANK_DOWN":{"title":"Sitio web no disponible","description":"Parece que el sitio web [%{name}](%{link}) no está disponible en este momento. Por favor, vuelva a ejecutar el conector más tarde."},"VENDOR_DOWN.LINXO_DOWN":{"title":"Servicio no disponible","description":"Parece que en este momento estamos experimentando una sobrecarga con nuestros conectores bancarios. Por favor, vuelva a ejecutar el conector más tarde."}}},"intent":{"konnector":{"install":{"error":{"message":"Este conector no se puede instalar"}}},"service":{"return":"Volver a la lista de conectores","success":{"button":{"label":"Cerrar"}},"error":{"initialization":"El servicio ha fallado al inicializarse. Sentimos los inconvenientes.","creation":"Imposible crear una cuenta, ha ocurrido un error.","cause":"Causa: %{error}"},"cancel":"Cancelar","terminate":"Terminar"}},"field":{"password":{"visibility":{"hide":"Ocultar","show":"Mostrar","title":{"hide":"Ocultar la contraseña","show":"Mostrar la contraseña"}}}},"nav":{"services":"Servicios instalados"},"category":{"all":"Todo","banking":"Bancos","health":"Salud","insurance":"Seguros","transport":"Transporte","social":"Social","isp":"PSI","telecom":"Telecom","energy":"Energía","host_provider":"Huesped","productivity":"Productividad","shopping":"Compras","public_service":"Servicios Públicos","other":"Otros"},"loading":{"initial":"Cargando cuentas...","working":"Cargando"},"validation":{"exact_length":"Debe estar compuesto de %{length} caracteres exactamente.","max_length":"La longitud máxima es de %{length}  caracteres.","min_length":"Debe contener al menos %{length} caracteres.","pattern":"El valor debe coincidir con un patrón específico: %{pattern}.\n"},"update":{"title":"Está disponible una actualización de este servicio.","regular":"Actualice esta versión para seguir obteniendo sus datos y disponer de las últimas mejoras.","blocking":"Actualícela para seguir obteniendo sus datos","CTA":"Actualizar"},"error":{"initial":"Algo ocurrió al recolectar sus colectores y sus datos. por favor, vuelva a cargar la página.","LOGIN_FAILED":"Malas credenciales. Controle los campos de su conector y vuelva a ejecutarlo.","UNKNOWN_ERROR":"Algo inesperado ha ocurrido al ejecutar el conector","JOB_TIMEOUT":"La ejecución del conector ha tardado mucho","button":{"reload":"Volver a cargar la página ahora"}},"tutorial":{"cozy_collect":{"title":"Automatice la recolección de sus datos","text":"Ellos serán almacenados en su Cozy, usted no tendrá que buscarlos en parte alguna.","button":"Siguiente"},"home":{"apps":{"button":"Siguiente","text":"Organice facilmente su vida numérica (archivos, imágenes, cuentas de banco, ...)","title":"Acceda a todas sus aplicaciones Cozy"},"services":{"button":"Configurar mis cuentas","text":"Ellos serán almacenados en su Cozy, usted no tendrá que buscarlos en parte alguna.","title":"Automatice la recolección de sus datos"}},"menu_apps":{"title":"Su Cozy es mucho más que un simple agregador de datos","text":"Abra el menú de Aplicaciones para descubrir las características que Cozy puede ofrecerle.","button":"Descubrir mis aplicaciones"}},"maintenance":{"icon":"Este conector está en mantenimiento","service":"Servicio interrumpido","problem":"%{konnectorName} no permite que su Cozy acceda a sus datos","title":"¿Qué sucede?"},"connector":{"debug":{"successMessage":"Este konnector es sólo para fines de debug, este es un mensaje habitual adicional de éxito."},"empty":{"title":"¡Empiece a recopilar sus datos!","text":"Sincronice sus cuentas con su Cozy para recuperar automáticamente sus datos (facturas, reembolsos, gastos...)"},"silenced":"%{name} no se sugerirá más. Siempre puede encontrar un proveedor haciendo clic en el botón \"Añadir\".","noAccount":"Cuenta inexistente","add":"Añadir un servicio","update":"Actualización disponible","logo":{"alt":"%{name} logo\n"},"enedis":{"description":{"service":"Recupere sus datos de Linky conectandose a su cuenta de Enedis. Debe tener un medidor Linky y haber creado antes su cuenta de Enedis [en el sitio web de Enedis] (https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers). Fing proporciona este conector para el proyecto MesInfos. Recupera los datos de su contrato de electricidad y descarga su consumo de electricidad del día anterior. Este conector se ejecuta en su Cozy y Fing no tendrá acceso a estos datos."}},"orange":{"message":{"delay":"Una vez conectado, se envía al sistema de información de Orange una solicitud para extraer sus datos. Estos datos son válidos durante 15 días. Sus datos se actualizan automáticamente cada quince días."}},"orangemobile":{"description":{"connector":"En el contexto de 'MesInfos', Orange le permite localizar permanentemente su teléfono.\n\n**La recopilación de datos exige su acuerdo previo**\n\nHaciendo clic en \"Apruebo\", usted consiente que se recopile la posición de su teléfono, cada 30 minutos. La información recopilada será la siguiente:\nFecha y hora de la ubicación.\nDatos de la ubicación de la antena más cercana en el momento de la recopimación.\nLos datos recopilados por Orange después de su aceptación estarán disponibles sólo en el Cozy que usted ha asignado en el contexto de 'MesInfos'. Se añadirán a sus datos de ubicación almacenados en su registro de llamadas.","service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente los registros de llamadas de su teléfono. Estos registros de llamadas incluyen su número de teléfono, el número de teléfono de su corresponsal, fecha, duración de la llamada  y datos sobre la localización de la antena radio más cercana en el momento de la recopilación.\n\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \"Mapeando Mi Vida\" (pronto disponible en el Cozy Store).","field":{"agreement":"¿En el contexto de \"Mes infos\", aprueba usted que Orange localice regularmente su teléfono ?"}}},"orangevideos":{"description":{"service":"Este conector carga datos de su cuenta Orange a su Cozy. Carga automáticamente la lista de las películas que usted ha descargado gratis (TV Replay) o pagando VOD desde em 01/01/2015 (no se incluyen películos con contenido para adultos°.\\n\\nUsted podrá utilizar esos datos en diferentes aplicaciones de su Cozy, por ejemplo \"My Movies Music\" (pronto disponible en el Cozy Store)."}},"axabanque102":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"banquepopulaire":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"barclays136":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bforbank97":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bnpparibas82":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"boursorama83":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"bred":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caatlantica3":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"caissedepargne1":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"carrefour159":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"casden173":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup109":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cdngroup88":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic45":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"cic63":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"comptenickel168":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditcooperatif148":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"creditmaritime":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"fortuneo84":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hellobank145":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"hsbc119":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo).","connector":"La respuesta secreta es [pregunta por HSBC](https://www.hsbc.fr/1/2/hsbc-france/particuliers/connexion) cuando usted se conecta sin doble autenticación. Ejemplo: ¿Cómo se llama su mascota?"}},"ingdirect95":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"labanquepostale44":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl143":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl144":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"lcl146":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"monabanq96":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}},"societegenerale":{"description":{"service":"La conexión con su banco la opera y asegura nuestro asociado: Linxo. [Más información en] (https://support.cozy.io/article/147-linxo)."}}},"Queue":{"header":"Sincronizando cuentas","header_mobile":"%{done} de %{total}","header_done":"Sincronizado %{done}  de %{total}","item":{"pending":"Pendiente"},"close":"Cerrar"},"services":{"title":"Servicios instalados"},"status":{"interrupted":"SEVICIO INTERRUMPIDO","edf":{"maintenance":"El sistema de información de EDF ha cambiado y el acceso a los datos relacionados no funciona. Este konnector no puede recuperar actualmente sus datos de EDF. Estamos tratando de restaurar la situación y le notificaremos cuando se arregle. [Más información en](%{supportLink})","support_link":"https://support.cozy.io/article/123-le-connecteur-edf-ne-fonctionne-pas"}},"tile":{"konnector":{"lastSyncDate":{"format":"DD MMM"}}}};

/***/ }),

/***/ "rGvZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCTYPE", function() { return DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTriggers", function() { return fetchTriggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnectorTriggers", function() { return getKonnectorTriggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTrigger", function() { return getTrigger; });
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m+TH");

var DOCTYPE = 'io.cozy.triggers';
var triggersCollectionKey = 'triggers'; // CRUD action creators

var fetchTriggers = function fetchTriggers() {
  return redux_cozy_client__WEBPACK_IMPORTED_MODULE_0__["fetchTriggers"](triggersCollectionKey, 'konnector');
}; // selectors

var getKonnectorTriggers = function getKonnectorTriggers(state, konnector) {
  var existingAccountIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]).filter(function (trigger) {
    return trigger.worker === 'konnector' && trigger.message && trigger.message.konnector === konnector.slug && trigger.message.account && existingAccountIds.includes(trigger.message.account);
  }) || [];
};
var getTrigger = function getTrigger(state, id) {
  return !!state.documents && !!state.documents[DOCTYPE] && state.documents[DOCTYPE][id];
};

/***/ }),

/***/ "sR/t":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectorJobs", function() { return fetchKonnectorJobs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTriggerLastJob", function() { return getTriggerLastJob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isJobRunning", function() { return isJobRunning; });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("NAv5");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_0__);

var DOCTYPE = 'io.cozy.jobs'; // CRUD

var fetchKonnectorJobs = function fetchKonnectorJobs() {}; // selectors

var getTriggerLastJob = function getTriggerLastJob(state, trigger) {
  // state is state.cozy
  if (!state.documents || !state.documents[DOCTYPE] || !trigger) return null;
  return Object.values(state.documents[DOCTYPE]).reduce(function (lastestJob, currentJob) {
    if (currentJob.trigger_id !== trigger._id) return lastestJob;
    if (!lastestJob) return currentJob;
    return date_fns__WEBPACK_IMPORTED_MODULE_0___default.a.isAfter(currentJob.started_at, lastestJob.started_at) ? currentJob : lastestJob;
  }, null);
};
var isJobRunning = function isJobRunning(state, job) {
  return !!job && ['queued', 'running'].includes(job.state);
};

/***/ }),

/***/ "skrj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startSync", function() { return startSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startDoctypeSync", function() { return startDoctypeSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncDoctypeOk", function() { return syncDoctypeOk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncDoctypeError", function() { return syncDoctypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFirstSync", function() { return isFirstSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSynced", function() { return isSynced; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);




var START_SYNC = 'START_SYNC';
var START_DOCTYPE_SYNC = 'START_DOCTYPE_SYNC';
var SYNC_DOCTYPE_OK = 'SYNC_DOCTYPE_OK';
var SYNC_DOCTYPE_ERROR = 'SYNC_DOCTYPE_ERROR';
var doctypeSyncInitialState = {
  syncStatus: 'pending',
  lastSync: null,
  seqNumber: 0
};

var doctypeSync = function doctypeSync() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : doctypeSyncInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case START_DOCTYPE_SYNC:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        syncStatus: 'syncing',
        seqNumber: action.seqNumber
      });

    case SYNC_DOCTYPE_OK:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        syncStatus: 'done',
        lastSync: Date.now()
      });

    case SYNC_DOCTYPE_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
        syncStatus: 'error',
        lastSync: Date.now()
      });

    default:
      return state;
  }
};

var synchronization = function synchronization() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case START_DOCTYPE_SYNC:
    case SYNC_DOCTYPE_OK:
    case SYNC_DOCTYPE_ERROR:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, action.doctype, doctypeSync(state[action.doctype], action)));

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (synchronization);
var startSync = function startSync() {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", dispatch({
                  type: START_SYNC,
                  promise: function promise(client) {
                    return client.startSync(dispatch);
                  }
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var startDoctypeSync = function startDoctypeSync(doctype) {
  var seqNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    type: START_DOCTYPE_SYNC,
    doctype: doctype,
    seqNumber: seqNumber
  };
};
var syncDoctypeOk = function syncDoctypeOk(doctype, infos) {
  return {
    type: SYNC_DOCTYPE_OK,
    doctype: doctype,
    infos: infos
  };
};
var syncDoctypeError = function syncDoctypeError(doctype, error) {
  return {
    type: SYNC_DOCTYPE_ERROR,
    doctype: doctype,
    error: error
  };
};
var isFirstSync = function isFirstSync(state) {
  var seqNumbers = Object.keys(state.cozy.synchronization).map(function (doctype) {
    return state.cozy.synchronization[doctype].seqNumber;
  });
  return seqNumbers.every(function (number) {
    return number === 0;
  });
};
var isSynced = function isSynced(state) {
  var timestamps = Object.keys(state.cozy.synchronization).map(function (doctype) {
    return state.cozy.synchronization[doctype].lastSync;
  });
  return timestamps.every(function (ts) {
    return ts !== null;
  });
};

/***/ }),

/***/ "u5EB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("sCMN");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4P+e");
/* harmony import */ var styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/* global cozy */





var BanksLink = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(function (_ref) {
  var banksUrl = _ref.banksUrl,
      t = _ref.t;
  return banksUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_1__["default"], {
    slug: "banks",
    href: banksUrl
  }, function (_ref2) {
    var href = _ref2.href,
        onClick = _ref2.onClick,
        name = _ref2.name;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4___default.a['col-account-success-link'],
      href: href,
      target: "_top",
      onClick: onClick
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "u-mr-half",
      icon: "openwith"
    }), t('account.success.banksLinkText', {
      appName: name
    }));
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: styles_konnectorSuccess_styl__WEBPACK_IMPORTED_MODULE_4___default.a['col-account-success-link'],
    onClick: function onClick() {
      return cozy.client.intents.redirect('io.cozy.apps', {
        slug: 'banks'
      }, function (url) {
        window.top.location.href = url;
      });
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "u-mr-half",
    icon: "openwith"
  }), t('account.success.banksLinkText'));
});
var _default = BanksLink;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BanksLink, "BanksLink", "/Users/cozy/code/cozy/cozy-home/src/components/BanksLink.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/BanksLink.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "uZd2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCTYPE", function() { return DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchKonnectors", function() { return fetchKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveInstalledKonnector", function() { return receiveInstalledKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKonnector", function() { return getKonnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstalledKonnectors", function() { return getInstalledKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIndexedKonnectors", function() { return getIndexedKonnectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSlugs", function() { return getSlugs; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("m+TH");


var DOCTYPE = 'io.cozy.konnectors';
var konnectorsCollectionKey = 'konnectors'; // CRUD

var fetchKonnectors = function fetchKonnectors() {
  return redux_cozy_client__WEBPACK_IMPORTED_MODULE_1__["fetchKonnectors"](konnectorsCollectionKey);
}; // Action creators

var receiveInstalledKonnector = function receiveInstalledKonnector(konnector) {
  var normalized = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, konnector, konnector.attributes, {
    id: "".concat(DOCTYPE, "/").concat(konnector.slug),
    _type: DOCTYPE
  });

  return {
    doctype: DOCTYPE,
    type: 'RECEIVE_NEW_DOCUMENT',
    response: {
      data: [normalized]
    },
    updateCollections: ['konnectors']
  };
}; // Selectors

var getKonnector = function getKonnector(state, slug) {
  return !!state.documents && !!state.documents[DOCTYPE] && state.documents[DOCTYPE]["".concat(DOCTYPE, "/").concat(slug)];
};
var getInstalledKonnectors = function getInstalledKonnectors(state) {
  return !!state.documents && !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]);
};
var getIndexedKonnectors = function getIndexedKonnectors(state) {
  return !!state.documents && !!state.documents[DOCTYPE] && Object.keys(state.documents[DOCTYPE]).reduce(function (indexed, key) {
    var konnector = state.documents[DOCTYPE][key];
    indexed[konnector.slug] = konnector;
    return indexed;
  }, {});
};
var getSlugs = function getSlugs(state) {
  return !!state && !!state.documents && !!state.documents[DOCTYPE] && Object.values(state.documents[DOCTYPE]).map(function (konnector) {
    return konnector.slug;
  });
};

/***/ }),

/***/ "vL8P":
/***/ (function(module, exports) {

module.exports = "/img/connecting-data-in-progress.svg";

/***/ }),

/***/ "vwW3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("QILm");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);




var cozyMiddleware = function cozyMiddleware(client) {
  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        var promise = action.promise,
            type = action.type,
            types = action.types,
            rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(action, ["promise", "type", "types"]);

        if (!promise) {
          return next(action);
        }

        if (!type && !types) {
          return promise(client).then(function (action) {
            return dispatch(action);
          });
        }

        if (type) {
          return promise(client).then(function (response) {
            next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
              response: response,
              type: type
            }));
            return response;
          });
        }

        var _types = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(types, 3),
            REQUEST = _types[0],
            SUCCESS = _types[1],
            FAILURE = _types[2];

        next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
          type: REQUEST
        }));
        return promise(client).then(function (response) {
          next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
            response: response,
            type: SUCCESS
          }));
          return response;
        }, function (error) {
          console.log(error); // eslint-disable-line no-console

          next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
            error: error,
            type: FAILURE
          }));
        }).catch(function (error) {
          console.error('MIDDLEWARE ERROR:', error); // eslint-disable-line no-console

          next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
            error: error,
            type: FAILURE
          }));
        });
      };
    };
  };
};

/* harmony default export */ __webpack_exports__["default"] = (cozyMiddleware);

/***/ }),

/***/ "wiYS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("/MKj");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("eO8H");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("buk/");
/* harmony import */ var components_KonnectorInstall__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("+NZW");
/* harmony import */ var components_KonnectorMaintenance__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("Lo76");
/* harmony import */ var components_Banners_UpdateMessage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("bECI");
/* harmony import */ var ducks_connections__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("4YEU");
/* harmony import */ var lib_konnectors__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("8CvS");
/* harmony import */ var styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("gwpp");
/* harmony import */ var styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16__);







(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};













var AccountConnection =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(AccountConnection, _Component);

  function AccountConnection(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AccountConnection);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(AccountConnection).call(this, props, context));
    _this.store = context.store;
    _this.state = {
      isFetching: false,
      maintenance: props.maintenance && props.maintenance[props.konnector.slug]
    };
    _this.handleLoginSuccess = _this.handleLoginSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.handleError = _this.handleError.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.handleDeleteSuccess = _this.handleDeleteSuccess.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AccountConnection, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.error) this.handleError({
        message: this.props.error
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          success = _this$props.success,
          queued = _this$props.queued;
      var connectionError = this.state.connectionError;
      var succeed = !prevProps.success && success;
      var loginSucceed = !prevProps.queued && queued;

      if (succeed || loginSucceed) {
        // we reset the error in case of persisted errors
        if (succeed && connectionError) this.setState({
          connectionError: null
        });
        this.props.handleConnectionSuccess();
      }
    }
  }, {
    key: "handleLoginSuccess",
    value: function handleLoginSuccess(trigger) {
      var _this$props2 = this.props,
          enqueueConnection = _this$props2.enqueueConnection,
          handleConnectionSuccess = _this$props2.handleConnectionSuccess;
      handleConnectionSuccess();
      enqueueConnection(trigger);
    }
  }, {
    key: "handleDeleteSuccess",
    value: function handleDeleteSuccess() {
      this.setState({
        submitting: false
      });
      this.props.handleDeleteSuccess();
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.setState({
        submitting: false,
        connectionError: error.message
      });
    }
  }, {
    key: "buildSuccessMessages",
    value: function buildSuccessMessages(konnector) {
      var t = this.props.t;
      var messages = [t('account.message.success.connect', {
        name: konnector.name
      })];

      if (konnector.additionnalSuccessMessage && konnector.additionnalSuccessMessage.message) {
        messages.push(t(konnector.additionnalSuccessMessage.message));
      }

      return messages;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          createdAccount = _this$props3.createdAccount,
          handleConnectionSuccess = _this$props3.handleConnectionSuccess,
          konnector = _this$props3.konnector,
          error = _this$props3.error,
          onCancel = _this$props3.onCancel,
          onDone = _this$props3.onDone,
          queued = _this$props3.queued,
          t = _this$props3.t,
          lang = _this$props3.lang,
          success = _this$props3.success,
          successButtonLabel = _this$props3.successButtonLabel;
      var _this$state = this.state,
          connectionError = _this$state.connectionError,
          oAuthError = _this$state.oAuthError,
          maintenance = _this$state.maintenance;
      var successMessages = success || queued ? this.buildSuccessMessages(konnector) : [];
      var konnectorError = error || oAuthError || connectionError;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: styles_accountConnection_styl__WEBPACK_IMPORTED_MODULE_16___default.a['col-account-connection']
      }, !!konnector.available_version && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Banners_UpdateMessage__WEBPACK_IMPORTED_MODULE_13__["default"], {
        konnector: konnector,
        error: konnectorError,
        isBlocking: Object(lib_konnectors__WEBPACK_IMPORTED_MODULE_15__["isKonnectorUpdateNeededError"])(konnectorError)
      }), maintenance ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_KonnectorMaintenance__WEBPACK_IMPORTED_MODULE_12__["default"], {
        maintenance: maintenance,
        lang: lang,
        konnectorName: konnector.name
      }) : react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_KonnectorInstall__WEBPACK_IMPORTED_MODULE_11__["default"], {
        account: createdAccount,
        connector: konnector,
        onCancel: onCancel,
        onDone: onDone,
        onLoginSuccess: this.handleLoginSuccess,
        onSuccess: handleConnectionSuccess,
        legacySuccess: success || queued,
        successMessage: t('account.success.title.connect'),
        successButtonLabel: successButtonLabel,
        successMessages: successMessages
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return AccountConnection;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

AccountConnection.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    success: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["isConnectionConnected"])(state.connections, ownProps.trigger),
    error: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["getConnectionError"])(state.connections, ownProps.trigger),
    queued: Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["isConnectionEnqueued"])(state.connections, ownProps.trigger)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    enqueueConnection: function enqueueConnection(trigger) {
      return dispatch(Object(ducks_connections__WEBPACK_IMPORTED_MODULE_14__["enqueueConnection"])(trigger));
    }
  };
};

var _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["withRouter"])(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__["translate"])()(AccountConnection)));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AccountConnection, "AccountConnection", "/Users/cozy/code/cozy/cozy-home/src/containers/AccountConnection.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/Users/cozy/code/cozy/cozy-home/src/containers/AccountConnection.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "/Users/cozy/code/cozy/cozy-home/src/containers/AccountConnection.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/containers/AccountConnection.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "yMTE":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": "Us+F",
	"./en/": "Us+F",
	"./en/build_distance_in_words_locale": "LZbM",
	"./en/build_distance_in_words_locale/": "LZbM",
	"./en/build_distance_in_words_locale/index": "LZbM",
	"./en/build_distance_in_words_locale/index.js": "LZbM",
	"./en/build_format_locale": "6DAA",
	"./en/build_format_locale/": "6DAA",
	"./en/build_format_locale/index": "6DAA",
	"./en/build_format_locale/index.js": "6DAA",
	"./en/index": "Us+F",
	"./en/index.d.ts": "DYsx",
	"./en/index.js": "Us+F",
	"./en/package": "EJIZ",
	"./en/package.json": "EJIZ",
	"./es": "/S0t",
	"./es/": "/S0t",
	"./es/build_distance_in_words_locale": "GEfZ",
	"./es/build_distance_in_words_locale/": "GEfZ",
	"./es/build_distance_in_words_locale/index": "GEfZ",
	"./es/build_distance_in_words_locale/index.js": "GEfZ",
	"./es/build_format_locale": "O+zC",
	"./es/build_format_locale/": "O+zC",
	"./es/build_format_locale/index": "O+zC",
	"./es/build_format_locale/index.js": "O+zC",
	"./es/index": "/S0t",
	"./es/index.d.ts": "gbHe",
	"./es/index.js": "/S0t",
	"./es/package": "Vizl",
	"./es/package.json": "Vizl",
	"./fr": "LKA2",
	"./fr/": "LKA2",
	"./fr/build_distance_in_words_locale": "IzMR",
	"./fr/build_distance_in_words_locale/": "IzMR",
	"./fr/build_distance_in_words_locale/index": "IzMR",
	"./fr/build_distance_in_words_locale/index.js": "IzMR",
	"./fr/build_format_locale": "I3Zg",
	"./fr/build_format_locale/": "I3Zg",
	"./fr/build_format_locale/index": "I3Zg",
	"./fr/build_format_locale/index.js": "I3Zg",
	"./fr/index": "LKA2",
	"./fr/index.d.ts": "hE7Q",
	"./fr/index.js": "LKA2",
	"./fr/package": "herc",
	"./fr/package.json": "herc"
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
webpackContext.id = "yMTE";

/***/ }),

/***/ "zlKK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a1gu");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Nsbk");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7W2i");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var components_services_CreateAccountService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Go3M");
/* harmony import */ var components_KonnectorHeaderIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("gAos");








(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






var CreateAccountIntent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CreateAccountIntent, _Component);

  function CreateAccountIntent(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CreateAccountIntent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(CreateAccountIntent).call(this, props, context));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "handleConnectionSuccess", function () {
      _this.setState({
        isSuccess: true
      });
    });

    _this.store = context.store;
    _this.state = {
      isSuccess: false
    };

    _this.store.fetchUrls();

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CreateAccountIntent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          konnector = _this$props.konnector,
          _onCancel = _this$props.onCancel,
          onTerminate = _this$props.onTerminate;
      var isSuccess = this.state.isSuccess;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "col-create-account-intent"
      }, !isSuccess && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_KonnectorHeaderIcon__WEBPACK_IMPORTED_MODULE_10__["default"], {
        konnector: konnector,
        center: true
      }), konnector && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_services_CreateAccountService__WEBPACK_IMPORTED_MODULE_9__["default"], {
        konnector: konnector,
        onCancel: function onCancel() {
          return _onCancel();
        },
        onSuccess: onTerminate,
        handleConnectionSuccess: this.handleConnectionSuccess
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return CreateAccountIntent;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

CreateAccountIntent.contextTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object
};
var _default = CreateAccountIntent;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CreateAccountIntent, "CreateAccountIntent", "/Users/cozy/code/cozy/cozy-home/src/components/intents/CreateAccountIntent.jsx");
  reactHotLoader.register(_default, "default", "/Users/cozy/code/cozy/cozy-home/src/components/intents/CreateAccountIntent.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ })

/******/ });
//# sourceMappingURL=home.js.map