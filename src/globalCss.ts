import '@pigment-css/react/styles.css';
import { globalCss } from '@pigment-css/react';

globalCss`
  html {
    font-size:10px;
  }
  @media (max-width: 600px) {
    html {
      font-size:11px;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration:none;
  }
  ol, ul {
    list-style-type:none;
    list-style-position:inside;
    padding-inline-start:0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin-block-end:0;
    margin-block-start:0;
  }  
`;
