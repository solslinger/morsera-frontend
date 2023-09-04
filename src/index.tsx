import React from 'react'
import ReactDOM from 'react-dom/client'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { SafeThemeProvider } from '@safe-global/safe-react-components'

import { WagmiConfig, createConfig, configureChains, Connector } from 'wagmi';
import { mainnet, goerli, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { SafeConnector } from 'wagmi/connectors/safe';
import { InjectedConnector } from 'wagmi/connectors/injected';

import "./index.css";

import App from './App'
import SafeProvider from '@safe-global/safe-apps-react-sdk';
import { GlobalStateProvider } from './components/GlobalState';

const defaultChains = [mainnet, goerli, polygon];

const { chains, publicClient } = configureChains(defaultChains, [publicProvider()]);

let connectors: Connector[] = [
  new SafeConnector({ 
    chains, 
    options: {
      allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
      debug: true,
    },
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected',
      shimDisconnect: true,
    },
  }),
];

const config = createConfig({
  connectors: connectors,
  publicClient,
});

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found on public/index.html')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <SafeThemeProvider mode="dark">
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <WagmiConfig config={config}>
            <SafeProvider>
              <GlobalStateProvider>
                <App />
              </GlobalStateProvider>
            </SafeProvider>
          </WagmiConfig>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  </React.StrictMode>,
)
