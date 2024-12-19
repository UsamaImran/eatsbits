import { useQuery } from '@tanstack/react-query';

import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { useAppSelector } from '@/store/store';

function useEarliestOrderTime() {
  const userId = useAppSelector((state) => state.user.userData?.correlationId);

  return useQuery({
    queryKey: ['Earliest Order Time'],
    queryFn: () =>
      graphQLClient.request<Record<string, any>>(
        gql`
          query earliestOrderTimeByCustomerCorrelationId(
            $customerCorrelationId: UUID!
          ) {
            earliestOrderTimeByCustomerCorrelationId(
              customerCorrelationId: $customerCorrelationId
            )
          }
        `,
        { customerCorrelationId: userId }
      ),
    enabled: !!userId,
  });
}

export default useEarliestOrderTime;
