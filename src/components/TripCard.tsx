import { Trip } from "../types";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TripDetailPage from "../pages/TripEditPage";
import axios from "axios";

// Vite provides types for import.meta.env automatically

type Props = {
  tripDetails: Trip;
  allTrips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
};

function TripCard({ tripDetails, allTrips, setTrips }: Props) {
  const VITE_SERVER_URL: String = import.meta.env.VITE_SERVER_URL as string;
  const navigate = useNavigate();

  async function HandleDelete(): Promise<void> {
    try {
      const response = await axios.delete(
        `${VITE_SERVER_URL}/api/trips/${tripDetails.id}`
      );
      setTrips(allTrips.filter((t) => t.id !== tripDetails.id));
    } catch (error) {
      console.log(error);
    }
  }

  function HandleEdit(): void {
    navigate(`/trips/edit/${tripDetails.id}`);
  }

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 100 }}
        image={"public/placeholder-trip-image.jpeg"}
        title="trip image"
      />
      <CardContent>
        <Link to={`/trips/${tripDetails.id}`}>
          <Typography gutterBottom variant="h6" component="div">
            {tripDetails.title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {tripDetails.highlights}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            HandleEdit();
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={() => {
            HandleDelete();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default TripCard;
