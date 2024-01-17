import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { ColorProvider } from './contexts/color-context';
import { IsPointerDownProvider } from './contexts/is-pointer-down-context';
import { AppBody } from './components/app-body/app-body';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
  }

  html {
    height: 100%;
  }

  #root {
    height: 100%;
  }
`;

function App() {    
    return (
        <>            
            <GlobalStyle/>
            <IsPointerDownProvider>
                <ColorProvider>
                    <AppBody></AppBody>
                </ColorProvider>                            
            </IsPointerDownProvider>
        </>
    );
} 

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);
