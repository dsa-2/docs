dsId is a unique string of 43-127 characters, the last 43 characters are url safe Base64 encoded SHA256 hash of the public-key binary

example: `link-dataflow-s-R9RKdvC2VNkfRwpNDMMpmT_YWVbhPLfbIc-7g4cpc`

### valid characters

* device dsid should only use [URI safe characters](https://tools.ietf.org/html/rfc3986)
  * can only contain `A`-`Z` `a`-`z` `0`-`9` `-` `_` `.` `~`
  * `%` is a exception, but it must be followed by 2 hex characters


### reserved dsid usecase

* non-device dsid may contains other characters, i.e. `@` can be used if dsid is an email address, but dsid should still follow the rule of a [valid node name](path.md)
* dsid shorter than 43 characters are reserved for user names
