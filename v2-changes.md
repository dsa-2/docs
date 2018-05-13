# Breaking changes dsa v1 protocol to v2 protocol

## Seprate header from message body

* [Message header](protocol/header-structure.md) is the part of a message that need to be read by broker, or sometimes even changed by broker
* Message body is usually not changed, and in most case, not even need to be parsed by broker

#### reason

* Separate header allows the broker to ignore most content in a message, which can significantly improve the performance of broker.

## Drop support of json format

* v2 message header use a simple binary encoding format, and message body use msgpack format

#### reason

* Dropping support for json allows broker to skip the parsing of message body. otherwise when routing a msgpack to a json only client, it will have to decode and encode the message body.

## Split message into pages

* Message has a max size of 16K header + 48K body. Message bigger than that size will be split into [pages](protocol/paged-message.md)

#### reason

* This allows big message to be transferred in same sockt/websocket connection while not blocking other small messages. the idea is similar to Multiplexing in HTTP/2

## Drop support of qos 3

* qos 0/1/2 is still same as dsa v1. but qos 3 is dropped, means broker and dslink are no longer required to have a storage to persist the subscription queue.

#### reason

* dsa subscription is designed to broadcast value to multiple requesters, the responder doesn't know which request or how many requesters are reading the value, so each layer of requester gives the ownership to its direct responder as soon as that responnder receives the value. And in the case of qos 3 (v1), each layer of broker needs to have a storage to persist the value, therefore the reliability of the qos queue is same as the least robust layer of broker in the network. 
* Another source of failure can happen at the final data consumer. Broker will clear the qos cache as soon as requester confirm the data is received. But that doesn't mean the data is handled and processed correctly. If requester dslink restarted during processing and then looking for the last value, broker would no longer have it.
* A better solution is to setup a database or value cache dslink on the nearest node to the source responder dslink, and other reuqesters that need a persisted queue should always talk to the value cache dslink. This reduced the risk of losing data since any failure in the other broker or in the requester won't cause data lose.
