import { call, put } from 'redux-saga/effects';
import { setGenres } from '../../GenresSlice';
import { getFetchGenre } from '../requests/requestGetGenres';
 
export function* handleGetGenres(action) {
    try {
        const response = yield call(getFetchGenre);
        yield put(setGenres({response}));
    } catch (err) {
        console.log(err);
    }
};


