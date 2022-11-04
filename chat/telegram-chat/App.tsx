import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Pressable, View, Image } from "react-native";
import MessageHeader from "./src/components/MessageHeader";
import ContactList from "./src/components/ContactList";
import { enableScreens } from "react-native-screens";
enableScreens();
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Modal from "./src/components/Modal";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Modal {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "grey",
            width: 320,
          },
        }}
      >
        <Drawer.Screen
          name="Telegram"
          component={ContactList}
          options={{
            title: "Telegram",
            headerStyle: {
              backgroundColor: "#212D3B",
            },
            headerTintColor: "#fff",
          }}
        />
        <Drawer.Screen
          name="MessageHeader"
          component={MessageHeader}
          // {(props) => <MessageHeader {...props} extraData={someData} />}
          options={({ route }: any) => ({
            title: route.params?.contact.name,

            headerLeft: () => (
              <Pressable style={styles.header}>
                <View style={styles.header_icons}>
                  <MaterialIcons style={styles.call_icon} name="call" />
                  <Entypo name="dots-three-vertical" style={styles.dotsThree} />
                </View>

                <Feather name="arrow-left" style={styles.arrow__left} />
                <View>
                  <Image source={require("./src/components/assets/kevin2.jpg")} style={styles.styleImg} />
                  {/* <Image source={{ uri: `${route?.contact?.imagename}` }} style={styles.styleImg} /> */}
                </View>
              </Pressable>
            ),
            headerStyle: {
              backgroundColor: "#212D3B",
            },
            headerTintColor: "#fff",
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    zIndex: 999,
  },
  menu__icon: {
    color: "#fff",
    fontSize: 33,
  },
  arrow__left: {
    color: "#fff",
    fontSize: 26,
    paddingLeft: 20,
    paddingRight: 15,
  },
  dotsThree: {
    color: "#fff",
    fontSize: 19,
    paddingLeft: 20,
  },
  call_icon: {
    color: "#fff",
    fontSize: 25,
    paddingLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header__text: {
    fontSize: 20,
    color: "#fff",
    marginRight: 180,
  },
  header_icons: {
    marginLeft: 320,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  styleImg: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 50,
    borderWidth: 5,
  },
});
