import React from 'react';

function LogoutButton(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='34'
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <g clip-path='url(#clip0_188_15798)'>
        <path
          d='M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z'
          fill='#323232'
        />
      </g>
      <defs>
        <clipPath id='clip0_188_15798'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LogoutButton;
