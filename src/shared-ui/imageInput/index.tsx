import { useState } from 'react';
import Dropzone from 'react-dropzone';

import Button from '../button';
import userUploadUserImage from '@/api/restaurants/userUploadUserImage';
import Loader from '../loader';
import { toast } from 'react-toastify';
import Text from '../text';
import { useAppSelector } from '@/store/store';
import { getImageURL } from '@/helpers';

const mimeTypeToExtension: any = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

function ImageInput() {
  const [uploadImage, setUploadImage] = useState<any>(null);
  const { mutate, isPending } = userUploadUserImage();

  const userData = useAppSelector((state) => state.user?.userData);

  const handleFileChange = (file: any) => {
    setUploadImage({
      url: URL.createObjectURL(file),
      file,
    });
  };

  const uploadUserImage = () => {
    mutate(
      {
        fileNameExtention: mimeTypeToExtension[uploadImage.file.type],
        file: uploadImage,
      },
      {
        onSuccess: () => {
          setUploadImage(null);
        },
        onError: () => {
          toast.error('Failed to upload image');
        },
      }
    );
  };

  return (
    <div>
      <Dropzone
        accept={{
          'image/png': ['.png'],
          'image/jpg': ['.jpg'],
          'image/jpeg': ['.jpeg'],
        }}
        onDrop={(acceptedFiles) => handleFileChange(acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <div className='flex lg:flex-row xs:flex-col gap-5 items-center my-5'>
            <img
              className='  object-cover size-[120px] rounded-full'
              src={
                userData?.bucketKeyName
                  ? getImageURL(userData?.bucketKeyName)
                  : uploadImage?.url || ''
              }
              alt='image'
            />
            <div className='flex items-center flex-col gap-3'>
              {uploadImage?.url ? (
                <>
                  <Button disabled={isPending} onClick={uploadUserImage}>
                    Upload &nbsp;{' '}
                    {isPending && (
                      <Loader className='!border-gray-400 size-[15px]' />
                    )}
                  </Button>
                </>
              ) : (
                <Button {...getRootProps()}>
                  Select new image
                  <input {...getInputProps()} />
                </Button>
              )}
              <Text variant='extra-small' className='!text-dark-3'>
                Pick image upto 4mb.
              </Text>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default ImageInput;
