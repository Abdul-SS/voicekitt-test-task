import React, { useEffect, useState } from "react";
import { Alert, Box, Stack, Badge } from "@mui/material";
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

const TOOLTIP_LANGUAGE = "Allow access to microphone";

const SpeechRecognitionTextGenerator: React.FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [blocked, setBlocked] = useState<boolean>(false);

  const {
    transcribe: transcript,
    isListening,
    toggleListening,
  } = useSpeechRecognition();
  const classes = useStyles();

  useEffect(() => {
    async function getPermission() {
      const permissionStatus = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });

      setBlocked(permissionStatus.state === "denied");
    }

    getPermission();
  }, [isListening]);

  async function handleListening() {
    const permissionStatus = await navigator.permissions.query({
      name: "microphone" as PermissionName,
    });

    if (permissionStatus.state === "granted") {
      toggleListening(!isListening);
      setBlocked(false);
    } else if (permissionStatus.state === "prompt") {
      toggleListening(true);
      setBlocked(true);
    }

    permissionStatus.onchange = () => {
      if (permissionStatus.state === "denied") {
        setShowAlert(true);
        setBlocked(true);
        toggleListening(false);
      } else if (permissionStatus.state === "granted") {
        setBlocked(false);
        setShowAlert(false);
        toggleListening(true);
      }
    };
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
        {transcript && isListening ? (
          <TranscriptText>{transcript}</TranscriptText>
        ) : (
          <PlaceholderText>
            Transcript of voice will show here...
          </PlaceholderText>
        )}
      </Box>
      <SpeechControlsContainer>
        <InstructionText>
          Press here to {isListening && !blocked ? "stop" : "start"}
        </InstructionText>
        <RippleButton
          title={blocked ? TOOLTIP_LANGUAGE : ""}
          sx={buttonStyle}
          color="primary"
          onClick={handleListening}
          disable={blocked.toString()}
          rippleeffect={(isListening && !blocked).toString()}
        >
          {blocked && (
            <Badge
              title={TOOLTIP_LANGUAGE}
              className={classes.disabledBadge}
              color="warning"
              overlap="circular"
              badgeContent="!"
            />
          )}
          {isListening && !blocked ? <Stop /> : <Mic />}
        </RippleButton>
      </SpeechControlsContainer>
    </Stack>
  );
};

export default SpeechRecognitionTextGenerator;
