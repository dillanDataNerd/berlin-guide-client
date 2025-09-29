import "./App.css";
import { Route, Routes } from "react-router-dom";
import ActivitiesPage from "./pages/ActivitiesPage";
import LandingPage from "./pages/LandingPage";
import TripsPage from "./pages/TripsPage";
import ErrorPage from "./pages/ErrorPage";
import TripCreatePage from "./pages/TripCreatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/trips/new" element={<TripCreatePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
