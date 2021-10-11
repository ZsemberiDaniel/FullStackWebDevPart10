import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from './../theme';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import { useMutation } from '@apollo/client';
import { REVIEW_REPO } from '../graphql/mutations';
import { useHistory } from 'react-router';

const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('Repository name required'),
    ownerName: yup.string().required('Owner name required'),
    rating: yup.number().required('Rating is required!').min(0).max(100),
    text: yup.string()
});

const style = StyleSheet.create({
    createReviewButton: {
        backgroundColor: theme.colors.badge,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5
    }
});

const ReviewForm = () => {
    const history = useHistory();
    const [postReview, { data, loading, error }] = useMutation(REVIEW_REPO);
    if (loading) return <View><Text>Submitting review...</Text></View>;
    if (error) return <View><Text>{`Submission error! ${error.message}`}</Text></View>;

    const onSubmit = async (values) => {
        try {
            const result = await postReview({
                variables: {
                    repositoryName: values.repositoryName,
                    ownerName: values.ownerName,
                    rating: Number(values.rating),
                    text: values.text
                }
            });

            if (result && result.data && result.data.createReview) {
                history.push(`/repository/${result.data.createReview.repository.id}`);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <View style={{backgroundColor: 'white'}}>
            <Formik
                initialValues={{repositoryName: '', ownerName: '', rating: '', text: ''}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {({ handleSubmit }) => {
                return (
                    <View>
                        <FormikTextInput name="repositoryName" placeholder="Repo name" />
                        <FormikTextInput name="ownerName" placeholder="Repo owner name" />
                        <FormikTextInput name="rating" placeholder="Rating from 0 to 100" />
                        <FormikTextInput name="text" placeholder="Review" />
                        <Pressable onPress={handleSubmit} style={style.createReviewButton}>
                            <Text style={{color: 'white',textAlignVertical: "center",textAlign: "center",}}>Create review</Text>
                        </Pressable>
                    </View>
                );
            }}
            </Formik>
        </View>
    );
};

export default ReviewForm;
