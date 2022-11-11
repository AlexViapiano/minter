import React, { FC, ReactNode, useMemo } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  GlowWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");

interface AuxProps {
  endpoint: string;
  children: ReactNode;
}

export const Wallet: FC<AuxProps> = (props) => {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new GlowWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={props.endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              margin: "30px",
            }}
          >
            <WalletMultiButton />

            {/* <WalletDisconnectButton /> */}
          </div>
          {props.children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
