export default function compose<A,B,C>(
  fnB:(b:B) => C,
  fnA:(a:A) => B,
){
  return (a:A) => fnB(fnA(a));
}

export function asyncCompose<A,B,C>(
  fnB: (b:Awaited<B>) => Promise<C>,
  fnA: (a:A) => Promise<B>,
){
  return async (a:A) => {
    const b = await fnA(a);
    return await fnB(b);
  }
}

