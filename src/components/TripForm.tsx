import { useEffect, useState } from "react";
import { Activity, Trip } from "../types";
import axios from "axios";
import { Box, TextField } from "@mui/material";

type TripFormProps = { tripId?: string };

function TripForm({ tripId }: TripFormProps) {
  const [title, setTitle] = useState<string>("");
  const [guests, setGuests] = useState<string[]>([]);
  const [dateStarted, setDateStarted] = useState<Date | null>(null);
  const [daysInBerlin, setDaysInBerlin] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<string | null>(null);
  const [interestingThings, setInterestingThings] = useState<string | null>(
    null
  );
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

  async function getTripData(tripId: string): Promise<void> {
    try {
      const response = await axios.get<Trip>(
        `http://localhost:5005/api/trips/${tripId}`
      );
      const trip = response.data;

      console.log(trip);

      if (trip.title) setTitle(trip.title);
      if (trip.guests) setGuests(trip.guests);
      if (trip.dateStarted) setDateStarted(new Date(trip.dateStarted));
      if (trip.daysInBerlin !== undefined) setDaysInBerlin(trip.daysInBerlin);
      if (trip.highlights !== undefined) setHighlights(trip.highlights);
      if (trip.interestingThings !== undefined)
        setInterestingThings(trip.interestingThings);
      if (trip.photoUrl !== undefined) setPhotoUrl(trip.photoUrl);
      if (trip.activities) setActivities(trip.activities);
      if (trip.updatedAt) setUpdatedAt(new Date(trip.updatedAt));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (tripId) getTripData(tripId);
  }, [tripId]);

  return (
    <>
      <Box maxWidth={300} textAlign={"center"} mx={"auto"}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </Box>
    </>
  );
}
export default TripForm;
