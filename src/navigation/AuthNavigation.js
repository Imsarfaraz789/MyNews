import React from 'react';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import DrawerNavigation from '../screens/DrawerNavigation';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Register'>
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="DrawerNavigation"
                component={DrawerNavigation}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};

export default AuthNavigation;
