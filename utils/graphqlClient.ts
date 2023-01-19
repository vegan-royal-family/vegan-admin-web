import ApolloClient from "apollo-boost";

const API_HOST = "https://vegan-api-dev.kyojs.com/graphql";
const client = new ApolloClient({
  uri: API_HOST,
});

export default client;
