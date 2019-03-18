import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import WeatherMap from './WeatherMap';
import MaterialUITable from './MaterialUITable';

class WeatherInfoContainer extends Component {
    state = {
        error: false,
        weather: {}
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({ weather: this.props.weather });
        }
    }

    render() {
        const { error, weather } = this.state;

        if (error) return <div />;

        if (_.isEmpty(weather)) return <div />;

        return (
            <div className="map-table-wrapper">
                <WeatherMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    weather={weather}
                />
                <MaterialUITable weather={weather} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    weather: _.get(state, 'weather', {})
});

export default connect(mapStateToProps)(WeatherInfoContainer);
