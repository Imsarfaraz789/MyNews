import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const CustomDrawerContent = ({ navigation }) => {
    const news = useSelector(state => state.News.data.articles) || [];
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const uniqueAuthors = Array.from(new Set(news.map(article => article.author || "Unknown Author")));

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLogedIn');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const handleAuthorSelect = (author) => {
        setSelectedAuthor(author);
        navigation.navigate('AuthorBlogs', { author });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
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
    button: {
        marginBottom: 20,
        color: "#333"
    },
    buttonText: {
        fontSize: 18,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dropdownLabel: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',

    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    logoutButton: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    logoutText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CustomDrawerContent;
