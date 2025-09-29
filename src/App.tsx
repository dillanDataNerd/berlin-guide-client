import "./App.css";
import { Route, Routes } from "react-router-dom";
import ActivitiesPage from "./pages/ActivitiesPage";
import LandingPage from "./pages/LandingPage";
import TripsPage from "./pages/TripsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/activities" element={<ActivitiesPage/>} />
        <Route path="/trips" element={<Tripsting Page/>} />
      </Routes>
    </>
  );
}

export default App;
