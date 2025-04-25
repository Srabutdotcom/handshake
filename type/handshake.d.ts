import { Certificate, CertificateVerify, ClientHello, EncryptedExtensions, Finished, HandshakeType, NamedGroup, NewSessionTicket, ServerHello } from "../src/deps.ts";
import { EndOfEarlyData } from "../src/endofearly.js"
/**
 * Represents a TLS 1.3 Handshake message.
 * Extends `Uint8Array` to store the raw handshake message data.
 * @version 0.1.8
 */
export class Handshake extends Uint8Array {
  static from(...args: ConstructorParameters<typeof Uint8Array>): Handshake;

  static fromClientHello(clientHello: ClientHello): Handshake;
  static fromServerHello(serverHello: ServerHello): Handshake;
  static fromEncryptedExtension(encryptedExtension: EncryptedExtensions): Handshake;
  static fromCertificate(certificate: Certificate): Handshake;
  static fromCertificateVerify(certificateVerify: CertificateVerify): Handshake;
  static fromFinished(finished: Finished): Handshake;
  static fromNewSessionTicket(newSessionTicket: NewSessionTicket): Handshake;
  static fromEndOfEarly(): Handshake;

  constructor(...args: ConstructorParameters<typeof Uint8Array>);

  get type(): HandshakeType;
  get lengthOf(): number;
  get message():
    | ClientHello
    | ServerHello
    | EncryptedExtensions
    | Certificate
    | CertificateVerify
    | Finished
    | EndOfEarlyData
    | NewSessionTicket
    | Uint8Array;

  set groups(groups: NamedGroup);
  get groups(): NamedGroup;
}