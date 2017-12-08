## manager.json
- read and parse manager.json
- if not exist, create with default parameters

## broker.json
- read and parse broker.json after running broker properly
- if its configuration is in another path, read there (config-path in broker.json)

## dslink
### lcm_dslink.json
{
  "dslink_folder_name_1" : {
    "name" : "dslink_name_1",
    "enabled" : true,
    "log" : "info",
    "server_port": 4222,
    "token" : null
  },
  "dslink_folder_name_2" : {
    "name" : "dslink_name_2",
    "enabled" : true,
    "log" : "debug",
    "server_port": 4223,
    "token" : null
  }
}
    
- read lcm_dslink.json
- scan folders matching with "dslink_folder_name_X"

### installing new dslink
- read dslink's default config from its dslink.json
- import these values into lcm_dslink.json
