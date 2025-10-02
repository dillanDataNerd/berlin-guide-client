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

  // stored as hyphen-joined string, e.g. "FOOD-PARTY"
  filterTags: string;
  setFilterTags: React.Dispatch<React.SetStateAction<string>>;
};

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
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          p: 2,
          flexWrap: "nowrap", // ✅ keep all on one line
          overflowX: "auto", // allow scroll if too narrow
          "& > *": { flexShrink: 0 }, // don't squish items
        }}
      >
        <TextField
          label="Search title"
          size="small"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          sx={{ width: 220 }}
        />

        <Autocomplete<string, true, false, false>
          multiple
          size="small"
          limitTags={2} // keep row compact
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
                size="small"
                variant="outlined"
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Select tags" />
          )}
          sx={{ width: 340 }}
        />

        <FormControlLabel
          label="Only favourites"
          sx={{ m: 0 }}
          control={
            <Switch
              size="small"
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
