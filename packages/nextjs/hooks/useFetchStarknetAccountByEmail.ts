import { useQuery } from "@tanstack/react-query";
import axios from "axios";




async function fetchStarknetAccountByEmail(email: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!backendUrl) {
      throw new Error("backendUrl URL is not defined");
    }
    const response = await axios.get(
      `${backendUrl}/get-account/${email}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data.address
}


export const useFetchStarknetAccountByEmail = (email:string) => {
    return useQuery<boolean, Error, string>({
      queryFn: async () => fetchStarknetAccountByEmail(email),
      queryKey: ["starknetAccount"],
      enabled: !!email,
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  };
