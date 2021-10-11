import { useQuery } from '@apollo/client';
// import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortingType, sortingFilter, firstFetch=4) => {
    // const [repositories, setRepositories] = useState();
    // const [loading, setLoading] = useState(false);

    const variables = {
        searchKeyword: sortingFilter
    };
    if (sortingType === 'latest') variables.orderBy = 'CREATED_AT';
    else if (sortingType === 'highest' || sortingType === 'lowest') variables.orderBy = 'RATING_AVERAGE';

    if (sortingType === 'latest' || sortingType === 'highest') variables.orderDirection = 'DESC';
    else if (sortingType === 'lowest') variables.orderDirection = 'ASC';

    const { data, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                first: firstFetch,
            },
        });
    };

    // const fetchRepositories = async () => {
    //     setLoading(true);

    //     // Replace the IP address part with your own IP address!
    //     const response = await fetch('http://192.168.0.128:5000/api/repositories');
    //     const json = await response.json();

    //     setLoading(false);
    //     setRepositories(json);
    // };

    // useEffect(() => {
    //     fetchRepositories();
    // }, []);

    return { repositories: !data ? undefined : data.repositories, loading, refetch, fetchMore: handleFetchMore };
};

export default useRepositories;