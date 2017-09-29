# Cozy Collect: Konnector configuration

You can configure some connector proprerties in the `src/config/konnectors.json` file as the form fields, the category or the correct color as good as in your `manifest.konnector`.

__⚠️ Important notes:__

Some properties will be available and used only from the Cozy-Collect config file and won't be grabbed from the `manifest.konnector` of the connector repository (mainly for coherence and stability reasons):

* `slug`
* `name`
* `fields`
* `additionnalSuccessMessage`
* `hasDescriptions`

So, to use them, you have to set them in the cozy-collect `src/config/konnectors.json` file.

## Description

You can add more descriptions in the connector modal, one about the connector (displayed just above the configuration form in the connector modal) itself and another about the related service (displayed juste above the collected data list in the connector modal) as following:

```js
    ...
    "name": "My connector",
    "slug": "myconnector",
    "hasDescriptions": {
        "connector": true,
        "service": true
    }
```

Then you can add the related locales in `src/locales/en.json` in the expected `connector` field according to your connector slug to translate them using [Transifex][tx] like following:

```js
    "connector": {
        ...
        // other connectors descriptions
        ...
        "myconnector": {
            "description": {
                "connector": "my connector description",
                "service": "my connector service description"
            }
        }
    }

```

#### Field description

You can also add a descrption above a field in the connector configuration form by putting the `hasDescription` property to `true`:

```js
    ...
    "name": "My connector",
    "slug": "myconnector",
    "fields": {
        "login": {"type": "text", "hasDescription": true}
    }
```

Then you can add the related locales in `src/locales/en.json` in the expected `connector` field according to your connector slug and the name of your field (like previously but by using the `field` property now):

```js
    "connector": {
        ...
        // other connectors descriptions
        ...
        "myconnector": {
            "description": {
                "connector": "my connector description",
                "service": "my connector service description",
                "field": {
                    "login": "my login description text here"
                }
            }
        }
    }

```

> __⚠️ To know:__ You can format your text by using a kind of Markdown syntax since the description will be displayed using the [react-markdown][react-markdown] module.

## Category

An account connector can define a category to be listed in. This category is single because a connector can not be listed in many different categories. Here is the connector category definition:

Available Categories are listed in [`/src/config/categories.json`](https://github.com/cozy/cozy-collect/blob/master/src/config/categories.json)

```js
    ...
    "name": 'My connector',
    "slug": "myconnector",
    "category": "health",
    ...
```

__⚠️ Important notes:__

The defined category must be authorized by the Cozy-Collect application in order to be listed in.

If the account connector define a category which is authorized, it will be used. Otherwise, (if not 'valid' or not defined as well) that will fallback to the default name, which is `others`.


[tx]: https://www.transifex.com/cozy/
[react-markdown]: https://github.com/rexxars/react-markdown

## DataType

A connector must define a list of dataType describing the type of data it will access to:

```json
  "dataType":["profile", "contract", "home", "family", "sinister"],
```

Difference between doctype and datatype : sometimes you can have objects of a certain doctype
that represent in real life a higher level concept. Example : you have bills that are saved in
the couchdb as `io.cozy.files`. `bills` is the datatype here.

The list of available dataTypes is not yet listed, but existing icons are present into the [`/src/assets/sprites/` folder](https://github.com/cozy/cozy-collect/blob/master/src/assets/sprites/). For the moment, feel free to use any custom dataType you need, and please make a pull request if you need to add an icon.
