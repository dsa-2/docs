
[An Example of Handshake algorithm implemented in nodejs](handshake-algorithm.node.js)

## Client Info
Message type ID: **F0**

* version: 2 bytes. The current version is 2.0, encoded as 0x02, 0x00
* dsId: client dsId, [string data](../common/dsa-binary-encoding.md#string-encoding)
* publicKey: The broker public key, binary ECPoint data in in X9.63 format, fixed length of 65 bytes
* salt: 32 bytes
<!--* encryption: 1 byte (0x00 = plain connection, 0x01 = aes256-ctr). Encryption is not needed for a secure TCP or WSS-->

## Broker Info
Message type ID: **F1**

* dsId: broker dsId, [string data](../common/dsa-binary-encoding.md#string-encoding)
* publicKey: The broker public key, binary ECPoint data in in X9.63 format, fixed length of 65 bytes
* salt: 32 bytes

The broker returns blank data if one of the following errors occurs:

| Error| Message|
|:-------------:| ------------- |
| 40| Permission denied|
| 41| Invalid input| Protocol level|


## Handshake request body structure 
Message type ID: **F2**

<!--In secure mode, this is the first message that is encrypted in aes-->

* clientToken: [string data](../common/dsa-binary-encoding.md#string-encoding). For an empty token, use an empty string, a single byte containing 0.
* isResponder: 1-byte bool value, 0x00 for false, 0x01 for true
* path: [string data](../common/dsa-binary-encoding.md#string-encoding). Location of the server on the client. If client itself is not a broker, this value must be empty string.
* auth: binary of sha256 data, fixed 32 bytes. auth = sha256(serverSalt + SharedSecret)


## Handshake response body structure
Message type ID: **F3**

* allowRequester: 1-byte bool value, allow client to send request or not
* path: [string data](../common/dsa-binary-encoding.md#string-encoding). Location of the client on the broker if the client is a responder. And when client is not a responder, path must be an empty string.
* auth: binary of sha256 data, fixed 32 bytes. auth = sha256(client Salt + SharedSecret)


The broker returns blank data if one of the following errors occurs:

| Error| Message|
|:-------------:| ------------- |
| 40| Permission denied|
| 41| Invalid input| Protocol level|
| F9 | Connection error, Incorrect auth value| 



