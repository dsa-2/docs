## Authentication (TCP or Websocket)

[Handshake Messages](../handshake/handshake-message.md)

<!--
https://sequencediagram.org
Client->Server: F0: ClientId, ClientPubKey, ClientSalt
Server->Client: F1: ServerId, ServerPubKey, ServerSalt
Client->Server: F2: ClientAuth, ClientToken?
note left of Server: ClientAuth = sha256_hmac(SharedSecret).hash(ServerSalt)
Server->Client: F3: ServerAuth
note right of Client: SlientAuth = sha256_hmac(SharedSecret).hash(CerverSalt)
-->

![handshake](../assets/handshake.svg)



## Authorization
