# be-rewritten

The platform is showing very little interest in [my proposal to allow processing of streaming HTML in a service worker](https://discourse.wicg.io/t/proposal-support-cloudflares-htmlrewriter-api-in-workers/5721) (sniff!).  Consequently, we have little choice but to do something on the main thread, which is what this element decorator does, via mutation observing (sigh).

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
        "cssSelector1": [
            {
                "be": "metamorphic",
                "having": {
                    "whenDefined": ["ui5-li", "ui5-list"],
                    "xslt": "./ui5-list.xslt"
                }
            }, {
                "be": "melodramatic",
                "having": {
                    "writer": "Jin-joo"
                }
            }
        ]
    }

}'>
```

If the css selector requires a single quote, use \&apos; .  If double quote, use \&quot; .


