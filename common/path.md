## path
a dsa node path is a string of node names separated by `/`

## invalid characters in path name

* any ascii character code < 0x20
* `\` `/` `'` `"` `?` `*` `|`
* `%` must be followed by 2 hex characters `0~9` or `A~F` or `a~f`
* if a node name start with `$` or `@`, it's a config/attriute name, and it's only valid for the last name in a path
