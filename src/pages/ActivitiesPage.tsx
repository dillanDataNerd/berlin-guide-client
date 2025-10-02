import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Activity } from "../types";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";

interface ImportMetaEnv {
  VITE_SERVER_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

let timeoutId: number;

function ActivitiesPage() {
  const VITE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTitle, setSearchTitle] = useState<string | null>(
    searchParams.get("title") || ""
  );
  const [filterFave, setFilterFave] = useState<string | null>(
    searchParams.get("fav")
  );
  const [filterTags, setFilterTags] = useState<string>(
    searchParams.get("tags") || ""
  );
  const [activities, setActivities] = useState<Activity[]>([]);

  async function getActivities() {
    try {
      console.log(`${VITE_SERVER_URL}/api/activities/search/?${searchParams}`);
      const response = await axios.get<Activity[]>(
        `${VITE_SERVER_URL}/api/activities/search/?${searchParams}`
      );
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function getQeury(): void {
    const title: string | null = searchTitle;
    const fave: string | null = filterFave;
    const tags: string | null = filterTags;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearchParams({
        ...(title ? { title } : {}),
        ...(fave ? { fave } : {}), // only add fav if truthy
        ...(tags ? { tags } : {}), // only add tags if truthy
      });
    }, 300);
  }

  useEffect(() => {
    getQeury();
  }, [searchTitle, filterFave, filterTags]);

  useEffect(() => {
    getActivities();
  }, [searchParams]);
  //second use effect iwth get activities triggered on new searchparams
  //run debouncing with timeout.

  return (
    <>
      <HeaderBar />
      <Box justifyContent={"center"}>
        <SearchBar
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          filterFave={filterFave}
          setFilterFave={setFilterFave}
          filterTags={filterTags}
          setFilterTags={setFilterTags}
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
