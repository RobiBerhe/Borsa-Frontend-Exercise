import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar as SB,
} from "react-native";
import SignupPage from "./src/features/auth/signup/Index";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { createStackNavigator,StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInPage from "./src/features/auth/signin/Index";
import React from "react";
// import DashBoard from "./src/features/dashboard/Index";
import DrawerNavigationRoutes from "./src/routes/DrawerNavigation";

type RootNavigationPramsList = {
  auth:undefined,
  signup:undefined,
  signin:undefined,
  home:undefined
}

export type RootNavigationProps = StackNavigationProp<RootNavigationPramsList,"auth">

export default function App() {

  const Stack = createStackNavigator();

  


  const AuthRoutes:React.FC = ()=>{
    return (
      <Stack.Navigator initialRouteName="signin">
        <Stack.Screen name="signup" component={SignupPage} options={{headerShown:false}}/>
        <Stack.Screen name="signin" component={SignInPage} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }



  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="auth">
          {/* the auth based routes (sign in and sign up) */}
          <Stack.Screen name="auth" component={AuthRoutes} options={{headerShown:false}}/>
          {/* dashboard/main screen navigations, achieved via drawer navigation */}
          {/* <Stack.Screen name="home" component={DashBoard} options={{headerShown:false}}/> */}
          <Stack.Screen name="home" component={DrawerNavigationRoutes} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

    
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    paddingTop: SB.currentHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});



{/* <SafeAreaView style={styles.container}>
<View>
  <SignupPage />
  <StatusBar style="auto" />
</View>
</SafeAreaView> */}