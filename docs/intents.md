# Cozy Home Intents

## Overview

A typical Cozy Cloud runs multiple applications, but most of these applications are focused on one task and interact with one particular type of data.

However, Cozy Cloud especially shines when data is combined across apps to provide an integrated experience. This is made difficult by the fact that apps have no dedicated back-end and that they have restricted access to documents.

This document outlines the intents available in Cozy Home.

See [cozy stack intent](https://github.com/cozy/cozy-stack/blob/master/docs/intents.md) and [cozy client js intent](https://github.com/cozy/cozy-client-js/blob/master/docs/intents-api.md) for a full documentation about intents.

## Glossary

* **Intent**: Intents, sometimes also called Activities, is a pattern used in environments where multiple apps with different purposes coexist. The idea is that any app can express the need to do _something_ that it can't do itself, and an app that _can_ do it will take over from there.
* **Stack**: refers to [cozy-stack](https://github.com/cozy/cozy-stack/), the server-side part of the Cozy infrastructure.
* **Client**: the client is the application that _starts_ an intent.
* **Service**: the service is the application that _handles_ an intent started by a client.

## Intents availables

### Konnectors accounts

The intent show you a konnector or a list of konnectors.

#### Manifest

Cozy home allow you to create / update / delete an account on a konnector

This is defined in the [`manifest.webapp`](https://github.com/cozy/cozy-home/blob/master/manifest.webapp)

```json
  "intents": [{
    "action": "CREATE",
    "type": ["io.cozy.accounts"],
    "href": "/services"
}]
```

(See [cozy stack intent manifest](https://github.com/cozy/cozy-stack/blob/master/docs/intents.md#1-manifest) section for more informations)

#### Intent

The intent is started by [IntentService.jsx](https://github.com/cozy/cozy-home/blob/6cd3ba31952866aea76f3a1e4c6c2e85d4136fcd/src/containers/IntentService.jsx)

To filter the konnectors you want to show, you have to pass parameters to the `intent.create` function in the client.

* `action`: defined in the manifest
* `docType`: the type of data you want to access in your intent
* `data`: an object who can take `slug` or `dataType` key to filter the Konnectors showed by the intent.

See [datatypes.json](https://github.com/cozy/cozy-home/blob/master/src/config/datatypes.json) for all available dataTypes

See below for a full functionnal exemple in React

```javascript
class Intent extends React.Component {
  componentDidMount() {
    const { action, docType, data, closeModal } = this.props
    cozy.client.intents
      .create('CREATE', 'io.cozy.accounts', {
	      dataType: 'bill'
      })
      .start(this.intentViewer)
  }

  render() {
    return (
      <div
        id="intentViewer"
        className={classNames(styles['intentViewer'])}
        ref={intentViewer => (this.intentViewer = intentViewer)}
      />
    )
  }
}
```
