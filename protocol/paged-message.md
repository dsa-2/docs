Big message body will be splitted into multiple pages, 
each paged message will be sent separately which allows other messages to be sent between pages.
Paged message only blocks the message in the same stream (with same rid)

## Page ID
Page ID is a [header](header-structure.md) that indicate the message is only a page of a full message.

First Page Id is a negative number showing the total number of pages, for example, for a message that's splitted into 3 pages, the page id  of them will be -3,1,2

Undefined page

## Status
The [status](status-table.md) of a paged message is always 0x00(OK), except the last page, which carries the real status code

## message queue
If paged message is already partially sent, the remaining part of the queue should not be dropped due to queue size limit, but the queue can drop the messsage if it expires the queue time limit.

## callback
when making a requester dslink, the callback won't be triggered when pagged message is not fully received. if a paged message is dropped before fully received, then the callback won't be triggered on the message at all.
