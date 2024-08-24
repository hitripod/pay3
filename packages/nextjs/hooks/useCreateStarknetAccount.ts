import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type CreateStarknetAccountInput = {
  email: string;
  businessName: string;
};

async function createStarknetAccount(
  createStarknetAccountInput: CreateStarknetAccountInput
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!backendUrl) {
    throw new Error("backendUrl URL is not defined");
  }
  const response = await axios.post(
    `${backendUrl}/create-account`,
    createStarknetAccountInput,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.address
}

export const useCreateStarknetAccount = () => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, CreateStarknetAccountInput>({
    mutationFn: createStarknetAccount,
    onSuccess: (starknetAccount) => {
      queryClient.setQueryData(["starknetAccount"], starknetAccount);
    },
  });
};
