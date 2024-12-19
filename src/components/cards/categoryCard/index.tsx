import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';

interface Props {
  name: string;
  icon: JSX.Element;
  url: string;
}

function CategoryCard({ name, url }: Partial<Props>) {
  return (
    <Card className='xs:w-[108.33px] lg:w-[323px] cursor-pointer m-0'>
      <div className='flex flex-col items-center gap-3'>
        <img
          src={url}
          alt={name}
          className='size-[60px] rounded-md object-contain bg-gray-1'
        />
        {/* <Text variant='h4'>🍕</Text> */}

        <div>
          <Text className='font-semibold'>{name}</Text>
        </div>
      </div>
    </Card>
  );
}

export default CategoryCard;
