import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import DashBoard from "../features/dashboard/Index";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";
import React from "react";
import CustomSidebarMenu from "../components/CustomSidebarMenu";
import { useNavigation } from "@react-navigation/native";
import ProfilePage from "../features/profile/Index";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type HomeScreenStackProps = {
  props: DrawerContentComponentProps;
};

const HomeScreenStack: React.FC<HomeScreenStackProps> = ({ props }) => {
  return (
    <>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={DashBoard}
          options={{
            title: "Home",
            headerLeft: () => <NavigationDrawerHeader props={props} />,
            headerStyle: {
              backgroundColor: "#2b5950",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
};

type EditScreenProps = {
    props: DrawerContentComponentProps;
  };
  
const EditProfileScreen: React.FC<EditScreenProps> = ({ props }) => {
    return (
      <>
        <Stack.Navigator initialRouteName="EditScreen">
          <Stack.Screen
            name="EditScreen"
            component={ProfilePage}
            options={{
              title: "Edit Profile",
              headerLeft: () => <NavigationDrawerHeader props={props} />,
              headerStyle: {
                backgroundColor: "#2b5950",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </>
    );
  };

const DrawerNavigationRoutes: React.FC = () => {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{ drawerActiveTintColor: "#cee1f2", headerShown: false }}
        drawerContent={(props) => <CustomSidebarMenu props={props} />}
      >
        {/* <Drawer.Screen
          name="HomeScreen"
          options={{ drawerLabel: "Home" }}
          component={(props:any) => <HomeScreenStack props={props}/>}
        /> */}
        <Drawer.Screen name="homepage" options={{ drawerLabel: "Home",drawerLabelStyle:{color:"white"} }}>
          {(props: any) => <HomeScreenStack props={props} />}
        </Drawer.Screen>
        <Drawer.Screen name="editpage" options={{ drawerLabel: "Edit Profile",drawerLabelStyle:{color:"white"} }}>
          {(props: any) => <EditProfileScreen props={props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigationRoutes;
