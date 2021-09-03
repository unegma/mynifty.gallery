import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.REACT_APP_INFURA_URL as string,
  4: process.env.REACT_APP_INFURA_URL_RINKEBY as string
};

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true
});
