import { AdvancedMarker, APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';

import { m } from '@/paraglide/messages';
import { geoCoordinates } from '@/types';

const BusinessMap = () => {
  return (
    <section aria-label={m.contact_map_label()}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          defaultCenter={geoCoordinates}
          defaultZoom={15}
          gestureHandling="cooperative"
          disableDefaultUI
          mapId="map-id"
          className="h-90 w-full"
        >
          <AdvancedMarker position={geoCoordinates} />
        </GoogleMap>
      </APIProvider>
    </section>
  );
};

export default BusinessMap;
