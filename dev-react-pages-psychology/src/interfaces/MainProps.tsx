import firebase from "firebase";
export interface MainProps {
    refreshUser:()=>void,
    isLoggedIn:Boolean,
     userObj:firebase.User | null
}