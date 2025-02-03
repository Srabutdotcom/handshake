import { Handshake } from "../src/handshake.js";
import { TLSPlaintext } from "../src/deps.ts";
/**
 * Represents the TLS 1.3 `EndOfEarlyData` handshake message.
 * This message is sent by the client to indicate the end of early data.
 */
export class EndOfEarlyData extends Uint8Array {
   /**
    * Creates an `EndOfEarlyData` instance from a handshake message.
    *
    * @param {Uint8Array} array - The raw handshake message data.
    * @returns {EndOfEarlyData | TypeError} An instance of `EndOfEarlyData` or an error if the message type is incorrect.
    */
   static fromHandshake(array: Uint8Array): EndOfEarlyData | TypeError;

   /**
    * Constructs a new `EndOfEarlyData` instance.
    */
   constructor();

   /**
    * Returns a `Handshake` object representing the `EndOfEarlyData` handshake message.
    */
   get handshake(): Handshake;

   /**
    * Returns a `TLSPlaintext` record containing this `EndOfEarlyData` handshake message.
    */
   get record(): TLSPlaintext;
}
