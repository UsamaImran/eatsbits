import profilePic from '@/assets/images/profile_img.jpeg';
import Button from '@/shared-ui/button';
import Text from '@/shared-ui/text';

function ProfileImageSection() {
  return (
    <div className='my-2'>
      <div className='lg:flex items-center gap-5 xs:hidden '>
        <div>
          <img
            src={profilePic}
            alt='profile pic'
            className='size-[124px] rounded-full'
          />
        </div>
        <div>
          <div className='flex gap-3'>
            <Button
              variant='tertiary'
              className='text-primary-text border-[1px]'
            >
              Upload Photo
            </Button>
            <Button variant='tertiary' className='text-primaryx border-[1px]'>
              Remove Photo
            </Button>
          </div>
          <div className='mt-2'>
            <Text variant='small' className='text-dark-7'>
              Pick a photo uo tp 14mb
            </Text>
          </div>
        </div>
      </div>
      <div className='xs:block lg:hidden'>
        <div className='flex justify-center'>
          <img
            src={profilePic}
            alt='profile pic'
            className='size-[124px] rounded-2xl'
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileImageSection;
