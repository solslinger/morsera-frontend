import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { Address, encodeFunctionData, zeroAddress } from "viem";
import { deadManSwitchFactoryABI, gnosisSafeABI } from "../generated";
import { FACTORY_ADDRESS } from "../utils";
import { PublicClient, useAccount, usePublicClient } from "wagmi";
import { useState, useEffect } from "react";
import { useDeadManSwitch } from "./useDeadManSwitch";
import { useGlobalState } from "../components/GlobalState";

const SENTINEL_MODULES = '0x0000000000000000000000000000000000000001';

async function getAllModules(publicClient: PublicClient, safeAddress: Address, pageSize = 10n) {
  let allModules: Address[] = [];
  while (true) {
    const [modules, next] = await publicClient.readContract({
      address: safeAddress,
      abi: gnosisSafeABI,
      functionName: 'getModulesPaginated',
      args: [SENTINEL_MODULES, pageSize]
    });

    allModules = allModules.concat(modules);

    if (next === SENTINEL_MODULES) {
      break;
    }
  }
  return allModules;
}

async function findPrevModule(publicClient: PublicClient, safeAddress: Address, module: Address, pageSize = 10n) {
  const allModules = await getAllModules(publicClient, safeAddress, pageSize);
  const index = allModules.map(x => x.toLowerCase()).indexOf(module.toLowerCase() as Address);
  
  if (index === -1) {
    throw new Error('Module not found');
  }
  
  if (index === 0) {
    return SENTINEL_MODULES;
  }

  return allModules[index - 1];
}

export function usePrevModule() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { isLoading: isDeadManLoading, err: deadManErr, deadManSwitch } = useDeadManSwitch();
  const [globalState, setGlobalState] = useGlobalState();

  const [isLoading, setIsLoading] = useState(!globalState.prevModule);
  const [err, setErr] = useState<Error>();

  useEffect(() => {
    if (globalState.prevModule) {
      setIsLoading(false);
      return;
    }

    if (isDeadManLoading) return;
    if (deadManErr) {
      setErr(deadManErr);
      setIsLoading(false);
      return;
    }
    if (!address) return;

    findPrevModule(publicClient, address, deadManSwitch!).then((prevModule) => {
      setGlobalState((prevData) => ({ ...prevData, prevModule }));
    }).catch((err) => {
      console.error(err);
      setErr(err);
      setIsLoading(false);
    });
  }, [address, publicClient, deadManSwitch, isDeadManLoading, deadManErr, globalState.prevModule]);

  return {
    prevModule: globalState.prevModule,
    isLoading,
    err
  }
}