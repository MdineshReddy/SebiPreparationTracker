import React from "react";
import Tracker from "./Tracker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Tracker />
    </ThemeProvider>
  );
}

export default App;
