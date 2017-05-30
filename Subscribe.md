## request body structure
request body is always empty

## response body structure

* header length, 4 bytes
* header body, [dsa key values pairs format](https://github.com/dsa-2/docs/wiki/Key-Value-Format)
* value body (msgpack encoded)

## Qos

### Qos Levels
Qos level is an optional header in a subscription request

* 0 : requester only cares about last value (default value)
* 1 : requester need all values if possible
* 2 : requester need all values even if connection is dropped ( durable )
* 3 : requester need all values even if responder is rebooted ( persistent )

### Max Queue Size
Queue size is an optional header in a subscription request.  Each responder have a max and default qos queue size set up for each requester.

If the max queue size in the request is smaller than the currently max queue, responder should use the max queue size in the request.  

If the max queue size in the request is bigger than the currently max queue, responder should ignore it.  

### Update frequency
Update frequency is an optional header in a subscription request. when set,  responder will merge value if more than one updates is received in a time interval.

value of the update frequency is one byte index:

  * 0x00: no limitation (default value)
  * 0x10: 100 ms
  * 0x20: 1 second
  * 0x30: 5 second   
  * 0x40: 15 second
  * 0x50: 30 second
  * 0x60: 1 minute
  * 0x70: 5 minute
  * 0x80: 15 minute
  * 0x90: 30 minute
  * 0xA0: 1 hour