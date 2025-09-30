import { useEffect, useState } from "react";
import { Activity, Trip } from "../types";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Button,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, Navigate, useNavigate } from "react-router-dom";

type TripFormProps = { tripId?: string };

function TripForm({ tripId }: TripFormProps) {
  const [title, setTitle] = useState<string>("");
  const [guests, setGuests] = useState<string[]>([]);
  const [dateStarted, setDateStarted] = useState<Dayjs | null>(dayjs());
  const [daysInBerlin, setDaysInBerlin] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<string>("");
  const [interestingThings, setInterestingThings] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());
  const [allActivities, setAllActivities] = useState<Activity[]>([]);

  const VITE_SERVER_URL: String = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  async function getTripData(tripId: string): Promise<void> {
    try {
      const response = await axios.get<Trip>(
        `${VITE_SERVER_URL}/api/trips/${tripId}`
      );
      const trip = response.data;

      if (trip.title) setTitle(trip.title);
      if (trip.guests) setGuests(trip.guests);
      if (trip.dateStarted) setDateStarted(dayjs(trip.dateStarted));
      if (trip.daysInBerlin !== undefined) setDaysInBerlin(trip.daysInBerlin);
      if (trip.highlights) setHighlights(trip.highlights);
      if (trip.interestingThings) setInterestingThings(trip.interestingThings);
      if (trip.photoUrl) setPhotoUrl(trip.photoUrl);
      if (trip.activities) {
        setActivities(trip.activities);
        setSelectedActivityIds(trip.activities.map((a) => a.id));
      }
      if (trip.updatedAt) setUpdatedAt(new Date(trip.updatedAt));
    } catch (error) {
      console.log(error);
    }
  }

  async function getActivities() {
    try {
      const response = await axios.get<Activity[]>(
        `${VITE_SERVER_URL}/api/activities`
      );
      setAllActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function HandleSubmit(e: HTMLElement) {
    const body = {
      title,
      guests,
      dateStarted: dateStarted ? dateStarted.toISOString() : null,
      daysInBerlin,
      highlights: highlights || null,
      interestingThings: interestingThings || null,
      photoUrl: photoUrl || null,
      activities: {
        connect: selectedActivityIds.map((id) => ({ id })), // Prisma connect by id
      },
      updatedAt: updatedAt.toISOString(),
    };
    try {
      const response = await axios.post(`${VITE_SERVER_URL}/api/trips`, body);
      navigate("/trips");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (tripId) getTripData(tripId);
    getActivities();
  }, [tripId]);

  return (
    <Box maxWidth={400} textAlign="center" mx="auto">
      <Stack spacing={2}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Guests"
          fullWidth
          value={guests[0] ?? ""}
          onChange={(e) => setGuests([e.target.value])}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Start Date"
            value={dateStarted}
            onChange={(newValue) => setDateStarted(newValue)}
          />
        </LocalizationProvider>

        <TextField
          label="Days in Berlin"
          type="number"
          fullWidth
          value={daysInBerlin ?? ""}
          onChange={(e) => setDaysInBerlin(Number(e.target.value))}
        />

        <TextField
          label="Highlights"
          fullWidth
          multiline
          rows={3}
          value={highlights}
          onChange={(e) => setHighlights(e.target.value)}
        />

        <TextField
          label="Interesting Things"
          fullWidth
          multiline
          rows={3}
          value={interestingThings}
          onChange={(e) => setInterestingThings(e.target.value)}
        />

        <TextField
          label="Photo URL"
          fullWidth
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="activities-label">Activities</InputLabel>
          <Select
            labelId="activities-label"
            multiple
            value={selectedActivityIds}
            onChange={(e) =>
              setSelectedActivityIds(
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : e.target.value
              )
            }
            input={<OutlinedInput label="Activities" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((id) => {
                  const act = allActivities.find((a) => a.id === id);
                  return <Chip key={id} label={act?.title ?? id} />;
                })}
              </Box>
            )}
          >
            {allActivities.map((activity) => (
              <MenuItem key={activity.id} value={activity.id}>
                {activity.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={2}>
          <Link to="/trips">
            <Button variant="outlined">Cancel</Button>
          </Link>
          <Button variant="contained" onClick={HandleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TripForm;
