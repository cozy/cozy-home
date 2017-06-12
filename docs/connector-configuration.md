# Cozy Collect: Connector configuration

You can configure some connector proprerties in the `src/config/konnectors.json` file as the form fields, the category or the correct color as good as in your `manifest.konnector`.

__⚠️ Important notes:__

Some properties will be available and used only from the Cozy-Collect config file and won't be grabbed from the `manifest.konnector` of the connector repository (mainly for coherence and stability reasons):

* `slug`
* `name`
* `fields`
* `additionnalSuccessMessage`
* `description`

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

## Color

The account connector can define a simple color or a gradient color to be used when displayed (for example as background). Here, it's important to know that the property is not a simple color but a css property. It's why the account connector color property will be defined like an object.

We keep a simple color definition in all cases, because if we have a gradient as background, we can also need a simple for others interface elements (borders, customized svg...).

For a simple color account connector:

```js
    ...
    name: "My connector",
    color: {
        // the simple color hexadecimal definition
        hex: "#A7B5C6",
        // property used to display the connector background in the modal,
        // could be different from the hexColor property
        css: "#A7B5C6"
    }
    ...
```

For a 'complex' color account connector:

```js
    ...
    name: "My connector",
    fields: ...
    ...

    color: {
        // a default simple color still available, eventually for other usages
        hex: "#9E0017",
        // css property for linear gradient
        css: "linear-gradient(90deg, #EF0001 0%, #9E0017 100%)"
    }
    ...
```

If a color property is not defined by the account connector, that will fallback to the default `hex` and `css` value which is `#A7B5C6`.

## Category

An account connector can define a category to be listed in. This category is single because a connector can not be listed in many different categories. Here is the connector category definition:

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
