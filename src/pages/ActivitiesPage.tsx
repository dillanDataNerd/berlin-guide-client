import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Activity } from "../types";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";

function ActivitiesPage() {
  const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [searchString, setSearchString] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>([]);

  async function getActivities() {
    try {
      const response = await axios.get<Activity[]>(
        `${VITE_SERVER_URL}/api/activities`
      );
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getActivities();

    return () => {};
  }, []);

  return (
    <>
      <HeaderBar />
      <Box justifyContent={"center"}>
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <Grid container spacing={2} justifyContent={"center"}>
          {activities.map((element: Activity) => {
            return <ActivityCard key={element.id} activityDetails={element} />;
          })}
        </Grid>
      </Box>
    </>
  );
}
export default ActivitiesPage;
