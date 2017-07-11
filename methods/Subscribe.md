## Request body structure

Message type ID:  **01**

The request body is always empty.

## Response body structure

Message type ID:  **81**

* header length, 4 bytes
* header body, [dsa key values pairs format](../common/DSA-Binary-Encoding.md#key-value-pairs-encoding)
* value body (msgpack encoded)

## Qos Headers

### Qos Levels
(Optional) Specifies the quality of service (qos) that the requester requires.

* 0 (default): Most recent value
* 1: All values, if possible
* 2: All values, even if the connection is dropped (durable)
* 3: All values, even if the responder is rebooted (persistent)

### Queue Size
(Optional) Specifies the size of the qos queue maintained for the requester. Every responder maintains a maximum and a default qos queue size for each requester. If the queue size in a request is smaller than the maximum size, the responder uses the queue size specified in the request. If the queue size in the request exceeds the maximum, the responder ignores it and does not return an error. When a broker accepts a queue size that is smaller than the maximum from the requester, it must forward that information to the responder.

### Queue Time
(Optional) Specifies how long a value can stay in a queue. When a broker accepts a queue time that is smaller than the maximum from the requester, it must forward that information to the responder. QUESTIONS: specified in milliseconds? What's the default? What's the maximum?

### Update Frequency 
(Optional) If set, the responder merges value if more than one updatesis received in the specified time interval. To specify the interval, use the following 1-byte values: QUESTION: What does it mean to "merge" values?

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
