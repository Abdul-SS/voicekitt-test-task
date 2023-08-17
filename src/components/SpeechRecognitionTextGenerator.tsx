import React, { useState } from "react";
import { Alert, Box, Stack } from "@mui/material";
import { Mic, Stop } from "@mui/icons-material";

import useSpeechRecognition from "../hooks/useSpeechRecognition";

import {
  InstructionText,
  PlaceholderText,
  RippleButton,
  SpeechControlsContainer,
  TranscriptText,
  alertPopupStyle,
  buttonStyle,
  useStyles,
} from "./useStyles";

const SpeechRecognitionTextGenerator: React.FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const {
    transcribe: transcript,
    isListening,
    toggleListening,
  } = useSpeechRecognition();
  const classes = useStyles();

  async function handleListening() {
    const permissionName = "microphone" as PermissionName;
    const request = await navigator.permissions.query({ name: permissionName });

    if (request.state === "denied") {
      setShowAlert(true);
    } else {
      toggleListening();
    }
  }

  return (
    <Stack
      className={classes.container}
      direction={"column"}
      alignItems={"center"}
    >
      {showAlert && (
        <Alert
          severity="info"
          onClose={() => setShowAlert(false)}
          sx={alertPopupStyle}
        >
          To start Speech-to-Text {`"allow"`} access to your microphone in page
          permissions and begin.
        </Alert>
      )}
      <Box className={classes.textContainer}>
        {transcript ? (
          <TranscriptText>{transcript}</TranscriptText>
        ) : (
          <PlaceholderText>
            Transcript of voice will show here...
          </PlaceholderText>
        )}
      </Box>
      <SpeechControlsContainer>
        <InstructionText>
          Press here to {isListening ? "stop" : "start"}
        </InstructionText>
        <RippleButton
          sx={buttonStyle}
          color="primary"
          onClick={handleListening}
          rippleeffect={isListening}
        >
          {isListening ? <Stop /> : <Mic />}
        </RippleButton>
      </SpeechControlsContainer>
    </Stack>
  );
};

export default SpeechRecognitionTextGenerator;