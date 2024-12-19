import { useQuery } from '@tanstack/react-query';
import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { useAppSelector } from '@/store/store';
import { CustomerOrdersByCustomerCorrelationIdInput } from '@/gql/graphql';

function useCustomerOrders({
  startTime,
  endTime,
  cursor,
}: {
  startTime: number;
  endTime: number;
  cursor?: string | null;
}) {
  const userId = useAppSelector((state) => state.user?.userData?.correlationId);
  const token = useAppSelector((state) => state.user.token);
  const payload: CustomerOrdersByCustomerCorrelationIdInput = {
    customerCorrelationId: userId || '',
    first: 20,
    startTimeInEpochMilli: startTime,
    endTimeInEpochMilli: endTime,
    after: cursor,
  };

  graphQLClient.setHeader('authorization', `Bearer ${token}`);

  return useQuery({
    queryKey: ['Customer Orders', userId, startTime, endTime, cursor],
    queryFn: () =>
      graphQLClient.request<Record<string, any>>(
        gql`
          query customerOrdersByCustomerCorrelationId(
            $customerOrdersByCustomerCorrelationIdInput: CustomerOrdersByCustomerCorrelationIdInput
          ) {
            customerOrdersByCustomerCorrelationId(
              customerOrdersByCustomerCorrelationIdInput: $customerOrdersByCustomerCorrelationIdInput
            ) {
              pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
              }
              edges {
                cursor
                node {
                  correlationId
                  createdAt
                  customerFirstName
                  customerLastName
                  customerEmail
                  storeCorrelationId
                  orderStatus
                  orderType
                  tableNumber
                  totalItemQuantity
                  customerNote
                  paid
                  storeName
                  items {
                    correlationId
                    quantity
                    isCombo
                    englishName
                    nonEnglishName
                    englishDescription
                    nonEnglishDescription
                    price
                    taxRate
                    bucketKeyName
                    itemOptionElements
                  }
                }
              }
            }
          }
        `,
        { customerOrdersByCustomerCorrelationIdInput: payload }
      ),
    enabled: !!userId,
  });
}

export default useCustomerOrders;
