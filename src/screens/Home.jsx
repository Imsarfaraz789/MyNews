import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Featured from './Featured';
import Latest from './Latest';
import { useDispatch } from 'react-redux';
import { fetchNews } from '../store/FetchNews';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../utils/Colors';

export default function Home({ navigtion }) {
    const [query, setQuery] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const dispatch = useDispatch();
    
    useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchNews());
        }, [navigtion])
    );



    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <TextInput
                    style={styles.inputBox}
                    placeholderTextColor={`${Colors.mediumGray}`}
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    placeholder='Search News'
                />
            </TouchableOpacity>

            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', padding: 8 }}>
                <TouchableOpacity onPress={() => setTabIndex(0)}>
                    <Text style={{ fontWeight: tabIndex === 0 ? 'bold' : '', fontSize: tabIndex === 0 ? 18 : 14, color: `${Colors.black}` }}>
                        Featured
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setTabIndex(1)}>
                    <Text style={{ fontWeight: tabIndex === 1 ? 'bold' : '', fontSize: tabIndex === 1 ? 18 : 14, color: `${Colors.black}` }}>
                        Latest
                    </Text>
                </TouchableOpacity>
            </View>

            {tabIndex === 0 ? <Featured query={query} /> : <Latest query={query} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.background,
    },
    inputBox: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
});
