import { createSlice } from "@reduxjs/toolkit";
import { IUsersState, SignInUser, USERS, UserType, UserUpdateType } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IUsersState = {
  usersList: {data:[],limit:10,page:1,total:0,totalSeen:0},
  isLoading: false,
  errors: [],
};

export const userSlice = createSlice({
  name: USERS,
  initialState,
  reducers: {
    signUp: (state: IUsersState, action: PayloadAction<UserType>) => {
      state.isLoading = true;
      state.errors = "";
    },
    signUpSuccess: (state: IUsersState, action: PayloadAction<UserType>) => {
      state.isLoading = false;
      state.errors = [];
      state.currentUser = action.payload;
    },
    signUpError: (
      state: IUsersState,
      action: PayloadAction<string[] | string>
    ) => {
      state.isLoading = false;
      state.errors = action.payload;
      state.currentUser = undefined;
    },

    /** Sign in user reducers */
    signIn: (state: IUsersState, action: PayloadAction<SignInUser>) => {
      state.isLoading = true;
      state.errors = [];
    },
    userSignInSignUpSuccess: (
      state: IUsersState,
      action: PayloadAction<UserType>
    ) => {
      state.isLoading = false;
      state.errors = [];
      state.currentUser = action.payload;
    },

    userSignInError: (
      state: IUsersState,
      action: PayloadAction<string[] | string>
    ) => {
      state.isLoading = false;
      state.errors = action.payload;
    },

    signOut:(state:IUsersState,action:PayloadAction<any>)=>{
    },

    fetchUsers:(state:IUsersState,action:PayloadAction<{page:number,limit:number}>)=>{
      state.errors = "";
      state.isLoading = true;
      state.usersList.data = [];
      state.usersList.limit = action.payload.limit;
      state.usersList.page = action.payload.page;
    },
    fetchUsersSuccess:(state:IUsersState,action:PayloadAction<{data:UserType[],total:number}>)=>{
      state.usersList.data = action.payload.data;
      state.usersList.total = action.payload.total;
      state.usersList.totalSeen = state.usersList.totalSeen + action.payload.data.length;
      state.isLoading = false;
      state.errors = "";
    },
    fetchUsersError:(state:IUsersState,action:PayloadAction<string[]| string>)=>{
      state.isLoading = false;
      state.errors = action.payload;
    },

    updateProfile:(state:IUsersState,action:PayloadAction<UserUpdateType>)=>{
      state.isLoading = true;
      state.errors = "";
    },

    updateProfileSuccess:(state:IUsersState,action:PayloadAction<UserType>)=>{
      state.isLoading = false;
      state.currentUser = action.payload;
      state.errors = "";
    },

    updateProfileError:(state:IUsersState,action:PayloadAction<string[] | string>)=>{
      state.isLoading = false;
      state.errors = action.payload;
    }

  },
});

export const {
  signUp,
  signUpSuccess,
  signUpError,
  signIn,
  userSignInSignUpSuccess,
  userSignInError,
  signOut,
  fetchUsers,
  fetchUsersSuccess,
  updateProfile,
  updateProfileSuccess,
  updateProfileError,
  fetchUsersError,
} = userSlice.actions;

export default userSlice.reducer;
