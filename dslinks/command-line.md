
## general command line arguments

dslinks can all be started with command line arguments

### -b / --broker
- default value `localhost`

format:  `-b {protocol}://{host}:{port}`  or `-b {protocol}://{host}`

{protocol} can be:

* ds : dsa tcp connection  (port 4120)
* dss : secure dsa tcp connection (port 4128)
* ws : websocket (port 80)
* wss: secure websocket (port 443)

### -l / --log
- default value `info`

log level 

* `all` : log everything
* `trace`
* `debug`
* `fine` 
* `warn` errors that could happen in normal network and can be handled, for example, network disconnection, or DDOS attack
* `info` default log level, usually for things like dslink start, stop
* `error` an error that's not supposed to happen, something in the network is not configured correctly
* `admin` admin changes like add/remove devices, users
* `fatal` fatal error that the system can not handle, dslink is forced to stop
* `none` : log nothing

### -n / --name
- default value is defined in code

override dslink name

this override the dslink's name and dsid prefix

### -t / --token

a token for the connection handshake

## arguments that only work in C++ sdk

### --thread
- default value `1`
number of threads
