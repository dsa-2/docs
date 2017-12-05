
## root node

actions
 - Rescan
 - Start all links
 - Stop all links
 - Enable all links
 - Disable all links
 - Install link
    - from url
    - from zip
    - from repository

## dslink nodes

### actions

 - Start
 - Restart
 - Stop (stop handler called, proper stop)
 - Force stop (kill the process)
    - Try stopping properly for a while
    - If cannot, kill the process directly
 - Uninstall
    - Stop DsLink
    - Remove DsLink folder
 - Export
 - Log
    - Get
    - Clear
 - Update
    - from url
    - from zip
    - from repository
    
### values

 - Enabled (bool,read/write)
    - true:  dslink starts in the beginning
             If it is set to true in run-time, don't start if dslink is not running, just change the value
    - false: dslink does not start in the beginning
             when enabled is set to false in run-time, dslink will also be stopped
 - Status (string, readonly)
    - Started (just started, never connected, will try to connect)
    - Connected
    - Disconnected (was connected after started, but now disconnected. Trying to reconnect)
    - Stopped (Process not running)
 - Path (string, readonly)
    - broker path
 - Description (string, readonly)
 - Version (string, readonly)
 
 ### config (dslink-specific)
 - Enabled (bool, read/write)
 - Log level (enum, read/write)
 - Name (string, read/write),
 - Server port (string, read/write)
 - Token (string, read/write)
 
 ### common config
 - Broker url (string, read/write)
