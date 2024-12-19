import { useMutation } from '@tanstack/react-query';
import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { LoginInput } from '@/gql/graphql';
import { useAppDispatch } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { login } from '@/store/slices/userSlice';

function useSignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['Sign in'],
    mutationFn: (body: LoginInput) =>
      graphQLClient.request<Record<string, any>>(
        gql`
          query login($loginInput: LoginInput) {
            login(loginInput: $loginInput) {
              token
              type
              user {
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
          }
        `,
        { loginInput: body }
      ),
    onSuccess(data) {
      const userData = { ...data.login.user, token: data.login.token };
      dispatch(login(userData));
      navigate('/');
    },
  });
}

export default useSignIn;
