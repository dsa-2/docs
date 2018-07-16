## sys/upstream main children
* **add**
  * $invokable:config
  * action to add an upstream connection
  * parameters:
    * Node_Name: the node name to be used in local broker
    * Connection_Name: the connection name, which will be used as a prefix of the current broker's dsid
      * upstream broker might create a node name for current broker based on the connection name
    * Url: broker url
    * Token: optional token
    * Role: role given to remote broker to allow it access this broker
 
* **upstream connection node** (for every upstream connection)
  * $is:pub/2.0/broker/upstream-connection
  

## pub/2.0/broker/upstream-connection profile
* **remove**
  * $invokable:config
  * action to remove the connection
* **enabled**
  * $type:bool
  * $writable:config
  * after changing any of the following values, need to set enabled to false and true to restart it.
* **url**
  * $type:string
  * $writable:config
* **token**
  * $type:string
  * $writable:config
* **role**
  * $type:string
  * $writable:config
* **status**
  * $type:string
    * value could be `Connecting` `Connected` `Reconnecting` `Disconnected`
* **remote-id**
  * $type:string
* **remote-path**
  * $type:string 
