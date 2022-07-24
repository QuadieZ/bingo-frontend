import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';
import "@fontsource/quicksand";
import { BrowserRouter } from "react-router-dom";

import { theme } from './theme';

import App from './App';
import { Metatags } from './components/Metatags';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Metatags />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);

