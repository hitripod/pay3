"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  starkscan,
} from "wagmi";
import { Header } from "~~/components/Header";
import { Footer } from "~~/components/Footer";
import { ProgressBar } from "~~/components/Scaffold-ETH/ProgressBar";
import { appChains } from "~~/services/web3/connectors";
import { BurnerConnector } from "~~/services/web3/stark-burner/BurnerConnector";
import provider from "~~/services/web3/provider";
import { useNativeCurrencyPrice } from "~~/hooks/Scaffold-ETH/useNativeCurrencyPrice";

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  // useNativeCurrencyPrice();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* <Header /> */}
        <main className="bg-green-50 h-screen">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};
export const ScaffoldEthAppWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos(), new BurnerConnector()],
    order: "random",
  });

  return (
    <StarknetConfig
      chains={appChains}
      provider={provider}
      connectors={connectors}
      explorer={starkscan}
    >
      <ProgressBar />
      <ScaffoldStarkApp>{children}</ScaffoldStarkApp>
    </StarknetConfig>
  );
};
