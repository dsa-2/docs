

## Update frequency
Update frequency is an optional header in a subscription request. when set,  responder will merge value if more than one updates is received in a time interval.

value of the update frequency is one byte index:

  * 0x00: no limitation (default value)
  * 0x10: 100 ms
  * 0x20: 1 second
  * 0x30: 5 second   
  * 0x40: 15 second
  * 0x50: 30 second
  * 0x60: 1 minute
  * 0x70: 5 minute
  * 0x80: 15 minute
  * 0x90: 30 minute
  * 0xA0: 1 hour