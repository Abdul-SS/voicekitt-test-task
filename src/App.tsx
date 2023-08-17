import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import SpeechRecognitionTextGenerator from "./components/SpeechRecognitionTextGenerator";
import themeOptions  from "./theme";

const MainContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}));

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <SpeechRecognitionTextGenerator />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
