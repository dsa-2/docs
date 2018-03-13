## Sys/Quaratine main children

* **Enabled**
  * $type:bool, $writable:config
  * bool point that control if an unknown link would connect to quarantine
  * default true
* **quarantine client nodes**
  * $is:Pub/2.0/Broker/Quarantine_Client
  * node name is the [dsid](../../common/dsid.md)
  

## Pub/2.0/Broker/Quarantine_Client profile

* **Authorize**
  * $invokable:config
  * action to remove the link from quaratine, and add to Sys/Client and Downstream, 
  * parameters (for more detail check [Clients](clients.md) )
    * Path: downstream path
      * type:string
    * Group: permisison group
      * type:string
    * Max_Session: max number of clients that can connect at same time, default 1
      * type:number

