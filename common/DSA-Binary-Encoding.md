

## String Encoding

in dsa header and other broker aware data structure, string > 32767 bytes are not supported. which means all paths, node names, attrubute/config names, permission tokens will be less than 32767 bytes.

* string length, 2 bytes LE
* string data

## Key Value Pairs Encoding

neither key nor value can be bigger than 32767 bytes

* key length, 2 bytes LE
* key data
* total value, 2 bytes LE
* value data (msgpack encoding)


