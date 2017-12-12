## manager.json
- read and parse manager.json
- if not exist, create with default parameters

## broker.json
- read and parse broker.json after running broker properly
- if its configuration is in another path, read there (config-path in broker.json)

## dslink
### lcm_dslink.json
```
{
  "dslink_folder_name_1" : {
    "name" : "dslink_name_1",
    "enabled" : true,
    "log" : "info",
    "server_port": 4222,
    "token" : ".token"
  },
  "dslink_folder_name_2" : {
    "name" : "dslink_name_2",
    "enabled" : true,
    "log" : "debug",
    "server_port": 4223
  }
}
``` 
- lcm_dslink.json only holds changed values.
- read lcm_dslink.json
- scan dslink folders

### installing new dslink
- read dslink's dslink.json
- create new dslink_folder_name_X in lcm_dslink.json and set enabled property to true as default.

### starting LCM
* scan dslink folders
* read dslink.json "information" and "configs" parts
* if lcm_dslink.json does not have the dslink, 
  - create as enabled=true
  - run dslink with default parameters
* if lcm_dslink.json has the dslink
  - read related block in lcm_dslink.json
  - override default values from dslink.json
  - if enabled=true, run dslink
