import { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";
import { Address } from "viem";

export type GlobalState = {
  deadManSwitch?: Address | undefined;
  prevModule?: Address | undefined;
}

export const GlobalStateContext = createContext<[GlobalState, React.Dispatch<React.SetStateAction<GlobalState>>] | undefined>(undefined);

export function GlobalStateProvider(props: PropsWithChildren) {
  const [globalState, setGlobalState] = useState<GlobalState>({});
  return <GlobalStateContext.Provider value={[globalState, setGlobalState]}>{props.children}</GlobalStateContext.Provider>
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("Global context undefined");
  }

  return context;
}
