import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
  fontSize: 16,
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
}));

const InstructionText = styled(StyledTypography)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: "10px 10px",
  margin: 0,
  marginBottom: 20,
}));

const TranscriptText = styled(StyledTypography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: "10px 20px",
  marginBottom: "0px 10px 0px 0px",
  overflowY: "auto",
}));

const PlaceholderText = styled(StyledTypography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: "normal",
}));

const SpeechControlsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: 40,
  height: "calc(100% - 200px)",
});

const RippleButton = styled(IconButton)(
  ({
    theme,
    rippleeffect,
    disable,
  }: {
    theme?: Theme;
    rippleeffect: string;
    disable: string;
  }) => ({
    [theme ? theme?.breakpoints.down("sm") : ""]: {
      fontSize: 14,
    },
    PointerEvent: disable === "true" ? "none !important" : "auto",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor:
      disable === "true" ? "#e2e2e2 !important" : theme?.palette.secondary.main,
    color: "#000",
    border: "none",
    cursor: "pointer",
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    "::before": {
      content: '""',
      position: "absolute",
      top: "-10px",
      left: "-10px",
      right: "-10px",
      bottom: "-10px",
      border: "3px solid rgba(95, 9, 175, 0.5)",
      borderRadius: "50%",
      PointerEvent: "none",
      transition: rippleeffect === "true" ? "opacity 0.2s ease-in-out" : "",
      WebkitAnimation:
        rippleeffect === "true" ? "ripple 1s infinite ease-in-out" : "",
      animation:
        rippleeffect === "true" ? "ripple 1s infinite ease-in-out" : "",
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(1.5)",
        opacity: 0,
      },
    },
    "@-webkit-keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(1.5)",
        opacity: 0,
      },
    },
    ":focus": {
      outline: 0,
    },
    ":hover": {
      "::before": {
        opacity: 1,
      },
    },
  })
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100%",
  },
  textContainer: {
    height: 200,
    padding: 80,
    paddingLeft: 10,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 10,
    },
  },
  disabledBadge: {
    top: -20,
    right: -30,
  },
}));

const alertPopupStyle = { marginBottom: "20px" };

const buttonStyle = {
  backgroundColor: "background.paper",
  color: "#000",
  ":hover": { backgroundColor: "secondary.main", color: "#000" },
};

export {
  InstructionText,
  PlaceholderText,
  RippleButton,
  SpeechControlsContainer,
  TranscriptText,
  alertPopupStyle,
  buttonStyle,
  useStyles,
};
