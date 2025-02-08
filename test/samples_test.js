import { EndOfEarlyData } from "../src/endofearly.js";
import { Handshake } from "../src/handshake.js";

const serverHelloRecord = Uint8Array.of(22,3,3,0,90,2,0,0,86,3,3,179,62,57,238,80,14,210,208,52,84,223,125,29,128,32,30,238,17,99,136,64,159,171,216,79,96,205,59,89,59,174,214,0,19,1,0,0,46,0,51,0,36,0,29,0,32,16,204,138,97,155,54,5,14,76,65,240,245,176,119,164,1,18,7,179,126,168,110,25,164,247,40,242,145,236,185,250,21,0,43,0,2,3,4);

const handshakeBack =new Handshake(serverHelloRecord)
console.log(handshakeBack.type);
console.log(handshakeBack.lengthOf);
console.log(handshakeBack.message);


const test = new EndOfEarlyData;

