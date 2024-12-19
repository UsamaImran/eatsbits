interface Props {
  text?: string;
}

function Separator({ text }: Props) {
  return (
    <div className='flex items-center'>
      <div className='flex-grow border-t border-gray-2'></div>
      {text && <span className='mx-2 text-dark-2 text-[12px]'>{text}</span>}
      <div className='flex-grow border-t border-gray-2'></div>
    </div>
  );
}

export default Separator;
