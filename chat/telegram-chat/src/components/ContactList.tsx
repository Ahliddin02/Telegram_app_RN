import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import { ContactsType } from "./types";
import { url } from "../url";

export default function ContactList({ navigation }: any) {
  const [list, setList] = useState<ContactsType[]>([]);
  console.log("list", list);

  useEffect(() => {
    fetch(`${url}/file-contacts`)
      .then((res) => res.json())
      .then((loadFiles) => setList(loadFiles));
  }, []);
  console.log(list);
  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "100%" }}>
        <View>
          {list.map((el, index) => (
            <View style={styles.main} key={index}>
              <Image
                style={styles.styleImg}
                source={{
                  uri: `${url}/file-list/${el.imagename}`,
                }}
              />
              <Text
                onPress={() => {
                  navigation.navigate("MessageHeader", { contact: el });
                }}
                style={styles.text}
              >
                {el.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "relative",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#17212b",
    padding: 10,
  },
  main_header: {
    width: 70,
  },
  header: {
    width: "100%",
    marginTop: 0,
    borderColor: "red",
    marginBottom: 10,
    height: "100%",
  },
  text: {
    fontSize: 20,
    lineHeight: 50,
    color: "#ffffff",
    borderBottomWidth: 1,
    width: "90%",
    paddingLeft: 15,
  },
  styleImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
  },
});
