## Modules

### Serialization 

store client information, data nodes values, users, etc.

```
class Data {
  readValue(key, value);
  loadValue(key, value);
  release();
}

readAll(); // figure out what to do with saved data when broker starts
```


### Authorization

seen [Authorization](Authorization)

## Packages

### network handler (TCP, HTTP)

raw network api -> binary data

handshake




###  reqponder API handler

maintain subscription and streams/queue

accept requests from multiple streams


### responder Model handler

maintain node hierachy and attribtues/ configs






### requester API handler

maintain single request 


### requester Model structure

be used as request api parameters and results

a placeholder to maintain collection of the api handler