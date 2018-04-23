## Sys/Clients main children

* **Allow_All_Links**
  * $type:bool, $writable:config
  * bool point that control if link can connect without athorization
  * default false
* **client nodes** (for every known client)
  * $is:Pub/2.0/Broker/Client
  * node name is the [dsid](../../common/dsid.md)
  

## Pub/2.0/Broker/Client profile

* **Remove**
  * $invokable:config
  * action to remove the Client, 
    * disconnect all connections
    * remove the node from Downstream and Sys/Clients
* **Detach_Token**
  * $invokable:config
  * action to clear the From_Token field, 
    * if it's a managed token, the token will no longer be able to remove the client
* **Role** 
  * $type:string, $writable:config
  * string point for the client's permission role string
* **Path**
  * $type:string, $writable:config
  * string point for the Client's responder path, usually starts with Downstream
  * when Max_Session>1, Path must be blank
  * when value changed, the original node in Downstream will be removed, and new node will be created
* **Max_Session**
  * $type:number, $writable:config
  * max session of the client
  * when Path is not blank, this value should always be 1
  * Subscription 2 and 3 is not supported when max_session is not 1
* **Current_Session**
  * $type:number
  * current number of seesions that's connected with the client's dsid
* **From_Token**
  * $type:string
  * 16 bytes token name, which token this client was created from
