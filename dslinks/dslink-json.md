### Sample dslink.json

```
{
  "name": "dslink-java-x",
  "version": "0.2.9",
  "dsa-version": "2.0",
  "description": "A dslink for x",
  "license": "GNU GPL",
  "main": "bin/dslink-java-x",
  "repository": {
    "type": "git",
    "url": "https://github.com/IOT-DSA/dslink-java-x"
  },
  "bugs": {
    "url": "https://github.com/IOT-DSA/dslink-java-x/issues"
  },
  "configs": {
    "name": {
      "type": "string"
      "default": "DslinkX"
    },
    "log": {
      "type": "enum",
      "default": "info"
    },
    "server-port": {
      "type": "int",
      "default": 0
    },
    "thread": {
      "type": "int",
      "default": 2
    },
    "token": {
      "type": "path",
      "default": ".token"
    },
    "stop-token": {
      "type": "path",
      "default": ".stop-token"
    },
    "nodes": {
      "type": "path",
      "default": "nodes.json"
    },
    "key": {
      "type": "path",
      "default": ".key"
    },
    "handler_class": {
      "type": "string",
      "default": "x.Main"
    }
  }
}
```
