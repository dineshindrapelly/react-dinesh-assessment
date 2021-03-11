import { spawn } from 'redux-saga/effects';
import metricsSaga from '../Features/Dashboard/saga';

export default function* root() {
  yield spawn(metricsSaga);
}
