

## String Encoding

in dsa header, string > 32767 bytes are not supported. which means all paths, node names, attrubute/config names, permission tokens will be less than 32767 bytes.

all string are UTF-8 encoded, but broker is not required to validate the encoding. 

* string length, 2 bytes LE
* string data

## Key Value Pairs Encoding

key value pairs encoding is mainly used by list response

neither key nor value can be bigger than 32767 bytes

* key length, 2 bytes LE
* key data
* value length, 2 bytes LE
* value data (msgpack encoding)


