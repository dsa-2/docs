## request body structure

Message Type Id : **04**

* value metadata length,2 bytes
* value metadata body, a msgpack map
* value body (msgpack encoded)

#### Attribute Field Header

when attribute field is specified, the set method change the node attribute instead of node value

## response body structure

Message Type Id : **84**

response body of a set method is always empty
