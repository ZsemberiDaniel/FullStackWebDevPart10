import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from './../theme';

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        marginTop: 15,
        marginHorizontal: 20,
        padding: 5,
        borderColor: theme.colors.background,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    textInputError: {
        borderColor: theme.colors.error,
    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [styles.textInput, style, error && styles.textInputError];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
