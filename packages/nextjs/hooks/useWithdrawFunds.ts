import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type WithdrawFundsInput = {
  email: string;
  amount: number;
};

async function withdrawFunds(
    withdrawFundsInput: WithdrawFundsInput
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!backendUrl) {
    throw new Error("backendUrl URL is not defined");
  }
  const response = await axios.post(
    `${backendUrl}/withdraw`,
    withdrawFundsInput,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export const useWithdrawFunds = () => {
  return useMutation<string, Error, WithdrawFundsInput>({
    mutationFn: withdrawFunds,
  });
};
