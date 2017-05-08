In DSA 2.0, messages are composed of a header and a body (payload). Message headers contain a fixed structure followed by a variable structure, as follows.

## Fixed structure
* Total length of message: 4 bytes
* Header length: 2 bytes
* Method: 2 bytes
* Requestor ID (reqId): 4 bytes
* Sequence ID (seqId): 4 bytes

The sequence ID is use to assemble multi-part messages. Sequence numbering starts from 0.

## Dynamic structure

The dynamic part of the header can contain the following data, formatted as key/value pairs. The key is 1 byte long.

* 0x00 **status**, 1 byte ([List of status codes)](https://github.com/dsa-2/docs/wiki/Status-Table)
* 0x01 **page ID**, 4 bytes: Included when a payload is too big to be delivered in a single message.
* 0x08 **alias count**, 1 byte: To detect circular references in aliases, this value is incremented every time the request is routed via an alias. If the count exceeds a configured maximum, an aliasLoop error is returned to the requestor. The maximum is configured on a per-broker basis.
* 0x10 **qos**, 1 byte: See [Qos](https://github.com/dsa-2/docs/wiki/Qos)
* 0x11 **update frequency**, 1 byte: max frequency of update, responder will merge value if more than one updates is received in a time interval.
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
* 0x18 **priority**: A bool value, TRUE if the message is a high-priority message, FALSE if normal priority.
* 0x60 **permission token**: 2-byte string length + string data. (0x60 and 0x62 can not be used together in a request)
* 0x62 **max permission**, 1 byte: The max permission that the current request is allowed to run. (0x60 and 0x62 can not be used together in a request)
* 0x70 **path**: 2-byte string length + string data