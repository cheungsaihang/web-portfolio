if(window && document.documentElement){
  try{
    const t = window.localStorage.getItem('theme');
    if(typeof t === 'string'){
      document.documentElement.className= 'theme-' + t;
    }
  }catch(e){
    console.warn('Fail to read theme from localStorage',e)
  }
}