import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const WeatherMap = (props) => {
    if (!props.weather.latitude) return <div />;

    const lat = Number.parseFloat(props.weather.latitude);
    const lng = Number.parseFloat(props.weather.longitude);

    return (
        <div>
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{ lat, lng }}
            >
                <Marker position={{ lat, lng }} />
            </GoogleMap>
        </div>
    );
};

export default withScriptjs(withGoogleMap(WeatherMap));
