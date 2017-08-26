
[An Example of Handshake algorithm implemented in nodejs](handshake-algorithm.node.js)

## Client Info (always non-secure)
Message type ID: **F0**

In websocket mode, the dsId must also be sent in the URL query string.

* version: 2 bytes. The current version is 2.0, encoded as 0x0200
* dsId: broker dsId, [string data](../common/DSA-Binary-Encoding.md#string-encoding)
* publicKey: The broker public key, binary ECPoint data in in X9.63 format, fixed length of 65 bytes
* encryption: 1 byte (0x00 = plain connection, 0x01 = aes256-ctr). Encryption is not needed for a secure TCP or WSS
* salt: 32 bytes

## Broker Info (always non-secure)
Message type ID: **F1**

* dsId: broker dsId, [string data](../common/DSA-Binary-Encoding.md#string-encoding)
* publicKey: The broker public key, binary ECPoint data in in X9.63 format, fixed length of 65 bytes
* salt: 32 bytes

The broker returns blank data if one of the following errors occurs:

| Error| Message|
|:-------------:| ------------- |
| 20| Permission denied|
| 21| Invalid input| Protocol level|


## Handshake request body structure 
Message type ID: **F2**

In secure mode, this is the first message that is encrypted in aes

* token: [string data](../common/DSA-Binary-Encoding.md#string-encoding). For an empty token, use an empty string, a single byte containing 0.
* isRequester: 1-byte bool value, 0x00 for false, 0x01 for true
* isResponder: 1-byte bool value, 0x00 for false, 0x01 for true
* reconnect: 1-byte bool value, true (0x01) if reconnecting from a previous connection. If reconnect is true, isRequester and isResponder must be same as the previous connection
* auth: binary of sha256 data, fixed 32 bytes. auth = sha256(serverSalt + SharedSecret)


## Handshake response body structure
Message type ID: **F3**

* reconnected: 1-byte bool value, 0x00 for false, 0x01 for true
* path: Location of the client on the broker, if the client is a responder: [string data](../common/DSA-Binary-Encoding.md#string-encoding). If the client is not a responder, path must be an empty string.
* auth: binary of sha256 data, fixed 32 bytes. auth = sha256(client Salt + SharedSecret)


The broker returns blank data if one of the following errors occurs:

| Error| Message|
|:-------------:| ------------- |
| 20| Permission denied|
| 21| Invalid input| Protocol level|
| F9 | Connection error, Incorrect auth value| 



