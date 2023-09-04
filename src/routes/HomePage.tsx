import { Button, Grid, Link } from "@mui/material";
import MainTxTable from "../components/MainTxTable";
import { OnlySafe } from "../components/OnlySafe";
import { useTeardownTx } from "../hooks/useTeardownTx";

function HomePage() {
  let {isLoading, err, send} = useTeardownTx();

  return (
    <OnlySafe>
      <Grid container rowSpacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <MainTxTable />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="outlined">
            New Transaction
          </Button>
          <br />
          <br />
          <Button variant="outlined" color='error' onClick={() => {send()}} disabled={err !== undefined || isLoading}>
            Remove MORSERA Module
          </Button>
          <br />
          <br />
          <Link href="#">DOCS</Link>
        </Grid>
      </Grid>
    </OnlySafe>
  )
}

export default HomePage;