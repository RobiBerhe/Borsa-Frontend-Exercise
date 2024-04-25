export type UserType = {
    _id?:string,
    firstName:string,
    lastName:string,
    email:string,
    userName:string,
    password:string,
    address:string,
    profilePic?:string,
    isBuyer:boolean
}

export type UserUpdateType = {
    _id?:string,
    firstName:string,
    lastName:string,
    email:string,
    userName:string,
    address:string,
    profilePic?:string,
    isBuyer:boolean
}

export type SignInUser = {
    email:string,
    password:string
}

export interface IUserState{
    data:UserType | null,
    isLoading:boolean,
    errors:string,
}


type UsersList = {
    data:UserType[],
    page:number,
    limit:number,
    total:number,
    totalSeen:number,
}
// the users gobal state representation.
export interface IUsersState {
    // usersList:UserType[],
    usersList:UsersList,
    isLoading:boolean,
    errors:string[] | string,
    currentUser?:UserType
}

export const USERS = "USERS";
export type USERS = typeof USERS;

export const GET_USERS = `${USERS}/getUsersAction`;
export type GET_USERS = typeof GET_USERS;


export const SIGNUP_USER = `${USERS}/signUp`;
export type SIGNUP_USER = typeof SIGNUP_USER;

export const SIGNIN_USER = `${USERS}/signIn`;
export type SIGNIN_USER = typeof SIGNUP_USER;

export const FETCH_USERS = `${USERS}/fetchUsers`;
export type FETCH_USERS = typeof FETCH_USERS;


export const UPDATE_PROFILE = `${USERS}/updateProfile`;
export type UPDATE_PROFILE = typeof UPDATE_PROFILE;