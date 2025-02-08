import {
  HandshakeType,
} from "../src/deps.ts";
/**
 * Represents a TLS 1.3 Handshake message.
 * Extends `Uint8Array` to store the raw handshake message data.
 */
export declare class Handshake extends Uint8Array {
  #type: HandshakeType;
  #lengthOf: number;
  #message: Uint8Array;

  /**
   * Creates an instance of Handshake from the given arguments.
   * @param {...any[]} args - Arguments to pass to the constructor.
   * @returns {Handshake} A new instance of Handshake.
   */
  static from(...args: any[]): Handshake;

  /**
   * Constructs a Handshake instance.
   * If the first argument is a Uint8Array, it applies `sanitize`.
   * @param {...any[]} args - Arguments to initialize the Uint8Array.
   */
  constructor(...args: any[]);

  /**
   * Gets the handshake type.
   * @returns {HandshakeType} The handshake type.
   */
  get type(): HandshakeType;

  /**
   * Gets the length of the handshake message.
   * @returns {number} The length of the handshake message.
   */
  get lengthOf(): number;

  /**
   * Gets the handshake message content.
   * @returns {Uint8Array} The parsed handshake message.
   */
  get message(): Uint8Array;
}
