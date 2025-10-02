import {
  Autocomplete,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Box,
} from "@mui/material";

type Props = {
  searchTitle: string;
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>;

  filterFave: string;
  setFilterFave: React.Dispatch<React.SetStateAction<string>>;

  filterTags: string; // MUST always be an array
  setFilterTags: React.Dispatch<React.SetStateAction<string>>;
};

// Hard-coded tags
const ALL_TAGS: string[] = [
  "FOOD",
  "HISTORIC",
  "PARTY",
  "DILLAN_SPECIAL",
  "SEASON_SUMMER",
  "SEASON_WINTER",
  "SEASON_ALL",
];

function SearchBar({
  searchTitle,
  setSearchTitle,
  filterFave,
  setFilterFave,
  filterTags,
  setFilterTags,
}: Props) {
  const safeTags =
    typeof filterTags === "string" && filterTags.length
      ? filterTags.split("-")
      : [];

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        m={2}
        p={2}
        alignItems="center"
        flexWrap="wrap"
        sx={{ maxWidth: 900 }}
      >
        <TextField
          label="Search title"
          fullWidth
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          sx={{ minWidth: 150 }}
        />

        <Autocomplete<string, true, false, false>
          multiple
          options={ALL_TAGS}
          value={safeTags}
          onChange={(_, newValue) => setFilterTags((newValue ?? []).join("-"))}
          getOptionLabel={(opt) => opt ?? ""}
          isOptionEqualToValue={(opt, val) => opt === val}
          disableCloseOnSelect
          renderTags={(selected = [], getTagProps) =>
            selected.map((tag, index) => (
              <Chip
                label={tag}
                variant="outlined"
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Select tags" />
          )}
          fullWidth
        />

        <FormControlLabel
          label="Only favourites"
          control={
            <Switch
              checked={filterFave === "true"}
              onChange={(e) => setFilterFave(e.target.checked ? "true" : "")}
            />
          }
        />
      </Stack>
    </Box>
  );
}

export default SearchBar;
