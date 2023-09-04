import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { Address, encodeFunctionData, zeroAddress } from "viem";
import { deadManSwitchFactoryABI, gnosisSafeABI } from "../generated";
import { FACTORY_ADDRESS } from "../utils";
import { PublicClient, usePublicClient } from "wagmi";
import { useState, useEffect } from "react";
import { useDeadManSwitch } from "./useDeadManSwitch";
import { usePrevModule } from "./usePrevModule";

export function useTeardownTx() {
  const { sdk, connected, safe } = useSafeAppsSDK();
  const {isLoading, err, prevModule} = usePrevModule();
  const {deadManSwitch} = useDeadManSwitch();

  const send = () => {
    if (!connected) {
      throw new Error('Not connected');
    }

    if (isLoading) {
      throw new Error('Prev module not found yet');
    }

    if (err) {
      throw err;
    }

    const txs = [
      {
        to: safe.safeAddress,
        value: '0',
        data: encodeFunctionData({
          abi: gnosisSafeABI,
          functionName: 'setGuard',
          args: [zeroAddress]
        })
      },
      {
        to: safe.safeAddress,
        value: '0',
        data: encodeFunctionData({
          abi: gnosisSafeABI,
          functionName: 'disableModule',
          args: [prevModule!, deadManSwitch!]
        })
      }
    ];

    return sdk.txs.send({ txs });
  }

  return {
    isLoading,
    err,
    send
  };
}