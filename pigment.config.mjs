import { extendTheme } from '@pigment-css/nextjs-plugin';

const pigmentConfig = {
  theme: extendTheme({
    colorSchemes:{
      light:{},
      dark:{
        colors:{
          background:'#292929',
          foreground:'#ffffff',
          breadcrumb:'#cccccc',
          journeySection:'#494949'
        }
      }
    },
    colors:{
      background:'#fcfcfc',
      foreground:'#333333',
      menuBackground:'#003153',
      layoutBorder:'#cccccc',
      icon:'#aaaaaa',
      breadcrumb:'#eeeeee',
      breadcrumbText:'#555555',
      skeleton:'#eeeeee',
      journeySection:'#f1f1f1',
      drawerLink:'#cccccc'
    },
    sizes:{
      fonts:{
        icon:'2.4rem',
        gridTitle:'1.4rem',
      },
      spacing:{
        mainInner:'10px',
      }
    },
    media:{
      screenXS:'600px',
      screenS:'900px',
      screenM:'1024px',
      screenL:'1200px'
    },
    getSelector: (colorScheme) => (colorScheme && colorScheme == 'dark') ? `.theme-${colorScheme}` : ':root',
  }),
};

export default pigmentConfig;

// screenXXS:'320px',
// screenXS:'480px',
// screenS:'600px',
// screenM:'768px',
// screenL:'900px',
// screenXL:'1024px',
// screenXLL:'1200px'