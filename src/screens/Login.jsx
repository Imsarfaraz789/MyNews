import { StyleSheet, Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (validateEmail(email) && password.length >= 3) {
            try {
                const storeEmail = await AsyncStorage.getItem('userEmail');
                const storePassword = await AsyncStorage.getItem('userPassword');

                // Check if both email and password exist in AsyncStorage
                if (storeEmail && storePassword) {
                    if (
                        storeEmail.trim().toLowerCase() === email.trim().toLowerCase() &&
                        storePassword.trim() === password.trim()
                    ) {
                        await AsyncStorage.setItem("isLoggedIn", "true");
                        Alert.alert("Login Success", "Login successfully");
                        navigation.navigate("Home"); 
                    } else {
                        Alert.alert("Login Failed", "Incorrect email or password.");
                    }
                } else {
                    Alert.alert("Login Failed", "No registered user found.");
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load user data.");
            }
        } else {
            Alert.alert("Login failed", "Please enter a valid email and a password with at least 3 characters.");
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
                <Image style={styles.image} source={require("../../assets/getting-started.jpg")} />
                <View style={styles.container}>
                    <Text style={styles.textHeading}>Login</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Enter Email'
                        keyboardType='email-address'
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
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.loginText}>
                        Don't have an account?{' '}
                        <Text style={styles.loginBtn} onPress={() => navigation.navigate("Register")}>Register</Text>
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
    textHeading: {
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
    loginBtn: {
        color: "blue",
        textDecorationLine: "underline",
        fontSize: 16,
    },
});
