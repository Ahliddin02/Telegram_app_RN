import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { url } from "../url";

export default function InputMessage({ contact, refreshMessage }: any) {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value, sender: 1000, receiver: contact.id }),
    };
    fetch(`${url}/messages-save`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setValue(data);
      });

    fetch(`${url}/messages-list`)
      .then((res) => res.json())
      .then((loadMessages) => refreshMessage(loadMessages));
    setValue("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <MaterialIcons style={styles.gif} name="gif" size={35} color="#677484" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setValue}
            value={value}
            placeholder="Message"
            placeholderTextColor="#FFF"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <MaterialIcons style={styles.sendIcon} name="send" size={25} color="#72B2E1" onPress={pressHandler} />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    marginLeft: -20,
    backgroundColor: "#212D3B",
  },
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    marginLeft: -20,
    backgroundColor: "#212D3B",
  },
  input: {
    width: "78%",
    padding: 11,
    color: "white",
    placeholderTextColor: "#1D2A3A",
    marginLeft: -5,
    display: "flex",
    alignItems: "center",
  },
  sendIcon: {
    marginRight: 10,
  },
  gif: {
    paddingLeft: 25,
  },
});
