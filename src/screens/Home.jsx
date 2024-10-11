import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Featured from './Featured';
import Latest from './Latest';
import { fetchNews } from '../store/FetchNews';



export default function Home({ navigation }) {
    // console.log("navigation", navigation)
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('');
    const [query, setQuery] = useState('');
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        // dispatch(fetchNews());
        const getEmail = async () => {
            const email = await AsyncStorage.getItem('userEmail');
            setUserEmail(email);
        };
        getEmail();
    }, [dispatch, navigation]);



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.openDrawer()}>
                    <Icon name="menu" size={30} color="#333" />
                </TouchableOpacity>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{userEmail.charAt(0).toUpperCase()}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <TextInput
                    style={styles.inputBox}
                    placeholder='Search'
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={text => setQuery(text)}
                />
            </TouchableOpacity>

            <View style={{ justifyContent: "space-evenly", flexDirection: "row", padding: 8 }}>
                <TouchableOpacity onPress={() => setTabIndex(0)}>
                    <Text style={{ fontWeight: tabIndex === 0 ? "bold" : "", fontSize: tabIndex === 0 ? 18 : 14, color: "#333" }}>
                        Featured
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setTabIndex(1)}>
                    <Text style={{ fontWeight: tabIndex === 1 ? "bold" : "", fontSize: tabIndex === 1 ? 18 : 14, color: "#333" }}>
                        Latest
                    </Text>
                </TouchableOpacity>


            </View>

            {
                tabIndex === 0 ? <Featured query={query} /> :
                    <Latest query={query} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputBox: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    date: {
        color: '#888',
    },
    author: {
        color: '#007bff',
    },
});
