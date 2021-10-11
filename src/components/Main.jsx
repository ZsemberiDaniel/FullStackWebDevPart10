import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import RepositoryView from './RepositoryView';
import ReviewForm from './ReviewForm';
import Register from './RegisterForm';
import MyReviews from './MyReviewsView';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/myReviews">
                    <MyReviews />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/review">
                    <ReviewForm />
                </Route>
                <Route path="/repository/:id">
                    <RepositoryView />
                </Route>
                <Route path="/signIn">
                    <SignIn />
                </Route>
                <Route path="/">
                    <RepositoryList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;