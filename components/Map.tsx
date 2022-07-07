import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { css } from "@emotion/react";
import "mapbox-gl/dist/mapbox-gl.css";

interface Marker {
  title: string | undefined;
  slug: string | undefined;
  location: { longitude: number; latitude: number };
}

interface Props {
  markers: Array<Marker | null>;
}

const markerCSS = css`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 0.2rem 0.4rem;
  font-size: 0.75rem;
  position: relative;
  top: 100%;
  right: 50%;
  transform: translateY(1rem);
  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: calc(50% - 0.5rem);
    border-width: 0 0.5rem 0.5rem 0.5rem;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;

const Map = ({ markers }: Props) => {
  const [viewport, setViewport] = useState({
    latitude: 35.79389191338007,
    longitude: 43.95788033520085,
    width: 800,
    height: 640,
    zoom: 8.25,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/hyneks/ckj71k0zp373b19oa4ovh189w"
      onViewportChange={setViewport}
    >
      {markers.map((site) => {
        if (!site) return null;
        let { longitude, latitude } = site.location;
        return (
          <Marker key={site.title} latitude={latitude} longitude={longitude}>
            <div css={markerCSS}>{site.title}</div>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
};

export default Map;
