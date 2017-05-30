The status codes in the range from 00 to 0F correspond to the codes from 80 to FF. The 00-0F range is used for conditions that permit the stream to remain open, while 80-ff means the stream must be closed. 


| Code(hex) | Message  | Remarks |
|:-------------:| ------------- |  ------------- | 
| 00     | OK | Still streaming |
| 01     | Initializing | The current value is valid, but there is more data to come before current values can be fully usable  |
| 08     | Refreshed| The previous updates are no longer valid, clear all caches and only use the current response|
| 0E| Not available| Might be disconnected and in the process of subscribing |
| 10 | Closed | Closed normally, with no error  |
| 1E| Disconnected | Stream must be closed |
| 20| Permission denied|
| 21| Invalid input| Protocol level|
| 22| Invalid parameter| Action level |
| 28| Busy| Client cannot accept additional requests|
| 41 | Alias loop| The number of aliased routings for this request has exceeded the maximum allowed. 
| F8 | Connection error, the time in handshake has expired | 
| F9 | Connection error, Incorrect auth value| 
