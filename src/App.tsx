import { Container } from '@mui/material';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './routes/HomePage';
import Header from './components/Header';
import InspectTxPage from './routes/InspectTxPage';
import { LandingPage } from './routes/LandingPage';
import { useSafeConnector } from './hooks/useSafeConnector';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/inspect/:txHash",
    element: <InspectTxPage />,
  }
]);

function SafeApp() {
  useSafeConnector();

  return (
    <div>
      <Header />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </div>
  )
}

export default SafeApp
