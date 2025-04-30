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
                    sidebar_title: "Select a route",
                    vehicle_picture: "Vehicle photo",
                    route_title: "Route",
                    route_distance: "Distance: ",
                    route_stops: "Stops: ",
                    route_duration: "Duration: ",
                    start_route: "Start route",
                    meters: "meters"

                }
            },
            pt: {
                translation: {
                    sidebar_title: "Selecione uma rota",
                    vehicle_picture: "Foto do veículo",
                    route_title: "Rota",
                    route_distance: "Distância: ",
                    route_stops: "Paradas: ",
                    route_duration: "Duração: ",
                    start_route: "Iniciar corrida",
                    meters: "metros"
                }
            }
        }
    })
