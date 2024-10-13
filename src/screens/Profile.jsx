import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const [email, setEmail] = useState('');

    // Fetch user email from AsyncStorage on component mount
    useEffect(() => {
        const getUserInfo = async () => {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            setEmail(storedEmail || 'No Email Found');
        };
        getUserInfo();
    }, []);

    // Function to delete the account and navigate to Register
    const deleteAccount = async () => {
        try {
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userPassword');
            await AsyncStorage.removeItem('isLoggedIn');

            // Reset navigation stack to the Register screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Register' }],
            });
        } catch (error) {
            Alert.alert("Error", "Failed to delete account");
        }
    };

    // Show confirmation popup before deleting the account
    const confirmDelete = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete your account?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: deleteAccount }
            ]
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    infoContainer: {
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    value: {
        fontSize: 18,
        color: '#000',
    },
    button: {
        backgroundColor: '#ff3b30',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Profile;
