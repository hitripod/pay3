import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface MxnUsdPrices {
  usdToMxn: number;
}

export const fetchMxnUsdPrice = async (): Promise<number> => {
  const response = await axios.get("/api/currencies/mxnusd");

  if (response.status !== 200) {
    throw new Error("Failed to fetch USD/MXN prices");
  }

  return response.data.mxnUsd;
};

export const useFetchMxnUsdPrice = () => {
  return useQuery<number, Error>({
    queryKey: ["mxnUsdPrice"],
    queryFn: fetchMxnUsdPrice,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
