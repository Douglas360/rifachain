//import Web3 from "web3";

import {
  MATIC_CHAIN_ID_TESTNET,
  MATIC_CHAIN_NAME_TESTNET,
  MATIC_RPC_URL_TESTNET,
  MATIC_BLOCK_EXPLORER_URL_TESTNET,
} from "./constants";
import { setGlobalState, setAlert } from "./store";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const { ethereum } = window;

const initializeConnectedAccount = () => {
  const connectedAccount = localStorage.getItem("connectedAccount");
  if (connectedAccount) {
    setGlobalState("connectedAccount", connectedAccount);
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError("Instalar Metamask.");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());

    if (ethereum.chainId !== MATIC_CHAIN_ID_TESTNET) {
      //Se a rede não for a esperada, solicita a troca
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: MATIC_CHAIN_ID_TESTNET, // ID da rede Polygon
            chainName: MATIC_CHAIN_NAME_TESTNET,
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: [MATIC_RPC_URL_TESTNET],
            blockExplorerUrls: [MATIC_BLOCK_EXPLORER_URL_TESTNET],
          },
        ],
      });
    }

    setGlobalState("connectedChain", ethereum.chainId);
    localStorage.setItem("connectedAccount", accounts[0].toLowerCase());
    localStorage.setItem("connectedChain", ethereum.chainId);
  } catch (error: any) {
    console.log(error);
  }
};

const isWalletConnected = async () => {
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    ethereum.on("chainChanged", (chainId: string) => {
      window.location.reload();
      setGlobalState("connectedChain", chainId);
      localStorage.setItem("connectedChain", chainId);
    });

    ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      localStorage.setItem("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      setGlobalState("connectedAccount", "");
      localStorage.removeItem("connectedAccount");
    }
  } catch (error: any) {
    console.log(error);
  }
};

const reportError = (error: string) => {
  setAlert(JSON.stringify(error), "red");
};

export { initializeConnectedAccount, connectWallet, isWalletConnected };
