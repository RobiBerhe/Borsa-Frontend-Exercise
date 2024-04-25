import { SafeAreaView, StyleSheet, View } from "react-native";
import SignInForm from "./Form";
import { StatusBar as SB } from "react-native";
import { SignInUser } from "../../users/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { signIn } from "../../users/usersSlice";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootNavigationProps>();
  const { currentUser, errors, isLoading } = useAppSelector(
    (state) => state.user
  );

  console.log("USER :> ", currentUser);

  const handleSignin = (formData: SignInUser) => {
    console.log("Signing user in :> ", formData);
    dispatch(signIn(formData));
  };

  useEffect(() => {
    // we'll later use only from the asyncstorage
    // if (currentUser?._id) {
    //   console.log("Currenet user id :> ", currentUser._id);
    //   navigation.replace("home");
    // }
    AsyncStorage.getItem("user_id", (_error: any, result: any) => {
      if (result) navigation.replace("home");
    });
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <SignInForm handleSignup={()=> navigation.replace("signup")} loading={isLoading} handleSignin={handleSignin} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SB.currentHeight,
  },
});

export default SignInPage;
