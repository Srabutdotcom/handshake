//@ts-self-types="../type/endofearly.d.ts"

export class EndOfEarlyData extends Uint8Array {
   static from(...args){ new EndOfEarlyData(...args)}
   constructor(...args) {
      sanitize(args)
      super(...args)
   }
}

function sanitize(...args) {
   const a0 = args[0]
   if(!(a0 instanceof Uint8Array)) return;
   args[0] = new Uint8Array();
   return
}

