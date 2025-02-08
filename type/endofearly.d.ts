/**
 * Represents the TLS 1.3 `EndOfEarlyData` handshake message.
 * This message is sent by the client to indicate the end of early data.
 */
export declare class EndOfEarlyData extends Uint8Array {
  /**
   * Creates an instance of EndOfEarlyData from the given arguments.
   * @param {...(number | Uint8Array)[]} args - Arguments to pass to the constructor.
   * @returns {EndOfEarlyData} A new instance of EndOfEarlyData.
   */
  static from(...args: any[]): EndOfEarlyData;

  /**
   * Constructs an EndOfEarlyData instance.
   * If the first argument is a Uint8Array, it applies `sanitize`.
   * @param {...any[]} args - Arguments to initialize the Uint8Array.
   */
  constructor(...args: any[]);
}
