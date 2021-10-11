import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from './../graphql/queries';
import useSignOut from '../hooks/useSignOut';

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
                {linkTo && <Link to={linkTo}><Text style={styles.tabText}>{name}</Text></Link>}
                {!linkTo && <Text style={styles.tabText}>{name}</Text>}
            </Pressable>
        </View>
    );
};

const AppBar = () => {
    const { loading, error, data } = useQuery(AUTHORIZED_USER);
    console.log(data);

    const signUserOut = useSignOut();

    const isSignedIn = data && data.authorizedUser;
    const isNotSignedIn = data && !data.authorizedUser;

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab name="Repositories" linkTo="/" />
                {(!loading && isSignedIn) && <AppBarTab name="Review" linkTo="/review" />}
                {(!loading && isSignedIn) && <AppBarTab name="My reviews" linkTo="/myReviews" />}
                {(!loading && isNotSignedIn) && <AppBarTab name="Register" linkTo="/register" />}
                {(!loading && isNotSignedIn) && <AppBarTab name="Sign in" linkTo="/signIn" />}
                {(!loading && isSignedIn) && <AppBarTab name="Sign out" onPress={signUserOut} />}
            </ScrollView>
        </View>
    );
};

export default AppBar;
