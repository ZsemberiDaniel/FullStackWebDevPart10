import React from 'react';
import { RepositoryListContainer } from "../../components/RepositoryList";
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 161,
                            stargazersCount: 218,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 176,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

            //debug();

            const checkTestIds = [
                {testID: 'fullName', objectId: 'fullName'},
                {testID: 'description', objectId: 'description'},
                {testID: 'language', objectId: 'language'},
                {testID: 'Stars', objectId: 'stargazersCount'},
                {testID: 'Forks', objectId: 'forksCount'},
                {testID: 'Reviews', objectId: 'reviewCount'},
                {testID: 'Rating', objectId: 'ratingAverage'}
            ];

            for (let { testID, objectId } of checkTestIds) {
                const allComponents = getAllByTestId(testID);
                expect(allComponents.length).toBe(repositories.edges.length);

                for (let i = 0; i < repositories.edges.length; i++) {
                    expect(allComponents[i]).toHaveTextContent(repositories.edges[i].node[objectId]);
                }
            }
        });
    });
});