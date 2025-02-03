//@ts-self-types="../type/endofearly.d.ts"
import { Handshake } from "./handshake.js";
import { HandshakeType } from "./deps.ts";

export class EndOfEarlyData extends Uint8Array {
   static fromHandshake(array) {
      const type = HandshakeType.fromValue(array.at(0));
      if (type !== HandshakeType.END_OF_EARLY_DATA) return TypeError(`Expected ${HandshakeType.END_OF_EARLY_DATA.name}`)
      return new EndOfEarlyData
   }
   constructor() {
      super()
   }
   get handshake() { 
      return new Handshake(HandshakeType.END_OF_EARLY_DATA, this) 
   }

   get record() {
      return this.handshake.record
   }
}