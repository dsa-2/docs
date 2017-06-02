
Authorization is a essential broker module that can be replaced with different implementation.


## API 

#### checkToken
parameters:
* token : the token data
* dsId : optioanal, the dsId must be validated with auth, before the token is checked.

return: 
* default permission token for the client


#### checkPermission

client can send a permission token with each method in the request message header, and this method will be used to validate the token.
if permission token is not specified, broker will use the default permission token returned by the checkToken API

parameters:
* permissionToken
* path
* method

return:
* bool, allowed or not