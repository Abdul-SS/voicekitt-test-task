import { useEffect, useState } from "react";

type ReturnType = {
  isListening: boolean;
  transcribe: string;
  toggleListening: (isListen: boolean) => void;
};

type SpeechRecognitionResult = {
  results: SpeechRecognitionResultList;
};

const SPEECH_LANGUAGE = "en-IN";
const windowObj: Window = window;

function useSpeechRecognition(): ReturnType {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcribe, setTranscribe] = useState<string>("");

  const recognition = new windowObj.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = SPEECH_LANGUAGE;

  async function checkMicrophonePermission() {
    try {
      await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
    } catch (error) {
      console.error("Error checking microphone permission:", error);
    }
  }

  const toggleListening = (isListen: boolean) => {
    setTranscribe("");
    setIsListening(isListen);
  };

  useEffect(() => {
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, []);

  useEffect(() => {
    checkMicrophonePermission();

    recognition.onresult = ({ results }: SpeechRecognitionResult) => {
      const interim = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i][0];

        interim.push(result.transcript);
      }

      setTranscribe(interim.join(" "));
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return {
    isListening,
    transcribe,
    toggleListening,
  };
}

export default useSpeechRecognition;
