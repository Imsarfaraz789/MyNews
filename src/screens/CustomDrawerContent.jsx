import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const CustomDrawerContent = ({ navigation, setIsLoggedIn }) => {
    const news = useSelector((state) => state.News.data.articles) || [];

    const [selectedAuthor, setSelectedAuthor] = useState('');

    const uniqueAuthors = Array.from(new Set(news.map((article) => article.author || 'Unknown Author')));

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
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

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {
                console.log('Navigating to Profile');
                navigation.navigate('Profile');
            }}>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>

            <Text style={styles.dropdownLabel}>Select Author:</Text>
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

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
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
    buttonText: {
        fontSize: 18,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: '#333',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: "#ccc"
    },
    logoutButton: {
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    logoutText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'red',
    },
    dropdownLabel: {
        color: "#333"
    }
});

export default CustomDrawerContent;
