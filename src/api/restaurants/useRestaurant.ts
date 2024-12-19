import { useQuery } from '@tanstack/react-query';
import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { useParams } from 'react-router-dom';

function useRestaurant(id?: string) {
  const { id: restaurantId } = useParams();

  return useQuery({
    queryKey: ['Restaurant', restaurantId || id],
    queryFn: () =>
      graphQLClient.request<any>(
        gql`
          query stores($retrieveStoresInput: RetrieveStoresInput!) {
            stores(retrieveStoresInput: $retrieveStoresInput) {
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
              categories {
                correlationId
                bucketKeyName
                name
                items {
                  correlationId
                  abbreviation
                  englishName
                  englishDescription
                  price
                  taxRate
                  nonEnglishDescription
                  nonEnglishName
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
                      renderSequence
                      price
                    }
                  }
                }
              }
              operationHours {
                day
                startHour
                endHour
              }
              address {
                addressLine1
                addressLine2
                city
                state
                zipCode
              }
            }
          }
        `,
        { retrieveStoresInput: { storeCorrelationIds: [restaurantId] } }
      ),
  });
}

export default useRestaurant;
