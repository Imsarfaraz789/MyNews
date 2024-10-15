import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../utils/Colors';


export default function NewsDetails({ route }) {
    const { id } = route.params;
    const news = useSelector(state => state.News.data.articles) || [];
    const filteredArticles = news.filter(item => item.urlToImage);

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
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{newsItem.author ? newsItem.author.charAt(0).toUpperCase() : "U"}</Text>
                        </View>
                        <View style={styles.authorDetails}>
                            <Text style={styles.author}>{newsItem.author || "Unknown Author"}</Text>
                            <Text style={styles.date}>{newsItem.publishedAt.split("T")[0]}</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{newsItem.description || 'No Description Available'}</Text>
                    </View>
                    <Text style={styles.contentText}>{newsItem.content || 'No Content Available'}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(newsItem.url)}>
                        <Text style={styles.readMore}>Read More</Text>
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
        fontSize: 12,
        marginBottom: 4,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
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
    author: {
        color: Colors.lightBlack,
        fontSize: 14,
        fontWeight: 'bold',
    },
    date: {
        color: Colors.black,
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
        color: 'red',
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
    readMore: {
        fontWeight: "600",
        color: Colors.blue,
        textDecorationLine: "underline",
        marginTop: 10,
    },
});
