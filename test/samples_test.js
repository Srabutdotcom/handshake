import { Byte } from "../src/deps.ts";
import { EndOfEarlyData } from "../src/endofearly.js";
import { Handshake } from "../src/handshake.js";

const serverHelloRecord = Uint8Array.of(22,3,3,0,90,2,0,0,86,3,3,179,62,57,238,80,14,210,208,52,84,223,125,29,128,32,30,238,17,99,136,64,159,171,216,79,96,205,59,89,59,174,214,0,19,1,0,0,46,0,51,0,36,0,29,0,32,16,204,138,97,155,54,5,14,76,65,240,245,176,119,164,1,18,7,179,126,168,110,25,164,247,40,242,145,236,185,250,21,0,43,0,2,3,4);

const handshakeBack =new Handshake(serverHelloRecord.subarray(5))
console.log(handshakeBack.type);
console.log(handshakeBack.lengthOf);
console.log(handshakeBack.message);
console.log(Handshake.fromServerHello(handshakeBack.message))

const newSessionTicket = Byte.fromHex(
   `04 00 00 c9 00 00 00 1e fa d6 aa
   c5 02 00 00 00 b2 2c 03 5d 82 93 59 ee 5f f7 af 4e c9 00 00 00
   00 26 2a 64 94 dc 48 6d 2c 8a 34 cb 33 fa 90 bf 1b 00 70 ad 3c
   49 88 83 c9 36 7c 09 a2 be 78 5a bc 55 cd 22 60 97 a3 a9 82 11
   72 83 f8 2a 03 a1 43 ef d3 ff 5d d3 6d 64 e8 61 be 7f d6 1d 28
   27 db 27 9c ce 14 50 77 d4 54 a3 66 4d 4e 6d a4 d2 9e e0 37 25
   a6 a4 da fc d0 fc 67 d2 ae a7 05 29 51 3e 3d a2 67 7f a5 90 6c
   5b 3f 7d 8f 92 f2 28 bd a4 0d da 72 14 70 f9 fb f2 97 b5 ae a6
   17 64 6f ac 5c 03 27 2e 97 07 27 c6 21 a7 91 41 ef 5f 7d e6 50
   5e 5b fb c3 88 e9 33 43 69 40 93 93 4a e4 d3 57 00 08 00 2a 00
   04 00 00 04 00`
)

const newSessionTicket_back = Handshake.from(newSessionTicket);

const test = new EndOfEarlyData;

