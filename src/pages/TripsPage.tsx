import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Trip } from "../types";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import NewElementCard from "../components/NewElementCard";

function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const VITE_SERVER_URL: String = import.meta.env.VITE_SERVER_URL;

  async function getTrips() {
    try {
      const response = await axios.get<Trip[]>(`${VITE_SERVER_URL}/api/trips`);
      setTrips(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTrips();

    return () => {};
  }, []);

  return (
    <>
      <HeaderBar />
      <Box height={50}></Box>

      <Grid container spacing={2} justifyContent={"center"}>
        <NewElementCard />
        {trips.map((element: Trip) => {
          return (
            <TripCard
              key={element.id}
              tripDetails={element}
              allTrips={trips}
              setTrips={setTrips}
            />
          );
        })}
      </Grid>
    </>
  );
}
export default TripsPage;
