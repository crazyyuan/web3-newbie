import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Autocomplete, Button, TextField } from "@mui/material";

const options = ["Option 1", "Option 2"];

export default function SimpleContainer() {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const handleSetStatus = async () => {
    console.log("handleSetStatus");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", marginTop: 5 }}>
          <ConnectButton />
        </Box>
        <Box display="flex" sx={{ marginTop: 5 }}>
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="当前状态" />}
          />
          <Button variant="outlined" onClick={handleSetStatus}>
            SET
          </Button>
        </Box>

        <Box sx={{ marginTop: 5 }}>
          <Button variant="outlined">Mint</Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
