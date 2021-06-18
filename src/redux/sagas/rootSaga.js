import { takeLatest } from "@redux-saga/core/effects";
import { getGenres } from '../GenresSlice';
import { handleGetGenres } from './handlers/handleFetchGenres';

export function* watcherSaga() {
    yield takeLatest(getGenres.type, handleGetGenres);
};