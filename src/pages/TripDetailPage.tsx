import { Box, Typography } from "@mui/material";
import HeaderBar from "../components/HeaderBar";

function TripDetailPage() {
  return (
    <>
      <HeaderBar />
      <Box maxWidth={300}>
        <Typography variant={"h1"}>Title</Typography>
      </Box>
    </>
  );
}
export default TripDetailPage;
