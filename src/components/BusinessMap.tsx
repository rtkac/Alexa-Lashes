import { AdvancedMarker, APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

const position = { lat: 48.1115403, lng: 17.1019335 };

const BusinessMap = () => {
  return (
    <APIProvider apiKey="">
      <GoogleMap
        defaultCenter={position}
        defaultZoom={19}
        gestureHandling="greedy"
        disableDefaultUI
        mapId="map-id"
        className="h-80 w-full md:h-full"
      >
        <AdvancedMarker position={position} />
      </GoogleMap>
    </APIProvider>
  );
};
export default BusinessMap;
