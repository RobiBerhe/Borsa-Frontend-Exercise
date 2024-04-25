import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";

type NavigationDrawerHeaderProps = {
  props: DrawerContentComponentProps;
};

const NavigationDrawerHeader: React.FC<NavigationDrawerHeaderProps> = ({
  props,
}) => {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Image
            source={require("../../assets/drawerWhite.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NavigationDrawerHeader;
