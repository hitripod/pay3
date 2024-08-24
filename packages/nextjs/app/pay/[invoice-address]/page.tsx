"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  useAccount,
  useConnect,
  useContract,
  useContractWrite,
  useNetwork,
} from "@starknet-react/core";
import { WalletButton } from "~~/components/WalletButton";
import { ErrorModal } from "~~/components/alerts/ErrorModal";
import { erc20ABI } from "~~/library/erc20Abi";
import { SuccessModal } from "~~/components/alerts/SuccessModal";
import { CallData, Uint256, cairo, uint256 } from "starknet";
import { useFetchMxnUsdPrice } from "~~/hooks/useFetchMxnUsdPrice";
import { useFetchEthUsdPrice } from "~~/hooks/useFetchEthUsdPrice";

export default function PayInvoice() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const address = params["invoice-address"] as string;
  const amount = searchParams.get("amount");
  const { connect, connectors } = useConnect();
  const { account, address: accountAddress, status } = useAccount();
  const { chain } = useNetwork();
  const [error, setError] = useState<string | null>(null);

  const { data: mxnUsd, isLoading: mxnLoading } = useFetchMxnUsdPrice();
  const { data: ethUsd, isLoading: ethLoading } = useFetchEthUsdPrice();
  

  const { contract } = useContract({
    abi: erc20ABI,
    address: chain.nativeCurrency.address,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    if ( !mxnUsd || !ethUsd ) return;

    // cast amount to Uint256
    // const bigIntAmount = BigInt(amount + "n" as string)
    const amountInEth = Number(amount) * mxnUsd / ethUsd;
    const bigAmount = (amountInEth * 10**18).toFixed(0);
    const bigAmountString = bigAmount.toString()
    const cairoAmount = cairo.uint256(bigAmountString);
    return contract.populateTransaction["transfer"]!(address, {
      low: cairoAmount.low,
      high: cairoAmount.high,
    });
  }, [contract, address,mxnUsd, ethUsd]);

  const { writeAsync, data, isPending } = useContractWrite({
    calls,
  });


  const triggerWrite = async () => {
    try {
      await writeAsync();
    } catch (error) {
      setError("error signing");
      console.error("error", error);
    }
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <ErrorModal errorMessage={"error signing transaction"} />
      </div>
    );
  }

  if (data?.transaction_hash) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <SuccessModal
          message="Payment successful"
          onGoHome={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <main className="z-0 mx-auto  flex h-full w-full flex-col items-center justify-around gap-4 px-5 py-7 sm:w-1/2 sm:px-0 sm:py-5">
      <div className="flex w-full flex-col items-center gap-4">
        <div
          className={`flex w-full items-center ${accountAddress ? "justify-end" : "justify-center"}`}
        >
          <WalletButton
            walletAddress={accountAddress}
            onClickWallet={() => connect({ connector: connectors[0] })}
          />
        </div>
        {accountAddress ? (
          <>
            <div className=" flex w-full flex-col items-center gap-4 rounded-xl border-2 border-black bg-white p-6 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center">
                <p className="mb-2 text-3xl font-semibold tracking-wide sm:text-5xl">
                  ${amount}
                  <span className="text-xl font-medium">JPY</span>
                </p>
                <p className="truncate text-sm font-medium text-gray-500">
                  Amount to pay
                </p>
              </div>
            </div>
            <button
              onClick={triggerWrite}
              className={`h-16 w-full rounded-xl border-2 border-black p-2.5 text-xl font-semibold hover:bg-amber-500 active:bg-amber-600 bg-amber-400`}
            >
              Pay
            </button>
            {isPending && <p>status: Submitting...</p>}
            {data && <p>hash: {data?.transaction_hash}</p>}
          </>
        ) : null}
      </div>
    </main>
  );
}
