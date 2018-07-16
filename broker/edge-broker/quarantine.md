## sys/quarantine main children

* **enabled**
  * $type:bool, $writable:config
  * bool point that control if an unknown link would connect to quarantine
  * default true
* **quarantine client nodes**
  * $is:pub/2.0/broker/quarantine-client
  * node name is the [dsid](../../common/dsid.md)
  

## pub/2.0/broker/quarantine-client profile

* **authorize**
  * $invokable:config
  * action to remove the link from quaratine, and add to Sys/Client and Downstream, 
  * parameters (for more detail check [Clients](clients.md) )
    * Path: downstream path
      * type:string
    * Role: permisison role
      * type:string
    * Max_Session: max number of clients that can connect at same time, default 1
      * type:number

