import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { watcherSaga } from './sagas/rootSaga';
import genreSlice from './GenresSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    genre: genreSlice,
})

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware],
});

sagaMiddleware.run(watcherSaga);

export default store;