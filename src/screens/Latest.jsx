import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


export default function Latest({ query }) {
    const news = useSelector(state => state.News.data.articles) || [];
    const navigation = useNavigation()

    const filterArticlesByQuery = (articles, query) => {
        if (!query) return articles;
        return articles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase())
        );
    };

    const sortedArticles = [...news].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const filteredArticles = filterArticlesByQuery(sortedArticles, query);

    return (
        <View style={{ flex: 1, marginTop: 30 }}>
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={filteredArticles}
                renderItem={({ item, index }) => (
                    <View style={styles.card} key={index}>
                        {item.urlToImage ? (
                            <Image
                                source={{ uri: item.urlToImage }}
                                style={{ width: 150, height: 80 }}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.placeholder} />
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate('NewsDetails', { id: index })}>
                            <Text numberOfLines={2} style={styles.title}>
                                {item.title}
                            </Text>
                            <Text style={styles.date}>{item.publishedAt.split("T")[0]}</Text>
                            <Text style={styles.author}>{item.author || "Unknown Author"}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        flexDirection: "row",
    },
    title: {
        flex: 1,
        paddingHorizontal: 10,
        fontWeight: "bold",
        color: "#333",
        width: 240,
    },
    date: {
        color: "#ccc",
        marginTop: 4,
        paddingHorizontal: 10,
    },
    author: {
        marginLeft: 4,
        padding: 4,
        fontWeight: "bold",
        paddingHorizontal: 10,
    },
    placeholder: {
        width: 150,
        height: 80,
        backgroundColor: '#ccc',
    },
});
