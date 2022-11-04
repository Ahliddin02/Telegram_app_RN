import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { url } from "../url";
import { MessagesType } from "./types";

export default function MessageList({ contact, refreshMessage }: any) {
  const [messages, setMessages] = useState<MessagesType[]>([]);

  useEffect(() => {
    fetch(`${url}/messages-list`)
      .then((res) => res.json())
      .then((loadMessages) => setMessages(loadMessages));
    // .catch((error) => console.log(error));
  }, [refreshMessage]);
  console.log("messages-----------", messages);

  const id = JSON.parse(contact.id);

  const image = { uri: "https://i.pinimg.com/474x/85/ec/df/85ecdf1c3611ecc9b7fa85282d9526e0.jpg" };
  return (
    <ImageBackground source={image} style={styles.container}>
      <ScrollView style={{ height: "100%" }}>
        <View>
          {messages
            .filter(
              ({ sender, receiver }) => (sender === id && receiver === 1000) || (sender === 1000 && receiver === id)
            )
            // .filter(
            //   (message) =>
            //     (message.sender === contact.id && message.receiver === 1000) ||
            //     (message.sender === 1000 && message.receiver === contact.id)
            // )

            .map((newMessages, index) => (
              <View key={index}>
                <View>
                  <Text style={styles.text}>{newMessages.text}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 412,
    height: 670,
    borderLeft: 1,
    backgroundColor: "#0e1621",
    padding: 12,
    display: "flex",
    alignItems: "flex-end",
  },
  text: {
    color: "#fff",
    backgroundColor: "#3E6189",
    width: 100,
    height: 35,
    fontSize: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginTop: 10,
    paddingLeft: 15,
  },
});
