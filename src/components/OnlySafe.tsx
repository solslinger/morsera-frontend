import { useSafeConnector } from "../hooks/useSafeConnector";
import { NotSafe } from "./NotSafe";

// used on pages that should only be accessible from when the Safe is connected
// if the page may require the browser wallet to be connected, don't use this
export function OnlySafe(props: { children: React.ReactNode }) {
  const { children } = props;
  const { connector } = useSafeConnector();

  if (!connector) return <NotSafe />;

  return <>{children}</>;
}