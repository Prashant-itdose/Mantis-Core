import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VoiceNavigation.css";
import { useDispatch } from "react-redux";
import { Tooltip } from "primereact/tooltip";
import startSound from "./google-assistant.mp3";
import { useTranslation } from "react-i18next";
import Loading from "../components/loader/Loading";
import { useSelector } from "react-redux";
import { speakMessage } from "../utils/utils";
const VoiceNavigation = () => {
  const { GetRoleList } = useSelector((state) => state?.CommonSlice);
  // console.log("GetRoleList Voice", GetRoleList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);
  // console.log("check", isListening);

  const [recognizedText, setRecognizedText] = useState("");
  // console.log("recognizedText", recognizedText);

  const [blast, setBlast] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);

  const { t } = useTranslation();
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (!recognition) {
    return;
  }

  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const startListening = () => {
    if (isListening) {
      recognition.stop();
      setBlast(false);
      setIsListening(false);
      setRecognizedText("");
      setTimeoutID(null);
    } else {
      const audio = new Audio(startSound);
      audio.play();

      setIsListening(true);
      setRecognizedText("Listening...");
      setBlast(false);

      try {
        recognition.start();
      } catch (err) {
        console.error("Speech recognition error:", err);
        setBlast(false);
        setIsListening(false);
        return;
      }

      const timeout = setTimeout(() => {
        recognition.stop();
      }, 10000);

      setTimeoutID(timeout);
    }
  };

  // const speakText = (text) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "en-US";
  //   speechSynthesis.speak(utterance);
  //   return new Promise((resolve) => {
  //     utterance.onend = resolve;
  //   });
  // };

  recognition.onend = () => {
    setIsListening(false);
    clearTimeout(timeoutID);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    setBlast(false);
    setIsListening(false);
    setRecognizedText("");
  };

  recognition.onresult = async (event) => {
    let interimText = "";
    for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        const finalCommand = result[0].transcript.toLowerCase();
        setRecognizedText(finalCommand);
        setBlast(true);

        if (finalCommand?.toLowerCase()?.includes("logout"))
          speakMessage("Logout Successfully");
        if (finalCommand.includes("open dashboard")) {
          speakMessage(`Opening : ${getText(finalCommand)} Page`);
          setBlast(false);
          navigate("/dashboard");
        } else if (finalCommand?.toLowerCase()?.includes("logout")) {
          // localStorage.clear();
          // sessionStorage.clear();
          navigate("/login");
        } else if (finalCommand) {
          let urlObj = {};
          GetRoleList?.map((val) => {
            val?.Files?.map((item) => {
              if (
                item?.DispName?.toLowerCase() === finalCommand?.toLowerCase()
              ) {
                urlObj = item;
              }
            });
          });

          if (urlObj?.DispName) {
            navigate(urlObj?.URLName);
            speakMessage(`Opening : ${getText(finalCommand)} Page`);
          } else {
            // speakMessage(`${getText(finalCommand)} Page Not Found`);
            speakMessage("This Page Not Found");
          }
          setBlast(false);
          // navigate(path);
        } else {
          setBlast(false);
        }
      } else {
        interimText += result[0].transcript;
      }
    }
    setRecognizedText(interimText);
  };

  const getText = (text) => {
    const page = text?.replace("open ", "")?.trim();
    const formattedPage = page.replace(/\s+/g, "");
    return formattedPage;
  };

  return (
    <div>
      <span onClick={startListening} disabled={isListening}>
        {isListening ? (
          <i className="fa fa-microphone text-white pulsating" />
        ) : (
          <>
            <i
              className="fa fa-microphone text-white"
              data-pr-tooltip={t("Say Open `PageName`")}
              data-pr-position="bottom"
            />
            <Tooltip target=".fa-microphone" />
          </>
        )}
      </span>
      {blast && <Loading />}
      {isListening && recognizedText && (
        <div className={`voice-popup ${blast ? "blast" : ""}`}>
          <p className={recognizedText === "Listening..." ? "listening" : ""}>
            {recognizedText}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceNavigation;
