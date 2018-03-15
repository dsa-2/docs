## Sys/Permissions main children
* **Add**
  * $invokable:config
  * action to add a permission group
  * parameters:
    * Name: group name
* **permission group node** (for every permission group)
  * $is:Pub/2.0/Broker/Permission_Group 
  * **permission rule node** (for every permisison rule in a group)
    * $is:Pub/2.0/Broker/Permission_Rule 
* **default**
  * $is:Pub/2.0/Broker/Permission_Group
  * the default permisison group

permission check always run on long path before short path, this will make rule for `Downstream/Link1` has a higher priority than `Downstream`

## Pub/2.0/Broker/Permission_Group profile
* **Add_Rule**
  * $invokable:config
  * parameters:
    * Path: node path
      * type:string
    * Permission: permission level
      * type:string, editor:`enum[none,list,read,write,config]`
* **Fallback**
  * $type:string, $writable:config
  * a fallback Group, if no rule is matched in the rule list of this group, check the list of the fallback group
  * fallback check can be recursive, it will check the fallback of a fallback group
  * when value is changed, need to do a check to see if there is a loop in fallback chain.
  * if fallback is not specified, use the default Group


## Pub/2.0/Broker/Permission_Rule profile
* $type: string
* $editor: `enum[none,list,read,write,config]`
* **Remove**
  * $invokable:config
  * action to remove the rule, 
