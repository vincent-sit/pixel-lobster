import * as React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);

function App() {
  return (
    <p>Hello World</p>
  )
} 