import { HandshakeType, TLSPlaintext, ClientHello, ServerHello } from "../src/deps.ts";
/**
 * Represents a TLS 1.3 Handshake message.
 * Extends `Uint8Array` to store the raw handshake message data.
 */
export class Handshake extends Uint8Array {
   /** The handshake message type. */
   msg_type: HandshakeType;

   /** The handshake message payload. */
   message: Uint8Array;

   /**
    * Creates a `Handshake` instance from a given message type and message data.
    *
    * @param {HandshakeType} msg_type - The handshake message type.
    * @param {Uint8Array} message - The handshake message payload.
    * @returns {Handshake} A new `Handshake` instance.
    */
   static fromMessage(msg_type: HandshakeType, message: Uint8Array): Handshake;

   /**
    * Parses a `Handshake` message from a `Uint8Array`.
    *
    * @param {Uint8Array} array - The raw handshake message data.
    * @returns {Handshake} A new `Handshake` instance.
    */
   static from(array: Uint8Array): Handshake;

   /**
    * Constructs a new `Handshake` instance.
    *
    * @param {HandshakeType} msg_type - The handshake message type.
    * @param {Uint8Array} message - The handshake message payload.
    */
   constructor(msg_type: HandshakeType, message: Uint8Array);

   /**
    * Returns the byte representation of the `Handshake` message.
    */
   get byte(): Uint8Array;

   /**
    * Returns a `TLSPlaintext` record containing this handshake message.
    */
   get record(): TLSPlaintext;

   /**
    * Alias for `record`, returning a `TLSPlaintext` record.
    */
   get tlsPlainText(): TLSPlaintext;

   /**
    * Parses the handshake message and assigns the appropriate class.
    */
   private parseMsg(): void;

   /** Stores parsed handshake message data (e.g., `ClientHello`, `ServerHello`). */
   handshake?: ClientHello | ServerHello;

   /** Internal items structure. */
   private items: [Uint8Array];
}
