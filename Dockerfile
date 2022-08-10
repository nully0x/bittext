# syntax=docker/dockerfile:1
FROM ubuntu:20.04
RUN echo 'Bittext 0.1.1 - Docker'
WORKDIR bittext
#Build Args
ARG threads=88\
    node_git_url="https://github.com/nodejs/node.git"\
    node_checkout_v="v18.4.0"\
    cln_git_url="https://github.com/ElementsProject/lightning.git"\
    cln_checkout_v="v0.11.1"
#Build the enviorment
RUN apt-get update\
    && apt-get -y install git build-essential python3 python3-pip sqlite3\
    && mkdir git\
    && cd git\
    && git clone $node_git_url\
    && cd node\
    && git checkout $node_checkout_v\
    && ./configure\
    && make -j $threads\
    && make install\
    && cd\
    && cd git\
    && git clone $cln_git_url\
    && cd lightning\
    && git checkout $cln_checkout_v\
    && ./configure\
    && make -j $threads
