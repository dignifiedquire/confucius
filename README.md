# Confucius

> Confused configuration for us all.


## Installation

```bash
$ npm install --save confucius
```

## Usage

```js
var confucius = require('confucius');


var config = confucius('myAppName', {
  env: 'dev',
  defaults: defaults
});
```

This will **synchronously**

* Load the file `config.<env>.yaml' from `process.cwd()` and parse it.
* Load all ENV variables starting with `MYAPPNAME_` and merge into the
  result.
* Deep merge the defaults object onto the result.
* Return the resulting object.
