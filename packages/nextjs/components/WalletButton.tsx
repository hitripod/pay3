"use client";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const parseWalletAddress = (walletAddress: string) => {
  return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
};

export type WalletButtonProps = {
  walletAddress: string | undefined;
  onClickWallet: () => void;
};

export function WalletButton(walletButtonProps: WalletButtonProps) {
  const { walletAddress, onClickWallet } = walletButtonProps;

  return (
    <button
      disabled={!!walletAddress}
      title={walletAddress || "Connect Wallet"}
      onClick={onClickWallet} // () => {
      //   setWalletAddress("0xc60A2aA2E5f4A9dc3cC74A2F52af7f6e13eC08ad");
      // }
      className={`flex items-center justify-center rounded-full border-2 border-black bg-rose-200 px-4 py-2 text-center text-sm hover:bg-rose-500  active:bg-rose-600 sm:text-base`}
    >
      <CurrencyDollarIcon
        className="h-5 w-5 rounded-full border-black bg-amber-400 font-extrabold text-black"
        aria-hidden="true"
      />
      {walletAddress ? parseWalletAddress(walletAddress) : "Connect Wallet"}
    </button>
  );
}
