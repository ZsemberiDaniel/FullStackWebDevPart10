import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.primary
    },
    tabText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.appBarSize,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    tabContainer: {
        padding: 15
    }
});

const AppBarTab = ({ name, onPress, linkTo }) => {
    return (
        <View style={styles.tabContainer}>
            <Pressable onPress={onPress}>
                <Link to={linkTo}><Text style={styles.tabText}>{name}</Text></Link>
            </Pressable>
        </View>
    );
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab name="Repositories" linkTo="/" />
                <AppBarTab name="Sign in" linkTo="/signIn" />
            </ScrollView>
        </View>
    );
};

export default AppBar;
