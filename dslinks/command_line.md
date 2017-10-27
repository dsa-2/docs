
## command line arguments

dslinks can all be started with command line arguments

### -b / --broker

format:  `-b {protocol}://{host}:{port}`  or `-b {protocol}://{host}`

{protocol} can be:

* ds : dsa tcp connection  (port 4120)
* dss : secure dsa tcp connection (port 4128)
* ws : websocket (port 80)
* wss: secure websocket (port 443)

### -l / --log

log level 

* `all` : log everything
* `trace`
* `debug`
* `info` : default log level
* `warn`
* `error`
* `fatal`
* `none` : log nothing

### -n / --name

override dslink name

this override the dslink's name and dsid prefix
