import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { graphQLClient } from './client';

function useTopListings() {
  return useQuery({
    queryKey: ['Top Listings'],
    queryFn: () =>
      graphQLClient.request<Record<string, any>>(gql`
        query topListing {
          topListing {
            topStores {
              correlationId
              name
              nonEnglishName
              primaryContactPhoneNumber
              primaryContactEmail
              primaryContactFirstName
              primaryContactLastName
              style
              employeeCount
              connectedAccountId
              bucketKeyName
              averageRating
              numberOfReviews
            }
            topCategories {
              correlationId
              name
              nonEnglishName
              bucketKeyName
            }
            topItems {
              storeCorrelationId
              categoryCorrelationId
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
            }
          }
        }
      `),
  });
}

export default useTopListings;
