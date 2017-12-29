when server send a observe request to the client, it requires client to send back all value and list update as soon as they happens.

### limitations

* since client need to send all update to broker, observe request won't work on devices that have too many data updates
* [Pagging](../protocol/pagging.md) is not supported, so observe response can not have huge value that can't be handled by one single message

## request body structure
Message Type Id : **02**

request body is always empty

## response body
Message Type Id : **81** / **83**

observe doesn't have it's own response structure, instead, it use the response structure for Subscribe and List api

the only difference is that subscribe and list response for a observe request has a extra header for the path that's updated


