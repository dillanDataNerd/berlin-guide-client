import { Trip } from "../types";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

function NewElementCard() {
  return (
    <Card
      sx={{
        width: 250,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <CardContent>
        <Link to={`/trips/new`}>
          <ControlPointIcon
            sx={{ fontSize: 200, height: 100, color: "grey.600" }}
          />
        </Link>
        {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {tripDetails.highlights}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default NewElementCard;
