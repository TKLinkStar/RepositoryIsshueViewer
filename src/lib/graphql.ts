
import  {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
/*GraphQLクライアント */
export const client = new ApolloClient({

  link: createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer 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`
        }
    }),
    cache: new InMemoryCache(),
});
