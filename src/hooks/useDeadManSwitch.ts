import { Address, useAccount, useContractRead, usePublicClient } from "wagmi";
import { deadManSwitchABI, gnosisSafeABI } from "../generated";
import { useContext, useEffect, useState } from "react";
import { bytes32ToAddress } from "../utils";
import { zeroAddress } from "viem";
import { GlobalStateContext, useGlobalState } from "../components/GlobalState";

const GUARD_SLOT = "0x4a204f620c8c5ccdca3fd54d003badd85ba500436a431f0cbda4f558c93c34c8";

export function useDeadManSwitch() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [globalState, setGlobalState] = useGlobalState();

  const [isLoading, setIsLoading] = useState(!globalState.deadManSwitch);
  const [err, setErr] = useState<Error>();

  useEffect(() => {
    if (!address) return;
    if (globalState.deadManSwitch) {
      // we have it already
      setIsLoading(false);
      return;
    }

    (async () => {
      console.log('fetching dead man switch address...');
      
      console.log('fetching guard slot...');
      const storageResult = await publicClient.getStorageAt({
        address,
        slot: GUARD_SLOT
      });
      if (storageResult === undefined) {
        setErr(new Error("getStorageAt undefined"));
        setIsLoading(false);
        return;
      }
      
      const guard = bytes32ToAddress(storageResult);

      if (guard === zeroAddress) {
        setIsLoading(false);
        return;
      }

      console.log('checking if the guard is a dead man switch...');
      const isDeadManSwitch = await publicClient.readContract({
        address: guard,
        abi: deadManSwitchABI,
        functionName: "isDeadManSwitch"
      });

      if (isDeadManSwitch) {
        setGlobalState((prevData) => ({ ...prevData, deadManSwitch: guard }));
      }
      setIsLoading(false);
    })();    

  }, [address, publicClient, globalState.deadManSwitch]);

  return {
    deadManSwitch: globalState.deadManSwitch,
    isLoading,
    err
  }
}