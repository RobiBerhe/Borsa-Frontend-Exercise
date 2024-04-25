import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Loader from "../../components/Loader";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Switch, TouchableOpacity } from "react-native-gesture-handler";
import { UserType, UserUpdateType } from "../users/types";

const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, { message: "Enter a full name" }),
  userName: yup.string().trim().required(),
  email: yup.string().email().required(),
  address: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z\s]+,\s* [a-zA-Z\s]+$/,
      "address should be in city,country format"
    ),
  profilePic: yup.string().url("should be a link"),
  //   isBuyer:yup.boolean()
});

type EditFormProps = {
  handleFormSubmit: (formData: UserUpdateType) => void;
  loading: boolean;
};
const EditProfileForm: React.FC<EditFormProps> = ({
  handleFormSubmit,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { currentUser } = useAppSelector((state) => state.user);
  const [isBuyer, setIsBuyer] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) return;
    setValue(
      "fullName",
      currentUser?.firstName.concat(" ").concat(currentUser.lastName)
    );
    setValue("address", currentUser.address);
    setValue("userName", currentUser.userName);
    setValue("email", currentUser.email);
    setValue(
      "profilePic",
      !currentUser.profilePic || currentUser.profilePic == "0"
        ? "https://picsum.photos/200"
        : currentUser.profilePic
    );
    setIsBuyer(currentUser.isBuyer);
  }, [currentUser]);

  const handleEditSubmit = (formData: object) => {
    const data: any = { ...formData };
    handleFormSubmit({
      firstName: data.fullName.split(" ")[0],
      lastName: data.fullName.split(" ")[1],
      address: data.address,
      email: data.email,
      userName: data.userName,
      isBuyer: isBuyer,
      _id: currentUser?._id,
    });
  };

  return (
    <>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={[styles.formControl, { alignItems: "center" }]}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    autoCapitalize="none"
                    placeholder="John Doe"
                    style={styles.textInput}
                    {...register("fullName")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="fullName"
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
                name="fullName"
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
                    placeholder="john"
                    style={styles.textInput}
                    {...register("userName")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="userName"
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
                name="userName"
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
                    placeholder="john@gmail.com"
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
                    placeholder="abc, def"
                    style={styles.textInput}
                    {...register("address")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="address"
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
                name="address"
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
                    style={styles.textInput}
                    {...register("profilePic")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="profilePic"
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
                name="profilePic"
                render={({ message }) => (
                  <Text style={{ color: "#c42c21" }}>{message}</Text>
                )}
              />
            </View>
            <Text
              style={[
                styles.formLabel,
                { alignSelf: "flex-end", marginRight: 12 },
              ]}
            >
              Are you a buyer?
            </Text>
            <Switch
              style={{ marginRight: 12 }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isBuyer ? "#536396" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={isBuyer}
              onValueChange={setIsBuyer}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={handleSubmit(handleEditSubmit)}
            >
              <Text style={styles.buttonTextStyle}>UPDATE PROFILE</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
    height: 40,
    margin: 10,
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
  },
});

export default EditProfileForm;
