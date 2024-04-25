import {all, fork} from 'redux-saga/effects'
import { watchFetchUsers, watchSignIn, watchSignUp, watchUpdateProfile } from '../features/users/userSaga';


const rootSaga = function*() {
    yield all([
        fork(watchSignUp),
        fork(watchSignIn),
        fork(watchFetchUsers),
        fork(watchUpdateProfile),
    ]);
}

export default rootSaga;