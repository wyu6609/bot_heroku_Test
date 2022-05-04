import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import BotRating from "./BotRating";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

export default function ReviewForm({ handleSubmit }) {
  //rating state
  const [value, setValue] = React.useState(null);
  const [description, setDescription] = React.useState("");

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate>
            <TextField
              margin="normal"
              multiline
              rows={4}
              label="Review Description"
              value={description}
              onChange={handleChange}
              autoFocus
            />
            <BotRating value={value} setValue={setValue} />
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => {
                handleSubmit(description, value);
              }}
            >
              Submit Review
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
