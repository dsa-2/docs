

## String Encoding

in dsa header and other broker aware data structure, string > 32767 bytes are not supported. which means all paths, node names, attrubute/config names, permission tokens will be less than 32767 bytes.

* string length
  * length 0 - 127, 1 bytes
  * length 128 - 32767, 2 byte length (length | 0x8000)
* string data

## Key Value Pairs Encoding

one key value pair can't be more than 32676 bytes, which is the key + data size.

this limitation only applies to list method response and value header in subscription response

* total length
  * length 0 - 127, 1 bytes
  * length 128 - 32767, 2 byte length (length | 0x8000)
* key length (same as string encoding)
* key data
* value data (msgpack encoding)


