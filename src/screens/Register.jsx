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
    BackHandler
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { storeData } from '../utils/AsyncStorageUtils';
import { Colors } from '../utils/Colors';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Exit App", "Are you sure you want to exit?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
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

    const handleRegister = async () => {
        
        if (validateEmail(email) && validatePassword(password)) {
            try {
                await storeData('userEmail', email);
                await storeData('userPassword', password);
                await storeData('isLoggedIn', false);
                Alert.alert('Success', 'User registered successfully');

                setEmail('');
                setPassword('');

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
            if (!validatePassword(password)) {
                setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter and one special character.');
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
                        <Ionicons name="mail-outline" size={24} color={`${Colors.mediumGray}`} style={styles.icon} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Email"
                            placeholderTextColor={`${Colors.mediumGray}`}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={24} color={`${Colors.mediumGray}`} style={styles.icon} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Password"
                            secureTextEntry={true}
                            placeholderTextColor={`${Colors.mediumGray}`}
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
    icon: {
        paddingHorizontal: 10,
    },
    inputBox: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        color: Colors.lightBlack
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
        color: Colors.white,
        fontWeight: 'bold',
    },
    errorText: {
        color: Colors.red,
        fontSize: 14,
        marginBottom: 10,
    },
    loginText: {
        textAlign: 'center',
        color: Colors.black,
        fontSize: 16,
    },
    loginBtn: {
        color: Colors.blue,
        textDecorationLine: 'underline',
        fontSize: 16,
    },
});
