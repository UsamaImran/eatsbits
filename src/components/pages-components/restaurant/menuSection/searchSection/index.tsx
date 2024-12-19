import TextField from '@/shared-ui/textfield';
import { CiSearch } from 'react-icons/ci';

function SearchSection({ onSearch }: { onSearch: (value: string) => void }) {
  return (
    <div className='flex justify-between'>
      <div className='lg:w-[454px] xs:w-full xs:my-5'>
        <TextField
          startIcon={<CiSearch />}
          placeholder='Search category by name...'
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchSection;
