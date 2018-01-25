Big message body will be splitted into multiple pages, 
each paged message will be sent separately which allows other messages to be sent between pages.
Paged message only blocks the message in the same stream (with same rid)

## status
The [status](status-table.md) of a paged message is always 0x00(OK), except the last page, which carries the real status code

## message queue
If paged message is already partially sent, the remaining part of the queue should not be dropped due to queue size limit, but the queue can drop the messsage if it expires the queue time limit.

## callback
The user code callback should not be triggered when pagged message is not fully received.
