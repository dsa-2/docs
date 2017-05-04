
## fixed structure in header
* total length, 4 bytes
* header length, 2 bytes
* method, 2 bytes
* reqId, 4 bytes
* seqId, 4 bytes
  * sequence id, always start from 0

## dynamic structure in header

key(1byte): value pairs

* 0x00 status, +1
  * [Status Table](https://github.com/dsa-2/docs/wiki/Status-Table)
  * when not specified, state = 0, OK
* 0x01 page id, +4
  * when payload is too big
* 0x08 alias count, + 1
  * every time the request is route to a alias node, this count +1
  * when max count is reached, a AliasLoop error should be sent back 
  * max alias count can be defined for each broker
* 0x10 qos +1 
  * [Qos](https://github.com/dsa-2/docs/wiki/Qos)
* 0x18 priority, +0
  * a bool value, either specified or not specified, no following data

* 0x60 permission token
  * +2 byte string length, + string data
* 0x62 max permission + 1
  * the max permission current request is allowed to run

* 0x70 path
  * +2 byte string length, + string data

