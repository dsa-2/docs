## path
a dsa node path is a string of node names separated by `/`

## invalid characters in path name

* any ascii character code < 0x20
* `\` `/` `'` `"` `?` `*` `|` `<` `>` `=` `:` `;`
* `%` must be followed by 2 hex characters `0~9` or `A~F` or `a~f`
* other rules
  * can't start with @ , reserved for node attribtue
  * can't start with $ , reserved for node metadata
  * can't be `.` or `..`

## default naming for nodes

Following rules are recommended, but not enforced by the dslink or broker. Also they do not apply on nodes imported from other system, like file system or other protocol.

* `node-name`
  * use lowercase word, and connect words with hyphen 
* `invoke-action`
  * action node use the same rule as node name, and it should start with a verb
* `Action Parameter Name` and `Action Result Name`
  * use capitalized word, and connect words with space
* `$node-metadata` and `@node-attribtue`
  * use lowercase word, and connect words with hyphen 
