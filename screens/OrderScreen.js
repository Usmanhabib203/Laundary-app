import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, KeyboardAvoidingView ,Platform} from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db, firestore } from '../firebase'; 
import LottieView from "lottie-react-native";
import { Notifications } from 'expo';


const OrderScreen = () => {
  const [feedback, setFeedback] = useState(""); 

  const handleSubmit = async () => {
    if (feedback.trim() === "") {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'feedbacks'), {
        feedback: feedback
      });
      console.log('Feedback submitted with ID: ', docRef.id);
      setFeedback("");

      
    } catch (error) {
      console.error('Error submitting feedback: ', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require("../assets/thumbs.json")}
          style={{
            height: 260,
            width: 300,
            alignSelf: "center",
            // marginTop: 10,
            justifyContent: "center",
          }}
          autoPlay
          loop={false}
          speed={0.7}
        />

        <Text
          style={{
            marginTop: 0,
            fontSize: 19,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Your order has been placed
        </Text>

        <Text style={{ fontSize: 20, marginTop: 20, marginRight: '55%' }}>Feedback</Text>
        <View style={{ padding: 10, marginTop: 20, height: '15%', width: '80%', borderWidth: 2, borderRadius: 20 }}>
          <TextInput
            style={{ fontSize: 20, justifyContent: 'center' }}
            placeholder="Feedback"
            value={feedback}
            onChangeText={setFeedback} 
          />
        </View>

        <Pressable style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>

        <LottieView
          source={require("../assets/sparkle.json")}
          style={{
            height: 300,
            position: "absolute",
            top: 100,
            width: 300,
            alignSelf: "center",
          }}
          autoPlay
          loop={false}
          speed={0.7}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  loginButton: {
    width: 100,
    height:60,
    backgroundColor: "#318CE7",
    padding: 15,
    borderRadius: 7,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
