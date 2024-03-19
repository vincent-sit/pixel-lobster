import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { installApp } from './install';

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

const { App } = installApp();

const router = createHashRouter([
    {
        path: '/',
        element: (
            <>
                <GlobalStyle />
                <App />
            </>
        ),
    },
]);

const root = createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router} />);
