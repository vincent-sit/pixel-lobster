import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ColorProvider } from './contexts/color-context';
import { ColorHistoryProvider } from './contexts/color-history-context';
import { ToolProvider } from './contexts/tool-context';
import { DimensionProvider } from './contexts/dimension-context';
import { DialogProvider } from './contexts/dialog-context';
import { AppBody } from './components/app-body/app-body';
import { installApp } from '././v1/install';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
    font-family: "VT323", monospace;
    font-weight: 400;
    font-style: normal;
    user-select: none;
    -webkit-user-select: none;
  }

  input[type="text"]
  {
    font-family: "VT323", monospace;
    font-weight: 400;
    font-style: normal;
  }

  html {
    height: 100%;
  }

  #root {
    height: 100%;
  }
`;

const { App: AppV1 } = installApp();

function AppMvp() {
    return (
        <>
            <GlobalStyle/>
            <DialogProvider>
                <ColorHistoryProvider>
                    <ColorProvider>
                        <ToolProvider>
                            <DimensionProvider>
                                <AppBody/>
                            </DimensionProvider>
                        </ToolProvider>
                    </ColorProvider>
                </ColorHistoryProvider>
            </DialogProvider>
        </>
    );
}

const router = createHashRouter([
    {
        path: '/',
        element: <AppMvp/>,
    },
    {
        path: '/v1',
        element: <>
            <GlobalStyle/>
            <AppV1/>
        </>,
    },
]);

const root = createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router} />);
