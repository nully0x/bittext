const fs    = require('fs');
const net   = require('net');
const path  = require('path');

class CoreLightningRPC {
    /**
     *Create the Core Lightning RPC Object
     */
    constructor(rpcSocket = resolveHome("~/.lightning/bitcoin/lightning-rpc")){
        this.lnrpc = rpcSocket;
    }
    /**
     *Send a request to the Core Lightning RPC Socket and return the result.
     */
    rpcRequest(cmd,params){
        return new Promise((resolve,reject)=>{
            var result = Buffer.alloc(0);
            const lnrpc = net.createConnection(this.lnrpc);
            /**
             *Connect to the core lightning server and write the command(cmd)
             */
            lnrpc.on("connect",()=>{
                console.log("Connection to Core Lightning RPC established.")
                const req = {
                    method: cmd,
                    params: params,
                    id : 0
                }
                lnrpc.write(JSON.stringify(req));
            });
            /**
             *Data respons handling
             */
            lnrpc.on("data", data=>{
                result = Buffer.concat([result, data]);
                if(result.slice(-3).toString() === '}\n\n'){
                    try{
                        const resObj = JSON.parse(result.toString());
                        lnrpc.end()
                        if(resObj.error){
                            reject(resObj.error)
                        }
                        else{
                            resolve(resObj.result)
                        }
                    }
                    catch(err){
                        reject(err)
                    }
                }
            });
            /**
             *lnrpc socket error handling
             */
            lnrpc.on("error", err=>{
                lnrpc.end();
                reject(err);
            });
        });
    }
    /**
     *Core lightning RPC 'getinfo' command
     */
    getInfo(){
        return new Promise((resolve, reject)=>{
            this.rpcRequest('getinfo', {})
            .then(data=>{
                resolve(data)
            })
            .catch(reject)
        });
    }
    /**
     *Core lightning RPC 'newaddr' command
     */
    newAddr(){
        return new Promise((resolve, reject)=>{
            this.rpcRequest('newaddr',{})
            .then(data=>{
                resolve(data)
            })
            .catch(reject)
        });
    }
}

/**
 * @desc: Resolve ~ path to an absolue path
 * @retun{String}: the absolute path to the file
 */
function resolveHome(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}

/**
 *Run as a standalone
 */
if (typeof require !== 'undefined' && require.main === module) {
    let LNRPC = new CoreLightningRPC();
    LNRPC.getInfo()
        .then(res=>{
            console.log(res);
        })
}

module.exports CoreLightningRPC
