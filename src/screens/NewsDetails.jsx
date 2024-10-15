import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking, BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../utils/Colors';


export default function NewsDetails({ route }) {
    const { id } = route.params;
    const news = useSelector(state => state.News.data.articles) || [];
    const filteredArticles = news.filter(item => item.urlToImage);
    const navigation = useNavigation();

    const countArticlesPerAuthor = (articles) => {
        const authorCounts = {};
        articles.forEach(article => {
            const author = article.author || "Unknown Author";
            authorCounts[author] = (authorCounts[author] || 0) + 1;
        });
        return authorCounts;
    };

    const sortedArticles = (articles) => {
        const authorCounts = countArticlesPerAuthor(articles);
        return articles.sort((a, b) => {
            const authorA = a.author || "Unknown Author";
            const authorB = b.author || "Unknown Author";
            return authorCounts[authorB] - authorCounts[authorA];
        });
    };

    const sortedFilteredArticles = sortedArticles(filteredArticles);
    const newsItem = sortedFilteredArticles[id];

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Home');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>

            {newsItem ? (
                <View style={styles.content}>
                    {newsItem.urlToImage ? (
                        <Image
                            style={styles.cardImage}
                            source={{ uri: newsItem.urlToImage }}
                            resizeMode="cover"
                        />
                    ) : (
                        <Text style={styles.imagePlaceholder}>Image not available</Text>
                    )}
                    <Text style={styles.title}>{newsItem.title}</Text>
                    <View style={styles.authorContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{newsItem.author ? newsItem.author.charAt(0).toUpperCase() : "U"}</Text>
                        </View>
                        <View style={styles.authorDetails}>
                            <Text style={styles.authorText}>{newsItem.author || 'Unknown Author'}</Text>
                            <Text style={styles.dateText}>{new Date(newsItem.publishedAt).toLocaleDateString() || 'No Date'}</Text>
                        </View>
                    </View>


                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{newsItem.description || 'No Description Available'}</Text>
                    </View>
                    <Text style={styles.contentText}>{newsItem.content || 'No Content Available'}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(newsItem.url)}>
                        <Text style={{ fontWeight: "600", color: "blue", textDecorationLine: "underline", }}>Read More</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.error}>News not found</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: Colors.black,
        textTransform: "capitalize",
    },
    dateText: {
        color: Colors.mediumGray,
        fontSize: 12,
        marginTop: 4,
    },
    descriptionContainer: {
        backgroundColor: Colors.descriptionbackground,
        padding: 8,
        borderRadius: 4,
        marginVertical: 6,
    },
    description: {
        color: Colors.darkGray,
        fontSize: 14,
        lineHeight: 20,
    },
    contentText: {
        color: Colors.black,
        fontSize: 14,
        marginTop: 10,
        lineHeight: 20,
    },
    error: {
        fontSize: 18,
        color: Colors.red,
        textAlign: 'center',
        marginTop: 20,
    },
    imagePlaceholder: {
        color: Colors.mediumGray,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    cardImage: {
        width: "100%",
        height: 200,
        borderRadius: 4,
        marginBottom: 10,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.avatarbackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    authorDetails: {
        flex: 1,
    },
    authorText: {
        color: Colors.lightBlack,
        fontSize: 14,
        fontWeight: 'bold',
    },
    readMore: {
        fontWeight: "600",
        color: Colors.blue,
        textDecorationLine: "underline",
        marginTop: 10,
    },
});
