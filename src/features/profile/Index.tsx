import { SafeAreaView, StyleSheet, StatusBar as SB, View } from "react-native";
import EditProfileForm from "./EditProfile";
import { UserUpdateType } from "../users/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateProfile } from "../users/usersSlice";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector((state)=> state.user)

  const handleUpdateProfile = (formData: UserUpdateType) => {
    dispatch(updateProfile(formData));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <EditProfileForm
            handleFormSubmit={(formData: UserUpdateType) =>
              handleUpdateProfile(formData)
            }
            loading={isLoading}
          />
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

export default ProfilePage;
