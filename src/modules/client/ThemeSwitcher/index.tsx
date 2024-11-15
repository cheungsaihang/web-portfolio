import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRound from '@mui/icons-material/NightlightRound';
import { css } from "@pigment-css/react";
import usePersistState from '@/hooks/usePersistState';

const cssIcon = css(({theme}) =>({
  fontSize:`${theme.sizes.fonts.icon} !important`,
  color: theme.colors.icon,
  marginRight:5
}));

type Theme = 'dark' | 'light';

export default function ThemeSwitcher(){
  const [theme, setTheme] = usePersistState<Theme>('theme','light');
  const switchTheme = (theme:Theme) => {
    document.documentElement.className = `theme-${theme}`;
    setTheme(theme);
  }
  return (
    <>
    {
      theme == 'dark' ? (
        <WbSunnyIcon className={cssIcon} onClick={() => switchTheme('light')} /> 
      ) : (
        <NightlightRound className={cssIcon} onClick={() => switchTheme('dark')} />
      )  
    }
    </>
  );
}