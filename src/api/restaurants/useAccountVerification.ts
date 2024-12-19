import { useQuery } from '@tanstack/react-query';
import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { useParams } from 'react-router-dom';

function useAccountVerification() {
  const { verificationCode } = useParams();
  return useQuery({
    queryKey: ['AccountVerification'],
    queryFn: () =>
      graphQLClient.request<Record<string, any>>(
        gql`
          mutation activateUserAccount(
            $activateUserAccountInput: ActivateUserAccountInput
          ) {
            activateUserAccount(
              activateUserAccountInput: $activateUserAccountInput
            ) {
              activated
              message
            }
          }
        `,
        { activateUserAccountInput: { activationCode: verificationCode } }
      ),
  });
}

export default useAccountVerification;
