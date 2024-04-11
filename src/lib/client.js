import { ApolloClient, InMemoryCache, gql as apolloGql } from '@apollo/client'

export const wpApolloClient = new ApolloClient({
    uri: 'https://digitalcityseries.com/bolter/graphql',
    cache: new InMemoryCache(),
})

const gql = apolloGql

export const GET_INDEX_DATA = gql`
query IndexQuery {
    allArtwork(first: 1000) {
      nodes {
            slug
        }
    }
}`
