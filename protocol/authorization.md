
**Authorization** is an essential broker module that can be replaced with a different implementation.


## API 

#### checkToken
Parameters:
* token: The token data
* dsId: (optional) The dsId must be validated with auth before the token is checked.

Return: The default permission token for the client


#### checkPermission

A client can send a permission token with each method in the request message header, and this method will be used to validate the token. If a permission token is not specified, the broker will use the default permission token returned by the checkToken API

Parameters:
* permissionToken
* path
* method

Return: bool indicating whether the permission is allowed


## request message headers

#### Max Permission
Sometimes a requester has a high permission level on the responder, but it send a request on behave of another device, which should have lower permission level.

In that case a max permission header is added in the request so the responder can do the permisison check correctlly.

| Level| Value | 
|:-------------:|:-------------:|
| List | 0x10 |  
| Read | 0x20 | 
| Write | 0x30 |  
| Config| 0x40 | 
