import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import _ from 'lodash';
import API from "../api";
import * as actions from "../actions";

function* watchFetchDronePosition(action) {
    const { cityIndex } = action;
    const { error, data } = yield call(API.findDronePosition);

    if (error) {
        yield put({ type: actions.API_ERROR, code: error.code });
        yield cancel();
        return;
    }

    const dronePosition = _.last(_.get(data, 'data'));
    if (_.isNil(dronePosition)) {
        yield put({ type: actions.API_ERROR });
        yield cancel();
        return;
    }

    yield put({ type: actions.FETCH_WEATHER, dronePosition, cityIndex });
}

function* droneSagas() {
    yield all([
        takeEvery(actions.FETCH_DRONE, watchFetchDronePosition)
    ]);
}

export default [droneSagas];
