In DSA 2.0, messages are composed of a header and a body (payload). Message headers contain a fixed structure followed by a variable structure, as follows.

## Fixed structure
The fixed header is used by all dsa2 messages.
* Total length of message: 4 bytes
* Header length: 2 bytes
* Method: 1 bytes
  * 01 / 81, subscribe ( request:01, response:81 )
  * 02 / 82, list
  * 03 / 83, invoke
  * 04 / 84, Set
  * 0F / 81 82, observe
  * F0 / F1 / F2 / F3, handshake
* Request ID (reqId): 4 bytes
  * 0 means no need for an id
* Acknowledgment ID (ackId): 4 bytes
  * 0 means no need to ack


## Dynamic structure

The dynamic part of the header can contain the following data, formatted as key/value pairs. The key is 1 byte long.

<table>
<tr><th>Code</th>
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
      <a href="Status-Table.md">List of status codes</a>
    </td></tr>
<tr><td rowspan="2">01</td>
    <td>SequenceID</td>
    <td>4</td>
    <td>both</td>
    <td>response<br/>only</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td>
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
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      Included when a payload is too big to be delivered in a single message.
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
    <td>1</td>
    <td>both</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td></tr>
    <tr><td colspan="8">
      When the value is 01~7F, the request/response will have a lower priority than normal message, when value is 81~FF, the message will have a higher priority than normal message.
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
      the only valid response status  &lt; 0x10  is 0x01 (Initializing) , other status should all become a close status 0x10 <a href="Status-Table.md">List of status codes</a>
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
      Qos of s subscription, see <a href="../methods/Subscribe.md">Subscribe</a>
    </td></tr>
<tr><td rowspan="2">13</td>
    <td>Update Frequency</td>
    <td>1</td>
    <td>request</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Update frequency of a subscription, see <a href="../methods/Subscribe.md">Subscribe</a>
    </td></tr>
<tr><td rowspan="2">14</td>
    <td>Queue Size</td>
    <td>1</td>
    <td>request</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Prefered Queue size of subscription, see <a href="../methods/Subscribe.md">Subscribe</a>
    </td></tr>
<tr><td rowspan="2">15</td>
    <td>Queue Time</td>
    <td>1</td>
    <td>request</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      Prefered Queue time of subscription, see <a href="../methods/Subscribe.md">Subscribe</a>
    </td></tr>
<tr><td rowspan="2">21</td>
    <td>Base Path</td>
    <td>Str</td>
    <td>response</td>
    <td>-</td>
    <td>-</td>
    <td>✓</td>
    <td>-</td>
    <td>-</td></tr>
    <tr><td colspan="8">
      base path of a list response, only needed in the first response of a request, unless response is refreshed, see <a href="../methods/List.md">List</a>
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
      Max permission, see <a href="../protocol/Authorization.md">Authorization</a>
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
      permission token, see <a href="../protocol/Authorization.md">Authorization</a> 
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
