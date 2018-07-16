## sys/roles main children
* **add**
  * $invokable:config
  * action to add a permission role
  * parameters:
    * Name: role name
* **permission role node** (for every permission role)
  * $is:pub/2.0/broker/permission-role
  * **permission rule node** (for every permisison rule in a role)
    * $is:pub/2.0/broker/permission-rule 
* **default**
  * $is:pub/2.0/broker/permission-role
  * the default permisison role

permission check always run on long path before short path, this will make rule for `downstream/link1` has a higher priority than `downstream`

## pub/2.0/broker/permission-role profile
* **add-rule**
  * $invokable:config
  * parameters:
    * Path: node path
      * type:string
      * the path will converted to a the node name of rule node, url escape will be applied to the string on invalid characters
    * Permission: permission level
      * type:string, editor:`enum[none,list,read,write,config]`
* **fallback**
  * $type:string, $writable:config
  * a fallback Role, if no rule is matched in the rule list of this role, check the list of the fallback role
  * fallback check can be recursive, it will check the fallback of a fallback role
  * when value is changed, need to do a check to see if there is a loop in fallback chain.
  * if fallback is not specified, use the default Role


## pub/2.0/broker/permission-rule profile
* $type: string
* $editor: `enum[none,list,read,write,config]`
* **remove**
  * $invokable:config
  * action to remove the rule, 
