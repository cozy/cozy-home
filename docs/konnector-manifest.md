# Table of contents
- [Konnector manifest](#konnector-manifest)
  * [Manifest details](#manifest-details)
    + [Locales](#locales)
    + [Messages](#messages)
    + [Fields property](#fields-property)
    + [Categories](#categories)
    + [Data types](#data-types)
  * Breaking changes from current manifests
    + [Fields](#fields)
    + [Properties](#properties)
    + [UUID](#uuid)

# Konnector manifest

This document describes version 2 of konnector's manifest. We aim to be able to use and install konnectors the same way we are proceeding with apps and registry. See [this document](https://gist.github.com/CPatchane/1eb3324bb90285b49034835f2de951a0#publish-your-application-on-the-registry) for more details.

## Manifest details
Every konnector must provide a `manifest.konnector`. A konnector manifest is a JSON file formatted in `snake_case` (like app manifests and JSON documents used in [`cozy-stack`](https://github.com/cozy/cozy-stack)) which provides the same information as an app manifest.

There is an example for a fictive _Trinlane_ konnector.

```json
{
  "name": "Trinlane",
  "slug": "trinlane",
  "icon": "trinlane.svg",
  "editor": "Cozy",
  "developer": {
    "name": "Cozy",
    "url": "https://cozy.io"
  },
  "category": ["transportation"],
  "doctypes": ["io.cozy.files"],
  "data_types": [
    "bill"
  ],
  "fields": {
    "access_token": {
      "type": "hidden"
    }
  },
  "frequency": "daily",
  "tags": [
    "bills",
    "train",
    "transportation",
    "traveling"
  ],
  "langs": ["en", "fr"],
  "version": "1.0.0",
  "licence": "AGPL-3.0",
  "source": "https://github.com/cozy/cozy-konnector-trinlane.git#build",
  "permissions": {...},
  "messages": ["success_message"],
  "language": "nodejs",
  "locales": {
    "en": {
      "name": "Trinlane",
      "short_description": "The Trinlane konnector, retrieve your transportation bills.",
      "long_description": "The Trinlane konnector connects to your Trinlane account and copy all your bills in your Cozy Drive.",
      "changes": "## New features\n\nNow allow to fetch several bills in the same moth :tada:",
      "messages": {
        "success_message": "Congratulation from the Trinlane team"
      }
    },
    "fr": {
      "name": "Trinlane",
      "short_description": "Konnecteur Trinlane, récupère les factures de vos déplacements.",
      "long_description": "Le konnecteur Trinlane se connecte à votre compte Trinlane et y recopie vos factures au sein de votre Cozy Drive.",
      "changes": "## Nouvelle fonctionnalités\n\n Il est maintenant possible de récupérer plus d'une facture pour un mois donné :tada:",
      "messages": {
        "success_message": "Félicitations de l'équipe Trinlane"
      }
    }
  },
  "oauth": {
    "scope": "I"
  },
  "time_interval": [15, 21],
  "uuid": "6eb9955e6c444098a9e55d6751f8f8fd",
  "vendor_link": "https://trinlane.com/manager"
}
```

App manifest properties not used for konnector manifest:
* platforms
* screenshots
* services
* routes
* intents

Additional properties compared to app manifests:
* oauth
* data_types
* doctypes
* fields
* frequency
* language
* messages
* parameters
* time_interval
* uuid
* vendor_link

Here are all properties meaning:

Field          | Description
---------------|-------------------------------------------------------------
category       | Category of your apps to display grouped in the cozy-bar (see authorized categories), it will be 'others' by default if empty
data_types       | Array of the data type the konnector will manage
developer      | `name` and `url` for the developer
editor         | The editor's name
fields         | JSON object describing the fields need by the konnector. Used to generate a form.
frequency      | A human readable value between `monthly`, `weekly`, `daily`, indicating the interval of time between two runs of the konnector. Default : `weekly`.
icon           | Path to the icon for the home (path in the build)
language       | The programming language used to implement the konnector.
langs          | Languages available in your konnector (can be different from locales)
license        | [The SPDX license identifier](https://spdx.org/licenses/)
locales        | Object with language slug as property, each name property is an object of localized informations (see the second part below)
messages       | Array of message identifiers, which can be used by application to display information at known areas. See [example below](#messages-example).
name           | Konnector's name, pretty unexpected
oauth          | JSON object containing oAuth information, like `scope`. If a manifest provides an `oauth` property, it is considered as an OAuth konnector.
parameters     | Additional parameters which should be passed to the konnector. Used for example for bank konnectors to pass a `bankId` parameter.
permissions    | Map of permissions needed by the konnector (see [see cozy-stack permissions doc ](https://cozy.github.io/cozy-stack/permissions.html) for more details)
slug           | The default slug that should never change (alpha-numeric lowercase)
source         | Where the files of the app can be downloaded (by default it will look for the branch `build`)
doctypes       | Array of doctype retrieved by the konnector. Example : `['io.cozy.files']`. This property is used to know if specific behaviour related to doctypes should be enabled or not. For example, if this property includes the doctype `io.cozy.files`, cozy-home will provide a way to pick a destination folder for those files.
tags           | List a tags describing your konnector and features (useful for indexing and search)
time_interval  | By defaults, konnector triggers are scheduled randomly between 00:00 AM and 05:00 AM. Those two values can be overwritten thanks to this property, by passing an array containing two values: first is the interval start hour, second is the interval end hour. Example: `[15, 21]` will randomly schedule the konnector trigger between 15:00 (03:00 PM) and 21:00 (09:00 PM).
uuid           | Unique UUID generated for the konnector. It will be used for the whole lifetime of the konnector. Instead of a slug, an uuid can never change. It will be used to ensure legacy in case of the modification of the konnector's slug.
vendor_link    | URL to editor or service website
version        | The current version number

### Locales

Like for apps some properties can be overwritter using `locales` (we recommand to automatically build these properties according to your locales files if you're using a translating tool like `transifex`) :

Field             | Description
------------------|----------------------------------------------------------
changes           | Description of your new version of the konnector or all changes since the last version, this part will be the changelog part of the application page in `cozy-store`/`cozy-collect` (?).
fields            | An object containing translations for fields. See [Field locales](#field-locales) below.
long_description  | Longer and more complete description of the konnector behaviour.
name              | The konnector's name.
short_description | Short description of what the konnector do.
long_description  | Longer and more complete description of the konnector behaviour.
changes           | Description of your new version of the konnector or all changes since the last version, this part will be the changelog part of the application page in `cozy-store`/`cozy-home` (?).

### Messages

Messages are a common way to provide custom information to display in application. An app like cozy-home should have some specific area to display custom messages provided by the konnector.

#### <a name="messages-example"></a> Example:
```jsx
  // The final example will be available after the implementation of the whole mechanism,
  // but here is the global idea:
  {installSuccess &&
    <p>{t('home.konnector.install.success.message')}</p>
  }
  {installSuccess && konnector.manifest.messages.includes('success_message') &&
    <p>{t('konnector.manifest.locales.messages.success_message')}
  }
```


### Field properties

The `fields` property is a JSON object describing the input fields needed to generate the konnector's configuration form. A typical example will be:

```JSON
{
  "fields": {
    "identifier": {
      "type": "text"
    },
    "secret": {
      "type": "password"
    }
  }
}
```

The keys of the `fields` object are the name/id of the fields. They will be passed as parameters to the konnector at every run.

Each fields may also have the following properties:

Property        | Description
----------------|---------------------------------------------------------------
identifier      | (Boolean) indicating if the field is the main identier. By default, the `login` field is the identifier. Default value is false and there can be only one identifier
advanced        | Indicates if the field should be displayed in the "advanced" area of the form (default: `false`)
default         | Default value. It can a string for a text field, or an object for a select field (`"default": {"value": "foo","name": "bar"},`)
description     | Field description, as a locale key.
label           | Predefined label. This value must match a locale key provided by Cozy-Home. Example: With `label: "identifier"`, Cozy-Home will use the locale key `account.form.label.identifier`. To provide custom translation for fields, see the [`fields` property in the `locales`](#field-locales) manifest object.
max             | Maximum length of the value (number of characters)
min             | Minimum length of the value (number of characters)
options         | When the field is a dropdown, list of available options
pattern         | Define a regex used to validate the field.
isRequired      | Boolean indicating if the field is required or not (default `true`)
type            | *Required*. Field type from `dropdown`, `email`, `hidden`, `password`, `text`, `checkbox`.

### <a id="field-locales"></a> Field locales

The `locales` attribute of the manifest may contain an object mapping field properties, use for translations purpose. Here is a functional example:

```json
{
  "fields": {
    "email": {
      "type": "email"
    }
  },
  "locales": {
    "en": {
      "fields": {
        "email": {
          "label": "Identifier (your email)"
        }
      }
    },
    "fr": {
      "fields": {
        "email": {
          "label": "Identifiant (votre adresse mail)"
        }
      }
    }
  }
}
```
We use a sub attribute `label`, so in the future we will be able to add other locales like `title` for example.

### Categories

Categories are slugs from the following list:
* `energy`
* `insurance`
* `isp`
* `shopping`
* `telecom`
* `transport`
* `banking`
* `health`
* `host_provider`
* `online_services`
* `partners`
* `press`
* `productivity`
* `public_service`
* `social`

### Data types

Data types are slugs from the following list:
* `activity`
* `appointment`
* `bankTransactions`
* `bankAccounts`
* `bill`
* `bloodPressure`
* `calendar`
* `certificate`
* `commit`
* `consumption`
* `contact`
* `contract`
* `courseMaterial`
* `document`
* `event`
* `family`
* `geopoint`
* `heartbeat`
* `home`
* `phonecommunicationlog`
* `podcast`
* `profile`
* `refund`
* `sinister`
* `sleepTime`
* `stepsNumber`
* `temperature`
* `travelDate`
* `tweet`
* `videostream`
* `weight`

### Fields

* The folderPath field disappears and is replaced by the use of the property `doctypes`. It's assumed that the application in charge of Konnector (i.e. cozy-home) will handle the management of this folder.
* `isRequired` becomes `required`.
* `hasDescription` becomes `description` and should now contain a locale key.

### Properties

* `oauth` and `oauth_scope` are now merged in one single JSON object
* `dataTypes` becomes `data_types`
* `timeInterval` becomes `time_interval`
* `vendorLink` becomes `vendor_link`
* `additionnalSuccessMessage` disappears (replaced by the `messages` mechanism)
* `hasDescriptions` disappears (replaced by the `messages` mechanism)

### UUID

UUID should now be used in place of slug. By the way, we have to keep maintaining the use of slugs for legacy reasons.
