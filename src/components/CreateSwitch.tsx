import { Button, Grid, Link, Typography } from "@mui/material";
import { useConnect, useContractWrite, usePrepareContractWrite, usePrepareSendTransaction, useWaitForTransaction, useWalletClient } from "wagmi";
import { FACTORY_ADDRESS } from "../utils";
import { deadManSwitchFactoryABI, gnosisSafeABI } from "../generated";
import { polygon } from "wagmi/chains";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { encodeFunctionData } from "viem";
import { useSetupCall } from "../hooks/useSetupTxs";

export function CreateSwitch() {
  const setup = useSetupCall();

  return (
    <Grid container rowSpacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h1">
          Morsera is not enabled on your safe, would you like to enable it?
        </Typography>        
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h3">
          {/* todo: add a link to the docs */}
          <Link href="#">Learn more</Link>
        </Typography>
      </Grid>

      <Grid item xs={12} textAlign="center">
        <br/>
        <br/>
        <Button variant='contained' onClick={() => {setup()}}>Enable Morsera</Button>
      </Grid>
    </Grid>
  )
}