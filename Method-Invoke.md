## request body structure

Message Type Id : **04**

* parameters : a msgpack encoded map for all the parameters

## response body structure

Message Type Id : **81**

* body : a msgpack encoded object for all result, can be any data type or structure. but table is a structure that's mostly used
  * table format: root object is a map, with the following child keys
     * meta (optional) : a map that contains the table update information
        * mode : the mode of the response stream
        * modify : the modify mode of the stream
     * columns (optional) : a list of columns
     * rows : a list of list, for each cell in the table result

example of table format
```json
{
  "meta":{"mode":"refresh"},
  "columns": [
    {"name": "changes", "type": "string"}
  ],
  "updates": [
    ["first update"]
  ]
}
```
