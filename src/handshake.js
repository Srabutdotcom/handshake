//@ts-self-types="../type/handshake.d.ts"
import {
   HandshakeType, Uint24,
   ClientHello, ServerHello,
   ContentType,
   Uint16,
   unity,
   EncryptedExtensions,
   Certificate,
   CertificateVerify,
   Finished
} from "./deps.ts";
import { EndOfEarlyData } from "./endofearly.js";

export class Handshake extends Uint8Array {
   #type
   #lengthOf
   #message
   #groups
   static fromClientHello(clientHello) {
      const lengthOf = Uint24.fromValue(clientHello.length);
      const type = HandshakeType.CLIENT_HELLO;
      const handshake = Handshake.from(unity(+type, lengthOf, clientHello));
      handshake.groups = clientHello.groups;
      return handshake
   }
   static fromServerHello(serverHello) {
      const lengthOf = Uint24.fromValue(serverHello.length);
      const type = HandshakeType.SERVER_HELLO;
      return Handshake.from(unity(+type, lengthOf, serverHello))
   }
   static fromEncryptedExtension(encryptedExtension) {
      const lengthOf = Uint24.fromValue(encryptedExtension.length);
      const type = HandshakeType.ENCRYPTED_EXTENSIONS;
      return Handshake.from(unity(+type, lengthOf, encryptedExtension))
   }
   static fromCertificate(certificate){
      const lengthOf = Uint24.fromValue(certificate.length);
      const type = HandshakeType.CERTIFICATE;
      return Handshake.from(unity(+type, lengthOf, certificate))   
   }
   static fromCertificateVerify(certificateVerify){
      const lengthOf = Uint24.fromValue(certificateVerify.length);
      const type = HandshakeType.CERTIFICATE_VERIFY;
      return Handshake.from(unity(+type, lengthOf, certificateVerify))      
   }
   static fromFinished(finish){
      const lengthOf = Uint24.fromValue(finish.length);
      const type = HandshakeType.FINISHED;
      return Handshake.from(unity(+type, lengthOf, finish))      
   }
   static fromNewSessionTicket(newSessionTicket){
      const lengthOf = Uint24.fromValue(newSessionTicket.length);
      const type = HandshakeType.NEW_SESSION_TICKET;
      return Handshake.from(unity(+type, lengthOf, newSessionTicket))     
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
   set groups(groups){ this.#groups = groups }
   get groups(){ return this.#groups }
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