import { DivIcon, LatLngExpression } from 'leaflet';
import { useMemo } from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import './leaflet.scss';

const FRAME_WIDTH = 160
const FRAME_HEIGHT = 40;
const FRAME_DISPLAY_WIDTH = 40; // tamanho visível na tela
const TOTAL_FRAMES = Math.floor(19200 / FRAME_WIDTH);

function getFrameIndex(angle: number): number {
  const normalized = (angle + 360) % 360;
  return Math.round((normalized / 360) * TOTAL_FRAMES) % TOTAL_FRAMES;
}

interface CityMapType {
  position: LatLngExpression,
  angle: number
  pathCoordinates?: LatLngExpression[];
  stops?: [number, number][];
}

export const CityMap = ({ position, angle, pathCoordinates, stops }: CityMapType) => {

  const carIcon = useMemo(() => {

    const frameIndex = getFrameIndex(angle);
    const offsetX = -frameIndex * FRAME_HEIGHT;


    return new DivIcon({
      className: 'car-icon',
      html: `<div class="car-sprite" style="background-position: ${offsetX}px 0;"></div>`,
      iconSize: [FRAME_DISPLAY_WIDTH, FRAME_DISPLAY_WIDTH],
      iconAnchor: [25, 25],
    });
  }, [angle]);

  return (
    <MapContainer style={{
      width: '500px',
      height: '300px'
    }} center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <FitBounds coordinates={pathCoordinates} /> */}

      {/* Traçado do percurso */}
      {
        pathCoordinates &&
        <Polyline
          positions={pathCoordinates}
          pathOptions={{
            color: 'royalblue',
            weight: 5,
            opacity: 0.7,
          }}
        />
      }
      <Marker position={position} icon={carIcon} />
      {stops?.map((coord, i) => (
        <Marker
          key={`stop-${i}`}
          position={coord}
          icon={new DivIcon({
            className: 'stop-marker',
            html: '🅿️',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })}
        />
      ))}
    </MapContainer>
  )
}
