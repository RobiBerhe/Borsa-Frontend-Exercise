import { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignUpForm from "./Form";
import { UserType } from "../../users/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { signUp } from "../../users/usersSlice";
import { StatusBar as SB } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../../../../App";

// we can actually refactor this one even a more like taking out the location retrieval code into user store for example
const SignupPage: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [permissionStatus, setPermissionStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [address, setAddress] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isLoading, currentUser } = useAppSelector((state) => state.user);
  const navigation = useNavigation<RootNavigationProps>();

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status !== "granted") {
      setErrorMsg("Permission denied to access location");
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    setLocation(location);
    setErrorMsg("");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
      );
      const { address } = response.data;
      if (!address) return;
      console.log("response :> ", response.data);
      const city = address.city
        ? address.city
        : address.state_district
        ? address.state_district
        : address.display_name
        ? address.display_name
        : "";
      setAddress(city.concat(",".concat(address.country)));
    })();

    if (currentUser) navigation.replace("signin");
  }, []);

  const signup = (formdata: UserType) => {
    console.log("handle submit has been called!!!", formdata);
    dispatch(signUp(formdata));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* will display a button for when a location access permission has't been granted asking for a permission */}
        {permissionStatus !== "" && permissionStatus !== "granted" ? (
          <Button
            title="Request location"
            onPress={requestLocationPermission}
          />
        ) : (
          ""
        )}
        {errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : ""}
        <View style={styles.form}>
          <KeyboardAwareScrollView>
            <SignUpForm
              handleSignIn={() => navigation.replace("signin")}
              loading={isLoading}
              handleFormSubmit={signup}
              defaultAddress={address}
            />
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 6,
    color: "black",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    height: 40,
    marginTop: 8,
    marginBottom: 8,
    borderColor: "#000",
    borderRadius: 6,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: SB.currentHeight,
  },
});

export default SignupPage;
