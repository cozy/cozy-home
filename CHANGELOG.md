# 1.46.0

## ✨ Features

* When displaying cozy-home from Cozy's native application, the splash screen is now correctly shown during the page loading

## 🐛 Bug Fixes

* On IOS Safari, the URL and Navigation bar were always displayed

## 🔧 Tech

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
