"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getChain } from "@dynamic-labs/utils";
import { parseEther, formatEther } from "viem";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SuccessMessage } from "~~/components/alerts/SuccessMessage";
import { WarningMessage } from "~~/components/alerts/WarningMessage";
import { GoBackArrow } from "~~/components/navigation/GoBackArrow";

export default function Withdraw() {
  const { user, primaryWallet, rpcProviders } = useDynamicContext();
  const [hasReadWarning, setHasReadWarning] = useState<boolean>(false);
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet && rpcProviders.evmProviders) {
        const provider = rpcProviders.evmProviders[6]?.provider; // Assuming 6 is the correct index for your network
        if (provider) {
          try {
            const walletBalance = await provider.getBalance({ address: primaryWallet.address });
            const formattedBalance = formatEther(walletBalance);
            setBalance(parseFloat(formattedBalance).toFixed(2));
          } catch (error) {
            console.error("Error fetching balance:", error);
          }
        }
      }
    };

    fetchBalance();
  }, [primaryWallet, rpcProviders]);

  const withdrawMoney = async () => {
    if (!user) {
      alert("You need to log in!");
      router.push("/");
      return;
    }
    if (!amount || !primaryWallet) return;

    try {
      const provider = await primaryWallet.connector.getSigner();
      const transaction = {
        account: primaryWallet.address,
        chain: getChain(await provider.getChainId()),
        to: "0xDdA6898e71868F7f38396C71107b01396Ad4C36a", // Replace with your withdrawal address
        value: parseEther(amount),
      };

      const hash = await provider.sendTransaction(transaction);
      console.log("Transaction hash:", hash);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert("Failed to withdraw. Please try again.");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="flex h-full  w-full flex-col items-center justify-between sm:w-2/3">
        <div className="flex w-full items-center justify-start">
          <GoBackArrow />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-between gap-6 px-10 ">
          <div className="flex w-full flex-col items-center justify-between gap-6">
            <label className="text-pretty	text-3xl font-semibold sm:text-4xl">
              Withdraw money
            </label>
            {!hasReadWarning && (
              <WarningMessage
                message="Are you sure you want to withdraw money? This action is irreversible."
                hyperMessage=""
                hyperLink=""
                hasReadWarning={hasReadWarning}
                setHasReadWarning={() => setHasReadWarning(true)}
              />
            )}
            {hasReadWarning && (
              <>
                <div className="text-lg mb-2">
                  Current balance: {balance} ETH
                </div>
                <input
                  inputMode="numeric"
                  className="flex h-28 w-full flex-col items-center gap-4 rounded-full rounded-xl border-2 border-black bg-white p-6 text-center text-3xl hover:bg-powder-100 focus:outline-none active:bg-powder-200"
                  placeholder="0.1 ETH"
                  value={amount}
                  disabled={!!showSuccess}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {!showSuccess && (
                  <button
                    onClick={withdrawMoney}
                    disabled={!amount}
                    className={`h-16 w-full rounded-xl border-2 border-black p-2.5 text-xl font-semibold hover:bg-amber-500 active:bg-amber-600 ${
                      amount ? "bg-amber-400" : "bg-amber-100 opacity-60"
                    }`}
                  >
                    💰 Withdraw
                  </button>
                )}
                {showSuccess && (
                  <>
                    <SuccessMessage message="Successful Withdrawal" />
                    <button
                      onClick={() => router.push("/")}
                      className="w-full rounded-xl border-2 border-black p-2.5 font-semibold hover:bg-blizzardblue-400 active:bg-blizzardblue-500"
                    >
                      Go back to home
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}