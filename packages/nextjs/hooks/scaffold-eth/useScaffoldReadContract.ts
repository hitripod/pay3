import { useContractRead } from "wagmi";
import { BlockNumber } from "starknet";
import { useDeployedContractInfo } from "~~/hooks/Scaffold-ETH";
import {
  AbiFunctionOutputs,
  ContractAbi,
  ContractName,
  ExtractAbiFunctionNamesScaffold,
  UseScaffoldReadConfig,
} from "~~/utils/Scaffold-ETH/contract";

export const useScaffoldReadContract = <
  TContractName extends ContractName,
  TFunctionName extends ExtractAbiFunctionNamesScaffold<
    ContractAbi<TContractName>,
    "view"
  >,
>({
  contractName,
  functionName,
  args,
  ...readConfig
}: UseScaffoldReadConfig<TContractName, TFunctionName>) => {
  const { data: deployedContract } = useDeployedContractInfo(contractName);

  return useContractRead({
    functionName,
    address: deployedContract?.address,
    abi: deployedContract?.abi,
    watch: true,
    args,
    enabled: !Array.isArray(args) || !args.some((arg) => arg === undefined),
    blockIdentifier: "pending" as BlockNumber,
    ...(readConfig as any),
  }) as Omit<ReturnType<typeof useContractRead>, "data" | "refetch"> & {
    data: AbiFunctionOutputs<ContractAbi, TFunctionName> | undefined;
    // refetch: (options?: {
    //   throwOnError: boolean;
    //   cancelRefetch: boolean;
    // }) => Promise<AbiFunctionOutputs<ContractAbi, TFunctionName>>;
  };
};
