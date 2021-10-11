import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Alert, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from './../theme';
import { AUTHORIZED_USER } from './../graphql/queries';
import { useHistory } from 'react-router';
import { DELETE_REVIEW } from '../graphql/mutations';

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
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5
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
    },
    buttonFlexBox: {
        flex: 1,
        flexDirection: 'row'
    },
    viewRepoButton: {
        backgroundColor: theme.colors.badge,
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    deleteReviewButton: {
        backgroundColor: theme.colors.error,
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5
    }
});

const ReviewItem = ({ item, history, refetch }) => {
    const review = item.node;
    const onViewPressed = () => {
        history.push(`/repository/${review.repository.id}`);
    };
    const [deleteReview, { data, loading, error }] = useMutation(DELETE_REVIEW);

    const onDeletePressed = () => {
        Alert.alert('Delete review?', `Delete review for ${review.repository.fullName}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        console.log(review.id)
                        const success = await deleteReview({
                            variables: {
                                id: review.id
                            }
                        });
                        if (success) {
                            refetch();
                        }
                    }
                }
            ],
            {
                cancelable: true,
            });
    };

    return (
        <View style={{backgroundColor: 'white', marginVertical: 5}}>
            <View style={styles.flexBox} key={review.id}>
                <View style={styles.scoreBox}>
                    <Text style={styles.scoreText}>{review.rating}</Text>
                </View>
                <View style={styles.reviewBox}>
                    <Text style={{fontWeight: theme.fontWeights.bold, paddingTop: 5}}>{review.repository.fullName}</Text>
                    <Text style={{fontWeight: theme.fontWeights.light, paddingBottom: 10, color: theme.colors.textLight}}>{new Date(review.createdAt).toLocaleDateString("en-US")}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            <View style={styles.buttonFlexBox}>
                <Pressable style={styles.viewRepoButton} onPress={onViewPressed}>
                    <Text style={{textAlign: 'center', color: 'white'}}>View repository</Text>
                </Pressable>
                <Pressable style={styles.deleteReviewButton} onPress={onDeletePressed}>
                    <Text style={{textAlign: 'center', color: 'white'}}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { data, error, loading, refetch } = useQuery(AUTHORIZED_USER, {
        variables: {
            includeReviews: true
        }
    });
    const history = useHistory();

    if (loading) return <View><Text>Loading reviews...</Text></View>;

    return (
        <View style={{flex: 1}}>
            <FlatList 
                data={data.authorizedUser.reviews.edges}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => <ReviewItem item={item} history={history} refetch={refetch} />}
                keyExtractor={item => item.node.id} />
        </View>
    );
};

export default MyReviews;
