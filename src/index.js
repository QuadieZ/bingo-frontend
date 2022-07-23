import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as serviceWorker from './serviceWorker';

import { ChakraProvider } from '@chakra-ui/react';
import "@fontsource/quicksand";
import { BrowserRouter } from "react-router-dom";

import { theme } from './theme';

import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);

serviceWorker.register();

