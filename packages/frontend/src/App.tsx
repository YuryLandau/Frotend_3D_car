import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
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
  const [count, setCount] = useState<number>(0)
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100); // só pra UX mesmo, pode ignorar

  const currentCourse = selectedCourses.courses[count]

  const pathCoordinates: [LatLngExpression, LatLngExpression] = currentCourse.gps.map((point) => [
    point.latitude,
    point.longitude,
  ]);

  const { position, angle } = useVehicleAnimator(currentCourse.gps);

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
      <CityMap position={position} angle={angle} pathCoordinates={pathCoordinates} />

      <div className='paths-container'>

        {
          selectedCourses.courses.map((course, index) => {
            return (
              <button key={index} onClick={() => { setCount(index) }}>
                <span>Course {index}</span>
              </button>
            )
          })
        }
      </div>

    </>
  )
}

export default App
