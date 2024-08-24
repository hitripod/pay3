import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-stark/getMetadata";
import RegisterForm from "./_components/RegisterForm";
import ChargeForm from "./_components/ChargeForm";

export const metadata = getMetadata({
  title: "Merchant",
  description:
    "Charge your customers with crypto and receive your local currency",
});


const Merchant: NextPage = () => {
    
  return (
    <>
      <RegisterForm />
      <hr/>
      <ChargeForm />
    </>
  );
};

export default Merchant;