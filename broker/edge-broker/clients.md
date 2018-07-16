## Sys/Clients main children

* **allow-all-links**
  * $type:bool, $writable:config
  * bool point that control if link can connect without athorization
  * default false
* **client nodes** (for every known client)
  * $is:pub/2.0/broker/client
  * node name is the [dsid](../../common/dsid.md)
  

## pub/2.0/broker/client profile

* **remove**
  * $invokable:config
  * action to remove the Client, 
    * disconnect all connections
    * remove the node from Downstream and sys/clients
* **detach-token**
  * $invokable:config
  * action to clear the From_Token field, 
    * if it's a managed token, the token will no longer be able to remove the client
* **role** 
  * $type:string, $writable:config
  * string point for the client's permission role string
* **path**
  * $type:string, $writable:config
  * string point for the Client's responder path, usually starts with Downstream
  * when max-session>1, Path must be blank
  * when value changed, the original node in Downstream will be removed, and new node will be created
* **max-session**
  * $type:number, $writable:config
  * max session of the client
  * when Path is not blank, this value should always be 1
  * Subscription 2 and 3 is not supported when max_session is not 1
* **current-session**
  * $type:number
  * current number of seesions that's connected with the client's dsid
* **from-token**
  * $type:string
  * 16 bytes token name, which token this client was created from
