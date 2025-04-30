import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import selectedCourses from '../../backend/frontend_data_gps.json';
import './App.scss';
import { CityMap } from './components/CityMap';
import { useVehicleAnimator } from './hooks/useVehicleAnimation';

const lngs: Record<'en' | 'pt', { nativeName: string }> = {
  en: { nativeName: 'English' },
  pt: { nativeName: 'Português' }
}

function App() {
  const { t, i18n } = useTranslation()
  const [course, setCourse] = useState<number>(0)

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100); // só pra UX mesmo, pode ignorar

  const currentCourse = selectedCourses.courses[course]
  const stopCoordinates: [number, number][] =
    currentCourse?.stop_points?.coordinates
      ?.filter(([lng, lat]) => lng !== null && lat !== null)
      .map(([lng, lat]) => [lat as number, lng as number]) ?? [];

  const pathCoordinates: LatLngExpression[] = currentCourse.gps.map((point) => [
    point.latitude,
    point.longitude,
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { position, angle } = useVehicleAnimator(currentCourse.gps, isPlaying);

  useEffect(() => {
    setIsPlaying(false);
  }, [course]);

  return (
    <>
      <div>
        <div>
          {/* Mapear as linguagens */}
          {Object.keys(lngs).map((lng: string) => {
            return <button
              type='submit'
              key={lng}
              disabled={i18n.resolvedLanguage === lng}
              onClick={() => {
                i18n.changeLanguage(lng)
              }}>
              {lngs[lng as keyof typeof lngs].nativeName}
            </button>
          })}
        </div>
      </div>

      {/* Implementando mapa */}
      <CityMap
        position={position}
        angle={angle}
        pathCoordinates={pathCoordinates}
        stops={stopCoordinates} />

      <div className='paths-container'>

        {
          selectedCourses.courses.map((course, index) => {
            return (
              <button key={index} onClick={() => { setCourse(index) }}>
                <span>Course {index}</span>
              </button>
            )
          })
        }
        <button onClick={() => setIsPlaying(true)} disabled={isPlaying}>
          Iniciar a viagem
        </button>
      </div>

    </>
  )
}

export default App
