import { useMemo } from "react";
import { useDeployedContractInfo } from "~~/hooks/Scaffold-ETH";
import { ContractName } from "~~/utils/Scaffold-ETH/contract";
import { useTargetNetwork } from "./useTargetNetwork";
import { Contract, RpcProvider } from "starknet";
import { useAccount } from "wagmi";

export const useScaffoldContract = <TContractName extends ContractName>({
  contractName,
}: {
  contractName: TContractName;
}) => {
  const { data: deployedContractData, isLoading: deployedContractLoading } =
    useDeployedContractInfo(contractName);

  const { targetNetwork } = useTargetNetwork();
  const { account } = useAccount();
  const publicNodeUrl = targetNetwork.rpcUrls.public.http[0];

  const publicClient = useMemo(() => {
    return new RpcProvider({
      nodeUrl: publicNodeUrl,
    });
  }, [publicNodeUrl]);
  let contract = undefined;
  if (deployedContractData) {
    contract = new Contract(
      [...deployedContractData.abi],
      deployedContractData.address,
      account || publicClient,
    );
  }

  return {
    data: contract,
    isLoading: deployedContractLoading,
  };
};
