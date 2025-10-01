import { Stack, TextField } from "@mui/material";

type Props = {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ searchString, setSearchString }: Props) {
  return (
    <>
      <Stack direction={"row"} spacing={2} m={2} p={2} maxWidth={500}>
        <TextField
          label="Search title"
          fullWidth
          value={searchString ?? ""}
          onChange={(e) => {
            setSearchString(e.target.value);
            console.log(searchString);
          }}
        />
      </Stack>
    </>
  );
}
export default SearchBar;
