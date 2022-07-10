import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import esMain from 'es-main';
import twilio from 'twilio';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

class BitText{
    constructor(){
        console.log(`Bittext - ${process.env.BITTEXT_VERSION} started.`);
        this.twClient = new twilio(accountSid,authToken);
        this.bittext = express();
        this.#bittextConfig();
    }
    #bittextConfig(){
        console.log("Express Config")
        this.bittext.post('/sms',(req,res)=>{

        });
    }
}

(async()=>{
    if(esMain(import.meta)){
        let bitText = new BitText();
    }
})()
