import { CONFIGS } from '@/configs';
import { GraphQLClient } from 'graphql-request';
import { Api } from './Api';

export const RESTAURANT_URL = CONFIGS.GRAPHQL_ENDPOINT;

export const graphQLClient = new GraphQLClient(RESTAURANT_URL, {
  responseMiddleware: async (response) => {
    console.log(response, 'GRAPHQL RESPONSE');
  },
});

export const restApiClient = new Api({ baseURL: CONFIGS.REST_END_POINT });
