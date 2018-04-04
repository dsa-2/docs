## Sys/Permissions main children
* **Add**
  * $invokable:config
  * action to add a permission role
  * parameters:
    * Name: role name
* **permission role node** (for every permission role)
  * $is:Pub/2.0/Broker/Permission_Role 
  * **permission rule node** (for every permisison rule in a role)
    * $is:Pub/2.0/Broker/Permission_Rule 
* **default**
  * $is:Pub/2.0/Broker/Permission_Role
  * the default permisison role

permission check always run on long path before short path, this will make rule for `Downstream/Link1` has a higher priority than `Downstream`

## Pub/2.0/Broker/Permission_Role profile
* **Add_Rule**
  * $invokable:config
  * parameters:
    * Path: node path
      * type:string
    * Permission: permission level
      * type:string, editor:`enum[none,list,read,write,config]`
* **Fallback**
  * $type:string, $writable:config
  * a fallback Role, if no rule is matched in the rule list of this role, check the list of the fallback role
  * fallback check can be recursive, it will check the fallback of a fallback role
  * when value is changed, need to do a check to see if there is a loop in fallback chain.
  * if fallback is not specified, use the default Role


## Pub/2.0/Broker/Permission_Rule profile
* $type: string
* $editor: `enum[none,list,read,write,config]`
* **Remove**
  * $invokable:config
  * action to remove the rule, 
