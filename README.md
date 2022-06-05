# Bittext
Use bitcoin over sms - Bitcoin core - Twilio

# What is Bittext?
Bittext is an interface between bitcoin sms service and the bitcoin core node.
This service utilizes the Twilio API and Bitcoin core.

There are 3 primary layers this service is built on 
- Docker Container
- Bitcoin Core Node
- Core Lightning Node
- Twillio
- Bitcoin

The first layer is the bitcoin-core json rpc. This is the pipe for intraprocess communications
between bitcoin core and the various interfacing and security layers.
