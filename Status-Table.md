status 00-7F means the stream can still be open

status 80-ff means the stream has to be closed 

01-0f and 81-8f are reserved for status that can be in both cases

| Code(hex) | Message  | |
|:-------------:| ------------- |  ------------- | 
| 00     | OK |
| 01| Disconnected (Still subscribing) |
| 81| Disconnected |
| 90| Permission Denied|
| 91| Invalid Input| protocol level|
| 92| Invalid Parameter| action level |
| 98| Busy| client can't take any more request |
| A1 | Alias Loop|

