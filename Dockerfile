# syntax=docker/dockerfile:1
FROM ubuntu:20.04
RUN echo 'Bittext 0.1.1 - Docker'
RUN apt-get update;\
    apt-get -y install git build-essential python3 python3-pip sqlite3 &&\
    mkdir git &&\
    cd git &&\
    git clone https://github.com/nodejs/node.git &&\
    cd node &&\
    git checkout v18.4.0 &&\
    ./configure &&\
    make -j4 &&\
    make install &&\
    cd &&\
    cd git &&\
    git clone https://github.com/ElementsProject/lightning.git &&\
    cd lightning &&\
    git checkout v0.11.1 &&\
    ./configure &&\
    make -j4
