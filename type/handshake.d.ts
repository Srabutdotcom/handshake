import { HandshakeType, NamedGroup } from "../src/deps.ts";
/**
 * Represents a TLS 1.3 Handshake message.
 * Extends `Uint8Array` to store the raw handshake message data.
 */
export declare class Handshake extends Uint8Array {
  #type: HandshakeType;
  #lengthOf: number;
  #message: Uint8Array;

  /**
   * Create Handshake of ServerHello
   * @param serverHello
   */
  static fromServerHello(serverHello: Uint8Array): Handshake;
  /**
   * Create Handshake of ClientHello
   * @param clientHello
   */
  static fromClientHello(clientHello: Uint8Array): Handshake;
  /**
   * Creates a Handshake message from an Encrypted Extensions message.
   * @param encryptedExtension - The Encrypted Extensions message as a Uint8Array.
   * @returns A Handshake instance.
   */
  static fromEncryptedExtension(encryptedExtension: Uint8Array): Handshake;

  /**
   * Creates a Handshake message from a Certificate message.
   * @param certificate - The Certificate message as a Uint8Array.
   * @returns A Handshake instance.
   */
  static fromCertificate(certificate: Uint8Array): Handshake;

  /**
   * Creates a Handshake message from a Certificate Verify message.
   * @param certificateVerify - The Certificate Verify message as a Uint8Array.
   * @returns A Handshake instance.
   */
  static fromCertificateVerify(certificateVerify: Uint8Array): Handshake;

  /**
   * Creates a Handshake message from a Finished message.
   * @param finish - The Finished message as a Uint8Array.
   * @returns A Handshake instance.
   */
  static fromFinished(finish: Uint8Array): Handshake;
  /**
   * Create Handshake of EndOfEarly
   */
  static fromEndOfEarly(): Handshake;
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
  set groups(groups: Map<NamedGroup, NamedGroup>);
  get groups(): Map<NamedGroup, NamedGroup>;
}
