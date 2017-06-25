
[An Example of Handshake algorithm implemented in nodejs](handshake-algorithm.node.js)

## Client Info (always non-secure)
Message Type Id : **F0**

in websocket mode, the dsId also need to be sent in url query string

* version : 2 bytes
   * current version 2.0 0x0200
* dsId : broker dsId, [string data](../common/DSA-Binary-Encoding#string-encoding.md#string-encoding)
* publicKey, broker public key, binary ECPoint data in in X9.63 format, fixed length, 65 bytes
* encryption: 1 bytes (0x00 : plain connection, 0x01 aes256-ctr)
   * encryption is not needed for a secure tcp or wss
* salt : 32 bytes

## Broker Info (always non-secure)
Message Type Id : **F1**

* dsId : broker dsId, [string data](../common/DSA-Binary-Encoding#string-encoding.md#string-encoding)
* publicKey, broker public key, binary ECPoint data in in X9.63 format, fixed length, 65 bytes
* salt : 32 bytes

or broker could return blank data with one of the following error

| Error| Message|
|:-------------:| ------------- |
| 20| Permission denied|
| 21| Invalid input| Protocol level|


## Handshake request body structure 
Message Type Id : **F2**

In secure mode, this will be the first message that's encrypted in aes

* token: [string data](../common/DSA-Binary-Encoding#string-encoding.md#string-encoding)
  * for an empty token, use an empty string, which is just one byte of 0
* isRequester: 1 byte bool value, 0x00 for false, 0x01 for true
* isResponder: 1 byte bool value, 0x00 for false, 0x01 for true
* session: previous session string returned by broker, or blank string 
  * if reconnect is not blank, isRequester and isResponder must be same as previous session
  * when previous session is accepted, streams that's not closed can be reused
* auth: binay of sha256 data, fixed 32 bytes
  * auth = HMAC_SHA256(SharedSecret).digest(broker salt)


## Handshake response body structure
Message Type Id : **F3**

* session: session string
  * if previous session string sent by client is accepted, the same session will be returned
  * if the previous session is blank or already expired, a new session string will be sent back
* path : where the client will be on the broker, [string data](../common/DSA-Binary-Encoding#string-encoding.md#string-encoding).
   * if client is not responder, this should just be an empty string
* auth: binay of sha256 data, fixed 32 bytes
  * auth = HMAC_SHA256(SharedSecret).digest(client salt)
  
or broker could return blank data with one of the following error

| Error| Message|
|:-------------:| ------------- |
| 20| Permission denied|
| 21| Invalid input| Protocol level|
| F9 | Connection error, Incorrect auth value| 



