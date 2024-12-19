import { useMutation } from '@tanstack/react-query';

import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { UpdateRegularUserInput } from '@/gql/graphql';
import { useAppSelector } from '@/store/store';

function useUpdateUserInfo() {
  const token = useAppSelector((state) => state.user?.token);

  graphQLClient.setHeader('authorization', `Bearer ${token}`);

  return useMutation({
    mutationKey: ['Update User Info'],
    mutationFn: (body: UpdateRegularUserInput) =>
      graphQLClient.request<Record<string, any>>(
        gql`
          mutation updateRegularUSer(
            $updateRegularUserInput: UpdateRegularUserInput
          ) {
            updateRegularUser(updateRegularUserInput: $updateRegularUserInput) {
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
        { updateRegularUserInput: body }
      ),
  });
}

export default useUpdateUserInfo;
