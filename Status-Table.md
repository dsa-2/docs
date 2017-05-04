status 00-7F means the stream can still be open

status 80-ff means the stream has to be closed 

01-0f and 81-8f are reserved for status that can be in both cases

| Code(hex) | Message  |
|:-------------:| ------------- | 
| 00     | OK |
| 01| Disconnected (Still subscribing) |
| 81| Disconnected |
| 82| Permission Denied|
| 83 | Alias Loop|

