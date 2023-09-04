import { Address, Hex } from "viem";

export const FACTORY_ADDRESS = "0xd15Ac7A90Bba2903cA3f4c992dbbB0BeA3E06799";

export function bytes32ToAddress(bytes32: Hex): Address {
  return `0x${bytes32.slice(26)}`;
}