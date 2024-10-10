import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            setEmail(storedEmail || 'No Email Found');
        };

        getUserInfo();
    }, []);



    return (
        <View style={styles.container} >
            <Text style={styles.title}>Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{email}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#888',
    },
    value: {
        fontSize: 18,
        color: '#000',
    },

});

export default Profile;
