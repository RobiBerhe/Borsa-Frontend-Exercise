import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from "./rootSaga";
import userReducer from '../features/users/usersSlice'
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        user:userReducer
    },
    middleware:getDefaultMiddleware => getDefaultMiddleware({
        thunk:false,
        serializableCheck:false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;