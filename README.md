# be-rewritten

Extend be-written, but be able to apply be-decorated element behaviors on selected elements as they appear, including DTR and xslt transforms.

```html
<div be-rewritten='{
    "from": "",
    "make":{
        "cssSelector1": {
            "be": "metamorphic",
            "having": {

            }
        }
    }

}'>
```

User must provide references to be-decorated web components separately.

If web component is not yet registered, simply adds the attribute.

Can also be an array:

```html
<div be-rewritten='{
    "from": "",
    "match":{
        "cssSelector1": [{
            "be": "metamorphic",
            "having": {
                "whenDefined": ["ui5-li", "ui5-list"],
                "xslt": "./ui5-list.xslt"
            }
        }]
    }

}'>
```

If the css selector requires a single quote, use \&apos;.  If double quote, use \&quot;.


