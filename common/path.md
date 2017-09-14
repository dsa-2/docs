## path
a dsa node path is a string of node names separated by `/`

## invalid characters in path name

* any ascii character code < 0x20
* `\` `/` `'` `"` `?` `*` `|` `<` `>` `=` `:` `;`
* `%` must be followed by 2 hex characters `0~9` or `A~F` or `a~f`
* other rules
  * can't start with @ , reserved for node attribtue
  * can't start with $ , reserved for node metadata
  * can't be single character `.`
  * can't start with `..`
