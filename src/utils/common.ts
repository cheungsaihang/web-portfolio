export function isStringNumber(number:string | null):number is string{
  if(number && typeof number === 'string'){
    const pattern = /[^0-9]/;
    return !pattern.test(number);
  }
  return false;
}

export function isServer(){
  return typeof window === 'undefined';
}