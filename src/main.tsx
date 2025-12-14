import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      delay: "Delay",
      delayHelp:
        "To achieve minimal latency and the best sound quality, use wired headphones. It's also recommended to experiment with your microphone selection to achieve minimal latency.",
      gain: "Gain",
      pitch: "Pitch",
      ms: "ms",
      help: "Help",
      helpAndSupport: "Help and support",
      record: "Record",
      browserWarning:
        "For proper operation, it is recommended to use a computer and the latest version of the Google Chrome browser",
      headphonesWarning: "Use headphones to prevent echo",
      micWarning: "If the sound quality is poor, try choosing a different microphone",
      delayWarning: "To achieve minimal latency and the best sound quality, use wired headphones",
      noSound: "No sound or poor sound quality",
      noSoundHelp: "Try choosing a different microphone",
      support: "Support",
      consulting: "Get a speech therapy consultation",
    },
  },
  ru: {
    translation: {
      delay: "Задержка",
      delayHelp:
        "Для достижения минимальной задержки и наилудшего качества звука используйте проводные наушники. Так-же для достижения минимальной задержки рекомендуется поэксперементировать с выбором микрофона",
      gain: "Усиление звука",
      pitch: "Тон",
      ms: "мс",
      help: "Помощь",
      helpAndSupport: "Помошь и поддержка",
      record: "Запись",
      browserWarning:
        "Для корректной работы рекомендуется использовать компьютер и браузер Google Chrome последней версии",
      headphonesWarning: "Используйте наушники для предотвращения эхо",
      micWarning: "При плохом качестве звука попробуйте выбрать другой микрофон",
      delayWarning:
        "Для достижения минимальной задержки и наилудшего качества звука используйте проводные наушники",
      noSound: "Нет звука или низкое качество звука",
      noSoundHelp: "Попробуйте выбрать другой микрофон",
      support: "Поддержка",
      consulting: "Получить логопедическую консультацию",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
