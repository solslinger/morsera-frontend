import { useEffect, useState } from "react";
import { GlobalState, useGlobalState } from "../components/GlobalState";

// don't use this
export function useLazyLoadGlobal<K extends keyof GlobalState>(
  apiCall: () => Promise<GlobalState[K]>,
  key: K
) {
  const [globalState, setGlobalState] = useGlobalState();
  const [err, setErr] = useState<Error>();
  const [loading, setLoading] = useState(globalState[key] === undefined);

  useEffect(() => {
    if (globalState[key] === undefined) {
      apiCall().then((newData) => {
        setGlobalState((prevData) => ({ ...prevData, [key]: newData }));
        setLoading(false);
      }).catch(e => {
        setErr(e);
        setLoading(false);
      })
    }
  }, [key, apiCall]);

  return {
    value: globalState[key],
    loading,
    err
  }
};