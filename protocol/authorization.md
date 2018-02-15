


## Authorizer API 

**Authorizer** is an essential broker module that can be replaced with a different implementation.

#### check_permission

A client can send a permission token with each method in the request message header, and this method will be used to validate the token. If a permission token is not specified, the broker will use the default permission token returned by the checkToken API

Parameters:
* dsid
* permissionToken
* path
* method

Return: max permission level that the client is allowed on this path


## request message headers

#### Permission Token

A string that stores the authorization information about the client.
The implementation of Authorizer module controls what's stored in the token and how is checked.


#### Max Permission
Sometimes a requester has a high permission level on the responder, but it send a request on behave of another device, which should have lower permission level.

In that case a max permission header is added in the request so the responder can do the permisison check correctlly.

| Level| Value | 
|:-------------:|:-------------:|
| List | 0x10 |  
| Read | 0x20 | 
| Write | 0x30 |  
| Config| 0x40 | 
