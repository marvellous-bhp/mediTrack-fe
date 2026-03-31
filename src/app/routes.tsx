import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { PatientDashboard } from "./pages/PatientDashboard";
import { ClinicDashboard } from "./pages/ClinicDashboard";
import { PricingPage } from "./pages/PricingPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/patient",
    Component: PatientDashboard,
  },
  {
    path: "/clinic",
    Component: ClinicDashboard,
  },
  {
    path: "/pricing",
    Component: PricingPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
