import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

export default i18next
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'pt',
        resources: {
            en: {
                translation: {
                    home_text: "Edit <code>src/App.tsx</code> and save to test HMR",
                    count_is: "Counter is "
                }
            },
            pt: {
                translation: {
                    home_text: "Edite <code>src/App.tsx</code> e salve para testar o HMR",
                    count_is: "O contador é "
                }
            }
        }
    })
