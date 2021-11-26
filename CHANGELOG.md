# 1.45.0
## ✨ Features

## 🐛 Bug Fixes

## 🔧 Tech

* useAppsInMaintenance hook is now moved in cozy client and can be used in other apps

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
