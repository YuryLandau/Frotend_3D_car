
import { useTranslation } from "react-i18next"
import { GpsRequestRoot } from "../../types"
import { formatDuration } from "../../utils/formatDuration"

interface MenuContainerTypes {
    coursesData: GpsRequestRoot | null
    setCourse: React.Dispatch<React.SetStateAction<number>>
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
    isPlaying: boolean
}

function MenuContainer({ coursesData, isPlaying, setCourse, setIsPlaying }: MenuContainerTypes) {

    const { t } = useTranslation()

    return (
        <div className='paths-container'>
            <span>{t("sidebar_title")}</span>
            {
                coursesData &&
                coursesData.courses.map((course, index) => {
                    return (
                        <button key={index} onClick={() => { setCourse(index) }}>
                            <div className="route-card">
                                <div className="card-car-picture">
                                    <img src={coursesData.vehicle.picture.address} alt={t("vehicle_picture")} />
                                </div>

                                <div className="card-informations">

                                    <span className="route-title">{t("route_title")}{index + 1}</span>
                                    <span className="route-distance">{t("route_distance")}{course.distance} {t("meters")}</span>
                                    <span className="route-stops">{t("route_stops")}{course.stops}</span>
                                    <span className="route-duration">{t("route_duration")}{formatDuration(course.duration)}</span>
                                </div>
                            </div>
                        </button>
                    )
                })
            }
            <button className="start-travel" onClick={() => setIsPlaying(true)} disabled={isPlaying}>
                {t("start_route")}
            </button>
        </div>
    )
}

export default MenuContainer