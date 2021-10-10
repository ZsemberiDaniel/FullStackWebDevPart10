import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from './../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username required'),
    password: yup.string().required('Password required')
});

const style = StyleSheet.create({
    signInButton: {
        backgroundColor: theme.colors.badge,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5
    }
});

const SignIn = () => {
    const [signIn] = useSignIn();
    const history = useHistory();
    
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signIn({ username, password });
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View style={{backgroundColor: 'white'}}>
            <Formik initialValues={{username: '', password: ''}} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => {
                return (
                    <View>
                        <FormikTextInput name="username" placeholder="Username" />
                        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
                        <Pressable onPress={handleSubmit} style={style.signInButton}>
                            <Text style={{color: 'white',textAlignVertical: "center",textAlign: "center",}}>Log in</Text>
                        </Pressable>
                    </View>
                );
            }}
            </Formik>
        </View>
    );
};

export default SignIn;