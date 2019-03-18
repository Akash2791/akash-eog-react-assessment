import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChipRaw from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.primary.main
  }
});
const Chip = withStyles(cardStyles)(ChipRaw);

class Weather extends Component {
  state = {
    error: null,
    name: '',
    weather_state_name: '',
    temperatureinCelsius: ''
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      const {
        name,
        weather_state_name,
        temperatureinCelsius
      } = this.props;

      this.setState({ name, weather_state_name, temperatureinCelsius });
    }
  }

  render() {
    const { name, weather_state_name, temperatureinCelsius } = this.state;

    if (!name) return <LinearProgress />;

    return (
      <Chip
        label={`Weather in ${name}: ${weather_state_name} and ${temperatureinCelsius}°C`}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    name,
    weather_state_name,
    temperatureinCelsius
  } = state.weather;

  return {
    name,
    weather_state_name,
    temperatureinCelsius
  };
};

export default connect(mapStateToProps)(Weather);
