export function setItem(key:string,value:string){
  try{
    window.localStorage.setItem(key,value);
  }
  catch (error){
    console.log("Set Local Storage Fail",error);
  }
}

export function getItem(key:string){
  try{
    const item = window.localStorage.getItem(key);
    return item ? item : undefined;
  }
  catch (error){
    console.log("Get Local Storage Fail",error);
    return undefined;
  }
}