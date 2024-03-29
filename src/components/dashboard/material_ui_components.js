import React  from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function CircularIndeterminate(props) {
    const { classes } = props;
    return (
        <div className="loading">
            <CircularProgress className={classes.progress} />
        </div>
    );
}

export default withStyles(styles)(CircularIndeterminate);
