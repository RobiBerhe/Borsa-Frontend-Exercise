import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { RootNavigationProps } from "../../App";
import { useAppDispatch } from "../store/hooks";
import { signOut } from "../features/users/usersSlice";

type CustomSidebarMenuProps = {
  props: DrawerContentComponentProps;
};

const CustomSidebarMenu: React.FC<CustomSidebarMenuProps> = ({ props }) => {
  const navigation = useNavigation<RootNavigationProps>();
  const dispatch = useAppDispatch();

  return (
    <>
      <View style={stylesSidebar.sideMenuContainer}>
        <View style={stylesSidebar.profileHeader}>
          <View style={stylesSidebar.profileHeaderPicCircle}>
            <Text style={{ fontSize: 25, color: "#295e69" }}>
              {"App".charAt(0)}
            </Text>
          </View>
          <Text style={stylesSidebar.profileHeaderText}>App</Text>
        </View>
        <View style={stylesSidebar.profileHeaderLine} />

        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label={({ color }) => (
              <Text style={{ color: "#d8d8d8" }}>Logout</Text>
            )}
            onPress={() => {
              dispatch(signOut(""));
              AsyncStorage.clear();
              navigation.replace("auth");
            }}
          />
        </DrawerContentScrollView>
      </View>
    </>
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#214952",
    paddingTop: 40,
    color: "white",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#214952",
    padding: 15,
    textAlign: "center",
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
});

export default CustomSidebarMenu;
