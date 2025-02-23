//@ts-self-types="../type/handshake.d.ts"
import {
   HandshakeType, Uint24,
   ClientHello, ServerHello,
   ContentType,
   Uint16,
   safeuint8array,
   EncryptedExtensions,
   Certificate,
   CertificateVerify,
   Finished
} from "./deps.ts";
import { EndOfEarlyData } from "./endofearly.js";

//TODO - listed below 
/* 
HandshakeType.NEW_SESSION_TICKET
HandshakeType.CERTIFICATE_REQUEST
HandshakeType.KEY_UPDATE
HandshakeType.MESSAGE_HASH
HandshakeType.SERVER_PARAMETERS 
*/


/* export class Handshake extends Uint8Array {
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

   get record() {
      return new TLSPlaintext(ContentType.HANDSHAKE, Version.legacy, this)
   }

   get tlsPlainText() { return this.record }

   parse() {
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
} */

export class Handshake extends Uint8Array {
   #type
   #lengthOf
   #message
   static fromClientHello(clientHello) {
      const lengthOf = Uint24.fromValue(clientHello.length);
      const type = HandshakeType.CLIENT_HELLO;
      return Handshake.from(safeuint8array(+type, lengthOf, clientHello))
   }
   static fromServerHello(serverHello) {
      const lengthOf = Uint24.fromValue(serverHello.length);
      const type = HandshakeType.SERVER_HELLO;
      return Handshake.from(safeuint8array(+type, lengthOf, serverHello))
   }
   static fromEncryptedExtension(encryptedExtension) {
      const lengthOf = Uint24.fromValue(encryptedExtension.length);
      const type = HandshakeType.ENCRYPTED_EXTENSIONS;
      return Handshake.from(safeuint8array(+type, lengthOf, encryptedExtension))
   }
   static fromCertificate(certificate){
      const lengthOf = Uint24.fromValue(certificate.length);
      const type = HandshakeType.CERTIFICATE;
      return Handshake.from(safeuint8array(+type, lengthOf, certificate))   
   }
   static fromCertificateVerify(certificateVerify){
      const lengthOf = Uint24.fromValue(certificateVerify.length);
      const type = HandshakeType.CERTIFICATE_VERIFY;
      return Handshake.from(safeuint8array(+type, lengthOf, certificateVerify))      
   }
   static fromFinished(finish){
      const lengthOf = Uint24.fromValue(finish.length);
      const type = HandshakeType.FINISHED;
      return Handshake.from(safeuint8array(+type, lengthOf, finish))      
   }
   static fromNewSessionTicket(newSessionTicket){
      const lengthOf = Uint24.fromValue(newSessionTicket.length);
      const type = HandshakeType.NEW_SESSION_TICKET;
      return Handshake.from(safeuint8array(+type, lengthOf, newSessionTicket))     
   }
   static fromEndOfEarly() {
      return Handshake.from(Uint8Array.of(HandshakeType.END_OF_EARLY_DATA, 0, 0, 0))
   }
   static from(...args) { return new Handshake(...args) }
   constructor(...args) {
      args = (args.at(0) instanceof Uint8Array) ? sanitize(...args) : args
      super(...args)
   }
   get type() {
      this.#type ||= HandshakeType.from(this.subarray(0));
      return this.#type
   }
   get lengthOf() {
      this.#lengthOf ||= Uint24.from(this.subarray(1)).value;
      return this.#lengthOf
   }
   get message() {
      if (this.#message) return this.#message;
      const end = 4 + this.lengthOf;
      const array = this.subarray(4, end);
      switch (this.type) {
         case HandshakeType.CLIENT_HELLO: {
            this.#message ||= ClientHello.from(array);
            return this.#message
         }
         case HandshakeType.SERVER_HELLO: {
            this.#message ||= ServerHello.from(array);
            return this.#message
         }
         case HandshakeType.ENCRYPTED_EXTENSIONS: {
            this.#message ||= EncryptedExtensions.from(array);
            return this.#message
         }
         case HandshakeType.CERTIFICATE: {
            this.#message ||= Certificate.from(array);
            return this.#message
         }
         case HandshakeType.CERTIFICATE_VERIFY: {
            this.#message ||= CertificateVerify.from(array);
            return this.#message
         }
         case HandshakeType.FINISHED: {
            this.#message ||= Finished.from(array);
            return this.#message
         }
         case HandshakeType.END_OF_EARLY_DATA: {
            this.#message ||= new EndOfEarlyData;
            return this.#message
         }
         default:
            this.#message ||= array
            return this.#message
      }
   }
}

function sanitize(...args) {
   try {
      if (!(HandshakeType.from(args[0]) instanceof HandshakeType)) throw Error
      const lengthOf = Uint24.from(args[0].subarray(1)).value;
      return [args[0].subarray(0, 4 + lengthOf)]
   } catch (_error) {
      try {
         if (ContentType.from(args[0]) !== ContentType.HANDSHAKE) throw Error;
         const lengthOf = Uint16.from(args[0].subarray(3)).value
         return [args[0].subarray(5, 5 + lengthOf)]
      } catch (error) {
         throw error;
      }
   }
}