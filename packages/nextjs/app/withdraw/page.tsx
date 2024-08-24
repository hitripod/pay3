"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SuccessMessage } from "~~/components/alerts/SuccessMessage";
import { WarningMessage } from "~~/components/alerts/WarningMessage";
import { GoBackArrow } from "~~/components/navigation/GoBackArrow";
import { useWithdrawFunds } from "~~/hooks/useWithdrawFunds";

export default function Withdraw() {
  const { user } = useDynamicContext();
  const [hasReadWarning, setHasReadWarning] = useState<boolean>(false);
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const {mutateAsync: withdrawFunds} = useWithdrawFunds();
  // const { mutateAsync: signTransaction } = useSignTransaction();

  const withdrawMoney = async () => {
    if (!user){
      alert("You need to log in!");
      router.push("/");
      return
    }
    if (!amount) return;
    await withdrawFunds({email: user.email || "", amount: parseFloat(amount)});
    setShowSuccess(true);
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
            { !hasReadWarning && (
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
                <input
                  inputMode="numeric"
                  className=" flex h-28 w-full flex-col items-center gap-4 rounded-full rounded-xl border-2  border-black bg-white  p-6 text-center text-3xl hover:bg-powder-100 focus:outline-none active:bg-powder-200"
                  placeholder="$1,200 JPY"
                  value={amount}
                  disabled={!!showSuccess}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {!showSuccess && (
                  <button
                    onClick={withdrawMoney}
                    disabled={!amount}
                    className={`h-16 w-full rounded-xl border-2 border-black p-2.5 text-xl font-semibold hover:bg-amber-500 active:bg-amber-600 ${amount ? "bg-amber-400" : "bg-amber-100 opacity-60"}`}
                  >
                    💰 Withdraw
                  </button>
                )}
                {showSuccess && (
                  <>
                    <SuccessMessage message="Succesful Withdrawal" />
                    <button
                      onClick={() => router.push("/")}
                      className=" w-full rounded-xl border-2 border-black p-2.5 font-semibold hover:bg-blizzardblue-400 active:bg-blizzardblue-500"
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
