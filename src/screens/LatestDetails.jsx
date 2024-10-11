import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default function LatestDetails({ route }) {
    const { id } = route.params;
    const news = useSelector(state => state.News.data.articles) || [];

    const sortedArticles = [...news].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    const newsItem = sortedArticles[id];

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
                    <Text style={styles.dateText}>{new Date(newsItem.publishedAt).toLocaleDateString() || 'No Date'}</Text>
                    <View style={styles.authorContainer}>
                        <Text style={styles.authorText}>{newsItem.author || 'Unknown Author'}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{newsItem.description || 'No Description Available'}</Text>
                    </View>
                    <Text style={styles.content}>{newsItem.content || 'No Content Available'}</Text>
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
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textTransform: "capitalize",
    },
    dateText: {
        color: "#888",
        fontSize: 12,
        marginBottom: 4,
    },
    authorContainer: {
        backgroundColor: '#e1f5fe',
        padding: 8,
        borderRadius: 4,
        marginVertical: 6,
    },
    authorText: {
        color: "#000",
        fontSize: 12,
    },
    descriptionContainer: {
        backgroundColor: '#ffe0b2',
        padding: 8,
        borderRadius: 4,
        marginVertical: 6,
    },
    description: {
        color: "#444",
        fontSize: 14,
        lineHeight: 20,
    },
    content: {
        color: "#333",
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
        color: "#888",
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
});
