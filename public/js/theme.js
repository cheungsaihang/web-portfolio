if(window && document.documentElement){
  try{
    const t = window.localStorage.getItem('theme');
    if(typeof t === 'string'){
      if(t == 'dark'){
        document.documentElement.classList.add('theme-dark');
      }
      else{
        document.documentElement.classList.remove('theme-dark');
      }
    }
  }catch(e){
    console.warn('Fail to read theme from localStorage',e)
  }
}