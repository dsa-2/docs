## Handshake for temporary requester user

A temporary requester user doesn't have a predefined client in the broker, he's connected with a one time token which include his permisison group.

the user still need to do [4 steps handshake F0~F3](handshake-message.md) like a normal dsa client, but it can skip the ECDH authorization.

## Difference in handshake messages

### Client Info (F0)

* dsId: the username, must be less than 43 bytes

### Broker Info (F1)

no difference


### Handshake request body structure (F2)
Message type ID: **F2**

* isResponder: always false
* auth: all 0
* path: always blank string
* clientToken: a token generated from the web server 
  * comma separated string `id,permission_group,signature`

### Handshake response body structure (F3)


* allowRequester: always false
* path: always blank string
* auth: all 0


## Workflow of the clientToken generation

1. browser client connect to web server to get static file as well as infomations like url of the dsa broker
1. client connect to broker ws, send F0 and receive F1 message
1. client send the salt received from broker, and send a request to web server
1. web server generate the token and send back to client
1. client send the token in F2 message

## Algorithm of generating the signature

A user_auth token is on the hard disk, that can be accessed by both broker and web server during their initialization. ( If web server needs to run remotely, it should run a dslink that subscribe to the user_token. )

when web server received a client request to generate clientToken, it calculate this

`signature = url_base64(sha256( UTF("$username,$permission_group") + user_auth_binary + salt_binary ))`