import { useCallback, useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignUpForm from "./Form";
import { UserType } from "../../users/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { signUp } from "../../users/usersSlice";
import { StatusBar as SB } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../../../../App";

const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required()
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, { message: "Enter a full name" }),
  username: yup.string().trim().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
  profilePic: yup.string().url(),
});

const SignupPage: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [permissionStatus, setPermissionStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [isBuyer, setIsBuyer] = useState<boolean>(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const {
    control,
    handleSubmit,
    register,
    setValue,
    // formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const { errors, isLoading, currentUser } = useAppSelector(
    (state) => state.user
  );
  const navigation = useNavigation<RootNavigationProps>();

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location request status :> ", status);
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
      console.log("Status : ", status);

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const { latitude, longitude } = location.coords;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
      );
      const { address } = response.data;
      if (!address) return;
      console.log("response :> ", response.data);
      setCountry(address.country);
      const city = address.city
        ? address.city
        : address.state_district
        ? address.state_district
        : address.display_name
        ? address.display_name
        : "";
      setCity(city);
      setAddress(city.concat(",".concat(address.country)));
      setValue("address", `${city}, ${address.country}`);
    })();

    if (currentUser) navigation.replace("signin");
  }, []);

  // let text = "Waiting...";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else {
  //   text = JSON.stringify(location);
  // }

  // const setFormattedAddress = (txt: string) => {
  //   console.log("the txt :> ", txt);
  //   const addr = txt.split(",");
  //   setAddress(addr.join());
  // };

  const signup = (formdata: UserType) => {
    // const data = {...formdata,isBuyer};
    console.log("handle submit has been called!!!", formdata);
    dispatch(signUp(formdata));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <Text>Hello wrold</Text>
      <Text>{text}</Text>
      <Text>
        City : {city},{country}
      </Text> */}
        {permissionStatus !== "" && permissionStatus !== "granted" ? (
          <Button
            title="Request location"
            onPress={requestLocationPermission}
          />
        ) : (
          ""
        )}
        <View style={styles.form}>
          <KeyboardAwareScrollView>
            {/* <Text style={[styles.formLabel]}>Full Name</Text>
          <Controller
            control={control}
            render={({field:{onChange,onBlur,value}}) => (
              <TextInput
                style={[styles.textInput]}
                {...register("fullName")}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="fullName"
          />
          <ErrorMessage
            errors={errors}
            name="fullName"
            render={({ message }) => (
              <Text style={{ color: "red" }}>{message}</Text>
            )}
          />

          <Text style={[styles.formLabel]}>Username</Text>
          <Controller
            control={control}
            render={({field:{onChange,onBlur,value}}) => (
              <TextInput
              autoCapitalize="none"
                style={[styles.textInput]}
                {...register("username", { required: "Username is required"})}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <Text style={{ color: "red" }}>{message}</Text>
            )}
          />
          <Text style={[styles.formLabel]}>Email</Text>
          <Controller
            control={control}
            render={({field:{onChange,onBlur,value}}) => (
              <TextInput
                autoCapitalize="none"
                style={[styles.textInput]}
                {...register("email")}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <Text style={{ color: "red" }}>{message}</Text>
            )}
          />
          <Text style={[styles.formLabel]}>Password</Text>
          <Controller
            control={control}
            render={({field:{onChange,onBlur,value}}) => (
              <TextInput autoCapitalize="none" style={[styles.textInput]} {...register("password")} secureTextEntry={true} onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <Text style={{ color: "red" }}>{message}</Text>
            )}
          />
          <Text style={[styles.formLabel]}>Confirm Password</Text>
          <Controller
            control={control}
            render={({field:{onBlur,onChange,value}}) => (
              <TextInput autoCapitalize="none" style={[styles.textInput]} {...register("confirmPassword")} secureTextEntry={true} onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="confirmPassword"
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => (
              <Text style={{ color: "red" }}>{message}</Text>
            )}
          />
          <Text style={[styles.formLabel]}>Address</Text>
          <Controller
            control={control}
            render={({field:{onBlur,onChange,value}}) => (
              <TextInput style={[styles.textInput]} {...register("address")} onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="address"
            rules={{ required: "Address is required" }}
          />
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ message }) => (
              <Text style={{ color: "red" }}>{message}</Text>
            )}
          />
          <Text style={[styles.formLabel]}>Profile Picture link</Text>
          <Controller
            control={control}
            render={({field:{onBlur,onChange,value}}) => (
              <TextInput style={[styles.textInput]} {...register("profilePic")} onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="profilePic"
          />
          <Text style={[styles.formLabel, { alignSelf: "flex-end" }]}>
            Are you a buyer?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isBuyer ? "#536396" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={isBuyer}
            onValueChange={setIsBuyer}
          />
          <Button title="Sign up" onPress={handleSubmit(signup)} /> */}
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
    // flex: 1,
    padding: 6,
    color: "black",
    // flexDirection: "column",
    // alignContent: "flex-start",
    // alignItems: "stretch",
    // justifyContent: "flex-start",
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
