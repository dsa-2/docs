dsId is a unique string of 43-127 characters, the last 43 characters are url safe Base64 encoded SHA256 hash of the public-key binary

example: `link-dataflow-s-R9RKdvC2VNkfRwpNDMMpmT_YWVbhPLfbIc-7g4cpc`

### valid characters

* device dsid should only contain `A`-`Z` `a`-`z` `0`-`9` `-` `_` `.`
* if there is a `%` it must be followed by 2 hex characters


### reserved dsid usecase

* dsid contains `@` are reserved for email address
* dsid shorter than 43 characters are reserved for user names
