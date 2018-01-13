When the server sends an observe request to the client, it requires the client to send back all values and list updates as soon as they happen.

### Limitations

* Since the client needs to send all updates to the broker, observe request will not work on devices that have too many data updates.
* Paging is not supported, so observe response may not have a huge value that can't be handled by one single message.

## Request body structure
Message Type Id : **02**

Request body is always empty.

## response body
Message Type Id : **81** / **83**

Observe does not have its own response structure, instead, it uses the response structure for Subscribe and List API.

The only difference is that a subscribe and list response for an observe request has an extra header for the path that is updated.


