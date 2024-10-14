import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const CustomDrawerContent = ({ navigation, setIsLoggedIn }) => {
    const news = useSelector((state) => state.News.data.articles) || [];
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const uniqueAuthors = Array.from(new Set(news.map((article) => article.author || 'Unknown Author')));

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.clear();
            setIsLoggedIn(false);
            Alert.alert('Logged Out', 'You have successfully logged out.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const handleAuthorSelect = (author) => {
        setSelectedAuthor(author);
        navigation.navigate('AuthorBlogs', { author });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>

            {/* Home Button */}
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home-outline" size={22} color="#555" style={styles.icon} />
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>

            {/* Profile Button */}
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person-outline" size={22} color="#555" style={styles.icon} />
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>

            {/* Author Dropdown */}
            <Text style={styles.dropdownLabel}>Select Author:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedAuthor}
                    onValueChange={(itemValue) => handleAuthorSelect(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select an author" value="" />
                    {uniqueAuthors.map((author, index) => (
                        <Picker.Item key={index} label={author} value={author} />
                    ))}
                </Picker>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="red" style={styles.icon} />
                <Text style={styles.logoutText}>Logout</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    icon: {
        marginRight: 15,
    },
    buttonText: {
        fontSize: 18,
        color: '#333',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 15,
        marginTop: 20,
    },
    logoutText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 15,
    },
    dropdownLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
});

export default CustomDrawerContent;
