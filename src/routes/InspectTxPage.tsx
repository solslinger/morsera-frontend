import { useParams, useSearchParams } from "react-router-dom";

function InspectTxPage() {
  const p = useParams();

  return (
    <div> 
      inspect {JSON.stringify(p)}
    </div>
  )
}

export default InspectTxPage;
