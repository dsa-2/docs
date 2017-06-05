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