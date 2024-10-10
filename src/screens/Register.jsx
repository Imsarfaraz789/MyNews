import { StyleSheet, Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        if (validateEmail(email) && password.length >= 3) {
            try {
                await AsyncStorage.setItem("userEmail", email);
                await AsyncStorage.setItem("userPassword", password);
                Alert.alert("Success", "User registered successfully");
                navigation.navigate("Login");
            } catch (error) {
                Alert.alert("Failed to save data");
            }
        } else {
            Alert.alert("Registration failed", "Please enter a valid email and a password should be greater than 3.");
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
                <Image style={styles.image} source={require("../../assets/getting-started.jpg")} />
                <View style={styles.container}>
                    <Text style={styles.texHeading}>Create an Account</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Enter Email'
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Enter Password'
                        secureTextEntry={true}
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <Text style={styles.loginText}>Already have an account?{" "}
                        <Text style={styles.loginbtn} onPress={() => navigation.navigate("Login")}>Login</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 350,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        marginBottom: 20,
    },
    texHeading: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        marginBottom: 20,
    },
    inputBox: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: "white",
    },
    button: {
        width: "100%",
        backgroundColor: "seagreen",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        elevation: 2,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    loginText: {
        textAlign: "center",
        color: "#333",
        fontSize: 16,
    },
    loginbtn: {
        color: "blue",
        textDecorationLine: "underline",
        fontSize: 16,
    },
});
