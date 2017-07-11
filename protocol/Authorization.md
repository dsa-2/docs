
**Authorization** is an essential broker module that can be replaced with a different implementation.


## API 

#### checkToken
Parameters:
* token: The token data
* dsId: (Optional) The dsId must be validated with auth before the token is checked.

Return: The default permission token for the client


#### checkPermission

A client can send a permission token with each method in the request message header, and this method will be used to validate the token. If a permission token is not specified, the broker will use the default permission token returned by the checkToken API

Parameters:
* permissionToken
* path
* method

Return: bool indicating whether the permission is allowed
