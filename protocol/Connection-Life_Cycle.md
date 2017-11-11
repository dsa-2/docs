
## Connection
* client initiate the handshake
* server accept the client
* when connected, both side need to make sure at least one message is sent in every minute
  * if there is no need to send any message, a Ping message is sent


## Disconnection
* if any of these conditions happens, on either client or server side, the connection will be closed
  * when a connection can't receive any message in one minute
  * when a malformed message is received

## Reconnection
* When a connection is closed, client should reconnect back to server
  * client should wait at least 1 second before reconnecting
  * if the connection keeps failing, client should increase the waiting time, up to 60 seconds
* When a connection is closed, server should keep the current connection session for at least 5 minutes before completely destroy it
  * if client reconnect before the session is destroyed, they exchange the last ack id, and open streams on both side should re-send proper update so they can keep track the last states of the streams
  * if client reconnect after the session is destroyed, it should clear all cached values in streams, and both side should re-send subscribe and list requests. other requests will be closed with error message
