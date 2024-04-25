import {
  StyleSheet,
  View,
  StatusBar as SB,
  SafeAreaView,
  Text,
  FlatList,
  Image,
} from "react-native";
import { UserType } from "../users/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchUsers } from "../users/usersSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

type ItemProps = UserType;
const UserCard = (user: ItemProps) => (
  <View style={styles.item}>
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Text style={[{ color: "#fff" }]}>First Name: {user.firstName}</Text>
      <Text style={[{ color: "#fff" }]}>Last Name: {user.lastName}</Text>
      <Text style={[{ color: "#fff", flexWrap: "wrap" }]}>
        Email: {user.email}
      </Text>
      <Text style={[{ color: "#fff" }]}>Username: {user.userName}</Text>
      {user.isBuyer ? (
        <Text
          style={{
            flex: 0,
            alignItems: "flex-start",
            justifyContent: "center",
            alignSelf: "flex-start",
            color: "#fff",
            fontWeight: "500",
            borderRadius: 5,
            backgroundColor: "#345152",
            padding: 8,
          }}
        >
          BUYER
        </Text>
      ) : (
        ""
      )}
    </View>
    <View>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 100, height: 100, margin: 1 }}
      />
    </View>
  </View>
);
const DashBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers({ page: usersList.page, limit: usersList.limit }));
  }, [dispatch]);

  const handlePrev = () => {
    if (usersList.page <= 1) return;
    dispatch(fetchUsers({ limit: 10, page: usersList.page - 1 }));
  };
  const handleNext = () => {
    if (usersList.totalSeen + usersList.limit >= usersList.total) return;
    dispatch(fetchUsers({ limit: 10, page: usersList.page + 1 }));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 7 }}>
          <FlatList
            data={usersList.data}
            renderItem={({ item }) => <UserCard {...item} />}
          />
        </View>
        <View
          style={{
            padding: 8,
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => handlePrev()}
          >
            <Text style={styles.buttonTextStyle}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => handleNext()}
          >
            <Text style={styles.buttonTextStyle}>Next</Text>
          </TouchableOpacity>
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
  item: {
    backgroundColor: "#677a73",
    padding: 20,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
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
    padding: 12,
    fontSize: 16,
  },
});

export default DashBoard;
