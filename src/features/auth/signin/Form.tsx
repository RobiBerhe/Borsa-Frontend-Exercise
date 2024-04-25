import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as yup from "yup";
import { SignInUser } from "../../users/types";
import Loader from "../../../components/Loader";
import { useAppSelector } from "../../../store/hooks";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

type FormProps = {
  loading: boolean;
  handleSignin: (formdata: SignInUser) => void;
  handleSignup:()=> void
};

const SignInForm: React.FC<FormProps> = ({ handleSignin, loading,handleSignup }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user = useAppSelector((state) => state.user);

  const signin = (formData: object) => {
    console.log("handle sign in submit :> ", formData);
    const data: any = { ...formData };
    handleSignin({
      email: data.email,
      password: data.password,
    });
  };

  const handleCreateAccount = ()=>{
    handleSignup();
  }

  return (
    <>
      <View style={styles.formContainer}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.welcomeText}>Welcome</Text>
              </View>
              {user.errors ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={{color:"#c42c21"}}>{user.errors}</Text>
                </View>
              ) : (
                ""
              )}
              <View style={[styles.formControl, { alignItems: "center" }]}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoCapitalize="none"
                      placeholder="abc@gmail.com"
                      style={styles.textInput}
                      {...register("email")}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="email"
                />
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  marginLeft: 35,
                  marginRight: 35,
                  margin: 1,
                }}
              >
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <Text style={{ color: "#c42c21" }}>{message}</Text>
                  )}
                />
              </View>
              <View style={[styles.formControl, { alignItems: "center" }]}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoCapitalize="none"
                      placeholder="Password"
                      secureTextEntry={true}
                      style={styles.textInput}
                      {...register("password")}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="password"
                />
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  marginLeft: 35,
                  marginRight: 35,
                  margin: 1,
                }}
              >
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <Text style={{ color: "#c42c21" }}>{message}</Text>
                  )}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleSubmit(signin)}
              >
                <Text style={styles.buttonTextStyle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"flex-end",marginLeft:35,marginRight:35}} onPress={handleCreateAccount}>
                <Text>Don't have an account? create one</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#ececec",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  welcomeText: {
    fontWeight: "900",
    color: "#87a2a3",
    fontSize: 36,
    margin: 30,
  },
  textInput: {
    fontSize: 16,
    borderRadius: 6,
    padding: 12,
    borderColor: "#333",
    height: 40,
    borderWidth: 1,
    flex: 1,
  },
  button: {
    backgroundColor: "#9ab",
    height: 40,
    borderColor: "#cdd",
    borderWidth: 0,
    color: "333",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  formControl: {
    flexDirection: "row",
    // backgroundColor:"#143",
    height: 40,
    margin: 10,
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,
  },
});

export default SignInForm;
