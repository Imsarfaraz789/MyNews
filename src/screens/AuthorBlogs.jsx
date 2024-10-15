import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../utils/Colors';


const AuthorBlogs = ({ route }) => {
    const { author } = route.params;
    const news = useSelector(state => state.News.data.articles) || [];

    const authorArticles = news.filter(article => article.author === author);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{author} Articles</Text>
            <FlatList
                data={authorArticles}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View style={styles.articleContainer}>
                        <Text style={styles.articleTitle}>{item.title}</Text>
                    </View>
                )}
            />
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
        color: Colors.black
    },
    articleContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.softText,
    },
    articleTitle: {
        fontSize: 18,
    },
});

export default AuthorBlogs;
