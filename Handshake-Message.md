## Client Info (always non-secure)
Message Type Id : **F0**

in websocket mode, the dsId also need to be sent in url query string

* version : 2 bytes
   * current version 2.0 0x0200
* dsId : broker dsId, [string data](DSA-Binary-Encoding#string-encoding)
* publicKey, broker public key, binary ECPoint data in in X9.63 format, fixed length, 65 bytes
* secure : 1 bytes (0x00 : plain connection, 0x01 secure connection)
   * secure connection is not needed for a websocket connection over https
* salt : 32 bytes

## Broker Info (always non-secure)
Message Type Id : **F1**

* dsId : broker dsId, [string data](DSA-Binary-Encoding#string-encoding)
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

* token: [string data](DSA-Binary-Encoding#string-encoding)
  * for an empty token, use an empty string, which is just one byte of 0
* isRequester: 1 byte bool value, 0x00 for false, 0x01 for true
* isResponder: 1 byte bool value, 0x00 for false, 0x01 for true
* reconnect: reconnect from a previous connection, 1 byte bool value, 0x00 for false, 0x01 for true
  * if reconnect is true, isRequester and isResponder must be same as previous connection
* auth: binay of sha256 data, fixed 32 bytes
  * auth = sha256(serverSalt + SharedSecret)


## Handshake response body structure
Message Type Id : **F3**

* reconnected: 1 byte bool value, 0x00 for false, 0x01 for true
* path : where the client will be on the broker, [string data](DSA-Binary-Encoding#string-encoding).
   * if client is not responder, this should just be an empty string
* auth: binay of sha256 data, fixed 32 bytes
  * auth = sha256(client Salt + SharedSecret)

or broker could return blank data with one of the following error

| Error| Message|
|:-------------:| ------------- |
| 20| Permission denied|
| 21| Invalid input| Protocol level|
| F9 | Connection error, Incorrect auth value| 



