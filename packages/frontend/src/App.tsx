import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import './App.scss';
import { CityMap } from './components/CityMap';
import LangSwitch from './components/LangSwitch';
import PathsContainer from './components/PathsContainer';
import { useVehicleAnimator } from './hooks/useVehicleAnimation';
import { GpsRequestRoot } from './types';

function App() {
  const [course, setCourse] = useState<number>(0)
  const [coursesData, setCoursesData] = useState<GpsRequestRoot | null>(null);;

  const currentCourse = coursesData?.courses[course]
  const stopCoordinates: [number, number][] =
    currentCourse?.stop_points?.coordinates
      ?.filter((coord): coord is [number, number, number, unknown?, unknown?] =>
        typeof coord[0] === 'number' && typeof coord[1] === 'number'
      )
      .map(([lng, lat]) => [lat, lng]) ?? [];

  const pathCoordinates: LatLngExpression[] =
    currentCourse?.gps.map((point) => [point.latitude, point.longitude]) ?? [];

  const [isPlaying, setIsPlaying] = useState(false);

  const { position, angle } = useVehicleAnimator(currentCourse?.gps ?? [], isPlaying);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => setCoursesData(data));
  }, []);

  useEffect(() => {
    setIsPlaying(false);
  }, [course]);

  return (
    <main>
      <div className='sidebar-container'>
        <LangSwitch />

        <PathsContainer
          coursesData={coursesData}
          isPlaying={isPlaying}
          setCourse={setCourse}
          setIsPlaying={setIsPlaying}
        />
      </div>

      {/* Implementando mapa */}
      <CityMap
        position={position}
        angle={angle}
        pathCoordinates={pathCoordinates}
        stops={stopCoordinates} />

    </main>
  )
}

export default App
