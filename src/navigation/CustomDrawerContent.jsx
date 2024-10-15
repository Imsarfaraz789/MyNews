import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeData } from '../utils/AsyncStorageUtils';
import { Colors } from '../utils/Colors';

const CustomDrawerContent = ({ navigation }) => {
    const news = useSelector((state) => state.News.data.articles) || [];
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const uniqueAuthors = Array.from(new Set(news.map((article) => article.author || 'Unknown Author')));

    const handleLogout = async () => {
        try {
            await removeData('isLoggedIn');
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
            <Text style={styles.title}>News</Text>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home-outline" size={22} color={`${Colors.iconColor}`} style={styles.icon} />
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person-outline" size={22} color={`${Colors.iconColor}`} style={styles.icon} />
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>

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

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color={`${Colors.red}`} style={styles.icon} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: Colors.black,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderButtomColor,
    },
    icon: {
        marginRight: 15,
    },
    buttonText: {
        fontSize: 20,
        color: Colors.black
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: Colors.softText,
        borderRadius: 8,
        marginBottom: 30,
        backgroundColor: Colors.white
    },
    picker: {
        height: 50,
        width: '100%',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.borderButtomColor,
        paddingVertical: 15,
        marginTop: 20,
    },
    logoutText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.red,
        marginLeft: 15,
    },
    dropdownLabel: {
        fontSize: 18,
        color: Colors.black,
        marginBottom: 5,
    },
});

export default CustomDrawerContent;
