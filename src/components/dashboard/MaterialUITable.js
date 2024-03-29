import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

function CustomizedTable(props) {
    const { classes } = props;

    const getTableCell = (text, index = 0) => {
        return <CustomTableCell key={index} align="right">{text}</CustomTableCell>
    };

    const getTableHead = () => {
        const tableHeaders = ['Area', 'Current Temperature', 'Max Temperature', 'Min Temperature', 'Weather'];

        return (
            <TableHead>
                <TableRow>
                    {_.map(tableHeaders, getTableCell)}
                </TableRow>
            </TableHead>
        );
    };

    const getTableRows = () => {
        const { classes, weather: { data } } = props;
        const weatherData = _.head(data.consolidated_weather);
        const objectKeys = ['the_temp', 'max_temp', 'min_temp', 'weather_state_name'];

        return (
            <TableBody>
                <TableRow className={classes.row}>
                    <CustomTableCell component="th" scope="row">{data.title}</CustomTableCell>
                    {
                        _.map(objectKeys, (key, index) => {
                            return getTableCell(typeof weatherData[key] === 'number' ? `${Math.floor(weatherData[key])}°C` : weatherData[key], index)
                        })
                    }
                </TableRow>
            </TableBody>
        );
    };

    if (!props.weather.name) return <div />;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                {getTableHead()}
                {getTableRows()}
            </Table>
        </Paper>
    );
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
