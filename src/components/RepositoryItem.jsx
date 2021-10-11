import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useHistory } from 'react-router';
import theme from '../theme';

const style = StyleSheet.create({
    thumbnailImage: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        borderRadius: 10
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topFlexContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    flexItem: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    itemHeader: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.bold,
        padding: 3
    },
    itemText: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.normal,
        padding: 3
    },
    badge: {
        backgroundColor: theme.colors.badge,
        borderRadius: 4,
        padding: 2,
        width: 100
    }
});

const nFormatter = (num, digits) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
};

const DoubleRowItem = ({ number, description }) => {
    return (
        <View style={style.flexItem}>
            <Text style={style.itemHeader} testID={description}>{nFormatter(number, 2)}</Text>
            <Text style={style.itemText}>{description}</Text>
        </View>
    );
};

const RepositoryItem = ({ repository }) => {
    const history = useHistory();
    const onPress = () => {
        history.push(`/repository/${repository.id}`);
    };

    return (
        <View style={{backgroundColor: 'white'}}>
            <Pressable onPress={onPress}>
                <View style={style.topFlexContainer}>
                    <Image source={{ uri: repository.ownerAvatarUrl }} style={style.thumbnailImage} />
                    <View style={{paddingHorizontal: 10, flexShrink: 1}}>
                        <Text style={style.itemHeader} testID="fullName">{repository.fullName}</Text>
                        <Text style={style.itemText} testID="description">{repository.description}</Text>
                        <View style={style.badge}><Text style={{color: 'white'}} testID="language">{repository.language}</Text></View>
                    </View>
                </View>
                <View style={style.flexContainer}>
                    <DoubleRowItem number={repository.stargazersCount} description="Stars" />
                    <DoubleRowItem number={repository.forksCount} description="Forks" />
                    <DoubleRowItem number={repository.reviewCount} description="Reviews" />
                    <DoubleRowItem number={repository.ratingAverage} description="Rating" />
                </View>
            </Pressable>
        </View>
    );
};

export default RepositoryItem;
