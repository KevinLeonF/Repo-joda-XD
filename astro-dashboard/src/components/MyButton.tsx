import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Mybutton() {
  return (
    <Stack spacing={2} direction="row">
      <Button color="primary" variant="contained">
        Primary
      </Button>
      <Button variant="text">Text</Button>
      <Button variant="contained" color="primary">
        Contained
      </Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
    </Stack>
  );
}
