import { useAppSelector } from '@/store/store';
import { useMutation } from '@tanstack/react-query';
import { graphQLClient, restApiClient } from './client';
import { gql } from 'graphql-request';
import { CreateCustomerOrderInput, OrderItemInput } from '@/gql/graphql';
import { CartItem } from '@/store/slices/cartSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { trimSpaces } from '@/helpers';

function useCreateCustomerOrder() {
  const { id: storeId } = useParams();

  const { mutate: createCheckoutSession } = useCheckoutSession();
  const {
    items: cartItems,
    orderType,
    comment,
  } = useAppSelector((state) => state.cart);
  const { token, isLoggedIn } = useAppSelector((state) => state.user);
  const userData = useAppSelector((state) => state.user?.userData);
  const guestData = useAppSelector((state) => state.guestUser);

  const source = isLoggedIn ? userData : guestData;

  const basePayload = generateOrderPayload(
    cartItems,
    source?.correlationId || uuidv4(),
    storeId || '',
    isLoggedIn ? false : true
  );

  const payload: CreateCustomerOrderInput = {
    ...basePayload,
    customerEmail: source?.email || '',
    customerFirstName: source?.firstName,
    customerLastName: source?.lastName,
    customerPhoneNumber: source?.phoneNumber,
    customerNote: comment,
    orderType: orderType.value as CreateCustomerOrderInput['orderType'],
  };

  graphQLClient.setHeader('authorization', `Bearer ${token}`);

  return useMutation({
    mutationKey: ['Create Customer Order'],
    mutationFn: () =>
      graphQLClient.request<Record<string, any>>(
        gql`
          mutation createCustomerOrder(
            $createCustomerOrderInput: CreateCustomerOrderInput!
          ) {
            createCustomerOrder(
              createCustomerOrderInput: $createCustomerOrderInput
            ) {
              correlationId
              createdAt
              customerFirstName
              customerLastName
              storeCorrelationId
              isGuest
              orderStatus
              orderStatus
              tableNumber
              totalPrice
              serverFirstName
              serverEmployeeCorrelationId
              serverLastName
              paid
              items {
                correlationId
                quantity
                isCombo
                englishName
                nonEnglishName
                englishDescription
                nonEnglishDescription
                price
                price
                bucketKeyName
                itemOptionElements
              }
            }
          }
        `,
        { createCustomerOrderInput: payload }
      ),
    onSuccess(data) {
      const orderId = data?.createCustomerOrder?.correlationId;
      createCheckoutSession(
        {
          customerOrderCorrelationId: orderId || '',
          storeCorrelationId: storeId || '',
          hostName: window.location.origin
        },
        {
          onSuccess: (data) => {
            if (typeof data === 'string') {
              const url = trimSpaces(data);
              window.open(url, '_blank');
            }
          },
          onError() {
            toast.error('Failed to create order');
          },
        }
      );
    },
    onError() {
      toast.error('Failed to create order');
    },
  });
}

export default useCreateCustomerOrder;

const useCheckoutSession = () => {
  const token = useAppSelector((state) => state.user?.token);
  if (token) restApiClient.updateHeaders({ Authorization: `Bearer ${token}` });

  return useMutation({
    mutationKey: ['Checkout Session'],
    mutationFn: (body: {
      storeCorrelationId: string;
      customerOrderCorrelationId: string;
      hostName: string;
    }) => restApiClient.post('/stripe/checkout/checkoutSession', body),
  });
};

const generateOrderPayload = (
  cartItems: CartItem[],
  customerCorrelationId: string,
  storeCorrelationId: string,
  isGuest: boolean
): CreateCustomerOrderInput => {
  const orderItems: OrderItemInput[] = cartItems.map((item) => ({
    itemCorrelationId: item.correlationId,
    quantity: item.quantity,
    isCombo: false,
    itemOptionElements: `${item.itemOptions?.map(
      (option) =>
        `${option.name}::${option.itemOptionElements
          ?.map(
            (itemOption) =>
              `${itemOption.correlationId}::${itemOption.name}::${
                itemOption.price
              }::${1}`
          )
          .join(', ')}`
    )}`,
  }));

  return {
    customerCorrelationId,
    storeCorrelationId,
    orderItems,
    isGuest,
  };
};
