import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import * as yup from "yup";
import { UserType } from "../../users/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loader from "../../../components/Loader";
import { useAppSelector } from "../../../store/hooks";

const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, { message: "Enter a full name" }),
  username: yup.string().trim().required(),
  email: yup.string().email().required(),
  address: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z\s]+,\s* [a-zA-Z\s]+$/,
      "address should be in city,country format"
    ),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required("passwords need to match")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  profilePic: yup.string().url("should be a link"),
});

type FormProps = {
  handleFormSubmit: (formData: UserType) => void;
  handleSignIn: () => void;
  defaultAddress: string;
  loading: boolean;
};

const SignUpForm: React.FC<FormProps> = ({
  handleFormSubmit,
  defaultAddress,
  handleSignIn,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isBuyer, setIsBuyer] = useState<boolean>(false);
  const user = useAppSelector((state)=> state.user);

  useEffect(() => {
    const address = defaultAddress ? defaultAddress.split(",") : "";
    setValue("address", address ? address[0] + ", " + address[1] : "");
  }, [defaultAddress]);

  const signup = (formdata: object) => {
    const data: any = {
      ...formdata,
      isBuyer,
    };
    handleFormSubmit({
      address: data.address,
      firstName: data.fullName.split(" ")[0],
      lastName: data.fullName.split(" ")[1],
      email: data.email,
      userName: data.username,
      password: data.password,
      isBuyer: data.isBuyer,
    });
  };

  return (
    <>
      <Loader loading={loading} />
      {user.errors ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#c42c21" }}>{user.errors}</Text>
        </View>
      ) : (
        ""
      )}
      <Text style={[styles.formLabel]}>Full Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            style={[styles.textInput]}
            {...register("username", { required: "Username is required" })}
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
        render={({ field: { onChange, onBlur, value } }) => (
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            style={[styles.textInput]}
            {...register("password")}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
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
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            autoCapitalize="none"
            style={[styles.textInput]}
            {...register("confirmPassword")}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
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
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            style={[styles.textInput]}
            {...register("address")}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
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
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            style={[styles.textInput]}
            {...register("profilePic")}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
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
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={handleSubmit(signup)}
      >
        <Text style={styles.buttonTextStyle}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "flex-end", marginLeft: 35, marginRight: 35 }}
        onPress={handleSignIn}
      >
        <Text>Sign in instead?</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
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
});

export default SignUpForm;
