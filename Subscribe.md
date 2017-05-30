## request body structure

Message Type Id : **01**

request body is always empty

## response body structure

Message Type Id : **81**

* header length, 4 bytes
* header body, [dsa key values pairs format](https://github.com/dsa-2/docs/wiki/Key-Value-Format)
* value body (msgpack encoded)

## Qos Headers

### Qos Levels
Qos level is an optional header in a subscription request

* 0 : requester only cares about last value (default value)
* 1 : requester need all values if possible
* 2 : requester need all values even if connection is dropped ( durable )
* 3 : requester need all values even if responder is rebooted ( persistent )

### Queue Size
Queue size is an optional header in a subscription request.  Each responder have a max and default qos queue size set up for each requester.

If the queue size in the request is smaller than the max size, responder should use the queue size in the request. 

If the queue size in the request is bigger than the max size, responder should ignore it, (not treated as error)  

When broker accepts a queue size from the requester ( smaller than max size ) , it should forward that information to responder.

### Queue Time
Queue time is an optional header in a subscription request. defines how long a value can stay in a queue. it works similar to the queue size, when queue time is accepted by a broker, the broker should forward that information to responder.

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