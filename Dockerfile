# syntax=docker/dockerfile:1
FROM ubuntu:20.04
RUN echo 'Bittext 0.1.1 - Docker'
RUN apt-get update
RUN apt-get -y install git build-essential python3 python3-pip
RUN mkdir git
RUN cd git;\
    git clone https://github.com/nodejs/node.git;\
    cd node;\
    git checkout v18.4.0;\
    ./configure;\
    make;\
    make install;\



