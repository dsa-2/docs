## Broker Info request body strcture (not needed in http/ws)
Message Type Id : **F0**

request body is always empty

## Broker Info response body strcture (handled as http response http/ws)
Message Type Id : **F1**

* version : 2 bytes
   * current version 2.0 0x0200
* publicKey, broker public key, binary ECPoint data in in X9.63 format, fixed length, 65 bytes
* dsId : broker dsId, [string data](DSA-Binary-Encoding#string-encoding)
* time : current time, [string data](DSA-Binary-Encoding#string-encoding), start with first byte as its length. 


## Handshake request body structure (handled as uri query in http/ws)
Message Type Id : **F2**

* version : 2 bytes
   * current version 2.0 0x0200
* publicKey, client public key, binary ECPoint data in in X9.63 format, fixed length, 65 bytes
* dsId : client dsId, [string data](DSA-Binary-Encoding#string-encoding)
* time : current time, [string data](DSA-Binary-Encoding#string-encoding), start with first byte as its length. 
* token: [string data](DSA-Binary-Encoding#string-encoding)
  * for an empty token, use an empty string, which is just one byte of 0
* isRequester: 1 byte bool value, 0x00 for false, 0x01 for true
* isResponder: 1 byte bool value, 0x00 for false, 0x01 for true
* auth: binay of sha256 data, fixed 32 bytes


## Handshake response body structure
Message Type Id : **F3**



* path : where the client will be on the broker, [string data](DSA-Binary-Encoding#string-encoding).
   * if client is not responder, this should just be an empty string

#### possible errors

| Code(hex) | Message|
|:-------------:| ------------- |
| 20| Permission denied|
| 21| Invalid input| Protocol level|
| F8 | Connection error, the time in handshake has expired | 
| F9 | Connection error, Incorrect auth value| 