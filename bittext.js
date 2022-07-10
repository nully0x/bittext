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
    }
}

(async()=>{
    if(esMain(import.meta)){
        let bitText = new BitText();
    }
})()
