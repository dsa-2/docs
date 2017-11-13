## home
folders for dslinks and users, may contain alias nodes to downstream/upstream or user defined data nodes

#### default
default home folder for any user/dslink that doesn't have pre-defined home folder


## ~
an alias for the current user/dslink's home folder

if no home folder is defined, it will point home/default

## modules
modules running inside broker ( same process), mananging users, dglux, security setting, etc. each module expose a dslink responder for configuration

module nodes always require config permisison

## downstream
downstream dslinks/brokers

## upstream
up stream brokers

## pub

a folder for public data

always require list permission

#### dsa
a folder for all dsa predefined class definition, available in all brokers, not required for links

#### alias 
when upstream/downstream child node is alias, but its pub folder is not exposed, the pub folder will aliased here for public access

#### icon
icon data for this dslink


## sys
system nodes, always require config permission

#### config
config nodes for the broker

