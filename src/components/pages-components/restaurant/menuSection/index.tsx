import Text from '@/shared-ui/text';
import SearchSection from './searchSection';
import MenuListSection from './menuListSection';
import { useState } from 'react';

function MenuSection() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <div className='xs:hidden lg:block'>
        <Text as={'h1'} variant='h1'>
          Menu
        </Text>
      </div>

      <div className=''>
        <SearchSection onSearch={setSearchQuery} />
      </div>
      <div>
        <MenuListSection searchQuery={searchQuery} />
      </div>
      <div></div>
    </div>
  );
}

export default MenuSection;
