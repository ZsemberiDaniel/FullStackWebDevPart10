import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from './../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';
import useRegister from '../hooks/useRegister';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username required').min(1, 'Length at least 1!').max(30, 'Length at most 30!'),
    password: yup.string().required('Password required').min(5, 'Length at least 5!').max(30, 'Length at most 30!'),
    passwordConfirm: yup.string()
       .oneOf([yup.ref('password'), null], 'Password confirm does not match password!')
       .required('Password confirm is required')
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

export const RegisterContainer = ({ onSubmit }) => {
    return (
        <View style={{backgroundColor: 'white'}}>
            <Formik initialValues={{username: '', password: ''}} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => {
                return (
                    <View>
                        <FormikTextInput name="username" placeholder="Username" testID="username" />
                        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} testID="password" />
                        <FormikTextInput name="passwordConfirm" placeholder="Confirm password" secureTextEntry={true} testID="passwordConfirm" />
                        <Pressable onPress={handleSubmit} style={style.signInButton} testID="submitButton">
                            <Text style={{color: 'white',textAlignVertical: "center",textAlign: "center",}}>Register</Text>
                        </Pressable>
                    </View>
                );
            }}
            </Formik>
        </View>
    );
};

const Register = () => {
    const history = useHistory();
    const [register, registerResult, signInResult] = useRegister();

    if (registerResult.loading) return <View><Text>Registering...</Text></View>;
    if (registerResult.error) return <View><Text>Register error: {registerResult.error.message}</Text></View>;
    if (signInResult.loading) return <View><Text>Signing in...</Text></View>;
    if (signInResult.error) return <View><Text>Sign in error: {signInResult.error.message}</Text></View>;
    
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await register({ username, password });
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };
    
    return <RegisterContainer onSubmit={onSubmit} />;
};

export default Register;