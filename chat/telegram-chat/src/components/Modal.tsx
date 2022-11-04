import React from "react";
import { StyleSheet, Text, View, Pressable, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Modal(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <View>
            <Image source={require("./assets/kevin2.jpg")} style={styles.styleImg} />
          </View>
          <View style={styles.headerName}>
            <Text style={styles.headerTextTitle}>KEVIN</Text>
            <Text style={styles.headerText}>+992 987070007</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <View>
            <MaterialIcons name="wb-sunny" size={25} color="white" />
          </View>
          <View>
            <MaterialIcons name="keyboard-arrow-down" size={30} color="#fff" />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.createGroup}>
          <Feather name="users" size={24} color="#7c8692" />
          <Text style={styles.footerTexts}>Создать группу</Text>
        </View>
        <View style={styles.createGroup}>
          <Feather name="user" size={24} color="#7c8692" />
          <Text style={styles.footerTexts}>Контакты</Text>
        </View>
        <View style={styles.createGroup}>
          <MaterialIcons name="call" size={25} color="#7c8692" />
          <Text style={styles.footerTexts}>Звонки</Text>
        </View>
        <View style={styles.createGroup}>
          <Entypo name="man" size={26} color="#7c8692" />
          <Text style={styles.footerTexts}>People Nearby</Text>
        </View>
        <View style={styles.createGroup}>
          <Feather name="bookmark" size={24} color="#7c8692" />
          <Text style={styles.footerTexts}>Избранное</Text>
        </View>
        <View style={styles.createGroup}>
          <AntDesign name="setting" size={24} color="#7c8692" />
          <Text style={styles.footerTexts}>Настройки</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.createGroup}>
          <Feather name="user-plus" size={24} color="#7c8692" />
          <Text style={styles.footerTexts}>Пригласить друзей</Text>
        </View>
        <View style={styles.createGroup}>
          <SimpleLineIcons name="question" size={24} color="#7c8692" />
          <Text style={styles.footerTexts}>Возможности Telegram</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "space-between",
    height: 190,
    backgroundColor: "#233040",
    display: "flex",
    flexDirection: "row",
  },
  footer: {
    backgroundColor: "#1c242f",
    height: "100%",
  },
  styleImg: {
    width: 70,
    height: 70,
    marginTop: 40,
    marginLeft: 15,
    borderRadius: 50,
    borderWidth: 5,
  },
  headerName: {
    marginTop: 18,
    marginLeft: 15,
  },
  headerTextTitle: {
    color: "#fff",
    fontSize: 16,
  },
  headerText: {
    color: "#989fab",
    fontSize: 14,
  },
  headerIcons: {
    justifyContent: "space-between",
    marginTop: 45,
    marginBottom: 20,
    marginRight: 20,
  },
  createGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 15,
    alignItems: "center",
  },
  footerTexts: {
    color: "#fff",
    marginLeft: 20,
    fontSize: 15,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});
