import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./walletConnect.css";

const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111

export const Wallnetbtn = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMetaMask =
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask === true &&
        !window.rabby;
      setIsMetaMaskInstalled(isMetaMask);
    }
  }, []);

  useEffect(() => {
    if (window.ethereum && isMetaMaskInstalled) {
      setChainId(window.ethereum.chainId);
      const handleChainChanged = (_chainId) => {
        setChainId(_chainId);
      };
      window.ethereum.on("chainChanged", handleChainChanged);
      const handleAccountsChanged = (accounts) => {
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, [isMetaMaskInstalled]);

  const connectMetaMask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask && !window.rabby) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setError("");
        setChainId(window.ethereum.chainId);
      } catch (err) {
        setError("Connection to MetaMask was rejected");
      }
    } else {
      setError("MetaMask is not installed");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setError("");
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
      setError("");
    } catch (err) {
      setError("Failed to switch network");
    }
  };

  if (isMetaMaskInstalled === null) {
    return null; // loading
  }

  return (
    <div className="wc-container ms-lg-5">
      {account ? (
        chainId === SEPOLIA_CHAIN_ID ? (
          <Button
            variant="danger"
            className="btn-danger wc-btn d-none d-lg-inline-block"
            onClick={switchToSepolia}
          >
            Wrong network. Switch to Ethereum Mainnet
          </Button>
        ) : (
          <div className="wc-account-row">
            <div className="wc-account">
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
            <Button
              variant="outline-secondary"
              size="sm"
              className="tabButton colortabBtn"
              onClick={disconnectWallet}
            >
              Disconnect
            </Button>
          </div>
        )
      ) : isMetaMaskInstalled ? (
        <Button
          variant="primary"
          className="tabButton colortabBtn"
          onClick={connectMetaMask}
        >
          Connect MetaMask
        </Button>
      ) : (
        <Button
          variant="warning"
          className="tabButton colortabBtn"
          onClick={() =>
            window.open("https://metamask.io/download.html", "_blank")
          }
        >
          Install MetaMask
        </Button>
      )}
      {error && <div className="wc-error">{error}</div>}
    </div>
  );
};


