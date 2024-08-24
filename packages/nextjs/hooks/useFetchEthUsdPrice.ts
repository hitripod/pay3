import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchEthUsdPrice = async (): Promise<number> => {
  const response = await axios.get("/api/currencies/ethusd");

  if (response.status !== 200) {
    throw new Error("Failed to fetch USD/JPY prices");
  }

  return response.data.ethusd;
};

export const useFetchEthUsdPrice = () => {
  return useQuery<number, Error>({
    queryKey: ["ethUsdPrice"],
    queryFn: fetchEthUsdPrice,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
