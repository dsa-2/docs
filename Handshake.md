## Handshake Sequence

### broker information

broker information is sent by the broker for common information needed for the handshake. client should load it only once and cache the result locally

in a http/websocket server, this is usually hosted on /conn end point of the server

* publicKey : server's public key, Base64 encoded ECPoint in X9.63 format (uncompressed)
* dsId : server's [dsId](https://github.com/dsa-2/docs/wiki/dsId)
* time: a number representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC 
* version : protocol version, start from `2.0`

### handeshake request

client need to send these information to the broker to initialize a handshake

in websocket/http handshake, these information should be sent in query string
in tcp handshake, these information should be sent as first request message

#### ECDH handshake

* version : protocol version, start from `2.0`
* publicKey : client's publick key (Optional)
  * publickKey is only needed the first time dsLink connect, 
* dsId : client's [dsId](https://github.com/dsa-2/docs/wiki/dsId)
* time: current time, can not have more than 5 minutes difference from the server. 
   * client need to maintain the difference between server time and client time just incase one of them has wrong time setting, or it can just load the
* token : a token to set up the client's initial permission (Optional)
   * if token is not specified, it will be treated as blank string "" in the auth
* auth: a based64 encoded string to verify the identity of the client
   * auth = SHA256 (UTF8Bytes (StringConcat(token+"\n"+time)) + SharedSecret ) ("+" here means concatenating of byte buffer)
* isRequester, indicate whether client want to be a requester (Optional, default true)
* isResponder, indicate whether client want to be a responder(Optional, default true)


#### Token handshake

for requester only dslink, it's possible to establish a anonymous link just with a token to setup its permission

* version : protocol version, start from `2.0`
* token : a token to set up the client's initial permission (Optional)


### handshake response

this is the first response broker send to requester

* path : client's path on the broker (if client is responder)



## Token Validation

