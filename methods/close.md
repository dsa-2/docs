## request body structure

Message Type Id : **0F**

* The close request is used to close an open message stream, when close request is sent, the stream will no longer receive any response. 
* If there are responses that are already sent, but not received or handled by the requester yet, those responses will be ignored.
* Set Method doesn't support Close message, since Set method doesn't support streaming, each new set value must start a new set request.
* If a stream already returns status:closed, or any error code >= 0x20, the close request is not necessary, since the requester is not supposed to send anything after the responder close the stream
