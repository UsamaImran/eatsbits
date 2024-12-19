import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { graphQLClient } from './client';
import { useSearchParams } from 'react-router-dom';

function useFoodItem(id?: string) {
  const [searchParams] = useSearchParams();

  const itemId = searchParams.get('item') || id;

  return useQuery({
    queryKey: ['FoodItem', itemId && itemId],
    queryFn: () =>
      graphQLClient.request<any>(
        gql`
          query ItemsByCorrelationIds($itemCorrelationIds: [UUID!]!) {
            itemsByCorrelationIds(itemCorrelationIds: $itemCorrelationIds) {
              correlationId
              abbreviation
              englishName
              nonEnglishName
              englishDescription
              nonEnglishDescription
              price
              taxRate
              tag
              bucketKeyName
              itemOptions {
                correlationId
                name
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
        { itemCorrelationIds: [itemId] }
      ),
    enabled: !!itemId,
  });
}

export default useFoodItem;
