status 00-0F means the stream is open

status 80-ff means the stream has to be closed 


| Code(hex) | Message  | |
|:-------------:| ------------- |  ------------- | 
| 00     | OK | still streaming |
| 01     | Still initializing | although the value is valid, there are still more data to come before current values can be fully usable  |
| 04     | Paging data unfinished |   |
| 05     | Paging data finished|   |
| 0E| not available| Could be disconnected, but still subscribing |
| 10 | Closed | closed normally, with no error  |
| 1E| Disconnected | Stream need to be closed |
| 20| Permission Denied|
| 21| Invalid Input| protocol level|
| 22| Invalid Parameter| action level |
| 28| Busy| client can't take any more request |
| 41 | Alias Loop|

