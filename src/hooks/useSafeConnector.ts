import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';

function useSafeConnector() {
  const { connector: activeConnector } = useAccount();
  const { connect, connectors } = useConnect();

  const [safeConnector, setSafeConnector] = useState(connectors.find((c) => c.id === 'safe' && c.ready));

  useEffect(() => {
    setSafeConnector(connectors.find((c) => c.id === 'safe' && c.ready));
  }, [connect, connectors]);

  useEffect(() => {
    if (safeConnector && activeConnector?.id !== 'safe') {
      connect({ connector: safeConnector });
    }
  }, [safeConnector, connect]);

  return { connector: safeConnector };
}

export { useSafeConnector };