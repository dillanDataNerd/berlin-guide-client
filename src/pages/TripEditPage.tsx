import { Box, Typography } from "@mui/material";
import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import TripForm from "../components/TripForm";

function TripEditPage() {
  return (
    <>
      <HeaderBar />
      <TripForm />
    </>
  );
}
export default TripEditPage;
