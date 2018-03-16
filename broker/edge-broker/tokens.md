## Sys/Tokens main children

* **Add**
  * $invokable:config
  * action to add a permission group
  * parameters:
    * Group: permission group for this token
    * Time_Range: how long the token can be used
      * type: string, editor: timerange
    * Count: number of times this token can be used
      * type: number
    * Max_Session: default max session of the client
      * type: number
    * Managed: manage dslink with this token
      * type: bool
      * when true Sys/Clients/client-id/Token node will be set to the name of token
  * output:
    * Name: token name (first 16 bytes of the token)
    * Token: full token (48 bytes)

* **token node** (for every token)
  * $is:Pub/2.0/Broker/Token
  * node name is the first 16 bytes of the token

## Pub/2.0/Broker/Token profile

* **Remove**
  * $invokable:config
  * action to remove the token
    * if token managed=true, search the Sys/Clients for any client that use this token and destroy it
    
* **Remove_All_Clients**
  * $invokable:config
  * action to remove all the clients connected with this toekn regardless if token is managed or not

* **Regenerate**
  * $invokable:config
  * action to change the token, token name (first 16 bytes) won't be changed, but the next 32 bytes get a new random string

* **Time_Range**
  * $type:string, $writable:config
  * when can the token be used
  * token expired it will remove itself and clients will be removed if it's managed


* **Count**
  * $type:number, $writable:config
  * how many times the token can be used

* **Max_Session**
  * $type:number, $writable:config

* **Managed**
  * $type:bool, $writable:config

* **Token**
  * $type:string
  * full token string, read only


## Use the token
when dslink connect to broker it can use commandline parameter `--token ${fulltoken 48 bytes}`

during the handshake, dslink should not send real token over the network, instead, it should send `token.substring(0,16) + url_safe_base64(sha256(dsId+token))`

