//@ts-self-types="../type/handshake.d.ts"
import { Struct, HandshakeType, Uint24, 
   ClientHello, ServerHello, 
   TLSPlaintext,
   ContentType,
   Version} from "./deps.ts";

export class Handshake extends Uint8Array {
   msg_type
   message
   static fromMessage(msg_type, message) {
      return new Handshake(msg_type, message)
   }
   static from(array) {
      const copy = Uint8Array.from(array)
      const msg_type = HandshakeType.fromValue(copy[0]);
      const lengthOf = Uint24.from(copy.subarray(1)).value;
      const message = copy.subarray(4, 4 + lengthOf)
      return new Handshake(msg_type, message)
   }
   constructor(msg_type, message) {
      const struct = new Struct(msg_type.Uint8, Uint24.fromValue(message.length), message)
      super(struct)
      this.msg_type = msg_type;
      this.message = message
      this.items = struct.items
      this.parse()
   }
   get byte() { return Uint8Array.from(this) }

   get record(){
      return new TLSPlaintext(ContentType.HANDSHAKE, Version.legacy, this)
   }

   get tlsPlainText(){ return this.record }

   parse(){
      switch (this.msg_type) {
         case HandshakeType.CLIENT_HELLO: {
            this.message = ClientHello.from(this.message);
            break;
         }
         case HandshakeType.SERVER_HELLO: {
            this.message = ServerHello.from(this.message);
            break;
         }
         default:
            break;
      }
   }
}