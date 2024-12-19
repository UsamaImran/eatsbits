import type { CodegenConfig } from '@graphql-codegen/cli';

const schema: CodegenConfig = {
  schema: 'https://whale-app-3mkkd.ondigitalocean.app/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/gql/': {
      schema: 'https://whale-app-3mkkd.ondigitalocean.app/graphql',
      preset: 'client',
    },
  },
  ignoreNoDocuments: true,
};
export default schema;
