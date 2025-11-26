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
        className="h-90 w-full"
      >
        <AdvancedMarker position={position} />
      </GoogleMap>
    </APIProvider>
  );
};
export default BusinessMap;
