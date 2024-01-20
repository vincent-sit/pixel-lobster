import * as React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { ToolBar } from './components/tool-bar/tool-bar';
import { Display } from './components/display/display';
import { ColorProvider } from './contexts/color-context';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;    
  height: 100%;  
`;

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
            <ColorProvider>
                <Layout>
                    {/* <CommandPanel/>
                    <ColorPicker/> */}
                    <ToolBar/>
                    <Display/>                
                </Layout>
            </ColorProvider>
        </>
    );
} 

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);
