import { useMutation } from '@tanstack/react-query';
import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { CreateUserInput } from '@/gql/graphql';
import { RegularUser } from '@/types';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/store';
import { login } from '@/store/slices/userSlice';

function useSignUp() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ['Sign up'],
    mutationFn: (body: CreateUserInput) =>
      graphQLClient.request<{ registerUser: RegularUser }>(
        gql`
          mutation registerUser($createUserInput: CreateUserInput!) {
            registerUser(createUserInput: $createUserInput) {
              correlationId
              firstName
              lastName
              email
              phoneNumber
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
        { createUserInput: body }
      ),
    onSuccess: (data) => {
      dispatch(login(data.registerUser));
    },
    onError: (error: Record<string, any>) => {
      const message = error?.response?.errors[0]?.message;
      toast.error(message);
    },
  });
}

export default useSignUp;
