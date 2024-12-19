import React, { useState } from 'react';
import Skeleton from '../skeleton';

interface Props extends React.ComponentProps<'img'> {}

const MyImage = ({ ...rest }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      {JSON.stringify(isLoaded)}
      {!isLoaded && (
        <Skeleton
          type='image'
          className={` !w-full !h-full ${rest.className}`}
        />
      )}

      <img
        {...rest}
        onLoad={handleImageLoaded}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};

export default MyImage;
