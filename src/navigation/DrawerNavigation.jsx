import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getData } from '../utils/AsyncStorageUtils';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import NewsDetails from '../screens/NewsDetails';
import LatestDetails from '../screens/LatestDetails';
import CustomDrawerContent from './CustomDrawerContent';
import AuthorBlogs from '../screens/AuthorBlogs';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("")

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await getData('isLoggedIn');
            const loggedEmail = await getData("userEmail")
            setEmail(loggedEmail)
            setIsLoggedIn(loggedIn);
            setLoading(false);
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Drawer.Navigator
            initialRouteName={isLoggedIn ? 'Home' : 'Login'}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            {!isLoggedIn ? (
                <>
                    <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Drawer.Screen name="Home" component={Home}
                        options={{
                            headerRight: () => (
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{email.charAt(0).toUpperCase() || '?'}</Text>
                                </View>
                            ),
                        }}
                    />
                </>
            ) : (
                <>
                    <Drawer.Screen name="Home" component={Home}
                        options={{
                            headerRight: () => (
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{email.charAt(0).toUpperCase() || '?'}</Text>
                                </View>
                            ),
                        }} />
                    <Drawer.Screen name="NewsDetails" component={NewsDetails} />
                    <Drawer.Screen name="LatestDetails" component={LatestDetails} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="AuthorBlogs" component={AuthorBlogs} />
                    <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
                </>
            )}
        </Drawer.Navigator>
    );
};
const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
export default DrawerNavigator;
