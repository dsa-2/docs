## Connection
* client initiates the handshake
* server accepts the client
* when connected, both sides need to make sure at least one message is sent every minute
  * if there is no need to send any message, a Ping message is sent


## Disconnection
* if any of these conditions happens, on either client or server side, the connection will be closed
  * when a connection can't receive any message in one minute
  * when a malformed message is received

## Reconnection
* When a connection is closed, client should reconnect back to server
  * client should wait at least 1 second before reconnecting
  * if the connection keeps failing, client should increase the waiting time, up to 60 seconds
* When a connection is closed, server should keep the cache of connected stream for at least 5 minutes before completely destroying it
  * if client reconnects before the cache is destroyed, they exchange the last ack id, and resume streams on both sides. Both sides should re-send proper update so they can keep track the last states of the streams
  * if client reconnects after the server's cache is destroyed, it should clear all cached values in streams, and both sides should re-send subscribe and list requests. other requests will be closed with error message

# Stream Handling (by sdk)
* right after disconnection
  * Streams should not be closed
  * NotAvailible response should be sent to all list, subscribe, and invoke stream
* 5 minutes after disconnection
  * close all streams, distroy the session cache, except:
    * list stream from requester side
    * subscribe stream from requester side
    * qos 2/3 subscribe stream from responder side, (will be move to special map, that ignores rid)
  * subscribe stream with qos

* if client reconnect back within 5 minutes, with the correct session id
  * both side of the connection send their last ack id upon connection
  * all the stream resend unacked message 
* otherwise
  * all the stream are closed
  * sdk reinitialized list and subscribe streams from the requester side
  * if other stream need to be reinitialized, it should be handled by user code

## QOS Subscription
* subscribe stream with QOS 2 or QOS 3 needs to be retained even after server clears other cache
* QOS stream cache only works for dslink clients with unique connection. clients that allow multiple connections don't support QOS, i.e. web browser user using cookie based login
* when a dslink is re-connected, it must re-send the same qos request within 60 seconds after the connection, otherwise the qos response stream for that request will be cleared
  * if the request is sent with different parameter, the qos response stream might be dropped
  * if the dslink is dropped again before the request is sent, the 60 seconds will be counted again from the next time it connects
  * the request could have a new rid, so the qos response stream should ignore the previous rid and match the request with node path
