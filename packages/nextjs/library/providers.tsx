"use client";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";



export function Providers({ children }: PropsWithChildren) {
   
      
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <DynamicContextProvider
      settings={{
        environmentId: '8d4ca57f-dfa8-4a56-8c8d-37804e8a80ea',
        walletConnectors: [ EthereumWalletConnectors ],
      }}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </DynamicContextProvider>
  );
}
