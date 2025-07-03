export function pipe<I, A>(
  stepA: (val: I) => Promise<A>, 
): (val:I) => Promise<A>;

export function pipe<I, A, B>(
  stepA: (val: I) => Promise<A>, 
  stepB: (val: A) => Promise<B>
): (val:I) => Promise<B>;

export function pipe<I, A, B, C>(
  stepA: (val: I) => Promise<A>, 
  stepB: (val: A) => Promise<B>,
  stepC: (val: B) => Promise<C>
): (val:I) =>  Promise<C>;

export function pipe<I, A, B, C, D>(
  stepA: (val: I) => Promise<A>, 
  stepB: (val: A) => Promise<B>,
  stepC: (val: B) => Promise<C>,
  stepD: (val: C) => Promise<D>
): (val:I) =>  Promise<D>;

export function pipe(...steps: Function[]) {
  return async <I>(val:I) => {
    if(steps.length > 4){
      throw Error("pipe accepts maximum 4 steps only", { cause : "develop"} );
    }
    await steps.reduce(async (acc, fn) => await fn(acc), Promise.resolve(val));
  }
}
