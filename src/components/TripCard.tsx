import { Trip } from "../types";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  tripDetails: Trip;
};

// const [photo, setPhoto] = useState<String>("");

// useEffect(() => {}, []);

function TripCard({ tripDetails }: Props) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 100 }}
        image={"public/placeholder-trip-image.jpeg"}
        title="trip image"
      />
      <CardContent>
        <Link to={`/trip/${tripDetails.id}`}>
          <Typography gutterBottom variant="h6" component="div">
            {tripDetails.title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {tripDetails.highlights}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default TripCard;
