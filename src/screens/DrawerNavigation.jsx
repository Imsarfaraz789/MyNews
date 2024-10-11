import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import CustomDrawerContent from './CustomDrawerContent';
import Login from './Login';
import Register from './Register';
import NewsDetails from './NewsDetails';
import Profile from './Profile';
import LatestDetails from './LatestDetails';
import AuthorBlogs from './AuthorBlogs ';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false, }}
            />

            <Drawer.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Drawer.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Drawer.Screen name='NewsDetails' component={NewsDetails} options={{ headerShown: false }} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="LatestDetails" component={LatestDetails} options={{ headerShown: false }} />
            <Drawer.Screen name="AuthorBlogs" component={AuthorBlogs} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
