import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Activity } from "../types";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";

function ActivitiesPage() {
  const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

  async function getActivities() {
    try {
      const response = await axios.get<Activity[]>(
        `${VITE_SERVER_URL}:5005/api/activities`
      );
      setActivities(response.data);
      console.log(activities);
    } catch (error) {
      console.error(error);
    }
  }

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    getActivities();

    return () => {};
  }, []);

  return (
    <>
      <HeaderBar />

      <Grid container spacing={2} justifyContent={"center"}>
        {activities.map((element: Activity) => {
          console.log(element);
          return <ActivityCard key={element.id} activityDetails={element} />;
        })}
      </Grid>
    </>
  );
}
export default ActivitiesPage;
