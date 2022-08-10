# syntax=docker/dockerfile:1
FROM ubuntu:20.04
RUN echo 'Bittext 0.1.1 - Docker'
WORKDIR bittext
#Build Args
ARG threads=88\
    git_dir="/root/git/"\
    node_git_url="https://github.com/nodejs/node.git"\
    node_checkout_v="v18.4.0"\
    cln_git_url="https://github.com/ElementsProject/lightning.git"\
    cln_checkout_v="v0.11.1"
#Build the enviorment
RUN apt-get update\
    && DEBIAN_FRONTEND=noninteractive TZ=US/Pacific apt-get -y install tzdata\
    && apt-get -y install git build-essential python3 python3-pip
#Build NodeJS
WORKDIR ${git_dir}
RUN git clone $node_git_url\
    && cd node\
    && git checkout $node_checkout_v\
    && ./configure\
    && make -j $threads\
    && make install
#Build Core Lightning
WORKDIR ${git_dir}
RUN apt-get -y install autoconf automake build-essential git libtool libgmp-dev libsqlite3-dev \
    python3 python3-pip net-tools zlib1g-dev libsodium-dev gettext\
    && git clone $cln_git_url\
    && cd lightning\
    && git checkout $cln_checkout_v\
    && pip3 install --upgrade pip\
    && pip3 install mako mistune==0.8.4 mrkd\
    && ./configure\
    && make -j $threads\
    && make install\
