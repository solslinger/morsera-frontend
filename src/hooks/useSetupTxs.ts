import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { Address, encodeFunctionData } from "viem";
import { deadManSwitchFactoryABI, gnosisSafeABI } from "../generated";
import { FACTORY_ADDRESS } from "../utils";


export function useSetupCall() {
  const { sdk, connected, safe } = useSafeAppsSDK();

  const txs = [
    {
      to: safe.safeAddress,
      value: '0',
      data: encodeFunctionData({
        abi: gnosisSafeABI,
        functionName: 'enableModule',
        args: [FACTORY_ADDRESS]
      })
    },
    {
      to: FACTORY_ADDRESS,
      value: '0',
      data: encodeFunctionData({
        abi: deadManSwitchFactoryABI,
        functionName: 'setup',
        args: [safe.safeAddress as Address]
      })
    }
  ];

  return () => {
    if (!connected) {
      throw new Error('Not connected');
    }

    return sdk.txs.send({ txs });
  }
}