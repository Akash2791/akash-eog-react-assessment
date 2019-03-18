import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import CircularLoading from "./material_ui_components";
import WeatherInfoContainer from "./WeatherInfoContainer";
import * as actions from "../../store/actions";

import './dashboard.scss';


class Dashboard extends Component {
    timeOutId = null;

    state = {
        pollingId: null,
        cityIndex: 0,
        error: false,
        weather: {}
    };

    componentDidMount() {
        this.pollForDronePosition();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({ weather: this.props.weather });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeOutId);
    }

    pollForDronePosition = () => {
        const { cityIndex } = this.state;
        this.props.fetchDronePosition(cityIndex);

        this.timeOutId = setTimeout(this.pollForDronePosition, 5000);
        this.setState({ cityIndex: cityIndex >= 9 ? Math.floor(cityIndex / 10) : cityIndex + 1 });
    };

    render() {
        const { error, weather } = this.state;

        if (error) return <div />;

        if (_.isEmpty(weather)) return <CircularLoading />;

        return (
            <WeatherInfoContainer />
        );
    }
}
const mapStateToProps = state => ({
    weather: _.get(state, 'weather', {})
});

const mapDispatchToProps = dispatch => ({
    fetchDronePosition: (cityIndex) => dispatch({ type: actions.FETCH_DRONE, cityIndex })
});

export default connect(mapStateToProps,  mapDispatchToProps)(Dashboard);
