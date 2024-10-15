import React, { useEffect, useState } from 'react';
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
    BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getData, storeData } from '../utils/AsyncStorageUtils';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
    webClientId: '346639608222-vgb5vvpvqh7g9bng25b7o9ncuogbm1an.apps.googleusercontent.com',
});

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Exit App", "Are you sure you want to exit?", [
                { text: "Cancel", onPress: () => null, style: "cancel" },
                { text: "YES", onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');

        if (validateEmail(email) && validatePassword(password)) {
            try {
                const storedEmail = await getData('userEmail');
                const storedPassword = await getData('userPassword');

                if (storedEmail && storedPassword) {
                    if (
                        storedEmail.trim().toLowerCase() === email.trim().toLowerCase() &&
                        storedPassword.trim() === password.trim()
                    ) {
                        await storeData('isLoggedIn', true);
                        Alert.alert('Login Success', 'Logged in successfully.');

                        setEmail('');
                        setPassword('');

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    } else {
                        Alert.alert('Login Failed', 'Incorrect email or password.');
                    }
                } else {
                    Alert.alert('Login Failed', 'No registered user found.');
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to load user data.');
            }
        } else {
            if (!validateEmail(email)) setEmailError('Please enter a valid email.');
            if (!validatePassword(password))
                setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
        }
    };

    const onGoogleButtonPress = async (navigation) => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            // Alert user with ID Token (for demo)
            Alert.alert('Google Sign-In Successful', 'ID Token: ' + idToken);

            // Simulate navigation on successful login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Cancelled', 'Google Sign-In was cancelled.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Error', 'Google Sign-In in progress.');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Error', 'Google Play Services not available.');
            } else {
                console.error('Google Sign-In Error:', error);
                Alert.alert('Error', 'Failed to log in with Google.');
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
                    <Text style={styles.textHeading}>Login</Text>

                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Email"
                            keyboardType="email-address"
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
                            secureTextEntry
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.loginText}>
                        Don't have an account?{' '}
                        <Text
                            style={styles.loginBtn}
                            onPress={() => navigation.navigate('Register')}
                        >
                            Register
                        </Text>
                    </Text>

                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={() => onGoogleButtonPress(navigation)}
                    >
                        <Ionicons name="logo-google" size={24} color="#fff" style={styles.googleIcon} />
                        <Text style={styles.buttonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    image: {
        width: '100%',
        height: 410,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
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
    icon: { paddingHorizontal: 10 },
    inputBox: { flex: 1, height: 50, fontSize: 16, paddingHorizontal: 10, color: '#000' },
    button: {
        width: '100%',
        backgroundColor: 'seagreen',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        marginBottom: 10,
    },
    buttonText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#db4437',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        marginBottom: 10,
    },
    googleIcon: { marginRight: 10 },
    errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
    loginText: { textAlign: 'center', color: '#333', fontSize: 16 },
    loginBtn: { color: 'blue', textDecorationLine: 'underline', fontSize: 16 },
});
