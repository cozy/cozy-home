# 1.49.0

## ✨ Features

* Add FAB button on mobile to quickly create new docs
* Hide fallback category konnectors in maintenance

## 🐛 Bug Fixes

* Fix interaction freeze that may happen when scrolling the app from iOS

## 🔧 Tech

* Upgrade cozy-ui to latest (79.3.0)

# 1.48.0

## ✨ Features

* Upgrade cozy-harvest-lib from 9.26.10 to 9.32.5
 - Add independent confirm dialog
 - Use independant OAuth window
 - Follow current trigger jobs even after the first load
 - Popup display after BI connection removal from BI webview
 - Reconnection with BI webviews & webhooks
 - Use BI manage url to update contract synchronization
 - Close Harvest when BI connection is removed in webview
* Nuke matomo/piwik

## 🐛 Bug Fixes

* Upgrade cozy-harvest-lib from 9.26.10 to 9.32.5
 - Prevent createTemporaryToken to updateCache twice at the same time
 - Add konnector slug in fake trigger passed to onLoginSuccess
 - Only update cozy-client store when refreshing contract
 - Use correct button to close CozyConfirmDialog
 - Do not use CozyRealtime.unsubscribeAll anymore
 - Deal with empty and malformed encrypted values
 - Add explicit blocked popup message

## 🔧 Tech

* Renew Github Token for CI
* Upgrade to React 18 [PR](https://github.com/cozy/cozy-home/pull/1843)
* Performance optimizations
* Upgrade cozy-keys-lib to 4.3.0 [PR](https://github.com/cozy/cozy-home/pull/1852)
* Do not depend only on konnector.slug for useEffect dependencies
* Add useEffect dependencies to useOAuthExtraParams hook
* Upgrade cozy-harvest-lib from 9.26.10 to 9.32.5
  - Allow to pass custom Properties to OAuthForm wrapper


**Full Changelog**: https://github.com/cozy/cozy-home/compare/1.47.0...1.48


# 1.47.0

## 🐛 Bug Fixes

* Fix a bug when creating an OAuth account, no oauth window displayed
* Fix a bug to hide BIContractActivationWindow behind the bi webview flag


# 1.46.0

## ✨ Features

* Update the applications and the connectors displayed on the Home page in realtime.
* Fix position of background wallpaper image, preventing scroll showing white background inside Cozy's native application.
* When displaying cozy-home from Cozy's native application, the splash screen is now correctly shown during the page loading
* Display InAppBrowser in flagship app for OAuth connectors
* cozy-harvest-lib 9.2.1 : Add BI connection creation via BI webview  [PR](https://github.com/cozy/cozy-libs/pull/1570)
* cozy-harvest-lib 9.7.0 : Add contract activation/deactivation via BI webview  [PR](https://github.com/cozy/cozy-libs/pull/1627)
* cozy-harvest-lib 9.8.0 : Add reconnect to bi Webviews  [PR](https://github.com/cozy/cozy-libs/pull/1656)
* cozy-harvest-lib 9.10.1 : Add custom intentsApi prop to TriggerManager [PR](https://github.com/cozy/cozy-libs/pull/1663)

## 🐛 Bug Fixes

* On IOS Safari, the URL and Navigation bar were always displayed
* Now show the jobs as running after first account configuration in Harvest [PR](https://github.com/cozy/cozy-libs/pull/1515)
* cozy-harvest-lib 8.2.1 : Get correct bi mapping for bnp_es and cic_es [PR](https://github.com/cozy/cozy-libs/pull/1531)
* Fix a bug when opening a konnector from the store is opening briefly the home to redirect to... the store. Now we redirect to the right place.
* Fix a bug when configuring a konnector from the intent. The form was empty if a vault was active on the cozy
* Fix a bug when opening a PDF from Harvest, display was truncated.

## 🔧 Tech

* Cozy-ui 66.0.0 to remove warning Badge overlap rectangular [PR](https://github.com/cozy/cozy-home/pull/1771)
* Upgrade cozy-client and cozy-device-helper because of cozy-ui breaking change [PR](https://github.com/cozy/cozy-home/pull/1771)
* Remove unused demo timeline
* Unregister any service worker that could have been registered during development
* Upgrade cozy-flags to remove useless some warnings flag.enable
* Upgrade cozy-client to get ability to force HTTPs fetches when `window.cozy.isSecureProtocol` is `true`
* Remove the pull request template [PR](https://github.com/cozy/cozy-home/pull/1808)

# 1.45.0

## ✨ Features
* Loading App's icons: Should be faster. We now rely on img src=http directly if we are not in OAuth. Otherwise we do a fetch.
* cozy-harvest-lib 6.15.0 : get support email according to the contect [PR](https://github.com/cozy/cozy-libs/pull/1392)
* cozy-harvest-lib 7.1.0 : no multi account for client side connectors [PR](https://github.com/cozy/cozy-libs/pull/1406)
* cozy-harvest-lib 7.3.0 : Do not allow multiple accounts with same BI connection ID [PR](https://github.com/cozy/cozy-libs/pull/1464)


## 🐛 Bug Fixes

* fix translation during the loading phase
* fix spinner position for the ShortcutView during the loading phase
* cozy-harvest-lib 6.14.4 : change timeout for createTemporaryToken [PR](https://github.com/cozy/cozy-libs/pull/1391)

## 🔧 Tech

* useAppsInMaintenance hook is now moved in cozy client and can be used in other apps
* Revert to cozy-keys-lib 3.11.0 to avoid a bug with intent
* cozy-client 27.19.2 : Get Icon Url uses preloaded url when oAuth not needed [PR](https://github.com/cozy/cozy-client/pull/1134/files)
* cozy-ui 62.1.3 : Add appData to getIconUrl [PR](https://github.com/cozy/cozy-ui/pull/2064/)

# 1.44.0

## ✨ Features

## 🐛 Bug Fixes

* We had a bug in Harvest which caused a fatal error for OAuth connectors : See [this PR](https://github.com/cozy/cozy-libs/pull/1390)

## 🔧 Tech

# 1.43.0

## ✨ Features

## 🐛 Bug Fixes
* We had a bug in Harvest that when we opened, then closed then opened again the modal,the konnector's translations were not good
## 🔧 Tech

# 1.42.0

## ✨ Features

* Display custom shortcuts in the homepage below existing Konnectors
* Integration of client-side connectors
  * cozy-client 24.2.0 : fetchAppLatestVersion
  * cozy-harvest-lib 6.5.O : client side connectors specificities
  * cozy-harvest-lib 6.6.O : new BI slug for palatine bank
  * new home layout
* Change matomo url from piwik.cozycloud.cc to matomo.cozycloud.cc
* New home design

## 🐛 Bug Fixes

* ignore manifest's id if any to avoid a crash
* login and passwords fields do not enforce upercase on first letter anymore when login to a Konnector
* avoid blur effect when hover icon

## 🔧 Tech
