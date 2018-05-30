In DSA 2.0, messages are composed of a header and a body (payload). Message headers contain a fixed structure followed by a variable structure, as follows.

## Fixed structure
The fixed header is used by all dsa2 messages.
* Total length of message: 4 bytes
  * In current version, total length is limited to 65472 bytes, (64K-64)
* Header length: 2 bytes
  * Header Length can not be bigger than 16320 bytes (16K-64)
  * Body Length (Total-Header) can not be bigger than 49152 bytes (48K)
* Method: 1 bytes
  * 01 / 81, subscribe ( request:01, response:81 )
  * 02 / 82, list
  * 03 / 83, invoke
  * 04 / 84, set
  * 07 / 87, preflight request ( to check the permission of subscribe of list )
  * 0F, close
  * F0 / F1 / F2 / F3, handshake
  * F8, Ack
  * F9, Ping
* Request ID (reqId): 4 bytes (optional)
  * 0 means no need for an id, only for message type >=0xF)
    * in this case, it's ok to ommit the Request ID and Ack Id
* Acknowledgment ID (ackId): 4 bytes (optional)

these message type don't need Request ID and Ack ID (any message type >= 0xF0)
* F0 / F1 / F2 / F3, handshake
* F8, Ack
* F9, Ping


## Dynamic structure

The dynamic part of the header can contain the following data, formatted as key/value pairs. The key is 1 byte long.

<table>
<tr><th>Code<br>(hex)</th>
    <th>Name</th>
    <th>Len</th>
    <th>Type</th>
    <th>Sub</th>
    <th>Observe</th>
    <th>List</th>
    <th>Invoke</th>
    <th>Set</th></tr>
<tr><td rowspan="2">00</td>
    <td>Status</td>
    <td>1</td>
    <td>response</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      <a href="status-table.md">List of status codes</a>
    </td></tr>
<tr><td rowspan="2">01</td>
    <td>SequenceID</td>
    <td>4</td>
    <td>both</td>
    <td>response<br/>only</td>
    <td>-</td>
    <td>-</td>
    <td>both</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Included when a payload is too big to be delivered in a single message.
    </td></tr>
<tr><td rowspan="2">02</td>
    <td>Page ID</td>
    <td>4</td>
    <td>both</td>
    <td>response<br/>only</td>
    <td>-</td>
    <td>-</td>
    <td>both</td>
    <td>request<br/>only</td></tr>
    <tr><td colspan="8">
      Included when a payload is too big to be delivered in a single message. A Non-zero value means this is part of a <a href="paged-message.md">paged message</a>
    </td></tr>
<tr><td rowspan="2">04</td>
    <td>Audit Log</td>
    <td>Str</td>
    <td>response</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      A log string for the parent broker to audit
    </td></tr>
<tr><td rowspan="2">05</td>
    <td>Error Detail</td>
    <td>Str</td>
    <td>response</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      Addition information for the error, this should only happen when there is extra information that can't be covered by just one byte status code header
    </td></tr>
<tr><td rowspan="2">08</td>
    <td>Alias Count</td>
    <td>1</td>
    <td>request</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      To detect circular references in aliases, this value is incremented every time the request is routed via an alias. If the count exceeds a configured maximum, an aliasLoop error is returned to the requestor. The maximum is configured on a per-broker basis.
    </td></tr>
<tr><td rowspan="2">10</td>
    <td>Priority</td>
    <td>0</td>
    <td>request</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      when this flag is in the header, the stream will have higher priority
    </td></tr>
<tr><td rowspan="2">11</td>
    <td>No Stream</td>
    <td>0</td>
    <td>request</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      when this flag is in the header, the stream will be closed as soon as data is ready, without requester sending any close request.<br>
      the only valid response status  &lt; 0x10  is 0x01 (Initializing) , other status should all become a close status 0x10 <a href="status-table.md">List of status codes</a>
    </td></tr>
<tr><td rowspan="2">12</td>
    <td>Qos</td>
    <td>1</td>
    <td>request</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Qos of s subscription, see <a href="../methods/subscribe.md">Subscribe</a>
    </td></tr>
<tr><td rowspan="2">14</td>
    <td>Queue Size</td>
    <td>4</td>
    <td>request</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Prefered Queue size of subscription, see <a href="../methods/subscribe.md">Subscribe</a>
    </td></tr>
<tr><td rowspan="2">15</td>
    <td>Queue Duration</td>
    <td>4</td>
    <td>request</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Prefered Queue Duration of subscription, see <a href="../methods/subscribe.md">Subscribe</a>
    </td></tr>
 <tr><td rowspan="2">20</td>
    <td>Refreshed</td>
    <td>0</td>
    <td>both</td>
    <td>-</td>
    <td>-</td>
    <td>response<br/>only</td>
    <td>both</td>
    <td>-</td></tr>
    <tr><td colspan="8">
     indicate that everything currently in the cache are no longer valid, need to clear all the cache and only use new update
    </td></tr>
<tr><td rowspan="2">21</td>
    <td>Pub Path</td>
    <td>Str</td>
    <td>response</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      path to the pub folder, only needed in the first response of a list request, unless response is refreshed, see <a href="../methods/list.md">List</a>
    </td></tr>
<tr><td rowspan="2">30</td>
    <td>Skippable</td>
    <td>0</td>
    <td>response</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      when a invoke response contains a skippable flag. the broker can choose to skip this message if the next message comes in before the previous one is sent out to requester.
    </td></tr>
<tr><td rowspan="2">32</td>
    <td>Max Permission</td>
    <td>1</td>
    <td>request</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Max permission, see <a href="../protocol/authorization.md">Authorization</a>
    </td></tr>
<tr><td rowspan="2">41</td>
    <td>Attribute Field</td>
    <td>Str</td>
    <td>request</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      Attribute field of a set request.
    </td></tr>
<tr><td rowspan="2">60</td>
    <td>Permission Token</td>
    <td>Str</td>
    <td>request</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      permission token, see <a href="../protocol/authorization.md">Authorization</a> 
    </td></tr>

<tr><td rowspan="2">80</td>
    <td>Target Path</td>
    <td>Str</td>
    <td>request</td>
    <td>Always</td>
    <td>Always</td>
    <td>Always</td>
    <td>Always</td>
    <td>Always</td></tr>
    <tr><td colspan="8">
      Path of a request
    </td></tr>
<tr><td rowspan="2">81</td>
    <td>Source Path</td>
    <td>Str</td>
    <td>response</td>
    <td>Always</td>
    <td>-</td>
    <td>Always</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      list and subscribe response that comes for a observe request will always have a source path.
    </td></tr>
</table>
