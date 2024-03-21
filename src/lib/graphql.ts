
import  {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
/*GraphQLクライアント */
export const client = new ApolloClient({

  link: createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB}`
        }
    }),
    cache: new InMemoryCache(),
});
