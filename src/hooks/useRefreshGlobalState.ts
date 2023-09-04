import { useGlobalState } from "../components/GlobalState";

// takes a promise and will will wipe the global state after resolution
export function useRefreshGlobalState() {
  const [, setGlobalState] = useGlobalState();
  return async <T>(p: Promise<T>) => {
    const result = await p;
    setGlobalState({});
    console.log('refresh');
    return result;
  }
}