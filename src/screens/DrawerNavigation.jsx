import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import CustomDrawerContent from './CustomDrawerContent';
import Login from './Login';
import Register from './Register';
import NewsDetails from './NewsDetails';
import LatestDetails from './LatestDetails';
import Profile from './Profile';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AuthorBlogs from './AuthorBlogs ';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ isLoggedIn, setIsLoggedIn, email = "" }) => {
    const navigation = useNavigation();
    console.log("email:", email);

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <CustomDrawerContent {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            )}
            screenOptions={{
                headerShown: true,
            }}
        >
            {isLoggedIn ? (
                <>
                    <Drawer.Screen name="Home" component={Home} options={{
                        headerRight: () => {
                            return (
                                <View style={styles.avatar}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                        <Text style={styles.avatarText}>{email.charAt(0).toUpperCase()}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        },
                    }} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="NewsDetails" component={NewsDetails} />
                    <Drawer.Screen name="LatestDetails" component={LatestDetails} />
                    <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Drawer.Screen name="AuthorBlogs" component={AuthorBlogs} />
                </>
            ) : (
                <>
                    <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="Home" component={Home} options={{
                        headerRight: () => {
                            return (
                                <View style={styles.avatar}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                        <Text style={styles.avatarText}>{email.charAt(0).toUpperCase()}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        },
                    }} />
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

export default DrawerNavigation;
