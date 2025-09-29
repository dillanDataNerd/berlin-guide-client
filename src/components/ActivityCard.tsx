import { Activity } from "../types";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

type Props = {
  activityDetails: Activity;
};

// const [photo, setPhoto] = useState<String>("");

// useEffect(() => {}, []);

function ActivityCard({ activityDetails }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={"public/placeholder-activity-image.jpg"}
        title="activity image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {activityDetails.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {activityDetails.description}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default ActivityCard;
