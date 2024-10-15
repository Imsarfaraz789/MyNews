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
import { Colors } from '../utils/Colors';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '360049562558-1unlirvfmq4ra63mq19ior0pfikcnbct.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

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

    // const handleGoogleSignIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log(userInfo); // Handle user info as needed
    //         Alert.alert('Login Success', `Welcome ${userInfo.user.name}!`);
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'Home' }],
    //         });
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // User cancelled the sign-in flow
    //             Alert.alert('Cancelled', 'Google Sign-In was cancelled.');
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // Operation (e.g., sign-in) is in progress already
    //             Alert.alert('In Progress', 'Sign-In is already in progress.');
    //         } else {
    //             Alert.alert('Error', 'Something went wrong. Please try again.');
    //         }
    //     }
    // };

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
                        <Ionicons name="mail-outline" size={24} color={`${Colors.mediumGray}`} style={styles.icon} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Email"
                            keyboardType="email-address"
                            placeholderTextColor={`${Colors.mediumGray}`}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(''); // Reset error on input
                            }}
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={24} color={`${Colors.mediumGray}`} style={styles.icon} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Password"
                            secureTextEntry
                            placeholderTextColor={`${Colors.mediumGray}`}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setPasswordError(''); // Reset error on input
                            }}
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

                    <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
                        <Text style={styles.googleButtonText}>Sign In With Google</Text>
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
        color: Colors.black,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.softText,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: Colors.white,
    },
    icon: { paddingHorizontal: 10 },
    inputBox: { flex: 1, height: 50, fontSize: 16, paddingHorizontal: 10, color: Colors.lightBlack },
    button: {
        width: '100%',
        backgroundColor: 'seagreen',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        marginBottom: 10,
    },
    buttonText: { fontSize: 18, color: Colors.white, fontWeight: 'bold' },
    errorText: { color: Colors.red, fontSize: 14, marginBottom: 10 },
    loginText: { textAlign: 'center', color: Colors.black, fontSize: 16 },
    loginBtn: { color: Colors.blue, textDecorationLine: 'underline', fontSize: 16 },
    googleButton: {
        marginTop: 10,
        paddingVertical: 15,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
        alignItems: 'center',
    },
    googleButtonText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
