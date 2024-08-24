"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoBackArrow } from "~~/components/navigation/GoBackArrow";
import QRCode from "react-qr-code";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import CopyToClipboard from "react-copy-to-clipboard";
import { SuccessMessage } from "~~/components/alerts/SuccessMessage";

export default function Cobrar() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const { user } = useDynamicContext();
  // const invoiceAddress = "0x0546501475912C61eA1862693D2f4A542050A64619bAE0492250c57dCd0E2AAa"
  const [linkCopied, setLinkCopied] = useState(false);

  const generateInvoice = async () => {
    let invoiceAddress2 = "kordan@kryptogo.com"
    if (!invoiceAddress2) {
      alert("email not found! you need to log in!");
      router.push("/");
      return;
    }
    setPaymentLink(
      `http://localhost:3000/pay/${invoiceAddress2}?amount=${amount}`
    );
  };

  const onCopyText = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1500); // Reset status after 1.5 seconds
  };

  if (paymentLink) {
    return (
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 px-5 sm:w-1/2">
        <h1 className="text-pretty	text-3xl font-semibold sm:text-4xl">
          Amount to pay
        </h1>
        <div className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-black bg-white p-6 shadow-md">
          <p className="mb-2 text-2xl font-semibold tracking-wide sm:text-3xl">
            ${amount}
            <span className="ml-1 text-xl font-medium"> JPY</span>
          </p>
        </div>
        <CopyToClipboard text={paymentLink} onCopy={onCopyText}>
          <button className="h-16 w-full rounded-xl border-2 border-black bg-rose-300 p-2.5 text-base	 font-semibold hover:bg-rose-400 active:bg-rose-500">
            🤝 Copy Payment link
          </button>
        </CopyToClipboard>
        {linkCopied && (
          <div className="absolute bottom-4 w-full px-4 pb-4">
            <SuccessMessage message="Link in clipboard" />
          </div>
        )}
        <div className=" grid place-content-center items-center justify-center rounded-xl border-2 border-black bg-white px-4 py-4 ">
          <QRCode
            value={paymentLink}
            className="h-48 w-48 sm:h-72 sm:w-72"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
        <button
          onClick={() => router.push("/")}
          className=" mt-5 w-full rounded-xl border-2 border-black p-2.5 font-semibold hover:bg-blizzardblue-400 active:bg-blizzardblue-500"
        >
          Go back to home
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <GoBackArrow />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-5/6 flex-col items-center gap-4 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
            <label className="text-3xl font-semibold sm:text-4xl">
              Amount to charge
            </label>
            <p className="truncate text-lg font-medium text-gray-500">
              Write the amount you want to charge
            </p>

            <input
              inputMode="numeric"
              className="mb-10 flex h-28 w-full flex-col items-center gap-4 rounded-full rounded-xl border-2 border-2 border-black border-black bg-[#FFFCF9] bg-white p-2.5  p-6 text-center text-3xl shadow-[2px_2px_0px_rgba(0,0,0,1)] shadow-[2px_2px_0px_rgba(0,0,0,1)]  hover:bg-powder-100 focus:bg-[#fed2aa] focus:outline-none active:bg-powder-200"
              placeholder="$1,200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              onClick={generateInvoice}
              disabled={!amount}
              className={`h-16 w-full rounded-xl border-2 border-black bg-amber-400 p-2.5 text-xl font-semibold hover:bg-amber-500 active:bg-amber-600 ${amount ? "bg-amber-400" : "bg-amber-100 opacity-60	"}`}
            >
              💰 Generate Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }
}