import { GetLogsReturnType, getAbiItem } from "viem";
import { deadManSwitchABI } from "./generated";

const scheduledTxEventAbiItem = getAbiItem({abi:deadManSwitchABI, name:"ScheduledTx"});
export type ScheduledTxEvent = GetLogsReturnType<typeof scheduledTxEventAbiItem>[0];