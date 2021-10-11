import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, useParams } from 'react-router';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({ 
    openButton: {
        backgroundColor: theme.colors.badge,
        borderRadius: 4,
        padding: 10,
        margin: 10,
        color: 'white',
        textAlign: 'center'
    },
    flexBox: {
        flex: 1,
        flexDirection: 'row'
    },
    scoreBox: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        borderRadius: 25,
        borderStyle: 'solid',
        borderColor: theme.colors.badge,
        borderWidth: 2,
        justifyContent: 'center',
        margin: 10
    },
    scoreText: {
        color: theme.colors.badge,
        textAlign: 'center',
        fontWeight: theme.fontWeights.bold
    },
    reviewBox: {
        flex: 1,
        marginVertical: 10,
        flexGrow: 1
    }
});

const RepositoryInfo = ({ data }) => {
    const openGithubPressed = () => {
        const win = window.open(data.repository.url);
        win.focus();
    };

    return (
        <View>
            <RepositoryItem repository={data.repository} />
            <Pressable style={styles.openButton} onPress={openGithubPressed}>
                <Text style={{color: 'white', textAlign: 'center'}}>Open in GitHub</Text>
            </Pressable>
        </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.flexBox} key={review.node.id}>
            <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>{review.node.rating}</Text>
            </View>
            <View style={styles.reviewBox}>
                <Text style={{fontWeight: theme.fontWeights.bold, paddingTop: 5}}>{review.node.user.username}</Text>
                <Text style={{fontWeight: theme.fontWeights.light, paddingBottom: 10, color: theme.colors.textLight}}>{new Date(review.node.createdAt).toLocaleDateString("en-US")}</Text>
                <Text>{review.node.text}</Text>
            </View>
        </View>
    );
};

const RepositoryView = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_REPOSITORY, { 
        variables: { id },
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <View><Text>Loading repository...</Text></View>;
    if (error) return <View><Text>Error loading repostory</Text></View>;

    if (!data.repository) return <Redirect to="/" />;

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <FlatList 
                data={data.repository.reviews.edges}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={(obj) => obj.node.id}
                ListHeaderComponent={() => <RepositoryInfo data={data} />} />
            
        </View>
    );
};

export default RepositoryView;
