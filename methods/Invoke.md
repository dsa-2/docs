## request body structure

Message Type Id : **03**

* parameters : a msgpack encoded map for all the parameters

## response body structure

Message Type Id : **83**

* body : a msgpack encoded object for all result, can be any data type or structure. but table is a structure that's mostly used
  * table format: root object is a map, with the following child keys
     * meta (optional) : a map that contains the table update information
        * mode : the mode of the response stream
          * `refresh` : Clear all existing rows in requester cache and add the updates. If columns are sent, then all previous columns will be cleared.
          * `append` : Append updates to the end of cache. If columns are sent, they will be added to the existing columns of the table.
          * `stream` : Works similarly as append, but allows requester to safely control the cache size and remove data from beginning.
        * modify : the modify mode of the stream, can be `replace N-M` or `insert N`
           * `replace 0-10` : remove data bwtween row 0-10 and replace with new rows in the updates
           * `insert 1` : insert before row 1, (first row is row 0)
     * columns (optional) : a list of columns
     * rows : a list of list, for each cell in the table result

example of table format
```json
{
  "meta":{"mode":"refresh"},
  "columns": [
    {"name": "changes", "type": "string"}
  ],
  "rows": [
    ["first update"]
  ]
}
```
