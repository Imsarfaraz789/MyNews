import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import DrawerNavigation from '../screens/DrawerNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
                setIsLoggedIn(loggedInStatus === 'true');
            } catch (error) {
                console.error('Failed to load login status', error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn === null) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <DrawerNavigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default RootNavigation;
