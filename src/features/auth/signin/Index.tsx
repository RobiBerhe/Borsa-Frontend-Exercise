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
  const { isLoading } = useAppSelector(
    (state) => state.user
  );
  const handleSignin = (formData: SignInUser) => {
    dispatch(signIn(formData));
  };

  useEffect(() => {
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
