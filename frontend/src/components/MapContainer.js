import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const center = { lat: 23.6319, lng: 85.4786 };
const MapContainer = (props) => {
  return (
    <Map google={props.google} zoom={14} initialCenter={center}>
      <Marker position={center} />
    </Map>
  );
};
export default GoogleApiWrapper({
  apiKey: apiKey,
})(MapContainer);
