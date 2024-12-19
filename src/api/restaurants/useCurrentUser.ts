import { useMutation } from '@tanstack/react-query';
import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { useAppSelector } from '@/store/store';

function useCurrentUser() {
  const userId = useAppSelector((state) => state.user.userData?.correlationId);
  return useMutation({
    mutationKey: ['Current user'],
    mutationFn: (_: undefined) =>
      graphQLClient.request<Record<string, any>>(
        gql`
          query regularUserByCorrelationId($correlationId: UUID) {
            regularUserByCorrelationId(correlationId: $correlationId) {
              correlationId
              firstName
              lastName
              email
              phoneNumber
              bucketKeyName
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
        { correlationId: userId }
      ),
  });
}

export default useCurrentUser;
