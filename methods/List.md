## request body structure

Message Type Id : **02**

request body is always empty

## response body structure

Message Type Id : **82**

[dsa key values pairs format](../common/DSA-Binary-Encoding.md#key-value-pairs-encoding)

* node attributes: 
   * key starts with @
   * value is any msgpack encoded data (with size limitation)
* node metadatas: 
   * key starts with $
     * when key starts with $$, only client with config permission can see
     * when key starts with $$$, no client can see it in list response
   * value is any msgpack encoded data (with size limitation)
* children
   * key starts with other character
   * value is msgpack format of basic map node structure, including $is, $type, $writable, $invokable information

### response optional headers

<!--* class
  * Class header is the path to a node that contains the common action children and other nodes pre-defined for the same class
  * when class path starts with `/` it's a path that either already known by the sdk or availible at every broker
  * when class path doesn't start with `/`, it needs to be conbined with base path.-->
* base path
  * base path is only needed when $is path points to local path
  * when base path is needed, initial value will be "/". and each time a broker forward list response, it appends the relative path to the dslink

### special metas

* $is : the profile node position
  * $is is the path to a node that contains the common action children and other nodes pre-defined for the same class
  * when $is path starts with `/` it's a path that either already known by the sdk or availible at every broker
  * when $is path doesn't start with `/`, it needs to be conbined with base path.
    * when base path is empty, then the profile node is blank, $is is only used as a type identifier
<!--
  * this field is optional in dsa v2 (while in v1 $is and the class header are combined together)
  * broker or sdk won't validate or check the value-->
* $type : indicate the [Value Type](../common/Value-Types.md) of the current node. 
  * when this meta exists, it means the current node has a value that requester can subscribe.
* $writable : indicate whether the node's value can be modified
  * the value is the minimal permission level requester needs to set the value
  * value can be either `write` or `config`
  
### special metas for action node

* $invokable : indicate whether the node is an action node that can be invoked
  * the value is the minimal permission level requester needs to invoke this action
  * value can be  `list`, `read`, `write` or `config`
* $params : the parameter structure of a action node
  * the structure must be a list of map objects
  * each item in the list can have 
     - name: name of the parameter (required)
     - type: type of the parameter
     - editor: use a special editor instead of the default one for the type
     - default: default value of the parameter, which will be picked by the ui input element
     - description: description of the parameter, will be shown in element tooltip (title)
     - placeholder: placeholder when the editor is text input
     - other option that's used by the editor
* $result : indicate the behavior of this action
  * the value of this meta can be `value`, `table` or `stream`
    * value: the result is a one time map for the result key-value pairs
    * table: the result is a multi-rows key value paris table
    * stream: the result is a table and will continue to update


