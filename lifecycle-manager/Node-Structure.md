
### root node



### dslink nodes

actions

 * Start
 * Stop
 * Force Stop (kill the process)
 * Uninstall

values

 * Enabled (bool,read/write)
   * when enabled is set to false, dslink will also be stopped
 * Status (string, readonly)
   * Connected
   * Disconnected (was connected after started, but now disconnected)
   * Started (just started, never connected)
   * Stopped
