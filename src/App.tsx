import React, { useMemo, useState, useEffect } from "react";
import { Mint } from "./Mint";
import { Wallet } from "./Wallet";
import { Toaster } from "react-hot-toast";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import "./App.css";

function App() {
  const [isMainnet, setIsMainnet] = useState(false);
  const network = isMainnet
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(
    () => (isMainnet ? process.env.REACT_APP_MAINNET! : clusterApiUrl(network)),
    [network, isMainnet]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let isMainnetParam = params.get("isMainnet");
    if (isMainnetParam === "true") setIsMainnet(true);
  }, []);

  return (
    <div className="app">
      <div className="join-container">
        <h2
          style={{
            marginTop: 0,
            color: "#454f5b",
            fontFamily: "font-family: Public Sans,sans-serif",
          }}
        >
          Mint your devnet NFT
        </h2>

        <Wallet endpoint={endpoint}>
          <Mint />
        </Wallet>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
