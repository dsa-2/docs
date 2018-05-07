## Sys/Upstream main children
* **Add**
  * $invokable:config
  * action to add an upstream connection
  * parameters:
    * Name: upstream name
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
* **Name_On_Remote**
  * $type:string
  * $writable:config
* **Token**
  * $type:string
  * $writable:config
* **Role**
  * $type:string
  * $writable:config

