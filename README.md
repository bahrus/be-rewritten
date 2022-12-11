# be-rewritten

Extend be-written, but be able to apply DTR and xslt transforms on selected elements as they appear.

```html
<div be-rewritten='{
    "from": "",
    "match":{
        "cssSelector1": {
            "be": "metamorphic",
            "having": {

            }
        }
    }

}'>
```

User must provide references to be-decorated web components separately.

Download won't start until all web components have been registered.

Can also be an array:

```html
<div be-rewritten='{
    "from": "",
    "match":{
        "cssSelector1": [{
            "be": "metamorphic",
            "having": {

            }
        }]
    }

}'>
```
