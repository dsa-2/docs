## Modules

### Serialization 

Stores client information, data nodes values, users, etc.

```
class Data {
  readValue(key, value);
  loadValue(key, value);
  release();
}

readAll(); // figure out what to do with saved data when broker starts
```


### Authorization

See [Authorization](Authorization)

## Packages

### Network handler (TCP, HTTP)

Raw network api -> binary data

Handshake

###  Responder API handler

Maintain subscription, streams and queue. Accept requests from multiple streams.

### Responder Model handler

Maintain node hierachy, attributes and configs.

### Requester API handler

Handle a single request. 

### Requester Model structure

Used for request API parameters and results and as a placeholder to maintain the collection of the API handler.
