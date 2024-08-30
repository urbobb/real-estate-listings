"use client";
import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const center = {
  lat: 41.887813632611916,
  lng: 12.473113833760484,
};

function GoogleMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //const bounds = new window.google.maps.LatLngBounds(center);
    map.setCenter(center);
    console.log("Map Comppnent Loaded...");

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF position={center} onLoad={() => console.log("Marker Loaded")} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapComponent);
