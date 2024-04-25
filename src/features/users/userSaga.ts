import { PayloadAction } from "@reduxjs/toolkit";
import {
  SIGNUP_USER,
  SIGNIN_USER,
  UserType,
  SignInUser,
  FETCH_USERS,
  UserUpdateType,
  UPDATE_PROFILE,
} from "./types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../constants";
import { put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersError,
  fetchUsersSuccess,
  signUpError,
  signUpSuccess,
  updateProfileError,
  updateProfileSuccess,
  userSignInError,
  userSignInSignUpSuccess,
} from "./usersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* signUpSaga(action: PayloadAction<UserType>) {
  try {
    const response: AxiosResponse<any> = yield axios.post(
      `${API_URL}/register/v2`,
      { ...action.payload }
    );
    yield put(signUpSuccess(response.data));
  } catch (error) {
    console.log("error :> ", error);
    if (Array.isArray(error)) {
      yield put(signUpError(error));
    }
  }
}

function* signInSaga(action: PayloadAction<SignInUser>) {
  try {
    const response: AxiosResponse<any> = yield axios.post(
      `${API_URL}/login`,
      action.payload
    );
    if (response.data && response.data._id) {
      AsyncStorage.setItem("user_id", response.data._id);
      AsyncStorage.setItem("email", response.data.email);
      AsyncStorage.setItem(
        "fullName",
        response.data.firstName.concat(" ").concat(response.data.lastName)
      );
      AsyncStorage.setItem("userName", response.data.userName);
      AsyncStorage.setItem("address", response.data.address);
      AsyncStorage.setItem("profilePic", response.data.profilePic);
    }
    yield put(userSignInSignUpSuccess(response.data));
  } catch (error) {
    console.log("error :> ", error);
    const err = error as AxiosError;
    const { response } = err;
    const data: any = response?.data;

    if (response && data && data && data.message) {
      let { message } = data;
      if (message) yield put(userSignInError(message));
    } else {
      yield put(
        userSignInError(
          "Some error has occured, please try again a while later"
        )
      );
    }
  }
}

function* fetchUsersSaga(
  action: PayloadAction<{ limit: number; page: number }>
) {
  try {
    const response: AxiosResponse<any> = yield axios.get(
      `${API_URL}/fetch/dummy/user-v2?page=${action.payload.page}&limit=${action.payload.limit}`
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    console.log("Error while fetching users :> ", error);
    yield put(fetchUsersError("Some error must have occured"));
  }
}

function* updateProfile(action: PayloadAction<UserUpdateType>) {
  try {
    const { _id, ...formData } = action.payload;
    const response: AxiosResponse<any> = yield axios.put(
      `${API_URL}/profile?id=${action.payload._id}`,
      formData
    );
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    console.log("Error while updating user :> ", error);
    yield put(
      updateProfileError("Some error has occured while updating your profile")
    );
  }
}

export function* watchSignUp() {
  yield takeLatest(SIGNUP_USER, signUpSaga);
}

export function* watchSignIn() {
  yield takeLatest(SIGNIN_USER, signInSaga);
}

export function* watchFetchUsers() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}

export function* watchUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE, updateProfile);
}
