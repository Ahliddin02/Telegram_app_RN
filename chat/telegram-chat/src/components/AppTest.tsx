import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import MessageHeader from "./src/components/MessageHeader";
import ContactList from "./src/components/ContactList";
import { enableScreens } from "react-native-screens";
enableScreens();
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ContactsType } from "./src/components/types";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Button onPress={() => navigation.navigate("Notifications")} title="Go to notifications" /> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {/* <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "" }} /> */}
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
          options={({ route }: any) => ({
            title: route?.params.contact.name,
            headerStyle: {
              backgroundColor: "#212D3B",
            },
            headerTintColor: "#fff",
          })}
        />
      </Drawer.Navigator>
      {/* <Stack.Navigator style={styles.container}>
        <Stack.Screen
          name="Telegram"
          component={ContactList}
          options={{
            title: "Telegram",
            headerStyle: {
              backgroundColor: "#212D3B",
            },

            headerLeft: () => (
              <View>
                <Pressable style={styles.header}>
                  <MaterialIcons style={styles.menu__icon} name="menu" onPress={handleMenu} />

                  <View>
                    <Text style={styles.header__text}>Telegram</Text>
                  </View>
                  <MaterialIcons style={styles.search__icon} name="search" />
                </Pressable>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="MessageHeader"
          component={MessageHeader}
          options={({ route }: any) => ({
            title: route.params.contact.name,
            headerStyle: {
              backgroundColor: "#212D3B",
            },
            headerTintColor: "#fff",
          })}
        />
      </Stack.Navigator> */}
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
  search__icon: {
    color: "#fff",
    fontSize: 30,
    paddingRight: 25,
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
});
