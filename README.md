# Bittext
Use Bitcoin over SMS - Bitcoin Core - Core Lightning - Twilio

# What is Bittext?
Bittext is an interface between sms services and a bitcoin core node.
This service utilizes the Twilio API, Bitcoin Core, and Core Lightning.

There are 3 primary layers this service is built on
- Bitcoin Core Node
- Core Lightning Node
- Twillio

# What Hardware is Bittex Designed For?
Bittext is meant to be installed onto a Raspberry Pi 4 (2/4/8 GB) running Bitcoin Core. 
To run bittext the first step is to run

```
git clone https://github.com/russeree/bittext
cd bittext
docker build -t bittext .
```
