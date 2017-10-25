## Request body structure

Message type ID:  **01**

The request body is always empty.

## Response body structure

Message type ID:  **81**

* value metadata length,2 bytes
* value metadata body, a msgpack map
* value body (msgpack encoded)

## Qos Headers

### Qos Levels
(Optional) Specifies the quality of service (qos) that the requester requires.

* 0 (default): Most recent value
* 1: All values, if possible
* 2: All values, even if the connection is dropped (durable)
* 3: All values, even if the responder is rebooted (persistent)

### Queue Size
(Optional) Specifies the size (in bytes) of the qos queue maintained for the requester. 
* when total size in the queue is bigger than max queue size, all messages except the last one will be dropped no matter which qos level.
* responder should have a max_queue_size and client can't request for a size bigger than responder allowed.

### Queue Duration
(Optional) Specifies how long (in seconds) a value can stay in a queue.
* when a message stays in the queue for more than the queue time, it will be dropped, unless it's the last message.
* responder should have a max_queue_time and client can't request for a duration bigger than responder allowed.

<!--
### Update Frequency 
(Optional) If set, the responder returns the most recent value received in the specified time interval. To specify the interval, use the following 1-byte values: 

  * 0x00: no limitation (default value)
  * 0x10: 100 milliseconds
  * 0x20: 1 second
  * 0x30: 5 seconds   
  * 0x40: 15 seconds
  * 0x50: 30 seconds
  * 0x60: 1 minute
  * 0x70: 5 minutes
  * 0x80: 15 minutes
  * 0x90: 30 minutes
  * 0xA0: 1 hour
-->
