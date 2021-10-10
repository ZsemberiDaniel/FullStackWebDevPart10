import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const result = await mutate({
            variables: {
                username, password
            }
        });

        if (result.data) {
            await authStorage.setAccessToken(result.data.authorize.accessToken);
            apolloClient.resetStore();
        }
    };

    return [signIn, result];
};

export default useSignIn;
