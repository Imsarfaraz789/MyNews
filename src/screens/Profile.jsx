import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            setEmail(storedEmail || 'No Email Found');
        };
        getUserInfo();
    }, []);

    const deleteAccount = async () => {
        try {
            // Delete the account
            await AsyncStorage.multiRemove(['userEmail', 'userPassword', 'isLoggedIn']);

            // Navigate to Login screen and reset stack
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }] // Change to navigate to Login screen
            });
        } catch (error) {
            console.error("Error deleting account:", error);
            Alert.alert("Error", "Failed to delete account");
        }
    };

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
