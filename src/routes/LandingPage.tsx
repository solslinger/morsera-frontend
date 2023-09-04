
// this page sees if the safe has a dead man switch. if it does, redirect to home.
// if it does not, prompt to create one.

import { OnlySafe } from "../components/OnlySafe";
import { useDeadManSwitch } from "../hooks/useDeadManSwitch";
import { useNavigate } from "react-router-dom";
import { CreateSwitch } from "../components/CreateSwitch";

export function LandingPage() {
  const { isLoading, err, deadManSwitch } = useDeadManSwitch();
  const navigate = useNavigate();

  let inner;
  if (isLoading) {
    // still fetching
    return <h1>loading...</h1>;
  }
  else if (err || !deadManSwitch) {
    // error fetching or no switch
    inner = <CreateSwitch />;
  }
  else {
    // there is a switch, go home
    navigate("/home");
  }

  return (
    <OnlySafe>
      {inner}
    </OnlySafe>
  )
}