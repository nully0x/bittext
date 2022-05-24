const fs    = require('fs');
const net   = require('net');
const path  = require('path');
const lnrpc = net.createConnection(resolveHome("~/.lightning/bitcoin/lightning-rpc"));

//Create to the lightning-cli rpc
lnrpc.on("connect", async()=>{
    console.log("Connection to Core Lightning established.");
    console.log(await rpc_getinfo(lnrpc));
});

/**
 *Function to hook and get clighting info
 *@return{Object} A json object containing the current clightning version
 */
let rpc_getinfo = async(lnrpc)=>{
    await lnrpc.write(`{
            "id": "0",
            "method": "getinfo",
            "params": {}
        }`,async()=>{await lnrpc.on('data',function(data){
                return(data.toString());
            });
        }
    );
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
