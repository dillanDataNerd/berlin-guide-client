import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Trip } from "../types";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import NewElementCard from "../components/NewElementCard";

function TripsPage() {
  async function getTrips() {
    try {
      const response = await axios.get<Trip[]>(
        "http://localhost:5005/api/trips"
      );
      setTrips(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [activities, setTrips] = useState<Trip[]>([]);

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
        {activities.map((element: Trip) => {
          console.log(element);
          return <TripCard key={element.id} tripDetails={element} />;
        })}
      </Grid>
    </>
  );
}
export default TripsPage;
