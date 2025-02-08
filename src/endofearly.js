//@ts-self-types="../type/endofearly.d.ts"
import { ContentType, HandshakeType } from "./deps.ts";

export class EndOfEarlyData extends Uint8Array {
   static from(...args){ new EndOfEarlyData(...args)}
   constructor(...args) {
      args = (args.at(0) instanceof Uint8Array) ? sanitize(...args) : args
      super(...args)
   }
}

function sanitize(...args) {
   try {
      if (args[0].length == 0) return args
      throw Error
   } catch (_error) {
      try {
         const handshakeType = HandshakeType.from(args[0]);
         const lengthOf = Uint24.from(args[0].subarray(1)).value;
         const conditions = [
            handshakeType == HandshakeType.END_OF_EARLY_DATA,
            lengthOf == 0
         ]
         if (conditions.every(c => c === true)) return [args[0].subarray(4, 4 + lengthOf)]
         throw Error
      } catch (_error) {
         try {
            const contentType = ContentType.from(args[0]);
            const handshakeType = HandshakeType.from(args[0].subarray(5));
            const lengthOf = Uint24.from(args[0].subarray(6)).value;
            const conditions = [
               contentType == ContentType.HANDSHAKE,
               handshakeType == HandshakeType.END_OF_EARLY_DATA,
               lengthOf == 0
            ]
            if (conditions.every(c => c === true)) return [args[0].subarray(9, 9 + lengthOf)]
            throw Error
         } catch (error) {
            throw error;
         }
      }
   }
}

