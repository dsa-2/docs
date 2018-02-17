## home
folders for dslinks and users, may contain alias nodes to downstream/upstream or user defined data nodes

#### default
default home folder for any user/dslink that doesn't have pre-defined home folder

#### services
a folder for all alias action from dslink, that can create device connections, storage, control logic. service action should always return the path of new node, and broker will automaticly alias it to the creator's home folder

services folder is only availible to user/dslink with its own home folder, default home folder can only be modified when requester has global config permission

## ~
an alias for the current user/dslink's home folder

if no home folder is defined, it will point home/default

## module
modules running inside broker (same process), mananging users, dglux, security setting, etc. each module expose a dslink responder for configuration

module nodes always require config permisison

## downstream
downstream dslinks/brokers

## upstream
up stream brokers

## quaratine
protected area for quarantined dslinks

## pub

a folder for public data

always require list permission

#### 2.0 (dsa standard folders)
any folder start with a number are reserved for dsa predefined class definition. starts from the folder `2.0`, which contains all the standard profile nodes for version 2.0

#### alias 
when upstream/downstream child node is alias, but its pub folder is not exposed, the pub folder will aliased here for public access

#### icon
icon data for this dslink


## sys
system nodes, always require config permission

#### config
config nodes for the broker

