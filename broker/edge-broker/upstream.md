## Sys/Upstream main children
* **Add**
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
  * $is:Pub/2.0/Broker/Upstream_Connection
  

## Pub/2.0/Broker/Upstream_Connection profile
* **Remove**
  * $invokable:config
  * action to remove the connection
* **Enabled**
  * $type:bool
  * $writable:config
  * after changing any of the following values, need to set enabled to false and true to restart it.
* **Url**
  * $type:string
  * $writable:config
* **Token**
  * $type:string
  * $writable:config
* **Role**
  * $type:string
  * $writable:config
* **Status**
  * $type:string
    * value could be `Connecting` `Connected` `Reconnecting` `Disconnected`
* **Remote_Dsid**
  * $type:string
* **Remote_Path**
  * $type:string 
