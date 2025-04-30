
import { GpsRequestRoot } from "../../types"
import { formatDuration } from "../../utils/formatDuration"

interface MenuContainerTypes {
    coursesData: GpsRequestRoot | null
    setCourse: React.Dispatch<React.SetStateAction<number>>
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
    isPlaying: boolean
}

function MenuContainer({ coursesData, isPlaying, setCourse, setIsPlaying }: MenuContainerTypes) {
    return (
        <div className='paths-container'>
            <span>Selecione uma rota</span>
            {
                coursesData &&
                coursesData.courses.map((course, index) => {
                    return (
                        <button key={index} onClick={() => { setCourse(index) }}>
                            <div className="course-card">
                                <div className="card-car-picture">
                                    <img src={coursesData.vehicle.picture.address} alt="Vehicle picture" />
                                </div>

                                <div className="card-informations">

                                    <span className="route-title">Rota {index + 1}</span>
                                    <span className="route-distance">Distância: {course.distance}</span>
                                    <span className="route-stops">Paradas: {course.stops}</span>
                                    <span className="route-stops">Duração: {formatDuration(course.duration)}</span>
                                </div>
                            </div>
                        </button>
                    )
                })
            }
            <button className="start-travel" onClick={() => setIsPlaying(true)} disabled={isPlaying}>
                Iniciar a viagem
            </button>
        </div>
    )
}

export default MenuContainer