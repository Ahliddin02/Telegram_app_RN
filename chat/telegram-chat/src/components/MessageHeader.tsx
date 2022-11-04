import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import InputMessage from "./InputMessage";
import MessageList from "./MessageList";

export default function MessageHeader({ route }: any) {
  const [refreshMessage, setREfreshMessage] = useState([]);
  const { contact } = route.params;
  return (
    <View style={styles.container}>
      
      <View>{contact && <MessageList contact={contact} refreshMessage={refreshMessage} />}</View>
      <View>{contact && <InputMessage contact={contact} refreshMessage={setREfreshMessage} />}</View>
      {/* <View>
        <MessageList contact={contact} refreshMessage={refreshMessage} />
      </View>
      <View>
        <InputMessage contact={contact} refreshMessage={setREfreshMessage} />
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  header: {
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: "#212D3B",
    height: 50,
  },
  header__text: {
    fontSize: 18,
    lineHeight: 40,
    color: "#ffffff",
    marginLeft: 15,
  },
  input: {
    width: 150,
    height: 50,
    backgroundColor: "red",
    marginLeft: 50,
  },
});
