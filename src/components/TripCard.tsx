import { Trip, Activity } from "../types";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
  tripDetails: Trip;
  allTrips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
};

function TripCard({ tripDetails, allTrips, setTrips }: Props) {
  const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const toggleDrawer = (next: boolean) => setOpen(next);

  async function HandleDelete(): Promise<void> {
    try {
      await axios.delete(`${VITE_SERVER_URL}/api/trips/${tripDetails.id}`);
      setTrips(allTrips.filter((t) => t.id !== tripDetails.id));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  function HandleEdit(): void {
    navigate(`/trips/edit/${tripDetails.id}`);
  }

  const displayImage =
    tripDetails.photoUrl && tripDetails.photoUrl.trim().length > 0
      ? tripDetails.photoUrl
      : "/placeholder-trip-image.jpeg"; // Vite public folder

  return (
    <>
      <Card sx={{ width: 250, maxHeight: 300 }}>
        <CardMedia
          sx={{ height: 100 }}
          image={tripDetails.photoUrl || "/placeholder-trip-image.jpeg"} // thumbnail on the card
          title="trip image"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {tripDetails.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {tripDetails.dateStarted
              ? new Date(tripDetails.dateStarted).toLocaleDateString()
              : "—"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => toggleDrawer(true)}>
            Details
          </Button>
        </CardActions>
      </Card>

      {/* DRAWER WITH IMAGE ON TOP + FULL DETAILS */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: { xs: "100%", sm: 480 } } }}
        aria-label="Trip details drawer"
      >
        {/* Top image */}
        <CardMedia
          component="img"
          image={displayImage}
          alt={`${tripDetails.title} image`}
          sx={{
            width: "100%",
            height: { xs: 200, sm: 240 },
            objectFit: "cover",
          }}
        />

        {/* Details */}
        <Box
          role="presentation"
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{tripDetails.title}</Typography>
            <IconButton
              aria-label="Close details"
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            {tripDetails.highlights || "No highlights yet."}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>Guests:</strong>{" "}
              {Array.isArray(tripDetails.guests) && tripDetails.guests.length
                ? tripDetails.guests.join(", ")
                : "—"}
            </Typography>

            <Typography variant="body2">
              <strong>Start Date:</strong>{" "}
              {tripDetails.dateStarted
                ? new Date(tripDetails.dateStarted).toLocaleDateString()
                : "—"}
            </Typography>

            <Typography variant="body2">
              <strong>Days in Berlin:</strong> {tripDetails.daysInBerlin ?? "—"}
            </Typography>

            <Divider />
            <Typography variant="body2">
              <strong>Activities</strong>
            </Typography>

            {/* Optional: show activities count if you have it */}
            {"activities" in tripDetails && (
              <Grid container spacing={2} justifyContent={"center"}>
                {tripDetails.activities.map((element: Activity) => {
                  return (
                    <ActivityCard key={element.id} activityDetails={element} />
                  );
                })}
              </Grid>
            )}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1} m={2}>
            <Button variant="outlined" onClick={HandleEdit}>
              Edit
            </Button>
            <Button color="error" variant="outlined" onClick={HandleDelete}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default TripCard;
