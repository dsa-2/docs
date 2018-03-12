## Home
folders for dslinks and users, may contain alias nodes to downstream/upstream or user defined data nodes

#### Default
default home folder for any user/dslink that doesn't have pre-defined home folder

#### Services
a folder for all alias action from dslink, that can create device connections, storage, control logic. service action should always return the path of new node, and broker will automaticly alias it to the creator's home folder

services folder is only availible to user/dslink with its own home folder, default home folder can only be modified when requester has global config permission

## ~
an alias for the current user/dslink's home folder

if no home folder is defined, it will point home/default

## Downstream
downstream dslinks/brokers

## Upstream
up stream brokers

## Pub

a folder for public data

always require list permission

#### 2.0 (dsa standard folders)
any folder start with a number are reserved for dsa predefined class definition. starts from the folder `2.0`, which contains all the standard profile nodes for version 2.0

#### Alias 
when upstream/downstream child node is alias, but its pub folder is not exposed, the pub folder will aliased here for public access

#### Icon
icon data for this dslink


## Sys
system nodes, always require config permission

#### Config
config nodes for the broker

#### Clients
manage [downstream dslinks and brokers](edge-broker/clients.md)

#### Upstream
manager upstream brokers

#### Permissions
[permissions](edge-broker/permissions.md) settings

#### Quaratine
protected area for quarantined dslinks

#### Tokens
[tokens](edge-broker/tokens.md) to connect downstream clients
