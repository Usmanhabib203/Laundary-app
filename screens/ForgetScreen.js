import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Alert } from "react-native";
import { auth } from "../firebase";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Email required", "Please enter your email address.");
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Password reset email sent", "Please check your email inbox for further instructions.");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Forgot Password</Text>
        <Text style={styles.subHeaderText}>Enter your email address to reset your password</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <Pressable onPress={handleResetPassword} style={styles.resetButton}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  headerText: {
    fontSize: 20,
    color: "#662d91",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 50,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 300,
    marginVertical: 10,
  },
  resetButton: {
    width: 200,
    backgroundColor: "#318CE7",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});

export default ForgotPasswordScreen;
