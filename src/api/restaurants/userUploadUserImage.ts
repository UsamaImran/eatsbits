import { useMutation } from '@tanstack/react-query';
import { graphQLClient } from './client';
import { gql } from 'graphql-request';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { Api } from './Api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateStoreUser } from '@/store/slices/userSlice';
import useCurrentUser from './useCurrentUser';

function userUploadUserImage() {
  const token = useAppSelector((state) => state.user?.token);
  const user = useAppSelector((state) => state.user?.userData);

  const dispatch = useAppDispatch();

  const { mutate: uploadToRest } = useUploadToRestApi();
  const { mutate: getCurrentUser } = useCurrentUser();
  const [file, setFile] = useState<any>(null);

  graphQLClient.setHeader('authorization', `Bearer ${token}`);

  return useMutation({
    mutationKey: ['User Image upload', user?.correlationId],
    mutationFn: ({
      fileNameExtention,
      file,
    }: {
      fileNameExtention: string;
      file: any;
    }) => {
      setFile(file);

      return graphQLClient.request<Record<string, any>>(
        gql`
          mutation createUploadPreSignedUrlForUser(
            $createUserPreSignedUrlInput: CreateUserPreSignedUrlInput
          ) {
            createUploadPreSignedUrlForUser(
              createUserPreSignedUrlInput: $createUserPreSignedUrlInput
            ) {
              preSignedUrl
            }
          }
        `,
        {
          createUserPreSignedUrlInput: {
            userCorrelationId: user?.correlationId,
            fileNameExtension: fileNameExtention,
          },
        }
      );
    },
    onSuccess: (data) => {
      const url = data.createUploadPreSignedUrlForUser.preSignedUrl;
      uploadToRest(
        { url, file },
        {
          onSuccess: () => {
            getCurrentUser(undefined, {
              onSuccess: (data) => {
                if (data && user)
                  dispatch(
                    updateStoreUser({
                      ...user,
                      bucketKeyName:
                        data?.regularUserByCorrelationId.bucketKeyName || '',
                    })
                  );
                toast.success('Image uploaded successfully');
              },
            });
          },
          onError: () => {
            toast.error('Failed to upload image');
          },
        }
      );
    },
  });
}

export default userUploadUserImage;

const useUploadToRestApi = () => {
  return useMutation({
    mutationKey: ['uploadToRestApi'],
    mutationFn: ({ url, file }: { url: string; file: any }) => {
      const uploadApi = new Api({ baseURL: url });

      uploadApi.updateHeaders({
        'Content-Type': file?.file?.type,
        'x-amz-acl': 'public-read',
      });

      return uploadApi.put<Record<string, any>>('', file.file);
    },
  });
};
