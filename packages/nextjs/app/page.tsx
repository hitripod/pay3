"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import {
  BuildingStorefrontIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-stark";
import { useAccount, useBalance } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import {
  DynamicWidget,
  useDynamicContext,
  useIsLoggedIn,
  useTokenBalances,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { formatEther } from "ethers";
import axios from "axios";

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string>("0");
  const [jpyBalance, setJpyBalance] = useState<string>("0");
  const isLoggedIn = useIsLoggedIn();
  const userWallets = useUserWallets();
  const { rpcProviders } = useDynamicContext();

  useEffect(() => {
    const fetchBalance = async () => {
      if (userWallets.length > 0 && userWallets[0]) {
        const provider = rpcProviders.evmDefaultProvider?.provider;
        if (provider) {
          try {
            const walletBalance = await provider.getBalance({ address: userWallets[1].address });
            // Convert balance from wei to ether and format it
            console.log("walletBalance: ", walletBalance);
            const formattedBalance = formatEther(walletBalance);
            setBalance(parseFloat(formattedBalance).toFixed(2));
          } catch (error) {
            console.error("Error fetching balance:", error);
          }
        }
      }
    };

    fetchBalance();
  }, [userWallets, rpcProviders]);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=jpy');
        const ethPriceInJpy = response.data.ethereum.jpy;
        const balanceInJpy = (parseFloat(balance) * ethPriceInJpy).toFixed(0);
        setJpyBalance(balanceInJpy);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    if (balance !== "0") {
      fetchEthPrice();
    }
  }, [balance]);


  if (!isLoggedIn) {
    return (
      <main className="mx-auto flex h-full sm:pt-0 mt-8 w-full flex-col items-center justify-center gap-4 px-5 sm:w-1/2 sm:px-0">
        <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 border-black bg-white p-6 shadow-[2px_2px_0px_rgba(0,0,0,1)] ">
          <p className="truncate text-sm font-medium text-gray-500">
            Please connect your wallet to proceed
          </p>
          <DynamicWidget />
        </div>
      </main>
    );
  }
  return (
    <main className="mx-auto flex h-full sm:pt-0 mt-8 w-full flex-col items-center justify-center gap-4 px-5 sm:w-1/2 sm:px-0">
      <div className=" w-full">
        <DynamicWidget />
      </div>
      <div className="mb-5 flex w-full flex-col items-center gap-4 rounded-xl border-2 border-black bg-white p-6 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        <p className="mb-2 text-3xl font-semibold tracking-wide sm:text-5xl text-black">
          {balance}
          <span className="text-xl font-medium text-black"> ETH</span>
        </p>
        <p className="text-xl font-medium text-black">
          ≈ {jpyBalance} JPY
        </p>
        <p className="truncate text-sm font-medium text-black">
          TOTAL BALANCE
        </p>
      </div>
      <Link
        href="/charge"
        className="text-center w-full rounded-xl border-2 border-black bg-emerald-400 p-2.5 text-xl	 font-semibold hover:bg-emerald-500 active:bg-emerald-600"
      >
        Create Invoice
      </Link>
      <Link
        href="/withdraw"
        className="text-center w-full rounded-xl border-2 border-black bg-amber-400 p-2.5	 text-xl font-semibold hover:bg-amber-500 active:bg-amber-600"
      >
        Withdraw Funds
      </Link>
      <Link
        href="/history"
        className="text-center w-full rounded-xl border-2 border-black bg-blue-400 p-2.5	 text-xl font-semibold hover:bg-blue-500 active:bg-blue-600"
      >
        Transaction Log
      </Link>
{/*       <div className="mt-10 flex justify-center pt-8 sm:mt-14">
        <Image src="/chipi-chunky.png" alt="Hashme" width={100} height={100} />
      </div> */}
    </main>
  );
};

export default Home;