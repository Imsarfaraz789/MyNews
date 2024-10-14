import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        setEmailError('');
        setPasswordError('');

        if (validateEmail(email) && password.length >= 3) {
            try {
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);
                Alert.alert('Success', 'User registered successfully');

                setEmail('');
                setPassword('');

                // Reset navigation to the Login screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } catch (error) {
                Alert.alert('Failed to save data');
            }
        } else {
            if (!validateEmail(email)) {
                setEmailError('Please enter a valid email.');
            }
            if (password.length < 3) {
                setPasswordError('Password must be at least 3 characters.');
            }
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
                <Image
                    style={styles.image}
                    source={require('../../assets/getting-started.jpg')}
                />
                <View style={styles.container}>
                    <Text style={styles.textHeading}>Create an Account</Text>

                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Email"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Password"
                            secureTextEntry={true}
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <Text style={styles.loginText}>
                        Already have an account?{' '}
                        <Text
                            style={styles.loginBtn}
                            onPress={() => navigation.navigate('Login')}
                        >
                            Login
                        </Text>
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
        width: '100%',
        height: 350,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        marginBottom: 20,
    },
    textHeading: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    icon: {
        paddingHorizontal: 10,
    },
    inputBox: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#000',
    },
    button: {
        width: '100%',
        backgroundColor: 'seagreen',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    loginText: {
        textAlign: 'center',
        color: '#333',
        fontSize: 16,
    },
    loginBtn: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
});
