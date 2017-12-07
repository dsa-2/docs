
- lifecycle manager starts
- open a port and listen as dsa server
- read the broker.json
- check broker and dslink folders and generate private keys for them when needed
- start broker
- start dslinks, and calculate their dsId from the private keys
- listen on broker's /downstream, also listen on all children nodes of /downstream
- waiting for nodes with $$dsId and then update the status of dslinks
- when link is disconnected, the list response of /downstream/link-name should have a status 0E (Not available)
