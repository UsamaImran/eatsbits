import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { graphQLClient } from './client';

function useItemsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['ItemsByCategory', categoryId],
    queryFn: () =>
      graphQLClient.request(
        gql`
          query itemsByCategoryCorrelationId($categoryCorrelationId: UUID!) {
            itemsByCategoryCorrelationId(
              categoryCorrelationId: $categoryCorrelationId
            ) {
              correlationId
              englishName
              bucketKeyName
              price
              englishDescription
              nonEnglishDescription
              nonEnglishName
              taxRate
              tag
              itemOptions {
                name
                correlationId
                description
                renderSequence
                isRequired
                itemOptionElements {
                  correlationId
                  name
                  description
                  price
                  renderSequence
                }
              }
            }
          }
        `,
        { categoryCorrelationId: categoryId }
      ),
  });
}

export default useItemsByCategory;
