when server send a publish request to the client, it requires client to send back all value and list update as soon as they happens.

### limitations

* since client need to send all update to broker, publish request won't work on devices that have too many data updates
* [Pagging](Paggint) is not supported, so publish response can not have huge value that can't be handled by one single message

## request body structure
Message Type Id : **02**

request body is always empty

## response body
Message Type Id : **81** / **83**

publish doesn't have it's own response structure, instead, it use the response structure for Subscribe and List api


