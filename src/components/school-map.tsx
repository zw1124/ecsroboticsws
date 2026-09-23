"use client";

import { useEffect, useRef, useState } from "react";

const SCHOOL_COORDINATES: [number, number] = [-77.580865, 39.0312299];
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export function SchoolMap() {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !container.current) return;

    let disposed = false;
    let map: import("mapbox-gl").Map | undefined;

    async function createMap() {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;
        if (disposed || !container.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN!;
        map = new mapboxgl.Map({
          container: container.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: SCHOOL_COORDINATES,
          zoom: 13,
          attributionControl: false,
        });
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
        map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
        new mapboxgl.Marker({ color: "#e12634" })
          .setLngLat(SCHOOL_COORDINATES)
          .setPopup(new mapboxgl.Popup({ offset: 22 }).setText("Evergreen Christian School · RobotECS"))
          .addTo(map);
        map.on("load", () => setLoaded(true));
        map.on("error", () => {
          if (!disposed) {
            setFailed(true);
            map?.remove();
            map = undefined;
          }
        });
      } catch {
        if (!disposed) setFailed(true);
      }
    }

    createMap();
    return () => {
      disposed = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="location-map" aria-label="Map of Evergreen Christian School in Leesburg, Virginia">
      {MAPBOX_TOKEN && <div ref={container} className="map-canvas" />}
      {(!MAPBOX_TOKEN || failed || !loaded) && (
        <div className="map-fallback">
          <span className="map-fallback-kicker">LOUDOUN, VIRGINIA / 39.0312° N</span>
          <strong>ROBOTECS</strong>
          <span className="map-fallback-school">EVERGREEN CHRISTIAN SCHOOL</span>
        </div>
      )}
    </div>
  );
}
